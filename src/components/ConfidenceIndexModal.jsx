import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, TrendingUp, CloudRain, Users, Award, Truck, MapPin, Info } from 'lucide-react';

export default function ConfidenceIndexModal({ isOpen, onClose, cooperative }) {
  if (!isOpen || !cooperative) return null;

  const score = cooperative.confidenceScore || 85;

  const defaultFactors = [
    {
      icon: <CloudRain className="w-4 h-4 text-sky-600" />,
      title: "1. Riesgo Climático SENAMHI (20%)",
      scoreText: cooperative.confidenceFactors?.climateScore || (cooperative.id === 'coop-valle-verde' ? "17 / 20 pts" : "20 / 20 pts"),
      desc: cooperative.id === 'coop-valle-verde' 
        ? "Precipitaciones acumuladas de 68mm/72h en Sector Uchiza que retrasan moderadamente el secado solar en marquesinas."
        : "Condiciones meteorológicas estables y secado solar continuo sin alertas de precipitaciones elevadas.",
      badge: cooperative.id === 'coop-valle-verde' ? "ANOMALÍA PLUVIOMÉTRICA (RIESGO MEDIO)" : "CLIMA ÓPTIMO EN ORIGEN",
      badgeColor: cooperative.id === 'coop-valle-verde' ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-emerald-100 text-emerald-800 border border-emerald-300"
    },
    {
      icon: <Truck className="w-4 h-4 text-emerald-600" />,
      title: "2. Estado de Ruta & Red Logística (20%)",
      scoreText: cooperative.confidenceFactors?.routeLogisticsScore || "18 / 20 pts",
      desc: "Vía terrestre Tocache → Puerto Callao habilitada sin bloqueos. Camiones con guía remisión electrónica y seguimiento GPS.",
      badge: "TRANSITABILIDAD FLUIDA",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300"
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-amber-600" />,
      title: "3. Avance de Acopio vs Curva de Compromiso (25%)",
      scoreText: cooperative.confidenceFactors?.collectionProgressScore || "22 / 25 pts",
      desc: `Acopio registrado de ${((cooperative.currentCollectionKg || 17100)/1000).toFixed(1)} t. Grano seco en almacén respaldando disponibilidad hoy y fecha futura.`,
      badge: "COBERTURA RESPALDADA",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300"
    },
    {
      icon: <Award className="w-4 h-4 text-purple-600" />,
      title: "4. Historial de Cumplimiento de Campañas (15%)",
      scoreText: cooperative.confidenceFactors?.historicalFulfillmentScore || "14 / 15 pts",
      desc: `Desempeño verificado: ${cooperative.historicalFulfillment || '4 de 5 campañas cumplidas (80%)'} con entregas a tiempo.`,
      badge: "HISTORIAL VERIFICADO",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300"
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#237A57]" />,
      title: "5. Trazabilidad & Evidencia EUDR (20%)",
      scoreText: cooperative.confidenceFactors?.eudrTraceabilityScore || "14 / 20 pts",
      desc: `${cooperative.georeferencedStatus || 'Parcelas geolocalizadas: 91%'}. Certificados Orgánico UE y Fairtrade vigentes.`,
      badge: "CUMPLIMIENTO EUDR OK",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Header */}
        <div className="bg-[#1E1512] text-white p-6 flex items-center justify-between border-b border-[#3D2D27]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center font-black text-lg shadow-inner">
              {score}%
            </div>
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                ALGORITMO DE CONFIANZA DE ENTREGA
              </span>
              <h2 className="text-base font-black text-white">Factores de Cálculo: {cooperative.name}</h2>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breakdown Content */}
        <div className="p-6 space-y-4 text-xs bg-[#FBF9F5] max-h-[75vh] overflow-y-auto">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#237A57]" />
              <span>Puntaje Total Consolidado: <strong className="text-emerald-700 font-extrabold">{score} / 100 pts</strong></span>
            </h3>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              El Índice de Confianza evalúa 5 factores críticos en tiempo real: impacto climático SENAMHI, transitabilidad de ruta, avance de acopio, historial de entrega y geolocalización EUDR.
            </p>
          </div>

          <div className="space-y-3">
            {defaultFactors.map((factor, idx) => (
              <FactorRow 
                key={idx}
                icon={factor.icon}
                title={factor.title}
                scoreText={factor.scoreText}
                desc={factor.desc}
                badge={factor.badge}
                badgeColor={factor.badgeColor}
              />
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium italic">Ponderación matemática actualizada automáticamente</span>
          <button
            onClick={onClose}
            className="bg-[#1E1512] hover:bg-[#3D2D27] text-white px-6 py-2 rounded-xl font-bold text-xs transition cursor-pointer"
          >
            Cerrar Detalle
          </button>
        </div>

      </div>
    </div>
  );
}

function FactorRow({ icon, title, scoreText, desc, badge, badgeColor }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3 hover:border-emerald-500/50 transition">
      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <span className="font-extrabold text-slate-900 text-xs">{title}</span>
          <span className="font-black text-[#D96B27] text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{scoreText}</span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">{desc}</p>
        <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-md ${badgeColor}`}>
          {badge}
        </span>
      </div>
    </div>
  );
}

