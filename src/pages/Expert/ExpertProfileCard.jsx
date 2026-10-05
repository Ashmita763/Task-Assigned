import React from 'react';
import { FaEdit } from 'react-icons/fa';

const ExpertProfileCard = () => {
  return (
    <section className='mt-8'>

      <div className='mb-4 flex items-center justify-between'>

        <div>
          <p className='text-xs font-bold uppercase tracking-widest text-purple-400'>
            Profile information
          </p>

          <h2 className='mt-1 text-xl font-bold'>
            Expert profile
          </h2>
        </div>

        <button className='flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-700'>
          <FaEdit />
          Edit profile
        </button>

      </div>

      <div className='rounded-xl border border-gray-800 bg-gray-900 p-6'>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>

          <div>
            <p className='text-xs text-gray-500'>
              Professional expertise
            </p>

            <p className='mt-2 rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-sm'>
              Python
            </p>
          </div>

          <div>
            <p className='text-xs text-gray-500'>
              Expertise
            </p>

            <p className='mt-2 rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-sm'>
              Python Development
            </p>
          </div>

          <div>
            <p className='text-xs text-gray-500'>
              Qualification
            </p>

            <p className='mt-2 rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-sm'>
              Bachelor's Degree
            </p>
          </div>

          <div>
            <p className='text-xs text-gray-500'>
              Experience
            </p>

            <p className='mt-2 rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-sm'>
              3 Years
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default ExpertProfileCard;