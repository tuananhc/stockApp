export const logInSuccess = () => {
    return {
        type: 'LOG_IN_SUCCESS'
    }
}

export const logInFailed = (username, password) => {
    return {
        type: 'LOG_IN_FAILED',
        payload: {
            username: username, 
            password: password
        }
    }
}

export const logInRequest = (username, password) => {
    return {
        type: 'LOG_IN_REQUEST',
        username, 
        password
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}