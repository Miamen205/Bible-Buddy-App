import {
  combineReducers
} from 'redux';
import {
  SET_USER,
  CLEAR_USER,
  SET_CURRENT_CHANNEL,
  SET_PRIVATE_CHANNEL,
  SET_USER_POSTS,
  SET_COLORS
} from "../actions/types";

const initalUserState = {
  currentUser: null,
  isLoading: true
};

// Reducer - a pure function to tie state and actions together
// and returns the next state of the app
const user_reducer = (state = initalUserState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        currentUser: payload.currentUser,
        isLoading: false
      };

    case CLEAR_USER:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

// ##### Channel reducer #####
const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null
};

const channel_reducer = (state = initialChannelState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload.currentChannel
      };

    case SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: payload.isPrivateChannel
      };

    case SET_USER_POSTS:
      return {
        ...state,
        userPosts: payload.userPosts
      };

    default:
      return state;
  }
};

// ##### Colors reducer #####
const initialColorsState = {
  primaryColor: "#6d1aa5",
  secondaryColor: "#eee"
};

const colors_reducer = (state = initialColorsState, { type, payload }) => {
  switch (type) {
    case SET_COLORS:
      return {
        primaryColor: payload.primaryColor,
        secondaryColor: payload.secondaryColor
      }

    default:
      return state
  }
}

// #####  Combine all reducers ######
const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
  colors: colors_reducer
})

export default rootReducer