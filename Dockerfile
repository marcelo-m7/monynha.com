# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile || npm install
COPY . .
RUN pnpm run build || npm run build

# Runtime stage
FROM node:20-alpine
WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile || npm install --production

# Copy built assets and server file
COPY --from=build /app/dist ./dist
COPY server.js ./

# Set environment to production
ENV NODE_ENV=production

EXPOSE 8080

# Start the Express server
CMD ["node", "server.js"]
