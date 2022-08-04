import currentUserReducer from "./slices/currentUser/currentUser.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ currentUserReducer });

export const getStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const useAppDispatch: () => DispatchState = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof rootReducer>;
export type StoreState = ReturnType<typeof getStore>;
export type DispatchState = StoreState["dispatch"];
