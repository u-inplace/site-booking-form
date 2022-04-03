#!/bin/bash

# Basic if statement
while true; do
    printf "\033c"
    echo @$1
    result=$(diff <(cat ./dist/Booking.bundle.js) <(curl -s https://combinatronics.com/u-inplace/ui-booking/$1/dist/Booking.bundle.js))
    if [[ $result != "" ]]; then
        echo Not synced.
    else
        echo .
    fi
    sleep 2
done
