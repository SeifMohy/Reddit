const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
    case "FETCH_ALL":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
