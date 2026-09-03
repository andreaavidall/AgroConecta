import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, ArrowRight, Info, Layers, RefreshCw } from 'lucide-react';

export default function MassBalanceView({ lots }) {
  // Cálculo de Balance de Masa Global
  const totalWetInput = lots.reduce((acc, lot) => acc + (lot.massBalance?.wetInputKg || 0), 0);
  const totalDryOutput = lots.reduce((acc, lot) => acc + (lot.massBalance?.dryOutputKg || 0), 0);
  const avgYieldPct = totalWetInput > 0 ? ((totalDryOutput / totalWetInput) * 100).toFixed(1) : 49.4;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Control Físico & Lixiviación</span>
          </div>
          <h1 className="text-2xl font-black">Balance de Masa por Etapas Operativas</h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Aplica el principio determinístico: <span className="font-bold text-amber-300">Entrada = Salida + Merma (Lixiviación/Evaporación) + Saldo en Proceso</span>.
          </p>
        </div>

        <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 text-right">
          <span className="text-emerald-300 text-xs block">Rendimiento Promedio Baba → Seco</span>
          <span className="text-2xl font-black text-amber-300">{avgYieldPct}%</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">Norma técnica: 45% - 52%</span>
        </div>
      </div>

      {/* Equations Explanation Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#237A57]" />
          Fórmulas de Conversión de Estado Físico (Sección 10)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block">Peso Neto</span>
            <code className="text-[11px] text-[#237A57] font-mono">peso_neto = peso_bruto - tara</code>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block">Rendimiento Seco</span>
            <code className="text-[11px] text-[#237A57] font-mono">rendimiento = kg_secos / kg_baba</code>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block">Merma Evaporación</span>
            <code className="text-[11px] text-[#237A57] font-mono">merma = kg_entrada - kg_salida</code>
          </div>
        </div>
      </div>

      {/* Lot-by-Lot Mass Balance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 text-sm flex items-center justify-between">
          <span>Trazabilidad de Masa de Lotes Activos ({lots.length} Lotes)</span>
          <span className="text-xs text-slate-500 font-normal">Tolerancia configurable: ±3% desviación</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Código Lote</th>
                <th className="p-3">Estado Físico</th>
                <th className="p-3">Entrada Baba (kg)</th>
                <th className="p-3">Merma Est. (kg)</th>
                <th className="p-3">Salida Seca (kg)</th>
                <th className="p-3">Rendimiento</th>
                <th className="p-3">Estado Conciliación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lots.map((lot) => {
                const mb = lot.massBalance || {};
                const isConciliated = mb.toleranceStatus === "CONCILIADO_OK";

                return (
                  <tr key={lot.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-slate-900">{lot.id}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lot.physicalState === 'SECO_COMERCIALIZABLE'
                          ? 'bg-emerald-100 text-emerald-900'
                          : lot.physicalState === 'FERMENTANDO_HUMEDO'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-sky-100 text-sky-900'
                      }`}>
                        {lot.physicalState || lot.stage}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-800">{(mb.wetInputKg || 0).toLocaleString()} kg</td>
                    <td className="p-3 text-slate-500">{(mb.moistureLossKg || 0).toLocaleString()} kg</td>
                    <td className="p-3 font-bold text-emerald-700">{(mb.dryOutputKg || lot.weightKg || 0).toLocaleString()} kg</td>
                    <td className="p-3 font-bold text-slate-800">{mb.yieldPct || 49.4}%</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {isConciliated ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Conciliado
                          </span>
                        ) : (
                          <span className="text-amber-700 font-bold flex items-center gap-1">
                            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                            En proceso
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
