# AWW AUTO DEPLOY

## How to use
Create a script file named build.sh under the folder build. All your build commands should be written in this build.sh
When the github send webhoook to this endpoint, this app will run the build.sh file.

## Required Environment variables

|Environment Variable name| Possible Value Type | Function |
|------------------------|---------------------|-----------|
| WEBHOOK_SECRET=secret | secret |  Secret which should be set in the github webhook settings |


## Available Endpoints

|Endpoint|Usage|
|--------|-----|
|api/v1/|Returns the version of this application|
|api/v1/build|This endpoint triggers build|
