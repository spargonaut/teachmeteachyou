package org.spargonaut

import io.dropwizard.Configuration
import io.dropwizard.db.DataSourceFactory

import javax.validation.constraints.NotNull

public class TMTYConfiguration extends Configuration {
    @NotNull
    final DataSourceFactory dataSourceFactory = new DataSourceFactory()
}
