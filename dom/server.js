var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

app.listen(10000, (err) => {
  if (!err) {
    console.log("Server listening on port 10000");
  }
});
