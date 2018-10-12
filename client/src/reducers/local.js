const initialState = {
  headFolderId: null
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'SET_HEAD_FOLDER_ID':
      return {
        ...prevState,
        headFolderId: action.id
      };
    default:
      return prevState;
  }
};
