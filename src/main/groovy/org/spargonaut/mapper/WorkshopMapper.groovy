package org.spargonaut.mapper

import groovy.json.JsonSlurper
import org.skife.jdbi.v2.StatementContext
import org.skife.jdbi.v2.tweak.ResultSetMapper
import org.spargonaut.model.Workshop

import java.sql.ResultSet
import java.sql.SQLException

class WorkshopMapper implements ResultSetMapper<Workshop> {
    @Override
    public Workshop map(final int index, final ResultSet resultSet, final StatementContext statementContext)
            throws SQLException {
        Map map = new JsonSlurper().parseText(resultSet.getObject('value').toString()) as Map
        new Workshop(map.name, UUID.fromString(map.id), map.title, map.details)
    }
}
