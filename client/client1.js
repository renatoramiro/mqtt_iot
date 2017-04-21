var mqtt = require('mqtt');

// username = user_id -- password = device_id
client = mqtt.connect('mqtt://localhost:1883',
        {username: '587aa6072314f60b420bed28', password: '58b8c144a936960ca3760233'});
client.publish('587aa6072314f60b420bed28/58b8c144a936960ca3760233',
					parseInt(Math.random() * 100).toString());
client.end();
