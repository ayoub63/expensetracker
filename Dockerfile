# Use OpenJDK as base image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the compiled JAR file from the target directory into the container
COPY target/expensetracker-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that your Spring Boot app runs on (default 8080)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]