required things that are known to work:
- java 8 (1.8.0_25 on OSX 10.9.5;)
- node 5 (v5.0.0 on OSX 10.9.5 and on ubuntu)
-- (note: consider using NVM: https://github.com/creationix/nvm)
- postgres 9.5
- grunt cli (needs to be installed globally)

to prepare postgres, you'll need to create a table for it to use, and set up the user to use that table.
you can use the following commands:
sudo su - postgres
psql
> create database "cognitiveConnections";
> alter user postgres password '';

once the above is fulfilled, you can run all the tests and build the fatjar with the command:
./gradlew runAll

for more available tasks, run:
./gradlew tasks
