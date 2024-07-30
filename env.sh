#!/usr/bin/env bash

cat > .env <<EOF
OPENAI_API_KEY='$(security find-generic-password -s OPENAI_API_KEY -w)'
EOF