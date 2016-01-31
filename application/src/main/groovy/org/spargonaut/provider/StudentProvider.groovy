package org.spargonaut.provider

import org.spargonaut.dao.StudentDAO

import static groovy.json.JsonOutput.toJson

class StudentProvider {

    StudentDAO studentDAO

    StudentProvider(StudentDAO studentDAO) {
        this.studentDAO = studentDAO
    }

    def createStudent(final studentInfo) {
        studentDAO.insert(toJson(studentInfo))
    }
}
