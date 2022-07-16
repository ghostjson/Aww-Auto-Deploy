const express = require('express');
const execSync = require('child_process').execSync;

const package = require('./../package.json');
const githubAuth = require('./middlewares/github-secret.middleware');
const basicAuth = require('./middlewares/basic-auth.middleware');
const logging = require('./utils/log');
const todayDate = require('./utils/date').todayDate;

// GLOBALS
const app = express();
const PORT = process.env.AUTO_PORT || 1372;

// middlewares
app.use(express.json());

// routes
app.get('/api/v1', (req, res) => {
    res.send(`AWW AUTO DEPLOY API<br> Version: ${package.version}`);
});

// build endpoint
app.all('/api/v1/build', githubAuth, (req, res) => {
    const logger = logging.getLogger();

    logger.info('Going to start a new build: ');
    const output = execSync('./build/build.sh', { encoding: 'utf-8' });
    logger.info('Build completed');
    logger.info('Console output: \n=================\n' + output);
    res.send('Build completed');
});

// returns todays log in a text file
app.get('/log', basicAuth, (req, res) => {
    const output = execSync(`cat ./log/${todayDate()}.log | bunyan`);
    res.send(output);
});

// listening
app.listen(PORT, () => {
    const logger = logging.getLogger();
    logger.info(`Listening to the port ${PORT}`);
});
