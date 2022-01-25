export const getHistoricalData = (symbol) => {
  return {
    type: 'GET_HISTORICAL_DATA',
    symbol: symbol
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