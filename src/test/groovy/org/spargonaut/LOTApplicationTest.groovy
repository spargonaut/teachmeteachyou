package org.spargonaut

import org.junit.Rule
import spock.lang.Specification
import org.springframework.boot.test.OutputCapture

class LOTApplicationTest extends Specification {

    @Rule
    OutputCapture capture = new OutputCapture()

    def 'should print hello world'() {
        given:
        LOTApplication lotApplication = []

        expect:
        lotApplication.getName() == 'LOTApplication'
    }
}
