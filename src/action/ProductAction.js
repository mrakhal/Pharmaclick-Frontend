import axios from "axios";
import { URL_API, GET_PRODUCT } from "../Helper";

export const getProductAction = (type) => {
  return async (dispatch) => {
    try {
      let product = await axios.get(URL_API + `/product/get/${type}`)
      console.log("action-->", product.data)
      dispatch({
        type: GET_PRODUCT,
        payload: product.data
      })
    } catch (error) {
      console.log("ERROR GET PRODUCT", error)
    }
  }
}

export const getProducts = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(URL_API + `/product/get-products`);
      console.log("data barang actions:", res.data);
      dispatch({
        type: "GET_DATA_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCity = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(URL_API + `/product/get-city`);
      dispatch({
        type: "GET_DATA_CITY",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getImageProfileUser = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(URL_API + `/user/get-image-user?iduser=${id}`);
      dispatch({
        type: "GET_PROFILE_IMAGE",
        payload: res.data,
      });
    } catch (error) {
      console.log("Get Image Profile Error", error);
    }
  };
};
