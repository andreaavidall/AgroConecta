import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, Building2, MapPin, Layers, Users, FileText, Check, ShieldCheck, Download, AlertCircle, Save } from 'lucide-react';

export default function OnboardingWizardModal({ isOpen, onClose, onCompleteSetup }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    coopName: "Cooperativa Valle Verde",
    region: "San Martín",
    province: "Huallaga / Tocache",
    acopioMode: "baba", // 'baba' | 'humedo' | 'seco' | 'mixto'
    centersCount: 2,
    boxesCount: 8,
    dryersCount: 4,
    producersCount: 142,
    targetMoisture: 7.0,
    maxFermentationHours: 108,
    hasWhatsApp: true
  });

  if (!isOpen) return null;

  const totalSteps = 6;
  const progressPct = Math.round((currentStep / totalSteps) * 100);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (onCompleteSetup) onCompleteSetup(formData);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#174C3C] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-800 rounded-xl border border-emerald-600/40">
                <Building2 className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Configuración Inicial Guiada de la Cooperativa</h2>
                <p className="text-xs text-emerald-200">Paso {currentStep} de {totalSteps} — Asistente de alta de campaña</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-xs bg-emerald-800/80 hover:bg-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-600/50 flex items-center gap-1 transition"
            >
              <Save className="w-3.5 h-3.5 text-amber-300" />
              <span>Guardar y continuar después</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs text-emerald-200 font-medium">
              <span>Avance de configuración</span>
              <span className="font-bold text-amber-300">{progressPct}% completado</span>
            </div>
            <div className="w-full h-2 bg-emerald-950/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#F6F8F5]">
          
          {/* Step 1: General Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#174C3C] text-white flex items-center justify-center text-xs font-bold">1</span>
                  Datos de la Organización y Campaña Activa
                </h3>
                <p className="text-xs text-slate-600">Registra el nombre oficial y la ubicación central de la cooperativa.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre de la Cooperativa</label>
                  <input
                    type="text"
                    value={formData.coopName}
                    onChange={(e) => setFormData({...formData, coopName: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#237A57] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Región de Operación</label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#237A57] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Provincia / Distrito principal</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#237A57] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campaña Agrícola Activa</label>
                  <input
                    type="text"
                    value="Campaña 2026 (Huallaga)"
                    disabled
                    className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-slate-500 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Product & Acopio Mode */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#174C3C] text-white flex items-center justify-center text-xs font-bold">2</span>
                  Forma de Acopio Principal
                </h3>
                <p className="text-xs text-slate-600">Selecciona el estado físico del grano como lo recibes de los socios.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, acopioMode: 'baba'})}
                  className={`p-4 rounded-xl border text-left transition space-y-2 ${formData.acopioMode === 'baba' ? 'bg-emerald-50 border-[#237A57] ring-2 ring-[#237A57]/30' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                >
                  <span className="font-bold text-slate-800 block">Cacao en Baba (Fresco)</span>
                  <p className="text-slate-500 leading-snug">Grano recién cosechado. Requiere fermentación y secado completo en planta central.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({...formData, acopioMode: 'humedo'})}
                  className={`p-4 rounded-xl border text-left transition space-y-2 ${formData.acopioMode === 'humedo' ? 'bg-emerald-50 border-[#237A57] ring-2 ring-[#237A57]/30' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                >
                  <span className="font-bold text-slate-800 block">Cacao Fermentado Húmedo</span>
                  <p className="text-slate-500 leading-snug">Fermentado en parcela por el socio. Ingresa a la cooperativa para secado controlado.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({...formData, acopioMode: 'seco'})}
                  className={`p-4 rounded-xl border text-left transition space-y-2 ${formData.acopioMode === 'seco' ? 'bg-emerald-50 border-[#237A57] ring-2 ring-[#237A57]/30' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                >
                  <span className="font-bold text-slate-800 block">Cacao Seco</span>
                  <p className="text-slate-500 leading-snug">Grano secado por el socio (&lt; 7.5% humedad). Pasa directo a limpieza y clasificación.</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Infrastructure */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#174C3C] text-white flex items-center justify-center text-xs font-bold">3</span>
                  Infraestructura y Centros Operativos
                </h3>
                <p className="text-xs text-slate-600">Declara la capacidad física para determinar restricciones de secado o fermentación.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <label className="block font-bold text-slate-700">Centros de Acopio</label>
                  <input
                    type="number"
                    value={formData.centersCount}
                    onChange={(e) => setFormData({...formData, centersCount: Number(e.target.value)})}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-bold"
                  />
                  <p className="text-[11px] text-slate-400">Puntos físicos de pesaje y recepción.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <label className="block font-bold text-slate-700">Cajones de Fermentación</label>
                  <input
                    type="number"
                    value={formData.boxesCount}
                    onChange={(e) => setFormData({...formData, boxesCount: Number(e.target.value)})}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-bold"
                  />
                  <p className="text-[11px] text-slate-400">Cajones de madera (ej. tipo cascada).</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <label className="block font-bold text-slate-700">Secadores / Marquesinas</label>
                  <input
                    type="number"
                    value={formData.dryersCount}
                    onChange={(e) => setFormData({...formData, dryersCount: Number(e.target.value)})}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-800 font-bold"
                  />
                  <p className="text-[11px] text-slate-400">Túneles o patios de secado solar.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Import Producers & Parcels */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#174C3C] text-white flex items-center justify-center text-xs font-bold">4</span>
                  Productores y Parcelas Registradas
                </h3>
                <p className="text-xs text-slate-600">Puedes cargar socios manualmente o mediante plantilla de Excel.</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#174C3C]">142 Productores Socios actualmente cargados</h4>
                  <p className="text-[11px] text-emerald-800">189 parcelas georreferenciadas (91% geolocalización EUDR completa).</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("📂 Plantilla de importación lista. Usar componente Excel Import.")}
                  className="bg-[#237A57] text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#174C3C] transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Importar desde Excel</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Rules & Operational Thresholds */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#174C3C] text-white flex items-center justify-center text-xs font-bold">5</span>
                  Reglas Operativas de Calidad
                </h3>
                <p className="text-xs text-slate-600">Establece los parámetros límite para disparar alertas automáticas.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Humedad Objetivo de Secado (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.targetMoisture}
                    onChange={(e) => setFormData({...formData, targetMoisture: Number(e.target.value)})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-bold"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Humedad recomendada internacional: 6.5% - 7.5%.</p>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Horas Máximas de Fermentación (h)</label>
                  <input
                    type="number"
                    value={formData.maxFermentationHours}
                    onChange={(e) => setFormData({...formData, maxFermentationHours: Number(e.target.value)})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-bold"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Alerta si supera 108 horas para varietales finos.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Confirmation */}
          {currentStep === 6 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#237A57] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <h3 className="text-lg font-black text-slate-800">¡Configuración de Campaña Completada!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                La cooperativa <span className="font-bold text-slate-800">{formData.coopName}</span> ha quedado lista para operar con acopio en baba, cálculo automático de ATP/CTP y trazabilidad de campo.
              </p>
            </div>
          )}

        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 text-xs font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-100 rounded-lg transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-[#237A57] text-white text-xs font-bold rounded-lg hover:bg-[#174C3C] transition flex items-center gap-1.5 shadow-md"
          >
            <span>{currentStep === totalSteps ? "Activar Campaña" : "Continuar"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
