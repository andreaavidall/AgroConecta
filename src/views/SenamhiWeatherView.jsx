import React from 'react';
import { CloudSun, AlertTriangle, ExternalLink, Info, Calendar, MapPin } from 'lucide-react';
import { SENAMHI_WEATHER_DATA } from '../data/mockData';

export default function SenamhiWeatherView() {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <CloudSun className="w-4 h-4 text-amber-300" />
            <span>Informes Meteorológicos Registrados</span>
          </div>
          <h1 className="text-2xl font-black">Monitoreo de Precipitaciones SENAMHI</h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Evalúa los datos de lluvias y humedad registrados para anticipar cuellos de botella en la capacidad de secado solar.
          </p>
        </div>

        <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 text-right">
          <span className="text-emerald-300 text-xs block font-mono">
            {SENAMHI_WEATHER_DATA.dataFreshnessTag}
          </span>
          <span className="text-xl font-black text-amber-300">Nivel de Riesgo: {SENAMHI_WEATHER_DATA.riskLevel}</span>
        </div>
      </div>

      {/* Station Info Box (Punto 9 Corregido) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#237A57]" />
              {SENAMHI_WEATHER_DATA.station}
            </h3>
            <p className="text-xs text-slate-500">Periodo del dato: {SENAMHI_WEATHER_DATA.lastReportDate}</p>
          </div>

          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
            {SENAMHI_WEATHER_DATA.anomalyType}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Lluvia Acumulada 72h</span>
            <span className="font-bold text-amber-700 text-base">{SENAMHI_WEATHER_DATA.accumulatedRain72hMm} mm</span>
            <span className="text-[10px] text-slate-400 block">Promedio esperado: {SENAMHI_WEATHER_DATA.expectedAvgMm} mm</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Desviación Precipitación</span>
            <span className="font-bold text-slate-900 text-base">{SENAMHI_WEATHER_DATA.rainRatioVsAvg}× sobre promedio</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Humedad Relativa</span>
            <span className="font-bold text-slate-900 text-base">{SENAMHI_WEATHER_DATA.humidityPct}%</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Temperatura Promedio</span>
            <span className="font-bold text-slate-900 text-base">{SENAMHI_WEATHER_DATA.temperatureAvgC} °C</span>
          </div>
        </div>

        {/* Associated Risk Factor Statement (Punto 9 Corregido: "Factor de riesgo asociado") */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs text-amber-900 space-y-1">
          <h4 className="font-bold text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Factor de riesgo asociado a la capacidad de entrega
          </h4>
          <p className="leading-relaxed">
            {SENAMHI_WEATHER_DATA.riskFactorAssociated} Esto explica la ralentización temporal del secado en marquesina y justifica el ajuste en la primera fecha viable de entrega (24/10/2026).
          </p>
        </div>
      </div>

    </div>
  );
}
