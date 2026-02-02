import { Eye } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import Badge from '../../../../components/ui/Badge'

const orders = [
  {
    id: '#ORD-7842',
    customer: 'John Doe',
    date: '12 Mei 2023',
    amount: 'Rp 1.250.000',
    status: 'success',
    statusText: 'Selesai',
  },
  {
    id: '#ORD-7841',
    customer: 'Jane Smith',
    date: '11 Mei 2023',
    amount: 'Rp 850.000',
    status: 'warning',
    statusText: 'Diproses',
  },
  {
    id: '#ORD-7840',
    customer: 'Robert Johnson',
    date: '10 Mei 2023',
    amount: 'Rp 2.150.000',
    status: 'info',
    statusText: 'Dikirim',
  },
  {
    id: '#ORD-7839',
    customer: 'Sarah Williams',
    date: '9 Mei 2023',
    amount: 'Rp 950.000',
    status: 'danger',
    statusText: 'Dibatalkan',
  },
]

export default function OrderTable() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Pesanan Terbaru</h2>
        <a href="#" className="text-blue-500 font-medium hover:text-blue-700">
          Lihat semua →
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">ID Pesanan</th>
              <th className="px-4 py-3">Pelanggan</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Jumlah</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.amount}</td>
                <td className="px-4 py-3">
                  <Badge variant={order.status}>{order.statusText}</Badge>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}