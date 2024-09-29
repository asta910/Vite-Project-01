# Stage 1: Build the Vite app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files into the container
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the built app
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Copy the Vite production build output (dist folder) from the first stage
COPY --from=build /app/dist /app/dist

# Expose the port the app will run on
EXPOSE 5173

# Serve the app using serve
CMD ["serve", "-s", "dist"]