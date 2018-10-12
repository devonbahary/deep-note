import React from 'react';
import { Link } from 'react-router-dom';

const ChildNote = ({ childNote, parentFolderId, index }) => {
  const linkTo = `/folders/${parentFolderId}/notes/${childNote.noteId}`;
  const childNoteStyle = { animationDelay: `${0.05 * index}s` };

  return (
    <div className="ChildNote" style={childNoteStyle}>
      <div></div>
      <Link to={linkTo} className="ChildNote__Link">
        <div className="ChildNote__icon">
          <i className="far fa-sticky-note"></i>
        </div>
        <div className="ChildNote__contents">
          {childNote.name}
        </div>
        <div className="ChildNote__arrow" >
          <i className="fas fa-chevron-right"></i>
        </div>
      </Link>
    </div>
  );
};

export default ChildNote;