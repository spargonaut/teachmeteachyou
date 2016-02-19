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

        WebElement nameInput = driver.findElement(By.id('name_input'))
        String userName = 'aloicious abercrombie'
        nameInput.sendKeys(userName)

        WebElement newWorkshopInput = driver.findElement(By.id('new_workshop_title'))
        String workshopName = 'some new workshop'
        newWorkshopInput.sendKeys(workshopName)

        WebElement newWorkshopDetails = driver.findElement(By.id('new_workshop_details'))
        String workshopDetails = 'these are some more details'
        newWorkshopDetails.sendKeys(workshopDetails)

        when:
        driver.findElement(By.id('name_submit')).click()

        then:
        int maxTimeToWaitForElement = 1
        WebDriverWait wait = new WebDriverWait(driver, maxTimeToWaitForElement)
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('name_display'), userName))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_title'), workshopName))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details'), workshopDetails))
    }
}