import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Navigation = () => {
  const { theme } = useTheme();
  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/team', label: 'Team' },
    { path: '/reports', label: 'Reports' },
    { path: '/settings', label: 'Settings' }
  ];

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;