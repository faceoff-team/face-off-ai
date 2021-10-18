#Docker Container to test faceoff-backend
FROM node:14

# Create the app directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./

RUN npm install

# Copy all code into the container
COPY . .

COPY test/test.js ./test.js

# Run the command 
CMD [ "node", "test.js" ]

