export const closeFolderChildAction = () => ({
  type: 'CLOSE_FOLDER_CHILD_ACTION'
});

export const openFolderChildAction = (child, domRef) => ({
  type: 'OPEN_FOLDER_CHILD_ACTION',
  child,
  domRef
});

export const moveToFolderChildAction = () => ({
  type: 'MOVE_TO_FOLDER_CHILD_ACTION'
});

export const endMoveToFolderChildAction = () => ({
  type: 'END_MOVE_TO_FOLDER_CHILD_ACTION'
});