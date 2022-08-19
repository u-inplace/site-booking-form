#!/bin/bash

bundle=$1
target="/dist/$bundle"
repo="webflow"
branch=$2

# to clea cache
# purge.jsdelivr.net/gh/u-inplace/...
#cdnURL="https://cdn.jsdelivr.net/gh/u-inplace/$repo@$branch$target"
#cdnURL="https://combinatronics.com/u-inplace/$repo/$branch$target"
cdnURL="webflow-js.inplace.be/$bundle"

# Basic if statement
while true; do
    printf "\033c"
    echo @$branch
    echo \:$target
    result=$(diff <(cat .$target) <(curl -s $cdnURL))
    if [[ $result != "" ]]; then
        echo Not synced.
    else
        echo .
    fi
    sleep 2
done
