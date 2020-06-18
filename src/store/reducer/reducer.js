import ASSIGN_DATA from '../Types/types'

const initialState = {
  login: {
    id: 0,
    name: "",
    email: "",
    categories: [],
    isLoggedIn: false,
    selectAll:true
  },
  userDetails: [],
  error:{},
  notification:0,
};

export const reducer = (state = initialState, action) => {
  // console.log(action.payload.value);
  switch (action.type) {
    case ASSIGN_DATA:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
