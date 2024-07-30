#!/usr/bin/env bash

cat > .env <<EOF
NODE_ENV='production'
OPENAI_API_KEY='$(security find-generic-password -s OPENAI_API_KEY -w)'
EOF