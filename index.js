const express = require("express");
const bodyParser = require("body-parser");
const { request, response } = require("express");
const app = express();
const port = 8000;

app.use(bodyParser.json())
app.use
(
    bodyParser.urlencoded
    ({
        extended: true
    })
)
//home
app.get('/', (request, response) => 
{
    response.json({info: "API for XRides Data"})
})

//queries
const db = require('./public/controller/userData');

//routes
app.get('/users', db.getUserData);
app.post('/users', db.createUserData);
app.get('/users/:id', db.getUserData);
app.delete('/users/:id', db.deleteUserData);
app.put('/users/:id', db.updateUserData);
//app.get('/users/:id', db.getUserData);

app.listen(port, () => 
{
    console.log(`Server running on port ${port}`)
})