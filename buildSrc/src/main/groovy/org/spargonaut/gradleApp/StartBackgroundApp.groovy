package org.spargonaut.gradleApp

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

class StartBackgroundApp extends DefaultTask {

    def args
    def archive

    @TaskAction
    def startApp() {
        String fullyQualifiedArchive = "build/libs/${archive}"
        def args = ['java', '-jar', fullyQualifiedArchive, *args]
        ProcessBuilder builder = new ProcessBuilder(args)
        builder.redirectErrorStream(true)
        builder.directory(new File('.'))
        Process process = builder.start()

        InputStream stdout = process.inputStream
        BufferedReader reader = new BufferedReader(new InputStreamReader(stdout))

        def line
        boolean success = false;
        while ((line = reader.readLine()) != null) {
            if (line.contains('Server: Started')) {
                success = true
                project.extensions.extraProperties.properties.get('background').put('appProcess', process)
                break
            }
        }
        if(!success)
            throw new Exception("App failed to start in background")
    }
}
