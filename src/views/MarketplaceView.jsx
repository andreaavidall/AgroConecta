import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ArrowRight,
  Plus,
  Scale,
  X,
  LayoutGrid,
  ListFilter,
  Check,
  Sparkles,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function MarketplaceView({ 
  cooperatives = [], 
  onSelectCoop, 
  onOpenMakeOffer,
  onOpenConfidenceModal,
  selectedForCompare = [],
  onToggleCompare,
  onOpenCompareView,
  onClearCompare
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [filterVariety, setFilterVariety] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterCert, setFilterCert] = useState('');
  const [filterMinConfidence, setFilterMinConfidence] = useState(70);
  const [sortBy, setSortBy] = useState('recommendation'); // 'recommendation' | 'capacity' | 'confidence' | 'risk'

  // Filter logic
  let filteredCoops = cooperatives.filter(c => {
    if (filterVariety && !c.variety.toLowerCase().includes(filterVariety.toLowerCase())) return false;
    if (filterRegion && !c.region.toLowerCase().includes(filterRegion.toLowerCase())) return false;
    if (filterCert && !c.certifications.some(cert => cert.name.toLowerCase().includes(filterCert.toLowerCase()))) return false;
    if (c.confidenceScore < filterMinConfidence) return false;
    return true;
  });

  // Sorting logic
  if (sortBy === 'capacity') {
    filteredCoops.sort((a, b) => b.maxCapacity - a.maxCapacity);
  } else if (sortBy === 'confidence') {
    filteredCoops.sort((a, b) => b.confidenceScore - a.confidenceScore);
  } else if (sortBy === 'risk') {
    filteredCoops.sort((a, b) => (a.riskLevel === 'low' ? -1 : 1));
  }

  return (
    <div className="space-y-6 pb-24 font-sans">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1E1512]">Vitrina de Inteligencia & Sourcing Agroexportador</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Explora proveedores de cacao peruano evaluados por capacidad probada, confianza de entrega (80-100) e impacto climático SENAMHI.
          </p>
        </div>

        {/* Grid vs List View Mode Toggle */}
        <div className="bg-[#1E1512] p-1 rounded-xl flex items-center space-x-1 text-xs text-white shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              viewMode === 'grid' ? 'bg-[#D96B27] text-white shadow-sm' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vista Tarjetas</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              viewMode === 'list' ? 'bg-[#D96B27] text-white shadow-sm' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lista Analítica</span>
          </button>
        </div>
      </div>

      {/* Advanced Filter Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#EFECE6] shadow-sm flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center space-x-2 text-gray-700 font-bold">
          <SlidersHorizontal className="w-4 h-4 text-[#D96B27]" />
          <span>Filtros Estratégicos:</span>
        </div>

        <div className="flex-1 min-w-[140px]">
          <select
            value={filterVariety}
            onChange={(e) => setFilterVariety(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 font-semibold text-gray-800 focus:outline-none focus:border-[#D96B27]"
          >
            <option value="">Todas las variedades</option>
            <option value="CCN-51">CCN-51</option>
            <option value="Chuncho">Chuncho Nativo</option>
            <option value="Nativo">Nativo Fino de Aroma</option>
            <option value="Criollo">Criollo Amazónico</option>
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 font-semibold text-gray-800 focus:outline-none focus:border-[#D96B27]"
          >
            <option value="">Todas las regiones</option>
            <option value="San Martín">San Martín</option>
            <option value="Cusco">Cusco (La Convención)</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Junín">Junín (Satipo)</option>
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <select
            value={filterCert}
            onChange={(e) => setFilterCert(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 font-semibold text-gray-800 focus:outline-none focus:border-[#D96B27]"
          >
            <option value="">Cualquier certificación</option>
            <option value="Orgánico UE">Orgánico UE</option>
            <option value="Fairtrade">Fairtrade / Comercio Justo</option>
            <option value="SENASA">SENASA Fitosanitario</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
          <span className="text-gray-500 font-medium">Confianza Mín:</span>
          <input
            type="range"
            min="60"
            max="95"
            value={filterMinConfidence}
            onChange={(e) => setFilterMinConfidence(Number(e.target.value))}
            className="w-20 accent-[#D96B27]"
          />
          <span className="font-bold text-[#D96B27]">{filterMinConfidence}%</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-400 font-medium">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl p-2 font-bold text-gray-800 focus:outline-none"
          >
            <option value="recommendation">Recomendación AgroConecta</option>
            <option value="capacity">Mayor Capacidad</option>
            <option value="confidence">Mayor Confianza</option>
            <option value="risk">Menor Riesgo</option>
          </select>
        </div>
      </div>

      {/* CONTEXTUAL RESULTS SUMMARY STRIP */}
      <div className="bg-[#1E1512] text-white px-5 py-3 rounded-2xl border border-[#3D2D27] flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#D96B27]" />
          <span className="font-bold">
            Mostrando {filteredCoops.length} cooperativas compatibles
          </span>
          <span className="text-amber-200/60 font-normal">
            • Capacidad disponible: 90–112 t contratables esta campaña
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
            3 Confianza Alta (&gt;80%)
          </span>
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
            2 Aptas para Paquete 50 t
          </span>
        </div>
      </div>

      {/* GRID VIEW MODE */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoops.map((coop, idx) => {
            const isCompared = selectedForCompare.some(c => c.id === coop.id);
            const matchScore = idx === 0 ? 94 : idx === 1 ? 89 : idx === 2 ? 84 : 79;

            return (
              <div 
                key={coop.id}
                className={`bg-white rounded-3xl p-6 border shadow-sm transition-all flex flex-col justify-between space-y-4 ${
                  isCompared ? 'border-[#D96B27] ring-2 ring-[#D96B27]/30' : 'border-[#EFECE6] hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{matchScore}% Match Comercial</span>
                    </span>
                    <span className="text-xs font-semibold text-gray-400 font-mono">{coop.region}</span>
                  </div>

                  <div>
                    <h3 className="font-black text-base text-[#1E1512]">{coop.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{coop.description}</p>
                  </div>

                  {/* Metrics Box */}
                  <div className="bg-[#FBF9F5] p-3.5 rounded-2xl border border-[#EFECE6] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">Capacidad Comprometible:</span>
                      <span className="font-black text-sm text-[#D96B27]">{coop.capacityRange}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">Confianza de Entrega:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {coop.confidenceScore || 85}%
                        </span>
                        {onOpenConfidenceModal && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenConfidenceModal(coop);
                            }}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-300 transition flex items-center gap-1 cursor-pointer"
                            title="Ver desglose de factores de confianza (Clima, Ruta, Acopio, etc.)"
                          >
                            <Info className="w-3 h-3 text-amber-700" />
                            <span>Factores</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">Variedad / Fino %:</span>
                      <span className="font-bold text-gray-900">{coop.variety} ({coop.fineAromaPct}%)</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">Riesgo SENAMHI:</span>
                      <span className={`font-bold ${coop.riskLevel === 'medium' ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {coop.currentRisk}
                      </span>
                    </div>
                  </div>

                  {/* Certifications Badges */}
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Certificaciones:</span>
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {coop.certifications.map((cert, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                          {cert.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendation Note */}
                  <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-xs">
                    <span className="font-bold text-amber-950 block text-[11px]">Recomendación AgroConecta:</span>
                    <p className="text-amber-900 mt-0.5 text-[11px] leading-tight">
                      Recomendada para pedidos de 20–27 t con alta trazabilidad y trazabilidad GPS EUDR.
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <label className="flex items-center space-x-1.5 text-xs text-gray-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => onToggleCompare(coop)}
                      className="accent-[#D96B27] rounded w-4 h-4"
                    />
                    <span className="font-bold">Comparar</span>
                  </label>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectCoop(coop)}
                      className="bg-[#1E1512] hover:bg-[#3D2D27] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Ver Perfil
                    </button>

                    <button
                      onClick={() => onOpenMakeOffer(coop)}
                      className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Hacer Oferta
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ANALYTIC LIST VIEW MODE */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Comparar</th>
                  <th className="p-4">Cooperativa / Región</th>
                  <th className="p-4">Match %</th>
                  <th className="p-4">Capacidad Comprometible</th>
                  <th className="p-4">Confianza</th>
                  <th className="p-4">Variedad & Fino</th>
                  <th className="p-4">Riesgo SENAMHI</th>
                  <th className="p-4">Certificados</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {filteredCoops.map((coop, idx) => {
                  const isCompared = selectedForCompare.some(c => c.id === coop.id);
                  const matchScore = idx === 0 ? 94 : idx === 1 ? 89 : idx === 2 ? 84 : 79;

                  return (
                    <tr key={coop.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => onToggleCompare(coop)}
                          className="accent-[#D96B27] rounded w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-4">
                        <span className="font-extrabold text-[#1E1512] block text-sm">{coop.name}</span>
                        <span className="text-[11px] text-gray-400">{coop.region}</span>
                      </td>
                      <td className="p-4 font-bold text-emerald-700">{matchScore}% Match</td>
                      <td className="p-4 font-black text-[#D96B27] text-sm">{coop.capacityRange}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-emerald-700">{coop.confidenceScore || 85}%</span>
                          {onOpenConfidenceModal && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenConfidenceModal(coop);
                              }}
                              className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-300 transition flex items-center gap-1 cursor-pointer"
                              title="Ver desglose de factores de confianza"
                            >
                              <Info className="w-3 h-3 text-amber-700" />
                              <span>Factores</span>
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-4">{coop.variety} ({coop.fineAromaPct}%)</td>
                      <td className="p-4">
                        <span className={`font-bold ${coop.riskLevel === 'medium' ? 'text-amber-600' : 'text-emerald-700'}`}>
                          {coop.currentRisk}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {coop.certifications.map((c, i) => (
                            <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold">
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => onSelectCoop(coop)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer"
                        >
                          Perfil
                        </button>
                        <button
                          onClick={() => onOpenMakeOffer(coop)}
                          className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer shadow-sm"
                        >
                          Ofertar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTEXTUAL BOTTOM FLOATING COMPARISON BAR */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#1E1512] text-white p-4 rounded-2xl shadow-2xl border border-[#3D2D27] flex items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-amber-400 block text-xs">
                {selectedForCompare.length} {selectedForCompare.length === 1 ? 'cooperativa seleccionada' : 'cooperativas seleccionadas para comparación'}
              </span>
              <p className="text-gray-300 text-[11px] truncate max-w-sm">
                {selectedForCompare.length === 1 
                  ? 'Selecciona al menos otra cooperativa para comparar lado a lado.' 
                  : selectedForCompare.map(c => c.name).join(' vs ')}
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={onClearCompare}
                className="text-gray-400 hover:text-white px-2 py-1 cursor-pointer font-medium"
              >
                Limpiar
              </button>

              {selectedForCompare.length >= 2 && (
                <button
                  onClick={onOpenCompareView}
                  className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-4 py-2 rounded-xl font-bold flex items-center space-x-1.5 cursor-pointer shadow-md transition-all"
                >
                  <span>Comparar ahora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
