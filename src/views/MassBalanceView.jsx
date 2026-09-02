import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function MassBalanceView({ lots = [] }) {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-xl font-black text-[#1E1512]">Conciliación de Masa (Mass Balance Module)</h1>
        <p className="text-xs text-gray-500">Verifica el rendimiento del grano húmedo en baba vs salida seca para detectar desvíos o anomalías en planta.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Verificación de Rendimiento por Lote (Tolerancia 48% – 52%)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold">
                <th className="p-3">Código Lote</th>
                <th className="p-3">Ingreso Grano Húmedo (kg)</th>
                <th className="p-3">Salida Grano Seco (kg)</th>
                <th className="p-3">Rendimiento Real %</th>
                <th className="p-3">Estado Conciliación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {lots.map((lot) => (
                <tr key={lot.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-[#1E1512]">{lot.id}</td>
                  <td className="p-3">{lot.massBalance?.wetInputKg} kg</td>
                  <td className="p-3 font-bold">{lot.massBalance?.dryOutputKg} kg</td>
                  <td className="p-3 text-emerald-700 font-bold">{lot.massBalance?.yieldPct}%</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                      {lot.massBalance?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
