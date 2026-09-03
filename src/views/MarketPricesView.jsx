import React, { useState } from 'react';
import { TrendingUp, Scale, Info, DollarSign, RefreshCcw, ShieldCheck, ExternalLink } from 'lucide-react';
import { ICE_NY_COCOA_MARKET } from '../data/mockData';

export default function MarketPricesView() {
  const [exchangeRate, setExchangeRate] = useState(3.75); // PEN / USD
  const [organicPremium, setOrganicPremium] = useState(0.50); // USD / kg
  const [ftPremium, setFtPremium] = useState(0.20); // USD / kg
  const [processingCost, setProcessingCost] = useState(0.35); // USD / kg
  const [logisticsCost, setLogisticsCost] = useState(0.25); // USD / kg

  const nyBaseUsdKg = ICE_NY_COCOA_MARKET.currentPriceUsdKg; // 8.42 USD / kg

  // Cálculo del Precio Comercial Estimado y Margen Productor (Sección 15)
  const estimatedFobUsdKg = nyBaseUsdKg + organicPremium + ftPremium - processingCost - logisticsCost;
  const estimatedFobPenKg = estimatedFobUsdKg * exchangeRate;
  const estimatedFobUsdTon = estimatedFobUsdKg * 1000;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-amber-300" />
            <span>Mercado Internacional & Precios Referenciales</span>
          </div>
          <h1 className="text-2xl font-black">Cotizaciones ICE Futures NY & Simulador de Margen</h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Calcula el precio comercial estimado al productor partiendo de la referencia internacional y deduciendo primas y costos reales de exportación.
          </p>
        </div>

        <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 text-right">
          <span className="text-emerald-300 text-xs block font-mono uppercase">
            {ICE_NY_COCOA_MARKET.dataFreshnessTag}
          </span>
          <span className="text-2xl font-black text-amber-300">US$ {nyBaseUsdKg.toFixed(2)} / kg</span>
          <span className="text-[10px] text-emerald-400 block font-mono">{ICE_NY_COCOA_MARKET.sourceLabel}</span>
        </div>
      </div>

      {/* Pricing Formula Explanation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-[#237A57]" />
          Fórmula del Precio Comercial Estimado (Sección 15)
        </h3>

        <div className="bg-[#F6F8F5] p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
          <p className="font-bold text-[#174C3C]">
            precio_comercial_estimado = precio_internacional + primas - costos_procesamiento - costos_logística
          </p>
          <p className="text-slate-500 text-[11px]">
            * AgroConecta no utiliza el precio de bolsa bruto como precio directo al productor; calcula la deducibilidad logística.
          </p>
        </div>
      </div>

      {/* Pricing Simulator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Interactive Variables Input */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
            Simulador de Primas & Costos Operativos
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tipo de Cambio (PEN / USD)</label>
              <input
                type="number"
                step="0.01"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Prima Certificado Orgánico (USD / kg)</label>
              <input
                type="number"
                step="0.05"
                value={organicPremium}
                onChange={(e) => setOrganicPremium(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-emerald-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Prima Comercio Justo Fairtrade (USD / kg)</label>
              <input
                type="number"
                step="0.05"
                value={ftPremium}
                onChange={(e) => setFtPremium(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-emerald-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Costos de Procesamiento & Fermentación (USD / kg)</label>
              <input
                type="number"
                step="0.05"
                value={processingCost}
                onChange={(e) => setProcessingCost(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-rose-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Flete & Documentos de Exportación (USD / kg)</label>
              <input
                type="number"
                step="0.05"
                value={logisticsCost}
                onChange={(e) => setLogisticsCost(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-rose-700"
              />
            </div>
          </div>
        </div>

        {/* Right: Calculated Net Margin Results */}
        <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-300 border-b border-emerald-800 pb-2">
              Resultado Comercial Estimado (FOB Callao)
            </h3>

            <div className="space-y-3">
              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 flex justify-between items-center">
                <span className="text-xs text-emerald-200">Precio Sugerido (USD / kg):</span>
                <span className="text-xl font-black text-amber-300">US$ {estimatedFobUsdKg.toFixed(2)}</span>
              </div>

              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 flex justify-between items-center">
                <span className="text-xs text-emerald-200">Precio Sugerido (S/ / kg):</span>
                <span className="text-xl font-black text-white">S/ {estimatedFobPenKg.toFixed(2)}</span>
              </div>

              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 flex justify-between items-center">
                <span className="text-xs text-emerald-200">Valor por Tonelada (FOB):</span>
                <span className="text-xl font-black text-amber-300">US$ {estimatedFobUsdTon.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-emerald-300 italic border-t border-emerald-800 pt-3">
            Aviso: Datos de mercado provistos en Modo Demostración Piloto. No constituye asesoría financiera oficial.
          </div>
        </div>

      </div>

    </div>
  );
}
