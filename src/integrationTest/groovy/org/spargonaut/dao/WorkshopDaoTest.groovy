package org.spargonaut.dao

import static groovy.json.JsonOutput.toJson

import org.spargonaut.model.Workshop

import org.skife.jdbi.v2.DBI
import org.skife.jdbi.v2.Handle
import org.skife.jdbi.v2.TransactionCallback
import org.skife.jdbi.v2.TransactionStatus
import spock.lang.Specification

class WorkshopDaoTest extends Specification {

    private static DBI dbi
    private static WorkshopDao workshopDAO

    private void setupSpec() {
        dbi = setupDbi()
        removeAllWorkshops()
        workshopDAO = dbi.onDemand(WorkshopDao)
    }

    private void setup() {
        removeAllWorkshops()
    }

    private void cleanupSpec() {
        removeAllWorkshops()
    }

    private static DBI setupDbi() {
        String dbHost = System.getenv("DB_HOST") ?: 'localhost'
        String dbName = System.getenv("DB_NAME") ?: 'cognitiveConnections'
        String dbUsername = System.getenv("DB_USERNAME") ?: 'postgres'
        String dbPassword = System.getenv("DB_PASSWORD") ?: ''
        new DBI("jdbc:postgresql://${dbHost}/${dbName}", dbUsername, dbPassword)
    }

    private static void removeAllWorkshops() {
        List databaseTables = ['workshop']
        databaseTables.each { tableName ->
            String query = "delete from \"${tableName}\""
            executeStatement(query)
        }
    }

    private static Object executeStatement(String query, entity = null) {
        dbi.inTransaction(new TransactionCallback() {
            @Override
            Object inTransaction(Handle conn, TransactionStatus status) throws Exception {
                if (entity) {
                    conn
                            .createStatement(query)
                            .bind(0, toJson(entity.asMap()))
                            .execute()
                } else {
                    conn
                            .createStatement(query)
                            .execute()
                }
            }
        })
    }

    void 'should add a new workshop and be able to get it by ID'() {
        setup:
        UUID workshopId = UUID.randomUUID()
        Workshop workshop = new Workshop('jane doe', workshopId, 'something to do', 'some details')
        workshopDAO.insert(workshop)

        Workshop expectedWorkshop = new Workshop('jane doe', workshopId, 'something to do', 'some details')

        expect:
        workshopDAO.getWorkshopById(workshopId.toString()) == expectedWorkshop
    }

    void 'should update a new workshop and get the updated information by the workshop ID'() {
        setup:
        UUID workshopId = UUID.randomUUID()
        Workshop originalWorkshop = new Workshop('jane doe', workshopId, 'something to do', 'some details')
        workshopDAO.insert(originalWorkshop)
        Workshop updatedWorkshop = new Workshop('jane doe', workshopId, 'something to do', 'some details')
        updatedWorkshop.addInterestedPerson('billy joe')
        updatedWorkshop.addInterestedPerson('mike smith')
        updatedWorkshop.addInstructor('Tom Theteacher')
        workshopDAO.update(updatedWorkshop)

        Workshop expectedWorkshop = new Workshop('jane doe', workshopId, 'something to do', 'some details')
        expectedWorkshop.addInterestedPerson('billy joe')
        expectedWorkshop.addInterestedPerson('mike smith')
        expectedWorkshop.addInstructor('Tom Theteacher')

        expect:
        workshopDAO.getWorkshopById(workshopId.toString()) == expectedWorkshop
    }
}
