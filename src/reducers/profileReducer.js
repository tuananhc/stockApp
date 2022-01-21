const initialState = {
  portfolio: [],
  availableFunds: 0,
  initialValue: 0,
  watchList: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchList: [...state.watchList, ...action.stocks],
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchList: state.watchList.filter(item => item.symbol !== action.symbol)
      };
    case 'ADD_TO_AVAILABLE_FUNDS':
      return {
        ...state,
        availableFunds: state.availableFunds + action.amount,
      };
    case 'REMOVE_FROM_AVAILABLE_FUNDS':
      return {
        ...state,
        availableFunds: state.availableFunds - action.amount,
      };
    case 'ADD_TO_INITIAL_VALUE':
      return {
        ...state,
        initialValue: state.initialValue + action.amount,
      };
    case 'REMOVE_FROM_INITIAL_VALUE':
      return {
        ...state,
        initialValue: state.initialValue - action.amount,
      };
    case 'ADD_TO_PORTFOLIO':
      return {
        ...state,
        portfolio: [...state.portfolio, ...action.stocks],
      };
    case 'REMOVE_FROM_PORTFOLIO':
      return {
        ...state,
        portfolio: state.portfolio.filter(item => item.symbol !== action.symbol),
      };
    default:
      return state;
  }
};

export default profileReducer;
