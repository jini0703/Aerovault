# AEROVAULT

Your files. Your space. Your control.

## Requirements
- Node.js 18+
- Java 17 or Java 21 (Note: Java 24 is currently incompatible with Lombok)
- PostgreSQL
- AWS S3 Bucket

## Setup Backend
1. cd backend
2. Update application.yml with your PostgreSQL credentials, JWT secret, and AWS S3 credentials.
3. run `./mvnw clean install` (using Java 17 or 21).
4. run `./mvnw spring-boot:run`

## Setup Frontend
1. cd frontend
2. npm install
3. npm run dev

