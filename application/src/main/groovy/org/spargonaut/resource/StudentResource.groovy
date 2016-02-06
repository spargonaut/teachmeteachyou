package org.spargonaut.resource

import com.google.inject.Inject
import org.spargonaut.provider.WorkshopProvider

import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path('student')
@Produces(MediaType.APPLICATION_JSON)
class StudentResource {

    @Inject
    WorkshopProvider workshopProvider

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    Response createStudent(info) {
        def workshop = workshopProvider.createWorkshop(info)
        Response
            .created()
            .entity(workshop)
            .build()
    }
}
