package org.spargonaut

import io.dropwizard.Application
import io.dropwizard.assets.AssetsBundle
import io.dropwizard.setup.Bootstrap
import io.dropwizard.setup.Environment
import org.eclipse.jetty.servlets.CrossOriginFilter
import org.spargonaut.resource.HelloWorldResource

import javax.servlet.DispatcherType
import javax.servlet.FilterRegistration

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

        FilterRegistration.Dynamic filter = environment.servlets().addFilter("CORSFilter", CrossOriginFilter.class);
        filter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), false, environment.getApplicationContext().getContextPath() + "*");
        filter.setInitParameter("allowedMethods", "GET,PUT,POST,OPTIONS,DELETE,HEAD");
        filter.setInitParameter("allowedOrigins", "*");
        filter.setInitParameter("allowedHeaders", "Origin, Content-Type, Accept, X-Requested-With");
    }
}
