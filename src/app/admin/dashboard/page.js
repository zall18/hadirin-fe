import StatCards from './components/StatCards'
import Chart from './components/Chart'
import ActivityList from './components/ActivityList'
import OrderTable from './components/OrderTable'

export default function DashboardPage() {
  return (
    <>
      {/* Judul Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-500">Selamat datang kembali! Berikut ringkasan aktivitas terbaru.</p>
      </div>

      {/* Statistik Cards */}
      <StatCards />

      {/* Grafik dan Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart />
        <ActivityList />
      </div>

      {/* Tabel Pesanan */}
      <OrderTable />
    </>
  )
}