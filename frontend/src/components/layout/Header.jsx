import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Dropdown from '../ui/Dropdown';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-40 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">SmartTasker</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Dropdown
            trigger={
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            }
          >
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                Signed in as <span className="font-medium">{user?.name || 'User'}</span>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;