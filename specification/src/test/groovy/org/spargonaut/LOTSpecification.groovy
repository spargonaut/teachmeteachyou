package org.spargonaut

import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.firefox.FirefoxDriver
import spock.lang.Specification

class LOTSpecification extends Specification {

    WebDriver driver = new FirefoxDriver()

    def cleanup() {
        driver.quit()
    }

    def 'a user can submit their name and have their name show up below the submit button'() {
        given:
        driver.get 'localhost:8080'
        def name_input = driver.findElement(By.id('name_input'))
        name_input.sendKeys('aloicious abercrombie')

        when:
        driver.findElement(By.id('name_submit')).click()

        then:
        def name_display = driver.findElement(By.id('name_display'))
        name_display.getText() == 'aloicious abercrombie'
    }

}