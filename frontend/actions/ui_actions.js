export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU';
export const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU'

export const openModal = modal => {
  return {
    type: OPEN_MODAL,
    modal
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const openContextMenu = (contextMenu,id) => {
  return {
    type: OPEN_CONTEXT_MENU,
    contextMenu,
    id
  };
};

export const closeContextMenu = () => {
  return {
    type: CLOSE_CONTEXT_MENU
  };
};