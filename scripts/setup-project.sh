#!/bin/bash

# Check for Node.js
if ! node -v >/dev/null 2>&1; then
  echo "Node.js is not installed or not in the path. Please install Node.js version 18.18.0 or above."
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | awk '{print $NF}')

if [[ "$NODE_VERSION" < "18.18.0" ]]; then
  echo "Node.js version is too old. Please install Node.js version 18.18.0 or above."
  exit 1
fi

# Check for npm
if ! npm -v >/dev/null 2>&1; then
  echo "npm is not installed or not in the path. Please install npm."
  exit 1
fi

# Check for Docker
if ! docker -v >/dev/null 2>&1; then
  echo "Docker is not installed or not in the path. Please install Docker or Docker Desktop."
  exit 1
fi

# Execute "npm run db"
echo "Setting up the database..."
cd packages/api
npm run db
if [ $? -ne 0 ]; then
  echo "Failed to start the database."
  exit 1
fi

# Install the API dependencies
echo "Installing the API dependencies..."
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install the API dependencies."
  exit 1
fi

# Go back to the root folder
cd ../..

# Go to /packages/web and execute "npm install"
echo "Installing the WEB dependencies..."
cd packages/web
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install the WEB dependencies."
  exit 1
fi

# Go back to the root folder
cd ../..

# Go to /packages/app and execute "npm install"
echo "Installing the APP dependencies.."
cd packages/app
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install the APP dependencies."
  exit 1
fi

echo "Project setup completed. Create the .env files on each package sub-folder and fill using the .env.example files."