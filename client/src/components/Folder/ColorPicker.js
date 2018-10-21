import React from 'react';
import { connect } from 'react-redux';
import { closeColorPicker } from '../../actions/colorPicker';
import Modal from 'react-modal';
import { updateFolder } from '../../actions/folders';
import { updateNote } from '../../actions/notes';
import colors from '../../settings/colors';

Modal.setAppElement('#app')


const ColorPicker = ({ activeColor, itemId, isFolder, closeColorPicker, isOpen, updateFolder, updateNote }) => {
  const handleSelectColor = color => {
    if (activeColor !== color) {
      const id = itemId;
      if (isFolder) {
        updateFolder({ color }, id );
      } else { // Folder
        updateNote({ color }, id );
      }
    }
    closeColorPicker();
  }

  const handleCloseButton = () => closeColorPicker();

  const colorsLength = Object.keys(colors).length;
  const animationDelay = 0.05;
  const closeTimeoutMS = colorsLength * animationDelay * 1000;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeColorPicker}
      contentLabel="Color Picker"
      className="ColorPicker"
      overlayClassName="ColorPicker__Overlay"
      closeTimeoutMS={closeTimeoutMS}
    >
      <ul className="ColorPicker__colorList">
        {Object.keys(colors).map((colorName, index) => {
          const colorCode = colors[colorName].code;
          const colorText = colors[colorName].textColor;

          const style = { backgroundColor: `${colorCode}`, color: `${colorText}` };
          style.animationDelay = isOpen ? `${index * 0.05}s` : `${(length - index) * 0.05}s`;
          if (colorCode === activeColor) {
            style.borderLeft = `5px solid ${colorText}`;
          }
          
          return (
            <li 
              className="ColorPicker__option" 
              onClick={() => handleSelectColor(colorCode)}
              style={style}
              key={colorName} 
            >
              <div className="ColorPicker__optionName">
                {colorName}
              </div>
              <div className="ColorPicker__optionCode">
                {colorCode}
              </div>
            </li> 
          );
        })}
      </ul>
      <button type="button" className="ColorPicker__btnClose" onClick={() => handleCloseButton()}>
        <i className="fas fa-times"></i>
      </button>
    </Modal>
  );
};

const mapStateToProps = state => {
  const activeColor = state.colorPicker.selectionItem && state.colorPicker.selectionItem.color;
  const itemId = state.colorPicker.selectionItem && state.colorPicker.selectionItem._id;
  const isOpen = state.colorPicker.isOpen;
  const isFolder = state.colorPicker.itemType === 'folder';
  return {
    activeColor,
    itemId,
    isFolder,
    isOpen
  };
};

export default connect(mapStateToProps, { closeColorPicker, updateFolder, updateNote })(ColorPicker);