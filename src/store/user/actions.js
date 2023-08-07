export const LOGIN = "LOGIN"
export const SIGNUP = "SIGNUP"
export const LOGOUT = "LOGOUT"
export const MYBOOKS= "MYBOOKS"

export const loginUser = (user, authToken) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: { user, authToken }
    })
}

export const signupUser = (user, authToken) => dispatch => {
    return {
        type: SIGNUP,
        payload: { user, authToken }
    }
}