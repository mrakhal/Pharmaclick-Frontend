import { URL_API, GET_PRODUCT, GET_DATA_CITY } from "../Helper";
import HTTP from "../services/http";
import axios from "axios";

export const getProductAction = (type) => {
  return async (dispatch) => {
    try {
      let product = await axios.get(URL_API + `/product/get/${type}`)
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
      
      dispatch({
        type: "GET_DATA_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.log("ERROR GET PRODUCT", error);
    }
  };
};

export const getCity = () => {
  return async (dispatch) => {
    try {
      let res = await HTTP.get(URL_API + `/product/get-city`);
      dispatch({
        type: GET_DATA_CITY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
