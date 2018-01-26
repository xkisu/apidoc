const APIDoc = require('../src/module/index.js');
const api = new APIDoc('./apidoc.json');

const express = require('express');
const app = express();

app.use(api.express('root', function (req, res) {

}));

app.listen(3000, function(){
    console.log('Example ready on http://localhost:3000');
})