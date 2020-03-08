import {ActionTypes, reducer, ActionCreators} from './appStatus';

describe(`Reducer`, () => {
  it(`returns initial state for the first time`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentGenre: `All genres`,
      filmsToShowCount: 8,
      chosenFilm: null,
      filmToWatch: null,
      isLogging: false,
      isFormSending: false,
    });
  });

  it(`change form sending status`, () => {
    expect(reducer({isFormSending: true}, {type: ActionTypes.CHANGE_FORM_SENDING_STATUS})).toEqual({
      isFormSending: false
    });
  });

  it(`change form sending status`, () => {
    expect(reducer({isLogging: true}, {type: ActionTypes.CHANGE_LOGGING_STATUS})).toEqual({
      isLogging: false
    });
  });

  it(`sets currentGenre correctly`, () => {
    expect(reducer({currentGenre: `All genres`}, {type: ActionTypes.CHANGE_GENRE, payload: `Comedies`})).toEqual({
      currentGenre: `Comedies`,
    });
  });

  it(`sets film to watch correctly`, () => {
    expect(reducer({filmToWatch: null}, {type: ActionTypes.SET_FILM_TO_WATCH, payload: {title: `Some Film`}})).toEqual({
      filmToWatch: {title: `Some Film`},
    });
  });

  it(`resets films count`, () => {
    expect(reducer({filmsToShowCount: 16}, {type: ActionTypes.RESET_FILMS_COUNT})).toEqual({
      filmsToShowCount: 8
    });
  });

  it(`shows more films`, () => {
    expect(reducer({filmsToShowCount: 8}, {type: ActionTypes.SHOW_MORE_FILMS, payload: 8})).toEqual({
      filmsToShowCount: 16
    });
  });

  it(`sets chosen film`, () => {
    expect(reducer({chosenFilm: null}, {type: ActionTypes.SET_CHOSEN_FILM, payload: {title: `Film`}})).toEqual({
      chosenFilm: {title: `Film`}
    });
  });
});

describe(`ActionCreators`, () => {
  it(`for form sending status changing returns correct action`, () => {
    expect(ActionCreators.changeFormSendingStatus()).toEqual({
      type: ActionTypes.CHANGE_FORM_SENDING_STATUS,
    });
  });

  it(`for form sending status changing returns correct action`, () => {
    expect(ActionCreators.changeLoggingStatus()).toEqual({
      type: ActionTypes.CHANGE_LOGGING_STATUS,
    });
  });

  it(`for genre changing returns correct action`, () => {
    expect(ActionCreators.changeGenre(`Comedies`)).toEqual({
      type: ActionTypes.CHANGE_GENRE,
      payload: `Comedies`,
    });
  });

  it(`for setting film to watch returns correct action`, () => {
    expect(ActionCreators.setFilmToWatch({title: `Some Film`})).toEqual({
      type: ActionTypes.SET_FILM_TO_WATCH,
      payload: {title: `Some Film`},
    });
  });

  it(`for setting chosen film returns correct action`, () => {
    expect(ActionCreators.setChosenFilm({title: `fake`})).toEqual(
        {
          type: ActionTypes.SET_CHOSEN_FILM,
          payload: {title: `fake`}
        }
    );
  });

  it(`for reseting films count returns correct action`, () => {
    expect(ActionCreators.resetFilmsCount()).toEqual(
        {
          type: ActionTypes.RESET_FILMS_COUNT,
        }
    );
  });

  it(`for showing more films returns correct action`, () => {
    expect(ActionCreators.showMoreFilms()).toEqual(
        {
          type: ActionTypes.SHOW_MORE_FILMS,
          payload: 8
        }
    );
  });
});
