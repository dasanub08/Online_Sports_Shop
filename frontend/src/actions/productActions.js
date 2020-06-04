import { PRODUCT_LIST_REQ, PRODUCT_LIST_SUCC, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQ, PRODUCT_DETAILS_SUCC, PRODUCT_DETAILS_FAIL } from "../constants/productConstants"
import axios from "axios";


const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQ });
        const { data } = await axios.get("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCC, payload: data });
    }

    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }

}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQ, payload: productId });
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({ type: PRODUCT_DETAILS_SUCC, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });

    }
}
export { listProducts, detailsProduct }