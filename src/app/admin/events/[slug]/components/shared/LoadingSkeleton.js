'use client'

import { Heart } from 'lucide-react'

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              <div>
                <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="w-24 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="relative h-[300px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-200"></div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse mr-4"></div>
                  <div>
                    <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse mr-3"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Button Skeleton */}
      <div className="fixed bottom-6 right-6 w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  )
}