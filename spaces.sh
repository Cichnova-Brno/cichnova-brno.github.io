#!/bin/bash
#find . -type f -iname "*.html" -exec perl -i -pe 's/\x{A0}/ /g; s/\s{2,}/ /g' {} +
#find . -type f -iname "*.html" -exec perl -CS -i -pe 's/\p{Zs}/ /g; s/ {2,}/ /g' {} +

find . -type f -iname "*.html" -exec perl -CS -i -pe '
# nahradí všechny Unicode mezery kromě NBSP klasickou mezerou
s/[\x{2000}-\x{200A}\x{202F}\t\r\f\v]/ /g;
# více mezer → jedna
s/ {2,}/ /g;
' {} +