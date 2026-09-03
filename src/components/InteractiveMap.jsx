import React, { useState } from 'react';
import { MapPin, Eye, EyeOff, ShieldCheck, Lock, Info } from 'lucide-react';

export default function InteractiveMap({ cooperatives, onSelectCoop, userRole = 'coop' }) {
  const [showExactCoords, setShowExactCoords] = useState(userRole === 'coop');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
      
      {/* Privacy Control Bar (Sección 22 & P0-11) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F6F8F5] p-3.5 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#237A57]" />
          <div>
            <span className="font-bold text-slate-800">
              Filtro de Privacidad de Ubicación EUDR: {showExactCoords ? "Polígonos Exactos (Vista Interna)" : "Zonas Aproximadas (Vista Pública Comprador)"}
            </span>
            <p className="text-slate-500 text-[11px]">
              {showExactCoords
                ? "Mostrando coordenadas GPS reales de parcelas autorizadas para auditoría."
                : "Las ubicaciones públicas están difuminadas por zona comunitaria para proteger la privacidad del productor."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowExactCoords(!showExactCoords)}
          className="bg-white hover:bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs shrink-0"
        >
          {showExactCoords ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5 text-[#237A57]" />}
          <span>{showExactCoords ? "Ocultar Coordenadas Exactas" : "Mostrar Polígonos Exactos"}</span>
        </button>
      </div>

      {/* Simulated Map Visual Canvas */}
      <div className="relative w-full h-80 bg-emerald-950/90 rounded-xl overflow-hidden flex items-center justify-center border border-emerald-900 shadow-inner">
        {/* Map Background Grid Simulation */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#237A57_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Map Markers */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
          {cooperatives.map((coop) => (
            <div
              key={coop.id}
              onClick={() => onSelectCoop(coop)}
              className="bg-slate-900/80 backdrop-blur-md text-white p-4 rounded-xl border border-emerald-500/40 hover:border-amber-400 transition cursor-pointer space-y-2 group shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {coop.province}
                </span>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {coop.eudrStatus}
                </span>
              </div>

              <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                {coop.name}
              </h4>

              <div className="text-[11px] text-slate-300 font-mono">
                {showExactCoords ? (
                  <span className="text-emerald-300 font-bold">GPS: {coop.coordinates.lat}, {coop.coordinates.lng}</span>
                ) : (
                  <span className="text-slate-400">Comunidad: {coop.region} (Aproximado)</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 text-white px-3 py-1.5 rounded-lg text-[10px] font-mono border border-slate-700">
          ● Capa Geográfica EUDR (San Martín / Cusco / Amazonas)
        </div>
      </div>

    </div>
  );
}
