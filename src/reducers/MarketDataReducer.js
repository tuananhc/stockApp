const initialState = {
  marketData: [],
  forexData: [],
  cryptoData: [],
  historicalData: null,
  isGettingHistoricalData: false,
  getHistoricalDataSuccess: false,
  symbol: null,
  resolution: null,
  quote: null
};

const marketDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MARKET_DATA':
      return {
        ...state,
        marketData: action.data,
      };
    case 'UPDATE_FOREX_DATA':
      return {
        ...state,
        forexData: action.data,
      };
    case 'UPDATE_CRYPTO_DATA':
      return {
        ...state,
        cryptoData: action.data,
      };
    case 'QUOTING_PRICE_FOUND':
      return {
        ...state,
        quote: action.data,
      };
    case 'GET_HISTORICAL_DATA':
      return {
        ...state,
        symbol: action.symbol,
        resolution: action.resolution,
        isGettingHistoricalData: true,
        getHistoricalDataSuccess: false
      }
    case 'HISTORICAL_DATA_FOUND':
      return {
        ...state,
        historicalData: action.data,
        isGettingHistoricalData: false,
        getHistoricalDataSuccess: true
      }
    case 'HISTORICAL_DATA_NOT_FOUND':
      return {
        ...state,
        historicalData: null,
        isGettingHistoricalData: false,
        getHistoricalDataSuccess: false
      }
    default:
      return {
        ...state,
      };
  }
};

export default marketDataReducer;
