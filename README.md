# AWW AUTO DEPLOY

## How to use
Create a script file named build.sh under the folder build. All your build commands should be written in this build.sh
When the github send webhoook to this endpoint, this app will run the build.sh file.

## Required Environment variables

|Environment Variable name| Possible Value Type | Function |
|------------------------|---------------------|-----------|
| AUTO_WEBHOOK_SECRET | secret (string) |  Secret which should be set in the github webhook settings |
| AUTO_PORT | 1372 (number) | Application port |
| AUTO_USERNAME | username | Username for accessing the log |
| AUTO_PASSWORD | password | Password for accessing the log |
| AUTO_LOG_PATH | /home/usr/log | Path of the folder to which the log should be stored |

## Available Endpoints

|Endpoint|Usage|
|--------|-----|
|api/v1/|Returns the version of this application|
|api/v1/build|This endpoint triggers build|
