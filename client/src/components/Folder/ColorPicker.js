import React from 'react';
import { connect } from 'react-redux';
import { closeColorPicker } from '../../actions/colorPicker';
import Modal from 'react-modal';
import { updateFolder } from '../../actions/folders';
import colors from '../../settings/colors';

Modal.setAppElement('#app')

class ColorPicker extends React.Component {
  handleRequestClose = () => {
    this.props.closeColorPicker();
  };

  handleSelectColor = color => {
    if (this.props.activeColor !== color) {
      const id = this.props.childFolderId;
      this.props.updateFolder({ color }, id);
    }
    this.handleRequestClose();
  }

  render() {
    const colorsLength = Object.keys(colors).length;
    const animationDelay = 0.05;

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.handleRequestClose}
        contentLabel="Color Picker"
        className="ColorPicker"
        overlayClassName="ColorPickerOverlay"
        closeTimeoutMS={colorsLength * animationDelay * 1000}
      >
        <ul className="ColorPicker__colorList">
          {Object.keys(colors).map((colorName, index) => {
            const colorCode = colors[colorName].code;
            const colorText = colors[colorName].textColor;

            const style = { backgroundColor: `${colorCode}`, color: `${colorText}` };
            style.animationDelay = this.props.isOpen ? `${index * 0.05}s` : `${(length - index) * 0.05}s`;
            if (colorCode === this.props.activeColor) {
              style.borderLeft = `5px solid ${colorText}`;
            }
            
            return (
              <li 
                className="ColorPicker__option" 
                onClick={() => this.handleSelectColor(colorCode)}
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
      </Modal>
    );
  }
};

const mapStateToProps = state => {
  const activeColor = state.colorPicker.selectionFolder && state.colorPicker.selectionFolder.color;
  const childFolderId = state.colorPicker.selectionFolder && state.colorPicker.selectionFolder.folderId;
  const isOpen = state.colorPicker.isOpen;
  return {
    activeColor,
    childFolderId,
    isOpen
  };
};

export default connect(mapStateToProps, { closeColorPicker, updateFolder })(ColorPicker);