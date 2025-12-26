# Use official Node LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Install PM2 globally inside the container
RUN npm install pm2 -g

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy rest of the source code
COPY . .

# Expose backend port
EXPOSE 8000

# Start server in production using pm2
CMD ["pm2-runtime", "server.cjs"]
