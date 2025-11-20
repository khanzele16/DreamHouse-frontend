import axios from "@/app/shared/config/axios";
import { IDevelopersSliceState } from "@/app/types/redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDeveloperDetail } from "@/app/types/models";

// Получить список всех застройщиков
export const fetchDevelopers = createAsyncThunk<IDeveloperDetail[]>(
  "developers/fetchDevelopers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IDeveloperDetail[]>("https://api.dreamhouse05.com/api/developers/");
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Не удалось загрузить застройщиков");
    }
  }
);

// Получить информацию о конкретном застройщике
export const fetchDeveloperById = createAsyncThunk<IDeveloperDetail, number>(
  "developers/fetchDeveloperById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IDeveloperDetail>(`https://api.dreamhouse05.com/api/developers/${id}/`);
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Не удалось загрузить застройщика");
    }
  }
);

// Получить карточки конкретного застройщика
export const fetchDeveloperCards = createAsyncThunk<IDeveloperDetail, number>(
  "developers/fetchDeveloperCards",
  async (developerId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IDeveloperDetail>(
        `https://api.dreamhouse05.com/api/developers/${developerId}/cards/`
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Не удалось загрузить карточки застройщика");
    }
  }
);

// Подписаться на застройщика
export const subscribeToDeveloper = createAsyncThunk<
  { developerId: number },
  number
>(
  "developers/subscribe",
  async (developerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("Необходима авторизация");
      }

      await axios.post(
        `https://api.dreamhouse05.com/api/developers/${developerId}/subscribe/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return { developerId };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Ошибка при подписке на застройщика");
    }
  }
);

// Отписаться от застройщика
export const unsubscribeFromDeveloper = createAsyncThunk<
  { developerId: number },
  number
>(
  "developers/unsubscribe",
  async (developerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("Необходима авторизация");
      }

      await axios.delete(
        `https://api.dreamhouse05.com/api/developers/${developerId}/subscribe/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return { developerId };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Ошибка при отписке от застройщика");
    }
  }
);

// Получить список подписок пользователя
export const fetchMySubscriptions = createAsyncThunk<IDeveloperDetail[]>(
  "developers/fetchMySubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("Необходима авторизация");
      }

      const { data } = await axios.get<IDeveloperDetail[]>(
        "https://api.dreamhouse05.com/api/developers/me/subscriptions/",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Не удалось загрузить подписки");
    }
  }
);

const initialState: IDevelopersSliceState = {
  developers: [],
  currentDeveloper: null,
  subscriptions: [],
  loading: false,
  error: null,
};

const developers = createSlice({
  name: "developers",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearCurrentDeveloper(state) {
      state.currentDeveloper = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all developers
      .addCase(fetchDevelopers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.loading = false;
        state.developers = action.payload;
        state.error = null;
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Ошибка загрузки застройщиков";
      })
      
      // Fetch developer by ID
      .addCase(fetchDeveloperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeveloperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDeveloper = action.payload;
        state.error = null;
      })
      .addCase(fetchDeveloperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Ошибка загрузки застройщика";
      })
      
      // Fetch developer cards
      .addCase(fetchDeveloperCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeveloperCards.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDeveloper = action.payload;
        state.error = null;
      })
      .addCase(fetchDeveloperCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Ошибка загрузки карточек";
      })
      
      // Subscribe
      .addCase(subscribeToDeveloper.fulfilled, (state, action) => {
        const { developerId } = action.payload;
        
        // Обновляем в списке всех застройщиков
        const developer = state.developers.find(d => d.id === developerId);
        if (developer) {
          developer.is_subscribed = true;
        }
        
        // Обновляем текущего застройщика
        if (state.currentDeveloper && state.currentDeveloper.id === developerId) {
          state.currentDeveloper.is_subscribed = true;
        }
      })
      
      // Unsubscribe
      .addCase(unsubscribeFromDeveloper.fulfilled, (state, action) => {
        const { developerId } = action.payload;
        
        // Обновляем в списке всех застройщиков
        const developer = state.developers.find(d => d.id === developerId);
        if (developer) {
          developer.is_subscribed = false;
        }
        
        // Обновляем текущего застройщика
        if (state.currentDeveloper && state.currentDeveloper.id === developerId) {
          state.currentDeveloper.is_subscribed = false;
        }
        
        // Удаляем из подписок
        state.subscriptions = state.subscriptions.filter(d => d.id !== developerId);
      })
      
      // Fetch my subscriptions
      .addCase(fetchMySubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMySubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
        state.error = null;
      })
      .addCase(fetchMySubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Ошибка загрузки подписок";
      });
  },
});

export const { clearError, clearCurrentDeveloper } = developers.actions;
export default developers.reducer;
