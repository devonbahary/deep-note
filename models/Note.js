const mongoose = require('mongoose');
const { Schema } = mongoose;


const NoteSchema = new Schema({
  parentId: Schema.Types.ObjectId,
  name: String,
  text: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

NoteSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = Note = mongoose.model('Note', NoteSchema);
