package org.spargonaut.resource

import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path('student')
@Produces(MediaType.APPLICATION_JSON)
class StudentResource {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    Response createStudent(info) {
        Response
            .created()
            .entity(['name' : info.name])
            .build()
    }
}
