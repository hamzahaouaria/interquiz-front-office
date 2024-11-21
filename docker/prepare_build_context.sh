#!/bin/bash

# Create a temporary build context directory


BUILD_CONTEXT_DIR="build_context"

# Remove the build context directory if it exists
if [ -d "$BUILD_CONTEXT_DIR" ]; then
    rm -rf $BUILD_CONTEXT_DIR
fi
mkdir -p $BUILD_CONTEXT_DIR

# Copy necessary files to the build context directory
cp -r ../src $BUILD_CONTEXT_DIR/
cp -r ../public $BUILD_CONTEXT_DIR/
cp ../package.json $BUILD_CONTEXT_DIR/
cp ../package-lock.json $BUILD_CONTEXT_DIR/
cp ../angular.json $BUILD_CONTEXT_DIR/
cp ../tsconfig.json $BUILD_CONTEXT_DIR/
cp ../tsconfig.app.json $BUILD_CONTEXT_DIR/
cp ../tsconfig.spec.json $BUILD_CONTEXT_DIR/
cp ../proxy.config.js $BUILD_CONTEXT_DIR/
cp ../.prettierrc $BUILD_CONTEXT_DIR/
cp ../.prettierignore $BUILD_CONTEXT_DIR/
cp ../.stylelintrc $BUILD_CONTEXT_DIR/
cp ../.editorconfig $BUILD_CONTEXT_DIR/
cp ../.gitignore $BUILD_CONTEXT_DIR/
cp ../README.md $BUILD_CONTEXT_DIR/
cp ../server.ts $BUILD_CONTEXT_DIR/
cp ../docker/nginx.conf $BUILD_CONTEXT_DIR/

echo "Build context prepared in $BUILD_CONTEXT_DIR"
