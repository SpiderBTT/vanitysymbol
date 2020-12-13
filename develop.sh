#!/bin/bash
# This script is only useful for developing this application.
# This script will build the container image, and start a container using it,
# giving you a bash shell.
# The code is mounted in the /code directory.

image=$(docker build -q .)
docker run --rm -it -v $PWD/src:/code -u "$(id -u)" -w /code $image bash
