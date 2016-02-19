package org.spargonaut.provider

import static groovy.json.JsonOutput.toJson

import com.google.inject.Inject
import org.spargonaut.dao.WorkshopDao

class WorkshopProvider {

    @Inject
    WorkshopDao workshopDao

    Map newWorkshopWith(final workshopInfo) {
        workshopInfo.workshopId = UUID.randomUUID().toString()
        workshopDao.insert(toJson(workshopInfo))
        workshopDao.getWorkshopById(workshopInfo.workshopId)
    }
}
