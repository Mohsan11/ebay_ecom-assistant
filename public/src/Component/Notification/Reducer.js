// reducer.js
const initialState = {
  notification: {
    isVisible: false,
    type: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        notification: {
          isVisible: true,
          type: action.payload.notificationType,
        },
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        notification: {
          isVisible: false,
          type: "",
        },
      };
    default:
      return state;
  }
};

export default reducer;
