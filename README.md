## Dependencies
- required things that are known to work:
  - java 8 jdk (1.8.0_25 on OSX 10.9.5;)
  - node 5 (v5.0.0 on OSX 10.9.5 and on ubuntu)
    - consider using [NVM](https://github.com/creationix/nvm)
  - postgres 9.5
  - grunt cli (needs to be installed globally)
  - docker
  - docker-compose

## To run a standalone demo with docker
use the following commands:
```aidl
$ ./gradlew deployUI build shadowJar
$ docker-compose up --build
```
navigate your browser to localhost:30123


## Getting Started with development
- To prepare postgres, you'll need to create a table for it to use, and set up the user to use that table.
You can use the following commands:
   ```
   $ sudo su - postgres
   $ psql
   =# create database "cognitiveConnections";
   =# alter user postgres password '';
   ```

- Once the above is fulfilled, you can run all the tests and build the fatjar with the command:

  `$ ./gradlew runAll`

- To run the application:

  `$ ./gradlew runLocal`

- You can then access the application by pointing your browser to:

  `localhost:8080`

- To run the front end client independent of the backend, use:

  ```bash
  $ cd src/UI/
  $ grunt go
  ```

- For more available tasks, run:

  `./gradlew tasks`



