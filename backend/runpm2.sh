#!/bin/sh
#pm2 start yarn -n "PROJECTNAME-server" -- start
pm2 start -n "PROJECTNAME-server" "node run start"
