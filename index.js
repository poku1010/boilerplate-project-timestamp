// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return timestamp for a given date
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // If no date is provided, return the current date
  if (!dateString) {
    date = new Date();
  } else {
    // If the date is a valid Unix timestamp (integer), convert it to an integer
    if (!isNaN(dateString)) {
      dateString = parseInt(dateString);
    }
    date = new Date(dateString);
  }

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    // Return the Unix and UTC timestamps
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
