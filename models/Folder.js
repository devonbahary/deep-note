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
  color: String,
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

FolderSchema.statics.getIdsRecursively = function(folderId, childFolderIds, childNoteIds) {
  childFolderIds.push(folderId);
  return this
    .findById(folderId)
    .then(folder => {
      if (folder.childNotes.length) folder.childNotes.forEach(childNote => childNoteIds.push(childNote.noteId));
      if (folder.childFolders.length) {
        return Promise.all(folder.childFolders.map(childFolder => this.getIdsRecursively(childFolder.folderId, childFolderIds)));
      }
      return Promise.resolve();
    });
};


FolderSchema.pre('save', function (next) {
  this.name = this.name ? this.name.trim() : '';
  this.lastUpdated = Date.now();
  if (!this.childFolders.length) this.childFolders = [];
  if (!this.childNotes.length) this.childNotes = [];
  this.childFolders.forEach(childFolder => childFolder.name = childFolder.name ? childFolder.name.trim() : '');
  this.childNotes.forEach(childNote => childNote.name = childNote.name ? childNote.name.trim() : '');
  next();
});

module.exports = Folder = mongoose.model('Folder', FolderSchema); 
