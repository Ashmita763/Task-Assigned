import React from 'react';

import ExpertHeader from '../../components/Expert/ExpertHeader';
import ExpertStatCard from '../../components/Expert/ExpertStatCard';

const ExpertDashboard = () => {
  return (
    <div className='min-h-screen bg-gray-950 px-8 py-8'>

      {/* Header */}

      <ExpertHeader />

      {/* Statistics */}

      <section className='mt-8'>

        <h2 className='mb-4 text-xs font-bold uppercase tracking-widest text-purple-400'>
          Dashboard overview
        </h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>

          <ExpertStatCard
            title='Courses'
            value='0'
            description='Courses created by you'
          />

          <ExpertStatCard
            title='Enrolled students'
            value='0'
            description='Students learning from your courses'
          />

          <ExpertStatCard
            title='Upcoming consultations'
            value='0'
            description='Pending and confirmed sessions'
          />

          <ExpertStatCard
            title='Completed consultations'
            value='0'
            description='Completed expert sessions'
          />

          <ExpertStatCard
            title='Consultation students'
            value='0'
            description='Unique consultation students'
          />

          <ExpertStatCard
            title='Earnings'
            value='NPR 0'
            description='Completed consultation value'
          />

        </div>

      </section>

    </div>
  );
};

export default ExpertDashboard;