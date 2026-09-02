import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  X, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function JointCoverageModal({ 
  isOpen, 
  onClose, 
  primaryCooperative, 
  requestedVolumeTons = 50, 
  allCooperatives = [],
  onConfirmJointOffer,
  onOpenCombinedReport
}) {
  if (!isOpen || !primaryCooperative) return null;

  // Calculate compatible co-ops to aggregate up to requested volume
  const maxPrimaryCap = primaryCooperative.maxCapacity || 25;
  const deficitTons = Math.max(0, requestedVolumeTons - maxPrimaryCap);

  // Filter other co-ops that match variety or certification
  const compatibleOthers = allCooperatives
    .filter(c => c.id !== primaryCooperative.id)
    .map(c => {
      const assigned = Math.min(c.recommendedCapacity || 20, deficitTons);
      return { ...c, assignedVolume: assigned };
    });

  // Calculate total combined coverage
  const totalCombinedTons = maxPrimaryCap + compatibleOthers.reduce((acc, c) => acc + c.assignedVolume, 0);
  const isFullyCovered = totalCombinedTons >= requestedVolumeTons;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#1E1512] text-white px-6 py-4 flex items-center justify-between border-b border-[#3D2D27]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-bold text-slate-950">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                MÓDULO 4 — COBERTURA CONJUNTA DE CAPACIDAD
              </span>
              <h2 className="text-sm font-bold text-white">Sugerencia de Agregación Multi-Cooperativa</h2>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Capacity Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-950 text-xs">Capacidad Individual Insuficiente</h4>
              <p className="text-amber-800 mt-0.5">
                Solicitaste <strong className="text-amber-950">{requestedVolumeTons} t</strong>. La cooperativa primaria <strong>{primaryCooperative.name}</strong> puede ofrecer de forma segura un máximo de <strong className="text-amber-950">{maxPrimaryCap} t</strong> sin sobrecomprometer su cosecha.
              </p>
            </div>
          </div>

          {/* System Aggregation Proposal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Propuesta de Cobertura Conjunta Autogenerada
              </h4>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">
                {isFullyCovered ? '✓ PEDIDO COMPLETAMENTE CUBIERTO (100%)' : 'COBERTURA PARCIAL'}
              </span>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {/* Primary Coop */}
              <div className="bg-white p-3 rounded-lg border border-emerald-300 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 block">{primaryCooperative.name} (Principal)</span>
                    <span className="text-[11px] text-gray-500">{primaryCooperative.region} • {primaryCooperative.variety}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm text-emerald-700">{maxPrimaryCap} t</span>
                  <span className="text-[10px] text-gray-400 block">Capacidad Comprometible</span>
                </div>
              </div>

              {/* Compatible Coops */}
              {compatibleOthers.map((c, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-[10px]">
                      {idx + 2}
                    </span>
                    <div>
                      <span className="font-bold text-gray-900 block">{c.name}</span>
                      <span className="text-[11px] text-gray-500">{c.region} • {c.variety}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-sm text-amber-700">+{c.assignedVolume} t</span>
                    <span className="text-[10px] text-gray-400 block">Aporte Compatible</span>
                  </div>
                </div>
              ))}

              {/* Total Aggregate */}
              <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-sm">
                <span className="font-extrabold text-slate-900">VOLUMEN TOTAL AGREGADO:</span>
                <span className="font-black text-emerald-700 text-base">{totalCombinedTons} / {requestedVolumeTons} t</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenCombinedReport([primaryCooperative, ...compatibleOthers]);
              }}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Ver Reporte de Compromiso Combinado</span>
            </button>

            <button
              onClick={() => {
                onConfirmJointOffer([primaryCooperative, ...compatibleOthers], totalCombinedTons);
              }}
              className="w-full sm:w-auto bg-[#D96B27] hover:bg-[#C05A19] text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <span>Confirmar y Enviar Oferta Conjunta ({totalCombinedTons}t)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
