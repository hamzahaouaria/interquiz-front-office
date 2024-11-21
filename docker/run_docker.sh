#!/bin/bash

# Define variables
DOCKER_IMAGE_NAME="best-match-frontend"
DOCKER_CONTAINER_NAME="best-match-frontend-container"
DOCKERFILE_DIR="docker"
DOCKERFILE_NAME="Dockerfile.frontend"

# Function to clean up Docker container and image
cleanup() {
    echo "Cleaning up..."
    docker rm -f $DOCKER_CONTAINER_NAME
    docker rmi $DOCKER_IMAGE_NAME

    if [ -d "$BUILD_CONTEXT_DIR" ]; then
      rm -rf $BUILD_CONTEXT_DIR
    fi
    echo "Cleanup complete."
}

set -e  # Exit on error
# Set trap to clean up on exit
trap cleanup EXIT

# Prepare the build context
echo "Preparing build context..."
bash prepare_build_context.sh

# Build the Docker image
echo "Building Docker image..."
docker build -t $DOCKER_IMAGE_NAME -f $DOCKERFILE_NAME .

# Run the Docker container
echo "Running Docker container..."
docker run -p 4000:80 --name $DOCKER_CONTAINER_NAME $DOCKER_IMAGE_NAME

echo "Docker container is running. Access the application at http://localhost:4000"
