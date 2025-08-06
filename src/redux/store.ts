import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { pokemonSlice } from "./slice/pokemonSlice";
import { MyCollections } from "./slice/myCollectionsSlice";

const persistConfig = {
  key: "collections",
  storage,
  whitelist: ["list"], // only persist the pokemon collections 'list'
};

const persistedPokemonReducer = persistReducer(persistConfig, MyCollections.reducer);

// Redux store
export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
    collections: persistedPokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
