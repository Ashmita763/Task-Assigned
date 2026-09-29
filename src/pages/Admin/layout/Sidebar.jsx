import { NavLink } from 'react-router-dom'
import { Mountain, X } from 'lucide-react'
import { adminNav } from '../../lib/adminNav'

// - Reusable navigation item component
function NavItem({ item, onNavigate }) {

  // - Get the icon component from the navigation item
  const Icon = item.icon

  return (
    // - NavLink handles navigation and active-link styling
    <NavLink
      to={item.to}

      // - Controls whether the route should match exactly
      end={item.end}

      // - Runs when the navigation item is clicked
      onClick={onNavigate}

      // - NavLink provides isActive automatically
      // - Used to change the appearance of the active item
      className={({ isActive }) =>
        [
          // - Common styles for every navigation item
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',

          // - Different styles for active and inactive links
          isActive
            ? 'bg-purple-100 text-purple-800'
            : 'text-slate-600 hover:bg-purple-200 hover:text-white',
        ].join(' ')
      }
    >

      // - NavLink provides isActive to the children function
      {({ isActive }) => (
        <>

          // - Small colored dot showing the active navigation item
          <span
            className={[
              'flex h-2 w-2 shrink-0 rounded-full transition-colors',

              // - Brand color when item is active
              // - Gray color when item is inactive
              isActive
                ? 'bg-purple-600'
                : 'bg-slate-300',
            ].join(' ')}

            // - Hides decorative element from screen readers
            aria-hidden="true"
          />

          // - Display the navigation item's icon
          <Icon
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
          />

          // - Display the navigation item's label
          // - truncate prevents long text from overflowing
          <span className="truncate">
            {item.label}
          </span>

        </>
      )}
    </NavLink>
  )
}


// - Main Admin Sidebar component
export default function Sidebar({ open, onClose }) {
  return (
    <>

      // - Mobile background overlay
      // - Appears when the sidebar is open on small screens
      {open && (
        <button
          aria-label="Close menu"

          // - Clicking the overlay closes the sidebar
          onClick={onClose}

          // - Fixed overlay covering the screen
          // - lg:hidden means it is hidden on large screens
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      )}


      // - Main sidebar
      <aside
        className={[
          // - Basic sidebar styling
          'fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 transition-transform',

          // - On large screens sidebar stays in its normal position
          'lg:static lg:translate-x-0',

          // - On mobile:
          // - open = sidebar visible
          // - closed = sidebar moves outside the screen
          open
            ? 'translate-x-0'
            : '-translate-x-full',
        ].join(' ')}
      >


        // - Sidebar header containing logo and close button
        <div className="mb-8 flex items-center justify-between px-1">

          // - Logo and application name
          <div className="flex items-center gap-2.5">

            // - CodAcademy logo container
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card">

              // - Mountain icon used as the logo
              <Mountain
                className="h-5 w-5"
                aria-hidden="true"
              />

            </span>


            // - Application name and workspace label
            <div>

              // - Application name
              <p className="text-sm font-bold leading-tight text-slate-900">
                CodAcademy
              </p>

              // - Current workspace name
              <p className="text-xs leading-tight text-slate-500">
                Admin workspace
              </p>

            </div>

          </div>


          // - Close button for mobile sidebar
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1 text-slate-500 hover:bg-purple-100 lg:hidden"
          >

            // - X icon represents close
            <X className="h-5 w-5" />

          </button>

        </div>


        // - Navigation section
        <nav
          className="flex-1 space-y-1 overflow-y-auto scrollbar-thin"
          aria-label="Admin sections"
        >

          // - Loop through all navigation items
          // - adminNav contains the sidebar menu data
          {adminNav.map((item) => (

            // - Create one NavItem for every item in adminNav
            <NavItem
              key={item.to}
              item={item}

              // - Close sidebar after navigating
              onNavigate={onClose}
            />

          ))}

        </nav>


        // - Information message at the bottom of the sidebar
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">

          // - Message explaining the admin workspace
          Signed in as the platform administrator. Approvals you make here affect what experts and
          students see immediately.

        </div>

      </aside>
    </>
  )
}