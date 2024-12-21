import { createSlice } from '@reduxjs/toolkit';

export type PaymentMethod = {
    driver: string,
    name: string,
    icon: string | null,
    description: string | null,
};

export interface PaymentMethodState {
    loading: boolean;
    payload: null | {} | unknown;
    success: boolean;
    order: PaymentMethod | null;
}

const initialState: PaymentMethodState = {
    loading: false,
    payload: null,
    success: false,
    order: null,
}

const orderSlice = createSlice({
    name: 'payment_method',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(storePaymentMethod.pending, (state, action) => {
        //     state.loading = true;
        //     state.payload = null;
        // }),
        //     builder.addCase(storePaymentMethod.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.success = true;
        //         state.order = action.payload;
        //     }),
        //     builder.addCase(storePaymentMethod.rejected, (state, action) => {
        //         state.loading = false;
        //         state.success = false;
        //         state.order = null;
        //         state.payload = action.payload;
        //     })
    },
})

export default orderSlice.reducer;
