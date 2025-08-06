import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPokemonData } from "../../api/list";

type pokemonData = {
  name: string;
  url: string
}

interface initialStateType {
  data: pokemonData | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  data: null,
  loading: false,
  error: null,
};

// Get pokemon data with thunk
export const GetPokemonData = createAsyncThunk(
  "list/pokemon",
  async (params?: any) => {
    try {
      const response = await getPokemonData(params);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

// Slice
export const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get
    builder.addCase(GetPokemonData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      GetPokemonData.fulfilled,
      (state, action: PayloadAction<pokemonData>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(GetPokemonData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  },
});

export default pokemonSlice.reducer;
