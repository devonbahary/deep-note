import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import colorPickerReducer from '../reducers/colorPicker';
import foldersReducer from '../reducers/folders';
import headFolderModalReducer from '../reducers/headFolderModal';
import notesReducer from '../reducers/notes';

export default () => createStore(
  combineReducers({
    colorPicker: colorPickerReducer,
    folders: foldersReducer,
    headFolderModal: headFolderModalReducer,
    notes: notesReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
