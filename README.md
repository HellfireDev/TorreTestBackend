# Fullstack Test: Backend

Hero's Journey App API was made with Node.js, Express and PostgreSQL. 

## Endpoints
- /register: Register a new user which has a valid torre id. 
- /signin: Provides access to the frontend app.
- /profile: Returns 3 random strengths, interests and experiences of logged user.
- /combo: Returns 3 job opportunities and 3 potential mentors based on 3 input criteria.

## Main App URL
https://herosjourneyapp.herokuapp.com/

## Backend URL
https://heros-journey-be.herokuapp.com/

## Frontend Project
https://github.com/HellfireDev/TorreTestFrontend/

## Project Structure

- config: Query parameters for torre calls & torre endpoints.
- controllers: Endpoints logic.
- helpers: Abstracted logic mainly for API calls and cleaning up main components.
- model: DB connection.
- scripts: Local DB creation script.
- server.js: Logic entry point.
