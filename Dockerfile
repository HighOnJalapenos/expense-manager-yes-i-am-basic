FROM oven/bun:1 as build

WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the frontend
WORKDIR /app/frontend
RUN bun run build

# Move back to the root directory
WORKDIR /app

# Start the application
CMD ["bun", "run", "server/index.ts"]

EXPOSE 3000