#Docker Container to test faceoff-backend
FROM face-off-ai_backend

# Copy all code into the container
RUN npm run genKeys

# Run the command
CMD [ "npm", "test" ]

