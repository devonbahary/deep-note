import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import colorPickerReducer from '../reducers/colorPicker';
import foldersReducer from '../reducers/folders';
import localReducer from '../reducers/local';
import notesReducer from '../reducers/notes';

export default () => createStore(
  combineReducers({
    folders: foldersReducer,
    colorPicker: colorPickerReducer,
    local: localReducer,
    notes: notesReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
