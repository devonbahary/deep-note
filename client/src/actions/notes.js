import axios from 'axios';
import { reloadFolder } from './folders';

// GET_NOTE
export const getNote = id => dispatch => {
  dispatch(setLoadingNote());
  axios
    .get(`/api/notes/${id}`)
    .then(res => dispatch({ type: 'GET_NOTE', payload: res.data }))
    .catch(err => dispatch(loadError(err.response)));
};

// SET_LOADING_NOTE
export const setLoadingNote = () => ({ type: 'SET_LOADING_NOTE' });

// LOAD_ERROR
const loadError = error => ({
  type: 'LOAD_ERROR',
  error
});

// ADD_NOTE
export const addNote = note => dispatch => {
  dispatch(setLoadingNote());
  axios
    .post('/api/notes', note)
    .then(res => {
      dispatch({
        type: 'ADD_NOTE',
        payload: res.data
      });
      dispatch(reloadFolder(note.parentId));
    })
    .catch(err => dispatch(loadError(err.response)));
};

// DID_REDIRECT_TO_NEW_NOTE
export const didRedirectToNewNote = () => ({
  type: 'DID_REDIRECT_TO_NEW_NOTE'
});

// SAVE_NOTE
export const saveNote = (text, id) => dispatch => {
  dispatch(setSavingNote());
  axios 
    .patch(`/api/notes/${id}`, { text })
    .then(res => {
      const { note } = res.data;
      dispatch({ type: 'UPDATE_NOTE', payload: note, id });
    })
    .catch(err => dispatch(saveError(err.response)));
};

// UPDATE_NOTE
export const updateNote = (updates, id) => dispatch => {
  dispatch(setLoadingNote());
  axios 
    .patch(`/api/notes/${id}`, updates)
    .then(res => {
      const { note } = res.data;
      dispatch({ type: 'UPDATE_NOTE', payload: note, id });
      const { parentFolders } = res.data
      parentFolders.forEach(folder => dispatch({ type: 'UPDATE_FOLDER', payload: folder, id: folder._id }));
    })
    .catch(err => dispatch(saveError(err.response)));
};

// SET_SAVING_NOTE
export const setSavingNote = () => ({ type: 'SET_SAVING_NOTE' });

// SAVE_ERROR
const saveError = error => ({
  type: 'SAVE_ERROR',
  error
});

// REMOVE_NOTE
export const removeNote = note => dispatch => {
  dispatch(setLoadingNote());
  axios 
    .delete(`/api/notes/${note._id}`)
    .then(res => {
      dispatch({ type: 'REMOVE_NOTE', id: note._id });
      dispatch(reloadFolder(note.parentId));
    })
    .catch(err => dispatch(loadError(err.response)));
}