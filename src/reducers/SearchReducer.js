const initialState = {
    symbol: null,
    search: null,
    description: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH":
            return {
                ...state,
                search: action.stock
            }
        case "FOUND":
            return {
                ...state,
                symbol: action.symbol,
                description: action.description
            }
        default: 
            return state
    }
}

export default searchReducer