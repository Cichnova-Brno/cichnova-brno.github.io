#!/bin/bash

for d in ./*/
do
    [ -d "$d" ] || continue
    for f in ${d}*.json
    do
        echo "file: $f"
        mv ${f} ${f}.ytbak
        sed -E '
          s#src='\''https://www\.youtube\.com/embed/([^?]+)\?[^'\'']*'\''#src="https://www.youtube.com/embed/\1"#g;
            s#width='\''[0-9]+'\'' height='\''[0-9]+'\''#style="aspect-ratio:16/9;width:100%;height:auto;border-radius:15px"#g
            ' "${f}.ytbak" > ${f}
        echo "done"
    done
done
