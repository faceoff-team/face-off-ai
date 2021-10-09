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

# Expose the port 8080 to the outside
EXPOSE 8080

# Run the command 
CMD [ "node", "main.js" ]