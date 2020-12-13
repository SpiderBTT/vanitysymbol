#!/bin/bash

if [[ "${1}" == "bash" ]]; then
   bash
else
    cd /code && node index.js "${@}"
fi
