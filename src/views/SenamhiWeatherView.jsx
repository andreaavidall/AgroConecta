import React from 'react';
import { CloudRain, AlertTriangle, Thermometer, Wind, MapPin, Info, CheckCircle2 } from 'lucide-react';
import { SENAMHI_WEATHER_DATA } from '../data/mockData';

export default function SenamhiWeatherView() {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-300">
              FUENTE EXTERNA — SENAMHI PERÚ (DEMOSTRATIVO)
            </span>
          </div>
          <h1 className="text-xl font-black text-[#1E1512] mt-1">Análisis de Riesgo Hidrometeorológico SENAMHI</h1>
          <p className="text-xs text-gray-500">Cruza la estación meteorológica con las parcelas cacaoteras para explicar desviaciones de acopio.</p>
        </div>
      </div>

      {/* Weather Telemetry Banner */}
      <div className="bg-gradient-to-r from-[#17212b] to-[#1E1512] text-white p-6 rounded-2xl border border-sky-900/40 shadow-xl space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-sky-400 font-bold uppercase block">{SENAMHI_WEATHER_DATA.station}</span>
            <h2 className="text-lg font-bold text-white">Alerta de Precipitaciones en Cuenca Huallaga</h2>
          </div>
          <span className="bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">
            RIESGO {SENAMHI_WEATHER_DATA.riskLevel}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/10 p-4 rounded-xl border border-white/10 text-xs">
          <div>
            <span className="text-gray-400 block text-[10px]">Lluvia Acumulada 72h</span>
            <span className="text-xl font-black text-amber-400">{SENAMHI_WEATHER_DATA.accumulatedRain72hMm} mm</span>
            <span className="text-[10px] text-gray-300 block">Promedio: {SENAMHI_WEATHER_DATA.expectedAvgMm} mm</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px]">Anomalía Térmica</span>
            <span className="text-xl font-black text-white">{SENAMHI_WEATHER_DATA.rainRatioVsAvg}× sobre el promedio</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px]">Temperatura Prom.</span>
            <span className="text-xl font-black text-white">{SENAMHI_WEATHER_DATA.temperatureAvgC} °C</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px]">Humedad Relativa</span>
            <span className="text-xl font-black text-sky-300">{SENAMHI_WEATHER_DATA.humidityPct}% RH</span>
          </div>
        </div>

        {/* Impact Correlation Explanation */}
        <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800/50 flex items-start space-x-3 text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-300 block">Impacto Directo en la Curva del Compromiso:</span>
            <p className="text-rose-200 mt-0.5 leading-relaxed">
              {SENAMHI_WEATHER_DATA.impactStatement}
            </p>
          </div>
        </div>
      </div>

      {/* 3 Day Forecast */}
      <div className="bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Pronóstico SENAMHI para las Próximas 72 Horas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SENAMHI_WEATHER_DATA.forecast3Days.map((fc, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1 text-xs">
              <span className="font-bold text-gray-900 block">{fc.day}</span>
              <span className="text-gray-600 block">{fc.status}</span>
              <div className="flex justify-between text-[11px] pt-2 border-t border-gray-200">
                <span className="text-sky-700 font-semibold">Prob. Lluvia: {fc.rainProbabilityPct}%</span>
                <span className="font-bold text-gray-900">Máx: {fc.tempMax}°C</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
