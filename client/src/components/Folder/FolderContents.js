import React from 'react';
import ChildFolder from './ChildFolder';
import ChildNote from './ChildNote';
import foldersSelector from '../../selectors/folders';
import notesSelector from '../../selectors/notes';

const FolderContents = ({ folder }) => {
  return (
    <div className="FolderContents">
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
    </div>
  );
};

export default FolderContents;