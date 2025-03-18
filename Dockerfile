# Stage 1: Build the app
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist 
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Install a lightweight HTTP server to serve the app
RUN npm install -g serve

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]