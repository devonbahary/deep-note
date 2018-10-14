import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { closeHeadFolderModal } from '../../actions/headFolderModal';
import Modal from 'react-modal';

const HeadFolderModal = ({ closeHeadFolderModal, isOpen, history }) => {
  const handleRequestClose = () => closeHeadFolderModal();
  
  const promptDisconnect = () => {
    if (confirm('If you disconnect, you cannot reconnect with this head folder again without knowing its ID. Disconnect anyway?')) {
      localStorage.removeItem('headFolderId');
      handleRequestClose();
      history.push('/');
    }
  }

  const headFolderId = localStorage.getItem('headFolderId');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      contentLabel="Head Folder Modal"
      className="HeadFolderModal"
      overlayClassName="HeadFolderModal__Overlay"
      closeTimeoutMS={250}
    >
      <header className="HeadFolderModal__header">
        <div className="HeadFolderModal__headerIcon">
          <i className="fas fa-arrow-circle-right"></i>
        </div>
        <div className="HeadFolderModal__headerText">
          Head Folder
        </div>
      </header>
      <div className="HeadFolderModal__body">
        <p>Your head folder is the one you connect to when you enter the app. It leads to all your other child folders.</p> 
        <p>If you disconnect from it, you <b>cannot</b> connect with it again without knowing its ID.</p>
        <hr />
        <div className="HeadFolderModal__headFolderId">
          {headFolderId}
        </div>
        <hr />
        <div className="HeadFolderModal__buttonContainer">
          <button type="button" className="HeadFolderModal__button" onClick={promptDisconnect}>
            Disconnect
          </button>
        </div>
      </div>
    </Modal>
  )
};

const mapStateToProps = state => ({
  isOpen: state.headFolderModal.isOpen
});

export default connect(mapStateToProps, { closeHeadFolderModal })(withRouter(HeadFolderModal));