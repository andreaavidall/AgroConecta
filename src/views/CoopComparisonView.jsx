import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Send, 
  Sparkles,
  Layers,
  X,
  Info
} from 'lucide-react';

export default function CoopComparisonView({ 
  selectedCoops = [], 
  onBackToMarketplace, 
  onOpenMakeOffer,
  onRemoveFromCompare,
  onOpenJointReport,
  onOpenConfidenceModal
}) {
  if (selectedCoops.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl text-center space-y-4 border border-[#EFECE6] max-w-lg mx-auto my-12 shadow-sm">
        <h2 className="text-xl font-black text-[#1E1512]">No hay cooperativas seleccionadas</h2>
        <p className="text-sm text-gray-600">Selecciona 2 o más cooperativas en la Vitrina para abrir la matriz de comparación estratégica.</p>
        <button
          onClick={onBackToMarketplace}
          className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer shadow-md"
        >
          Ir a la Vitrina de Ofertas
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* Header & Back Action */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToMarketplace}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            title="Volver a la Vitrina"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1E1512]">Comparador Estratégico de Proveedores</h1>
            <p className="text-sm text-gray-600 mt-0.5">Evaluación matricial de capacidad comprometible, confianza de entrega y riesgo climático SENAMHI.</p>
          </div>
        </div>
      </div>

      {/* AUTOMATIC AI SYSTEM CONCLUSION BOX */}
      <div className="bg-[#1E1512] text-white p-6 rounded-3xl border border-[#3D2D27] shadow-lg space-y-3">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-6 h-6 text-[#D96B27]" />
          <h3 className="font-black text-base sm:text-lg text-white">Dictamen Comercial AgroConecta</h3>
        </div>
        <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
          {selectedCoops.length >= 2 ? (
            <>
              <strong>Dictamen:</strong> Para pedidos individuales de 20–25 t, <strong className="text-amber-400">{selectedCoops[0]?.name}</strong> ofrece la mayor confianza de entrega ({selectedCoops[0]?.confidenceScore}%) y trazabilidad 91% GPS. Para pedidos grandes que requieran mayor volumen (35+ t) o perfil Chuncho Nativo, <strong className="text-amber-400">{selectedCoops[1]?.name || 'Bosque Andino'}</strong> es la mejor alternativa. Para cubrir 50 t+, se recomienda un <strong>Paquete de Cobertura Conjunta</strong>.
            </>
          ) : (
            'Selecciona al menos 2 cooperativas para generar el análisis comparativo completo.'
          )}
        </p>
      </div>

      {/* COMPARISON MATRIX TABLE */}
      <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#1E1512] text-white">
                <th className="p-4 sm:p-5 w-60 font-extrabold text-sm sm:text-base border-r border-[#3D2D27]">Criterio de Evaluación</th>
                {selectedCoops.map((coop) => (
                  <th key={coop.id} className="p-4 sm:p-5 min-w-[260px] border-r border-[#3D2D27] relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-black text-base sm:text-lg block text-amber-400">{coop.name}</span>
                        <span className="text-xs text-gray-300 block font-normal mt-0.5">{coop.region}</span>
                      </div>
                      <button
                        onClick={() => onRemoveFromCompare(coop.id)}
                        className="text-gray-400 hover:text-white p-1 cursor-pointer transition-colors"
                        title="Quitar de comparación"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              
              {/* Capacidad Comprometible */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Capacidad Comprometible Proyectada</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 font-black text-lg text-[#D96B27] border-r border-gray-100">
                    {c.capacityRange}
                  </td>
                ))}
              </tr>

              {/* Confianza de Entrega */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Score Confianza de Entrega</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 border-r border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {c.confidenceScore || 85}%
                      </span>
                      {onOpenConfidenceModal && (
                        <button
                          onClick={() => onOpenConfidenceModal(c)}
                          className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-amber-300 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          title="Ver factores de cálculo (Clima, Ruta, Acopio, etc.)"
                        >
                          <Info className="w-3.5 h-3.5 text-amber-700" />
                          <span>Factores</span>
                        </button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Variedad Principal & Fino % */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Variedad & % Fino de Aroma</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 text-gray-900 border-r border-gray-100">
                    <span className="font-extrabold block text-sm sm:text-base text-gray-900">{c.variety}</span>
                    <span className="text-xs text-gray-500 block font-medium mt-0.5">{c.fineAromaPct}% Fino de Aroma</span>
                  </td>
                ))}
              </tr>

              {/* Historial 5 Años */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Historial de Cumplimiento (5 años)</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 text-gray-800 border-r border-gray-100">
                    <span className="font-extrabold text-sm sm:text-base text-slate-800">{c.historicalFulfillment}</span>
                  </td>
                ))}
              </tr>

              {/* Riesgo SENAMHI */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Riesgo Climático SENAMHI</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 border-r border-gray-100">
                    <span className={`font-black text-sm sm:text-base ${c.riskLevel === 'medium' ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {c.currentRisk}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Certificaciones */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Certificaciones Vigentes</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 border-r border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {c.certifications.map((cert, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md font-bold text-xs">
                          {cert.name}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Trazabilidad EUDR */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Trazabilidad & Geolocalización</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 text-emerald-700 font-extrabold text-sm sm:text-base border-r border-gray-100">
                    {c.georeferencedPct}% GPS <span className="text-xs text-gray-500 font-medium">({c.parcelsCount} parcelas)</span>
                  </td>
                ))}
              </tr>

              {/* MEJOR USO SUGERIDO */}
              <tr className="bg-amber-50/70">
                <td className="p-4 sm:p-5 font-extrabold text-amber-950 text-sm sm:text-base">Mejor Uso Sugerido</td>
                {selectedCoops.map((c, idx) => (
                  <td key={c.id} className="p-4 sm:p-5 border-r border-amber-200/80 text-amber-900 font-semibold text-xs sm:text-sm leading-relaxed">
                    {idx === 0 
                      ? 'Ideal para pedidos de 20–25 t con foco en trazabilidad y contratos cerrados.'
                      : 'Ideal para pedidos de mayor volumen (35+ t) o perfil sensorial Chuncho premiado.'}
                  </td>
                ))}
              </tr>

              {/* Acciones por Cooperativa */}
              <tr>
                <td className="p-4 sm:p-5 font-bold bg-gray-50/80 text-gray-800">Acciones Recomendadas</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 sm:p-5 border-r border-gray-100">
                    <button
                      onClick={() => onOpenMakeOffer(c)}
                      className="w-full bg-[#D96B27] hover:bg-[#C05A19] text-white py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm cursor-pointer shadow-md transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Hacer Oferta a {c.name.split(' ')[1] || c.name}</span>
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
