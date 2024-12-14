# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci --only=production

# COPY . .

# EXPOSE 5000

# CMD [ "node", "index.js" ]

### multi stage docker build to reduce final image size

# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies

WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production


# Stage 2: Copy necessary files to final image
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies from the first stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the application source code
COPY . .

# Expose the necessary port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]


