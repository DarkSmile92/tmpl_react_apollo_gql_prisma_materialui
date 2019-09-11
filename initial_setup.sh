#!/bin/sh
# setup for new project
USING_GITHUB=false

# delete git folder if it exists from cloning of the template
if [ -d ".git" ]; then
    rm -rf .git
fi

echo "Name of project:"
read projectname
echo "URL of github project:"
read githuburl
echo "IP Address of Prisma Server (DigitalOcean):"
read gqlserverip
echo "IP Address of cloud IDE for demo config:"
read clouddemoip
# replace the name of the project in each file it occurs
grep -rl PROJECTNAME . | xargs sed -i "s/PROJECTNAME/$projectname/g"
: '
sed -i "s/PROJECTNAME/$projectname/g" ./gitUpdate.sh
sed -i "s/PROJECTNAME/$projectname/g" ./frontend/runpm2.sh
sed -i "s/PROJECTNAME/$projectname/g" ./backend/runpm2.sh
sed -i "s/PROJECTNAME/$projectname/g" ./frontend/package.json
sed -i "s/PROJECTNAME/$projectname/g" ./backend/package.json
sed -i "s/PROJECTNAME/$projectname/g" ./frontend/package-lock.json
sed -i "s/PROJECTNAME/$projectname/g" ./backend/package-lock.json
sed -i "s/PROJECTNAME/$projectname/g" ./frontend/pages/_app.js
'

sed -i "s/GQLHOSTSERVERIP/$gqlserverip/g" ./configEnvironment.sh
sed -i "s/CLOUDDEMOIDEIP/$clouddemoip/g" ./configEnvironment.sh

sh ./configEnvironment.sh local

if [ -z "$githuburl" ]
then
    echo "No GitHub URL provided, not setting up."
else
    echo "Setting up GitHub for repository $githuburl ..."
    USING_GITHUB=true
    git init
    git remote add origin $githuburl
    git remote -v
fi

# end
if [ "$USING_GITHUB" = true ] ; then
    git add .
fi