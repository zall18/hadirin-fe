'use client'

import { useState, useMemo } from 'react'
import { X, Download, Copy, CheckCircle, Printer, Smartphone } from 'lucide-react'
import QRCode from 'react-qr-code'

export default function GuestQRModal({ isOpen, onClose, guest }) {
  const [copied, setCopied] = useState(false)
  const [qrSize, setQrSize] = useState(256)

  // Gunakan useMemo untuk generate nilai QR yang stabil
  const qrValue = useMemo(() => {
    if (!guest) return ''
    
    // Gunakan guest.qrCode jika sudah ada
    if (guest.qrCode) {
      return guest.qrCode
    }
    
    // Generate QR value dengan format yang diminta
    const shortCode = guest.shortId || guest.event?.shortCode || 'G29W14'
    const guestId = guest.id || guest.shortId || 'unknown'
    
    // Gunakan timestamp dari guest.createdAt jika ada, atau gunakan ID sebagai fallback
    const timestamp = guest.createdAt 
      ? new Date(guest.createdAt).getTime() 
      : guestId
    
    // Gunakan kombinasi ID + shortCode untuk membuat unique identifier
    const uniqueId = `${guestId}-${shortCode}`.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6)
    
    return `WED-${shortCode}-${timestamp}-${uniqueId}`
  }, [guest]) // Hanya re-run ketika guest berubah

  if (!isOpen || !guest || !qrValue) return null

  const handleDownload = (format = 'png') => {
    // Get SVG element
    const svg = document.getElementById('guest-qr-code')
    if (!svg) return

    // Create canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()

    img.onload = () => {
      canvas.width = qrSize
      canvas.height = qrSize
      ctx.drawImage(img, 0, 0, qrSize, qrSize)
      
      // Download as PNG
      const link = document.createElement('a')
      link.download = `qrcode-${guest.name}-${guest.shortId || guest.id}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    const html = `
      <html>
        <head>
          <title>QR Code - ${guest.name}</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .container {
              text-align: center;
              max-width: 400px;
            }
            .qr-container {
              padding: 20px;
              background: white;
              border-radius: 16px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              margin-bottom: 20px;
            }
            .guest-name {
              font-size: 20px;
              font-weight: bold;
              margin: 16px 0 8px;
            }
            .guest-detail {
              color: #666;
              margin: 4px 0;
            }
            .qr-value {
              font-size: 12px;
              color: #888;
              word-break: break-all;
              margin-top: 16px;
              padding: 8px;
              background: #f5f5f5;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="qr-container">
              ${document.getElementById('guest-qr-code')?.outerHTML || ''}
            </div>
            <div class="guest-name">${guest.name}</div>
            <div class="guest-detail">${guest.phone || ''}</div>
            <div class="guest-detail">${guest.category || ''} ${guest.groupName ? `- ${guest.groupName}` : ''}</div>
            <div class="qr-value">${qrValue}</div>
          </div>
          <script>
            window.onload = () => window.print()
          </script>
        </body>
      </html>
    `
    printWindow.document.write(html)
    printWindow.document.close()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">QR Code Tamu</h3>
            <p className="text-sm text-gray-500">{guest.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code Display */}
          <div className="flex flex-col items-center">
            <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-2 border-pink-200 shadow-lg">
              <div className="bg-white p-4 rounded-xl">
                <QRCode
                  id="guest-qr-code"
                  value={qrValue}
                  size={qrSize}
                  level="H"
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '256px'
                  }}
                />
              </div>
            </div>

            {/* Size Control */}
            <div className="w-full mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ukuran QR Code
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Kecil</span>
                <span>{qrSize}px</span>
                <span>Besar</span>
              </div>
            </div>
          </div>

          {/* Guest Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Nama</span>
              <span className="text-sm font-medium text-gray-800">{guest.name}</span>
            </div>
            {guest.phone && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">No. WhatsApp</span>
                <span className="text-sm text-gray-800">{guest.phone}</span>
              </div>
            )}
            {guest.category && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Kategori</span>
                <span className="text-sm text-gray-800">{guest.category}</span>
              </div>
            )}
            {guest.groupName && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Grup</span>
                <span className="text-sm text-gray-800">{guest.groupName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`text-sm font-medium ${
                guest.status === 'ATTENDED' ? 'text-green-600' :
                guest.status === 'CONFIRMED' ? 'text-blue-600' :
                'text-gray-600'
              }`}>
                {guest.status}
              </span>
            </div>
          </div>

          {/* QR Value */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2">Nilai QR Code (scan):</p>
            <div className="flex items-center">
              <code className="flex-1 text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                {qrValue}
              </code>
              <button
                onClick={handleCopy}
                className="ml-2 p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Salin nilai QR"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDownload('png')}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4 mr-2" />
              Cetak
            </button>
          </div>

          {/* Info for Scanning */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start">
              <Smartphone className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Scan dengan Kamera</p>
                <p className="text-sm text-blue-700 mt-1">
                  Tamu dapat menunjukkan QR Code ini saat check-in.<br/>
                  Staff akan memindai untuk verifikasi kehadiran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}