const bunyan = require('bunyan');
const todayDate = require('./date').todayDate;

// get an instance of bunyan logger
module.exports.getLogger = () => {
    return bunyan.createLogger({
        name: 'AWW',
        streams: [
            {
                level: 'info',
                stream: process.stdout,
            },
            {
                level: 'info',
                path: process.env.AUTO_LOG_PATH + `/${todayDate()}.log`,
            },
        ],
    });
};
