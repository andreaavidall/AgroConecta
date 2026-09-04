import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Scale, 
  Layers, 
  CloudSun, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Calendar, 
  TrendingUp,
  Info
} from 'lucide-react';
import { UNIFIED_ORDER_METRICS } from '../data/mockData';

export default function CommitmentReportModal({
  isOpen,
  onClose,
  cooperative,
  isCombined,
  combinedCoops,
  requestedVolumeTons = 20
}) {
  if (!isOpen || !cooperative) return null;

  // CÁLCULOS UNIFICADOS AUDITORÍA (Puntos 1, 2, 6, 13)
  const isStandard20tOrder = requestedVolumeTons === 20;

  const atpTons = isStandard20tOrder ? UNIFIED_ORDER_METRICS.availableTodayTons : Math.min(requestedVolumeTons, 4.0); // 4 t
  const ctpAcopioAjustadoTons = isStandard20tOrder ? UNIFIED_ORDER_METRICS.probableDateTons : Math.min(requestedVolumeTons - atpTons, 12.0); // 12 t
  const totalBackedTons = atpTons + ctpAcopioAjustadoTons; // 16 t
  const gapTons = Math.max(0, requestedVolumeTons - totalBackedTons); // 4 t
  const coveragePct = Math.round((totalBackedTons / requestedVolumeTons) * 100); // 80% (NUNCA 100% ni 96%)

  const requestedDate = UNIFIED_ORDER_METRICS.requestedDate; // 15/10/2026
  const firstViableDate = gapTons > 0 ? UNIFIED_ORDER_METRICS.firstViableDate : requestedDate; // 24/10/2026

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#174C3C] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-800 rounded-xl border border-emerald-600/40">
                <Scale className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Informe de Capacidad de Compromiso</h2>
                <p className="text-xs text-emerald-200">
                  Revisión de requisitos y evidencias para pedido de <span className="font-bold text-amber-300">{requestedVolumeTons} toneladas</span> — {cooperative.name}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Metrics Bar Unificada (Punto 2 Corregido) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-emerald-800/60 text-xs">
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="text-emerald-300 block text-[11px]">Volumen Solicitado</span>
              <span className="text-lg font-black text-white">{requestedVolumeTons} t</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="text-emerald-300 block text-[11px]">Cobertura Total Condicionada</span>
              <span className="text-lg font-black text-amber-300">{totalBackedTons} t</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="text-emerald-300 block text-[11px]">Brecha No Respaldada</span>
              <span className={`text-lg font-black ${gapTons > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{gapTons} t</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="text-emerald-300 block text-[11px]">Cobertura Real</span>
              <span className={`text-lg font-black ${coveragePct >= 100 ? 'text-emerald-400' : 'text-amber-300'}`}>{coveragePct}%</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#F6F8F5]">
          
          {/* Warning Banner (Punto 1 Corregido) */}
          {gapTons > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <h4 className="font-bold text-amber-900 text-sm">Cobertura Parcial del Pedido ({coveragePct}%)</h4>
                <p>
                  De las {requestedVolumeTons} t solicitadas, la cooperativa cuenta con <strong>{atpTons} t disponibles para prometer hoy</strong> y <strong>{ctpAcopioAjustadoTons} t probables para la fecha</strong>. Existe una brecha no respaldada de <strong>{gapTons} t</strong> por precipitaciones elevadas que retrasan el secado solar en marquesinas.
                </p>
              </div>
            </div>
          )}

          {/* Breakdown Section: Disponible hoy vs Probable para la fecha (Punto 2 & 13) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: Disponible para prometer hoy */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A57]" />
                  1. Disponible para prometer hoy (Grano seco)
                </h3>
                <span className="bg-emerald-100 text-[#174C3C] text-[11px] font-bold px-2 py-0.5 rounded-full">{atpTons} t confirmadas</span>
              </div>
              
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Grano seco disponible en almacén:</span>
                  <span className="font-bold text-slate-800">5 t</span>
                </div>
                <div className="flex justify-between">
                  <span>(-) Reservas de seguridad técnica:</span>
                  <span className="font-bold text-slate-800">-1 t</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-800">
                  <span>Disponible neto para prometer hoy:</span>
                  <span className="text-[#237A57] font-black">{atpTons} t</span>
                </div>
              </div>
            </div>

            {/* Box 2: Probable para la fecha */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  2. Probable para la fecha (Proyección acopio)
                </h3>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full">{ctpAcopioAjustadoTons} t probables</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Acopio estimado en campo:</span>
                  <span className="font-bold text-slate-800">15 t</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Factor de riesgo (Precipitaciones elevadas):</span>
                  <span className="font-bold">Máx {ctpAcopioAjustadoTons} t condicionadas</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-800">
                  <span>Cantidad condicionada probable:</span>
                  <span className="text-amber-600 font-black">{ctpAcopioAjustadoTons} t</span>
                </div>
              </div>
            </div>

          </div>

          {/* Indicadores Independientes Verificables (Punto 4 Corregido - Sin score ficticio) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#237A57]" />
              Indicadores Independientes de Cumplimiento & Evidencia
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">Cumplimiento Histórico</span>
                <span className="font-bold text-slate-800 text-xs">4 de 5 campañas (80%)</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">Actualización de Datos</span>
                <span className="font-bold text-slate-800 text-xs">Hace 2 días</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">Cobertura del Pedido</span>
                <span className="font-bold text-amber-700 text-xs">{coveragePct}% ({totalBackedTons}/20t)</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">Riesgo Climático</span>
                <span className="font-bold text-amber-700 text-xs">Medio (68mm/72h)</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">Documentos Despacho</span>
                <span className="font-bold text-slate-800 text-xs">1 en trámite (SENASA)</span>
              </div>
            </div>
          </div>

          {/* Delivery Schedule & Bottleneck */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#237A57]" />
              Programación de Fecha Viable
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Fecha Solicitada por Comprador</span>
                <span className="font-bold text-slate-800 text-sm">{requestedDate}</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <span className="text-emerald-800 block text-[11px]">Primera Fecha Viable Sugerida</span>
                <span className="font-bold text-[#174C3C] text-sm">{firstViableDate}</span>
              </div>
            </div>
          </div>

          {/* Decision Recommendation (Puntos 3, 6, 11 Corregidos) */}
          <div className="bg-slate-900 text-white p-5 rounded-xl space-y-2">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Recomendación Operativa Comercial
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Confirmar <strong>{atpTons} t disponibles hoy</strong>; ofrecer hasta <strong>{ctpAcopioAjustadoTons} t adicionales condicionadas</strong> al secado del acopio de la siguiente semana; no comprometer 4 t sin reprogramar fecha al {firstViableDate} o proponer cobertura conjunta.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Estimación del piloto basada en registros de inventario y datos históricos.</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#237A57] text-white text-xs font-bold rounded-lg hover:bg-[#174C3C] transition shadow-sm"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
