const crypto = require('crypto');

/**
 * Middleware to check the github webhook secret with the local environment secret
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
    const webhookSecret = process.env.AUTO_WEBHOOK_SECRET; // fetch the local WEBHOOK_SECRET envionment variable

    // check if the variable is set
    if (webhookSecret) {
        // generate hash from payload and use WEBHOOK_SECRET as key
        const clientHash = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        // extract the hash that get from the server
        const serverHash = req.headers['x-hub-signature-256'];

        // check the generated and hash get the server is same
        if ('sha256=' + clientHash === serverHash) {
            next();
        } else {
            res.status(401).send('Unauthorized, secret is not match');
        }
    } else {
        console.log('WEBHOOK_SECRET environment variable should be set');
        res.status(400).send('WEBHOOK_SECRET is not defined');
    }
};
