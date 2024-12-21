import http from '../../../http-common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from './cartSlice';

export type CartAddParams = {
    productId: string,
    quantity: number,
    id: string,
}

export type GetCartParams = {
    id: string,
    locale?: string,
}

export const getCart = createAsyncThunk('carts/get', async (params: GetCartParams, { rejectWithValue }) => {
    try {
        const response = await http.get<Cart>(`/ecommerce/carts/${params.id}`+ (params.locale ? `?locale=${params.locale}` : ''));

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
});

export const addToCart = createAsyncThunk(
    'cart/add',
    async (data: CartAddParams, { rejectWithValue }) => {
        try {
            const res = await http.post(`/carts/${data.id}/add`, data)

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
