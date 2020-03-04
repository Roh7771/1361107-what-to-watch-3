import {getCurrentGenre, getFilmsToShowCount, getChosenFilm, getFilmToWatch} from "./selectors";

describe(`Selector`, () => {
  it(`getCurrentGenre must return current genre`, () => {
    expect(getCurrentGenre({APP_STATUS: {currentGenre: `Drama`}})).toBe(`Drama`);
  });

  it(`getFilmsToShowCount must return films count`, () => {
    expect(getFilmsToShowCount({APP_STATUS: {filmsToShowCount: 16}})).toBe(16);
  });

  it(`getChosenFilm must return chosen film`, () => {
    expect(getChosenFilm({APP_STATUS: {chosenFilm: {title: `fake`}}})).toEqual({title: `fake`});
  });

  it(`getFilmToWatch must return film to watch`, () => {
    expect(getFilmToWatch({APP_STATUS: {filmToWatch: {title: `fake`}}})).toEqual({title: `fake`});
  });
});

