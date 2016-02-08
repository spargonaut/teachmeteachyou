package org.spargonaut.gradleApp

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

class StartBackgroundApp extends DefaultTask {

    @TaskAction
    def startApp() {
        def args = ['java', '-cp', project.sourceSets.main.runtimeClasspath.join(':'), 'org.spargonaut.LOTApplication', 'server', 'application/LOTConfiguration.yml']
        ProcessBuilder builder = new ProcessBuilder(args)
        builder.redirectErrorStream(true)
        builder.directory(new File('.'))
        Process process = builder.start()

        InputStream stdout = process.inputStream
        BufferedReader reader = new BufferedReader(new InputStreamReader(stdout))

        def line
        while ((line = reader.readLine()) != null) {
            if (line.contains('Server: Started')) {
                project.extensions.extraProperties.properties.get('background').put('appProcess', process)
                break;
            }
        }
    }
}
