'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i)
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i)
        }
      }
    }
    
    return pages.map(pageNum => (
      <button
        key={pageNum}
        onClick={() => onPageChange(pageNum)}
        className={`
          w-10 h-10 rounded-lg transition-all duration-200
          ${currentPage === pageNum 
            ? 'bg-blue-500 text-white shadow-sm' 
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        {pageNum}
      </button>
    ))
  }

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-500">
        Halaman {currentPage} dari {totalPages}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }
          `}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }
          `}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}