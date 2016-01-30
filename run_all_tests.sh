#!/bin/bash

#set -e

function cleanUp {
    echo '**********     stopping the application    **********'
    kill $!
}

echo '**********     building the application     **********'
cd ./application
./gradlew clean build shadowJar --quiet

echo '**********     starting the application     **********'
cd ..
./gradlew runLocal >> /dev/null &
sleep 7s

echo '**********   running the functional tests   **********'
./gradlew clean test --quiet

trap cleanUp EXIT
