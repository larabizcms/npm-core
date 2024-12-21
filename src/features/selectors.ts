import { RootState } from "@local/store";

export const selectGeneral = (state: RootState) => state.setting.general;

export const selectSetting = (state: RootState) => state.setting.settings;

export const selectAuthToken = (state: RootState) => state.auth.userToken;

export const selectAuthUser = (state: RootState) => state.auth.user;

export const isRefreshTokenLoading = (state: RootState) => state.auth.refreshTokenLoading;
