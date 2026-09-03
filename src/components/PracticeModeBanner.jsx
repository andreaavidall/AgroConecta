import React from 'react';
import { Gamepad2, ShieldAlert, Sparkles, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

export default function PracticeModeBanner({ isPracticeMode, onTogglePracticeMode, onResetPracticeData }) {
  if (!isPracticeMode) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white px-4 py-2 shadow-inner border-b border-amber-400 flex items-center justify-between text-xs font-medium animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-2.5 max-w-4xl">
        <div className="p-1 bg-white/20 rounded-md">
          <Gamepad2 className="w-4 h-4 text-amber-100" />
        </div>
        <div>
          <span className="font-black tracking-wide uppercase bg-amber-900/40 px-2 py-0.5 rounded text-[11px] mr-2">Modo Práctica / Capacitación</span>
          <span className="text-amber-100">
            Estás operando en un entorno simulado seguro. Los registros de entregas, lotes y ofertas creados aquí no afectan el inventario ni la contabilidad real de la cooperativa.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onResetPracticeData}
          className="bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition border border-amber-300/30"
          title="Reiniciar datos de práctica"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar Práctica</span>
        </button>
        <button
          onClick={onTogglePracticeMode}
          className="bg-white text-amber-900 hover:bg-amber-100 px-3 py-1 rounded-md text-[11px] font-bold transition shadow-sm"
        >
          Salir de Práctica
        </button>
      </div>
    </div>
  );
}
