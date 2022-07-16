/**
 * Check if the request contains basic auth and it matches the credentials provided in the env
 * @param {*} req request
 * @param {*} res respnose
 * @param {*} next next
 */
module.exports = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.indexOf('Basic ') > -1
    ) {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString(
            'ascii'
        );
        const [username, password] = credentials.split(':');

        if (
            username === process.env.AUTO_USERNAME &&
            password === process.env.AUTO_PASSWORD
        ) {
            next();
            return;
        }
    }
    res.setHeader('WWW-Authenticate', 'Basic realm="User Visible Realm"');
    res.status(401);
    res.send('Unauthorized');
};
