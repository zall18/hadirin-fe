'use client'

import { useState } from 'react'
import { X, Upload, Download, FileSpreadsheet, AlertCircle } from 'lucide-react'
import { guestApi } from '../../../api/guest'
import Papa from 'papaparse'

export default function GuestImportModal({ isOpen, onClose, onImport, eventId }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([]);
  const [importResult, setImportResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  if (!isOpen) return null

  /**
   * Validasi data tamu per baris
   */
  const validateGuestData = (data, rowIndex) => {
    const errors = [];
    
    // Required fields
    if (!data.name || data.name.trim() === '') {
      errors.push(`Baris ${rowIndex + 2}: Nama wajib diisi`);
    }
    
    if (!data.phone || data.phone.trim() === '') {
      errors.push(`Baris ${rowIndex + 2}: Nomor telepon wajib diisi`);
    }
    
    // Validate phone format (hanya angka)
    if (data.phone && !/^\d+$/.test(data.phone.replace(/\D/g, ''))) {
      errors.push(`Baris ${rowIndex + 2}: Nomor telepon harus berupa angka`);
    }
    
    // Validate invitedCount (harus angka positif)
    if (data.invitedCount && (isNaN(data.invitedCount) || parseInt(data.invitedCount) < 1)) {
      errors.push(`Baris ${rowIndex + 2}: Jumlah undangan harus angka minimal 1`);
    }
    
    // Validate plusOneAllowed (harus angka)
    if (data.plusOneAllowed && isNaN(data.plusOneAllowed)) {
      errors.push(`Baris ${rowIndex + 2}: Plus one harus berupa angka`);
    }
    
    // Validate email format if provided
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push(`Baris ${rowIndex + 2}: Format email tidak valid`);
    }
    
    return errors;
  };

  /**
   * HANDLE FILE CHANGE
   * Membaca file CSV dan menampilkan preview
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Reset states
    setFile(selectedFile);
    setPreview([]);
    setErrors([]);
    setValidationErrors([]);
    setImportResult(null);

    // Validasi file
    if (!selectedFile) {
      return;
    }

    // Validasi tipe file
    const validTypes = ['text/csv', 'application/vnd.ms-excel'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(selectedFile.type) && fileExtension !== 'csv') {
      setErrors(['File harus berformat CSV']);
      setFile(null);
      return;
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setErrors(['Ukuran file maksimal 5MB']);
      setFile(null);
      return;
    }

    setLoading(true);

    // Baca file CSV dengan Papaparse
    Papa.parse(selectedFile, {
      header: true, // Baris pertama sebagai header
      skipEmptyLines: true,
      complete: (results) => {
        const { data, errors: parseErrors } = results;
        
        // Handle parsing errors
        if (parseErrors.length > 0) {
          setErrors(parseErrors.map(err => `Baris ${err.row + 2}: ${err.message}`));
          setLoading(false);
          return;
        }

        // Validasi header
        const requiredHeaders = ['name', 'phone'];
        const optionalHeaders = ['email', 'category', 'groupName', 'invitedCount', 'plusOneAllowed'];
        const headers = Object.keys(data[0] || {});
        
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        if (missingHeaders.length > 0) {
          setErrors([`Header wajib tidak ditemukan: ${missingHeaders.join(', ')}`]);
          setLoading(false);
          return;
        }

        // Validasi setiap baris data
        const validData = [];
        const validationErrors = [];

        data.forEach((row, index) => {
          // Skip baris kosong
          if (Object.values(row).every(val => !val)) {
            return;
          }

          const rowErrors = validateGuestData(row, index);
          
          if (rowErrors.length > 0) {
            validationErrors.push(...rowErrors);
          } else {
            // Format data untuk preview
            validData.push({
              name: row.name?.trim() || '',
              phone: row.phone?.trim() || '',
              email: row.email?.trim() || '',
              category: row.category?.toUpperCase().trim() || 'REGULAR',
              groupName: row.groupName?.trim() || '',
              invitedCount: parseInt(row.invitedCount) || 1,
              plusOneAllowed: parseInt(row.plusOneAllowed) || 0,
              // Preview hanya 5 baris pertama
              _preview: index < 5
            });
          }
        });

        setValidationErrors(validationErrors);
        
        // Tampilkan preview (maksimal 5 baris)
        const previewData = validData.filter((_, idx) => idx < 5);
        setPreview(previewData);
        
        // Simpan semua data valid untuk diimport
        setFile(selectedFile);
        
        setLoading(false);
      },
      error: (error) => {
        console.error('Parse error:', error);
        setErrors(['Gagal membaca file CSV']);
        setLoading(false);
      }
    });
  };

  /**
   * HANDLE IMPORT
   * Mengirim data ke backend
   */
  const handleImport = async () => {
    if (!file) return;
    
    setLoading(true);
    setErrors([]);
    
    try {
      const formData = new FormData();
      formData.append('eventId', eventId);
      formData.append('file', file);
      
      const response = await guestApi.importGuestsFromCSV(eventId, file);
      
      if (response.status === 200) {
        setImportResult({
          success: true,
          message: response.message,
          data: response.data
        });
        
        // Panggil callback onSuccess setelah 2 detik
        setTimeout(() => {
          onImport?.();
          onClose?.();
        }, 2000);
      } else {
        setImportResult({
          success: false,
          message: response.message,
          errors: response.errors
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      setErrors(['Gagal mengimport data. Silakan coba lagi.']);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateDownload = async() => {
    const response = await guestApi.downloadCSVTemplate();
    if(response.status == 200) {
      alert("Download starting soon...");
    }
  }



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Import Tamu</h3>
            <p className="text-sm text-gray-500">Upload file CSV daftar tamu</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Template Download */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start">
              <FileSpreadsheet className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-blue-800">Belum punya template?</p>
                <p className="text-sm text-blue-600 mb-3">
                  Download template Excel untuk memudahkan import data
                </p>
                <button 
                onClick={handleTemplateDownload}
                className="inline-flex items-center px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template CSV
                </button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-500 transition-colors">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="font-medium text-gray-700">
                  {file ? file.name : 'Klik untuk upload file'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Format: XLSX, XLS, CSV (Maks 5MB)
                </p>
              </label>
            </div>
          </div>

          {/* Preview Data */}
          {preview.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">Preview Data</h4>
                <span className="text-xs text-gray-500">{preview.length} data</span>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs text-gray-600">Nama</th>
                      <th className="px-4 py-2 text-left text-xs text-gray-600">No. WA</th>
                      <th className="px-4 py-2 text-left text-xs text-gray-600">Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-0">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.phone}</td>
                        <td className="px-4 py-2">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Informasi Import</p>
                <ul className="text-sm text-amber-700 mt-1 space-y-1">
                  <li>• Pastikan nomor WhatsApp dalam format internasional (62xxx)</li>
                  <li>• Data yang sama akan otomatis diupdate</li>
                  <li>• Maksimal 1000 data per import</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className={`
              px-6 py-3 font-medium rounded-xl shadow-md transition-all
              ${!file || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg'
              }
            `}
          >
            {loading ? 'Mengimport...' : 'Import Data'}
          </button>
        </div>
      </div>
    </div>
  )
}