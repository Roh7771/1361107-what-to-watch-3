import {reducer, ActionTypes, ActionCreators, Operation} from "./user";
import {AuthorizationStatus} from "./user";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {AppRoute} from "../../const";
import {noop} from "../../utils";

const api = createAPI(noop);

describe(`Reducer work correctly`, () => {
  it(`Reducer return initial state for the first time`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH
    });
  });

  it(`Reducer require authorization`, () => {
    expect(
        reducer(
            {authorizationStatus: AuthorizationStatus.NO_AUTH},
            {
              type: ActionTypes.REQUIRE_AUTHORIZATION,
              payload: AuthorizationStatus.AUTH
            }
        )
    ).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH
    });
  });
});

describe(`ActionCreators should work correctly`, () => {
  it(`ActionCreators for requiring authorization return correct action`, () => {
    expect(
        ActionCreators.requireAuthorization(AuthorizationStatus.AUTH)
    ).toEqual({
      type: ActionTypes.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
  });
});

describe(`Operation`, () => {
  it(`checkAuth should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth({login: `lol`, password: `lolka`});

    apiMock.onGet(`${AppRoute.LOGIN}`).reply(200);

    return checkAuth(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(
          1,
          ActionCreators.requireAuthorization(AuthorizationStatus.AUTH)
      );
    });
  });

  it(`login should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login({});

    apiMock.onPost(`${AppRoute.LOGIN}`).reply(200);

    return login(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(
          1,
          ActionCreators.requireAuthorization(AuthorizationStatus.AUTH)
      );
    });
  });
});
