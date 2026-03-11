#!/bin/bash
find . -type f -iname "*.html" -exec perl -i -pe 's/\x{A0}/ /g; s/\s{2,}/ /g' {} +
#find . -type f -iname "*.html" -exec perl -CS -i -pe 's/\p{Zs}/ /g; s/ {2,}/ /g' {} +