const initialState = {favoriteFilms: []};
function favoriteReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const filmIndex = state.favoriteFilms.findIndex(
        (item) => item.id === action.value.id,
      );
      console.log(filmIndex);
      if (filmIndex !== -1) {
        nextState = {
          ...state,
          favoriteFilms: state.favoriteFilms.filter(
            (item, index) => index !== filmIndex,
          ),
        };
      } else {
        nextState = {
          ...state,
          favoriteFilms: [...state.favoriteFilms, action.value],
        };
      }
      return nextState || state;

    default:
      return state;
  }
}

export default favoriteReducer;
