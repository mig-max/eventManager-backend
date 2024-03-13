# EventSlap (Backend Server)

- Deployed live version: [Live demo](https://eventslap.netlify.app)

## Description
Eventslap is a full-stack web application based on the MERN stack.
This repository contains the backend code for the server of this application. It is a RESTful API built with ExpressJS, MongoDB, and Mongoose.

It allows logged-in users to manage all the events and venues that they own in the database doing full CRUD. Anonymous users can see venues, events and free events,
and also doing search by name or date. Logged-in users can create new venues and events, and view all existing ones.

## Frontend
- Frontend client  repo: [Frontend Client Repo](https://github.com/mig-max/eventManager-frontend)

## Instructions
To run on your computer, follow these steps:
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file with the following environment variables:
   - `ORIGIN`: with the location of your frontend app (example, `ORIGIN=https://yourapp.netlify.com`).
   - `TOKEN_SECRET`: used to sign auth tokens (example, `TOKEN_SECRET=ilovepizza`).
4. Run the application: `npm run dev`.


## Environment variables

### Hosted on your localhost:

Add the following environment variables in `.env` files:

#### Server
- `PORT=<your-port>` (5005)
- `ORIGIN=http:/http://localhost:5173/`
- `TOKEN_SECRET=<your-token-secret>`

#### Cloudinary credentials for image upload
- `CLOUDINARY_NAME = add-your-cloudinary-name`
- `CLOUDINARY_KEY = add-your-cloudinary-key`
- `CLOUDINARY_SECRET = add-your-cloudinary-secret`

#### Client
- `VITE_APP_URL=http://localhost:5005`


### Case 2: Creating your own deployment

#### Backend using adaptable.io

- `TOKEN_SECRET=<your-token-secret>`
- `MONGODB_URI=mongodb+srv://<your-mongodb-atlas-password-+-name-of-db>`
- `ORIGIN=<your-netlify-app-domain>`

- `CLOUDINARY_NAME = add-your-cloudinary-name`
- `CLOUDINARY_KEY = add-your-cloudinary-key`
- `CLOUDINARY_SECRET = add-your-cloudinary-secret`

#### Fronted using netlify.app
- `CI=false` (required for SPA applications deployed on this service to redirect requests to index.html)
- `VITE_API_URL=<your-adaptable-app-domain>`

- `CLOUDINARY_NAME = add-your-cloudinary-name`
- `CLOUDINARY_KEY = add-your-cloudinary-key`
- `CLOUDINARY_SECRET = add-your-cloudinary-secret`


### API Routes

##### Event routes

| HTTP verb | URL                    | Request body | Action                      |
| --------- | -----------------------| ------------ | ----------------------------|
| GET       | `/events`              | (empty)      | Returns all the events      |
| POST      | `/events`              | JSON         | Adds a new event            |
| GET       | `/events/:eventId`     | (empty)      | Returns the specified event |
| PUT       | `/events/:eventId`     | JSON         | Edits the specified event   |
| DELETE    | `/events/:eventId`     | (empty)      | Deletes the specified evet  |

##### Venue routes

| HTTP verb | URL                | Request body | Action                      |
| --------- | -------------------| ------------ | --------------------------- |
| GET       | `/venues`          | (empty)      | Returns all the venues      |
| POST      | `/venues`          | JSON         | Adds a new venue            |
| GET       | `/venues/:venueId` | (empty)      | Returns the specified venue |
| PUT       | `/venues/:venueId` | JSON         | Edits the specified venue   |
| DELETE    | `/venues/:venueId` | (empty)      | Deletes the specified venue |

##### User routes

| HTTP verb | URL             | Request body | Action                      |
| --------- | ----------------| -------------| ----------------------------|
| GET       | `/user/:userId` | (empty)      | Returns the specified user  |
| PUT       | `/user/:userId` | JSON         | Edits the specified user    |
| DELETE    | `/user/:userId` | (empty)      | Deletes the specified user  |

##### Auth routes

| HTTP verb | URL            | Request Headers                 | Request Body              |
| --------- | -------------- | ------------------------------- | ------------------------- |
| POST      | `/auth/signup` | --                              | { email, password, name } |
| POST      | `/auth/login`  | --                              | { email, password }       |
| GET       | `/auth/verify` | Authorization: Bearer \< JWT \> | --                        |

##### Index routes

| HTTP verb | URL            | Request Headers                 | Request Body                   |
| --------- | -------------- | ------------------------------- | -------------------------------|
| POST      | `/api/upload`  | JSON                            | Route that receives the image, |
                                                               | sends it to Cloudinary via the |
                                                               | fileUploader and returns the   |
                                                               | image URL                      |
<hr>

#### Models

##### Event Model

```js
{
    title: { type: String, required: true, unique: true },
    eventType: { 
        type: [String],
        enum: [
            "Concert",
            "Exhibition",
            "Market",
            "Party",
            "Theatre",
            "Other",
        ],
        required: true,
    },
    imageUrl: {
        type: String,
        default: "https://www.format.com/wp-content/uploads/celebrate-event-photography.jpg",
    },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    isEighteen: { type: Boolean},
    isFree: { type: Boolean},
    price: { type: Number}, 
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
}
```

##### Venue Model

```js
{
    name: {type: String, required: true, unique: true},
    venueType: {
        type: String, 
        enum: ["Outdoor", "Indoor", "Other"], required: true},
    capacity: {type: Number},
    isFoodAvailable: {type: Boolean},
    isDrinksAvailable: {type: Boolean},
    event: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event"
    },
    imageUrl: {
        type: String,
        default: "https://memo.thevendry.com/wp-content/uploads/2022/06/iStock-13447299461.jpg",
    },
    address: {
        type: String, 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }

}
```

##### User Model

```js
{
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    username: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
    },
    about: {
      type: String,
      default: "I am using EventSlap.",
    }
```


