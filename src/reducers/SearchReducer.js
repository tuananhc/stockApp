const initialState = {
    symbol: null,
    search: null,
    description: null,
    isFindingStocks: false,
    findStocksSuccess: false,
    token: "c5nup6iad3icte5l57r0",
    isGettingData: false,
    getDataSuccess: false,
    stockData: null,
    stocksFound: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_REQUEST":
            return {
                ...state,
                search: action.search,
                isFindingStocks: true
            }
        case "SEARCH_NOT_FOUND":
            return {
                ...state,
                search: action.search,
                symbol: null,
                description: null,
                isFindingStocks: false,
                findStocksSuccess: false,
                stocksFound: null
            }
        case "SEARCH_FOUND":
            return {
                ...state,
                isFindingStocks: false,
                findStocksSuccess: true,
                stocksFound: action.data,
            }
        case "GET_STOCK_DATA_REQUEST": 
            return {
                ...state,
                symbol: action.symbol,
                description: action.description,
                isGettingData: true,
                getDataSuccess: false
            }
        case "STOCK_DATA_FOUND" :
            return {
                ...state,
                stockData: action.data,
                isGettingData: false,
                getDataSuccess: true
            }
        case "STOCK_DATA_NOT_FOUND":
            return {
                ...state,
                stockData: null,
                isGettingData: false,
                getDataSuccess: false
            }
        default: 
            return state
    }
}

export default searchReducer