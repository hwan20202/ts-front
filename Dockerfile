# Stage 1: Build the React application using Vite
FROM node:alpine as build

# Set the working directory inside the container
WORKDIR /app

# Accept environment variables as arguments
ARG VITE_APP_KAKAO_KEY
ENV VITE_APP_KAKAO_KEY=${VITE_APP_KAKAO_KEY}

# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application using the environment variable
RUN VITE_APP_KAKAO_KEY=${VITE_APP_KAKAO_KEY} npm run build

# Stage 2: Serve the built files using nginx
FROM nginx:alpine

# Copy the build output from the previous stage to nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx server
CMD ["nginx", "-g", "daemon off;"]
