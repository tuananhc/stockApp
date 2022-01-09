export const signUpRequest = (username, password) => {  
  return {
    type: 'SIGN_UP_REQUEST',
    username,
    password,
  }
}

export const signUpSuccess = () => {  
  return {
    type: 'SIGN_UP_SUCCESS'
  }
}

export const signUpFail = () => {  
  return {
    type: 'SIGN_UP_REQUEST'
  }
}