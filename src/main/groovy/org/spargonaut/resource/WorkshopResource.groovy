package org.spargonaut.resource

import com.google.inject.Inject
import org.spargonaut.model.Workshop
import org.spargonaut.provider.WorkshopProvider

import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path('workshops')
@Produces(MediaType.APPLICATION_JSON)
class WorkshopResource {

    @Inject
    WorkshopProvider workshopProvider

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    Response newWorkshopWith(info) {
        Workshop workshop = workshopProvider.newWorkshopWith(info)
        Response
            .created(new URI(workshop.id.toString()))
            .entity(workshop)
            .build()
    }
}
