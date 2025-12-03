#!/bin/bash

for d in ./*/
do
    [ -d "$d" ] || continue
    for f in $d*.json
    do
        echo "file: $f"
        mv $f $f.bak
        sed -e "s/ \([a-z]\) / \1\&nbsp;/g" $f.bak > $f
        echo "done"
    done
done
