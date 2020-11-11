//dependencies
var express = require('express');
var path = require('path');

//set-up Express App
var app = express();
var port = 3000;

//set-up Express to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//data
var available = [];
var waitingList = [];

//routes
    //to ajax page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/add', function (req, res) {
    res.sendFile(path.join(__dirname, 'reservation.html'));
});

app.get('/tables', function (req, res)  {
    res.sendFile(path.join(__dirname, 'tables.html'));
});
    //displays reservations
app.get('/api/tables', function (req, res)  {
    return res.json(available);
});
app.get('/api/waitlist', function (req, res)    {
    return res.json(waitingList);
});

//creating new reservations
app.post('/api/reservation', function (req, res)    {
    var newR = req.body; //= JSON post
    newR.routeName = newR.name.replace(/\s+/g, '').toLowerCase();
        console.log(newR);
    
    //true/false for where to push
    var full = false;
        if  (available.length <= 5) {
            available.push(newR);
        } else  {
            waitingList.push(newR);
            full = true;
        }
    
    res.json(newR);
});

//clear arrays
app.post('/api/clear', function(req,res)  {
    available = [];
    waitingList = [];
})

//start server listening
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});