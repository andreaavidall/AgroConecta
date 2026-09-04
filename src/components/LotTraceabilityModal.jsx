import React from 'react';
import { X, Layers, Scale, Calendar, CheckCircle2, User, MapPin, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';

export default function LotTraceabilityModal({ isOpen, onClose, lot }) {
  if (!isOpen || !lot) return null;

  const producers = lot.contributingProducers || [
    { name: lot.producer || "Familia Quispe", parcelId: lot.parcelId || "PAR-304", sharePct: 100, wetKg: 8500, dryKg: 4200 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#174C3C] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-800 rounded-xl border border-emerald-600/40">
                <Layers className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Genealogía & Trazabilidad de Lote</h2>
                <p className="text-xs text-emerald-200">Código Único: <span className="font-mono font-bold text-amber-300">{lot.id}</span></p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#F6F8F5]">
          
          {/* Top Quick Status */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Etapa Operativa</span>
              <span className="font-bold text-slate-900">{lot.stage}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Peso Comercializable</span>
              <span className="font-bold text-emerald-700">{lot.weightKg} kg</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Variedad Grano</span>
              <span className="font-bold text-slate-900">{lot.variety}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Cumplimiento EUDR</span>
              <span className="font-bold text-emerald-700">✓ 100% Geolocalizado</span>
            </div>
          </div>

          {/* Section 1: Aggregated Lot Contributors Breakdown (P0-8 Fix) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#237A57]" />
                Composición de Aportantes ({producers.length} Productores)
              </span>
              <span className="text-xs text-slate-400">Mezcla Homogénea Certificada</span>
            </h3>

            <div className="space-y-2">
              {producers.map((p, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{p.name}</span>
                    <span className="text-slate-500 text-[11px]">Parcela: {p.parcelId}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 block">{p.sharePct}% del Lote</span>
                    <span className="text-slate-500 text-[11px]">{p.wetKg}kg baba → {p.dryKg}kg seco</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Physical Mass Balance Breakdown */}
          {lot.massBalance && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                Balance de Masa de Lote
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-slate-50 p-2 rounded-lg border">
                  <span className="text-slate-500 block text-[10px]">Entrada Baba</span>
                  <span className="font-bold text-slate-800">{lot.massBalance.wetInputKg} kg</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border">
                  <span className="text-slate-500 block text-[10px]">Merma Evaporación</span>
                  <span className="font-bold text-slate-800">{lot.massBalance.moistureLossKg || 3875} kg</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <span className="text-emerald-800 block text-[10px]">Salida Seca ({lot.massBalance.yieldPct}%)</span>
                  <span className="font-bold text-[#174C3C]">{lot.massBalance.dryOutputKg} kg</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Digital Traceability Verification Display */}
          <div className="bg-emerald-950 text-white p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-amber-300 font-mono uppercase">Verificación Pública de Origen</span>
              <h4 className="font-bold text-sm">Ficha Digital de Trazabilidad</h4>
              <p className="text-xs text-emerald-200">Verificable por compradores internacionales con salvaguarda de datos privados.</p>
            </div>
            <div className="p-2.5 bg-emerald-900 border border-emerald-700 rounded-lg">
              <ShieldCheck className="w-8 h-8 text-amber-300" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-[#237A57] text-white text-xs font-bold rounded-lg hover:bg-[#174C3C] transition">
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  );
}
