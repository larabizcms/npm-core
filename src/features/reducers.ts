import authReducer from './auth/authSlice';
import settingReducer from './setting/settingSlice';
import mediaReducer from './media/mediaSlice';
import pageReducer from './page/pageSlice';
import { authApi } from './auth/authService';
import { settingApi } from './setting/settingService';
import { mediaApi } from './media/mediaService';
import { pageApi } from './page/pageService';
import languageReducer from './language/languageSlice';
import { Middleware } from '@reduxjs/toolkit';

export const rootMiddleware: Middleware[] = [
    authApi.middleware,
    settingApi.middleware,
    pageApi.middleware,
    mediaApi.middleware,
];

const rootReducers = {
    auth: authReducer,
    setting: settingReducer,
    media: mediaReducer,
    page: pageReducer,
    language: languageReducer,
    authApi: authApi.reducer,
    settingApi: settingApi.reducer,
    pageApi: pageApi.reducer,
    mediaApi: mediaApi.reducer,
};

export default rootReducers;
