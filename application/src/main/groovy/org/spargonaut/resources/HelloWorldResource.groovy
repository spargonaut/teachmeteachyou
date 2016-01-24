package org.spargonaut.resources

import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path('hello')
@Produces(MediaType.APPLICATION_JSON)
class HelloWorldResource {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    Response hello(info) {
        Response
            .created()
            .entity(['name' : info.name])
            .build()
    }
}
