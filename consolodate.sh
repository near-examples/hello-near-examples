#!/usr/bin/env bash

repo=$1
remotename=$2
branch=$3

git remote add $remotename $repo
git fetch $remotename


git merge $remotename/$branch --allow-unrelated-histories

mkdir $remotename

echo 'now all you have to do is move the files into the newly created folder, run git add. and push'
echo 'new folder name is $remotename'
echo 'COMMIT and push to github before re running this script '
