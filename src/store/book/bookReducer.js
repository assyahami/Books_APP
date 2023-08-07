import React from 'react';
import { EDITBOOK, GETBOOK } from './actions';

const initialState = {
    isLoggedIn: false,
    books: [],
    pagination: {},
    user: null,
    openFilter: false,
    loading: false,
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETBOOK:
            return {
                ...state,
                books: action.payload.data,
                pagination: action.payload?.pagination,
            }
            break;
        case "FILTERBOOK":
            const countyfilterText = action.payload.country?.toLowerCase();
            const langfilterText = action.payload.language.data?.toLowerCase();

            let getFilterBooks = state.books.filter(item => {
                return item.country?.toLowerCase().includes(countyfilterText)
            }
            );
            let getBooks = getFilterBooks.filter(item => {
                return item.language?.toLowerCase().includes(langfilterText)
            }
            )
            console.log(getFilterBooks);

            return { ...state, books: getFilterBooks }
            break;
        case "OPENFILTER":
            return {
                ...state,
                openFilter: true,
            }
            break;
        case "CLOSEFILTER":
            return {
                ...state,
                openFilter: false,
            }
            break;
        case "LOADINGON":
            return {
                ...state,
                loading: true,
            }
            break;
        case "LOADINGOFF":
            return {
                ...state,
                loading: false,
            }
            break;
        default:
            return state
            break;
    }
}

export default bookReducer