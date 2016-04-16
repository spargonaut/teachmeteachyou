package org.spargonaut

import org.junit.Rule
import org.springframework.boot.test.OutputCapture
import spock.lang.Specification

class TMTYApplicationTest extends Specification {

    @Rule
    private final OutputCapture capture = new OutputCapture()

    void 'should name the application'() {
        given:
        TMTYApplication application = []

        expect:
        application.getName() == 'TMTYApplication'
    }
}
