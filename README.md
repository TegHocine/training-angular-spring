# Project Setup Guide

## Prerequisites
- Ensure you have Docker installed.
- Install Node.js.
- Make sure you have Java (JDK 17 or higher) installed.
- swagger: http://localhost:8080/swagger-ui/index.html#/

## Cloning the Repository
Start by cloning the repository to your local machine:
git clone https://github.com/TegHocine/training-angular-spring.git

---

## Backend (Spring Boot) Setup

1. **Navigate to the backend directory:**
   cd back

2. **Start the services using Docker:**
   Make sure Docker is running, then bring up the backend containers in the background:
   docker-compose up -d

3. **Build and run the Spring Boot project:**
   After the Docker services are up, use the following command to start the Spring Boot application:
   ./mvnw spring-boot:run

---

## Frontend (Angular) Setup

1. **Navigate to the frontend directory:**
   cd front

2. **Install Angular dependencies:**
   Run the following command to install all required dependencies:
   npm install

3. **Start the Angular development server:**
   Once dependencies are installed, start the Angular app:
   npm run start / ng serve

