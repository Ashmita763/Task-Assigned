import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaGraduationCap,
  FaHome,
  FaUser,
  FaBook,
  FaUsers,
  FaComments,
  FaSignOutAlt
} from 'react-icons/fa';

const ExpertSidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Overview',
      path: '/expert/dashboard',
      icon: <FaHome />
    },
    {
      name: 'Expert profile',
      path: '/expert/profile',
      icon: <FaUser />
    },
    {
      name: 'Course builder',
      path: '/expert/course',
      icon: <FaBook />
    },
    {
      name: 'Students',
      path: '/expert/students',
      icon: <FaUsers />
    },
    {
      name: 'Consultations',
      path: '/expert/consultations',
      icon: <FaComments />
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    navigate('/auth');
  };

  return (
    <aside className='fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-gray-950 text-white'>

      {/* Logo */}
      <div className='border-b border-gray-800 px-6 py-5'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-purple-600'>
            <FaGraduationCap />
          </div>

          <div>
            <h1 className='text-lg font-bold'>
              CodAcademy
            </h1>

            <p className='text-xs text-gray-400'>
              Expert panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-3 py-5'>

        <p className='mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500'>
          Menu
        </p>

        <div className='space-y-2'>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`
              }
            >
              <span className='text-sm'>
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}

        </div>

      </nav>

      {/* Logout */}
      <div className='border-t border-gray-800 p-4'>

        <button
          onClick={handleLogout}
          className='flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200'
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
};

export default ExpertSidebar;