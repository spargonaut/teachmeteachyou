node {
   cleanWs()

   stage 'checkout'
   git 'https://github.com/spargonaut/teachmeteachyou'

   stage 'build'
   sh './gradlew build'

   stage 'create the fat jar'
   sh './gradlew shadowJar'

   stage 'archive the artifacts'
   archiveArtifacts artifacts: 'build/libs/TMTYApplication.jar', fingerprint: true, onlyIfSuccessful: true
}