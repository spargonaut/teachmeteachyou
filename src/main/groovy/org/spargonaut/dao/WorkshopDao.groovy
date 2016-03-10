package org.spargonaut.dao

import org.skife.jdbi.v2.sqlobject.Bind
import org.skife.jdbi.v2.sqlobject.SqlQuery
import org.skife.jdbi.v2.sqlobject.SqlUpdate
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper
import org.spargonaut.dao.jdbi.BindModel
import org.spargonaut.mapper.WorkshopMapper
import org.spargonaut.model.Workshop

@RegisterMapper(WorkshopMapper)
public interface WorkshopDao {
    @SqlUpdate("INSERT INTO workshop (value) values (CAST(:value AS jsonb))")
    void insert(@BindModel final Workshop value)

    @SqlQuery("select * from workshop where value->>'id'=:id")
    Workshop getWorkshopById(@Bind('id') final String id)

    @SqlQuery('select * from workshop')
    List<Workshop> getAll()
}
