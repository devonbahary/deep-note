import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openColorPicker } from '../../actions/colorPicker';
import { openFolderChildAction } from '../../actions/folderChildAction';
import { LONG_PRESS_DELAY, FOLDER_CHILD_APPEAR_ANIM_DELAY } from '../../settings';

class ChildNote extends React.Component {
  state = {
    isPressed: false
  };

  handleColorPicker = () => {
    const _id = this.props.childNote.noteId;
    const { color } = this.props.childNote;
    const itemType = 'note';
    this.props.openColorPicker({ _id, color }, itemType);
  };

  handleContentPress = () => {
    this.setState(() => ({ isPressed: true }));
    this.buttonPressTimer = setTimeout(() => this.handleLongPress(), LONG_PRESS_DELAY);
  };

  handleContentRelease = e => {
    e.preventDefault();
    this.setState(() => ({ isPressed: false }));
    clearTimeout(this.buttonPressTimer);
    if (!this.props.isFolderChildActionOpen) {
      this.props.history.push(`/folders/${this.props.parentId}/notes/${this.props.childNote.noteId}`);
    }
  };

  handleLongPress = () => {
    this.setState(() => ({ isPressed: false }));
    this.props.openFolderChildAction(this.props.childNote, this.refNode);
  };
  render() {
    const { childNote, index } = this.props;
    
    const childNoteClass = this.state.isPressed ? 'ChildNote--pressed' : 'ChildNote';
    const childNoteStyle = { animationDelay: `${FOLDER_CHILD_APPEAR_ANIM_DELAY * index}s` };
    const childNoteIconStyle = {borderLeft: `2px solid ${childNote.color}` };

    return (
      <li className={childNoteClass} style={childNoteStyle} ref={ref => this.refNode = ref}>
        <div></div>
        <div className="ChildNote__content"
          onTouchStart={this.handleContentPress}
          onTouchEnd={this.handleContentRelease}
          onMouseDown={this.handleContentPress}
          onMouseUp={this.handleContentRelease}
        >
          <div className="ChildNote__icon" style={childNoteIconStyle}>
            <i className="far fa-sticky-note"></i>
          </div>
          <div className="ChildNote__contents">
            {childNote.name}
          </div>
          <div className="ChildNote__arrow" >
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </li>
    );
  }
};

const mapStateToProps = state => ({
  isFolderChildActionOpen: state.folderChildAction.isOpen
});

export default connect(mapStateToProps, { openFolderChildAction, openColorPicker })(withRouter(ChildNote));