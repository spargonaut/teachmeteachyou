package org.spargonaut

import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import spock.lang.Specification

class LOTSpecification extends Specification {

    private static final String WORKSHOP_SUBMIT_BUTTON_ID = 'workshop_submit'
    private static final String WORKSHOP_TITLE_CLASSNAME = 'workshop_title'

    WebDriver driver = new FirefoxDriver()
    void setup() {
        driver.get 'localhost:8080'
    }

    void cleanup() {
        driver.quit()
    }

    void 'a user can create a new workshop request and have that information show up below the submit button'() {
        given: 'some information about a new workshop'
        String userName = 'aloicious abercrombie'
        String workshopName = 'some new workshop'
        String workshopDtls = 'these are some more details'

        when: 'a user fills in the form with that information and clicks the create button'
        submitWorkshopInformation(userName, workshopName, workshopDtls)
        driver.findElement(By.id(WORKSHOP_SUBMIT_BUTTON_ID)).click()

        then: 'the new workshop shows up in the workshop list'
        int maxTimeToWaitForElement = 2
        WebDriverWait wait = new WebDriverWait(driver, maxTimeToWaitForElement)
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.className('name_display'), userName))
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.className(WORKSHOP_TITLE_CLASSNAME), workshopName))

        when: 'a user clicks on a workshop to view the details of a workshop'
        driver.findElement(By.className(WORKSHOP_TITLE_CLASSNAME)).click()

        then: 'the details of that workshop are displayed on the page'
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details_name'), userName))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details_title'), workshopName))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details_details'), workshopDtls))
    }

    private void submitWorkshopInformation(String userName, String workshopName, String workshopDtls) {
        driver.findElement(By.id('workshop_form_button')).click();
        WebElement nameInput = driver.findElement(By.id('name_input'))
        nameInput.sendKeys(userName)

        WebElement newWorkshopInput = driver.findElement(By.id('new_workshop_title'))
        newWorkshopInput.sendKeys(workshopName)

        WebElement newWorkshopDetails = driver.findElement(By.id('new_workshop_details'))
        newWorkshopDetails.sendKeys(workshopDtls)
    }
}
