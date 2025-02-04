// actions.js
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = (content) => ({
    type: SHOW_MODAL,
    payload: content
});

export const hideModal = () => ({
    type: HIDE_MODAL
});
