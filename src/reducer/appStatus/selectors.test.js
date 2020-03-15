import {getCurrentGenre, getFilmsToShowCount, getFormSendingStatus, getFilmsLoadingStatus, getFormErrorMessage} from "./selectors";

describe(`Selector`, () => {
  it(`getCurrentGenre must return current genre`, () => {
    expect(getCurrentGenre({APP_STATUS: {currentGenre: `Drama`}})).toBe(`Drama`);
  });

  it(`getFilmsToShowCount must return films count`, () => {
    expect(getFilmsToShowCount({APP_STATUS: {filmsToShowCount: 16}})).toBe(16);
  });

  it(`getFormErrorMessage must return form error message`, () => {
    expect(getFormErrorMessage({APP_STATUS: {formErrorMessage: `Some Error`}})).toBe(`Some Error`);
  });

  it(`getFormSendingStatus must return form sending status`, () => {
    expect(getFormSendingStatus({APP_STATUS: {isFormSending: true}})).toBe(true);
  });

  it(`getFilmsLoadingStatus must return films loading status`, () => {
    expect(getFilmsLoadingStatus({APP_STATUS: {isFilmsLoading: true}})).toBe(true);
  });
});

