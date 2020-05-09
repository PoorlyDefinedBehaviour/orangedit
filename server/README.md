[![Build Status](https://travis-ci.org/PoorlyDefinedBehaviour/orangedit.svg?branch=master)](https://travis-ci.org/PoorlyDefinedBehaviour/orangedit)

### Setup

```terminal
$ yarn
// or
$ npm i
```

### Running dev environment

#### docker-compose

```terminal
$ yarn compose:dev
```

### docker

```terminal
$ sudo docker run --name orangedit_redis \
       -p 6379:6379 \
       -d redis

$ sudo docker run --name orangedit_postgres \
       -e POSTGRES_USER=postgres \
       -e POSTGRES_PASSWORD=postgres \
       -p 5432:5432 \
       -d postgres:alpine

$ sudo docker exec -it orangedit_postgres psql -U postgres

$ create database orangedit_dev

$ yarn

$ yarn dev
```
