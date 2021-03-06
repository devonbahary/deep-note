import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFolder, updateFolder } from '../../actions/folders';
import { openHeadFolderModal } from '../../actions/headFolderModal';
import { addNote } from '../../actions/notes';
import { promptRenameFolder } from '../../utils';

const FolderHeader = ({ folder, addFolder, updateFolder, addNote, isNotesLoading, openHeadFolderModal }) => {
  const promptAddFolder = () => {
    const name = prompt('Enter a name for the new folder:', '');
    if (name !== null) addFolder({ name, parentId: folder._id });
  };

  const handleRename = () => {
    const folderToRename = { _id: folder._id, name: folder.name };
    promptRenameFolder(folderToRename, updateFolder);
  };

  const handleAddNote = () => {
    if (isNotesLoading) return;
    addNote({ parentId: folder._id });
  };

  const isHead = folder && !folder.parentId;
  const folderName = folder && folder.name;

  if (!folder) return (<header className="FolderHeader"></header>);
  return (
    <header className="FolderHeader">
      {isHead ? (
        <div className="FolderHeader__Link" onClick={openHeadFolderModal}>
          <i className="fas fa-folder"></i>
        </div>
      ) : (
        <Link to={`/folders/${folder.parentId}`} className="FolderHeader__Link">
          <i className="fas fa-chevron-left"></i>
        </Link>
      )}
      <button type="button" className="FolderHeader__name" onClick={handleRename}>
        {folderName}
      </button>
      <button 
        type="button" 
        className="FolderHeader__folderAction"
        disabled={!folder}
        onClick={promptAddFolder}
      >
        <i className="fas fa-folder-plus"></i>
      </button>
      <button 
        type="button"
        className="FolderHeader__folderAction" 
        disabled={!folder || isNotesLoading}
        onClick={handleAddNote}
      >
        <i className="fas fa-sticky-note"></i>
      </button>
    </header> 
  );
};

const mapStateToProps = state => ({
  isNotesLoading: state.notes.notes.isLoading
})

export default connect(mapStateToProps, { addFolder, updateFolder, addNote, openHeadFolderModal })(FolderHeader);