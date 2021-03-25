/* eslint-disable sort-imports */
/*
 * Typed redux hooks.
 *
 * See this guide:
 *   https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
