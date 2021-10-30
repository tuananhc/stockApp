const initialState = {
    isLoggedIn: false,
    isLoading: false,
    user: null
}

const loggedReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case "SIGN_OUT":
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state
    }
}

export default loggedReducer