# EVENT PLANNER

## Steps to run Backend

1. `cd backend`
2. `npm install`
3. `npm run start`

## Routes -

### USER routes

- POST - `/signup`
- POST - `/signin`

### EVENT routes

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
- cloudinary
- multer
