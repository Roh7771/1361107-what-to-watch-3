import axios from "axios";

const Errors = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};

export const createAPI = (onUnauthorized, onErrorReceived) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Errors.UNAUTHORIZED) {
      onUnauthorized();
    }

    if (response.status === Errors.BAD_REQUEST) {
      onErrorReceived(err);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
