var mqtt = require('mqtt');

client = mqtt.connect('mqtt://localhost:1883',
        {username: 'username', password: 'password'});
client.publish('simple/test', '139');
client.end();