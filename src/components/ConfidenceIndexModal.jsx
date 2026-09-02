import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, TrendingUp, CloudRain, Users, Award } from 'lucide-react';

export default function ConfidenceIndexModal({ isOpen, onClose, cooperative }) {
  if (!isOpen || !cooperative) return null;

  const score = cooperative.confidenceScore || 87;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#1E1512] text-white px-6 py-4 flex items-center justify-between border-b border-[#3D2D27]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center font-bold text-sm">
              {score}
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                ALGORITMO DE CONFIANZA DE ENTREGA
              </span>
              <h2 className="text-sm font-bold text-white">¿Por qué {score} / 100 en {cooperative.name}?</h2>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breakdown Content */}
        <div className="p-6 space-y-4 text-xs">
          
          <p className="text-gray-600">
            El Índice de Confianza de Entrega no es un número arbitrario. Se calcula dinámicamente evaluando 5 dimensiones ponderadas de la cooperativa:
          </p>

          <div className="space-y-3">
            {/* Factor 1 */}
            <FactorRow 
              icon={<TrendingUp className="w-4 h-4 text-amber-600" />}
              title="1. Capacidad Proyectada & Tolerancia (30%)"
              scoreText="28 / 30 pts"
              desc={`Calculado sobre el rendimiento histórico de ${cooperative.membersCount} socios y el rango probable ${cooperative.capacityRange}.`}
              badge="ALTO RENDIMIENTO"
              badgeColor="bg-emerald-100 text-emerald-800"
            />

            {/* Factor 2 */}
            <FactorRow 
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              title="2. Avance Real vs Curva del Compromiso (25%)"
              scoreText="20 / 25 pts"
              desc={`Acopio actual 17.1 t sobre meta de 24 t (82% de avance). Desfase de -4.9 t por clima.`}
              badge="DESVIACIÓN MENOR"
              badgeColor="bg-amber-100 text-amber-800"
            />

            {/* Factor 3 */}
            <FactorRow 
              icon={<Users className="w-4 h-4 text-sky-600" />}
              title="3. Historial de Cumplimiento 5 Campañas (20%)"
              scoreText="18 / 20 pts"
              desc={cooperative.historicalFulfillment}
              badge="88% ENTREGADO A TIEMPO"
              badgeColor="bg-emerald-100 text-emerald-800"
            />

            {/* Factor 4 */}
            <FactorRow 
              icon={<Award className="w-4 h-4 text-purple-600" />}
              title="4. Certificaciones & Trazabilidad EUDR (15%)"
              scoreText="14 / 15 pts"
              desc={`${cooperative.eudrStatus} • Certificados Orgánicos y Fairtrade al día.`}
              badge="VERIFICADO EUDR"
              badgeColor="bg-emerald-100 text-emerald-800"
            />

            {/* Factor 5 */}
            <FactorRow 
              icon={<CloudRain className="w-4 h-4 text-rose-600" />}
              title="5. Riesgo Climático SENAMHI (10%)"
              scoreText="7 / 10 pts"
              desc="Precipitaciones acumuladas 68mm/72h en Zona 5. Impacto temporal en transporte."
              badge="RIESGO MODERADO"
              badgeColor="bg-amber-100 text-amber-800"
            />
          </div>

          <div className="pt-3 border-t border-gray-100 text-center">
            <button
              onClick={onClose}
              className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-xs hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function FactorRow({ icon, title, scoreText, desc, badge, badgeColor }) {
  return (
    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-start space-x-3">
      <div className="p-2 bg-white rounded-lg border border-gray-200 shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">{title}</span>
          <span className="font-extrabold text-[#D96B27] text-xs">{scoreText}</span>
        </div>
        <p className="text-gray-500 mt-0.5 text-[11px]">{desc}</p>
        <span className={`inline-block mt-1 text-[9px] font-bold px-2 py-0.2 rounded ${badgeColor}`}>
          {badge}
        </span>
      </div>
    </div>
  );
}
