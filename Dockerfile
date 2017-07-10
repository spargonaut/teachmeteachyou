FROM java:8

RUN apt-get update
RUN apt-get install -y postgresql-client

EXPOSE 30213

WORKDIR /migrations
RUN wget https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/4.2.0/flyway-commandline-4.2.0-linux-x64.tar.gz
RUN tar zxf flyway-commandline-4.2.0-linux-x64.tar.gz
COPY src/main/resources/db/migration/*.sql /migrations/flyway-4.2.0/sql

WORKDIR /app
COPY infrastructure/docker_entrypoint.sh /app
COPY infrastructure/wait_for_postgres.sh /app

COPY build/libs/TMTYApplication.jar /app
COPY TMTYConfiguration/local.yml /app

CMD ["./docker_entrypoint.sh"]