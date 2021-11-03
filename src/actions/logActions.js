export const logInSuccess = (username, password) => {
    return {
        type: 'LOG_IN_SUCCESS',
        payload: {
            username: username, 
            password: password
        }
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