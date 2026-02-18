# Stage 1: Build backend and frontend
FROM maven:3.8.1-openjdk-11 AS builder

WORKDIR /app

# Copy the entire project
COPY . /app/

# Build backend
WORKDIR /app/server
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Build frontend
WORKDIR /app/front-end
RUN npm install && npm run build

# Stage 2: Runtime
FROM openjdk:11-jre-slim

WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/server/target/*.jar app.jar

# Copy built frontend (optional, if serving static files)
COPY --from=builder /app/front-end/build /app/public

EXPOSE 8080

ENV JAVA_OPTS=""
CMD ["java", "-Dserver.port=8080", "-jar", "app.jar"]
