# Full Stack Assignment
## Setup local
   To setup project make sure you have docker installed
   
  * Go into the main directory `full-stack-driton` and run `docker-compose build`
  * When build has finished run `docker-compose up`
  * When containers are up go into container (Node is not started automatically so you can run tests first)
    * First into the web container `docker exec -it full-stack-web bash` 
        * Here you can run `npm start` or `npm test`
    * Second into the api container `docker exec -it full-stack-api bash`
        * Here you can run `npm start` or `npm test`
  * When both containers have been started and `npm start` has been run you can go to `localhost:3000` to checkout the app
  
 Note: There are some users and likes into the database out of the box so you can see functionality with less efort
        
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
    id: integer,
    userLikes: [ users ],
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
