import React from "react";
import "../styles/products.scss";
import Categories from "./Categories";
import ShowProducts from "./ShowProducts";

const Products = (props) => {
  console.log("products", props);
  const { state } = props;
  const {categories}=state
  return (
    <div id="products">
      <Categories categories={categories}/>
      <ShowProducts categories={categories}/>
    </div>
  );
};

export default Products;
