import React from 'react';
import { LOGIN, SIGNUP, LOGOUT, MYBOOKS } from './actions';
import { SETLIST, SETMYBOOKS } from '../book/actions';

const initialState = {
    isLoggedIn: false,
    authToken: null,
    user: null,
    shortlist: [],
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                isLoggedIn: true,
                authToken: action.payload.authToken,
                user: action.payload.user,
                shortlist: action.payload.shortlist,
            }
            break;
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                authToken: action.payload.authToken,
                user: action.payload.user,
                shortlist: action.payload.shortlist,
            }
            break;
        case SETLIST:
            return {
                ...state,
                isLoggedIn: true,
                shortlist: action.payload
            }
            break;
        case MYBOOKS:
            return {
                ...state,
                isLoggedIn: true,
            }
            break;
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                authToken: null
            }
            break;

        default:
            return { ...state }
            break;
    }
}

export default userReducer