#! /bin/bash

if [ $# -eq 0 ]
  then
    echo "Please provide a day number to create "
    exit 1
fi

day=$1

mkdir days/$day
touch days/$day/index.ts
touch days/$day/README.md
touch days/$day/input
touch days/$day/test
