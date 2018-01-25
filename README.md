# apidoc

This is a work in progress! At this point, it is a concept with some rough code.

Platform for writing API specifications, code, and documentation all in one file. 

Write a single JSON file to generate API docs and easily create Express routes on the server side, and call the routes from the client side without having to repeat your route paths everywhere.

The doc should allow for a wide range of configuration, including things like automatically including access token headers on certain routes without the app needed to set it on the required routes manually. 

Example Express code:
```JavaScript
const APIDoc = require('apidoc')
const api = new APIDoc('./mydoc.json')

const express = require('express')
const app = express()

// #apidoc.express() creates an express router, handles validation for parameters, exposes parameters and any other required data, and then passess it to the standard callback structure for express
app.use(api.express('myRouteName', function(req, res){
    const name = req.api.param.name;
}))
```

Example Frontend code: 
```JavaScript
API.init('https://myapidoc');

API.call('myRouteName', {
    parameters: {
        'name': 'Kisu Mitieru'
    }
})
```