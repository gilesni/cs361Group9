var fs = require('fs'); //file system
var path = require('path'); //library that finds paths based of the name use on line 11
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); //makes variables out of all of the files in the public library

app.get('/', (req, res, next) => {
  var postData = postData[];
  if (postData) {
    var templateArgs = {
      groupPost: postData.posts,
    };
    res.render('mainPage', templateArgs);
  } else {
    next();
  }
});

app.get('*', (req, res) => {
  res.status(404).render('404Page');
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on port ", port);
});
