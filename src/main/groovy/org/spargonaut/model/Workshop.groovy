package org.spargonaut.model

import groovy.transform.EqualsAndHashCode

@EqualsAndHashCode
class Workshop {
    String name
    UUID id
    String title
    String details

    public Workshop(String name, UUID id, String title, String details) {
        this.name = name
        this.id = id
        this.title = title
        this.details = details
    }
}
