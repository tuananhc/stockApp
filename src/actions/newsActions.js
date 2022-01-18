export const requestNews = (category) => {
  return {
    type: "REQUEST_NEWS",
    category: category
  }
}

export const getNewsSuccess = (data) => {
  return {
    type: "GET_NEWS_SUCCESS",
    data: data
  }
}
export const getNewsFailed = () => {
  return {
    type: "GET_NEWS_FAILED",
  }
}