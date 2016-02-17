package org.spargonaut.provider

import com.google.inject.Inject
import org.spargonaut.dao.WorkshopDao

import static groovy.json.JsonOutput.toJson

class WorkshopProvider {

    @Inject
    WorkshopDao workshopDao

    Map createWorkshop(final workshopInfo) {
        workshopInfo.workshopId = UUID.randomUUID().toString()
        workshopDao.insert(toJson(workshopInfo))
        workshopDao.getWorkshopById(workshopInfo.workshopId)
    }
}
