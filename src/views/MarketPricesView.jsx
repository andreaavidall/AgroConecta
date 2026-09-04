import React, { useState } from 'react';
import { TrendingUp, Scale, Info, DollarSign, RefreshCcw, ShieldCheck } from 'lucide-react';
import { ICE_NY_COCOA_MARKET } from '../data/mockData';

export default function MarketPricesView() {
  const [exchangeRate, setExchangeRate] = useState(3.75); // PEN / USD
  const [organicPremium, setOrganicPremium] = useState(0.50); // USD / kg
  const [ftPremium, setFtPremium] = useState(0.20); // USD / kg
  const [processingCost, setProcessingCost] = useState(0.35); // USD / kg
  const [logisticsCost, setLogisticsCost] = useState(0.25); // USD / kg

  const nyBaseUsdKg = ICE_NY_COCOA_MARKET.currentPriceUsdKg; // 8.42 USD / kg

  // Cálculo del Precio FOB Callao y Precio Estimado al Productor en Finca (Punto 11 Corregido)
  const estimatedFobUsdKg = nyBaseUsdKg + organicPremium + ftPremium - processingCost - logisticsCost; // 8.52 USD/kg
  const estimatedProducerPriceUsdKg = estimatedFobUsdKg * 0.65; // ~5.54 USD/kg al productor
  const estimatedProducerPricePenKg = estimatedProducerPriceUsdKg * exchangeRate; // ~20.77 S/ / kg

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header (Punto 11 Corregido) */}
      <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-amber-300" />
            <span>Referencia Comercial Simulada</span>
          </div>
          <h1 className="text-2xl font-black">Precios Referenciales & Simulador de Margen</h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Diferencia el precio FOB Callao para exportación del precio estimado liquidado al productor en finca.
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

      {/* Explanation Banner (Punto 11 Corregido: Separar Precio Productor de FOB Callao) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-[#237A57]" />
          Diferencia entre Precio FOB Exportación y Precio al Productor
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          El precio de bolsa internacional no representa el pago directo en finca. El precio ofrecido al socio deduce costos de acopio, fermentación, secado, fletes locales y comisiones operativas de la cooperativa.
        </p>
      </div>

      {/* Pricing Simulator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Input Variables */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
            Simulador de Primas & Costos Deductibles
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
              <label className="block font-bold text-slate-700 mb-1">Costos Procesamiento & Mermas (USD / kg)</label>
              <input
                type="number"
                step="0.05"
                value={processingCost}
                onChange={(e) => setProcessingCost(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-bold text-rose-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Flete & Exportación FOB (USD / kg)</label>
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

        {/* Right: Explicit Separation of FOB vs Producer Price (Punto 11 Corregido) */}
        <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-300 border-b border-emerald-800 pb-2">
              Desglose Comercial Comparativo
            </h3>

            <div className="space-y-3">
              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 flex justify-between items-center">
                <span className="text-xs text-emerald-200">1. Precio FOB Callao (Exportación):</span>
                <span className="text-xl font-black text-amber-300">US$ {estimatedFobUsdKg.toFixed(2)} / kg</span>
              </div>

              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 flex justify-between items-center">
                <span className="text-xs text-emerald-200">2. Precio Estimado al Productor (USD):</span>
                <span className="text-xl font-black text-white">US$ {estimatedProducerPriceUsdKg.toFixed(2)} / kg</span>
              </div>

              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 flex justify-between items-center">
                <span className="text-xs text-emerald-200">3. Liquidación Estimada al Productor (S/):</span>
                <span className="text-xl font-black text-amber-300">S/ {estimatedProducerPricePenKg.toFixed(2)} / kg</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-emerald-300 italic border-t border-emerald-800 pt-3">
            Dato simulado para demostración. No constituye oferta formal binding.
          </div>
        </div>

      </div>

    </div>
  );
}
