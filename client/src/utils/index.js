export const promptRenameFolder = (folder, updateFolderAction) => {
  if (!folder || !updateFolderAction) return;
  const name = prompt('Enter a new name for folder:', folder.name);
  if (name !== null) updateFolderAction({ name }, folder._id);
};

export const promptRemoveFolder = (folder, removeFolderAction) => {
  if (!folder || !removeFolderAction) return;
  const confirmMessage = `Delete folder '${folder.name}' and all its child contents?\n\nMove child contents you don't want deleted into other folders if you want to save them.`;
  if (confirm(confirmMessage)) removeFolderAction(folder);
};

export const promptRenameNote = (note, updateNoteAction) => {
  if (!note || !updateNoteAction) return;
  const name = prompt('Enter a new name for note:', note.name);
  if (name !== null) updateNoteAction({ name }, note._id);
};

export const promptRemoveNote = (note, removeNoteAction) => {
  if (!note || !removeNoteAction) return;
  const confirmMessage = `Delete note '${note.name}'?`;
  if (confirm(confirmMessage)) removeNoteAction(note);
};