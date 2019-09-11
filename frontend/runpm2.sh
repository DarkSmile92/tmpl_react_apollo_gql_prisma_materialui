#!/bin/sh
#pm2 start yarn -n "PROJECTNAME-client" -- start
pm2 start -n "PROJECTNAME-client" "node start"
