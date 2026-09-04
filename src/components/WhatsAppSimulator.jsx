import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, X, AlertCircle, Camera, User, RefreshCw, FileText, ArrowRight } from 'lucide-react';

export default function WhatsAppSimulator({ isOpen, onToggle, lots, onAddNewLot, cooperative }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '🤖 Simulación de WhatsApp — Asistente de Acopio AgroConecta.' },
    { sender: 'bot', text: 'Presione /nueva_entrega para registrar una recepción de cacao en baba.' }
  ]);
  const [step, setStep] = useState(0);
  const [draftData, setDraftData] = useState({
    producer: 'Socio #104',
    parcelId: 'PAR-304-TOCACHE',
    cocoaType: 'Cacao en Baba',
    grossWeight: 400,
    tareWeight: 10,
    netWeight: 390,
    pricePerKg: 4.20
  });

  if (!isOpen) return null;

  const handleStartForm = () => {
    setStep(1);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: '/nueva_entrega' },
      { sender: 'bot', text: '📋 [Borrador] Paso 1/4: Seleccione el productor socio.' }
    ]);
  };

  const handleSelectProducer = () => {
    setStep(2);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: 'Socio #104 (Sector Tocache Alto)' },
      { sender: 'bot', text: '⚖️ Paso 2/4: Ingrese Peso Bruto (kg) y Tara (kg).' }
    ]);
  };

  const handleSetWeights = () => {
    setStep(3);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: 'Bruto: 400 kg | Tara: 10 kg => Neto: 390 kg' },
      { sender: 'bot', text: '📸 Paso 3/4: Adjunte evidencia fotográfica del pesaje.' }
    ]);
  };

  const handleAttachPhoto = () => {
    setStep(4);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: '📷 [Fotografía_Pesaje_390kg.jpg]' },
      { sender: 'bot', text: '🔍 Paso 4/4: Resumen antes de guardar:\n• Productor: Socio #104\n• Neto: 390 kg baba\n• Código: REC-2026-089\n\n¿Confirmar registro?' }
    ]);
  };

  const handleConfirmRegistration = () => {
    const newLot = {
      id: `REC-2026-${Math.floor(100 + Math.random() * 900)}`,
      coopId: cooperative?.id || "coop-valle-verde",
      coopName: cooperative?.name || "Cooperativa Valle Verde",
      stage: "Acopio",
      stageStatus: "Registrado desde WhatsApp",
      physicalState: "Cacao en Baba",
      weightKg: 390,
      outputTypeLabel: "Salida estimada en proceso",
      variety: "CCN-51",
      moisturePct: 54.0,
      fineAromaPct: 82,
      georeferencedStatus: "Origen geolocalizado: completo",
      certificationType: "Orgánico UE",
      producer: draftData.producer,
      parcelId: draftData.parcelId,
      location: "Sector Tocache Alto, San Martín",
      manager: "Operador de Acopio",
      fermentationBox: "Pendiente asignación",
      fermentationHours: 0,
      fermentationStatus: "Ingreso reciente",
      dryingDays: 0,
      photoEvidenceUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
      lastUpdated: new Date().toLocaleString(),
      massBalance: { wetInputKg: 390, moistureLossKg: 195, dryOutputKg: 195, yieldPct: 50.0, toleranceStatus: "EN_PROCESO" }
    };

    if (onAddNewLot) onAddNewLot(newLot);

    setStep(5);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: '✅ Confirmar registro' },
      { sender: 'bot', text: `🎉 ¡Recepción ${newLot.id} registrada exitosamente!\n\n• Estado: Confirmado\n• Código: ${newLot.id}\n\nLos datos se han sincronizado con la plataforma central.` }
    ]);
  };

  const handleCancelForm = () => {
    setStep(0);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: '❌ Cancelar' },
      { sender: 'bot', text: 'Operación cancelada. El borrador pendiente se mantendrá guardado en memoria.' }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111B21] w-full max-w-md rounded-2xl shadow-2xl border border-emerald-800/40 overflow-hidden flex flex-col h-[620px]">
        
        {/* Header */}
        <div className="bg-[#075E54] text-white p-4 flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#25D366] rounded-full text-slate-900 font-bold">
              <MessageCircle className="w-5 h-5 fill-slate-900" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Simulación del Bot (WhatsApp Campo)</h3>
              <p className="text-[11px] text-emerald-200">Asistente de Acopio Offline & Sync</p>
            </div>
          </div>
          <button onClick={onToggle} className="text-emerald-200 hover:text-white p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline notice bar */}
        <div className="bg-[#1F2C34] px-3 py-1.5 text-[11px] text-emerald-300 border-b border-emerald-900/40 italic">
          Cada mensaje recibido queda guardado y el usuario puede continuar cuando recupere la conexión.
        </div>

        {/* Chat Messages Body */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs bg-[#0B141A]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-[#005C4B] text-white rounded-br-none'
                  : 'bg-[#202C33] text-slate-100 rounded-bl-none border border-slate-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Step Controls */}
        <div className="p-3 bg-[#202C33] border-t border-slate-700 space-y-2">
          {step === 0 && (
            <button
              onClick={handleStartForm}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>/nueva_entrega (Iniciar registro)</span>
            </button>
          )}

          {step === 1 && (
            <button
              onClick={handleSelectProducer}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Seleccionar Socio #104</span>
            </button>
          )}

          {step === 2 && (
            <button
              onClick={handleSetWeights}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ingresar Peso 390 kg Neto</span>
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleAttachPhoto}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Adjuntar Foto Pesaje</span>
            </button>
          )}

          {step === 4 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelForm}
                className="w-1/3 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmRegistration}
                className="w-2/3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar e Ingresar</span>
              </button>
            </div>
          )}

          {step === 5 && (
            <button
              onClick={() => setStep(0)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Iniciar otra recepción
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
