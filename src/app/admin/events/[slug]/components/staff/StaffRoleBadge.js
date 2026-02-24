'use client'

import { Shield, UserCog, User } from 'lucide-react'
import { UserRole, ROLE_LABELS } from '../../../../../../lib/constants'

const roleConfig = {
  [UserRole.SUPER_ADMIN]: {
    label: ROLE_LABELS[UserRole.SUPER_ADMIN],
    icon: Shield,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  },
  [UserRole.ADMIN]: {
    label: ROLE_LABELS[UserRole.ADMIN],
    icon: UserCog,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  [UserRole.STAFF]: {
    label: ROLE_LABELS[UserRole.STAFF],
    icon: User,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200'
  }
}

export default function StaffRoleBadge({ role }) {
  const config = roleConfig[role] || roleConfig[UserRole.STAFF]
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  )
}