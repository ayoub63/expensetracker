# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Set build-time environment variable
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy app files
COPY . .

# Create env file
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

# Build app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
