import axios from "axios";
// import { URL_API } from "../Helper";
import HTTP from "../services/http";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      let res = await HTTP.get(`/product/get-products`);
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
      let res = await HTTP.get(`/product/get-city`);
      dispatch({
        type: "GET_DATA_CITY",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
