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
import { AlertTriangle, ShieldCheck, TrendingDown, Info, Calendar } from 'lucide-react';

export default function CommitmentCurveChart({ 
  data = [], 
  minCapacity = 22, 
  maxCapacity = 27, 
  targetDate = "24/10/2026",
  deviationTons = -4.9 
}) {
  // Preparar los datos agregando la propiedad 'range' como arreglo [minRange, maxRange]
  // Esto permite a Recharts renderizar el área sombreada correctamente como una banda de tolerancia (área flotante)
  const chartData = (data || []).map(item => ({
    ...item,
    range: [item.minRange, item.maxRange]
  }));

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      {/* Header Info & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-black text-slate-800">Curva del Compromiso (Campaña 2026)</h3>
            <span className="bg-[#237A57]/10 text-[#237A57] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#237A57]/20">
              CABA MÓDULO 1: CAPACIDAD COMPROMETIBLE
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Proyección continua vs. acopio real acumulado en toneladas (t). Tolerancia probabilística determinística.
          </p>
        </div>

        {/* Commitment KPI Badges */}
        <div className="flex items-center space-x-2 text-xs shrink-0">
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-900">
            <span className="text-[10px] text-emerald-700 block uppercase font-bold tracking-wider">Rango Probable</span>
            <span className="font-extrabold text-sm text-[#174C3C]">{minCapacity} – {maxCapacity} t</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-900">
            <span className="text-[10px] text-amber-700 block uppercase font-bold tracking-wider">Confianza</span>
            <span className="font-extrabold text-sm text-amber-800">80% Confianza</span>
          </div>

          <div className="bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl text-rose-900">
            <span className="text-[10px] text-rose-700 block uppercase font-bold tracking-wider">Desviación Sem 5</span>
            <span className="font-extrabold text-sm text-rose-700 flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" />
              {deviationTons} t
            </span>
          </div>
        </div>
      </div>

      {/* Chart Visualizer */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 15, right: 25, bottom: 5, left: 0 }}>
            <defs>
              {/* Degradado para la Banda de Tolerancia Probabilística */}
              <linearGradient id="rangeBandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#FDE68A" stopOpacity={0.08} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="week" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11} 
              unit=" t" 
              domain={[0, 32]} 
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} 
              iconType="circle"
            />

            {/* Sombra de Banda Probabilística (Tolerancia minRange a maxRange) */}
            <Area
              type="monotone"
              dataKey="range"
              stroke="#F59E0B"
              strokeWidth={1}
              strokeDasharray="3 3"
              fill="url(#rangeBandGradient)"
              name="Banda de Rango Probable (80% Confianza)"
            />

            {/* Curva Proyectada (Esperada) */}
            <Line
              type="monotone"
              dataKey="proyectado"
              stroke="#237A57"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: '#237A57', stroke: '#ffffff', strokeWidth: 2 }}
              name="Curva Proyectada (Esperada)"
            />

            {/* Curva de Acopio Real Acumulado */}
            <Line
              type="monotone"
              dataKey="real"
              stroke="#174C3C"
              strokeWidth={3.5}
              dot={{ r: 6, fill: '#10B981', stroke: '#174C3C', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#059669', stroke: '#ffffff', strokeWidth: 3 }}
              connectNulls={false}
              name="Acopio Real Registrado"
            />

            {/* Líneas de Referencia e Hitos */}
            <ReferenceLine 
              x="Semana 5 (Actual)" 
              stroke="#F59E0B" 
              strokeWidth={2} 
              strokeDasharray="2 2"
              label={{ value: "Semana Actual (Lluvia)", fill: "#D97706", fontSize: 10, position: "top", fontWeight: "bold" }} 
            />
            <ReferenceLine 
              y={24} 
              stroke="#10B981" 
              strokeWidth={1.5} 
              strokeDasharray="4 4" 
              label={{ value: "Meta Embarque: 24 t", fill: "#047857", fontSize: 11, position: "right", fontWeight: "bold" }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Early Warning Banner Integration */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-amber-950 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900">Alerta de Avance — Semana 5:</span>
            <span className="bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md font-bold text-[10px]">
              -4.9 t debajo de la proyección semanal
            </span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <strong>Causa principal:</strong> Precipitaciones de 68 mm en 72h (Sector Uchiza) que retrasan el secado solar en marquesina. La capacidad probable acumulada al {targetDate} se mantiene firme en <strong className="text-[#174C3C]">22–27 t (80% confianza)</strong>.
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
      <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1.5 min-w-[200px]">
        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
          <span className="font-extrabold text-amber-400">{label}</span>
          {dataItem.status && (
            <span className="bg-slate-800 text-slate-300 text-[9px] px-1.5 py-0.5 rounded font-mono">
              {dataItem.status}
            </span>
          )}
        </div>

        <div className="space-y-1 pt-0.5 text-slate-200">
          <div className="flex justify-between items-center">
            <span>Acopio Real:</span>
            <span className="font-black text-emerald-400 text-sm">
              {dataItem.real !== null ? `${dataItem.real} t` : 'Pendiente'}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span>Proyección Esperada:</span>
            <span className="font-bold text-amber-300">{dataItem.proyectado} t</span>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            <span>Banda Tolerancia (80%):</span>
            <span className="font-semibold text-slate-200">{dataItem.minRange} – {dataItem.maxRange} t</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
