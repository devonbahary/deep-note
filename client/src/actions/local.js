// SET_HEAD_FOLDER_ID
export const setHeadFolderId = id => dispatch => {
  localStorage.setItem('headFolderId', id);

  dispatch({
    type: 'SET_HEAD_FOLDER_ID',
    id
  });
};