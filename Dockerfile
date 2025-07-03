FROM node:18-alpine

WORKDIR /app

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
