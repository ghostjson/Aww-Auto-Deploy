const express = require('express');
const execSync = require('child_process').execSync;

const package = require('./../package.json');
const security = require('./security.middleware');

// GLOBALS
const app = express();
const PORT = process.env.PORT || 1372;

// middlewares
app.use(express.json());
app.use(security);

// routes
app.get('/api/v1', (req, res) => {
    res.send(`AWW AUTO DEPLOY API<br> Version: ${package.version}`);
});

// build endpoint
app.all('/api/v1/build', (req, res) => {
    // excute the build file
    console.log('Going to start the build');
    const output = execSync('./build/build.sh', { encoding: 'utf-8' });
    console.log(output);
    console.log('Build completed');
    res.send(`Log:\n ${output}`);
});

// listening
app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
});
