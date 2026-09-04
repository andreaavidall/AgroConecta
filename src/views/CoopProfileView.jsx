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
  Sparkles,
  Scale,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import CommitmentCurveChart from '../components/CommitmentCurveChart';
import { UNIFIED_ORDER_METRICS } from '../data/mockData';

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
      
      {/* Contextual Header Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 overflow-x-auto">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer shrink-0"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </button>
          )}
          
          <div className="shrink-0">
            <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#237A57]" />
              {cooperative.name}
            </h2>
            <span className="text-xs text-slate-500">{cooperative.region}</span>
          </div>

          <div className="h-6 w-px bg-slate-200 shrink-0 hidden sm:block"></div>

          {/* Sub-Nav Pills */}
          <div className="flex items-center space-x-1 text-xs font-semibold shrink-0">
            {['resumen', 'capacidad', 'trazabilidad', 'certificados', 'riesgos'].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveSubTab(tabKey)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  activeSubTab === tabKey
                    ? 'bg-[#174C3C] text-amber-300 font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
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
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-2xs border border-slate-300"
          >
            <FileText className="w-4 h-4 text-[#237A57]" />
            <span>Verificar Capacidad (20t)</span>
          </button>

          <button
            onClick={onOpenMakeOffer}
            className="bg-[#237A57] hover:bg-[#174C3C] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Hacer Oferta</span>
          </button>
        </div>
      </div>

      {/* Main Profile Content based on sub-tab */}
      {(activeSubTab === 'resumen' || activeSubTab === 'capacidad') && (
        <>
          {/* Main Profile Grid Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Details & Description */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Acerca de la Organización</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{cooperative.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Socios Productores</span>
                  <span className="font-bold text-sm text-slate-900">{cooperative.membersCount} familias</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Parcelas Registradas</span>
                  <span className="font-bold text-sm text-slate-900">{cooperative.parcelsCount} parcelas</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Trazabilidad Origen</span>
                  <span className="font-bold text-sm text-emerald-700">{cooperative.georeferencedPct}% geolocalizado</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Acopio Campaña 2026</span>
                  <span className="font-bold text-sm text-[#237A57]">17.1 t Registradas</span>
                </div>
              </div>

              {/* Anonymized Producer Family Sectors (Punto 11 Corregido) */}
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-[#237A57]" />
                  <span>Sectores de Productores Socios (Información Anónima Protegida)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cooperative.featuredFamilies.map((fam, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
                      <span className="font-bold text-slate-900 block">{fam.name}</span>
                      <span className="text-[10px] text-slate-500 block">{fam.zone}</span>
                      <div className="flex justify-between text-[10px] pt-1 border-t border-slate-200">
                        <span className="text-slate-600">Área: {fam.parcelArea}</span>
                        <span className="font-bold text-emerald-700">✓ Geolocalizado</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Verified Capacity Breakdown */}
            <div className="bg-[#174C3C] text-white rounded-2xl p-6 border border-emerald-900 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-emerald-800">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Capacidad Respaldada</span>
                  <span className="bg-emerald-950/80 text-amber-300 text-[10px] px-2.5 py-0.5 rounded font-bold border border-emerald-700">
                    Campaña 2026
                  </span>
                </div>

                <div>
                  <span className="text-xs text-emerald-200 block font-medium">Rango de Capacidad Anual</span>
                  <div className="text-3xl font-black text-white mt-1">{cooperative.capacityRange}</div>
                  <p className="text-[11px] text-emerald-200 mt-0.5">Basado en acopio histórico e infraestructura</p>
                </div>

                {/* Independent Verifiable Indicators (Punto 4 Corregido) */}
                <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-700/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Cumplimiento Histórico:</span>
                    <span className="font-bold text-amber-300">4 de 5 campañas (80%)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Riesgo Climático:</span>
                    <span className="font-bold text-amber-400">Medio (Precipitaciones 68mm)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Disponibilidad viable:</span>
                    <span className="font-bold text-white">24/10/2026</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-emerald-800">
                <button
                  onClick={onOpenMakeOffer}
                  className="w-full bg-[#237A57] hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Cotización u Oferta</span>
                </button>
              </div>
            </div>

          </div>

          {/* Commitment Curve Chart */}
          <CommitmentCurveChart data={commitmentCurveData} minCapacity={cooperative.minCapacity} maxCapacity={cooperative.maxCapacity} />
        </>
      )}

      {(activeSubTab === 'resumen' || activeSubTab === 'trazabilidad') && (
        /* Active Lots Traceability Table */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Lotes Activos & Trazabilidad de Origen</h3>
              <p className="text-xs text-slate-500">Selecciona un lote para abrir su línea de tiempo completa y mermas.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                  <th className="p-3">Código Lote</th>
                  <th className="p-3">Etapa Actual</th>
                  <th className="p-3">Variedad</th>
                  <th className="p-3">Peso (kg)</th>
                  <th className="p-3">Humedad %</th>
                  <th className="p-3">Trazabilidad Origen</th>
                  <th className="p-3">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {coopLots.map((lot) => (
                  <tr key={lot.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{lot.id}</td>
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Origen geolocalizado completo</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onOpenLotTraceability(lot)}
                        className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer"
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Certificaciones Oficiales de {cooperative.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cooperative.certifications.map((cert, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {cert.status}
                </span>
                <h4 className="font-bold text-slate-900">{cert.name}</h4>
                <p className="text-xs text-slate-500">Entidad: {cert.entity}</p>
                <p className="text-xs text-slate-500">Válido hasta: {cert.validUntil}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'riesgos' && (
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-3">
          <h3 className="font-bold text-amber-950 text-sm">Evaluación de Factores de Riesgo</h3>
          <p className="text-xs text-amber-900">
            Factor de Riesgo Asociado: <strong>Precipitaciones elevadas de 68mm/72h en Sector Uchiza</strong> restringiendo la capacidad de secado solar.
          </p>
        </div>
      )}

    </div>
  );
}
