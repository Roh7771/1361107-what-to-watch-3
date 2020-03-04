import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as appStatus} from "./appStatus/appStatus.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP_STATUS]: appStatus,
});