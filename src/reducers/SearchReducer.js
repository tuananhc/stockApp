const initialState = {
    symbol: null,
    search: null,
    description: null,
    isFindingStocks: false,
    findStocksSuccess: false,
    token: "c5nup6iad3icte5l57r0",
    isGettingData: false,
    getDataSuccess: false,
    resolution: null,
    stockData: null,
    stocksFound: null,
    quote: null,
    orderType: 'Buy'
}

const stockReducer = (state = initialState, action) => {
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
                resolution: action.resolution,
                description: action.description,
                isGettingData: true,
                getDataSuccess: false
            }
        case "STOCK_DATA_FOUND" :
            return {
                ...state,
                stockData: action.data,
                isGettingData: false,
                getDataSuccess: true,
                quote: action.quote
            }
        case "STOCK_DATA_NOT_FOUND":
            return {
                ...state,
                stockData: null,
                isGettingData: false,
                getDataSuccess: false,
                quote: null
            }     
        case "ORDER_STOCK": 
            return {
                ...state,
                orderType: action.orderType
            }
        default: 
            return state
    }
}

export default stockReducer