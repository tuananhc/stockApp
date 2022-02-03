export const getHistoricalData = (symbol, resolution) => {
  return {
    type: 'GET_HISTORICAL_DATA',
    symbol: symbol,
    resolution: resolution
  }
}

export const historicalDataFound = () => {
  return {
    type: 'HISTORICAL_DATA_FOUND'
  }
}

export const historicalDataNotFound = () => {
  return {
    type: 'HISTORICAL_DATA_NOT_FOUND'
  }
}

export const getQuotingPrice = (symbol) => {
  return {
    type: 'GET_QUOTING_PRICE',
    symbol: symbol
  }
}

export const quotingPriceFound = () => {
  return {
    type: 'QUOTING_PRICE_FOUND'
  }
}

export const quotingPriceNotFound = () => {
  return {
    type: 'QUOTING_PRICE_NOT_FOUND'
  }
}
 
export const updateMarketData = (data) => { 
  return {
    type: 'UPDATE_MARKET_DATA',
    marketData: data,
  };
}

export const updateForexData = (data) => { 
  return {
    type: 'UPDATE_FOREX_DATA',
    forexData: data,
  };
}

export const updateCryptoData = (data) => { 
  return {
    type: 'UPDATE_CRYPTO_DATA',
    cryptoData: data,
  };
}