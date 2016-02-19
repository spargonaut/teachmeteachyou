package org.spargonaut

import com.google.inject.Guice
import com.google.inject.Injector
import io.dropwizard.Application
import io.dropwizard.assets.AssetsBundle
import io.dropwizard.setup.Bootstrap
import io.dropwizard.setup.Environment
import org.eclipse.jetty.servlets.CrossOriginFilter
import org.spargonaut.resource.WorkshopResource

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
        configuration.addBundle(new AssetsBundle('/assets/ui', '/', 'index.html'))
    }

    void run(LOTConfiguration configuration, Environment environment) {
        Injector injector = Guice.createInjector(new LOTGuiceModule(configuration, environment))
        environment.jersey().register(injector.getInstance(WorkshopResource))

        FilterRegistration.Dynamic filter = environment.servlets().addFilter('CORSFilter', CrossOriginFilter)

        String urlPatterns = "${environment.getApplicationContext()}*"
        filter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), false, urlPatterns)
        filter.setInitParameter('allowedMethods', 'GET,PUT,POST,OPTIONS,DELETE,HEAD')
        filter.setInitParameter('allowedOrigins', '*')
        filter.setInitParameter('allowedHeaders', 'Origin, Content-Type, Accept, X-Requested-With')
    }
}
