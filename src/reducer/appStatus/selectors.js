import NameSpace from "../name-space.js";

export const getCurrentGenre = (state) => {
  return state[NameSpace.APP_STATUS].currentGenre;
};

export const getFilmsToShowCount = (state) => {
  return state[NameSpace.APP_STATUS].filmsToShowCount;
};

export const getChosenFilm = (state) => {
  return state[NameSpace.APP_STATUS].chosenFilm;
};

export const getFilmToWatch = (state) => {
  return state[NameSpace.APP_STATUS].filmToWatch;
};
