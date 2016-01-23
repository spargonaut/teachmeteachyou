package org.spargonaut

import io.dropwizard.Application
import io.dropwizard.assets.AssetsBundle
import io.dropwizard.setup.Bootstrap
import io.dropwizard.setup.Environment
import org.spargonaut.resources.HelloWorldResource

class LOTApplication extends Application<LOTConfiguration> {
    static void main(String[] args) {
        new LOTApplication().run(args)
    }

    String getName() {
        return 'LOTApplication'
    }

    void initialize(Bootstrap<LOTConfiguration> configuration) {
        configuration.addBundle(new AssetsBundle('/assets/', '/', 'index.html'))
    }

    void run(LOTConfiguration configuration, Environment environment) {
        environment.jersey().register(new HelloWorldResource())
    }
}
