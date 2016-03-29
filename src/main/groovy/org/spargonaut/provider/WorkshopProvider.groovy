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

    List<Workshop> getAll() {
        workshopDao.getAll()
    }

    Workshop getById(final workshopId) {
        workshopDao.getWorkshopById(workshopId)
    }

    Workshop addInterestedParty(String workshopId, Map addInterestMap) {
        Workshop workshop = workshopDao.getWorkshopById(workshopId)
        workshop.addInterestedPerson(addInterestMap.name)
        workshopDao.update(workshop)
        workshop
    }
}
