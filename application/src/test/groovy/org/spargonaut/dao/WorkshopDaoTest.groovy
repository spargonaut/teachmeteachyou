package org.spargonaut.dao

import org.skife.jdbi.v2.DBI
import org.skife.jdbi.v2.Handle
import org.skife.jdbi.v2.TransactionCallback
import org.skife.jdbi.v2.TransactionStatus
import spock.lang.Specification

import static groovy.json.JsonOutput.toJson


class WorkshopDaoTest extends Specification {

    static DBI dbi
    static WorkshopDao workshopDAO

    void setupSpec() {
        dbi = setupDbi()
        removeAllWorkshops()
        workshopDAO = dbi.onDemand(WorkshopDao)
    }

    void setup() {
        removeAllWorkshops()
    }

    void cleanupSpec() {
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
        List databaseTables = ['student']
        databaseTables.each { tableName ->
            def query = "delete from \"${tableName}\""
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

    def 'should add a new workshop and be able to get it by ID'() {
        setup:
        def workshopId = UUID.randomUUID().toString()
        def workshop = [workshopId: workshopId,
                        name: "jane doe",
                        workshop_title: "something to do"]
        println "------>${workshop.getClass()}<-------"
        workshopDAO.insert(toJson(workshop))

        expect:
        def actualWorkshop = workshopDAO.getWorkshopById(workshopId)
        workshop == actualWorkshop
    }
}
