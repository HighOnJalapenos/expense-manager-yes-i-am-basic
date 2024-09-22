FROM oven/bun:1 as build

WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the frontend
RUN bun run build

# Start the application
CMD ["bun", "run", "start"]

EXPOSE 3000