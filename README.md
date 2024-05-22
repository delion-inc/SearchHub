# SearchHub



docker run -d --name db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=hackathon -p 5432:5432 postgres



docker run -p 8080:8080 --name backend -e SPRING_DATASOURCE_URL=jdbc:postgresql://172.17.0.2:5432/hackathon -e SPRING_DATASOURCE_USERNAME=postgres -e SPRING_DATASOURCE_PASSWORD=12345 -e SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver bethakzs/hackathon:backend
