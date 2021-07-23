import axios from "axios"
import { GET_PRODUCT, URL_API } from '../Helper'

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