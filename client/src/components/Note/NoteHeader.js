import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/notes';
import LoadingSpinner from '../Loading';

const NoteHeader = ({ note, isSaving, saveError, updateNote, onReattemptSave, isSaveFadeout}) => {
  const promptRenameNote = () => {
    const name = prompt('Enter a new name for note:', note.name);
    if (name !== null) {
      updateNote({ name }, note._id);
    }
  };

  if (!note) return (<header className="NoteHeader"></header>);

  const noteNameClass = note.name ? "NoteHeader__name" : "NoteHeader__name--undefined";
  let noteHeaderClass, actionButtonContents;
  if (isSaveFadeout) {
    noteHeaderClass = "NoteHeader--savingFadeout";
    actionButtonContents = (<LoadingSpinner invertColors />);
  } else if (saveError) {
    noteHeaderClass = "NoteHeader--saveError";
    actionButtonContents = (
      <span>
        <i className="fas fa-exclamation-triangle"></i>
        <span className="NoteHeader__saveErrorTxt"> Unsaved</span>
      </span>
    );
  } else if (isSaving) {
    noteHeaderClass = "NoteHeader--saving";
    actionButtonContents = (<LoadingSpinner invertColors />);
  } else {
    noteHeaderClass = "NoteHeader--done";
    actionButtonContents = (<i className="fas fa-check"></i>);
  }

  return note ? (
    <header className={noteHeaderClass}>
      <Link to={`/folders/${note.parentId}`} className="NoteHeader__Link">
        <i className="fas fa-chevron-left"></i>
      </Link>
      <button type="button" className={noteNameClass} onClick={promptRenameNote}>
        {note.name || 'untitled'}
      </button>
      <button 
        type="button"
        className="NoteHeader__action"
        disabled={isSaving}
        onClick={onReattemptSave}
      >
        {actionButtonContents}
      </button>
    </header>
  ) : (
    <header className="NoteHeader"></header>
  );
};

const mapStateToProps = state => ({
  isSaving: state.notes.isSaving,
  saveError: state.notes.saveError
});

export default connect(mapStateToProps, { updateNote })(NoteHeader);