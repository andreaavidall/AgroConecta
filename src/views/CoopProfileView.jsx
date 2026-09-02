import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Users, 
  FileText, 
  QrCode, 
  ArrowLeft, 
  Send,
  CloudRain,
  Layers,
  Sparkles
} from 'lucide-react';
import CommitmentCurveChart from '../components/CommitmentCurveChart';

export default function CoopProfileView({ 
  cooperative, 
  lots = [], 
  commitmentCurveData = [], 
  onBack, 
  onOpenMakeOffer,
  onOpenCommitmentReport,
  onOpenConfidenceModal,
  onOpenLotTraceability
}) {
  const [activeSubTab, setActiveSubTab] = useState('resumen'); // 'resumen' | 'capacidad' | 'trazabilidad' | 'certificados' | 'riesgos'

  if (!cooperative) return null;

  const coopLots = lots.filter(l => l.coopId === cooperative.id || l.coopName === cooperative.name);

  return (
    <div className="space-y-6 pb-12">
      
      {/* CONTEXTUAL SUB-NAV BAR (SPEC 20) */}
      <div className="bg-white border-b border-[#EFECE6] p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 overflow-x-auto">
          <button
            onClick={onBack}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </button>
          
          <div className="shrink-0">
            <h2 className="font-extrabold text-sm text-[#1E1512]">{cooperative.name}</h2>
            <span className="text-[10px] text-gray-500 font-semibold">{cooperative.region}</span>
          </div>

          <div className="h-6 w-px bg-gray-200 shrink-0"></div>

          {/* Sub-Nav Pills */}
          <div className="flex items-center space-x-1 text-xs font-semibold shrink-0">
            {['resumen', 'capacidad', 'trazabilidad', 'certificados', 'riesgos'].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveSubTab(tabKey)}
                className={`px-3 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
                  activeSubTab === tabKey
                    ? 'bg-[#1E1512] text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tabKey}
              </button>
            ))}
          </div>
        </div>

        {/* Contextual Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenCommitmentReport}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#D96B27]" />
            <span>Generar reporte</span>
          </button>

          <button
            onClick={onOpenMakeOffer}
            className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hacer oferta</span>
          </button>
        </div>
      </div>

      {/* Main Profile Content based on sub-tab */}
      {(activeSubTab === 'resumen' || activeSubTab === 'capacidad') && (
        <>
          {/* Main Profile Grid Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Details & Description */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#EFECE6] shadow-sm space-y-4">
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Acerca de la Cooperativa</h2>
                <p className="text-xs text-gray-600 leading-relaxed">{cooperative.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 block font-semibold">Socios Productores</span>
                  <span className="font-bold text-sm text-gray-900">{cooperative.membersCount} familias</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 block font-semibold">Parcelas Georreferenciadas</span>
                  <span className="font-bold text-sm text-gray-900">{cooperative.parcelsCount} parcelas</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 block font-semibold">Cumplimiento EUDR</span>
                  <span className="font-bold text-sm text-emerald-700">{cooperative.georeferencedPct}% GPS</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 block font-semibold">Campaña 2026</span>
                  <span className="font-bold text-sm text-[#D96B27]">17.1 t Acopiadas</span>
                </div>
              </div>

              {/* Featured Producer Families */}
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-[#D96B27]" />
                  <span>Familias Productoras Destacadas en Origen</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cooperative.featuredFamilies.map((fam, idx) => (
                    <div key={idx} className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 space-y-1 text-xs">
                      <span className="font-bold text-gray-900 block">{fam.name}</span>
                      <span className="text-[10px] text-gray-500 block">{fam.zone}</span>
                      <div className="flex justify-between text-[10px] pt-1 border-t border-amber-200/50">
                        <span className="text-amber-800 font-medium">{fam.generations}</span>
                        <span className="font-bold text-emerald-700">{fam.parcelArea}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Commitment & Action Sidebar */}
            <div className="bg-[#1E1512] text-white rounded-2xl p-6 border border-[#3D2D27] shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#3D2D27]">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">CAPACIDAD COMPROMETIBLE</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold">
                    80% Confianza
                  </span>
                </div>

                <div>
                  <span className="text-xs text-amber-200/70 block font-medium">Capacidad Comprometible Proyectada</span>
                  <div className="text-3xl font-black text-white mt-1">{cooperative.capacityRange}</div>
                  <p className="text-[11px] text-amber-200/60 mt-0.5">{cooperative.confidenceLevelText}</p>
                </div>

                <div className="bg-[#2A1E1A] p-3.5 rounded-xl border border-[#4A3831] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-amber-200/70">Confianza de Entrega:</span>
                    <button
                      onClick={onOpenConfidenceModal}
                      className="font-bold text-emerald-400 hover:underline cursor-pointer flex items-center space-x-1"
                    >
                      <span>{cooperative.confidenceScore} / 100</span>
                      <span className="text-[9px] text-amber-300">¿Por qué?</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-amber-200/70">Riesgo Climático SENAMHI:</span>
                    <span className="font-bold text-amber-400">{cooperative.currentRisk}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-amber-200/70">Disponibilidad Estimada:</span>
                    <span className="font-bold text-white">{cooperative.availableDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#3D2D27]">
                <button
                  onClick={onOpenMakeOffer}
                  className="w-full bg-[#D96B27] hover:bg-[#C05A19] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Hacer Oferta de Compra</span>
                </button>
              </div>
            </div>

          </div>

          {/* Module 1 Commitment Curve Chart */}
          <CommitmentCurveChart data={commitmentCurveData} minCapacity={cooperative.minCapacity} maxCapacity={cooperative.maxCapacity} />
        </>
      )}

      {(activeSubTab === 'resumen' || activeSubTab === 'trazabilidad') && (
        /* Active Lots Traceability Table */
        <div className="bg-white rounded-2xl p-6 border border-[#EFECE6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#1E1512]">Lotes Activos & Trazabilidad de Origen</h3>
              <p className="text-xs text-gray-500">Selecciona un lote para abrir su línea de tiempo completa y evidencia fotográfica.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold">
                  <th className="p-3">Código Lote</th>
                  <th className="p-3">Etapa Actual</th>
                  <th className="p-3">Variedad</th>
                  <th className="p-3">Peso (kg)</th>
                  <th className="p-3">Humedad %</th>
                  <th className="p-3">Estado Trazabilidad</th>
                  <th className="p-3">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {coopLots.map((lot) => (
                  <tr key={lot.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-[#1E1512]">{lot.id}</td>
                    <td className="p-3">
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {lot.stage}
                      </span>
                    </td>
                    <td className="p-3">{lot.variety}</td>
                    <td className="p-3 font-bold">{lot.weightKg.toLocaleString()} kg</td>
                    <td className="p-3 text-emerald-700 font-bold">{lot.moisturePct}%</td>
                    <td className="p-3">
                      <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{lot.eudrVerified ? '100% EUDR GPS' : 'Parcial'}</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onOpenLotTraceability(lot)}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer"
                      >
                        Ver Trazabilidad
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'certificados' && (
        <div className="bg-white p-6 rounded-2xl border border-[#EFECE6] space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Certificaciones Oficiales de {cooperative.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cooperative.certifications.map((cert, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {cert.status}
                </span>
                <h4 className="font-bold text-gray-900">{cert.name}</h4>
                <p className="text-xs text-gray-500">Entidad: {cert.entity}</p>
                <p className="text-xs text-gray-500">Válido hasta: {cert.validUntil}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'riesgos' && (
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-3">
          <h3 className="font-bold text-amber-950 text-sm">Evaluación de Riesgos de Entrega</h3>
          <p className="text-xs text-amber-900">
            Riesgo Climático Actual: <strong>{cooperative.currentRisk}</strong> (SENAMHI Lluvia 68mm/72h en Uchiza).
          </p>
        </div>
      )}

    </div>
  );
}
