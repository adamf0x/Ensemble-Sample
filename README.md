# Ensemble-Sample
Code sample for Ensemble 

# Installation instructions: 

- a config folder containing a config.json file should be created containing database information for a dev and test database

Example: 
```
{
    "dev":{
        "username": "user",
        "password": "password",
        "database": "db",
        "host": "localhost",
        "dialect": "postgres"
    },
    "test": {
        "username": "user",
        "password": "password",
        "database": "db_test",
        "host": "localhost",
        "dialect": "postgres"
      }
}
```

- clone the repo locally
- run ```npm i``` from within the repo directory to install dependencies  
- run ```node server.js``` from within the repo directory to start the server

# Running tests:

- run ```npm test``` in order to run the automated tests

