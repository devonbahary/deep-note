const _ = require('lodash');
const express = require('express');
const Folder = require('../../models/Folder');
const Note = require('../../models/Note');

const router = express.Router();

// @route   GET /api/folders/:id
// @desc    get folder with its contents using ID
// @access  public
router.get('/:id', (req, res) => {
  Folder
    .findById(req.params.id)
    .then(folder => res.json(folder))
    .catch(err => res.sendStatus(404));
});

// @route   POST /api/folders
// @desc    create new Folder
// @access  public
router.post('/', (req, res) => {
  const { name, parentId } = req.body;
  const newFolder = new Folder({ name, parentId });
  
  newFolder
    .save()
    .then(folder => {
      Folder
        .findById(parentId)
        .then(parentFolder => {
          if (!parentFolder) {
            res.json(folder);
            return;
          }
          parentFolder.childFolders.push({ 
            name: folder.name, 
            folderId: folder.id,
            color: folder.color
          });
          parentFolder
            .save()
            .then(() => res.json(folder));
        })
    })
    .catch(err => res.sendStatus(400));
});

// @route   PATCH /api/folders/:id
// @desc    update Folder
// @access  public
router.patch('/:id', (req, res) => {
  const updates = {name, color } = req.body;
  Folder
    .findById(req.params.id)
    .then(folder => {
      folder.set(updates);
      folder
        .save()
        .then(updatedFolder => {
        if (!updatedFolder.parentId) {
          res.json(updatedFolder);
          return;
        }
        Folder
          .findById(updatedFolder.parentId)
          .then(parentFolder => {
            parentFolder.childFolders
              .find(childFolder => updatedFolder._id.equals(childFolder.folderId))
              .set({ ...updates, lastUpdated: Date.now() });
            parentFolder.save().then(() => res.json(updatedFolder));
          });
      });
    })
    .catch(err => res.sendStatus(400));
});

// @route   DELETE /api/folders/:id
// @desc    delete Folder and all child Folders recursively
// @access  public
router.delete('/:id', (req, res) => {
  const ids = [];
  Folder
    .getIdsRecursively(req.params.id, ids)
    .then(() => {
      Folder
        .findById(req.params.id)
        .then(folder => {
          if (folder.parentId) {
            return Folder
              .update({ _id: folder.parentId }, { $pull: { childFolders: { folderId: req.params.id } } })
              .then(() => Promise.resolve());
          } else {
            return Promise.resolve();
          }
        })
        .then(() => Folder.deleteMany({ _id: { $in: ids } }))
        .then(() => res.sendStatus(200))
    })
    .catch(err => { console.log(err); res.sendStatus(400); });
});

module.exports = router;
