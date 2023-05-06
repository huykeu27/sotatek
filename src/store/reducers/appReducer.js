import actionsType from "../actions/actionsType";

const initialState = {
  flag: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SET_FLAG:
      return {
        ...state,
        flag: action.flag,
      };
    default:
      return state;
  }
};

export default appReducer;
