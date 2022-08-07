import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import updateVersion from "./global/actions";

// import appReducer from "./app";
import blockReducer from "./block";
import bridgeReducer from "./bridge/reducer";
import multicalReducer from "./multicall/reducer";
import transactionsReducer from "./transactions/reducer";

const PERSISTED_KEYS: string[] = ["transactions", "user", "lists"];

const persistConfig = {
  key: "primary",
  whitelist: PERSISTED_KEYS,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    block: blockReducer,
    bridge: bridgeReducer,
    multicall: multicalReducer,
    transactions: transactionsReducer,
  })
);

// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof makeStore> | undefined;

function makeStore(preloadedState = undefined) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV === "development",
    preloadedState,
  });
}

export const initializeStore = (preloadedState: any = undefined) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) {
    store = _store;
    store.dispatch(updateVersion());
  }

  return _store;
};

store = initializeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}

export default store;
