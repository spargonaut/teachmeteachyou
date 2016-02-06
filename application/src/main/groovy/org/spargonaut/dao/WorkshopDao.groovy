package org.spargonaut.dao

import org.skife.jdbi.v2.sqlobject.Bind
import org.skife.jdbi.v2.sqlobject.SqlQuery
import org.skife.jdbi.v2.sqlobject.SqlUpdate
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper
import org.spargonaut.mapper.WorkshopMapper

@RegisterMapper(WorkshopMapper)
public interface WorkshopDao {
    @SqlUpdate("INSERT INTO student (value) values (CAST(:value AS jsonb))")
    void insert(@Bind('value') final value)

    @SqlQuery("select * from student where value->>'workshopId'=:workshopId")
    Map getWorkshopById(@Bind('workshopId') final String workshopId)
}
