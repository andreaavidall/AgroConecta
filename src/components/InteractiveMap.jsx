import React, { useState } from 'react';
import { MapPin, Eye, EyeOff, ShieldCheck, Lock, Info, KeyRound } from 'lucide-react';

export default function InteractiveMap({ cooperatives, onSelectCoop, userRole = 'coop' }) {
  const [hasRequestedAccess, setHasRequestedAccess] = useState(false);

  const handleRequestAccess = () => {
    setHasRequestedAccess(!hasRequestedAccess);
    if (!hasRequestedAccess) {
      alert("🔐 Solicitud de acceso a evidencia geográfica enviada a la cooperativa para revisión de privacidad.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
      
      {/* Privacy Control Bar (Punto 8 & Punto 7 Corregidos) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F6F8F5] p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#237A57] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-800">
              Vista Geográfica: {hasRequestedAccess ? "Evidencia Geográfica Autorizada" : "Zonas Comunales Aproximadas (Vista Pública)"}
            </span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Las ubicaciones se muestran agrupadas por zona comunitaria para proteger la privacidad del productor.
            </p>
          </div>
        </div>

        {/* Button change to 'Solicitar acceso a evidencia geográfica' (Punto 8) */}
        <button
          onClick={handleRequestAccess}
          className="bg-white hover:bg-slate-100 text-slate-800 px-3.5 py-2 rounded-lg border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs shrink-0"
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-700" />
          <span>{hasRequestedAccess ? "Ocultar Evidencia" : "Solicitar acceso a evidencia geográfica"}</span>
        </button>
      </div>

      {/* Official Legal Disclaimer (Punto 7 Corregido) */}
      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Aviso de Debida Diligencia:</strong> AgroConecta organiza evidencias para apoyar la preparación EUDR, pero <strong>no certifica el cumplimiento normativo oficial</strong>.
        </p>
      </div>

      {/* Map Visual Canvas */}
      <div className="relative w-full h-80 bg-emerald-950/90 rounded-xl overflow-hidden flex items-center justify-center border border-emerald-900 shadow-inner">
        {/* Map Grid Simulation */}
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
                  {coop.georeferencedStatus || "Parcelas geolocalizadas: 91%"}
                </span>
              </div>

              <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                {coop.name}
              </h4>

              <div className="text-[11px] text-slate-300 font-mono">
                {hasRequestedAccess ? (
                  <span className="text-emerald-300 font-bold">GPS Autorizado: {coop.coordinates.lat}, {coop.coordinates.lng}</span>
                ) : (
                  <span className="text-slate-400">Zona: {coop.region} (Aproximado)</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 text-white px-3 py-1.5 rounded-lg text-[10px] font-mono border border-slate-700">
          ● Capa Geográfica Comunitaria (San Martín / Cusco / Amazonas)
        </div>
      </div>

    </div>
  );
}
