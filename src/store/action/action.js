import { productSeed } from "/home/vhitech/Desktop/ecommerce/src/utils/productSeed";
import ASSIGN_DATA from "../Types/types";

export const assignData = (name, value) => ({
  type: ASSIGN_DATA,
  payload: { name: name, value: value },
});

export const collectInfo = (event) => {
  return (dispatch, getState) => {
    const { userDetails } = getState().reducer;
    dispatch(
      assignData("userDetails", {
        ...userDetails,
        [event.target.name]: event.target.value,
      })
    );
  };
};

export const placeOrder = () => {
  return (dispatch, getState) => {
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    let notification;
    let userIndex;
    let { login } = getState().reducer;
    currentUser.map((user, index) =>
      user.isLoggedIn
        ? user.categories.map((purchase) =>
            purchase.products.map(
              (purchaseItem) => (
                (purchaseItem.addedToCart = 0),
                (purchaseItem.quantityprice = 0),
                (userIndex = index),
                (notification = 0)
              )
            )
          )
        : null
    );
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    dispatch(assignData("userDetails", currentUser));
    dispatch(assignData("notification", notification));
    login.categories = currentUser[userIndex].categories;
    dispatch(assignData("login", login));
  };
};
export const addToCart = (productInfo) => {
  return (dispatch, getState) => {
    let { notification, login } = getState().reducer;
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    notification = 0;
    let userIndex;

    currentUser.map((item, index) => {
      if (item.isLoggedIn) {
        return item.categories.map((purchase) => {
          if (purchase.isChecked) {
            return purchase.products.map((purchaseItem) => {
              if (purchaseItem.name === productInfo.name) {
                purchaseItem.addedToCart += 1;
                purchaseItem.quantityPrice =
                  purchaseItem.addedToCart * purchaseItem.mrp;
              }
              notification += purchaseItem.addedToCart;
              userIndex = index;
            });
          }
        });
      }
    });
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    dispatch(assignData("userDetails", currentUser));
    dispatch(assignData("notification", notification));
    login.categories = currentUser[userIndex].categories;
    dispatch(assignData("login", login));
  };
};

export const reduceItem = (productInfo) => {
  return (dispatch, getState) => {
    let { notification, login } = getState().reducer;
    const data = sessionStorage.getItem("userDetails");
    let currentUser = JSON.parse(data);
    let userIndex;
    notification = 0;

    currentUser.map((item, index) => {
      if (item.isLoggedIn) {
        return item.categories.map((purchase) => {
          if (purchase.isChecked) {
            return purchase.products.map((purchaseItem) => {
              if (purchaseItem.name === productInfo.name) {
                purchaseItem.addedToCart -= 1;
                purchaseItem.quantityPrice =
                  purchaseItem.addedToCart * purchaseItem.mrp;
              }
              notification += purchaseItem.addedToCart;
              userIndex = index;
            });
          }
        });
      }
    });
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    dispatch(assignData("userDetails", currentUser));
    dispatch(assignData("notification", notification));
    login.categories = currentUser[userIndex].categories;
    dispatch(assignData("login", login));
  };
};
export const submitHandler = () => {
  return (dispatch, getState) => {
    let { login, error, userDetails } = getState().reducer;
    let { isLoggedIn } = login;
    let validation = Object.entries(login);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    validation.forEach((element) => {
      if (element[0] === "name") {
        if (!element[1].length) {
          error.name = "This Field is Mandatory";
        }
      } else if (element[0] === "email") {
        if (!element[1].length) {
          error.email = "This Field is Mandatory";
        } else if (!reg.test(element[1])) {
          error.email = "Enter a Valid Email";
        }
      }
    });
    dispatch(assignData("error", error));
    if (!error.name && !error.email) {
      let duplicateCheck = false;
      let indexValue;
      userDetails.map((user, index) =>
        user["email"] === login["email"]
          ? ((indexValue = index), (duplicateCheck = true))
          : null
      );
      if (duplicateCheck) {
        const data = sessionStorage.getItem("userDetails");
        let currentUser = JSON.parse(data);
        let newId = indexValue + 1;
        login.id = newId;
        login.isLoggedIn = true;
        currentUser.map((item, index) =>
          login.email === item.email
            ? ((login.categories = item.categories),
              (login.selectAll = item.selectAll))
            : null
        );

        userDetails.splice(indexValue, 1, login);
        sessionStorage.clear();
      } else {
        let newId = userDetails.length + 1;
        login.id = newId;
        login.categories = productSeed;
        login.isLoggedIn = !isLoggedIn;
        userDetails = [...userDetails, { ...login }];
      }
      dispatch(assignData("login", { ...login }));
      sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      dispatch(assignData("userDetails", userDetails));
      login.name = "";
      login.email = "";
      login.categories = [];
      login.isLoggedIn = isLoggedIn;
      dispatch(assignData("login", { ...login }));
    }
  };
};

export const toggleChange = (event) => {
  return (dispatch, getState) => {
    let { login } = getState().reducer;
    let { categories } = login;
    const data = sessionStorage.getItem("userDetails");
    let indexValue;
    categories.map((item, index) =>
      event.target.name === item.label
        ? ((item.isChecked = !item.isChecked), (indexValue = index))
        : null
    );
    dispatch(assignData("login", { ...login, categories: categories }));
    let currentUser = JSON.parse(data);
    let userIndex;
    let checkFlag = [];
    currentUser.map((user, index) => {
      if (user.isLoggedIn) {
        userIndex = index;
        categories.map((purchase) => {
          checkFlag.push(purchase.isChecked);
        });
        user.categories.map((purchase) => {
          if (purchase.isChecked) {
            purchase.products.map((purchaseItem) => {
              return categories[indexValue].products.map((item) => {
                if (item.name === purchaseItem.name) {
                  item.addedToCart = purchaseItem.addedToCart;
                  item.quantityPrice = purchaseItem.quantityPrice;
                }
              });
            });
          }
        });
        user.categories.splice(indexValue, 1, categories[indexValue]);
      }
    });
    for (let iterate = 0; iterate < checkFlag.length; iterate++) {
      if (!checkFlag[iterate]) {
        currentUser[userIndex].selectAll = false;
        break;
      } else {
        currentUser[userIndex].selectAll = true;
      }
    }
    sessionStorage.clear();
    sessionStorage.setItem("userDetails", JSON.stringify(currentUser));
    dispatch(assignData("userDetails", currentUser));
    dispatch(
      assignData("login", {
        ...login,
        categories: currentUser[userIndex].categories,
      })
    );
  };
};
