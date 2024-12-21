import methodReducer from './method/methodSlice';
import paymentReducer from './payment/paymentSlice';

const PaymentReducers = {
    method: methodReducer,
    payment: paymentReducer,
};

export default PaymentReducers;
