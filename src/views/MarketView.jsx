import React, { useState } from 'react';
import MarketPricesView from './MarketPricesView';
import SenamhiWeatherView from './SenamhiWeatherView';
import { AlertCircle, TrendingUp, CloudRain, Bell, Sparkles, Globe, ShieldAlert } from 'lucide-react';
import { EARLY_WARNING_ALERTS, ICE_NY_COCOA_MARKET } from '../data/mockData';

export default function MarketView({ onOpenTelegram }) {
  const [activeMarketTab, setActiveMarketTab] = useState('prices'); // 'prices' | 'weather' | 'alerts'

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* Header & Internal Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFECE6] pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#1E1512]">Mercado, Clima & Alertas Agroexportadoras</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Inteligencia comercial consolidada: cotizaciones ICE NY, telemetría SENAMHI y factores de riesgo para toma de decisiones de compra.
          </p>
        </div>

        {/* Sub-Tabs: Precios | Clima | Alertas */}
        <div className="bg-[#1E1512] p-1 rounded-xl flex items-center space-x-1 text-xs text-white shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setActiveMarketTab('prices')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeMarketTab === 'prices' ? 'bg-[#D96B27] text-white shadow-sm' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Precios NY</span>
          </button>

          <button
            onClick={() => setActiveMarketTab('weather')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeMarketTab === 'weather' ? 'bg-[#D96B27] text-white shadow-sm' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Clima SENAMHI</span>
          </button>

          <button
            onClick={() => setActiveMarketTab('alerts')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeMarketTab === 'alerts' ? 'bg-[#D96B27] text-white shadow-sm' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alertas ({EARLY_WARNING_ALERTS.length})</span>
          </button>
        </div>
      </div>

      {/* AI COMMERCIAL CONTEXT BANNER */}
      <div className="bg-[#1E1512] text-white p-5 rounded-3xl border border-[#3D2D27] shadow-lg space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#D96B27]" />
          <h2 className="font-extrabold text-sm text-white">¿Qué significa este contexto para tus compras de cacao?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#2A1E1A] p-3.5 rounded-2xl border border-[#4A3831] space-y-1">
            <span className="text-amber-400 font-bold block">1. Cotización al Alza (+11.5%)</span>
            <p className="text-amber-100/80 leading-relaxed text-[11px]">
              El mercado de NY se sostiene alto en ${ICE_NY_COCOA_MARKET.currentPriceUsdKg}/kg. Conviene asegurar ofertas con primas de origen prefijadas esta semana.
            </p>
          </div>

          <div className="bg-[#2A1E1A] p-3.5 rounded-2xl border border-[#4A3831] space-y-1">
            <span className="text-amber-400 font-bold block">2. Alerta Meteorológica en San Martín</span>
            <p className="text-amber-100/80 leading-relaxed text-[11px]">
              Lluvia de 68mm/72h en Uchiza afecta el secado en patio. Se sugiere verificar % de humedad (máx 7.0%) antes de autorizar embarque.
            </p>
          </div>

          <div className="bg-[#2A1E1A] p-3.5 rounded-2xl border border-[#4A3831] space-y-1">
            <span className="text-amber-400 font-bold block">3. Oportunidad de Cobertura Conjunta</span>
            <p className="text-amber-100/80 leading-relaxed text-[11px]">
              Para pedidos de 50 t a más, la agregación multi-cooperativa entre Valle Verde y Bosque Andino asegura 100% de cumplimiento dentro de plazo.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeMarketTab === 'prices' && (
        <MarketPricesView onOpenTelegram={onOpenTelegram} />
      )}

      {activeMarketTab === 'weather' && (
        <SenamhiWeatherView />
      )}

      {activeMarketTab === 'alerts' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Alertas de Mercado y Riesgo Activas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EARLY_WARNING_ALERTS.map((alt) => (
              <div key={alt.id} className="bg-white p-5 rounded-3xl border border-[#EFECE6] shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                    alt.level === 'URGENTE' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {alt.level}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">{alt.zone}</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-[#1E1512]">{alt.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{alt.message}</p>
                </div>

                <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200/60 text-xs">
                  <span className="font-bold text-amber-950 block">Causa identificada:</span>
                  <p className="text-amber-900 mt-0.5 text-[11px]">{alt.cause}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
