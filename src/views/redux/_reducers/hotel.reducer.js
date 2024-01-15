import { Constants } from "../_constants/constants";

const initialState = {
    hotelId: null,
    searchForm: null,
    histories: null
};

/**
 * Reducer for the user state.
 *
 * @param {object} state - The current user state.
 * @param {object} action - The action object.
 * @returns {object} The updated user state.
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SET_HOTEL_ID:
            return {
                ...state,
                hotelId: action.payload,
            };
        case Constants.SET_SEARCH_FORM:
            return {
                ...state,
                searchForm: action.payload,
            };
        case Constants.SET_BOOKING_HISTORIES:
            return {
                ...state,
                histories: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;