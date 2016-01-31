package org.spargonaut.mapper

import groovy.json.JsonSlurper
import org.skife.jdbi.v2.StatementContext
import org.skife.jdbi.v2.tweak.ResultSetMapper

import java.sql.ResultSet
import java.sql.SQLException


class StudentMapper implements ResultSetMapper<Map> {
    @Override
    public Map map(final int index, final ResultSet resultSet, final StatementContext statementContext) throws SQLException {
        new JsonSlurper().parseText(resultSet.getObject("value").toString())
    }
}
