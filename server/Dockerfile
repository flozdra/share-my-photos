#!/bin/bash
## Template got from https://mcsneaky.ap3k.pro/posts/adonis-v5-docker-compose-templates/
# Build AdonisJS
FROM node:14 as builder
# Set directory for all files
WORKDIR /home/node/app
# Copy over package.json files
COPY package*.json ./
# Install all packages
RUN npm install
# Copy over source code
COPY . .
# Build AdonisJS for production
RUN npm run build --production

# Build final runtime container
FROM node:14
# Set environment variables
ENV NODE_ENV=production
# Disable .env file loading
ENV ENV_SILENT=true
# Listen to external network connections
# Otherwise it would only listen in-container ones
ENV HOST=0.0.0.0

# Set home dir
WORKDIR /home/node/app
# Copy over built files
COPY --from=builder /home/node/app/build .
# COPY --from=builder /home/node/app/tracing.js .

# Install only required packages
RUN npm ci --production
# Expose port to outside world
EXPOSE $PORT
# Start server up
ENV LAUNCH_COMMAND="node server.js"
CMD $LAUNCH_COMMAND
