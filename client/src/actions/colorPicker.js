export const openColorPicker = (item, itemType) => ({
  type: 'OPEN_COLOR_PICKER',
  item,
  itemType
});

export const closeColorPicker = () => ({
  type: 'CLOSE_COLOR_PICKER'
});