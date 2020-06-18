import { memoize } from "lodash";
import { bindActionCreators } from "redux";
import { assignData } from "../store/action/action";
import { placeOrder } from "../store/action/action";
import { addToCart } from "../store/action/action";
import { reduceItem } from "../store/action/action";
import * as actions from "../store/action/action";

// console.log("ACTIONSSS", actions);

const bindDispatch = memoize((dispatch) => ({
  actions: bindActionCreators(
    { assignData, placeOrder, addToCart, reduceItem },
    dispatch
  ),
}));

export default bindDispatch;
