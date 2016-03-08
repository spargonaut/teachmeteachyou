package org.spargonaut.dao.jdbi

import com.fasterxml.jackson.databind.ObjectMapper
import org.skife.jdbi.v2.SQLStatement
import org.skife.jdbi.v2.sqlobject.Binder
import org.skife.jdbi.v2.sqlobject.BinderFactory
import org.skife.jdbi.v2.sqlobject.BindingAnnotation

import java.lang.annotation.Annotation
import java.lang.annotation.ElementType
import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy
import java.lang.annotation.Target

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@BindingAnnotation(ModelBinderFactory)
public @interface BindModel {
    public static class ModelBinderFactory implements BinderFactory {
        public Binder build(Annotation annotation) {
            new Binder<BindModel, Object>() {
                public void bind(SQLStatement q, BindModel bind, Object arg) {
                    ObjectMapper mapper = new ObjectMapper()
                    q.bind('value', mapper.writeValueAsString(arg))
                }
            }
        }
    }
}
