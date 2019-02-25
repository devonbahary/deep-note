import React from 'react';
import { connect } from 'react-redux';
import { getNote, saveNote } from '../../actions/notes';
import { Redirect } from 'react-router';
import LoadError from '../LoadError';
import LoadingSpinner from '../Loading';
import NoteHeader from './NoteHeader';
import { SAVE_DELAY, SAVE_ANIM_DELAY } from '../../settings';

class Note extends React.Component {
  state = {
    textarea: (this.props.note && this.props.note.text) || '',
    isSaveFadeout: false
  };

  componentDidMount() {
    if (!this.props.note) this.props.getNote(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.note && !this.props.loadError) this.props.getNote(this.props.id);
    else if (!prevProps.note && this.props.note) this.setState(() => ({ textarea: this.props.note.text || '' }));
    if (prevProps.isSaving && !this.props.isSaving) {
      this.setState(() => ({ isSaveFadeout: true }));
      clearTimeout(this.saveFadeout);
      this.saveFadeout = setTimeout(() => this.setState(() => ({ isSaveFadeout: false })), SAVE_ANIM_DELAY);
    }
  }

  // allow tab to space text instead of leave <textarea>
  // solution from: (https://stackoverflow.com/questions/38385936/change-the-cursor-position-in-a-textarea-with-react)
  handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); 
      const { selectionStart, selectionEnd } = e.target;
      this.setState(prevState => ({
        textarea: prevState.textarea.substring(0, selectionStart) + '\t' + prevState.textarea.substring(selectionEnd)
      }), () => this.textareaNode.selectionStart = this.textareaNode.selectionEnd = selectionStart + 1);
    }
  }

  handleTextareaChange = (e) => {
    e.persist();
    console.log(e.target.value)
    this.setState(() => ({ textarea: e.target.value }));
    clearTimeout(this.pendingSave);
    this.pendingSave = setTimeout(() => this.props.saveNote(this.state.textarea, this.props.note._id), SAVE_DELAY);
  }

  handleReattemptSave = () => this.props.saveNote(this.state.textarea, this.props.note._id);

  render() {
    let bodyContents;
    if (this.props.loadError && this.props.loadError.status === 404) {
      bodyContents = (<Redirect to='/not-found' />);
    } else if (this.props.loadError) {
      bodyContents = (<LoadError />);
    } else if (this.props.isLoading) {
      bodyContents = (<LoadingSpinner />);
    } else if (this.props.note) {
      bodyContents = (
        <textarea
          ref={node => this.textareaNode = node}
          className="Note__bodyTextarea"
          value={this.state.textarea} 
          onChange={this.handleTextareaChange} 
          autoFocus={!this.state.textarea.length}
        />  
      );
    }

    return (
      <div className="Note" onKeyDown={this.handleKeyDown}>
        <NoteHeader 
          note={this.props.note} 
          onReattemptSave={this.handleReattemptSave} 
          isSaveFadeout={this.state.isSaveFadeout}
        />
        <form className="Note__body">
          {bodyContents}
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const note = state.notes.notes.find(note => note._id === id);
  const { isLoading, loadError, isSaving, saveError } = state.notes;
  return { id, note, isLoading, loadError, isSaving, saveError };
};

export default connect(mapStateToProps, { getNote, saveNote })(Note);