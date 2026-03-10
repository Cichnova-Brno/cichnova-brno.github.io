#!/bin/bash

find . -name "*.html" -type f -exec sed -i -E 's/ {2,}/ /g' {} +