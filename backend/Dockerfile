FROM node:14

# Create the app directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./

RUN npm install

# Copy all code into the container
COPY ./ ./

# Copy static react files.
COPY ./react/ ./react/

# Run the command 
CMD [ "/bin/bash", "init.sh" ]