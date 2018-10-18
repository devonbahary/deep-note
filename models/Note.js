const mongoose = require('mongoose');
const { Schema } = mongoose;


const NoteSchema = new Schema({
  parentId: Schema.Types.ObjectId,
  name: String,
  text: String,
  color: {
    type: String,
    default: '#DDDDDD'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

NoteSchema.pre('save', function(next) {
  this.name = this.name ? this.name.trim() : '';
  this.lastUpdated = Date.now();
  next();
});

module.exports = Note = mongoose.model('Note', NoteSchema);
