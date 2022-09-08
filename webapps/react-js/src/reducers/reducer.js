const intialState = { name: "reactgo", allNames: [] };

const reducer = (state = intialState, action) => {
  if (action.type === "ADDNAME") {
    return {
      allNames: state.allNames.concat(state.name),
      name: "",
    };
  }

  if (action.type === "CHANGE_NAME") {
    return {
      ...state,
      name: action.name,
    };
  }

  return state;
};

export default reducer;
