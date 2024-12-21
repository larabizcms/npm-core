import http from '../../../http-common';
import { PaymentMethod } from './methodSlice';
import { objectToQueryString } from '../../../helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type GetPaymentMethodsParams = {
    module: string,
    locale?: string,
    [key: string]: string | undefined,
}

export const getPaymentMethods = createAsyncThunk('payment/methods', async (params: GetPaymentMethodsParams, { rejectWithValue }) => {
    try {
        const response = await http.get<PaymentMethod>(`/payment/${params.module}/methods`
            + (params ? '?'+ objectToQueryString(params) : '')
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
