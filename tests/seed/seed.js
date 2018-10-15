const { ObjectID } = require('mongodb');

const Folder = require('../../models/Folder');
const Note = require('../../models/Note');

const testFolders = [{
  _id: ObjectID(),
  name: 'root'
}, {
  _id: ObjectID(),
  name: 'something'
}];

const populateFolders = done => {
  Folder
    .remove({})
    .then(() => Folder.insertMany(testFolders))
    .then(() => done());
};

module.exports = { testFolders, populateFolders };
