import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  Users, 
  Sparkles,
  Layers,
  FileText,
  Copy
} from 'lucide-react';

export default function CommitmentReportModal({ 
  isOpen, 
  onClose, 
  cooperative, 
  isCombined = false, 
  combinedCoops = [], 
  requestedVolumeTons = 50 
}) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || (!cooperative && !isCombined)) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Determine single or combined metrics
  const reportTitle = isCombined 
    ? "Reporte de Compromiso Combinado (Cobertura Conjunta Multi-Cooperativa)" 
    : `Reporte de Compromiso Due Diligence — ${cooperative.name}`;

  const confidenceScore = isCombined ? 85 : (cooperative?.confidenceScore || 87);
  const recommendedCap = isCombined ? requestedVolumeTons : (cooperative?.recommendedCapacity || 24);
  const riskLevelText = isCombined ? "Moderado (Diversificado en 4 cooperativas)" : (cooperative?.currentRisk || "Moderado");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 no-print">
      <div className="bg-white text-gray-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[92vh]">
        
        {/* Action Header Bar (No Print) */}
        <div className="bg-[#1E1512] text-white px-6 py-4 flex items-center justify-between border-b border-[#3D2D27]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#D96B27] flex items-center justify-center font-bold text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                {isCombined ? 'COBERTURA CONJUNTA VERIFICADA' : 'DOCUMENTO DE DUE DILIGENCE DE OFERTA'}
              </span>
              <h2 className="text-sm font-bold text-white">{reportTitle}</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copiado!' : 'Compartir Link'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Descargar PDF</span>
            </button>

            <button 
              onClick={onClose} 
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div id="printable-commitment-report" className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white space-y-6 text-xs text-gray-800">
          
          {/* Document Header & Watermark */}
          <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black tracking-tight text-[#1E1512]">AGROCONECTA</h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">
                  DOCUMENTO VERIFICADO EN BLOCKCHAIN / GEODB
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Plataforma B2B de Certificación de Capacidad Comprometible y Trazabilidad de Cacao Peruano
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Código de Auditoría: <span className="font-mono text-gray-700 font-semibold">REP-2026-VALLE-0091</span> • Generado: {new Date().toLocaleDateString('es-PE')}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center min-w-[200px]">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block">Confianza de Entrega Calculada</span>
              <div className="text-3xl font-black text-emerald-600 mt-0.5">{confidenceScore} <span className="text-sm font-normal text-gray-500">/ 100</span></div>
              <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                ALTA CONFIANZA
              </span>
            </div>
          </div>

          {/* Section 1: Origen & Entidad */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#1E1512] flex items-center space-x-2 border-b pb-1 border-gray-100">
              <MapPin className="w-4 h-4 text-[#D96B27]" />
              <span>1. ORIGEN & UBICACIÓN VERIFICADA</span>
            </h3>

            {!isCombined ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block font-semibold">Cooperativa Productora</span>
                  <span className="font-bold text-sm text-[#1E1512]">{cooperative.name}</span>
                  <span className="text-xs text-gray-600 block">{cooperative.region}</span>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase block font-semibold">Socios & Parcelas</span>
                  <span className="font-bold text-[#1E1512]">{cooperative.membersCount} familias socias</span>
                  <span className="text-xs text-gray-600 block">{cooperative.parcelsCount} parcelas georreferenciadas</span>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase block font-semibold">Trazabilidad EUDR</span>
                  <span className="font-bold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{cooperative.eudrStatus}</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-[#1E1512] block mb-2">Paquete Combinado de Cobertura Conjunta ({combinedCoops.length} Cooperativas):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {combinedCoops.map((c, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900 block">{c.name}</span>
                        <span className="text-[11px] text-gray-500">{c.region} • {c.variety}</span>
                      </div>
                      <span className="font-bold text-emerald-700 text-sm bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        {c.assignedVolume} t
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Calidad & Certificaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#1E1512] flex items-center space-x-2 border-b pb-1 border-gray-100">
                <Award className="w-4 h-4 text-[#D96B27]" />
                <span>2. CALIDAD & VARIETAL</span>
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">Variedad Principal:</span>
                  <span className="font-bold text-gray-900">{cooperative?.variety || 'CCN-51 / Nativo'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">% Fino de Aroma:</span>
                  <span className="font-bold text-emerald-700">{cooperative?.fineAromaPct || 82}% Fino</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Humedad de Embarque:</span>
                  <span className="font-bold text-gray-900">6.5% – 7.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Grano Fermentado:</span>
                  <span className="font-bold text-gray-900">Mínimo 85% de grado 1</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#1E1512] flex items-center space-x-2 border-b pb-1 border-gray-100">
                <ShieldCheck className="w-4 h-4 text-[#D96B27]" />
                <span>3. CERTIFICACIONES VIGENTES</span>
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200">
                {(cooperative?.certifications || [
                  { name: "Orgánico UE", entity: "Control Union", status: "Vigente" },
                  { name: "Comercio Justo (Fairtrade)", entity: "FLOCERT", status: "Vigente" },
                  { name: "Fitosanitario SENASA", entity: "SENASA Perú", status: "Vigente" }
                ]).map((cert, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
                    <span className="font-semibold text-gray-800">{cert.name}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {cert.status} ({cert.entity})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Capacidad Comprometible & Campaña */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#1E1512] flex items-center space-x-2 border-b pb-1 border-gray-100">
              <TrendingUp className="w-4 h-4 text-[#D96B27]" />
              <span>4. ANÁLISIS DE CAPACIDAD COMPROMETIBLE</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-900 text-white p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-semibold">Rango de Capacidad</span>
                <span className="text-lg font-black text-amber-400">{cooperative?.capacityRange || '22–27 t'}</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-semibold">Capacidad Recomendada</span>
                <span className="text-lg font-black text-white">{recommendedCap} toneladas</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-semibold">Solicitado por Comprador</span>
                <span className="text-lg font-black text-sky-400">{requestedVolumeTons} toneladas</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-semibold">Cobertura de Pedido</span>
                <span className="text-lg font-black text-emerald-400">
                  {requestedVolumeTons <= (cooperative?.maxCapacity || 27) ? '100% Cubierto' : 'Cobertura Conjunta Requerida'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Historial de Cumplimiento */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#1E1512] flex items-center space-x-2 border-b pb-1 border-gray-100">
              <Users className="w-4 h-4 text-[#D96B27]" />
              <span>5. HISTORIAL DE CUMPLIMIENTO HISTÓRICO (ÚLTIMAS 5 CAMPAÑAS)</span>
            </h3>

            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1E1512] block">Record de Entregas a Tiempo:</span>
                <span className="text-xs text-gray-600">
                  {cooperative?.historicalFulfillment || '4 de 5 campañas cumplidas con éxito (88%)'}
                </span>
              </div>

              <div className="flex space-x-1.5">
                <span className="bg-emerald-600 text-white px-2 py-1 rounded text-[11px] font-bold">2022 ✓</span>
                <span className="bg-emerald-600 text-white px-2 py-1 rounded text-[11px] font-bold">2023 ✓</span>
                <span className="bg-emerald-600 text-white px-2 py-1 rounded text-[11px] font-bold">2024 ✓</span>
                <span className="bg-rose-500 text-white px-2 py-1 rounded text-[11px] font-bold">2025 ✕ (Sequía VRAEM)</span>
                <span className="bg-amber-500 text-black px-2 py-1 rounded text-[11px] font-bold">2026 En curso</span>
              </div>
            </div>
          </div>

          {/* Section 5: Conclusión & Dictamen Final */}
          <div className="bg-gradient-to-r from-[#1E1512] to-[#2A1E1A] text-white p-6 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">DICTAMEN FINAL Y RECOMENDACIÓN DE NEGOCIACIÓN</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase block font-semibold">Capacidad Máxima Recomendada</span>
                <span className="text-xl font-bold text-white">{recommendedCap} t</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase block font-semibold">Nivel de Confianza de Entrega</span>
                <span className="text-xl font-bold text-emerald-400">{confidenceScore} / 100</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase block font-semibold">Riesgo Climático / Entrega</span>
                <span className="text-xl font-bold text-amber-400">{riskLevelText}</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 pt-2 border-t border-white/10">
              {isCombined 
                ? "El paquete de Cobertura Conjunta diversifica el riesgo en 4 cooperativas compatibles en varietal y certificación orgánica. Se recomienda iniciar oferta formal combinada."
                : "La cooperativa cuenta con capacidad sólida y trazabilidad 100% verificada. El acopio actual presenta un desfase temporal menor de 4.9t atribuible a precipitaciones SENAMHI, pero cubrible dentro del margen de 21 días al embarque."}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
