export const addToWatchList = (symbol, description) => {
  return {
    type: 'ADD_TO_WATCHLIST',
    symbol: symbol,
    description: description
  }
}

export const removeFromWatchList = (symbol) => {
  return {
    type: 'REMOVE_FROM_WATCHLIST',
    symbol: symbol
  }
}

export const updateWatchList = (watchList) => { 
  return {
    type: 'UPDATE_WATCHLIST',
    watchList: watchList
  } 
} 