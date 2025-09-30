import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, FileText, BookOpen } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/docs', label: 'Documentation', icon: BookOpen }
  ];

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs = [{ label: 'VeBuIn Belc Cost Calculator', path: '/' }];
    pathnames.forEach((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = pathname.charAt(0).toUpperCase() + pathname.slice(1);
      breadcrumbs.push({ label, path });
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="bg-vebuiln-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo and Title */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-vebuiln-corporate-blue text-white px-3 py-2 rounded font-bold text-lg">
                VeBuIn
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-vebuiln-charcoal">Belc Cost Calculator</h1>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === path
                    ? 'bg-vebuiln-corporate-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-vebuiln-corporate-blue'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}
          </div>
        </div>
        {/* Breadcrumbs */}
        <div className="flex items-center py-2 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <span className="mx-2">/</span>}
              <Link
                to={crumb.path}
                className={`hover:text-vebuiln-corporate-blue transition ${
                  index === breadcrumbs.length - 1 ? 'font-semibold text-vebuiln-charcoal' : ''
                }`}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;