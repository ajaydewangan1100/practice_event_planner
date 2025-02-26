# EVENT PLANNER

## Steps

1. `cd backend`
2. `npm init -y`
3. `npm i express cors dotenv morgan nodemon mongoose`
4. create `server.js`
5. `"type": "module"`
6. `.env`
7.

## Routes -

### USER routes

- POST - `/signup`
- POST - `/signin`

### EVENTS routes

- POST - `/createevent` - create a new event
- DELETE - `/deleteevent` - delete a event
- PATCH - `/updateevent` - update a sigle event
- GET - `/getsingleevent` - get sigle event
- GET - `/events` - show all events

## Dependencies

- Express
- mongoose
- nodemon
- morgan
- dotenv
- cors
- bcrypt
- jsonwebtoken
- cookie-parser
