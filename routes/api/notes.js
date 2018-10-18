const _ = require('lodash');
const express = require('express');
const Folder = require('../../models/Folder');
const Note = require('../../models/Note');

const router = express.Router();

const updateParentFolderWithChildUpdates = (parentId, updatedChildNote) => {
  return Folder
    .findById(parentId)
    .then(parentFolder => {
      if (!parentFolder) return Promise.reject(new Error('tried to update a non-existant parent'));

      if (updatedChildNote.parentId.equals(parentId)) {
        const childNote = parentFolder.childNotes.find(childNote => childNote.noteId.equals(updatedChildNote._id));
        if (!childNote && updatedChildNote.parentId.equals(parentFolder._id)) {
          // add if this is new parent to child note
          parentFolder.childNotes.push({ 
            name: updatedChildNote.name, 
            noteId: updatedChildNote.id,
            color: updatedChildNote.color
          });
          return parentFolder.save().then(updatedParentFolder => updatedParentFolder);
        } else {
          // update ongoing parent with updated child note
          childNote.set({
            name: updatedChildNote.name,
            color: updatedChildNote.color,
            lastUpdated: Date.now() 
          });
          return parentFolder.save().then(updatedParentFolder => updatedParentFolder);
        }
      } else {
        // remove if no longer parent 
        parentFolder.childNotes = parentFolder.childNotes.filter(childNote => !childNote.noteId.equals(updatedChildNote._id));
        return parentFolder.save().then(updatedParentFolder => updatedParentFolder);
      }
    });
};

// @route   GET /api/notes/:id
// @desc    get Note
// @access  public
router.get('/:id', (req, res) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if (!note) return res.sendStatus(404);
      res.json(note)
    })
    .catch(err => res.sendStatus(400));
});

// @route   POST /api/notes
// @desc    create new Note
// @access  public
router.post('/', (req, res) => {
  const { name, parentId } = req.body;
  if (!parentId) return res.sendStatus(400);
  const newNote = new Note({ name, parentId });

  newNote
    .save()
    .then(note => {
      Folder
        .findById(parentId)
        .then(parentFolder => {
          if (!parentFolder) throw new Error('Cannot create a note without a parentId.')
          parentFolder.childNotes.push({ 
            name: note.name, 
            noteId: note.id,
            color: note.color
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
//            returns an object of updated documents: { note: {...}, parentFolders: [{...}] }
// @access  public
router.patch('/:id', (req, res) => {
  const updates = { name, color, parentId, text } = req.body;
  Note
    .findById(req.params.id)
    .then(note => {
      const prevParentId = note.parentId;
      note.set(updates);
      note
        .save()
        .then(updatedNote => {
          if (updates.name || updates.color || updates.parentId) {
            if (updatedNote.parentId.equals(prevParentId)) {
              updateParentFolderWithChildUpdates(prevParentId, updatedNote)
                .then(updatedParentFolder => res.json({ note: updatedNote, parentFolders: [ updatedParentFolder ] }));
            } else {
              Promise.all([
                updateParentFolderWithChildUpdates(prevParentId, updatedNote),
                updateParentFolderWithChildUpdates(updatedNote.parentId, updatedNote)
              ])
              .then(updatedParentFolders => res.json({ note: updatedNote, parentFolders: updatedParentFolders }))
              .catch(err => res.sendStatus(400));
            }
          } else {
            return res.json({ note: updatedNote, parentFolders: [] });
          }
        });
    })
    .catch(err => res.sendStatus(400));
});

// @route   DELETE /api/notes/:id
// @desc    delete Note
// @access  public
router.delete('/:id', (req, res) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if (!note) throw new Error('Cannot delete Note that doesn\'t exist.');

      Promise.all([
        Folder 
          .findById(note.parentId)
          .then(parentFolder => {
            parentFolder.childNotes = parentFolder.childNotes.filter(childNote => !childNote.noteId.equals(note._id));
            parentFolder.save().then(() => Promise.resolve());
          }),
        Note 
          .deleteOne({ _id: note._id })
          .then(() => Promise.resolve())
      ])
      .then(() => res.sendStatus(200));
    })
    .catch(err => res.sendStatus(400));
});

module.exports = router;
