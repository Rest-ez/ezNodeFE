//test request

const express = require('express');
const hbs = require('hbs');
// const ejs = require('')
const port = process.env.PORT || 3000;

var app = express();

var Client = require('node-rest-client').Client;
 
var client = new Client();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const request = require('request');

app.get('/chores', function(req, res) {
request({
    url: process.env.chores-list,
    json: true
}, (error, response, body) => {
//console.log(body);
const chores = body.todos
res.render('pages/main.hbs', {
        todos: chores
    });

  });
});
app.post('/chores', (req, res) => {
    var text = req.body.tasktext;
    var assignedTo = req.body.assignedTo;
    console.log(text);
    // set content-type header and data as json in args parameter 
    var args = {
    data: { text: text,
          assignedTo: assignedTo},
    headers: { "Content-Type": "application/json" }
    };
    
    //async await begins
    client.post(process.env.chores-list, args, function (data, response) {
    // parsed response body as js object 
         tasks = data.todos;
  
    return tasks
    });
    // redirect client to individual just added chore page
    res.redirect(307,'/chore-added');
   
   
   });
app.post('/chore-added', (req, res) => {
    
  res.render('pages/chore-success.hbs', {
    pageTitle: 'Added Chore Page',
      
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});