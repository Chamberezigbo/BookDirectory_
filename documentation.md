# Book Directory

> This is a simple API for books

## create users

> This is use to create user and store in the database

- **ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/users>

- **METHOD :** `POST`

- **PARAMETERS :**

```JSON

    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "gender": String
```

- Response

```JSON
        "user": {
        "_id": "60fffd6b6d8855001564c518",
        "firstName": "chamber",
        "lastName": "ezigbo",
        "email": "testing@gmail.com",
        "password": "$2b$08$U6E42Ir7SIdTHVftHDJ16eqm5u09WOy27RCNfrKh/BNcf/lq6z44.",
        "gender": "male",
        "tokens": [
            {
                "_id": "60fffd6b6d8855001564c51b",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZmZmQ2YjZkODg1NTAwMTU2NGM1MTgiLCJpYXQiOjE2MjczODkyOTF9.HLgLcPRyJNyV2VYAPVHTIpP2hB5mZDiEvVIzcDs9yTQ"
            }
        ],
        "createdAt": "2021-07-27T12:34:51.081Z",
        "updatedAt": "2021-07-27T12:34:51.133Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZmZmQ2YjZkODg1NTAwMTU2NGM1MTgiLCJpYXQiOjE2MjczODkyOTF9.HLgLcPRyJNyV2VYAPVHTIpP2hB5mZDiEvVIzcDs9yTQ"

```

## login user

> Here you have to login

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/users/login>

**METHOD:** `POST`
**PARAMETER:**

```JSON

    "email": String,
    "password": String


```

Response

```JSON

    "user": {
        "_id": "60fffd6b6d8855001564c518",
        "firstName": "chamber",
        "lastName": "ezigbo",
        "email": "testing@gmail.com",
        "gender": "male",
    }

```

## logout user

> Here you have to logout user

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/users/logout>

**METHOD:** `POST`
**PARAMETER:**

> you don't need a parameter

Response

```JSON

    "user": {
        "_id": "60fffd6b6d8855001564c518",
        "firstName": "chamber",
        "lastName": "ezigbo",
        "email": "testing@gmail.com",
        "password": "$2b$08$U6E42Ir7SIdTHVftHDJ16eqm5u09WOy27RCNfrKh/BNcf/lq6z44.",
        "gender": "male",
    }

```

## Edit user

> Here you have to edit your user

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/users/me>

**METHOD:** `POST`
**PARAMETER:**

```JSON

    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "gender": String



```

Response

```JSON

    "user": {
        "_id": "60fffd6b6d8855001564c518",
        "firstName": "chamber",
        "lastName": "ezigbo",
        "email": "testing@gmail.com",
        "gender": "male",
    }

```

## That's all for the user next will be a router for books

## Create a book

> this router create a book for the particular user authenticated with it

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/books>

**METHOD:** `POST`
**PARAMETER:**

```JSON

    "title": String,
    "description": String,
    "published": String,
    "author": String,
    "startedDate": String,
    "endedDate": String,
    "bookCover": file



```

Response

```JSON

    "book": {

    }

```

## Get a book by id

> this route generate a book by id

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/books/:id>

**METHOD:** `GET`
**PARAMETER:**
`None`

Response

```JSON

    "book": {

    }

```

## Edit book

> this route helps you to edit a book by id

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/books-update/:id>

**METHOD:** `PUT`
**PARAMETER:**

```JSON

    "endedDate": String,
    "summary": String



```

Response

```JSON

    "book": {

    }

```

## Delete book

> this route helps you to delete a book by id

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/books/:idbooks-update/:id>

**METHOD:** `Delete`
**PARAMETER:**
`None`

Response

```JSON

    "book": {

    }
```

## Publics users router

> this is for the public route to generate a book by title or author

**ENDPOINT:** <https://secret-woodland-98197.herokuapp.com/books-title-author>

**METHOD:** `Get`
**PARAMETER:**

```JSON

    "title": String or
    "author": String


```

Response

```JSON

    "book":{

    }

```
