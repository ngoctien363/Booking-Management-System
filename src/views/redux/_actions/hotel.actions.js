import { Constants } from "../_constants/constants";


export const setHotelIdRedux = (user) => {
  return {
    type: Constants.SET_HOTEL_ID,
    payload: user,
  };
};

export const setSearchRedux = (searchForm) => {
  return {
    type: Constants.SET_SEARCH_FORM,
    payload: searchForm,
  };
};
export const setBookingHistoriesRedux = (histories) => {
  return {
    type: Constants.SET_BOOKING_HISTORIES,
    payload: histories,
  };
};