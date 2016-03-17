#!/usr/bin/env bash

if [ $# -eq 0 ]; then
  echo "usage: $0 <benchmark>"
  exit 1
fi

benchmark=$1

echo Starting benchmark "${benchmark##*/}"
echo
node "$benchmark"
echo
