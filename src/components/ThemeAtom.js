import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const darkModeAtom = atomWithStorage("darkMode", false);

export const darkModeWithEffectAtom = atom(
  (get) => get(darkModeAtom),
  (get, set) => {
    const newMode = !get(darkModeAtom);
    set(darkModeAtom, newMode);

    if (typeof window !== 'undefined') {
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }
);

export const solarModeAtom = atomWithStorage(false);

export const solarModeWithEffectAtom = atom(
  (get) => get(solarModeAtom),
  (get, set) => {
    const newMode = !get(solarModeAtom);
    set(solarModeAtom, newMode);
  }
);

export const flashlightModeAtom = atomWithStorage(false);

export const flashlightModeWithEffectAtom = atom(
  (get) => get(flashlightModeAtom),
  (get, set) => {
    const newMode = !get(flashlightModeAtom);
    set(flashlightModeAtom, newMode);
  }
);
