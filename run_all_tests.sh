#!/bin/bash

#set -e

echo '**********        deploying the UI          **********'
./gradlew deployUI --quiet  || exit $?

echo '**********      cleaning the database       **********'
./gradlew flywayClean --quiet  || exit $?

echo '**********   running database migrations    **********'
./gradlew flywayMigrate --quiet  || exit $?

echo '**********     building the application     **********'
./gradlew clean build shadowJar --quiet  || exit $?

echo '**********  Running the Integration Tests   **********'
./gradlew integrationTest --quiet  || exit $?

echo '**********   running the functional tests   **********'
./gradlew functionalTest --quiet  || exit $?
