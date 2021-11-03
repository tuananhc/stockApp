const initialState = {
    isLoggedIn: false,
    isLoading: false,
    username: null,
    password: null,
}

const loggedReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_IN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isLoading: false
            }
        case "LOG_IN_FAILED":
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                isLoading: false
            }
        case "LOG_IN_REQUEST":
            return {
                isLoggedIn: false,
                isLoading: true
            }
        default:
            return state
    }
}

export default loggedReducer