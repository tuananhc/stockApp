export const searchRequest = (search) => {
    return {
        type: 'SEARCH_REQUEST',
        search: search
    }
}

export const searchNotFound = () => {
    return {
        type: 'SEARCH_NOT_FOUND',
    }
}

export const searchFound = (symbol, description, data) => {
    return {
        type: 'SEARCH_FOUND',
        symbol: symbol, 
        description: description,
        data: data
    }
}

export const chooseStock = (symbol, description) => {
    return {
        type: 'CHOOSE_STOCK',
        symbol: symbol,
        description: description
    }
}

export const getStockDataRequest = (symbol, description) => {
    return {
        type: 'GET_STOCK_DATA_REQUEST',
        symbol: symbol,
        description: description
    }
}

export const stockDataFound = (data) => {
    return {
        type: 'STOCK_DATA_FOUND',
        data: data
    }
}

export const stockDataNotFound = () => {
    return {
        type: 'STOCK_DATA_NOT_FOUND'
    }
}