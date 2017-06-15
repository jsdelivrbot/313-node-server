var express = require('express');
var app = express();
var model = require('./model.js')
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/calcRate', function (request, response) {
  var type = request.query.type;
  var weight = Number(request.query.weight);

  var rate = model.calcRate(type, weight);
  if (rate == 0) {
    response.render('pages/error');
  }
  var data = {
    type: type,
    weight: weight,
    rate: rate
  }

  response.render('pages/index', data)
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
