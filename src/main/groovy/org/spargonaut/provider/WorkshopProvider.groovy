package org.spargonaut.provider

import org.spargonaut.model.Workshop

import com.google.inject.Inject
import org.spargonaut.dao.WorkshopDao

class WorkshopProvider {

    @Inject
    WorkshopDao workshopDao

    Workshop newWorkshopWith(final workshopInfo) {
        UUID workshopId = UUID.randomUUID()
        Workshop workshop = new Workshop(workshopInfo.name, workshopId, workshopInfo.title, workshopInfo.details)
        workshopDao.insert(workshop)
        workshopDao.getWorkshopById(workshop.id.toString())
    }
}
