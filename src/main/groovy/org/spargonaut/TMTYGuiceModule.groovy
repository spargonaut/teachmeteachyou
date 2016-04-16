package org.spargonaut

import com.google.inject.AbstractModule
import com.google.inject.Provides
import com.google.inject.Singleton
import io.dropwizard.jdbi.DBIFactory
import io.dropwizard.setup.Environment
import org.skife.jdbi.v2.DBI
import org.spargonaut.dao.WorkshopDao

class TMTYGuiceModule extends AbstractModule {

    private final TMTYConfiguration configuration
    private final Environment environment

    public TMTYGuiceModule(final TMTYConfiguration configuration, final Environment environment) {
        this.configuration = configuration
        this.environment = environment
    }

    @Provides
    @Singleton
    public DBI prepareJdbi(final TMTYConfiguration configuration, final Environment environment) {
        new DBIFactory().build(environment, configuration.getDataSourceFactory(), 'cognitiveConnections')
    }

    @Provides
    public WorkshopDao prepareWorkshopDao(DBI dbi) {
        dbi.onDemand(WorkshopDao)
    }

    @Override
    protected void configure() {
        bind(TMTYConfiguration).toInstance(configuration)
        bind(Environment).toInstance(environment)
    }
}
