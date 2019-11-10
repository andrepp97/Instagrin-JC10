import {
  INIT_EDIT_PROFILE,
  USERNAME_CHANGE,
  PROFILE_IMAGE_CHANGE,
  SAVE_PROFILE,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  profileImage: '',
  username: '',
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_EDIT_PROFILE:
      return {
        ...INITIAL_STATE,
        profileImage: action.payload.profileImage,
        username: action.payload.username,
      };
    case USERNAME_CHANGE:
      return {...state, username: action.payload};
    case PROFILE_IMAGE_CHANGE:
      return {...state, profileImage: action.payload};
    case SAVE_PROFILE:
      return {...state, loading: true, error: ''};
    case EDIT_PROFILE_FAIL:
      return {...state, loading: false, error: action.payload};
    case EDIT_PROFILE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
