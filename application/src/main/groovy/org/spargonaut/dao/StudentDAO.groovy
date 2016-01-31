package org.spargonaut.dao

import org.skife.jdbi.v2.sqlobject.Bind
import org.skife.jdbi.v2.sqlobject.SqlUpdate
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper

public interface StudentDAO {
    @SqlUpdate("insert into student (value) values (CAST(:value AS jsonb))")
    void insert(@Bind('value') final value)
}
