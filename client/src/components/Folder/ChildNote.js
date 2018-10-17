import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openFolderChildAction } from '../../actions/folderChildAction';
import { LONG_PRESS_DELAY, FOLDER_CHILD_APPEAR_ANIM_DELAY } from '../../settings';

class ChildNote extends React.Component {
  state = {
    isPressed: false
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
      this.props.history.push(`/folders/${this.props.childNote.parentId}/notes/${this.props.childNote.noteId}`);
    }
  };

  handleLongPress = () => {
    this.setState(() => ({ isPressed: false }));
    this.props.openFolderChildAction(this.props.childNote, this.refNode);
  };
  render() {
    const { childNote, parentId, index } = this.props;
    const linkTo = `/folders/${parentId}/notes/${childNote.noteId}`;
    const childNoteClass = this.state.isPressed ? 'ChildNote--pressed' : 'ChildNote';
    const childNoteStyle = { animationDelay: `${FOLDER_CHILD_APPEAR_ANIM_DELAY * index}s` };
    return (
      <li className={childNoteClass} style={childNoteStyle} ref={ref => this.refNode = ref}>
        <div></div>
        <div className="ChildNote__content"
          onTouchStart={this.handleContentPress}
          onTouchEnd={this.handleContentRelease}
          onMouseDown={this.handleContentPress}
          onMouseUp={this.handleContentRelease}
        >
          <div className="ChildNote__icon">
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

export default connect(mapStateToProps, { openFolderChildAction })(withRouter(ChildNote));