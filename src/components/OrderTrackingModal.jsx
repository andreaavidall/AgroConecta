import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Package, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  Anchor, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  Award,
  CloudRain
} from 'lucide-react';

export default function OrderTrackingModal({ offer, onClose, onSimulateNextStage }) {
  if (!offer) return null;

  // Default fulfillment steps pipeline
  const steps = offer.trackingSteps || [
    {
      stage: 1,
      title: "Contrato B2B Firmado & Prima Asegurada",
      subtitle: "Acuerdo comercial formalizado y prima de origen prefijada.",
      date: "01 Sep 2026",
      completed: true,
      icon: "FileText",
      details: "Incoterm FOB Callao a US$ 8.50/kg. Cobertura del 100% garantizada."
    },
    {
      stage: 2,
      title: "Acopio en Baba & Registro de Parcelas",
      subtitle: "Recepción de masa de cacao fresco de familias socias.",
      date: "03 Sep 2026",
      completed: true,
      icon: "MapPin",
      details: "17.1 t acopiadas en Tocache. 91% parcelas verficadas con GPS EUDR."
    },
    {
      stage: 3,
      title: "Fermentación & Secado Sol-Sombra",
      subtitle: "Proceso fermentativo de 90 a 108 horas y secado gradual.",
      date: "En curso (Fecha est. 08 Sep)",
      completed: offer.currentStepIndex >= 3,
      isCurrent: offer.currentStepIndex === 2 || !offer.currentStepIndex,
      icon: "Clock",
      details: "Cajones de madera de tornillo. Humedad actual registrada: 6.8% (Óptimo < 7.0%)."
    },
    {
      stage: 4,
      title: "Control Fitosanitario & Certificación SENASA",
      subtitle: "Prueba de corte sensorial y certificado fitosanitario.",
      date: "Pendiente (15 Sep 2026)",
      completed: offer.currentStepIndex >= 4,
      isCurrent: offer.currentStepIndex === 3,
      icon: "ShieldCheck",
      details: "Inspección de grano entero, libre de plagas y cadmio dentro de límites UE."
    },
    {
      stage: 5,
      title: "Ensacado en Yute & Etiquetado de Lote",
      subtitle: "Empaque exportable de 60kg con código de trazabilidad de lote.",
      date: "Pendiente (22 Sep 2026)",
      completed: offer.currentStepIndex >= 5,
      isCurrent: offer.currentStepIndex === 4,
      icon: "Package",
      details: "Sacos de yute alimentario etiquetados con código de lote CAC-2026-014."
    },
    {
      stage: 6,
      title: "Transporte Terrestre Tocache → Puerto Callao",
      subtitle: "Despacho en camión refrigerado con rastreo GPS.",
      date: "Pendiente (28 Sep 2026)",
      completed: offer.currentStepIndex >= 6,
      isCurrent: offer.currentStepIndex === 5,
      icon: "Truck",
      details: "Guía de remisión electrónica N° GRE-084920. Precintado de seguridad."
    },
    {
      stage: 7,
      title: "Despacho Aduanero & Zarpe de Buque",
      subtitle: "Embarque en contenedor marítimo y emisión de Bill of Lading (BL).",
      date: "Pendiente (15 Oct 2026)",
      completed: offer.currentStepIndex >= 7,
      isCurrent: offer.currentStepIndex === 6,
      icon: "Anchor",
      details: "Zarpe del navío Hapag-Lloyd desde el Terminal Portuario del Callao."
    }
  ];

  const currentStep = steps.find(s => s.isCurrent) || steps[2];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div className="bg-white text-[#1E1512] rounded-3xl max-w-3xl w-full border border-[#EFECE6] shadow-2xl overflow-hidden flex flex-col my-8">
        
        {/* Header */}
        <div className="bg-[#1E1512] text-white p-6 flex items-center justify-between border-b border-[#3D2D27]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#D96B27] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                SEGUIMIENTO EN TIEMPO REAL
              </span>
              <span className="text-xs text-amber-200/70 font-mono">Pedido ID: {offer.id}</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              Cadena de Custodia & Entrega: {offer.cooperativeName || offer.coopName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Order Summary Strip */}
          <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#EFECE6] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-gray-400 font-semibold block text-[10px]">Volumen Contratado</span>
              <span className="font-black text-base text-[#D96B27]">{offer.volumeTons || offer.volume} t</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[10px]">Valor Total Contrato</span>
              <span className="font-black text-base text-gray-900">${(offer.totalValueUsd || offer.totalValue)?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[10px]">Incoterm & Destino</span>
              <span className="font-bold text-gray-900">{offer.incoterm || 'FOB Callao'} ({offer.destinationCountry || 'UE'})</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[10px]">Estado Actual</span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-block">
                Etapa {currentStep.stage} de 7
              </span>
            </div>
          </div>

          {/* Current Active Stage Highlight Banner */}
          <div className="bg-[#1E1512] text-white p-5 rounded-2xl border border-[#3D2D27] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D96B27]" />
                <span>ETAPA ACTUAL EN ORIGEN</span>
              </span>
              <span className="text-xs text-amber-200/70">{currentStep.date}</span>
            </div>

            <h3 className="text-base font-extrabold text-white">{currentStep.title}</h3>
            <p className="text-xs text-amber-100/80 leading-relaxed">{currentStep.details}</p>

            {/* Interactive Simulation Button */}
            {onSimulateNextStage && currentStep.stage < 7 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onSimulateNextStage(offer.id)}
                  className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Simular Avanzar a Etapa {currentStep.stage + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Complete 7-Stage Interactive Pipeline Stepper */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Línea de Tiempo del Pedido (7 Etapas)</h4>
            
            <div className="relative border-l-2 border-gray-200 ml-4 space-y-6 py-2">
              {steps.map((stg) => {
                const isDone = stg.completed;
                const isCurrent = stg.isCurrent;

                return (
                  <div key={stg.stage} className="relative pl-6">
                    
                    {/* Stage Marker Dot */}
                    <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ${
                      isDone 
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
                        : isCurrent 
                        ? 'bg-[#D96B27] text-white ring-4 ring-[#D96B27]/30 animate-pulse'
                        : 'bg-gray-100 text-gray-400 border border-gray-300'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : stg.stage}
                    </div>

                    {/* Stage Content */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      isCurrent 
                        ? 'bg-amber-50/60 border-[#D96B27] ring-1 ring-[#D96B27]/30' 
                        : isDone 
                        ? 'bg-emerald-50/40 border-emerald-200' 
                        : 'bg-gray-50/50 border-gray-200 opacity-60'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-extrabold text-sm text-[#1E1512] flex items-center space-x-2">
                          <span>{stg.title}</span>
                          {isCurrent && (
                            <span className="bg-[#D96B27] text-white text-[9px] font-black px-2 py-0.2 rounded-full uppercase">
                              EN PROCESO
                            </span>
                          )}
                        </h5>
                        <span className="text-[10px] font-semibold text-gray-400 font-mono">{stg.date}</span>
                      </div>

                      <p className="text-xs text-gray-600 mt-1">{stg.subtitle}</p>
                      <p className="text-[11px] text-gray-500 mt-1 font-mono bg-white p-2 rounded-lg border border-gray-200">
                        {stg.details}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Trazabilidad verificada en blockchain GeoDB</span>
          <button
            onClick={onClose}
            className="bg-[#1E1512] hover:bg-[#3D2D27] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
