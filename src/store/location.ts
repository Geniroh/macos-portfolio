import { locations } from "#constants/index";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Location, LocationChild } from "#constants/constants.types";

interface LocationStore {
  activeLocation: Location | LocationChild;
  setActiveLocation: (location?: Location | LocationChild | null) => void;
  resetActiveLocation: () => void;
}

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location = null) =>
      set((state) => {
        if (!location) return;
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
