import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const darkModeAtom = atomWithStorage("darkMode", false);

export const darkModeWithEffectAtom = atom(
  (get) => get(darkModeAtom),
  (get, set) => {
    const newMode = !get(darkModeAtom);
    set(darkModeAtom, newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
);
