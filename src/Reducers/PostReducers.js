const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
    case "ADD_LIKE":
    case "ADD_COMMENT":
    case "FETCH_ALL":
      return action.payload;
    // case "GET_POST_BY_ID":
    //   return action.payload;
    default:
      return state;
  }
};

export default reducer;
