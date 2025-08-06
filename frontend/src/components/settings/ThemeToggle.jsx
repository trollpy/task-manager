import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <div>
        <h3 className="font-medium">Theme</h3>
        <p className="text-sm text-gray-500">Switch between light and dark mode</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
        <span className="ml-3 text-sm font-medium">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;