const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: String,
  text: String,
  isCheck: Boolean,
  creationTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model('Tasks', taskSchema);