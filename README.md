# random-profile-generator

Fun random profile generator API. More info when it's done.

## how to run

### server

All the standard npm stuff like npm install, node server...

### database

To boot up a local pg docker instance run: docker run -p 5432:5432 --name activity-collage-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -d postgres

Run pgadmin4 (optional): docker run -e PGADMIN_DEFAULT_EMAIL="insert email” -e PGADMIN_DEFAULT_PASSWORD="password" -p 5555:80 --name pgadmin dpage/pgadmin4

Run docker inspect <postgres's ID> to check IPAddress but should be 172.17.0.2, dump that into host name/address when creating new server in pgadmin4.

## docs + info

Express backend. Simple controller model routes architecture.

### routes

### database
