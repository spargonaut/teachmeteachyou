package org.spargonaut

import org.junit.Rule
import org.springframework.boot.test.OutputCapture
import spock.lang.Specification

class LOTApplicationTest extends Specification {

    @Rule
    OutputCapture capture = new OutputCapture()

    void 'should name the application LOThello world'() {
        given:
        LOTApplication lotApplication = []

        expect:
        lotApplication.getName() == 'LOTApplication'
    }
}
