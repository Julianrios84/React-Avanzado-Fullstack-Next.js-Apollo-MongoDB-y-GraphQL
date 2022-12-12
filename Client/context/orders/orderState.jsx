import React, { useReducer } from "react";
import OrderContext from "./orderContext";
import OrderReducer from "./orderReducer";

import {
  CLIENT_SELECT,
  PRODUCT_SELECT,
  PRODUCTS_STOCK,
  TOTAL_UPDATED,
} from "../../types";

const OrderState = ({ children }) => {
  // Order Status
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Modify the Client
  const addClient = (client) => {
    dispatch({
      type: CLIENT_SELECT,
      payload: client,
    });
  };

  // Modify the products
  const addProduct = (selectedProducts) => {
    console.log("🚀 ~ file: orderState.jsx:32 ~ addProduct ~ selectedProducts", selectedProducts)
    let newState;
    if (state.products.length > 0) {
      // Take from the second array, a copy to assign it to the first
      newState = selectedProducts.map((product) => {
        const object = state.products.find(
          (productState) => productState.id === product.id
        );
        return { ...product, ...object };
      });
    } else {
      newState = selectedProducts;
    }

    dispatch({
      type: PRODUCT_SELECT,
      payload: newState,
    });
  };

  // Modify the quantities of the products
  const productsStock = (product) => {
    dispatch({
      type: PRODUCTS_STOCK,
      payload: product,
    });
  };

  const totalUpdated = () => {
    dispatch({
      type: TOTAL_UPDATED,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        client: state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProduct,
        productsStock,
        totalUpdated,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
