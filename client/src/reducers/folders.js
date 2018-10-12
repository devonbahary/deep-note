const initialState = {
  folders: [],
  isLoading: false,
  error: null
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'GET_FOLDER':
      return {
        ...prevState,
        folders: [ ...prevState.folders, action.payload ],
        isLoading: false,
        error: null
      };
    case 'ADD_FOLDER':
      return {
        ...prevState,
        folders: [ ...prevState.folders, action.payload ],
        isLoading: false, 
        error: null
      };
    case 'UPDATE_FOLDER':
      return{
        ...prevState,
        folders : prevState.folders.map(folder => folder._id === action.id ? (
          action.payload
        ) : folder),
        isLoading: false,
        error: null
      };
    case 'SET_LOADING_FOLDER':
      return {
        ...prevState,
        isLoading: true,
        error: null
      };
    case 'LOAD_ERROR':
      return {
        ...prevState,
        isLoading: false,
        error: action.error
      };
    // case 'UPDATE_FOLDER':
    //     return {
    //       ...prevState,
    //       folders: prevState.folders.map(folder => folder._id === action.id ? (
    //         {
    //           ...folder,
    //           ...action.updates
    //         }
    //       ) : folder)
    //     };
    // case 'REMOVE_FOLDER':
    //     return {
    //       ...prevState,
    //       folders: prevState.folders.filter(folder => folder._id !== action.id)
    //     };
    default:
      return prevState;
  }
};
