import React from 'react';
import { connect } from 'react-redux';
import { updateFolder, removeFolder } from '../../actions/folders';
import { openColorPicker } from '../../actions/colorPicker';
import { closeFolderChildAction, moveToFolderChildAction, endMoveToFolderChildAction } from '../../actions/folderChildAction';
import { promptRenameFolder, promptRenameNote, promptRemoveFolder, promptRemoveNote } from '../../utils';
import Modal from 'react-modal';
import { updateNote, removeNote } from '../../actions/notes';

Modal.setAppElement('#app')


const FolderChildAction = ({ 
  child, 
  domRef,
  isOpen,
  isMoveTo, 
  parentFolder, 
  closeFolderChildAction, 
  moveToFolderChildAction,
  endMoveToFolderChildAction, // might use in future
  openColorPicker, 
  updateFolder, 
  removeFolder,
  updateNote,
  removeNote
}) => {
  const handleRequestClose = () => closeFolderChildAction();

  const getMoveableFolderLocations = () => {
    const folders = parentFolder.childFolders.filter(folder => folder._id !== child._id);
    if (parentFolder.parentId) folders.push(parentFolder);
    return folders;
  }

  const handleColorPicker = () => {
    const isFolder = !!child.folderId;
    const _id = isFolder ? child.folderId : child.noteId;
    const { color } = child;
    const itemType = isFolder ? 'folder': 'note';
    openColorPicker({ _id, color }, itemType);
    handleRequestClose();
  };

  const handleRenameAction = () => {
    if (child && child.folderId) {
      const folder = { _id: child.folderId, name: child.name };
      promptRenameFolder(folder, updateFolder);
    } else if (child && child.noteId) {
      const note = { _id: child.noteId, name: child.name };
      promptRenameNote(note, updateNote);
    }
    handleRequestClose();
  };

  const handleMoveTo = () => moveToFolderChildAction();

  const handleChangeFolder = newParentId => {
    if (newParentId !== child.parentId) {
      if (child.folderId) {
        updateFolder({ parentId: newParentId }, child.folderId);
      } else if (child.noteId) {
        updateNote({ parentId: newParentId }, child.noteId);
      }
    }
    handleRequestClose();
  };

  const handleDeleteAction = () => {
    if (child.folderId) {
      const folder = { 
        _id: child.folderId,
        name: child.name,
        parentId: parentFolder._id
      };
      promptRemoveFolder(folder, removeFolder); 
    } else if (child.noteId) {
      const note = {
        _id: child.noteId,
        name: child.name,
        parentId: parentFolder._id
      };
      promptRemoveNote(note, removeNote);
    }
    handleRequestClose();
  };
    

  const modalStyle = {};
  let pointerClass;
  if (domRef) {
    const boundingRect = domRef.getBoundingClientRect();
    let top = boundingRect.top + boundingRect.height;
    if (top < window.innerHeight / 2) {
      modalStyle.top = `${top - 1}px`;
      pointerClass = 'FolderChildAction__pointer--top';
    } else {
      modalStyle.bottom = `${window.innerHeight - boundingRect.top + 1}px`;
      pointerClass = 'FolderChildAction__pointer--bottom';
    }
  }
  const modalClass = isOpen ? 'FolderChildAction--open' : 'FolderChildAction';

  let bodyContents;
  if (isMoveTo) {
    bodyContents = (
      <div className="FolderChildAction__menu">
        <div className={pointerClass}></div>
        <div className="FolderChildAction__action--moveToTitle">
          Move to...
        </div>
        <ul className="FolderChildAction__moveToOptions">
          {getMoveableFolderLocations()
            .map(folder => {
              return folder === parentFolder ? (
                <li className="FolderChildAction__action--parent" key={folder._id} onClick={() => handleChangeFolder(folder.parentId)}>
                  <div className="FolderChildAction__actionIcon">
                    <i className="fas fa-arrow-up"></i>
                  </div>
                  <div className="FolderChildAction__actionText">
                    {folder.name}
                  </div>
                </li>
              ) : (
                <li className="FolderChildAction__action" key={folder._id} onClick={() => handleChangeFolder(folder.folderId)}>
                  {folder.name}
                </li>
              );
          })}
        </ul>
      </div>
    );
  } else {
    bodyContents = (
      <div className="FolderChildAction__menu">
        <div className={pointerClass}></div>
        <div className="FolderChildAction__action" onClick={handleRenameAction}> 
          Rename
        </div>
        <div className="FolderChildAction__action" onClick={handleColorPicker}> 
          Color Picker
        </div>
        <div className="FolderChildAction__action" onClick={handleMoveTo}>
          Move to...
        </div>
        <div className="FolderChildAction__action" onClick={handleDeleteAction}>
          Delete
        </div>
      </div>
    );
  }

  return (
    <Modal
      style={{ content: modalStyle }}
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      contentLabel="Folder Child Action"
      className={modalClass}
      overlayClassName="FolderChildAction__Overlay"
      closeTimeoutMS={150}
    >
      {bodyContents}
    </Modal>
  );
};

const mapStateToProps = state => ({
  isOpen: state.folderChildAction.isOpen,
  isMoveTo: state.folderChildAction.isMoveTo,
  child: state.folderChildAction.child,
  domRef: state.folderChildAction.domRef
});

export default connect(
  mapStateToProps, { 
    closeFolderChildAction, 
    moveToFolderChildAction,
    endMoveToFolderChildAction,
    openColorPicker, 
    updateFolder, 
    removeFolder,
    updateNote,
    removeNote
})(FolderChildAction);
