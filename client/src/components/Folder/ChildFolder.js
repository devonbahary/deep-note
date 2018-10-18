import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openColorPicker } from '../../actions/colorPicker';
import { openFolderChildAction } from '../../actions/folderChildAction';
import { LONG_PRESS_DELAY, FOLDER_CHILD_APPEAR_ANIM_DELAY } from '../../settings';

class ChildFolder extends React.Component {
  state = {
    isPressed: false
  };

  handleColorPicker = () => {
    const _id = this.props.childFolder.folderId;
    const { color } = this.props.childFolder;
    const itemType = 'folder';
    this.props.openColorPicker({ _id, color }, itemType );
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
      this.props.history.push(`/folders/${this.props.childFolder.folderId}`);
    }
  };

  handleLongPress = () => {
    this.setState(() => ({ isPressed: false }));
    this.props.openFolderChildAction(this.props.childFolder, this.refNode);
  };

  render() {
    const { childFolder, index } = this.props;

    const childFolderClass = this.state.isPressed ? 'ChildFolder--pressed' : 'ChildFolder';
    const childFolderStyle = { animationDelay: `${FOLDER_CHILD_APPEAR_ANIM_DELAY * index}s` };
    const childFolderColorTagStyle = { backgroundColor: `${childFolder.color}` };

    return (
      <li className={childFolderClass} style={childFolderStyle} ref={ref => this.refNode = ref}>
        <div className="ChildFolder__colorTag" onClick={this.handleColorPicker}>
          <div className="ChildFolder__color" style={childFolderColorTagStyle}></div>
        </div>
        <div className="ChildFolder__content" 
          onTouchStart={this.handleContentPress}
          onTouchEnd={this.handleContentRelease}
          onMouseDown={this.handleContentPress}
          onMouseUp={this.handleContentRelease}
        >
          <div className="ChildFolder__icon">
            <i className="far fa-folder"></i>
          </div>
          <div className="ChildFolder__name">
            {childFolder.name}
          </div>
          <div className="ChildFolder__arrow" >
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

export default connect(mapStateToProps, { openColorPicker, openFolderChildAction })(withRouter(ChildFolder));