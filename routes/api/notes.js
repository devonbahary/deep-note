const _ = require('lodash');
const express = require('express');
const Folder = require('../../models/Folder');
const Note = require('../../models/Note');

const router = express.Router();

// @route   GET /api/notes/:id
// @desc    get Note
// @access  public
router.get('/:id', (req, res) => {
  Note
    .findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.sendStatus(404));
});

// @route   POST /api/notes
// @desc    create new Note
// @access  public
router.post('/', (req, res) => {
  const { name, parentFolderId } = req.body;
  if (!parentFolderId) return res.sendStatus(400);
  const newNote = new Note({ name, parentFolderId });

  newNote
    .save()
    .then(note => {
      Folder
        .findById(parentFolderId)
        .then(parentFolder => {
          parentFolder.childNotes.push({ 
            name: note.name, 
            noteId: note.id
          });
          parentFolder
            .save()
            .then(() => res.json(note));
        })
    })
    .catch(err => res.sendStatus(400));
});

// @route   PATCH /api/notes/:id
// @desc    update Note
// @access  public
router.patch('/:id', (req, res) => {
  const updates = { name, text } = req.body;
  Note
    .findById(req.params.id)
    .then(note => {
      note.set(updates);
      note
        .save()
        .then(updatedNote => {
        if (!updatedNote.parentFolderId) {
          res.json(updatedNote);
          return;
        }
        Folder
          .findById(updatedNote.parentFolderId)
          .then(parentFolder => {
            parentFolder.childNotes
              .find(childNote => updatedNote._id.equals(childNote.noteId))
              .set({ ...updates, lastUpdated: Date.now() });
            parentFolder.save().then(() => res.json(updatedNote));
          });
      });
    })
    .catch(err => res.sendStatus(400));
});

// // @route   DELETE /api/folders/:id
// // @desc    delete Folder and all child Folders recursively
// // @access  public
// router.delete('/:id', (req, res) => {
//   const ids = [];
//   Folder
//     .getIdsRecursively(req.params.id, ids)
//     .then(() => {
//       Folder
//         .findById(req.params.id)
//         .then(folder => {
//           if (folder.parentId) {
//             return Folder
//               .update({ _id: folder.parentId }, { $pull: { childFolders: { folderId: req.params.id } } })
//               .then(() => Promise.resolve());
//           } else {
//             return Promise.resolve();
//           }
//         })
//         .then(() => Folder.deleteMany({ _id: { $in: ids } }))
//         .then(() => res.sendStatus(200))
//     })
//     .catch(err => { console.log(err); res.sendStatus(400); });
// });

module.exports = router;
