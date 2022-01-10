export const searchStock = (stock) => {
    return {
        type: 'SEARCH',
        stock
      }
}

export const foundStock = (symbol, description) => {
    return {
        type: 'FOUND',
        symbol: symbol, 
        description: description
    }
}