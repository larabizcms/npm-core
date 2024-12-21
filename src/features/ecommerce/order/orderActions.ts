import http from '../../../http-common';
import { Order } from './orderSlice';
import { objectToQueryString } from '../../../helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type GetOrdersParams = {
    locale?: string,
    [key: string]: string | undefined,
}

export const getOrders = createAsyncThunk('orders/index', async (params: GetOrdersParams | undefined, { rejectWithValue }) => {
    try {
        const response = await http.get<Order>(`/ecommerce/orders`
            + (params ? '?' + objectToQueryString(params) : '')
        );

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
});

export type GetOrderParams = {
    id: string,
    locale?: string,
    [key: string]: string | undefined,
}

export const getOrder = createAsyncThunk('orders', async (params: GetOrderParams, { rejectWithValue }) => {
    try {
        const query = Object.keys(params).filter(key => key !== 'id')
            .reduce((a, b) => ({ ...a, [b]: params[b] }), {});

        const response = await http.get<Order>(`/ecommerce/orders/${params.id}`
            + (query ? '?' + objectToQueryString(query) : '')
        );

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
});

export type StoreOrderParams = {

}

export const storeOrder = createAsyncThunk('orders/store', async (data: StoreOrderParams, { rejectWithValue }) => {
    try {
        const response = await http.post<Order>(`/ecommerce/orders`, data);

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
});

export type CheckoutParams = {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    payment_method: string,
    variants: {
        id: string,
        quantity: number,
    }[],
}

export const checkout = createAsyncThunk('orders/checkout', async (data: CheckoutParams, { rejectWithValue }) => {
    try {
        const response = await http.post<Order>(`/ecommerce/checkout`, data);

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
