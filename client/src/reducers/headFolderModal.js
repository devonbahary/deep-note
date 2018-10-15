const initialState = {
  isOpen: false
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'OPEN_HEAD_FOLDER_MODAL':
      return {
        ...prevState, 
        isOpen: true
      };
    case 'CLOSE_HEAD_FOLDER_MODAL':
      return {
        ...prevState,
        isOpen: false
      };
    default: 
      return prevState;
  }
};