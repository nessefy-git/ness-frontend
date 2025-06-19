# --- Stage 1: Build the React app ---
FROM node:18-alpine AS build
WORKDIR /app

# Copy source files
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Stage 2: Serve the build using NGINX ---
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Remove default NGINX config and copy custom one if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
