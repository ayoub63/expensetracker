# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Create .m2 directory and configure Maven settings
RUN mkdir -p /root/.m2 && \
    echo '<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" \
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 \
  https://maven.apache.org/xsd/settings-1.0.0.xsd"> \
  <mirrors> \
    <mirror> \
      <id>central-secure</id> \
      <url>https://repo1.maven.org/maven2</url> \
      <mirrorOf>central</mirrorOf> \
    </mirror> \
  </mirrors> \
</settings>' > /root/.m2/settings.xml

# Set Maven options for better network handling
ENV MAVEN_OPTS="-Dmaven.wagon.http.pool=false \
                -Dmaven.wagon.http.retryHandler.count=3 \
                -Dmaven.wagon.http.timeoutMillis=120000"

COPY pom.xml .
COPY src ./src

# Run Maven with increased timeout
RUN mvn clean package -DskipTests --batch-mode \
    -Dhttp.socketTimeout=120000 \
    -Dhttp.connectionTimeout=120000

# Run stage
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/expensetracker-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]