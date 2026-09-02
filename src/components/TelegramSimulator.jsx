import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  X, 
  Smartphone,
  Info,
  Calendar,
  Layers,
  Thermometer,
  MessageSquare
} from 'lucide-react';

export default function TelegramSimulator({ 
  isOpen, 
  onToggle, 
  lots, 
  onAddNewLot, 
  cooperative 
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '🤖 ¡Bienvenido al Bot de Campo de Vitrina del Origen!\n\nHola Carlos (Técnico de Acopio - Cooperativa Valle Verde).\nSelecciona una acción rápida o escribe un comando (/registrar, /mislotes, /alertas, /capacidad).',
      options: ['/registrar', '/mislotes', '/alertas', '/capacidad', '/preciobolsa']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedRole, setSelectedRole] = useState('RESPONSABLE_ACOPIO');
  const [stepState, setStepState] = useState(null);
  const [draftLot, setDraftLot] = useState({});

  const handleSend = (textToSend = inputText) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');

    setTimeout(() => {
      processBotResponse(text, updatedMessages);
    }, 350);
  };

  const processBotResponse = (input, currentMessages) => {
    const text = input.toLowerCase();

    if (text.includes('/start') || text.includes('hola')) {
      addBotMsg('👋 Bienvenido nuevamente. ¿Qué deseas registrar hoy en campo?', ['/registrar', '/mislotes', '/alertas', '/capacidad']);
      return;
    }

    if (text.includes('/mislotes')) {
      const lotListText = lots.map(l => `• *${l.id}*: ${l.variety} - ${l.weightKg}kg (${l.stage})`).join('\n');
      addBotMsg(`📦 *Lotes Activos en Valle Verde*:\n\n${lotListText}\n\nEscribe /lote seguido del código (ej: \`/lote CAC-2026-014\`).`, ['/lote CAC-2026-014', '/registrar']);
      return;
    }

    if (text.startsWith('/lote')) {
      const parts = input.split(' ');
      const code = parts[1] || 'CAC-2026-014';
      const found = lots.find(l => l.id.toUpperCase() === code.toUpperCase()) || lots[0];
      
      addBotMsg(
        `🔍 *Detalle Lote ${found.id}*\n` +
        `• Variedad: ${found.variety}\n` +
        `• Estado: ${found.stage} (${found.stageStatus})\n` +
        `• Peso: ${found.weightKg} kg\n` +
        `• Productor: ${found.producer}\n` +
        `• Humedad: ${found.moisturePct}%\n` +
        `• Trazabilidad: ${found.eudrVerified ? '✅ EUDR GPS' : '⚠️ Pendiente'}`,
        ['/registrar', '/mislotes']
      );
      return;
    }

    if (text.includes('/alertas')) {
      addBotMsg(
        `🚨 *Alertas Activas*:\n\n` +
        `1. 🌧️ *Clima SENAMHI*: Acopio -4.9t debajo de la curva (Lluvia 68mm/72h Uchiza).\n` +
        `2. ⏱️ *Lote CAC-2026-015*: Fermentación 114h (límite 90-108h).\n` +
        `3. 📍 *Lote CAC-2026-017*: Falta geolocalización de parcelas.`,
        ['/registrar', '/mislotes']
      );
      return;
    }

    if (text.includes('/capacidad')) {
      addBotMsg(
        `📈 *Curva del Compromiso*\n\n` +
        `• Acopio Actual: 17.1 t\n` +
        `• Capacidad Proyectada: 22–27 t (80% Confianza)\n` +
        `• Embarque: 15 Octubre (21 días restantes)\n` +
        `• Desviación: -4.9 t`,
        ['/alertas', '/registrar']
      );
      return;
    }

    if (text.includes('/preciobolsa')) {
      addBotMsg(
        `📈 *Cacao ICE NY*: US$ 8.42/kg (+11.5% 7d).\nMercado al alza.`,
        ['/mislotes', '/registrar']
      );
      return;
    }

    // Interactive step registration
    if (text.includes('/registrar') || text.includes('registrar acopio')) {
      setStepState('CONFIRM_LOT_RECOMMENDATION');
      addBotMsg(
        `🌱 *Registro Guiado de Acopio*\n\n` +
        `Sugerencia Automática:\n` +
        `Detectamos el lote activo *CAC-2026-014* en Tocache Alto.\n\n` +
        `¿Registrar entrega en *CAC-2026-014*?`,
        ['Sí, usar CAC-2026-014', 'Crear nuevo Lote']
      );
      return;
    }

    if (stepState === 'CONFIRM_LOT_RECOMMENDATION') {
      if (text.includes('sí') || text.includes('cac-2026-014')) {
        setDraftLot({ lotId: 'CAC-2026-014' });
        setStepState('ENTER_KG');
        addBotMsg('⚖️ Kilos de Cacao Fresco (en baba):', ['250 kg', '500 kg', '1200 kg']);
      } else {
        const newCode = `CAC-2026-0${lots.length + 14}`;
        setDraftLot({ lotId: newCode, isNew: true });
        setStepState('ENTER_KG');
        addBotMsg(`✨ Nuevo Lote *${newCode}* asignado.\n\n⚖️ Peso en Kilos:`, ['450 kg', '800 kg']);
      }
      return;
    }

    if (stepState === 'ENTER_KG') {
      const kg = parseInt(input.replace(/\D/g, '')) || 500;
      setDraftLot(prev => ({ ...prev, weightKg: kg }));
      setStepState('ENTER_PRODUCER');
      addBotMsg(`👤 Socio Productor:`, ['Familia Quispe (#104)', 'Familia Mamani (#082)', 'Familia Torres (#012)']);
      return;
    }

    if (stepState === 'ENTER_PRODUCER') {
      setDraftLot(prev => ({ ...prev, producer: input }));
      setStepState('CAPTURE_GPS');
      addBotMsg(
        `📍 *Geolocalización GPS EUDR*\n` +
        `Lat: -8.1884, Lng: -76.5126 (Zona 3)\n` +
        `Precisión: 3.2m (12/12 Satélites)\n\n` +
        `¿Confirmar envío de acopio?`,
        [' Confirmar y Enviar Registro']
      );
      return;
    }

    if (stepState === 'CAPTURE_GPS') {
      const newLotObj = {
        id: draftLot.lotId,
        coopId: 'coop-valle-verde',
        coopName: 'Cooperativa Valle Verde',
        stage: 'Fermentación',
        stageStatus: 'Acopio Recibido - Iniciando Carga',
        weightKg: draftLot.weightKg || 500,
        variety: 'CCN-51',
        moisturePct: 52.0,
        fineAromaPct: 82,
        producer: draftLot.producer || 'Familia Quispe (Socio #104)',
        parcelId: 'PAR-304-TOCACHE',
        location: 'Tocache Alto, San Martín',
        coordinates: { lat: -8.1884, lng: -76.5126 },
        manager: 'Carlos Mendoza (Técnico de Campo via Telegram)',
        fermentationBox: 'Cajón Escalonado Laurel',
        fermentationHours: 0,
        fermentationStatus: 'Inicio de fermentación',
        dryingDays: 0,
        eudrVerified: true,
        photoEvidenceUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
        qrCodeId: `QR-${draftLot.lotId}-TELEGRAM`,
        lastUpdated: 'Recién actualizado',
        massBalance: { wetInputKg: draftLot.weightKg * 2 || 1000, dryOutputKg: draftLot.weightKg || 500, yieldPct: 50.0, status: 'En Proceso' }
      };

      onAddNewLot(newLotObj);
      setStepState(null);
      setDraftLot({});

      addBotMsg(
        `✅ *¡REGISTRO ACOPIO EXITOSO!*\n\n` +
        `• Lote: *${newLotObj.id}*\n` +
        `• Peso: *${newLotObj.weightKg} kg*\n` +
        `• Socio: *${newLotObj.producer}*\n` +
        `• GPS: ✅ Verificado EUDR\n\n` +
        `*Curva del Compromiso actualizada automáticamente en el Panel Web.*`,
        ['/mislotes', '/capacidad', 'Registrar otro acopio']
      );
      return;
    }

    addBotMsg(
      `Comando no reconocido. Puedes usar:\n` +
      `• /registrar\n` +
      `• /mislotes\n` +
      `• /alertas\n` +
      `• /capacidad`,
      ['/registrar', '/mislotes', '/alertas']
    );
  };

  const addBotMsg = (text, options = []) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'bot', text, options }
    ]);
  };

  return (
    <>
      {/* Floating Action Button (FAB) Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2">
        <button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-[#0088cc] hover:bg-[#0077b5] text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 cursor-pointer relative border-2 border-white/20"
          title="Abrir Bot de Telegram de Campo"
        >
          <MessageSquare className="w-6 h-6 text-white" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0088cc] rounded-full"></span>
        </button>
      </div>

      {/* Compact Popover Widget (Bottom Right) */}
      {isOpen && (
        <div className="fixed bottom-[88px] right-6 z-50 w-[360px] sm:w-[380px] h-[500px] bg-[#18222d] text-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#212d3b] px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-white block leading-tight">Bot Campo AgroConecta</span>
                <span className="text-[10px] text-sky-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>En línea • Valle Verde</span>
                </span>
              </div>
            </div>

            <button 
              onClick={onToggle}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages scroll */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[#0e1621] text-xs scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-xl shadow-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#2b5278] text-white rounded-br-none'
                      : 'bg-[#182533] text-slate-100 rounded-bl-none border border-slate-700/60'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5 max-w-[90%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(opt)}
                        className="bg-[#203040] hover:bg-[#2b4055] text-sky-300 hover:text-white border border-sky-500/30 px-2 py-0.5 rounded-full text-[10px] font-medium transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-[#17212b] border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe (/registrar, /mislotes)..."
              className="flex-1 bg-[#0e1621] text-white border border-slate-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500 placeholder-slate-500"
            />
            <button
              onClick={() => handleSend()}
              className="bg-sky-500 hover:bg-sky-600 text-white p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
