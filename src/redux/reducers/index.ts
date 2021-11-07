import { combineReducers } from "redux";
import bondsReducer from "./bonds/bonds.reducer";
import coursesReducer from "./bonds/courses/courses.reducer";
import optionsReducer from "./options.reducer";
import profileReducer from "./profile.reducer";
import uiReducer from "./ui.reducer";
import userReducer from "./user.reducer";

const appReducers = combineReducers({
  user: userReducer,
  options: optionsReducer,
  profile: profileReducer,
  bonds: bondsReducer,
  ui: uiReducer,
  courses: coursesReducer,
});
export default appReducers;
