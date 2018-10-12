const initialState = {
  selectionFolder: null,
  isOpen: false
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'OPEN_COLOR_PICKER':
      return {
        ...prevState,
        selectionFolder: action.childFolder,
        isOpen: true
      };
    case 'CLOSE_COLOR_PICKER':
      return {
        ...prevState,
        selectionFolder: null,
        isOpen: false
      };
    default:
      return prevState;
  }
}