import { createSlice } from '@reduxjs/toolkit';
import { cancel, complete, purchase } from './paymentActions';

export type PaymentMethod = {
    driver: string,
    name: string,
    icon: string | null,
    description: string | null,
};

export interface PaymentState {
    loading: boolean;
    payload: null | {} | unknown;
    success: boolean;
}

const initialState: PaymentState = {
    loading: false,
    payload: null,
    success: false,
}

const orderSlice = createSlice({
    name: 'payment_payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(complete.pending, (state, action) => {
            state.loading = true;
            state.success = false;
            state.payload = null;
        }),
            builder.addCase(complete.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            }),
            builder.addCase(complete.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.payload = action.payload;
            }),
            builder.addCase(cancel.pending, (state, action) => {
                state.loading = true;
                state.payload = null;
            }),
            builder.addCase(cancel.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.payload = action.payload;
            }),
            builder.addCase(cancel.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.payload = action.payload;
            }),
            builder.addCase(purchase.pending, (state, action) => {
                state.loading = true;
                state.success = false;
                state.payload = null;
            }),
            builder.addCase(purchase.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.payload = action.payload;
            }),
            builder.addCase(purchase.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.payload = action.payload;
            })
    },
})

export default orderSlice.reducer;
