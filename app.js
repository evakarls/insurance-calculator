const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const quoteRoute = require('./api/routes/quotes');

//middleware
const urlencodedParser = bodyParser.urlencoded({extended: true})
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST')
    return res.status(200)({});
  }
  next();
})

//routes to handle requests
app.use('/api/v1/quote', urlencodedParser, quoteRoute);

//error message in case of 404 errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//display more detailed error messages
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
