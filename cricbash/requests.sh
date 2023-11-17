#!/bin/bash

if command -v curl &> /dev/null; then
    echo "curl is already installed."
else
    echo "curl is not installed. Installing now..."
    # Use the package manager for your system to install curl
    # For example, on Debian/Ubuntu-based systems, you can use:
    # sudo apt-get update
    # sudo apt-get install curl

    # Uncomment and use the appropriate command for your system
    # For example, on Red Hat-based systems:
    # sudo yum install curl

    # For macOS using Homebrew:
    # brew install curl

    # For other systems, you might use different package managers
fi