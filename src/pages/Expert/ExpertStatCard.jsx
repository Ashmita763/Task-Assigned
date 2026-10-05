import React from 'react';

const ExpertStatCard = ({
  title,
  value,
  description
}) => {
  return (
    <div className='rounded-xl border border-gray-800 bg-gray-900 p-5'>

      <p className='text-sm text-gray-400'>
        {title}
      </p>

      <h2 className='mt-3 text-3xl font-bold text-purple-400'>
        {value}
      </h2>

      <p className='mt-2 text-xs text-gray-500'>
        {description}
      </p>

    </div>
  );
};

export default ExpertStatCard;