# Template for ReactJS (material-ui), Apollo, Prisma and GraphQL

## Getting started

### Server

Deploy the docker image from DigitalOcean marketplace.
Copy .\backend\docker-compose.yml over and run `docker-compose up -d`

### Client

Run script `.\initial_setup.sh` to setup the template for a new project.

## GQL Hooks Docu

https://www.apollographql.com/docs/react/essentials/mutations/

## Deployment

Install [pm2](http://pm2.keymetrics.io/) on maschine.
  
 npm install pm2 -g

Then use script `gitUpdate.sh`.
