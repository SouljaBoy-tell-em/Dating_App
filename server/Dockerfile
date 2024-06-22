FROM maven:3.9.5

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src src

CMD ["mvn", "spring-boot:run"]