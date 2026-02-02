import { UserPlus, ShoppingCart, Package, MessageSquare } from 'lucide-react'
import Card from '../../../../components/ui/Card'

const activities = [
  {
    icon: UserPlus,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100',
    title: 'Pengguna baru mendaftar',
    description: 'John Doe baru saja mendaftar ke platform',
    time: '10 menit yang lalu',
  },
  {
    icon: ShoppingCart,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-100',
    title: 'Pesanan baru diterima',
    description: 'Pesanan #ORD-7842 telah dibuat',
    time: '1 jam yang lalu',
  },
  {
    icon: Package,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-100',
    title: 'Produk baru ditambahkan',
    description: 'Produk "Kursi Ergonomis" telah ditambahkan',
    time: '3 jam yang lalu',
  },
  {
    icon: MessageSquare,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    title: 'Ulasan baru',
    description: 'Jane Smith memberikan ulasan 5 bintang',
    time: '5 jam yang lalu',
  },
]

export default function ActivityList() {
  return (
    <Card>
      <h2 className="text-lg font-bold text-gray-800 mb-6">Aktivitas Terbaru</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${activity.bgColor} flex items-center justify-center mr-3`}>
              <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
            </div>
            <div>
              <p className="font-medium text-gray-800">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <a href="#" className="block text-center mt-6 text-blue-500 font-medium hover:text-blue-700">
        Lihat semua aktivitas →
      </a>
    </Card>
  )
}