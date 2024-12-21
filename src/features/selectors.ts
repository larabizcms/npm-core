import { AuthState } from "./auth/authSlice";
import { SettingState } from "./setting/settingSlice";

export const selectGeneral = (state: { setting: SettingState }) => state.setting.general;

export const selectSetting = (state: { setting: SettingState }) => state.setting.settings;

export const selectAuthToken = (state: { auth: AuthState }) => state.auth.userToken;

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;

export const isRefreshTokenLoading = (state: { auth: AuthState }) => state.auth.refreshTokenLoading;
