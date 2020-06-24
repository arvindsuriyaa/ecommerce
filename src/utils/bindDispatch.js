import { memoize } from "lodash";
import { bindActionCreators } from "redux";
import {
  assignData,
  placeOrder,
  addToCart,
  reduceItem,
  submitHandler,
} from "../store/action/action";

const bindDispatch = memoize((dispatch) => ({
  actions: bindActionCreators(
    {
      assignData,
      placeOrder,
      addToCart,
      reduceItem,
      submitHandler,
    },
    dispatch
  ),
}));

export default bindDispatch;
