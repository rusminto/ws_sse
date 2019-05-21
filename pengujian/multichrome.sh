#!/bin/bash
RND_DIR="chromee-$RANDOM"
echo $RND_DIR
cd /tmp
mkdir $RND_DIR
google-chrome --user-data-dir=/tmp/$RND_DIR --incognito
rm -R $RND_DIR
