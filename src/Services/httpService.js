import { getEmail, getJwt } from "./userService";
import axios from "axios";
import { notification } from "antd";

const openNotification = (message) => {
  notification.info({
    message: "Whooops!",
    description: message,
    placement: "topRight",
    duration: 7,
  });
};

axios.defaults.headers.common["authorization"] = getJwt();
axios.defaults.headers.common["x-auth-token-whodis"] = getEmail();

axios.interceptors.response.use(null, (error) => {
  if (error?.response?.status === 429)
    openNotification("woh! Slow down plase.");
  if (error?.response?.status === 401) {
    localStorage.removeItem("user");
    window.location.reload();
  }
  if (error?.response?.status > 429) {
    openNotification(
      "Some error occurred on our side, our team is notified and trying to solve the issue. Sorry for the inconvenience."
    );
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
