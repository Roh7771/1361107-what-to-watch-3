import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as appStatus} from "./appStatus/appStatus";
import {reducer as user} from "./user/user";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP_STATUS]: appStatus,
  [NameSpace.USER]: user
});
