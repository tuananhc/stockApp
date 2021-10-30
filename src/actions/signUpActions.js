export const signupRequest = function signupRequest ({ username, password }) {  
    return {
      type: SIGN_UP_REQUEST,
      username,
      password,
    }
  }