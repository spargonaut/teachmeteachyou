package org.spargonaut

import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.htmlunit.HtmlUnitDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import spock.lang.Specification

@SuppressWarnings('AbcMetric')
class TMTYSpecification extends Specification {

    private static final String WORKSHOP_SUBMIT_BUTTON_ID = 'workshop_submit'
    private static final String WORKSHOP_TITLE_CLASSNAME = 'workshop_title'
    private static final String WORKSHOP_FORM_ID = 'workshop_form'
    private static final String NAME_DISPLAY_CLASSNAME = 'name_display'
    private static final String WORKSHOP_DETAILS_HEADER_ID = 'workshop_header'

    private static final String WORKSHOP_CREATOR = 'aloicious abercrombie'
    private static final String WORKSHOP_NAME  = 'some new workshop'
    private static final String WORKSHOP_DETAILS = 'these are some more details'
    private static final String WORKSHOP_FORM_BUTTON_ID = 'workshop_form_button'
    private static final String ADD_TEACHER_INPUT_ID = 'add_teacher_input'
    private static final String ADD_INTEREST_INPUT_ID = 'add_interest_input'
    private static final String INSTRUCTOR_CLASSNAME = 'instructor'
    private static final int MAX_TIME_TO_WAIT_FOR_ELEMENT = 2

    WebDriver driver = new HtmlUnitDriver(true)

    void setup() {
        driver.get 'http://localhost:30213'
    }

    void cleanup() {
        driver.quit()
    }

    void 'a user can create a new workshop request and see the details of that workshop' () {
        given: 'a user clicks the create workshop button'
        driver.findElement(By.id(WORKSHOP_FORM_BUTTON_ID)).click();

        expect: 'the create workshop form is visible'
        ExpectedConditions.presenceOfElementLocated(By.id(WORKSHOP_FORM_ID))

        when: 'the user fills in the form with that information and clicks the create button'
        submitWorkshopInformation(WORKSHOP_CREATOR, WORKSHOP_NAME, WORKSHOP_DETAILS)

        then: 'the new workshop shows up in the workshop list'
        WebDriverWait wait = new WebDriverWait(driver, MAX_TIME_TO_WAIT_FOR_ELEMENT)
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.className(NAME_DISPLAY_CLASSNAME), WORKSHOP_CREATOR))
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.className(WORKSHOP_TITLE_CLASSNAME), WORKSHOP_NAME))

        and: 'the workshop form is no longer visible'
        wait.until(ExpectedConditions.not(
                ExpectedConditions.presenceOfAllElementsLocatedBy(By.id(WORKSHOP_FORM_ID))))

        when: 'the user clicks on a workshop to view the details of a workshop'
        driver.findElement(By.className(WORKSHOP_TITLE_CLASSNAME)).click()

        then: 'the details of that workshop are displayed on the page'
        wait.until(ExpectedConditions.textToBePresentInElementLocated(
                By.id(WORKSHOP_DETAILS_HEADER_ID), WORKSHOP_CREATOR))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id(WORKSHOP_DETAILS_HEADER_ID), WORKSHOP_NAME))
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(By.id('workshop_details_details'), WORKSHOP_DETAILS))

        when: 'the user clicks the done button'
        driver.findElement(By.id('done_button')).click()

        then: 'the main workshop page loads again'
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.className(NAME_DISPLAY_CLASSNAME), WORKSHOP_CREATOR))
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.className(WORKSHOP_TITLE_CLASSNAME), WORKSHOP_NAME))
    }

    void 'a user can indicate they are interested in a previously created workshop' () {
        given: 'a workshop is already created'
        String interestedUser = 'Michael Stipe'
        driver.findElement(By.id(WORKSHOP_FORM_BUTTON_ID)).click();
        submitWorkshopInformation(WORKSHOP_CREATOR, WORKSHOP_NAME, WORKSHOP_DETAILS)

        and: 'the user views the details of the workshop'
        WebDriverWait wait = new WebDriverWait(driver, MAX_TIME_TO_WAIT_FOR_ELEMENT)
        wait.until(ExpectedConditions.presenceOfElementLocated(By.className(WORKSHOP_TITLE_CLASSNAME)))
        driver.findElement(By.className(WORKSHOP_TITLE_CLASSNAME)).click()

        when: 'the user adds their name to the interested list'
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id(ADD_INTEREST_INPUT_ID)))
        driver.findElement(By.id(ADD_INTEREST_INPUT_ID)).sendKeys(interestedUser)

        and: 'clicks Im interested'
        driver.findElement(By.id('add_interest_button')).click()

        then: 'that users name appears in the interested users list'
        wait.until(
                ExpectedConditions.textToBePresentInElementLocated(
                        By.xpath('//div[@id=\'interested_people\']/div[last()]'), interestedUser))
    }

    void 'a user can indicate that they can teach a workshop' () {
        given: 'a workshop is already created'
        String teacherUser = 'peter buck'
        driver.findElement(By.id(WORKSHOP_FORM_BUTTON_ID)).click();
        submitWorkshopInformation(WORKSHOP_CREATOR, WORKSHOP_NAME, WORKSHOP_DETAILS)

        and: 'the user views the details of the workshop'
        WebDriverWait wait = new WebDriverWait(driver, MAX_TIME_TO_WAIT_FOR_ELEMENT)
        wait.until(ExpectedConditions.presenceOfElementLocated(By.className(WORKSHOP_TITLE_CLASSNAME)))
        driver.findElement(By.className(WORKSHOP_TITLE_CLASSNAME)).click()

        when: 'that user indicates they can teach that class'
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id(WORKSHOP_DETAILS_HEADER_ID)))
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id(ADD_TEACHER_INPUT_ID)))
        driver.findElement(By.id(ADD_TEACHER_INPUT_ID)).sendKeys(teacherUser)
        driver.findElement(By.id('add_teacher_button')).click()

        then: 'that users name appears as signed up to teach that workshop'
        wait.until(ExpectedConditions.presenceOfElementLocated(By.className(INSTRUCTOR_CLASSNAME)))
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.className(INSTRUCTOR_CLASSNAME), teacherUser))
    }

    private void submitWorkshopInformation(String userName, String workshopName, String workshopDtls) {
        driver.findElement(By.id('name_input')).sendKeys(userName)
        driver.findElement(By.id('new_workshop_title')).sendKeys(workshopName)
        driver.findElement(By.id('new_workshop_details')).sendKeys(workshopDtls)
        driver.findElement(By.id(WORKSHOP_SUBMIT_BUTTON_ID)).click()
    }
}
