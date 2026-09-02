import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Thermometer, 
  Award, 
  ShieldCheck, 
  Camera, 
  ExternalLink,
  Info,
  Scale,
  Clock,
  Sparkles
} from 'lucide-react';

export default function LotTraceabilityModal({ isOpen, onClose, lot }) {
  const [showQrModal, setShowQrModal] = useState(false);

  if (!isOpen || !lot) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-[#1E1512] text-white px-6 py-4 flex items-center justify-between border-b border-[#3D2D27]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  TRAZABILIDAD 100% VERIFICADA EUDR
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                  {lot.id}
                </span>
              </div>
              <h2 className="text-sm font-bold text-white">{lot.coopName} — Lote de Cacao Fino de Aroma</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Ver Código QR</span>
            </button>

            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* Key Lot Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
            <div>
              <span className="text-[10px] text-gray-500 uppercase block font-semibold">Peso Net del Lote</span>
              <span className="text-lg font-black text-[#1E1512]">{lot.weightKg.toLocaleString()} kg</span>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 uppercase block font-semibold">Variedad</span>
              <span className="text-sm font-bold text-gray-900">{lot.variety}</span>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 uppercase block font-semibold">Humedad Final</span>
              <span className="text-sm font-bold text-emerald-700">{lot.moisturePct}% (Óptima)</span>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 uppercase block font-semibold">Socio Productor</span>
              <span className="text-xs font-bold text-gray-900">{lot.producer}</span>
            </div>
          </div>

          {/* Timeline Visualizer */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D96B27]" />
              <span>Línea de Tiempo del Procesamiento & Evidencia</span>
            </h3>

            <div className="relative pl-6 space-y-6 border-l-2 border-emerald-500 ml-3">
              
              {/* Step 1: Acopio */}
              <TimelineStep 
                stageNumber="1"
                stageTitle="ACOPIO & RECEPCIÓN EN CAMPO"
                statusText="Completado • Registrado vía Bot de Telegram"
                dateText="2026-08-25 09:30 PET"
                details={[
                  { label: "Productor / Socio", val: lot.producer },
                  { label: "Parcela Georreferenciada", val: `${lot.parcelId} (${lot.location})` },
                  { label: "Coordenadas GPS", val: lot.coordinates ? `${lot.coordinates.lat}, ${lot.coordinates.lng}` : "Verificadas" },
                  { label: "Responsable de Campo", val: lot.manager }
                ]}
                evidenceUrl={lot.photoEvidenceUrl}
              />

              {/* Step 2: Fermentación */}
              <TimelineStep 
                stageNumber="2"
                stageTitle="FERMENTACIÓN EN CAJONES"
                statusText={lot.fermentationStatus}
                dateText="2026-08-26 a 2026-08-29"
                details={[
                  { label: "Tipo de Cajón", val: lot.fermentationBox },
                  { label: "Horas Totales", val: `${lot.fermentationHours} horas (Rango sugerido 90–108h)` },
                  { label: "Grado de Fermentación", val: "88% de corte bien fermentado" }
                ]}
              />

              {/* Step 3: Secado */}
              <TimelineStep 
                stageNumber="3"
                stageTitle="SECADO CONTROLADO EN MARQUESINA"
                statusText={`Completado en ${lot.dryingDays || 6} días`}
                dateText="2026-08-30 a 2026-09-01"
                details={[
                  { label: "Humedad Inicial vs Final", val: `52% baba → ${lot.moisturePct}% secado final` },
                  { label: "Marquesina", val: "Marquesina Solar de Policarbonato" },
                  { label: "Control de Calidad", val: "Sin defectos ni presencia de moho" }
                ]}
              />

              {/* Step 4: Almacenamiento & Despacho */}
              <TimelineStep 
                stageNumber="4"
                stageTitle="ALMACENAMIENTO & EMBA LADO"
                statusText={lot.stageStatus}
                dateText="2026-09-01 Actual"
                details={[
                  { label: "Estado de Almacén", val: "En sacos de yute con recubrimiento GrainPro" },
                  { label: "Sacos Totales", val: `${Math.round(lot.weightKg / 60)} sacos de 60kg` },
                  { label: "Certificación Vinculada", val: "Orgánico UE + Fairtrade FLOCERT" }
                ]}
              />

            </div>
          </div>

          {/* Mass Balance Quick Reconciliation Widget */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-400 text-xs">CONCILIACIÓN DE MASA (MASS BALANCE CHECK)</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                Rendimiento {lot.massBalance?.yieldPct}% (Normal)
              </span>
            </div>
            <p className="text-gray-300 text-[11px]">
              Ingreso de grano fresco en baba: <strong>{lot.massBalance?.wetInputKg} kg</strong> → Salida de grano seco: <strong>{lot.massBalance?.dryOutputKg} kg</strong>. Merma esperada por evaporación de pulpa: 50.6%.
            </p>
          </div>

        </div>
      </div>

      {/* QR Code Sub-modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-sm">Escáner de Trazabilidad QR</h3>
            <p className="text-xs text-gray-500">Cómpralo directamente desde tu smartphone en campo</p>
            
            <div className="bg-gray-100 p-6 rounded-2xl inline-block border-2 border-dashed border-emerald-500">
              <QrCode className="w-40 h-40 text-[#1E1512] mx-auto" />
              <span className="font-mono text-xs font-bold text-emerald-800 block mt-2">{lot.qrCodeId}</span>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="bg-[#1E1512] text-white px-5 py-2 rounded-xl text-xs font-bold w-full cursor-pointer"
            >
              Cerrar QR
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function TimelineStep({ stageNumber, stageTitle, statusText, dateText, details = [], evidenceUrl }) {
  return (
    <div className="relative">
      <span className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shadow-sm">
        {stageNumber}
      </span>

      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 className="font-bold text-gray-900 text-xs">{stageTitle}</h4>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
            {statusText}
          </span>
        </div>

        <p className="text-[10px] text-gray-400">{dateText}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-gray-200/60">
          {details.map((d, i) => (
            <div key={i}>
              <span className="text-gray-400 block text-[10px]">{d.label}:</span>
              <span className="font-semibold text-gray-800 text-[11px]">{d.val}</span>
            </div>
          ))}
        </div>

        {evidenceUrl && (
          <div className="mt-3 pt-2 border-t border-gray-200">
            <span className="text-[10px] text-gray-500 font-bold flex items-center space-x-1 mb-1.5">
              <Camera className="w-3.5 h-3.5 text-[#D96B27]" />
              <span>Evidencia Fotográfica Geolocalizada:</span>
            </span>
            <img 
              src={evidenceUrl} 
              alt="Evidencia Acopio" 
              className="w-full h-36 object-cover rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
