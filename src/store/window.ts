/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: any;
}

export type WindowsMap = Record<string, WindowState>;

export interface WindowStore {
  windows: WindowsMap;
  nextZindex: number;
  openWindow: (windowKey: string, data?: any) => void;
  closeWindow: (windowKey: string, data?: any) => void;
  focusWindow: (windowKey: string, data?: any) => void;
}

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG as WindowsMap,
    nextZindex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey: string, data: any = null) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isOpen = true;
        window.zIndex = state.nextZindex;
        window.data = data ?? window.data;
        state.nextZindex += 1;
      }),

    closeWindow: (windowKey: string, data: any = null) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isOpen = false;
        window.zIndex = INITIAL_Z_INDEX;
        window.data = null;
      }),

    focusWindow: (windowKey: string, data: any = null) =>
      set((state) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.zIndex = state.nextZindex++;
      }),
  }))
);

export default useWindowStore;
