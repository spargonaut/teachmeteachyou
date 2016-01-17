package org.spargonaut

import io.dropwizard.Application
import io.dropwizard.setup.Environment
import org.spargonaut.resources.HelloWorldResource

class LOTApplication extends Application<LOTConfiguration> {
    static void main(String[] args) {
        new LOTApplication().run(args)
    }

    String getName() {
        return 'LOTApplication'
    }

    void run(LOTConfiguration configuration, Environment environment) {
        environment.jersey().register(new HelloWorldResource())
    }
}
