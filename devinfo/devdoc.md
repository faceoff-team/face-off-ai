# Enviroment Setup

## Preliminary Programs
1. Install Git to your machine (https://git-scm.com/)

2. Install Node.js and NPM to your machine (https://nodejs.org/en/download/)

3. Install Python and pip to your machine (https://www.python.org/downloads/)


1. When installing Node.js, ensure that you select NPM as an installation requirement


## Preliminary Programs
1. First, create a folder on your device to hold repo

2. Next, go to the project repo in GitHub

3. Click the `Code` button and copy the HTTPS web URL

4. Open a terminal to the folder and run command `git clone <HTTPS web URL>`

5. Ensure that all files are now in your folder


## Dependecies
Backend
1. In backend directory, remove `node_modules` folder if exists

2. In backend directory, run `npm install` to get all packages

Frontend

1. In frontend directory, remove `node_modules` folder if exists 

2. In frontend directory, run `yarn install` to get all packages

3. If you ever want to install a new package, run the command `yarn add <package name>` to add package to the yarn.lock and install

4. If you ever want to delete a new package, run the command `yarn remove <package name>` to remove package from the yarn.lock and install

5. Complete steps 1-4 everytime you pull new code from the repo

Python

1. Ensure that Python has been properly installed to get Model functions

## Running Server
1. To get latest code, run `git checkout master` then `git pull`

2. To push code, do following:
`git add *`, `git commit -m <message>`, then `git push`

3. To run a Node.js server, run `yarn start`, code should compile and reflect real time on localhost