import axios from "axios";
import { ICardsSliceState } from "@/app/types/redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICard } from "@/app/types/models";

export const fetchCards = createAsyncThunk<ICard[]>(
  "cards/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ICard[]>("https://api.dreamhouse05.com/api/cards/");
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Не удалось загрузить карточки");
    }
  }
);

export const fetchCardById = createAsyncThunk<ICard, number>(
  "cards/fetchCardById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ICard>(`https://api.dreamhouse05.com/api/cards/${id}/`);
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Не удалось загрузить карточку");
    }
  }
);

export const searchCards = createAsyncThunk<ICard[], string>(
  "cards/searchCards",
  async (query, { rejectWithValue }) => {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }
      const { data } = await axios.get<ICard[]>(
        `https://api.dreamhouse05.com/api/cards/search/?q=${encodeURIComponent(query)}`
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Ошибка поиска");
    }
  }
);

export const fetchFavoriteCards = createAsyncThunk<ICard[]>(
  "cards/fetchFavoriteCards",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("Необходима авторизация");
      }
      const { data } = await axios.get<Array<{ id: number; card: ICard }>>(
        "https://api.dreamhouse05.com/api/cards/favorites/me/",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return data.map(item => item.card);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Не удалось загрузить избранные карточки");
    }
  }
);

export const toggleFavorite = createAsyncThunk<
  { id: number; is_favorite: boolean },
  { id: number; is_favorite: boolean }
>(
  "cards/toggleFavorite",
  async ({ id, is_favorite }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("Необходима авторизация");
      }

      if (is_favorite) {
        // Удаляем из избранного (DELETE)
        await axios.delete(
          `https://api.dreamhouse05.com/api/cards/${id}/favorite/`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        return { id, is_favorite: false };
      } else {
        // Добавляем в избранное (POST)
        await axios.post(
          `https://api.dreamhouse05.com/api/cards/${id}/favorite/`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        return { id, is_favorite: true };
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: unknown }; message?: string };
      return rejectWithValue(axiosError.message || "Ошибка изменения избранного");
    }
  }
);

const initialState: ICardsSliceState = {
  cards: [],
  currentCard: null,
  searchResults: [],
  loading: false,
  searchLoading: false,
  error: null,
  isFavoritesPage: false,
};

const cards = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    updateCardFavorite(state, action: { payload: { id: number; is_favorite: boolean } }) {
      // Обновляем в списке карточек
      const cardInList = state.cards.find(card => card.id === action.payload.id);
      if (cardInList) {
        cardInList.is_favorite = action.payload.is_favorite;
      }
      // Обновляем текущую карточку
      if (state.currentCard && state.currentCard.id === action.payload.id) {
        state.currentCard.is_favorite = action.payload.is_favorite;
      }
      // Обновляем в результатах поиска
      const cardInSearch = state.searchResults.find(card => card.id === action.payload.id);
      if (cardInSearch) {
        cardInSearch.is_favorite = action.payload.is_favorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
        state.error = null;
        state.isFavoritesPage = false;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Ошибка загрузки карточек";
      })
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCard = action.payload;
        state.error = null;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Ошибка загрузки карточки";
      })
      .addCase(searchCards.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchCards.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCards.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchResults = [];
        state.error = action.payload as string || "Ошибка поиска";
      })
      .addCase(fetchFavoriteCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
        state.error = null;
        state.isFavoritesPage = true;
      })
      .addCase(fetchFavoriteCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Не удалось загрузить избранные карточки";
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        // Обновляем состояние избранного для карточки
        const { id, is_favorite } = action.payload;
        
        // Если удалили из избранного И находимся на странице избранного, удаляем из списка
        if (!is_favorite && state.isFavoritesPage) {
          state.cards = state.cards.filter(card => card.id !== id);
        } else {
          // Обновляем в списке карточек (если карточка там есть)
          const cardInList = state.cards.find(card => card.id === id);
          if (cardInList) {
            cardInList.is_favorite = is_favorite;
          }
        }
        
        // Обновляем текущую карточку
        if (state.currentCard && state.currentCard.id === id) {
          state.currentCard.is_favorite = is_favorite;
        }
        
        // Обновляем в результатах поиска
        const cardInSearch = state.searchResults.find(card => card.id === id);
        if (cardInSearch) {
          cardInSearch.is_favorite = is_favorite;
        }
      });
  },
});

export const { clearError, clearSearchResults, updateCardFavorite } = cards.actions;
export default cards.reducer;