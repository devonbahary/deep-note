const initialState = {
  selectionItem: null,
  isOpen: false,
  itemType: null
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'OPEN_COLOR_PICKER':
      return {
        ...prevState,
        selectionItem: action.item,
        isOpen: true,
        itemType: action.itemType
      };
    case 'CLOSE_COLOR_PICKER':
      return {
        ...prevState,
        selectionItem: null,
        isOpen: false,
        itemType: null
      };
    default:
      return prevState;
  }
}