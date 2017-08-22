const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(function(req,res,next) {
  if(req.headers['x-forwarded-proto'] == 'http') {
    console.log('HTTP call detected, not allowed');
    return res.redirect('https://' + req.hostname + req.path);
  } else {
    console.log('HTTPs call detected, allowed');
    return next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', '..', 'client')));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'index.html'));
  return next;
});


app.listen(app.get('port'), function () {
  console.log('Demo application listening at port', app.get('port'));
});
