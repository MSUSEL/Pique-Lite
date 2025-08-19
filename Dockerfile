# Development Dockerfile for Bun + React
#
# Build the image:
#   docker build -t pique-lite-dev .
#
# Run the container with live code editing (hot reload):
#   docker run -it --rm -p 3000:3000 -v $(pwd):/usr/src/app pique-lite-dev
#
# The app will be available at http://localhost:3000

# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /usr/src/app

# Copy only dependency manifests first for caching
COPY package.json ./

# Install all dependencies (including devDependencies)
RUN bun install

# Copy the rest of the source code
COPY . .

# Expose the port your dev server runs on (change if not 3000)
EXPOSE 5173

# Set environment to development
ENV NODE_ENV=development

# Start the dev server (adjust if your dev command is different)
CMD ["bun", "run", "dev"] 
