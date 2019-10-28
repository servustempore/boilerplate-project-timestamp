// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp API endpoint
app.get("/api/timestamp/:date_string?", function (req, res) {
  const dateString = req.params.date_string;

  if (!dateString) {
    const dateNow = new Date(Date.now());
    
    res.json({unix: dateNow.getTime(), utc: dateNow.toUTCString()});
  } 
  else {
      let requestedDateObj;

      if (isNaN(dateString)) {
        // date string is actually a string timestamp
        requestedDateObj = new Date(dateString);
      } else {
        // date string is actually a number timestamp
        requestedDateObj = new Date(parseInt(dateString));
      }
      
      // An odd way to check if the instantiated date object generates valid time data (js Date object is very bad, better use moment js)
      if (!isNaN(requestedDateObj.getTime())) {
        const response = {
          unix: requestedDateObj.getTime(),
          utc: requestedDateObj.toUTCString()
        };
  
        res.json(response);
      }
      else {
        res.json({"error" : "Invalid Date" });
      }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});