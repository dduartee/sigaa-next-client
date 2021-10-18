import { combineReducers } from "redux";
import bondsReducer from "./bonds.reducer";
import optionsReducer from "./options.reducer";
import profileReducer from "./profile.reducer";
import userReducer from "./user.reducer";

const appReducers = combineReducers({
  user: userReducer,
  options: optionsReducer,
  profile: profileReducer,
  bonds: bondsReducer,
});
export default appReducers;
