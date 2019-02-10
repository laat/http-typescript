#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset
set -o xtrace

if ! [ -x "$(command -v yarn)" ]; then
  echo 'Error: yarn was not installed'
  npm i -g yarn
fi

yarn
yarn lerna bootstrap