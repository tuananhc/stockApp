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
                isLoggedIn: true,
                isLoading: false,
                username: action.action.username,
                password: action.action.password
            }
        case "LOG_IN_FAILED":
            return {
                ...state,
                username: null,
                isLoggedIn: false,
                isLoading: false
            }
        case "LOG_IN_REQUEST":
            return {
                isLoggedIn: false,
                isLoading: true,
            }
        case "LOG_OUT":
            return {
                ...state,
                isLoggedIn: false,
                username: null,
                password: null,
            }
        default:
            return state
    }
}

export default loggedReducer