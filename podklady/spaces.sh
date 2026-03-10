#!/bin/bash

find . -type f -iname "*.html" -exec perl -CS -i -pe 's/\p{Zs}/ /g; s/ {2,}/ /g' {} +