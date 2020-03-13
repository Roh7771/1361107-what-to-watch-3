import NameSpace from "../name-space.js";

export const getCurrentGenre = (state) => {
  return state[NameSpace.APP_STATUS].currentGenre;
};

export const getFilmsToShowCount = (state) => {
  return state[NameSpace.APP_STATUS].filmsToShowCount;
};


export const getFormSendingStatus = (state) => {
  return state[NameSpace.APP_STATUS].isFormSending;
};

export const getFormErrorMessage = (state) => {
  return state[NameSpace.APP_STATUS].formErrorMessage;
};

export const getFilmsLoadingStatus = (state) => {
  return state[NameSpace.APP_STATUS].isFilmsLoading;
};
