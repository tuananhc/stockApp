const initialState = {  
    isLoading: false,
    successful: false,
    messages: [],
    errors: [],
  }
  
const signUpReducer = (state = initialState, action) => {  
  switch (action.type) {
    case 'SIGN_UP_REQUEST':
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      }

    case 'SIGN_UP_SUCCESS':
      return {
        requesting: false,
        successful: true,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      }

    case 'SIGN_UP_FAIL':
      return {
        requesting: false,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      }
    default:
      return state
  }
}

export default signUpReducer 