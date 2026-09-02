import React from 'react';
import { History, CheckCircle2, XCircle, TrendingUp, Calendar } from 'lucide-react';

export default function CampaignHistoryView() {
  const campaigns = [
    { year: "2022", proyectado: "24.0 t", entregado: "24.2 t", status: "CUMPLIDO", note: "Entrega total sin demoras en puerto Callao." },
    { year: "2023", proyectado: "26.0 t", entregado: "26.5 t", status: "CUMPLIDO", note: "Superó proyección por buen régimen de lluvias." },
    { year: "2024", proyectado: "25.0 t", entregado: "25.0 t", status: "CUMPLIDO", note: "100% de cumplimiento en especificaciones de humedad." },
    { year: "2025", proyectado: "28.0 t", entregado: "22.5 t", status: "INCUMPLIDO", note: "Desviación -5.5t debido a sequía severa en cuenca VRAEM/Huallaga." },
    { year: "2026", proyectado: "27.0 t", entregado: "17.1 t (En curso)", status: "EN_CURSO", note: "Campaña actual al 82% de avance. Restan 21 días al embarque." }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-xl font-black text-[#1E1512]">Historial de Campañas de Cacao (2022 – 2026)</h1>
        <p className="text-xs text-gray-500">Record de entregas a tiempo, desviaciones históricas y causas raíz documentadas.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((c, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl font-black text-base flex items-center justify-center ${
                c.status === 'CUMPLIDO' ? 'bg-emerald-100 text-emerald-800' : c.status === 'INCUMPLIDO' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
              }`}>
                {c.year}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    c.status === 'CUMPLIDO' ? 'bg-emerald-600 text-white' : c.status === 'INCUMPLIDO' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{c.note}</p>
              </div>
            </div>

            <div className="flex space-x-6 text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
              <div>
                <span className="text-gray-400 block text-[10px]">Proyectado</span>
                <span className="font-bold text-gray-800">{c.proyectado}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Entregado</span>
                <span className="font-bold text-emerald-700">{c.entregado}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
