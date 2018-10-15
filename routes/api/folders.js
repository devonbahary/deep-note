const _ = require('lodash');
const express = require('express');
const Folder = require('../../models/Folder');

const router = express.Router();

const updateParentFolderWithChildUpdates = (parentId, updatedChildFolder) => {
  return Folder
    .findById(parentId)
    .then(parentFolder => {
      if (!parentFolder) return Promise.reject(new Error('tried to update a non-existant parent'));

      if (updatedChildFolder.parentId.equals(parentId)) {
        const childFolder = parentFolder.childFolders.find(childFolder => childFolder.folderId.equals(updatedChildFolder._id));
        if (!childFolder && updatedChildFolder.parentId.equals(parentFolder._id)) {
          // add if this is new parent to child folder
          parentFolder.childFolders.push({ 
            name: updatedChildFolder.name, 
            folderId: updatedChildFolder.id,
            color: updatedChildFolder.color
          });
          return parentFolder.save().then(updatedParentFolder => updatedParentFolder);
        } else {
          // update ongoing parent with updated child folder
          childFolder.set({
            name: updatedChildFolder.name,
            color: updatedChildFolder.color,
            lastUpdated: Date.now() 
          });
          return parentFolder.save().then(updatedParentFolder => updatedParentFolder);
        }
      } else {
        // remove if no longer parent 
        parentFolder.childFolders = parentFolder.childFolders.filter(childFolder => !childFolder.folderId.equals(updatedChildFolder._id));
        return parentFolder.save().then(updatedParentFolder => updatedParentFolder);
      }
    });
};

// @route   GET /api/folders/:id
// @desc    get Folder
// @access  public
router.get('/:id', (req, res) => {
  Folder
    .findById(req.params.id)
    .then(folder => {
      if (!folder) return res.sendStatus(404);
      res.json(folder);
    })
    .catch(err => res.sendStatus(400));
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
          if (!parentFolder) return res.json(folder);

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
//            returns an object of updated documents: { folder: {...}, parentFolders: [{...}] }
// @access  public
router.patch('/:id', (req, res) => {
  const updates = {name, color, parentId } = req.body;
  Folder
    .findById(req.params.id)
    .then(folder => {
      const prevParentId = folder.parentId;
      folder.set(updates);
      folder
        .save()
        .then(updatedFolder => {
          if (!updatedFolder.parentId && !prevParentId) {
            return res.json({ folder: updatedFolder, parentFolders: [] });
          } else if (updatedFolder.parentId.equals(prevParentId)) {
            updateParentFolderWithChildUpdates(prevParentId, updatedFolder)
              .then(updatedParentFolder => res.json({ folder: updatedFolder, parentFolders: [ updatedParentFolder ] }));
          } else {
            Promise.all([
              updateParentFolderWithChildUpdates(prevParentId, updatedFolder),
              updateParentFolderWithChildUpdates(updatedFolder.parentId, updatedFolder)
            ])
            .then(updatedParentFolders => res.json({ folder: updatedFolder, parentFolders: updatedParentFolders }))
            .catch(err => res.sendStatus(400));
          }
      });
    })
    .catch(err => res.sendStatus(400));
});

// @route   DELETE /api/folders/:id
// @desc    delete Folder and all child Folders recursively
// @access  public
router.delete('/:id', (req, res) => {
  const childrenToRemoveIds = [];
  Folder
    .getIdsRecursively(req.params.id, childrenToRemoveIds)
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
        .then(() => Folder.deleteMany({ _id: { $in: childrenToRemoveIds } }))
        .then(() => res.sendStatus(200))
    })
    .catch(err => res.sendStatus(400));
});

module.exports = router;
