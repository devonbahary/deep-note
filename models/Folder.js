const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChildFolderSchema = new Schema({
  name: String,
  folderId: Schema.Types.ObjectId,
  color: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const ChildNoteSchema = new Schema({
  name: String,
  noteId: Schema.Types.ObjectId,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const FolderSchema = new Schema({
  name: String,
  parentId: Schema.Types.ObjectId,
  childFolders: [ChildFolderSchema],
  childNotes: [ChildNoteSchema],
  color: {
    type: String,
    default: '#DDDDDD'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

FolderSchema.statics.getIdsRecursively = function(folderId, ids) {
  ids.push(folderId);
  return this
    .findById(folderId)
    .then(folder => {
      if (folder.childFolders.length) {
        return Promise.all(folder.childFolders.map(childFolder => this.getIdsRecursively(childFolder.folderId, ids)));
      }
      return Promise.resolve();
    });
};


FolderSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  if (!this.childFolders.length) this.childFolders = [];
  if (!this.childNotes.length) this.childNotes = [];
  next();
});

module.exports = Folder = mongoose.model('Folder', FolderSchema); 
