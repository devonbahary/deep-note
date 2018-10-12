import React from 'react';
import { connect } from 'react-redux';
import { openColorPicker } from '../../actions/colorPicker';
import { Link } from 'react-router-dom';

const ChildFolder = ({ childFolder, openColorPicker, index }) => {
  const childFolderStyle = { animationDelay: `${0.05 * index}s` };
  const childFolderColorTagStyle = { backgroundColor: `${childFolder.color}` };
  const linkTo = `/folders/${childFolder.folderId}`;

  const handleColorPicker = () => {
    openColorPicker(childFolder);
  };

  return (
    <li className="ChildFolder" style={childFolderStyle}>
      <div className="ChildFolder__colorTag" onClick={handleColorPicker}>
        <div className="ChildFolder__color" style={childFolderColorTagStyle}></div>
      </div>
      <Link to={linkTo} className="ChildFolder__Link">
        <div className="ChildFolder__icon">
          <i className="far fa-folder"></i>
        </div>
        <div className="ChildFolder__contents">
          {childFolder.name}
        </div>
        <div className="ChildFolder__arrow" >
          <i className="fas fa-chevron-right"></i>
        </div>
      </Link>
    </li>
  );
}

export default connect(undefined, { openColorPicker })(ChildFolder);