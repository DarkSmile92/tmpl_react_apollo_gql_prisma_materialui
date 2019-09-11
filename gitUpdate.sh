#!/bin/sh
cd /root/PROJECTNAME/
git pull
sh configEnvironment.sh prod
cd /root/PROJECTNAME/frontend
npm run build
pm2 restart PROJECTNAME-client
pm2 restart PROJECTNAME-server
