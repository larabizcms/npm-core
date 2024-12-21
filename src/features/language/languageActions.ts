import http from '../../http-common';
import { Language } from './languageSlice';
import { objectToQueryString } from '../../helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type LanguageList = {
    data: Language[];
    total: number;
}

export type LanguageQuery = {
    limit?: number;
}

export const fetchLanguages = createAsyncThunk('language/list', async (query: LanguageQuery) => {
    const response = await http.get<LanguageList>('/languages'+(query ? '?'+objectToQueryString(query) : ''));

    return response.data;
});
