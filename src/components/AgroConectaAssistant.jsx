import React from 'react';
import { HelpCircle, X, Sparkles, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

export default function AgroConectaAssistant({ isOpen, onClose, activeTab, activeRole, selectedCoop, onNavigate }) {
  if (!isOpen) return null;

  // Guía contextual explicativa según la vista activa (Punto 13 Corregido)
  const getContextHelp = () => {
    switch (activeTab) {
      case 'coop-dashboard':
      case 'buyer-dashboard':
        return {
          title: "Inicio & Tareas de Operaciones",
          summary: "Esta pantalla permite seleccionar tareas específicas por rol (Acopiador, Planta, Comercial, Administrador) y revisar alertas.",
          keyConcept: "Disponible hoy vs Probable para la fecha: 'Disponible hoy' es el grano seco listo en almacén. 'Probable para la fecha' incluye acopio en proceso ajustado por secado.",
          checklist: [
            "Filtra las tareas según tu rol activo.",
            "Revisa la desviación del acopio (-4.9 t por lluvias).",
            "Consulta las alertas meteorológicas registradas antes de responder a un comprador."
          ],
          recommendedAction: { label: "Evaluar Capacidad de Pedido", tab: "coop-offers" }
        };
      case 'marketplace':
      case 'market':
        return {
          title: "Vitrina de Ofertas Cacaoteras",
          summary: "Permite examinar la capacidad respaldada de cada cooperativa con información comunitaria geolocalizada.",
          keyConcept: "Capacidad Recomendada: Calculada a partir del grano seco disponible en almacén y el acopio en proceso.",
          checklist: [
            "Filtra por certificaciones institucionales (Orgánico UE / Fairtrade).",
            "Compara hasta 4 cooperativas en paralelo.",
            "Solicita cotización formal o propuesta de cobertura conjunta."
          ],
          recommendedAction: { label: "Comparar Cooperativas", tab: "compare" }
        };
      case 'lots-management':
      case 'mass-balance':
        return {
          title: "Control de Entradas, Salidas y Mermas",
          summary: "Rastrea cada lote desde el acopio en baba hasta el embolsado de grano seco.",
          keyConcept: "Regla del Balance: Entrada (kg) = Salida (kg) + Merma evaporación (kg) + Saldo en proceso (kg).",
          checklist: [
            "Verifica que la fermentación no supere las 108 horas máximas.",
            "Revisa que las salidas de lotes en proceso figuren como 'Salida estimada'.",
            "Escanea el código QR para ver la genealogía del lote."
          ],
          recommendedAction: { label: "Ver Control de Mermas", tab: "mass-balance" }
        };
      case 'certificates':
        return {
          title: "Biblioteca Documental & SENASA",
          summary: "Diferencia las certificaciones de la organización de los certificados fitosanitarios SENASA emitidos por embarque.",
          keyConcept: "Orgánico / Fairtrade son permanentes. El certificado SENASA se tramita individualmente por lote a despachar.",
          checklist: [
            "Revisa la fecha de vencimiento de las certificaciones.",
            "Vincula el certificado fitosanitario de despacho al lote a exportar."
          ],
          recommendedAction: { label: "Revisar Certificados", tab: "certificates" }
        };
      default:
        return {
          title: "Ayuda Guiada del MVP",
          summary: "Explicación contextual para comprender los cálculos de capacidad, riesgo y trazabilidad.",
          keyConcept: "AgroConecta organiza información de campo para responder cuánto, cuándo y a qué precio se puede entregar.",
          checklist: ["Selecciona una opción para guiar tu navegación."],
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
            <HelpCircle className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">Ayuda Guiada del MVP</h3>
            <p className="text-xs text-emerald-200">Explicación contextual de pantalla y reglas</p>
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
            Acciones guiadas en esta vista
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
          AgroConecta organiza evidencias y apoya la preparación documental, pero no sustituye autoridades oficiales.
        </p>
      </div>
    </div>
  );
}
