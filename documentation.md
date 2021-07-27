# Book Directory
> This is use to create books

## create users
> This is use to create user and store in the database

- **ENDPOINT:** https://secret-woodland-98197.herokuapp.com/

- **METHOD : ** `POST`
- **PARAMETERS :**
```JSON

    "firstName": "chamber",
    "lastName": "ezigbo",
    "email": "testing@gmail.com",
    "password": "testing",
    "gender": "male"
```
- response
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