import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PokemonType =
  | "FIRE"
  | "WATER"
  | "GRASS"
  | "ELECTRIC"
  | "PSYCHIC"
  | "DRAGON"
  | "FLYING"
  | "POISON";

export type Pokemon = {
  name: string;
  types: PokemonType[];
  hp: number;
  attack: number;
  defense: number;
  icon: string;
  url: string;
};

interface PokemonState {
  list: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
};

export const MyCollections = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      const exists = state.list.find((p) => p.name === action.payload.name);
      if (!exists) {
        state.list.push(action.payload);
      }
    },
    listPokemon: (state, action: PayloadAction<Pokemon[]>) => {
      state.list = action.payload;
    },
    removePokemon: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (pokemon) => pokemon.url !== action.payload
      );
    },
    reorderPokemons: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const updated = [...state.list];
      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);
      state.list = updated;
    },
  },
});

export const { addPokemon, listPokemon, removePokemon, reorderPokemons } =
  MyCollections.actions;

export default MyCollections.reducer;
