import React from 'react';
import ChildFolder from './ChildFolder';
import ChildNote from './ChildNote';
import foldersSelector from '../../selectors/folders';
import notesSelector from '../../selectors/notes';

const FolderContents = ({ folder }) => {
  const hasContent = folder.childFolders.length + folder.childNotes.length > 0;
  let bodyContents;
  if (hasContent) {
    bodyContents = (
      <ul>
        {foldersSelector(folder.childFolders).map((childFolder, index) => (
          <ChildFolder key={childFolder._id} childFolder={childFolder} index={index} />
        ))}
        {notesSelector(folder.childNotes).map((childNote, index) => (
          <ChildNote 
            key={childNote._id}
            childNote={childNote} 
            parentId={folder._id} 
            index={folder.childFolders.length + index} 
          />
        ))}
      </ul>
    );
  } else {
    bodyContents = (
      <i className="far fa-folder"></i>
    );
  }
  return (
    <div className={hasContent ? "FolderContents" : "FolderContents--empty"}>
      {bodyContents}
    </div>
  );
};

export default FolderContents;