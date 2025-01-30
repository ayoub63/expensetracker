# Step 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Set build-time environment variable
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files
COPY package*.json ./

# Install dependencies with npm
RUN npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set fetch-timeout 600000 \
    && npm config set registry https://registry.npmjs.org/ \
    && npm install --legacy-peer-deps --network-timeout=600000

# Copy the rest of the app's files
COPY . .

# Create env file
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

# Build the app
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build files from the build stage to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
