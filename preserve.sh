#! /usr/bin/env bash
set -e

if [ ! -f "./server/static/index.html" ]; then
    echo "Files missing! Run yarn build before deploying.";
    exit 1;
fi
