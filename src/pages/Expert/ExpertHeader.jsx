import React from 'react';

const ExpertHeader = ({ expertName = 'Ashmita Basnet' }) => {
  return (
    <div className='relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-7'>

      <div className='relative z-10 flex items-center justify-between'>

        <div>

          <p className='mb-2 text-xs font-semibold uppercase tracking-widest text-purple-400'>
            Expert dashboard
          </p>

          <h1 className='text-3xl font-bold'>
            Welcome, {expertName}
          </h1>

          <p className='mt-2 text-sm text-gray-400'>
            Manage your expert profile, courses, students and consultations.
          </p>

        </div>

        <div className='flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-950 px-4 py-3'>

          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-bold'>
            {expertName.charAt(0)}
          </div>

          <div>
            <p className='text-sm font-semibold'>
              {expertName}
            </p>

            <p className='text-xs text-gray-500'>
              Approved Expert
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ExpertHeader;