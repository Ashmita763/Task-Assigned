import React from 'react';
import { Outlet } from 'react-router-dom';
import ExpertSidebar from './ExpertSidebar';

const ExpertLayout = () => {
  return (
    <div className='min-h-screen bg-gray-950 text-white'>

      <ExpertSidebar />

      <main className='ml-64 min-h-screen'>
        <Outlet />
      </main>

    </div>
  );
};

export default ExpertLayout;