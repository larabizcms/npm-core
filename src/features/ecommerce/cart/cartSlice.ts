import { createSlice } from '@reduxjs/toolkit';
import { addToCart, getCart } from './cartActions';
import { Variant } from '../product/productSlice';

export type Cart = {
    id: string,
    total: number,
    items: CartItem[],
};

export type CartItem = {
    id: string,
    quantity: number,
    variant: Variant,
};

export interface CartState {
    loading: boolean;
    payload: null | {} | unknown;
    success: boolean;
    cart: Cart | null;
}

const initialState: CartState = {
    loading: false,
    payload: null,
    success: false,
    cart: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get Card
        builder.addCase(getCart.pending, (state, action) => {
            state.loading = true;
            state.payload = null;
        }),
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.cart = (action.payload as any).data;
        }),
        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.payload = action.payload;
        }),
        // AddToCart
        builder.addCase(addToCart.pending, (state, action) => {
            state.loading = true;
            state.payload = null;
        }),
            builder.addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.cart = action.payload;
            }),
            builder.addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.payload = action.payload;
            })
    },
})

export default cartSlice.reducer;
