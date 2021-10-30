const initialState = {  
    requesting: false,
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
  
      default:
        return state
    }
  }
  
  export default signUpReducer 