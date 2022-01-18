const initialState = {
  isGettingNews: false,
  success: false,
  category: "general",
  data: []
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_NEWS":
      return {
        ...state,
        category: action.category,
        isGettingNews: true,
        success: false,
      }
    case "GET_NEWS_SUCCESS":
      return {
        ...state,
        isGettingNews: false,
        success: true,
        data: action.data
      }
    case "GET_NEWS_FAILED":
      return {
        ...initialState
      }
    default:
      return {
        ...state
      }
  }
}

export default newsReducer