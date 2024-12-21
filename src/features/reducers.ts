import authReducer from '@larabizcms/larabizcms/features/auth/authSlice';
import settingReducer from '@larabizcms/larabizcms/features/setting/settingSlice';
import mediaReducer from '@larabizcms/larabizcms/features/media/mediaSlice';
import pageReducer from '@larabizcms/larabizcms/features/page/pageSlice';
import { authApi } from '@larabizcms/larabizcms/features/auth/authService';
import { settingApi } from '@larabizcms/larabizcms/features/setting/settingService';
import { mediaApi } from '@larabizcms/larabizcms/features/media/mediaService';
import { pageApi } from '@larabizcms/larabizcms/features/page/pageService';
import languageReducer from '@larabizcms/larabizcms/features/language/languageSlice';
import menuReducer from '@larabizcms/larabizcms/features/menu/menuSlice';
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
    menu: menuReducer,
    authApi: authApi.reducer,
    settingApi: settingApi.reducer,
    pageApi: pageApi.reducer,
    mediaApi: mediaApi.reducer,
};

export default rootReducers;
