package org.spargonaut

import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import spock.lang.Specification

class LOTSpecification extends Specification {

    WebDriver driver = new FirefoxDriver()
    void cleanup() {
        driver.quit()
    }

    void 'a user can create a new workshop request and have that information show up below the submit button'() {
        given:
        driver.get 'localhost:8080'
        WebElement name_input = driver.findElement(By.id('name_input'))
        name_input.sendKeys('aloicious abercrombie')

        WebElement new_workshop_input = driver.findElement(By.id('new_workshop_title'))
        new_workshop_input.sendKeys('some new workshop')

        WebElement new_workshop_details = driver.findElement(By.id('new_workshop_details'))
        new_workshop_details.sendKeys('these are some more details')

        when:
        driver.findElement(By.id('name_submit')).click()

        then:
        int maxTimeToWaitForElement = 1
        WebDriverWait wait = new WebDriverWait(driver, maxTimeToWaitForElement)
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('name_display'), 'aloicious abercrombie'))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_title'), 'some new workshop'))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details'), 'these are some more details'))
    }
}