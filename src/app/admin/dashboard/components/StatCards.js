import { Users, ShoppingCart, Wallet, Star } from 'lucide-react'
import Card from '../../../../components/ui/Card'

const statCards = [
  {
    title: 'Total Pengguna',
    value: '2,847',
    change: '+12.5%',
    changeType: 'increase',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Total Pesanan',
    value: '1,239',
    change: '+8.2%',
    changeType: 'increase',
    icon: ShoppingCart,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Pendapatan',
    value: 'Rp 48.2Jt',
    change: '-3.1%',
    changeType: 'decrease',
    icon: Wallet,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Rating',
    value: '4.8',
    change: '+0.3',
    changeType: 'increase',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
]

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} hover={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              <p className={`text-xs mt-2 ${
                stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.changeType === 'increase' ? '↑' : '↓'} {stat.change} dari bulan lalu
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}