# Use Eclipse Temurin for Java 25 (Ubuntu Noble base)
FROM eclipse-temurin:25-jdk-noble
WORKDIR /app

# Copy the JAR you built with Maven
COPY target/*.jar app.jar

# Standard Spring Boot port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]