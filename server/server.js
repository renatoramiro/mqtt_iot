var server = require('./config/mqtt')();
var Device = require('./app/model/device')();
var io = require('socket.io')(3131);
var deviceFound;

server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running.');
  server.authenticate = authenticate;
}

// Accepts the connection if the user_id and device_id are valid
function authenticate(client, user_id, device_id, callback) {
  var authorized;
  Device.findOne({_id: device_id, userId: user_id}, function (err, device) {
    if (err) authorized = false;
    if (!device) authorized = false;
    if (!authorized && device) {
      authorized = true
      deviceFound = device;
    }

    callback(null, authorized);
  });
}

server.on('published', function (packet, client) {
  if (packet.topic.indexOf('clients') < 0) {
    var payload = String.fromCharCode.apply(null, packet.payload);
    deviceFound.datas.push({
      data: parseInt(payload),
      deviceId: deviceFound._id,
      public_device_id: deviceFound.public_id
    });
    deviceFound.save(function (err) {
      if (err) {
        console.error(err);
        io.emit('news', {error: err});
        return;
      }
      io.emit('news', {hello: payload})
      console.info('Data was successfully created.')
    });
  }
});













// server.on('clientConnected', function (client) {
//   console.log('client connected: ', client.id);
// });

// server.on('subscribed', function (topic, client) {
//   console.log('Subscribed: ', topic);
// });

// server.on('unsubscribed', function (topic, client) {
//   console.log('Unsubscribed: ', topic);
// });

// server.on('clientDisconnecting', function (client) {
//   console.log('client disconnecting: ', client.id);
// });

// server.on('clientDisconnected', function (client) {
//   console.log('client disconnected: ', client.id);
// });