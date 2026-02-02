export default function Card({ children, className = '', hover = true }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 ${hover ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  )
}