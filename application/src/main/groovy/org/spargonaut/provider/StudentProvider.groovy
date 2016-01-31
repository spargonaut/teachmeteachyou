package org.spargonaut.provider

import com.google.inject.Inject
import org.spargonaut.dao.StudentDAO

import static groovy.json.JsonOutput.toJson

class StudentProvider {

    @Inject
    StudentDAO studentDAO

    def createStudent(final studentInfo) {
        studentDAO.insert(toJson(studentInfo))
        studentDAO.getStudentByName(studentInfo.name)
    }
}
