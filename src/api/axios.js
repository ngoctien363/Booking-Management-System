import _ from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { API_BASE } from './config';

const AUTH_WHITELIST = `${API_BASE}/hotels/getHasAvailableRooms`
// const AUTH_ROOMS = `${API_BASE}/rooms/getAvailableRooms`
const AUTH_HOTEL = `${API_BASE}/hotels`
const AUTH_LOGIN = `${API_BASE}/auth/signin`

export function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}
export function getRefreshToken() {
  return JSON.parse(localStorage.getItem("refreshToken"));
}

export function clearToken() {
  localStorage.removeItem("token");
}
// eslint-disable-next-line no-unused-vars
var store;
/**
 * An apply function to setup defaults axios configuration
 * @param {object} defaultObj axios defaults setup. See https://github.com/axios/axios#request-config
 */
export const applyApiDefaults = (defaultObj, storeParams) => {
  _.merge(axios.defaults, defaultObj);
  store = storeParams;
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // TODO: apply logger or any prior action
    let token = getToken();
    if (config.url === AUTH_WHITELIST || config.url === AUTH_HOTEL || config.url === AUTH_LOGIN) return config
    if (!token) return config;
    config.headers['Authorization'] = 'Bearer ' + getToken();

    return config;
  },
  function (error) {
    // TODO: apply error logger
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status;
    const navigate = useNavigate()
    if (status === 401) {
      clearToken();
      navigate('/login');
    }

    if (status === 404) {
      // redirect to notfound
      navigate('/notfound');
    }
    return Promise.reject(error.response);
  },
);

// GET request
export const sendGet = (api, options) => {

  return new Promise((resolve, reject) => {
    axios
      .get(api, options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('error sendGet>>>', error);
        reject(error);
      });
  });
};

// GET SEARCH request
export const sendGetSearch = (api, payload, options = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(api, { params: { keyword: payload } }, options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('error sendPost>>>', error);
        reject(error);
      });
  });
};

// POST request
export const sendPost = (api, payload, options = {}) => {

  return new Promise((resolve, reject) => {
    axios
      .post(api, payload, options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('error sendPost>>>', error);
        reject(error);
      });
  });
};

//PUT request
export const sendPut = (api, payload, options = {}) => {

  return new Promise((resolve, reject) => {
    axios
      .put(api, payload, options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('error sendPut>>>', error);
        reject(error);
      });
  });
};

// POST FORMDATA
export const sendPostFormData = (api, body) => {

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: api,
      data: body,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('error postFormData>>>', error);
        reject(error);
      });
  });
};


// DELETE request
export const sendDelete = (api, payload, options = {}) => {

  return new Promise((resolve, reject) => {
    axios
      .delete(api, payload, options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('error sendDelete>>>', error);
        reject(error);
      });
  });
};
