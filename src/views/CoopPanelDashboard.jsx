import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  TrendingDown,
  CloudRain,
  MessageSquare,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import CommitmentCurveChart from '../components/CommitmentCurveChart';

export default function CoopPanelDashboard({ 
  cooperative, 
  alerts = [], 
  offers = [], 
  commitmentCurveData = [],
  onOpenTelegram,
  onOpenLotManagement,
  onOpenOffersView,
  onOpenWeatherView,
  onAcceptOffer,
  onCounterOffer
}) {
  if (!cooperative) return null;

  return (
    <div className="space-y-6 pb-12">
      
      {/* 5.1 HEADER DEL PANEL EJECUTIVO */}
      <div className="bg-[#1E1512] text-white p-6 rounded-2xl border border-[#3D2D27] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#D96B27] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                PANEL INTERNO DE ADMINISTRACIÓN
              </span>
              <span className="text-xs text-amber-200/70">{cooperative.region}</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">{cooperative.name} — Campaña 2026</h1>
          </div>

          <button
            onClick={onOpenTelegram}
            className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-md self-start md:self-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Abrir Captura en Telegram</span>
          </button>
        </div>

        {/* Executive Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 mt-4 border-t border-[#3D2D27] text-xs">
          <div>
            <span className="text-[10px] text-amber-200/60 uppercase block font-semibold">Acopio Actual</span>
            <span className="text-xl font-black text-amber-400">17.1 t</span>
            <span className="text-[10px] text-emerald-400 block">+1.2t esta semana</span>
          </div>

          <div>
            <span className="text-[10px] text-amber-200/60 uppercase block font-semibold">Capacidad Proyectada</span>
            <span className="text-xl font-black text-white">{cooperative.capacityRange}</span>
            <span className="text-[10px] text-amber-300 block">Confianza: {cooperative.confidenceScore}%</span>
          </div>

          <div>
            <span className="text-[10px] text-amber-200/60 uppercase block font-semibold">Avance Campaña</span>
            <span className="text-xl font-black text-white">82%</span>
            <span className="text-[10px] text-gray-400 block">Meta 24 t</span>
          </div>

          <div>
            <span className="text-[10px] text-amber-200/60 uppercase block font-semibold">Días al Embarque</span>
            <span className="text-xl font-black text-white">{cooperative.shippingDaysLeft} días</span>
            <span className="text-[10px] text-gray-400 block">Fecha: 15-Oct</span>
          </div>

          <div>
            <span className="text-[10px] text-amber-200/60 uppercase block font-semibold">Confianza de Entrega</span>
            <span className="text-xl font-black text-emerald-400">{cooperative.confidenceScore}%</span>
            <span className="text-[10px] text-emerald-300 block">Alta Reputación</span>
          </div>
        </div>
      </div>

      {/* 5.2 REQUIERE TU ATENCIÓN (ALERTAS PRIORIZADAS) */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <h2 className="text-base font-extrabold text-[#1E1512]">REQUIERE TU ATENCIÓN INMEDIATA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alt) => (
            <div 
              key={alt.id}
              className={`p-4 rounded-2xl border space-y-3 shadow-sm ${
                alt.level === 'URGENTE'
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-extrabold text-[10px] px-2 py-0.5 rounded ${
                  alt.level === 'URGENTE' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950'
                }`}>
                  {alt.level}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold">{alt.zone}</span>
              </div>

              <div>
                <h4 className="font-bold text-xs">{alt.title}</h4>
                <p className="text-[11px] opacity-90 mt-1">{alt.message}</p>
              </div>

              <div className="pt-2 border-t border-black/10 flex items-center justify-between gap-2">
                <button
                  onClick={onOpenWeatherView}
                  className="bg-black/10 hover:bg-black/20 px-3 py-1 rounded-lg font-bold text-[10px] cursor-pointer"
                >
                  Ver Causa Climática
                </button>
                <button
                  onClick={onOpenOffersView}
                  className="bg-[#D96B27] text-white px-3 py-1 rounded-lg font-bold text-[10px] cursor-pointer"
                >
                  Buscar Cobertura
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5.3 EXECUTIVE KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiTile title="Lotes Activos" val="4 Lotes" sub="3 en fermentación/secado" />
        <KpiTile title="Lotes en Riesgo" val="1 Lote" sub="Fermentación 114h (CAC-015)" color="text-amber-600" />
        <KpiTile title="% Geolocalizados" val="91% GPS" sub="189 parcelas de socios" color="text-emerald-700" />
        <KpiTile title="Valor Ofertas Activas" val="US$ 635,000" sub="2 compradores en negociación" color="text-[#D96B27]" />
      </div>

      {/* Curva del Compromiso Chart */}
      <CommitmentCurveChart data={commitmentCurveData} minCapacity={cooperative.minCapacity} maxCapacity={cooperative.maxCapacity} />

      {/* 5.5 OFERTAS RECIBIDAS DE COMPRADORES */}
      <div className="bg-white rounded-2xl p-6 border border-[#EFECE6] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#1E1512]">Ofertas Comerciales Recibidas</h3>
            <p className="text-xs text-gray-500">Analiza el precio ofrecido vs. la referencia de mercado y disponibilidad de capacidad.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((off) => (
            <div key={off.id} className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#EFECE6] space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">{off.country}</span>
                  <h4 className="font-extrabold text-sm text-[#1E1512]">{off.buyerCompany}</h4>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Expira en {off.expirationHoursLeft}h
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-gray-200 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block">Volumen</span>
                  <span className="font-bold text-gray-900">{off.volumeTons} toneladas</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Precio por kg</span>
                  <span className="font-extrabold text-emerald-700">US$ {off.pricePerKgUsd}/kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Valor Total Est.</span>
                  <span className="font-bold text-gray-900">US$ {off.totalValueUsd.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">vs Referencia NY</span>
                  <span className="font-bold text-emerald-700">{off.priceVsMarketPct}%</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-600 font-medium">{off.coverageStatus}</p>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={() => onAcceptOffer(off)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Aceptar Oferta
                </button>
                <button
                  onClick={() => onCounterOffer(off)}
                  className="flex-1 bg-[#D96B27] hover:bg-[#C05A19] text-white py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Contraofertar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function KpiTile({ title, val, sub, color = "text-gray-900" }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-[#EFECE6] shadow-sm space-y-1">
      <span className="text-gray-500 text-[11px] font-semibold block">{title}</span>
      <div className={`text-lg font-black ${color}`}>{val}</div>
      <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
    </div>
  );
}
