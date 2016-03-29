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
    private static final String WORKSHOP_FORM_ID = 'workshop_form'
    private static final String NAME_DISPLAY_CLASSNAME = 'name_display'
    private static final String WORKSHOP_DETAILS_NAME_ID = 'workshop_details_name'

    WebDriver driver = new FirefoxDriver()

    void setup() {
        driver.get 'localhost:8080'
    }

    void cleanup() {
        driver.quit()
    }

    void 'a user can create a new workshop request and have that information show up below the submit button'() {
        given: 'a user who wants to create a new workshop'
        String userOne = 'aloicious abercrombie'
        String userTwo = 'mike smith'
        String workshopName = 'some new workshop'
        String workshopDtls = 'these are some more details'

        when: 'the user clicks the create workshop button'
        driver.findElement(By.id('workshop_form_button')).click();

        then: 'the create workshop form is visible'
        ExpectedConditions.presenceOfElementLocated(By.id(WORKSHOP_FORM_ID))

        when: 'the user fills in the form with that information and clicks the create button'
        submitWorkshopInformation(userOne, workshopName, workshopDtls)
        driver.findElement(By.id(WORKSHOP_SUBMIT_BUTTON_ID)).click()

        then: 'the new workshop shows up in the workshop list'
        int maxTimeToWaitForElement = 2
        WebDriverWait wait = new WebDriverWait(driver, maxTimeToWaitForElement)
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.className(NAME_DISPLAY_CLASSNAME), userOne))
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.className(WORKSHOP_TITLE_CLASSNAME), workshopName))

        and: 'the workshop form is no longer visible'
        wait.until(ExpectedConditions.not(
                ExpectedConditions.presenceOfAllElementsLocatedBy(By.id(WORKSHOP_FORM_ID))))

        when: 'the user clicks on a workshop to view the details of a workshop'
        driver.findElement(By.className(WORKSHOP_TITLE_CLASSNAME)).click()

        then: 'the details of that workshop are displayed on the page'
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id(WORKSHOP_DETAILS_NAME_ID), userOne))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details_title'), workshopName))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details_details'), workshopDtls))

        when: 'the user clicks the done button'
        driver.findElement(By.id('done_button')).click()

        then: 'the main workshop page loads again'
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.className(NAME_DISPLAY_CLASSNAME), userOne))
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.className(WORKSHOP_TITLE_CLASSNAME), workshopName))

        when: 'a second user clicks a workshop to view the details of that workshop'
        driver.findElement(By.className(WORKSHOP_TITLE_CLASSNAME)).click()

        then: 'the details of that workshop are displayed on the page again'
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id(WORKSHOP_DETAILS_NAME_ID), userOne))

        when: 'the second user adds their name to the list'
        WebElement addInterestInput = driver.findElement(By.id('add_interest_input'))
        addInterestInput.sendKeys(userTwo)
        driver.findElement(By.id('add_interest_button')).click()

        then: 'that users name shows up on the interested list'
        List<WebElement> interestedPeople = driver.findElements(By.xpath('.//*'))
        wait.until(ExpectedConditions.textToBePresentInElement(interestedPeople.first(), userTwo))
    }

    private void submitWorkshopInformation(String userName, String workshopName, String workshopDtls) {
        WebElement nameInput = driver.findElement(By.id('name_input'))
        nameInput.sendKeys(userName)

        WebElement newWorkshopInput = driver.findElement(By.id('new_workshop_title'))
        newWorkshopInput.sendKeys(workshopName)

        WebElement newWorkshopDetails = driver.findElement(By.id('new_workshop_details'))
        newWorkshopDetails.sendKeys(workshopDtls)
    }
}
