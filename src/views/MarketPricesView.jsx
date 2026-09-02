import React, { useState } from 'react';
import { TrendingUp, Bell, CheckCircle2, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ICE_NY_COCOA_MARKET } from '../data/mockData';

export default function MarketPricesView({ onOpenTelegram }) {
  const [alertEnabled, setAlertEnabled] = useState(true);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#D96B27]/10 text-[#D96B27] text-[10px] font-bold px-2 py-0.5 rounded border border-[#D96B27]/30">
              MERCADO INTERNACIONAL DE COMMODITIES (DEMOSTRATIVO)
            </span>
          </div>
          <h1 className="text-xl font-black text-[#1E1512] mt-1">Precios del Cacao — ICE Futures New York</h1>
          <p className="text-xs text-gray-500">Referencia diaria para la negociación de contratos B2B entre cooperativas y compradores.</p>
        </div>

        <button
          onClick={() => setAlertEnabled(!alertEnabled)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
            alertEnabled ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{alertEnabled ? 'Alertas Telegram Activas' : 'Activar Alertas Telegram'}</span>
        </button>
      </div>

      {/* Main Price Card & Metric */}
      <div className="bg-[#1E1512] text-white p-6 rounded-2xl border border-[#3D2D27] shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        <div>
          <span className="text-[10px] text-amber-200/60 font-bold uppercase block">Cotización Actual ICE NY</span>
          <div className="text-4xl font-black text-amber-400 mt-1">US$ {ICE_NY_COCOA_MARKET.currentPriceUsdKg} <span className="text-xs text-gray-400 font-normal">/ kg</span></div>
          <span className="text-xs font-bold text-emerald-400 block mt-1">
            US$ {ICE_NY_COCOA_MARKET.pricePerTonUsd.toLocaleString()} / tonelada
          </span>
        </div>

        <div>
          <span className="text-[10px] text-amber-200/60 font-bold uppercase block">Variación 7 Días</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">+{ICE_NY_COCOA_MARKET.change7dPct}%</div>
          <span className="text-[11px] text-gray-400 block">Tendencia Alcista en Mercado Futuro</span>
        </div>

        <div className="bg-[#2A1E1A] p-4 rounded-xl border border-[#4A3831] space-y-2 text-xs">
          <span className="font-bold text-amber-300 block">Recomendación para Ofertas:</span>
          <p className="text-amber-200/80 text-[11px]">
            Movimiento significativo en el mercado global. Es un momento propicio para revisar ofertas pendientes o cerrar contratos a precio fijo.
          </p>
        </div>

      </div>

      {/* 30-Day Historical Trend Chart */}
      <div className="bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Tendencia de Cotizaciones (Últimos 30 Días)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ICE_NY_COCOA_MARKET.historical30d} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={11} domain={[6.5, 9.0]} unit=" $" />
              <Tooltip formatter={(v) => [`$${v} / kg`, 'Precio NY']} />
              <Line type="monotone" dataKey="price" stroke="#D96B27" strokeWidth={3} dot={{ r: 5, fill: '#D96B27' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
