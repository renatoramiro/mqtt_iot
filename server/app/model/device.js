var mongoose = require('mongoose');

module.exports = device;

function device() {
  var dataSchema = new mongoose.Schema({
    data: { type: Number, min: 0, required: true },
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'devices' },
    public_device_id: { type: String },
    created_at: { type: Date, default: Date.now }
  });

  var deviceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    datas: [dataSchema]
  });

  return mongoose.model('devices', deviceSchema);
}