# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Set npm timeout and registry to avoid potential network issues
RUN npm config set fetch-timeout 300000 && \
    npm config set connect-timeout 300000 && \
    npm config set registry https://registry.npmjs.org

# Optional: Use a mirror registry
# RUN npm config set registry https://registry.yarnpkg.com
# RUN npm config set registry https://registry.npm.taobao.org

# Optional: Clear npm cache before installing
RUN npm cache clean --force

# Copy package.json and package-lock.json for better cache management
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps || npm install --legacy-peer-deps || npm install --legacy-peer-deps

# Copy the rest of the app's files
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build files from the build stage to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
