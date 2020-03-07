import {getAuthorizationStatus} from "./selectors";
import NameSpace from "../name-space";
import {AuthorizationStatus} from "./user";

const NAME_SPACE = NameSpace.USER;

describe(`Selector`, () => {
  it(`Selector getAuthorizationStatus must return current step`, () => {
    expect(getAuthorizationStatus({[NAME_SPACE]: {authorizationStatus: AuthorizationStatus.AUTH}})).toBe(AuthorizationStatus.AUTH);
  });
});
