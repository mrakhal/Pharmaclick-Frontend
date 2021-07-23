import axios from "axios";
import { URL_API } from "../Helper";

class HTTP {
  get = (url, headers) => {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("tkn_id")}`,
    };

    return axios.get(URL_API + url, { headers: headers });
  };
}

export default new HTTP();
