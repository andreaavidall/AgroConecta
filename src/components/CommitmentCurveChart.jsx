import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { AlertCircle, Calendar, ShieldCheck, TrendingDown, Info } from 'lucide-react';

export default function CommitmentCurveChart({ data, minCapacity = 22, maxCapacity = 27, targetDate = "15-Oct" }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-[#1E1512]">Curva del Compromiso (Campaña 2026)</h3>
            <span className="bg-[#D96B27]/10 text-[#D96B27] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#D96B27]/30">
              MODULO 1: CAPACIDAD COMPROMETIBLE
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Proyección continua vs. Acopio real acumulado en toneladas (t). Tolerancia probabilística.
          </p>
        </div>

        {/* Commitment Badges */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-800">
            <span className="text-[10px] text-emerald-600 block uppercase font-semibold">Rango Probable</span>
            <span className="font-bold text-sm">{minCapacity} – {maxCapacity} t</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-800">
            <span className="text-[10px] text-amber-600 block uppercase font-semibold">Nivel de Confianza</span>
            <span className="font-bold text-sm">80% Confianza</span>
          </div>
        </div>
      </div>

      {/* Chart Visualizer */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#888" fontSize={11} />
            <YAxis stroke="#888" fontSize={11} unit=" t" domain={[0, 32]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

            {/* Range Area Shading */}
            <Area
              type="monotone"
              dataKey="maxRange"
              stroke="none"
              fill="#FDF3EC"
              name="Banda de Rango Probable"
            />

            {/* Projected Curve */}
            <Line
              type="monotone"
              dataKey="proyectado"
              stroke="#D96B27"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: '#D96B27' }}
              name="Curva Proyectada (Esperada)"
            />

            {/* Real Harvest Curve */}
            <Line
              type="monotone"
              dataKey="real"
              stroke="#1E1512"
              strokeWidth={3}
              dot={{ r: 5, fill: '#10B981', stroke: '#1E1512', strokeWidth: 2 }}
              connectNulls={false}
              name="Acopio Real Acumulado"
            />

            {/* Current Shipping Milestone Line */}
            <ReferenceLine x="Semana 5 (Actual)" stroke="#F59E0B" strokeWidth={1.5} label={{ value: "Fecha Actual", fill: "#F59E0B", fontSize: 10, position: "top" }} />
            <ReferenceLine y={24} stroke="#10B981" strokeDasharray="3 3" label={{ value: "Meta Objetivo: 24t", fill: "#10B981", fontSize: 10, position: "right" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Early Warning Banner Integration */}
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-amber-950">Desviación en Semana 5:</span>
            <span className="bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-semibold text-[10px]">
              -4.9 t debajo de curva esperada
            </span>
          </div>
          <p className="mt-1 text-amber-800">
            Causa principal: <strong className="text-amber-950">Lluvia intempestiva SENAMHI (68mm/72h en Uchiza)</strong> afectando el secado natural en marquesinas.
            El volumen proyectado para el embarque del {targetDate} se mantiene en <strong className="text-amber-950">22–27 t (80% confianza)</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload;
    return (
      <div className="bg-[#1E1512] text-white p-3 rounded-xl shadow-xl text-xs border border-amber-900/40">
        <p className="font-bold text-amber-400 mb-1">{label}</p>
        <p className="text-gray-300">
          Acopio Real: <span className="font-bold text-emerald-400">{dataItem.real !== null ? `${dataItem.real} t` : 'Pendiente'}</span>
        </p>
        <p className="text-gray-300">
          Proyectado: <span className="font-bold text-[#D96B27]">{dataItem.proyectado} t</span>
        </p>
        <p className="text-gray-300">
          Rango Probable: <span className="font-bold text-gray-200">{dataItem.minRange} – {dataItem.maxRange} t</span>
        </p>
        {dataItem.status && (
          <div className="mt-2 pt-2 border-t border-gray-700 text-[10px] text-amber-300">
            <span>Estado: {dataItem.status}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
}
