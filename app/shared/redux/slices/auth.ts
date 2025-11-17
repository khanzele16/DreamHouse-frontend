import axios from "@/app/shared/config/axios";
import { IAuthSliceState } from "@/app/types/redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "@/app/types/requests";

const getErrorMessage = (reason: string, type: 'register' | 'login'): string => {
  const errorMessages: Record<string, Record<string, string>> = {
    register: {
      'ALREADY_REGISTERED': 'Пользователь с таким email уже зарегистрирован',
      'INVALID_EMAIL': 'Некорректный email адрес',
      'WEAK_PASSWORD': 'Пароль слишком слабый',
      'INVALID_DATA': 'Некорректные данные для регистрации',
      'SERVER_ERROR': 'Ошибка сервера. Попробуйте позже',
      'REGISTER_FAILED': 'Ошибка регистрации'
    },
    login: {
      'INVALID_CREDENTIALS': 'Неверный email или пароль',
      'USER_NOT_FOUND': 'Пользователь не найден',
      'ACCOUNT_BLOCKED': 'Аккаунт заблокирован',
      'INVALID_EMAIL': 'Некорректный email адрес',
      'SERVER_ERROR': 'Ошибка сервера. Попробуйте позже',
      'LOGIN_FAILED': 'Ошибка авторизации'
    }
  };

  if (errorMessages[type][reason]) {
    return errorMessages[type][reason];
  }

  return reason;
};

export const register = createAsyncThunk<IRegisterResponse, IRegisterRequest>(
  "auth/register", 
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/register/", userData);
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: IRegisterResponse } };
      return rejectWithValue(axiosError.response?.data || { 
        ok: false, 
        CODE: "REGISTER_FAILED", 
        reason: "Ошибка регистрации" 
      });
    }
  }
);

export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
  "auth/login", 
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/token/", userData);
      if (data.access && data.refresh) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      }
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: ILoginResponse } };
      return rejectWithValue(axiosError.response?.data || { 
        ok: false, 
        CODE: "LOGIN_FAILED", 
        reason: "Ошибка авторизации" 
      });
    }
  }
);

// Функция для получения данных пользователя
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("No token");
      }
      const { data } = await axios.get("/users/me/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // API возвращает { ok, code, reason, user }, извлекаем user
      if (data.ok && data.user) {
        return data.user;
      }
      return rejectWithValue(data.reason || "Failed to fetch user");
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown } };
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

// Функция, которая будет проверять - авторизован ли пользователь
export const authMe = createAsyncThunk(
  "auth/authMe",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("No token");
      }
      // Загружаем данные пользователя
      await dispatch(fetchUser());
      return { isAuth: true };
    } catch (error: unknown) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      const axiosError = error as { response?: { data?: unknown } };
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const initialState: IAuthSliceState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          // Регистрация успешна, но пользователь еще не авторизован
          state.error = null;
        } else {
          state.error = getErrorMessage(action.payload.reason, 'register');
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as IRegisterResponse | string;
        if (typeof payload === 'string') {
          state.error = getErrorMessage(payload, 'register');
        } else if (payload && typeof payload === 'object' && 'reason' in payload) {
          state.error = getErrorMessage(payload.reason, 'register');
        } else {
          state.error = getErrorMessage("REGISTER_FAILED", 'register');
        }
      })
    // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.access && action.payload.refresh) {
          state.isAuth = true;
          state.error = null;
        } else {
          state.error = action.payload.reason || getErrorMessage("LOGIN_FAILED", 'login');
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as ILoginResponse | string;
        if (typeof payload === 'string') {
          state.error = getErrorMessage(payload, 'login');
        } else if (payload && typeof payload === 'object' && 'reason' in payload) {
          state.error = getErrorMessage(payload.reason, 'login');
        } else {
          state.error = getErrorMessage("LOGIN_FAILED", 'login');
        }
      })
    // FetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
    // AuthMe
      .addCase(authMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(authMe.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(authMe.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      });
  },
});

export const { logout, clearError } = auth.actions;
export default auth.reducer;
