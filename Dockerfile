# --- Stage 1: Build the React app ---
FROM node:18-alpine AS build
WORKDIR /app

# Copy source files
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["NPM", "START"]
