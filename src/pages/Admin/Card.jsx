export default function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={[
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-white/10 dark:bg-surface-dark-subtle',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  )
}
