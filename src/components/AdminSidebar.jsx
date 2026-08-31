import React from 'react'

const AdminSidebar = () => {
  return (
    <aside className='w-64 min-h-screen bg-purple-700 text-white p-5'>
       {/* logo */}
       <div className='mb-8'>
        <h1 className='text-2xl font-bold'>CodAcademy</h1>
        <p className='text-small text-purple-200'>Admin Panel</p>
       </div>
       
       {/* Navigation */} 
       <nav className='space-y-2'>
       <div className='px-4 py-3 rounded-lg bg-purple-600 cursor-pointer'>
            Dashboard
        </div>
        <div>
            Users
        </div>
        <div>
            Experts
        </div>
        <div>
            Courses
        </div>
        <div>
            Assessments
        </div>
        <div>
            Consultations
        </div>
        <div>
            Categories
        </div>
        <div>
            Settings
        </div>
        </nav>
    </aside>
  )
}

export default AdminSidebar