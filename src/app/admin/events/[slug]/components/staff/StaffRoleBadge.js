'use client'

import { Shield, UserCog, User } from 'lucide-react'

const roleConfig = {
  SUPER_ADMIN: {
    label: 'Super Admin',
    icon: Shield,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  },
  ADMIN: {
    label: 'Admin',
    icon: UserCog,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  STAFF: {
    label: 'Staff',
    icon: User,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200'
  }
}

export default function StaffRoleBadge({ role }) {
  const config = roleConfig[role] || roleConfig.STAFF
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  )
}