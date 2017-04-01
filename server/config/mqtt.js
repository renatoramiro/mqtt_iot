var mosca = require('mosca');
var mongoose = require('mongoose');
var load = require('express-load');

module.exports = function () {
  var server = new mosca.Server(settings);
  var settings = {
    port: 1883
  };

  // set database
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/database');

  load('model', { cwd: 'app' })
    .into(server);

  return server;
}