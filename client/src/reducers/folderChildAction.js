const initialState = {
  isOpen: false,
  isMoveTo: false,
  child: null
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'OPEN_FOLDER_CHILD_ACTION':
      return {
        ...prevState,
        child: action.child,
        isOpen: !!action.child,
        domRef: action.domRef
      };
    case 'CLOSE_FOLDER_CHILD_ACTION':
      return {
        ...prevState,
        isOpen: false,
        isMoveTo: false
      };
    case 'MOVE_TO_FOLDER_CHILD_ACTION':
      return {
        ...prevState,
        isMoveTo: true
      };
    case 'END_MOVE_TO_FOLDER_CHILD_ACTION':
      return {
        ...prevState,
        isMoveTo: false
      };
    default:
      return prevState;
  }
};
