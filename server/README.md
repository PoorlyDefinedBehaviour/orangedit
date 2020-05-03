[![Build Status](https://travis-ci.org/PoorlyDefinedBehaviour/orangedit.svg?branch=master)](https://travis-ci.org/PoorlyDefinedBehaviour/orangedit)

### Setup

```terminal
$ yarn
// or
$ npm i
```

## With docker

### Running dev environment

```terminal
$ sudo docker-compose -f docker-compose-dev.yml
```

## Without docker

### Running dev enviroment

- Make sure postgres is running on port 5432
- Make sure redis is running on port 6379

```terminal
$ yarn start:dev
// or
$ npm run start:dev
```

### Testing

```terminal
$ yarn test
// or
$ npm test
```
