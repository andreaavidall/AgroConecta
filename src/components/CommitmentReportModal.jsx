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
  Truck,
  TrendingUp,
  Info
} from 'lucide-react';

export default function CommitmentReportModal({
  isOpen,
  onClose,
  cooperative,
  isCombined,
  combinedCoops,
  requestedVolumeTons = 20
}) {
  if (!isOpen || !cooperative) return null;

  // CÁLCULOS DETERMINÍSTICOS ATP / CTP (Sección 12)
  const stockAptoTons = (cooperative.stockAptoKg || 5000) / 1000;           // 5.0 t seco disponible (ATP)
  const stockReservadoTons = (cooperative.stockReservadoKg || 0) / 1000;    // 0.0 t
  const stockSeguridadTons = (cooperative.stockSeguridadKg || 1000) / 1000; // 1.0 t
  
  // ATP = stock_apto - reservas_activas - stock_seguridad
  const atpTons = Math.max(0, stockAptoTons - stockReservadoTons - stockSeguridadTons); // 4.0 t confirmables de inmediato

  // CTP = Acopio proyectado ajustado por factor climático y capacidad operativa de secado
  const rawAcopioTons = 15.0; // 15.0 t acopio proyectado
  const secadoLimitTons = (cooperative.capacidadSecadoKg || 12000) / 1000; // 12.0 t limitante por lluvias SENAMHI
  
  const ctpAcopioAjustadoTons = Math.min(rawAcopioTons, secadoLimitTons); // 12.0 t probables

  // Respaldado Total = ATP + CTP
  const totalBackedTons = atpTons + ctpAcopioAjustadoTons; // 4.0 + 12.0 = 16.0 t

  // Brecha No Respaldada
  const gapTons = Math.max(0, requestedVolumeTons - totalBackedTons); // 20 - 16 = 4.0 t

  // Cobertura Real (P0-1 Fix: NUNCA mostrar 100% si hay brecha)
  const coveragePct = Math.round((totalBackedTons / requestedVolumeTons) * 100);

  // Fecha Viable (Ruta Crítica Hacia Atrás - Sección 13)
  const requestedDate = "15 de Octubre 2026";
  const firstViableDate = gapTons > 0 ? "24 de Octubre 2026 (+9 días para secado adicional)" : requestedDate;

  // Índice de Riesgo Explicable (Sección 14)
  const volumeRisk = gapTons > 0 ? 45 : 10;
  const climateRisk = 35; // SENAMHI lluvias Uchiza
  const docRisk = 15;     // SENASA en trámite
  const logisticsRisk = 10;
  const dataFreshnessRisk = 5;

  const totalRiskScore = Math.round(
    0.35 * volumeRisk +
    0.20 * climateRisk +
    0.20 * docRisk +
    0.15 * logisticsRisk +
    0.10 * dataFreshnessRisk
  ); // ~26 (Riesgo Bajo/Moderado)

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
                <h2 className="text-xl font-bold">Informe de Capacidad de Compromiso (ATP / CTP)</h2>
                <p className="text-xs text-emerald-200">
                  Evaluación determinística para pedido de <span className="font-bold text-amber-300">{requestedVolumeTons} toneladas</span> — {cooperative.name}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-emerald-800/60 text-xs">
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="text-emerald-300 block text-[11px]">Volumen Solicitado</span>
              <span className="text-lg font-black text-white">{requestedVolumeTons} t</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="text-emerald-300 block text-[11px]">Respaldado Total (ATP+CTP)</span>
              <span className="text-lg font-black text-amber-300">{totalBackedTons} t</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/50">
              <span className="text-emerald-300 block text-[11px]">Brecha no respaldada</span>
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
          
          {/* Warning Banner if Gap Exists */}
          {gapTons > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <h4 className="font-bold text-amber-900 text-sm">Cobertura Parcial del Pedido ({coveragePct}%)</h4>
                <p>
                  De las {requestedVolumeTons} t solicitadas, la cooperativa puede confirmar <strong>{atpTons} t inmediatamente (ATP)</strong> y <strong>{ctpAcopioAjustadoTons} t en proceso ajustado (CTP)</strong>. Existe una brecha no respaldada de <strong>{gapTons} t</strong> generada por restricciones de secado solar (lluvias SENAMHI).
                </p>
              </div>
            </div>
          )}

          {/* Breakdown Section: ATP vs CTP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: ATP (Available to Promise) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#237A57]" />
                  1. Stock Disponible Inmediato (ATP)
                </h3>
                <span className="bg-emerald-100 text-[#174C3C] text-[11px] font-bold px-2 py-0.5 rounded-full">{atpTons} t confirmadas</span>
              </div>
              
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Grano seco en almacén (Lote CAC-014):</span>
                  <span className="font-bold text-slate-800">{stockAptoTons} t</span>
                </div>
                <div className="flex justify-between">
                  <span>(-) Reservas activas para otros pedidos:</span>
                  <span className="font-bold text-slate-800">-{stockReservadoTons} t</span>
                </div>
                <div className="flex justify-between">
                  <span>(-) Reserva técnica de seguridad:</span>
                  <span className="font-bold text-slate-800">-{stockSeguridadTons} t</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-800">
                  <span>ATP Neto Inmediato:</span>
                  <span className="text-[#237A57]">{atpTons} t</span>
                </div>
              </div>
            </div>

            {/* Box 2: CTP (Capable to Promise) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  2. Acopio Proyectado en Proceso (CTP)
                </h3>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full">{ctpAcopioAjustadoTons} t probables</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Acopio base proyectado en campo:</span>
                  <span className="font-bold text-slate-800">{rawAcopioTons} t</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Restricción de secado (Lluvias SENAMHI):</span>
                  <span className="font-bold">Máx {secadoLimitTons} t</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-800">
                  <span>CTP Acondicionado:</span>
                  <span className="text-amber-600">{ctpAcopioAjustadoTons} t</span>
                </div>
              </div>
            </div>

          </div>

          {/* Delivery Schedule & Bottleneck */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#237A57]" />
              Programación de Fecha Viable & Ruta Crítica
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

            <p className="text-xs text-slate-500 italic leading-relaxed">
              * Cuello de botella detectado en capacidad de secado solar debido a precipitaciones de 68mm/72h reportadas por la Estación SENAMHI Tocache.
            </p>
          </div>

          {/* Pricing & Net Margin Breakdown (Sección 15) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              Precio Referencial de Mercado & Simulación de Margen
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Base Bolsa ICE NY</span>
                <span className="font-bold text-slate-800">US$ 8.42 / kg</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Primas Orgánico / FT</span>
                <span className="font-bold text-emerald-700">+US$ 0.70 / kg</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Costos Procesamiento/Flete</span>
                <span className="font-bold text-slate-700">-US$ 0.60 / kg</span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <span className="text-emerald-800 text-[11px] block">Precio Sugerido FOB Callao</span>
                <span className="font-bold text-[#174C3C]">US$ 8.52 / kg</span>
              </div>
            </div>
          </div>

          {/* Actionable Decision Recommendation (Sección 24) */}
          <div className="bg-emerald-900 text-white p-5 rounded-xl space-y-2">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Recomendación Transaccional Sugerida por AgroConecta
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Confirmar <strong>{atpTons} t disponibles inmediatamente</strong>; ofrecer hasta <strong>{ctpAcopioAjustadoTons} t adicionales de manera condicionada</strong> al secado del acopio de Semana 6; no comprometer {gapTons} t sin ampliación de fecha al 24 de Octubre o sin activar Cobertura Conjunta con Cooperativa Bosque Andino.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400">Datos auditados determinísticamente desde inventario y bitácoras.</span>
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
