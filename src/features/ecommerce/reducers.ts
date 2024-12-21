import cartReducer from './cart/cartSlice';
import orderRedicer from './order/orderSlice';

const ECommerceReducers = {
    cart: cartReducer,
    order: orderRedicer,
};

export default ECommerceReducers;
