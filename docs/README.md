# Full Stack Assignment
## Setup local
   
## Base models
### Get User 
```
{
    createdAt: date,
    updatedAt: date,
    username: string    
}
```
### Submit User 
```
{
    password: string,
    username: string
}
```
### Get Full User 
```
{
    createdAt: date,
    likes: integer,
    updatedAt: date,
    username: string,
}
```

## Endpoints
### BASE URL `/`
Auth routes
* URL: `/login`
    * METHOD: `POST`
    * BODY: [User model](#submit-user)
    * RESPONSE: `JWT token`
    * RESPONSE CODE: `200`
* URL: `/signup`
    * METHOD: `POST`
    * BODY: [User model](#submit-user)
    * RESPONSE: [User model](#get-user)
    * RESPONSE CODE: `200`

### BASE URL `/Users`
User routes
* URL: `/me`
    * METHOD: `GET`
    * RESPONSE: [User model](#get-full-user)
    * RESPONSE CODE: `200`
* URL: `/me/update-password`
    * METHOD: `POST`
    * BODY: 
    ```
    {
        oldPassword: string,
        newPassword: string
    }
    ```
    * RESPONSE: `{}`
    * RESPONSE CODE: `200`
* URL: `/most-liked`
    * METHOD: `GET`
    * RESPONSE: `Array<`[Full User model](#get-full-user)`>`
    * RESPONSE CODE: `200`
* URL: `/:userId`
    * METHOD: `GET`
    * PARAMS: `UserId` Get user with this id
    * RESPONSE: `Array<`[Full User model](#get-full-user)`>`
    * RESPONSE CODE: `200`
* URL: `/:userId/like`
    * METHOD: `GET`
    * PARAMS: `UserId` Like user with this id
    * RESPONSE: `{}`
    * RESPONSE CODE: `200`
* URL: `/:userId/unlike`
    * METHOD: `GET`
    * PARAMS: `UserId` Remove like from user with this id
    * RESPONSE: `{}`
    * RESPONSE CODE: `200`
