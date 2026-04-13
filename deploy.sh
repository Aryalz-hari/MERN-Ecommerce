#!/bin/bash

# Exit immediately if a command fails
set -e

# Go to client directory (important for npm)
cd /root/home/MERN-Ecommerce/client

# Build React app
npm run build


# Copy new build to nginx html directory
cp -r dist/* /usr/share/nginx/html/

echo "Build completed and files copied to Nginx successfully."
 
# Rebuild and Compose docker if changes in .env are made

echo "Rebuilding docker"

cd ..

docker compose -f docker-compose.prod.yml up --build -d 

echo "Docker successfully composed"