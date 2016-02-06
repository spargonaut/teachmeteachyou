#!/bin/bash

#set -e

function cleanUp {
    echo '**********     stopping the application    **********'
    kill $!
}

echo '**********      cleaning the database       **********'
./gradlew flywayClean --quiet

echo '**********   running database migrations    **********'
./gradlew flywayMigrate --quiet

echo '**********     building the application     **********'
./gradlew clean build shadowJar --quiet

echo '**********  Running the Integration Tests   **********'
./gradlew integrationTest --quiet

echo '**********     starting the application     **********'
./gradlew runLocal >> /dev/null &
sleep 7s

echo '**********   running the functional tests   **********'
./gradlew functionalTest --quiet

trap cleanUp EXIT
