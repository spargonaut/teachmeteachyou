#!/usr/bin/env sh

/app/wait_for_postgres.sh $DB_HOST /migrations/flyway-4.2.0/flyway migrate -user=postgres -password="" -url=jdbc:postgresql://${DB_HOST}:5432/cognitiveConnections
java -jar /app/TMTYApplication.jar server /app/local.yml

