FROM maven:3.9-eclipse-temurin-21 AS build

# Install Node.js (maven image is Debian-based)
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/pom.xml ./backend/
COPY frontend/package*.json ./frontend/

RUN cd /app/frontend && npm install

COPY backend ./backend
COPY frontend ./frontend

RUN cd /app/frontend && npm run build
RUN mkdir -p /app/backend/src/main/resources/static
RUN cp -r /app/frontend/dist/* /app/backend/src/main/resources/static/
RUN cd /app/backend && mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/backend/target/*.jar app.jar

COPY backend/data ./data

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]