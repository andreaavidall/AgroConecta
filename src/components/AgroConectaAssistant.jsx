import React from 'react';
import { Bot, X, Sparkles, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

export default function AgroConectaAssistant({ isOpen, onClose, activeTab, activeRole, selectedCoop, onNavigate }) {
  if (!isOpen) return null;

  // Explicaciones contextuales según la vista activa
  const getContextHelp = () => {
    switch (activeTab) {
      case 'coop-dashboard':
      case 'buyer-dashboard':
        return {
          title: "Dashboard de Operaciones & Capacidad",
          summary: "Esta pantalla resume la capacidad de entrega verificable, alertas de producción y tareas frecuentes del día.",
          keyConcept: "ATP vs CTP: ATP es el stock seco listo en almacén. CTP incluye acopio futuro ajustado por clima y capacidad de secado.",
          checklist: [
            "Revisa las tareas recomendadas según tu rol.",
            "Verifica la desviación de la curva de acopio (-4.9 t por lluvias).",
            "Atiende alertas de fermentación o faltante GPS antes de confirmar pedidos."
          ],
          recommendedAction: { label: "Evaluar Capacidad de Pedido (Calculadora ATP/CTP)", tab: "coop-offers" }
        };
      case 'marketplace':
      case 'market':
        return {
          title: "Vitrina de Oferta & Mercado",
          summary: "Aquí los compradores examinan la capacidad respaldada de cada cooperativa sin ver datos privados de productores.",
          keyConcept: "Capacidad Recomendada: Calculada determinísticamente desde inventario apto y acopio ajustado por riesgo.",
          checklist: [
            "Filtra por certificación (Orgánico UE / Fairtrade).",
            "Selecciona hasta 4 cooperativas para comparar matriz de riesgos.",
            "Solicita cotización o propuesta de cobertura conjunta si requieres un volumen mayor."
          ],
          recommendedAction: { label: "Comparar Cooperativas", tab: "compare" }
        };
      case 'lots-management':
      case 'mass-balance':
        return {
          title: "Gestión de Lotes & Balance de Masa",
          summary: "Rastrea cada lote desde el cacao en baba hasta el grano seco embolsado, calculando mermas y rendimientos.",
          keyConcept: "Fórmula de Rendimiento: (Kg Secos / Kg Baba) × 100. El rango óptimo en Perú es entre 45% y 52%.",
          checklist: [
            "Verifica que ningún lote fermentando supere las 108 horas.",
            "Revisa mermas fuera de tolerancia para evitar fugas de inventario.",
            "Escanea el código QR de cualquier lote para ver su genealogía completa."
          ],
          recommendedAction: { label: "Ver Balance de Masa", tab: "mass-balance" }
        };
      case 'certificates':
        return {
          title: "Biblioteca Documental & Certificaciones",
          summary: "Diferencia las certificaciones institucionales de la cooperativa de los documentos de despacho específicos por lote.",
          keyConcept: "Orgánico / Fairtrade cubren la cooperativa y parcelas. El Certificado SENASA se emite por cada embarque.",
          checklist: [
            "Renueva documentos con fecha de vencimiento menor a 30 días.",
            "Vincule cada certificado fitosanitario al lote correspondiente antes de despachar."
          ],
          recommendedAction: { label: "Revisar Certificados Orgánicos", tab: "certificates" }
        };
      case 'market-prices':
      case 'senamhi-weather':
        return {
          title: "Mercado ICE NY & Pronóstico SENAMHI",
          summary: "Consulta precios internacionales de bolsa y alertas meteorológicas oficiales que impactan el acopio.",
          keyConcept: "Diferencial de Origen: El precio final al productor suma primas orgánicas y resta costos logísticos/procesamiento.",
          checklist: [
            "Consulta el tipo de cambio del día (PEN / USD).",
            "Evalúa la precipitación en Uchiza para ajustar la curva de secado."
          ],
          recommendedAction: { label: "Ver Alerta Climática SENAMHI", tab: "senamhi-weather" }
        };
      default:
        return {
          title: "Asistente Virtual AgroConecta",
          summary: "Te ayuda a entender los cálculos de capacidad, riesgo, trazabilidad y cumplimiento de oferta.",
          keyConcept: "AgroConecta organiza información de campo para responder cuánto, cuándo y a qué precio puedes entregar.",
          checklist: ["Selecciona una opción del menú para recibir ayuda guiada."],
          recommendedAction: null
        };
    }
  };

  const context = getContextHelp();

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] bg-white rounded-2xl shadow-2xl border border-emerald-950/10 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="bg-[#174C3C] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-800/80 rounded-xl border border-emerald-600/40">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">Asistente AgroConecta</h3>
            <p className="text-xs text-emerald-200">Guía contextual explicable en tiempo real</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto bg-[#F6F8F5]">
        {/* Screen Banner */}
        <div className="bg-white p-3.5 rounded-xl border border-emerald-900/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#237A57] font-bold uppercase tracking-wider">
            <span>Pantalla actual</span>
            <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Rol: {activeRole === 'coop' ? 'Cooperativa' : 'Comprador'}</span>
          </div>
          <h4 className="font-bold text-slate-800 text-sm">{context.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{context.summary}</p>
        </div>

        {/* Key Concept Box */}
        <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>¿Cómo funciona esta regla?</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">{context.keyConcept}</p>
        </div>

        {/* Practical Checklist */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h5 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#237A57]" />
            Acciones recomendadas en esta vista
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {context.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#237A57] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Navigation Action */}
        {context.recommendedAction && (
          <button
            onClick={() => {
              if (onNavigate) onNavigate(context.recommendedAction.tab);
              if (onClose) onClose();
            }}
            className="w-full bg-[#237A57] text-white p-3 rounded-xl font-bold text-xs flex items-center justify-between hover:bg-[#174C3C] transition shadow-md group"
          >
            <span>{context.recommendedAction.label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Disclaimer */}
        <p className="text-[11px] text-slate-400 text-center italic">
          AgroConecta organiza datos determinísticos de campo. No sustituye la auditoría física ni autoridades oficiales.
        </p>
      </div>
    </div>
  );
}
