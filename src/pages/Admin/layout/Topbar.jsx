import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  LogOut,
  ChevronDown
} from 'lucide-react'

import { useState } from 'react'


// - Main Topbar component
// - Receives title, subtitle, menu function, theme and theme toggle function as props
export default function Topbar({
  title,
  subtitle,
  onMenuClick,
  theme,
  onToggleTheme
}) {

  // - Controls whether the Admin dropdown menu is open
  // - false = closed
  // - true = open
  const [menuOpen, setMenuOpen] = useState(false)

  return (

    // - Main top navigation bar
    // - sticky keeps the topbar visible while scrolling
    // - z-20 keeps it above normal page content
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 dark:border-white/10 dark:bg-surface-dark-subtle/90">


      // - Mobile menu button
      // - lg:hidden means this button is hidden on large screens
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-white/5"
      >

        // - Menu icon
        <Menu className="h-5 w-5" />

      </button>


      // - Page title and subtitle container
      // - flex-1 allows this section to take available space
      <div className="min-w-0 flex-1">

        // - Displays the current page title
        <h1 className="truncate text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h1>


        // - Display subtitle only when subtitle exists
        // - hidden on very small screens
        {subtitle && (
          <p className="hidden truncate text-xs text-slate-500 sm:block dark:text-slate-400">
            {subtitle}
          </p>
        )}

      </div>


      // - Search section
      // - hidden on small screens
      // - md:flex shows it from medium screens
      <label className="relative hidden w-64 items-center md:flex">

        // - Search icon
        // - absolute positions the icon inside the input
        <Search
          className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400"
          aria-hidden="true"
        />

        // - Screen-reader text for accessibility
        <span className="sr-only">
          Search
        </span>


        // - Search input
        <input
          type="search"
          placeholder="Search users, courses, payments..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:focus:bg-surface-dark"
        />

      </label>


      // - Theme toggle button
      <button
        onClick={onToggleTheme}

        // - Changes the accessibility label depending on current theme
        aria-label={
          theme === 'dark'
            ? 'Switch to light mode'
            : 'Switch to dark mode'
        }

        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
      >

        // - Show Sun icon when dark mode is active
        // - Show Moon icon when light mode is active
        {theme === 'dark'
          ? <Sun className="h-5 w-5" />
          : <Moon className="h-5 w-5" />
        }

      </button>


      // - Notification button
      <button
        aria-label="Notifications"
        className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
      >

        // - Notification bell icon
        <Bell className="h-5 w-5" />


        // - Small red notification indicator
        <span
          className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500"
          aria-hidden="true"
        />

      </button>


      // - Admin profile/dropdown container
      // - relative allows the dropdown to be positioned relative to this div
      <div className="relative">


        // - Admin profile button
        // - Clicking it opens or closes the dropdown
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2 hover:bg-slate-100 dark:hover:bg-white/5"
        >

          // - Admin avatar
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
            A
          </span>


          // - Admin name
          // - Hidden on very small screens
          <span className="hidden text-sm font-medium text-slate-700 sm:block dark:text-slate-200">
            Admin
          </span>


          // - Down arrow showing that a dropdown exists
          <ChevronDown
            className="hidden h-4 w-4 text-slate-400 sm:block"
            aria-hidden="true"
          />

        </button>


        // - Display dropdown only when menuOpen is true
        {menuOpen && (

          // - Admin dropdown menu
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-card dark:border-white/10 dark:bg-surface-dark-subtle"
          >

            // - Logout menu item
            <button
              role="menuitem"
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >

              // - Logout icon
              <LogOut className="h-4 w-4" />

              // - Logout text
              Log out

            </button>

          </div>

        )}

      </div>

    </header>
  )
}