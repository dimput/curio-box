const FETCH_TODOS = "FETCH_TODOS";
// const FETCH_USER = "FETCH_USER";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload;
    default:
      return state;
  }
};