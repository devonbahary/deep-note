import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFolder, updateFolder } from '../../actions/folders';
import { addNote } from '../../actions/notes';

const FolderHeader = ({ folder, addFolder, updateFolder, addNote, isNotesLoading }) => {
  const promptAddFolder = () => {
    const name = prompt('Enter a name for the new folder:', '');
    if (name !== null) addFolder({ name, parentId: folder._id });
  };

  const promptRenameFolder = () => {
    const name = prompt('Enter a new name for folder:', folder.name);
    if (name !== null) {
      updateFolder({ name }, folder._id);
    }
  };

  const handleAddNote = () => {
    if (isNotesLoading) return;
    addNote({ parentFolderId: folder._id });
  };

  const isHead = folder && !!folder.parentId;
  const folderName = folder && folder.name;

  if (!folder) return (<header className="FolderHeader"></header>);
  return (
    <header className="FolderHeader">
      {isHead ? (
        <Link to={`/folders/${folder.parentId}`} className="FolderHeader__Link">
          <i className="fas fa-chevron-left"></i>
        </Link>
      ) : (
        <div className="FolderHeader__Link">
          <i className="fas fa-folder"></i>
        </div>
      )}
      <button type="button" className="FolderHeader__name" onClick={promptRenameFolder}>
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

export default connect(mapStateToProps, { addFolder, updateFolder, addNote })(FolderHeader);