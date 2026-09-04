import React from 'react';
import { ShoppingBag, CheckCircle2, AlertTriangle, ArrowRight, Clock, FileText, Truck, ShieldCheck, Scale, XCircle, Calendar, RefreshCw, Layers } from 'lucide-react';
import { UNIFIED_ORDER_METRICS } from '../data/mockData';

export default function BuyerOffersView({
  offers,
  isCoopRole = false,
  onAcceptOffer,
  onCounterOffer,
  onOpenCommitmentReport,
  onOpenOrderTracking,
  onOpenJointCoverage
}) {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Gestión de Pedidos & Cotizaciones</span>
          </div>
          <h1 className="text-2xl font-black">
            {isCoopRole ? "Ofertas Recibidas de Compradores" : "Mis Pedidos & Solicitudes Enviadas"}
          </h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            {isCoopRole
              ? "Evalúa la disponibilidad real (disponible hoy + probable para la fecha) antes de responder a un comprador."
              : "Revisa el estado de tus solicitudes y la capacidad de cumplimiento verificable de cada cooperativa."}
          </p>
        </div>

        <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 text-right">
          <span className="text-emerald-300 text-xs block">Total Cotizaciones</span>
          <span className="text-2xl font-black text-amber-300">{offers.length} Pedidos</span>
        </div>
      </div>

      {/* Offers Cards */}
      <div className="space-y-4">
        {offers.map((offer) => {
          const isStandard20t = offer.volumeTons === 20;

          // Cifras Unificadas Auditoría (Punto 2 & Punto 3)
          const requestedTons = offer.volumeTons;
          const availableTodayTons = isStandard20t ? UNIFIED_ORDER_METRICS.availableTodayTons : offer.availableTodayTons || 4;
          const probableDateTons = isStandard20t ? UNIFIED_ORDER_METRICS.probableDateTons : offer.probableDateTons || 12;
          const totalBackedTons = availableTodayTons + probableDateTons; // 16 t
          const gapTons = Math.max(0, requestedTons - totalBackedTons);   // 4 t
          const coveragePct = Math.round((totalBackedTons / requestedTons) * 100); // 80%

          const isFullyBacked = gapTons === 0 && coveragePct >= 100;

          return (
            <div
              key={offer.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 hover:border-[#237A57]/40 transition"
            >
              {/* Top Card Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                    {offer.id}
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    {offer.buyerCompany}
                  </h3>
                  <span className="text-xs text-slate-500">({offer.country})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                    offer.status === 'ACEPTADA'
                      ? 'bg-emerald-100 text-emerald-900'
                      : offer.status === 'CONTRAOFERTADA'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-sky-100 text-sky-900'
                  }`}>
                    {offer.status}
                  </span>

                  {offer.isJointCoverage && (
                    <span className="bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-purple-200">
                      Propuesta de Cobertura Conjunta
                    </span>
                  )}
                </div>
              </div>

              {/* Main Order Details Grid (Punto 2 & 13 Corregidos) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Pedido Solicitado</span>
                  <span className="font-bold text-slate-900 text-sm">{requestedTons} Toneladas</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Precio Ofertado</span>
                  <span className="font-bold text-emerald-700 text-sm">US$ {offer.pricePerKgUsd || offer.offeredPriceUsdKg} / kg</span>
                  <span className="text-[10px] text-slate-400 block font-mono">FOB Callao</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Valor Total</span>
                  <span className="font-bold text-slate-900 text-sm">US$ {(offer.totalValueUsd || 0).toLocaleString()}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Fecha Solicitada</span>
                  <span className="font-bold text-slate-900 text-sm">{offer.requestedDeliveryDate}</span>
                </div>
              </div>

              {/* Strict Backing Breakdown Banner (Punto 1, 2, 13) */}
              <div className="bg-[#F6F8F5] p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#237A57]" />
                    Desglose de Capacidad Respaldada:
                  </span>
                  <button
                    onClick={() => onOpenCommitmentReport(offer.isJointCoverage)}
                    className="text-[#237A57] font-bold hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver informe de revisión</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Disponible hoy (ATP)</span>
                    <span className="font-bold text-emerald-700">{availableTodayTons} t</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Probable para la fecha (CTP)</span>
                    <span className="font-bold text-amber-700">{probableDateTons} t</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Brecha no respaldada</span>
                    <span className={`font-bold ${gapTons > 0 ? 'text-red-600' : 'text-slate-700'}`}>{gapTons} t</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Cobertura Real</span>
                    <span className={`font-bold ${coveragePct >= 100 ? 'text-emerald-700' : 'text-amber-700'}`}>{coveragePct}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Strict Acceptance Blocking (Punto 3 Corregido) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onOpenOrderTracking(offer)}
                  className="text-xs font-bold text-[#237A57] hover:underline flex items-center gap-1"
                >
                  <Truck className="w-4 h-4" />
                  <span>Seguimiento de Cadena de Entrega</span>
                </button>

                {isCoopRole && offer.status !== 'ACEPTADA' && (
                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* If NOT fully backed, Aceptar oferta is DISABLED/BLOCKED, showing explicit options (Punto 3) */}
                    {!isFullyBacked ? (
                      <>
                        <button
                          onClick={() => alert(`💬 Contraoferta generada por ${totalBackedTons} t (Volumen disponible y probable respaldado).`)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        >
                          <span>Contraofertar {totalBackedTons} t</span>
                        </button>

                        <button
                          onClick={() => alert(`📅 Solicitud de cambio de fecha enviada para el ${UNIFIED_ORDER_METRICS.firstViableDate} (Primera fecha viable).`)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        >
                          <Calendar className="w-3.5 h-3.5 text-slate-600" />
                          <span>Proponer fecha {UNIFIED_ORDER_METRICS.firstViableDate}</span>
                        </button>

                        <button
                          onClick={() => onOpenJointCoverage && onOpenJointCoverage()}
                          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        >
                          <Layers className="w-3.5 h-3.5 text-purple-700" />
                          <span>Buscar cobertura conjunta</span>
                        </button>

                        <button
                          onClick={() => alert(`❌ Pedido rechazado por falta de respaldo suficiente.`)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg text-xs font-bold transition"
                        >
                          Rechazar
                        </button>
                      </>
                    ) : (
                      /* Aceptar oferta ONLY enabled when 100% backed */
                      <button
                        onClick={() => onAcceptOffer(offer.id)}
                        className="px-4 py-2 bg-[#237A57] hover:bg-[#174C3C] text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Aceptar Oferta</span>
                      </button>
                    )}

                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
