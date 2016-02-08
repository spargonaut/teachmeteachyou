#!/bin/bash

#set -e

echo '**********      cleaning the database       **********'
./gradlew flywayClean --quiet

echo '**********   running database migrations    **********'
./gradlew flywayMigrate --quiet

echo '**********     building the application     **********'
./gradlew clean build shadowJar --quiet

echo '**********  Running the Integration Tests   **********'
./gradlew integrationTest --quiet

echo '**********   running the functional tests   **********'
./gradlew functionalTest --quiet
