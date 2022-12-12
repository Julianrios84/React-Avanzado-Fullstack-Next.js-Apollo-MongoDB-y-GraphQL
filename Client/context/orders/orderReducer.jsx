import {
  CLIENT_SELECT,
  PRODUCT_SELECT,
  PRODUCTS_STOCK,
  TOTAL_UPDATED
} from '../../types'


export default ( state, action ) => {
  switch(action.type) {
      case CLIENT_SELECT: 
          return {
              ...state,
              client: action.payload
          }
      case PRODUCT_SELECT: 
          return {
              ...state,
              products: action.payload
          }
      case PRODUCTS_STOCK:
          return {
              ...state,
              products: state.products.map( product => product.id === action.payload.id ? product = action.payload : product )
          }
      case TOTAL_UPDATED:
          console.log(state)
          return {
              ...state,
              total: state.products.reduce( (total_new, item) => total_new += item.price * item.quantity, 0)
          }

      default: 
          return state
  }
}