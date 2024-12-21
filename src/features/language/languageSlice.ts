
import { createSlice } from '@reduxjs/toolkit';
import { fetchLanguages } from './languageActions';

export type Language = {
    name: string
    code: string
}

export interface LanguageState {
    loading: boolean;
    success: boolean;
    error?: string;
    payload: null | {} | unknown;
    language?: Language | null;
    languages?: Language[];
}

const initialState: LanguageState = {
    loading: false,
    success: false,
    payload: null,
    language: null,
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLanguages.pending, (state, action) => {
            state.loading = true;
            state.payload = null;
        }),
        builder.addCase(fetchLanguages.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.languages = payload.data;
        }),
        builder.addCase(fetchLanguages.rejected, (state, action) => {
            state.loading = false;
            state.payload = action.payload;
            state.languages = [];
            state.error = action.error.message;
        })
    },
});

export const selectAllLanguages = (state: any) => state.language.languages;

export default languageSlice.reducer;
