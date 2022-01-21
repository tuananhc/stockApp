export const addToWatchList = (stocks) => {
  return {
    type: 'ADD_TO_WATCHLIST',
    stocks: stocks
  }
}

export const removeFromWatchList = (symbol) => {
  return {
    type: 'REMOVE_FROM_WATCHLIST',
    symbol: symbol
  }
}

export const addToPortfolio = (stocks) => {
  return {
    type: 'ADD_TO_PORTFOLIO',
    stocks: stocks,
  }
}

export const removeFromPortfolio = (symbol) => {
  return {
    type: 'REMOVE_FROM_PORTFOLIO',
    symbol: symbol
  }
}

export const addToAvailableFunds = (amount) => {
  return {
    type: 'ADD_TO_AVAILABLE_FUNDS',
    amount: amount,
  }
}

export const removeFromAvailableFunds = (amount) => {
  return {
    type: 'REMOVE_FROM_AVAILABLE_FUNDS',
    amount: amount
  }
}

export const addToInitialValue = (amount) => {
  return {
    type: 'ADD_TO_INITIAL_VALUE',
    amount: amount,
  }
}

export const removeFromInitialValue = (amount) => {
  return {
    type: 'REMOVE_FROM_INITIAL_VALUE',
    amount: amount
  }
}