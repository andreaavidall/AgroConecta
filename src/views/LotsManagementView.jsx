import React, { useState } from 'react';
import { Layers, CheckCircle2, AlertTriangle, QrCode, Search, Filter, Plus } from 'lucide-react';

export default function LotsManagementView({ lots = [], onOpenLotTraceability, onOpenTelegram }) {
  const [filterStage, setFilterStage] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLots = lots.filter(l => {
    if (filterStage !== 'ALL' && l.stage !== filterStage) return false;
    if (searchTerm && !l.id.toLowerCase().includes(searchTerm.toLowerCase()) && !l.producer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#1E1512]">Gestión de Lotes & Control de Procesos</h1>
          <p className="text-xs text-gray-500">Monitoreo en tiempo real de lotes en acopio, fermentación, secado y almacenamiento.</p>
        </div>

        <button
          onClick={onOpenTelegram}
          className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md self-start sm:self-auto"
        >
          + Registrar Nuevo Lote (Telegram)
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-[#EFECE6] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {['ALL', 'Acopio', 'Fermentación', 'Secado', 'Almacenamiento'].map((stg) => (
            <button
              key={stg}
              onClick={() => setFilterStage(stg)}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                filterStage === stg ? 'bg-[#1E1512] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stg === 'ALL' ? 'Todos los Lotes' : stg}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por lote o socio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#D96B27]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold">
              <th className="p-3.5">Código Lote</th>
              <th className="p-3.5">Etapa Actual</th>
              <th className="p-3.5">Responsable</th>
              <th className="p-3.5">Productor / Socio</th>
              <th className="p-3.5">Peso (kg)</th>
              <th className="p-3.5">Ubicación / GPS</th>
              <th className="p-3.5">Humedad %</th>
              <th className="p-3.5">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
            {filteredLots.map((lot) => (
              <tr key={lot.id} className="hover:bg-gray-50">
                <td className="p-3.5 font-mono font-bold text-[#1E1512]">{lot.id}</td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    lot.stage === 'Fermentación' && lot.fermentationHours > 108 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {lot.stage} ({lot.stageStatus})
                  </span>
                </td>
                <td className="p-3.5 text-gray-600">{lot.manager}</td>
                <td className="p-3.5 font-semibold text-gray-900">{lot.producer}</td>
                <td className="p-3.5 font-bold">{lot.weightKg.toLocaleString()} kg</td>
                <td className="p-3.5 text-emerald-700 font-semibold">{lot.location}</td>
                <td className="p-3.5 font-bold text-emerald-700">{lot.moisturePct}%</td>
                <td className="p-3.5">
                  <button
                    onClick={() => onOpenLotTraceability(lot)}
                    className="bg-[#1E1512] hover:bg-[#3D2D27] text-white px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
                  >
                    Trazabilidad & QR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
