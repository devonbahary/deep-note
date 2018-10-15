const initialState = {
  notes: [],
  isLoading: false,
  isSaving: false,
  loadError: null,
  saveError: null,
  newNoteId: null
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case 'GET_NOTE':
      return {
        ...prevState,
        notes: [ ...prevState.notes, action.payload ].reduce((a, b) => a.some(c => c._id === b._id) ? a : [ ...a, b ], []),
        isLoading: false,
        loadError: null
      };
    case 'ADD_NOTE':
      return {
        ...prevState,
        notes: [ ...prevState.notes, action.payload ],
        isLoading: false, 
        loadError: null,
        newNoteId: action.payload._id
      };
    case 'DID_REDIRECT_TO_NEW_NOTE': 
      return {
        ...prevState,
        newNoteId: null
      }
    case 'UPDATE_NOTE':
      return{
        ...prevState,
        notes : prevState.notes.map(note => note._id === action.id ? (
          action.payload
        ) : note),
        isSaving: false,
        isLoading: false,
        loadError: null,
        saveError: null
      };
    case 'SET_LOADING_NOTE':
      return {
        ...prevState,
        isLoading: true,
        loadError: null
      };
    case 'SET_SAVING_NOTE':
      return {
        ...prevState,
        isSaving: true,
        saveError: false
      };
    case 'LOAD_ERROR':
      return {
        ...prevState,
        isLoading: false,
        loadError: action.error
      };
    case 'SAVE_ERROR':
      return {
        ...prevState,
        isSaving: false,
        saveError: action.error
      };
    case 'REMOVE_NOTE':
      return {
        ...prevState,
        isLoading: false,
        loadError: null,
        notes: prevState.notes.filter(note => note._id !== action.id)
      };
    default:
      return prevState;
  }
};
