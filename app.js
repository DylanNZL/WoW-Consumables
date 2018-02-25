const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cron = require('cron');

const index = require('./routes/index.js');
const api = require('./routes/api.js');

let app = express();

const blizzardApi = require('./blizzardApi.js');
const database = require('./database.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api*', api);
app.use('/feast', (req, res) => { res.sendFile(path.join(__dirname + '/public/feast.html')) });
app.use('/alchemy', (req, res) => { res.sendFile(path.join(__dirname + '/public/alchemy.html')) });
app.use('/food', (req, res) => { res.sendFile(path.join(__dirname + '/public/food.html')) });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.error(Date.now() + " App Error: " + err);
});

// blizzardApi.getAHData(); // uncomment to refresh auction house

/**
 * Runs once a day to grab the latest auction house data
 * It is set to run at 3 PM UTC (3AM NZST) as that time suits me, can easily be changed by setting the 15 part of cronTime to a different hour
 */
let newDownload = new cron.CronJob({
    cronTime : '0 0 15 * * *',
    onTick   : function () {
        blizzardApi.getAHData();
    },
    start    : true,
    timeZone : 'UTC'
});

module.exports = app;
