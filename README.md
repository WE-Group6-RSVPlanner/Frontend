# RsvplannerFrontend

Website Frontend for Event Planning!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

## Starting Server
- Install node.js (I used v18.17.1 but above v16 should work)
- Change to project-folder (`cd rsvplanner-frontend`) and install node modules (`npm install`)
- **FIRST:** Start the Database-Container (docker-compose.yml) and Backend-Service of the Backend-Repo: https://github.com/WE-Group6-RSVPlanner/Backend
- Run `ng serve` for the dev server. 
- Navigate to `http://localhost:4200/`.

## Accessability
Lighthouse Report for each page:
 - Dashboard: 95% - Email not bindable to arial-label
 - New Public + Private Event: 90% - LastPass not adaptable
 - Search Public Events: 95% - Email not bindable to arial-label
 - My Events (Logged Out): 100%
 - My Events (Logged In): 96% - Email not bindable to arial-label
