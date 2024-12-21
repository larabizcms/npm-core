import http from '@local/http-common';
import { createAppAsyncThunk } from '../../withTypes';
import { Order } from './orderSlice';
import { objectToQueryString } from '@larabizcms/admin/helpers/helper';

export type GetOrdersParams = {
    locale?: string,
    [key: string]: string | undefined,
}

export const getOrders = createAppAsyncThunk('orders/index', async (params: GetOrdersParams | undefined, { rejectWithValue }) => {
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

export const getOrder = createAppAsyncThunk('orders', async (params: GetOrderParams, { rejectWithValue }) => {
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

export const storeOrder = createAppAsyncThunk('orders/store', async (data: StoreOrderParams, { rejectWithValue }) => {
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

export const checkout = createAppAsyncThunk('orders/checkout', async (data: CheckoutParams, { rejectWithValue }) => {
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
