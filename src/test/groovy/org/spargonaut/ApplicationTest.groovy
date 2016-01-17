package org.spargonaut

import org.junit.Rule
import spock.lang.Specification
import org.springframework.boot.test.OutputCapture

class ApplicationTest extends Specification {

    @Rule
    OutputCapture capture = new OutputCapture()

    def 'should print hello world'() {
        when:
        Application.main(null)

        then:
        capture.toString() == 'hello world!\n'
    }
}
