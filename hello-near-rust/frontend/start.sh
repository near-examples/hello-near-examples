#!/bin/sh

GREEN='\033[1;32m'
NC='\033[0m' # No Color

CONTRACT_DIRECTORY=../contract
DEV_ACCOUNT_FILE="${CONTRACT_DIRECTORY}/neardev/dev-account.env"

start () {
  echo The app is starting!
  env-cmd -f $DEV_ACCOUNT_FILE parcel index.html --open
}

alert () {
  echo "======================================================"
  echo "It looks like you forgot to deploy your contract"
  echo ">> Run ${GREEN}'npm run deploy'${NC} from the 'root' directory"
  echo "======================================================"
}

if [ -f "$DEV_ACCOUNT_FILE" ]; then
  start
else
  alert
fi
