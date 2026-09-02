import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  DollarSign, 
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
  Layers,
  Truck,
  Check,
  MessageSquare
} from 'lucide-react';

export default function BuyerOffersView({ 
  offers = [], 
  onOpenCommitmentReport, 
  onAcceptOffer, 
  onCounterOffer,
  onOpenOrderTracking,
  isCoopRole = false
}) {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'SENT' | 'ACCEPTED' | 'JOINT' | 'COUNTER'

  const filteredOffers = offers.filter(o => {
    if (activeFilter === 'SENT') return o.status === 'ENVIADA';
    if (activeFilter === 'ACCEPTED') return o.status === 'ACEPTADA';
    if (activeFilter === 'JOINT') return o.isJointCoverage;
    if (activeFilter === 'COUNTER') return o.status === 'CONTRAOFERTA';
    return true;
  });

  const totalValue = offers.reduce((acc, curr) => acc + (curr.totalValueUsd || 0), 0);

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#1E1512]">
            {isCoopRole ? 'Ofertas Recibidas de Compradores Internacionales' : 'Pipeline Comercial de Ofertas & Negociaciones'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isCoopRole 
              ? 'Evalúa las ofertas formales de compra enviadas por importadores y exportadores, acéptalas o envía contraofertas.'
              : 'Gestión de propuestas de compra enviadas, seguimiento de entregas y contratos de cobertura conjunta.'}
          </p>
        </div>
      </div>

      {/* COMMERCIAL KPI SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#EFECE6] shadow-sm">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Ofertas Activas</span>
          <span className="text-2xl font-black text-[#1E1512] mt-1 block">{offers.length} Propuestas</span>
          <span className="text-[11px] text-amber-600 font-bold">2 en negociación</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EFECE6] shadow-sm">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Contratos Aceptados</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">1 Aceptada</span>
          <span className="text-[11px] text-emerald-600 font-bold">45 t comprometidas</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EFECE6] shadow-sm">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Cobertura Conjunta</span>
          <span className="text-2xl font-black text-[#D96B27] mt-1 block">1 Paquete</span>
          <span className="text-[11px] text-gray-500 font-semibold">100 t multi-cooperativa</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EFECE6] shadow-sm">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Valor Total Compromiso</span>
          <span className="text-2xl font-black text-[#1E1512] mt-1 block">${totalValue.toLocaleString()}</span>
          <span className="text-[11px] text-emerald-600 font-bold">ICE NY Ref: $8.42/kg</span>
        </div>
      </div>

      {/* PIPELINE FILTER TABS */}
      <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-2xl border border-[#EFECE6] text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeFilter === 'ALL' ? 'bg-[#1E1512] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Todas ({offers.length})
        </button>

        <button
          onClick={() => setActiveFilter('SENT')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeFilter === 'SENT' ? 'bg-[#1E1512] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Enviadas
        </button>

        <button
          onClick={() => setActiveFilter('ACCEPTED')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeFilter === 'ACCEPTED' ? 'bg-[#1E1512] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Aceptadas
        </button>

        <button
          onClick={() => setActiveFilter('JOINT')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeFilter === 'JOINT' ? 'bg-[#D96B27] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Cobertura Conjunta
        </button>
      </div>

      {/* RICH OFFER CARDS LIST */}
      <div className="space-y-4">
        {filteredOffers.map((off) => (
          <div 
            key={off.id}
            className="bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-sm space-y-4 hover:shadow-md transition-all"
          >
            {/* Top Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-gray-400">{off.id}</span>
                <h3 className="font-black text-base text-[#1E1512]">
                  {isCoopRole ? `Comprador: ${off.buyerCompany}` : (off.cooperativeName || off.coopName)}
                </h3>
                {off.isJointCoverage && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                    COBERTURA CONJUNTA MULTI-COOP
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  off.status === 'ACEPTADA' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {off.status}
                </span>
                <span className="text-xs text-gray-400 font-mono">Destino: {off.destinationCountry || off.country}</span>
              </div>
            </div>

            {/* Main Financial & Volume Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#FBF9F5] p-4 rounded-2xl border border-[#EFECE6] text-xs">
              <div>
                <span className="text-gray-500 font-semibold block text-[10px]">Volumen Solicitado</span>
                <span className="font-black text-sm text-[#D96B27]">{off.volumeTons || off.volume} toneladas</span>
              </div>

              <div>
                <span className="text-gray-500 font-semibold block text-[10px]">Precio Ofertado</span>
                <span className="font-black text-sm text-[#1E1512]">US$ {off.offeredPriceUsdKg || off.pricePerKgUsd}/kg</span>
                <span className="text-[9px] text-emerald-700 font-bold block">Ref ICE NY: $8.42/kg</span>
              </div>

              <div>
                <span className="text-gray-500 font-semibold block text-[10px]">Valor Total Contrato</span>
                <span className="font-black text-sm text-[#1E1512]">${(off.totalValueUsd || off.totalValue)?.toLocaleString()}</span>
              </div>

              <div>
                <span className="text-gray-500 font-semibold block text-[10px]">Incoterm / Entrega</span>
                <span className="font-bold text-gray-900">{off.incoterm} ({off.requestedDeliveryDate})</span>
              </div>

              <div>
                <span className="text-gray-500 font-semibold block text-[10px]">Estado de Cobertura</span>
                <span className="font-bold text-emerald-700">{off.coverageStatus || '100% Cubierta'}</span>
              </div>
            </div>

            {/* Negotiation Step Timeline */}
            <div className="pt-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase block mb-2">Línea de Tiempo de Negociación:</span>
              <div className="flex items-center space-x-2 text-[11px] overflow-x-auto pb-1">
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  <span>1. Oferta Enviada</span>
                </span>
                <span className="text-gray-300">→</span>
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  <span>2. Revisada por Cooperativa</span>
                </span>
                <span className="text-gray-300">→</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1 shrink-0 ${
                  off.status === 'ACEPTADA' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  <span>3. Dictamen: {off.status}</span>
                </span>
              </div>
            </div>

            {/* Card Footer Actions (COOPERATIVE VS BUYER ACTIONS) */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-gray-500 font-medium">
                Vence en: <strong className="text-[#D96B27]">{off.expirationHoursLeft || 48} horas</strong>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onOpenCommitmentReport(off.isJointCoverage)}
                  className="bg-[#1E1512] hover:bg-[#3D2D27] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D96B27]" />
                  <span>Reporte Compromiso</span>
                </button>

                {/* COOPERATIVE ROLE ACTIONS: Aceptar / Contraofertar */}
                {isCoopRole && off.status !== 'ACEPTADA' && (
                  <>
                    <button
                      onClick={() => onCounterOffer?.(off)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
                      <span>Contraofertar</span>
                    </button>

                    <button
                      onClick={() => onAcceptOffer?.(off.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Aceptar Oferta</span>
                    </button>
                  </>
                )}

                {/* BUYER ROLE ACTION WHEN ACCEPTED: Ver Seguimiento del Pedido */}
                {off.status === 'ACEPTADA' && (
                  <button
                    onClick={() => onOpenOrderTracking(off)}
                    className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Truck className="w-4 h-4" />
                    <span>🚚 Ver Seguimiento del Pedido</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
