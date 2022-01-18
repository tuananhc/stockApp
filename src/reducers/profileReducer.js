const initialState = {
  watchList: []
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_WATCHLIST":
      return {
        ...state,
        watchList: action.watchList
      }
    case "ADD_TO_WATCHLIST":
      state.watchList.push({symbol: action.symbol, description: action.description})
      return {
        ...state,
        watchList: state.watchList
      }
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchList: state.watchList.filter(item => item.symbol !== action.symbol)
      }
    default:
      return state
  }
}

export default profileReducer