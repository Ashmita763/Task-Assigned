export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold text-brand-600 dark:text-brand-300">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
