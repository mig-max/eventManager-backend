
### API Documentation

We will start our project by first documenting all of the routes and data models for our API. Following best practices we will use _verbs_ to specify the type of operation being done and _nouns_ when naming endpoints.

#### Routes

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

               |


<hr>

#### Models

##### Event Model

```js
{
  title: { type: String, required: true, unique: true },
    eventType: { 
        type: [String],
        enum: [
            "concert",
            "exhibition",
            "market",
            "party",
            "theatre",
            "other",
        ],
        required: true,
    },
    description: { type: String, required: true },
    time: { type: Date, required: true, default: Date.now },
    isEighteen: { type: Boolean},
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
    },
}
```

##### Venue Model

```js
{
  name: {type: String, required: true, unique: true},
    venueType: {
        type: String, 
        enum: ["outdoor", "indoor", "other"], required: true},
    capacity: {type: Number},
    isFoodAvaiable: {type: Boolean, required: true},
    isDrinksAvaiable: {type: Boolean, required: true},
    event: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event"
    },
    imageUrl: {
        type: String,
        default: "https://picsum.photos/seed/picsum/200/300",
    },
    address: {type: String, required: true},
}
```

##### User Model

```js
{
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://picsum.photos/seed/picsum/200/300",
    },
    about: {type: String }   
}
```


