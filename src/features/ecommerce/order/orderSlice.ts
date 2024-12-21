import { createSlice } from '@reduxjs/toolkit';
import { checkout, getOrder, storeOrder } from './orderActions';

export type Order = {
    id: string,
    code: string,
    name: string,
    email: string,
    created_at: string,
    total: number,
    items: OrderItem[],
};

export type OrderItem = {
    id: string,
    quantity: number,
    total: number,
    total_price: number,
    title: string,
    price: number,
};

export interface OrderState {
    loading: boolean;
    payload: null | {} | unknown;
    success: boolean;
    order: Order | null;
}

const initialState: OrderState = {
    loading: false,
    payload: null,
    success: false,
    order: null,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(storeOrder.pending, (state, action) => {
            state.loading = true;
            state.payload = null;
        }),
            builder.addCase(storeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            }),
            builder.addCase(storeOrder.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.order = null;
                state.payload = action.payload;
            }),
            builder.addCase(checkout.pending, (state, action) => {
                state.loading = true;
                state.payload = null;
            }),
            builder.addCase(checkout.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = (action.payload as any).data;
            }),
            builder.addCase(checkout.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.order = null;
                state.payload = action.payload;
            }),
            builder.addCase(getOrder.pending, (state, action) => {
                state.loading = true;
                state.payload = null;
            }),
            builder.addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = (action.payload as any).data;
            }),
            builder.addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.order = null;
                state.payload = action.payload;
            })
    },
})

export default orderSlice.reducer;
