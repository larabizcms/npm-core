import http from '@larabizcms/larabizcms/http-common';
import { createAppAsyncThunk } from '../../withTypes';
import { PaymentMethod } from './methodSlice';
import { objectToQueryString } from '@larabizcms/admin/helpers/helper';

export type GetPaymentMethodsParams = {
    module: string,
    locale?: string,
    [key: string]: string | undefined,
}

export const getPaymentMethods = createAppAsyncThunk('payment/methods', async (params: GetPaymentMethodsParams, { rejectWithValue }) => {
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
