import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import EditProfileReducer from './EditProfileReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  auth: AuthReducer,
  editProfile: EditProfileReducer,
  post: PostReducer,
});
