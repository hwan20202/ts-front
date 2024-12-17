# Stage 1: Build the React application using Vite
FROM node:alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json ./

# Install dependencies (including Vite)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application using npm run build (Vite should be run via npm)
RUN npm run build

# Stage 2: Serve the built files using nginx
FROM nginx:alpine

# Copy the build output from the previous stage to nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx server
CMD ["nginx", "-g", "daemon off;"]