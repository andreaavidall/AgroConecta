import React, { useState } from 'react';
import { FileSpreadsheet, Upload, CheckCircle2, AlertTriangle, Download, X, FileText } from 'lucide-react';

export default function ExcelImportModal({ isOpen, onClose, onImportData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importedRows, setImportedRows] = useState(null);

  if (!isOpen) return null;

  const handleSimulateFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsProcessing(true);

      // Simulación de lectura de Excel en cliente
      setTimeout(() => {
        setIsProcessing(false);
        setImportedRows([
          { producer: "Familia Saavedra", parcelId: "PAR-109-BAGUA", areaHa: 4.2, variety: "CCN-51", coords: "-5.9421, -77.9734", eudrValid: true },
          { producer: "Familia Huamán", parcelId: "PAR-210-ECHARATI", areaHa: 3.5, variety: "Chuncho", coords: "-12.7510, -72.6120", eudrValid: true },
          { producer: "Familia Pizango", parcelId: "PAR-305-SATIPO", areaHa: 5.0, variety: "VRAEM Fino", coords: "-11.2522, -74.6386", eudrValid: true }
        ]);
      }, 800);
    }
  };

  const handleConfirmImport = () => {
    if (onImportData && importedRows) {
      onImportData(importedRows);
    }
    alert(`✅ ¡Importación exitosa! Se han registrado ${importedRows?.length || 0} nuevos productores y parcelas.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#174C3C] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800 rounded-xl border border-emerald-600/40">
              <FileSpreadsheet className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Importador Masivo Excel / CSV</h2>
              <p className="text-xs text-emerald-200">Carga productores, parcelas e inventario inicial sin escribir uno a uno</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 bg-[#F6F8F5]">
          
          {/* Template Download Option */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <h4 className="font-bold text-slate-800">¿No tienes la plantilla oficial?</h4>
              <p className="text-slate-500">Descarga el formato Excel (.xlsx) validado con columnas obligatorias para EUDR.</p>
            </div>
            <button
              onClick={() => alert("📥 Descargando 'Plantilla_AgroConecta_Productores_2026.xlsx'...")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 border border-slate-300 transition"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Descargar Plantilla</span>
            </button>
          </div>

          {/* Drag & Drop Box */}
          {!importedRows ? (
            <label className="border-2 border-dashed border-emerald-900/20 hover:border-[#237A57] bg-white p-8 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition space-y-2 group">
              <Upload className="w-10 h-10 text-slate-400 group-hover:text-[#237A57] transition-colors" />
              <span className="font-bold text-sm text-slate-700">Haz clic para seleccionar o arrastra tu archivo Excel aquí</span>
              <span className="text-xs text-slate-400">Formatos soportados: .XLSX, .XLS, .CSV (Máx 10 MB)</span>
              <input type="file" accept=".xlsx, .xls, .csv" onChange={handleSimulateFileSelect} className="hidden" />
            </label>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#237A57]" />
                  Vista previa de datos analizados ({importedRows.length} filas válidas)
                </span>
                <button onClick={() => setImportedRows(null)} className="text-red-600 hover:underline">Cambiar archivo</button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-xs max-h-48 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 sticky top-0">
                    <tr>
                      <th className="p-2.5">Productor</th>
                      <th className="p-2.5">ID Parcela</th>
                      <th className="p-2.5">Variedad</th>
                      <th className="p-2.5">Área (ha)</th>
                      <th className="p-2.5">EUDR GPS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {importedRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-800">{row.producer}</td>
                        <td className="p-2.5 font-mono text-slate-600">{row.parcelId}</td>
                        <td className="p-2.5">{row.variety}</td>
                        <td className="p-2.5">{row.areaHa} ha</td>
                        <td className="p-2.5 text-emerald-700 font-bold">✓ Geolocalizado</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-4 text-xs font-bold text-emerald-800 animate-pulse">
              Analizando archivo y validando coordenadas EUDR...
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Cancelar</button>
          <button
            onClick={handleConfirmImport}
            disabled={!importedRows}
            className="px-6 py-2 bg-[#237A57] text-white text-xs font-bold rounded-lg hover:bg-[#174C3C] disabled:opacity-40 transition shadow-sm"
          >
            Confirmar e Importar
          </button>
        </div>

      </div>
    </div>
  );
}
