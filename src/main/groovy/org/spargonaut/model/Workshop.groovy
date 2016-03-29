package org.spargonaut.model

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@ToString
@EqualsAndHashCode
class Workshop {
    String name
    UUID id
    String title
    String details
    List interestedPeople = []

    public Workshop(String name, UUID id, String title, String details) {
        this.name = name
        this.id = id
        this.title = title
        this.details = details
    }

    public void addInterestedPerson(String name) {
        interestedPeople << name
    }
}
