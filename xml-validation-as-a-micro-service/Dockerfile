FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=target/dependency
ARG APP=xml-validation-as-a-micro-service
COPY ${DEPENDENCY}/BOOT-INF/lib /${APP}/lib
COPY ${DEPENDENCY}/META-INF /${APP}/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /${APP}
ARG ENTRY_POINT_ARG=${APP}+":"+${APP}+"/lib/*"
ENTRYPOINT ["java","-cp","xml-validation-as-a-micro-service:xml-validation-as-a-micro-service/lib/*","com.validate.ValidationServicesApplication"]