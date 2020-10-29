export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const addItem = item => ({
  type: ADD_ITEM,
  item
});

export const editItem = item => ({
  type: EDIT_ITEM,
  item
});

export const removeItem = item => ({
  type: REMOVE_ITEM,
  item
});


