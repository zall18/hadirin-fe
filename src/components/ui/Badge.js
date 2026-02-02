export default function Badge({ children, variant = 'info', className = '' }) {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    danger: 'bg-red-100 text-red-800',
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}