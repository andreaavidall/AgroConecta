import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Send, 
  Sparkles,
  Layers,
  X
} from 'lucide-react';

export default function CoopComparisonView({ 
  selectedCoops = [], 
  onBackToMarketplace, 
  onOpenMakeOffer,
  onRemoveFromCompare,
  onOpenJointReport
}) {
  if (selectedCoops.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl text-center space-y-4 border border-[#EFECE6] max-w-lg mx-auto my-12">
        <h2 className="text-lg font-black text-[#1E1512]">No hay cooperativas seleccionadas</h2>
        <p className="text-xs text-gray-500">Selecciona 2 o más cooperativas en la Vitrina para abrir la matriz de comparación estratégica.</p>
        <button
          onClick={onBackToMarketplace}
          className="bg-[#D96B27] text-white px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
        >
          Ir a la Vitrina
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* Header & Back Action */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToMarketplace}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#1E1512]">Comparador Estratégico de Proveedores</h1>
            <p className="text-xs text-gray-500">Evaluación matricial de capacidad comprometible, confianza de entrega y riesgo climático.</p>
          </div>
        </div>
      </div>

      {/* AUTOMATIC AI SYSTEM CONCLUSION BOX */}
      <div className="bg-[#1E1512] text-white p-5 rounded-3xl border border-[#3D2D27] shadow-lg space-y-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#D96B27]" />
          <h3 className="font-extrabold text-sm text-white">Dictamen Comercial AgroConecta</h3>
        </div>
        <p className="text-xs text-amber-100/90 leading-relaxed">
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
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1E1512] text-white">
                <th className="p-4 w-52 font-extrabold border-r border-[#3D2D27]">Criterio de Evaluación</th>
                {selectedCoops.map((coop) => (
                  <th key={coop.id} className="p-4 min-w-[240px] border-r border-[#3D2D27] relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-black text-sm block text-amber-400">{coop.name}</span>
                        <span className="text-[10px] text-gray-300 block">{coop.region}</span>
                      </div>
                      <button
                        onClick={() => onRemoveFromCompare(coop.id)}
                        className="text-gray-400 hover:text-white p-1 cursor-pointer"
                        title="Quitar de comparación"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              
              {/* Capacidad Comprometible */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Capacidad Comprometible Proyectada</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 font-black text-base text-[#D96B27] border-r border-gray-100">
                    {c.capacityRange}
                  </td>
                ))}
              </tr>

              {/* Confianza de Entrega */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Score Confianza de Entrega</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 font-extrabold text-emerald-700 border-r border-gray-100">
                    {c.confidenceScore} / 100 ({c.confidenceLevelText})
                  </td>
                ))}
              </tr>

              {/* Variedad Principal & Fino % */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Variedad & % Fino de Aroma</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 text-gray-900 border-r border-gray-100">
                    <span className="font-bold block">{c.variety}</span>
                    <span className="text-[11px] text-gray-500">{c.fineAromaPct}% Fino de Aroma</span>
                  </td>
                ))}
              </tr>

              {/* Historial 5 Años */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Historial de Cumplimiento (5 años)</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 text-gray-800 border-r border-gray-100">
                    <span className="font-bold">{c.historicalFulfillment}</span>
                  </td>
                ))}
              </tr>

              {/* Riesgo SENAMHI */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Riesgo Climático SENAMHI</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 border-r border-gray-100">
                    <span className={`font-bold ${c.riskLevel === 'medium' ? 'text-amber-600' : 'text-emerald-700'}`}>
                      {c.currentRisk}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Certificaciones */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Certificaciones Vigentes</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 border-r border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {c.certifications.map((cert, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold text-[10px]">
                          {cert.name}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Trazabilidad EUDR */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Trazabilidad & Geolocalización</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 text-emerald-700 font-bold border-r border-gray-100">
                    {c.georeferencedPct}% GPS ({c.parcelsCount} parcelas)
                  </td>
                ))}
              </tr>

              {/* MEJOR USO SUGERIDO */}
              <tr className="bg-amber-50/60">
                <td className="p-4 font-bold text-amber-950">Mejor Uso Sugerido</td>
                {selectedCoops.map((c, idx) => (
                  <td key={c.id} className="p-4 border-r border-amber-200/60 text-amber-900 font-medium leading-tight">
                    {idx === 0 
                      ? 'Ideal para pedidos de 20–25 t con foco en trazabilidad y contratos cerrados.'
                      : 'Ideal para pedidos de mayor volumen (35+ t) o perfil sensorial Chuncho premiado.'}
                  </td>
                ))}
              </tr>

              {/* Acciones por Cooperativa */}
              <tr>
                <td className="p-4 font-bold bg-gray-50 text-gray-700">Acciones Recomendadas</td>
                {selectedCoops.map((c) => (
                  <td key={c.id} className="p-4 border-r border-gray-100">
                    <button
                      onClick={() => onOpenMakeOffer(c)}
                      className="w-full bg-[#D96B27] hover:bg-[#C05A19] text-white py-2 rounded-xl font-bold text-xs cursor-pointer shadow-sm transition-all"
                    >
                      Hacer Oferta a {c.name.split(' ')[1] || c.name}
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
