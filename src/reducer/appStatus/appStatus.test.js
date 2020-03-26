import {ActionTypes, reducer, ActionCreators} from "./appStatus";
import {INIT_FILMS_TO_SHOW_NUMBER} from '../../const.js';

describe(`Reducer`, () => {
  it(`returns initial state for the first time`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentGenre: `All genres`,
      filmsToShowCount: INIT_FILMS_TO_SHOW_NUMBER,
      isFormSending: false,
      formErrorMessage: null,
      isFilmsLoading: true
    });
  });

  it(`change form sending status`, () => {
    expect(
        reducer(
            {isFormSending: true},
            {type: ActionTypes.CHANGE_FORM_SENDING_STATUS, payload: false}
        )
    ).toEqual({
      isFormSending: false
    });
  });

  it(`change film loading status`, () => {
    expect(
        reducer(
            {isFilmsLoading: true},
            {type: ActionTypes.CHANGE_FILMS_LOADING_STATUS}
        )
    ).toEqual({
      isFilmsLoading: false
    });
  });

  it(`sets currentGenre correctly`, () => {
    expect(
        reducer(
            {currentGenre: `All genres`},
            {type: ActionTypes.CHANGE_GENRE, payload: `Comedies`}
        )
    ).toEqual({
      currentGenre: `Comedies`
    });
  });

  it(`sets form error message correctly`, () => {
    expect(
        reducer(
            {formErrorMessage: null},
            {type: ActionTypes.SET_FORM_ERROR_MESSAGE, payload: `Some Text`}
        )
    ).toEqual({
      formErrorMessage: `Some Text`
    });
  });

  it(`resets films count`, () => {
    expect(
        reducer({filmsToShowCount: 16}, {type: ActionTypes.RESET_FILMS_COUNT})
    ).toEqual({
      filmsToShowCount: INIT_FILMS_TO_SHOW_NUMBER
    });
  });

  it(`shows more films`, () => {
    expect(
        reducer(
            {filmsToShowCount: 8},
            {type: ActionTypes.SHOW_MORE_FILMS, payload: 8}
        )
    ).toEqual({
      filmsToShowCount: 16
    });
  });
});

describe(`ActionCreators`, () => {
  it(`for form sending status changing returns correct action`, () => {
    expect(ActionCreators.changeFormSendingStatus(true)).toEqual({
      type: ActionTypes.CHANGE_FORM_SENDING_STATUS,
      payload: true
    });
  });

  it(`for genre changing returns correct action`, () => {
    expect(ActionCreators.changeGenre(`Comedies`)).toEqual({
      type: ActionTypes.CHANGE_GENRE,
      payload: `Comedies`
    });
  });

  it(`for reseting films count returns correct action`, () => {
    expect(ActionCreators.resetFilmsCount()).toEqual({
      type: ActionTypes.RESET_FILMS_COUNT
    });
  });

  it(`for showing more films returns correct action`, () => {
    expect(ActionCreators.showMoreFilms()).toEqual({
      type: ActionTypes.SHOW_MORE_FILMS,
      payload: 8
    });
  });

  it(`for setting form error message returns correct action`, () => {
    expect(ActionCreators.setFormErrorMessage(`Some Error`)).toEqual({
      type: ActionTypes.SET_FORM_ERROR_MESSAGE,
      payload: `Some Error`
    });
  });

  it(`for changing films loading status returns correct action`, () => {
    expect(ActionCreators.changeFilmsLoadingStatus()).toEqual({
      type: ActionTypes.CHANGE_FILMS_LOADING_STATUS
    });
  });
});
