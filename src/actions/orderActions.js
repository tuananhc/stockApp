export const buyStock = (amount, price) => {
  return {
    type: "BUY_STOCK",
    amount: amount,
    price: price
  }
}

export const sellStock = (amount, price) => {
  return {
    type: "SELL_STOCK",
    amount: amount,
    price: price
  }
}