import { REMOVE_FROM_CART, ADD_TO_CART, SET_QUANTITY } from "../actions/index";
import { initialState } from "./initialState";

const itemReducer = (state = initialState, action) => {
  // console.log(state);
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        // ...연산자 다음에 오는 요소가 state에서 덮어씌기 됨
        cartItems: [...state.cartItems, action.payload],
      };

      break;
    case REMOVE_FROM_CART:
      const filtered = state.cartItems.filter(
        (el) => el.itemId !== action.payload.itemId
      );
      // return Object.assign({}, state, {
      //   cartItems: filtered,
      // });
      return {
        ...state,
        cartItems: filtered,
      };
      break;
    case SET_QUANTITY:
      let idx = state.cartItems.findIndex(
        (el) => el.itemId === action.payload.itemId
      );
      //TODO
      // if (idx === -1) {
      //   state.cartItems += action.payload;
      // } else {
      //   state.cartItems[idx].quantity = action.payload.quantity;
      // }
      // return { ...state, cartItems: [...state.cartItems] };
      return {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0, idx),
          action.payload,
          ...state.cartItems.slice(idx + 1),
        ],
      };
      break;
    default:
      return state;
  }
};

export default itemReducer;
