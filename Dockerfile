FROM node:18-alpine

WORKDIR /app

# Install sqlite3 dependencies
RUN apk add --no-cache python3 make g++ sqlite

# Create data directory for SQLite database
RUN mkdir -p /app/data

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose ports
EXPOSE 25 54321

# Start both services
CMD ["npm", "run", "dev"]
