const initialState = {filmsSeen: []};
function filmsSeenReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_SEEN':
      const filmIndex = state.filmsSeen.findIndex(
        (item) => item.id === action.value.id,
      );
      if (filmIndex !== -1) {
        nextState = {
          ...state,
          filmsSeen: state.filmsSeen.filter(
            (item, index) => index !== filmIndex,
          ),
        };
      } else {
        nextState = {
          ...state,
          filmsSeen: [...state.filmsSeen, action.value],
        };
      }
      return nextState || state;

    default:
      return state;
  }
}

export default filmsSeenReducer;
