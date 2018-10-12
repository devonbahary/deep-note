import axios from 'axios';


// GET_FOLDER 
export const getFolder = id => dispatch => {
  dispatch(setLoadingFolder());
  axios
    .get(`/api/folders/${id}`)
    .then(res => dispatch({ type: 'GET_FOLDER', payload: res.data }))
    .catch(err => dispatch(loadError(err.response)));
};

// SET_LOADING_FOLDER
export const setLoadingFolder = () => ({ type: 'SET_LOADING_FOLDER' });


// LOAD_ERROR
const loadError = error => ({
  type: 'LOAD_ERROR',
  error
});

// ADD_FOLDER
export const addFolder = folder => dispatch => {
  dispatch(setLoadingFolder());
  axios
    .post('/api/folders', folder)
    .then(res => {
      dispatch({
        type: 'ADD_FOLDER',
        payload: res.data
      });
      if (folder.parentId) dispatch(reloadFolder(folder.parentId));
    });
};

// RELOAD_FOLDER
export const reloadFolder = id => dispatch => {
  dispatch(setLoadingFolder());
  axios
    .get(`/api/folders/${id}`)
    .then(res => dispatch({ type: 'UPDATE_FOLDER', payload: res.data, id }))
    .catch(err => dispatch(loadError(err.response)));
};

// UPDATE_FOLDER
export const updateFolder = (updates, id) => dispatch => {
  dispatch(setLoadingFolder());
  axios 
    .patch(`/api/folders/${id}`, updates)
    .then(res => {
      const folder = res.data;
      dispatch({ type: 'UPDATE_FOLDER', payload: folder, id });
      if (folder.parentId) dispatch(reloadFolder(folder.parentId));
    })
    .catch(err => dispatch(loadError(err.response)));
};

// // REMOVE_FOLDER
// export const removeFolder = id => dispatch => {
//   axios.delete(`/api/folders/${id}`).then(res =>
//     dispatch({
//       type: 'REMOVE_FOLDER',
//       id
//     })
//   );
// };
