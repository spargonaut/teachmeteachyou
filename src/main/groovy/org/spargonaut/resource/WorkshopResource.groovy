package org.spargonaut.resource

import com.google.inject.Inject
import org.spargonaut.model.Workshop
import org.spargonaut.provider.WorkshopProvider

import javax.ws.rs.Consumes
import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.PUT
import javax.ws.rs.Path
import javax.ws.rs.PathParam
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Map getWorkshops() {
        [workshops:workshopProvider.getAll() ]
    }

    @GET
    @Path('{workshopId}')
    @Produces(MediaType.APPLICATION_JSON)
    Workshop getById(@PathParam('workshopId') String workshopId) {
        workshopProvider.getById(workshopId)
    }

    @POST
    @Path('{workshopId}/interested')
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    Response addInterestedPerson(@PathParam('workshopId') String workshopId, Map addInterestPayload) {
        Workshop workshop = workshopProvider.addInterestedParty(workshopId, addInterestPayload)
        Response
                .created(new URI('stuff'))
                .entity(workshop)
                .build()
    }

    @PUT
    @Path('{workshopId}/instructor')
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    Response addInstructor(@PathParam('workshopId') String workshopId, Map addInstructorPayload) {
        Workshop workshop = workshopProvider.setInstructor(workshopId, addInstructorPayload)
        Response
                .created(new URI('things'))
                .entity(workshop)
                .build()
    }
}
