############################################################
# Dockerfile to build a node.js development
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM node:alpine

# File Author / Maintainer
LABEL version="1.0"
LABEL maintainer="poobest.pooh@gmail.com"


# Since it is just dev we create this with std user
RUN mkdir -p /usr/src/app

# Start with a WORKDIR
WORKDIR usr/src/app

# First take the package.json and install all the modules
COPY package.json .
RUN npm install --quiet

# Install nodemon global - will restart server on changes
RUN npm install nodemon -g --quiet

# Copy the app
COPY . .

# expose port 8888
EXPOSE 8888

# Start the application when starting the container
CMD nodemon -L --watch . app.js