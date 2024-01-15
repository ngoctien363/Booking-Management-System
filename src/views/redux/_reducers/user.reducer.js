import { Constants } from "../_constants/constants";

const initialState = {
    userId: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case Constants.SET_NAME_USER:
            return {
                ...state,
                name: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;