import http from '@local/http-common';
import { createAppAsyncThunk } from './withTypes';

export type PaymentPurchaseParams = {
    module: string,
    method: string,
    [key: string]: any
}

export const purchase = createAppAsyncThunk(
    'payment/purchase',
    async ({ module, ...params }: PaymentPurchaseParams, { rejectWithValue }) => {
        try {
            const res = await http.post(`/payment/${module}/purchase`, params);

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export type PaymentCompleteParams = {
    module: string,
    transaction_id: string,
    [key: string]: any
}

export const complete = createAppAsyncThunk(
    'payment/complete',
    async ({ module, transaction_id, ...params }: PaymentCompleteParams, { rejectWithValue }) => {
        try {
            const res = await http.post(`/payment/${module}/complete/${transaction_id}`, params);

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const cancel = createAppAsyncThunk(
    'payment/cancel',
    async ({ module, transaction_id, ...params }: PaymentCompleteParams, { rejectWithValue }) => {
        try {
            const res = await http.post(`/payment/${module}/cancel/${transaction_id}`, params);

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
