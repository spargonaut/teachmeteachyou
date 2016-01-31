package org.spargonaut.dao

import org.skife.jdbi.v2.sqlobject.Bind
import org.skife.jdbi.v2.sqlobject.SqlQuery
import org.skife.jdbi.v2.sqlobject.SqlUpdate
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper
import org.spargonaut.mapper.StudentMapper

@RegisterMapper(StudentMapper)
public interface StudentDAO {
    @SqlUpdate("insert into student (value) values (CAST(:value AS jsonb))")
    void insert(@Bind('value') final value)

    @SqlQuery("select value from student where value->>'name'=:name")
    Map getStudentByName(@Bind('name') final String name)
}
