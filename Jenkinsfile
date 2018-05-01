node {
   cleanWs()

   stage 'checkout'
   git 'https://github.com/spargonaut/teachmeteachyou'

   stage 'build'
   sh './gradlew build'
}