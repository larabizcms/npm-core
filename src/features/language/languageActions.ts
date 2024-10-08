import http from '@larabiz/http-common';
import { createAppAsyncThunk } from '../withTypes';
import { Language } from './languageSlice';
import { objectToQueryString } from '@larabizcms/larabizcms';

export type LanguageList = {
    data: Language[];
    total: number;
}

export type LanguageQuery = {
    limit?: number;
}

export const fetchLanguages = createAppAsyncThunk('language/list', async (query: LanguageQuery) => {
    const response = await http.get<LanguageList>('/languages'+(query ? '?'+objectToQueryString(query) : ''));

    return response.data;
});
