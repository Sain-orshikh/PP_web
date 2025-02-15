import { useAtom } from "jotai";
import { darkModeWithEffectAtom } from "../components/ThemeAtom.js";

export default function App() {
  const [isDarkMode, toggleDarkMode] = useAtom(darkModeWithEffectAtom);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 transition-all"
      >
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <p className="mt-4">
        This is an example of Tailwind-powered dark mode with Jotai!
      </p>

      {/* Example of Tailwind dark mode classes */}
      <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-gray-800 dark:text-gray-200">
          This box changes color in dark mode!
        </p>
      </div>
    </div>
  );
}
