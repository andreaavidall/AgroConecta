import React from 'react';
import { ShoppingBag, CheckCircle2, AlertTriangle, ArrowRight, Clock, FileText, Truck, ShieldCheck, Scale, XCircle } from 'lucide-react';

export default function BuyerOffersView({
  offers,
  isCoopRole = false,
  onAcceptOffer,
  onCounterOffer,
  onOpenCommitmentReport,
  onOpenOrderTracking
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
              ? "Evalúa la disponibilidad real mediante el motor ATP/CTP antes de confirmar un compromiso de exportación."
              : "Sigue el estado de tus solicitudes y verifica el respaldo determinístico de cada oferta."}
          </p>
        </div>

        <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 text-right">
          <span className="text-emerald-300 text-xs block">Total Cotizaciones Activas</span>
          <span className="text-2xl font-black text-amber-300">{offers.length} Pedidos</span>
        </div>
      </div>

      {/* Offers Cards */}
      <div className="space-y-4">
        {offers.map((offer) => {
          const isBacked = (offer.coberturaPct || 75) >= 100;

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
                      Propuesta Cobertura Conjunta
                    </span>
                  )}
                </div>
              </div>

              {/* Main Order Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Volumen Solicitado</span>
                  <span className="font-bold text-slate-900 text-sm">{offer.volumeTons} Toneladas</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Precio Ofertado</span>
                  <span className="font-bold text-emerald-700 text-sm">US$ {offer.pricePerKgUsd || offer.offeredPriceUsdKg} / kg</span>
                  <span className="text-[10px] text-slate-400 block font-mono">FOB Callao</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Valor Total Operación</span>
                  <span className="font-bold text-slate-900 text-sm">US$ {(offer.totalValueUsd || 0).toLocaleString()}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Fecha Entrega Solicitada</span>
                  <span className="font-bold text-slate-900 text-sm">{offer.requestedDeliveryDate}</span>
                </div>
              </div>

              {/* Coverage & ATP/CTP Backing Status (P0-1 Fix) */}
              <div className="bg-[#F6F8F5] p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-[#237A57]" />
                  <div>
                    <span className="font-bold text-slate-800">
                      Respaldo determinístico: {offer.backedVolumeTons || 15} t confirmadas de {offer.volumeTons} t ({offer.coberturaPct || 75}% Cobertura Real)
                    </span>
                    {offer.gapTons > 0 && (
                      <span className="text-amber-800 font-bold block text-[11px]">
                        Brecha no respaldada: {offer.gapTons} t (Requiere Cobertura Conjunta o ajuste de fecha)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onOpenCommitmentReport(offer.isJointCoverage)}
                  className="bg-white hover:bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs flex items-center gap-1 transition shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#237A57]" />
                  <span>Ver Informe ATP/CTP</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onOpenOrderTracking(offer)}
                  className="text-xs font-bold text-[#237A57] hover:underline flex items-center gap-1"
                >
                  <Truck className="w-4 h-4" />
                  <span>Seguimiento de Cadena de Entrega</span>
                </button>

                {isCoopRole && offer.status !== 'ACEPTADA' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCounterOffer(offer)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition border border-slate-300"
                    >
                      Enviar Contraoferta
                    </button>

                    <button
                      onClick={() => {
                        if (!isBacked && !offer.isJointCoverage) {
                          alert(`⚠️ No se puede aceptar directamente: existe una brecha de ${offer.gapTons || 5} t sin respaldo determinístico. Se ha sugerido activar Cobertura Conjunta Multi-Cooperativa.`);
                          onOpenCommitmentReport(true);
                        } else {
                          onAcceptOffer(offer.id);
                        }
                      }}
                      className="px-4 py-2 bg-[#237A57] hover:bg-[#174C3C] text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Aceptar Oferta</span>
                    </button>
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
