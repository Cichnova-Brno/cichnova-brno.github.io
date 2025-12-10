#!/bin/bash

for d in ./*/
do
    [ -d "$d" ] || continue
    f="${d}znak.jpg"
    if [ -e "$f" ]; then
        echo "file: $f"
        mv "$f" "$f.bak" --update=none
        identify -ping -format '%w %h\n' "$f"
#        convert "$f.bak" -resize 160x160 "$f"
        echo -e "\ndone"
    fi
done
