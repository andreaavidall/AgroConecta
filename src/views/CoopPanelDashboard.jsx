import React from 'react';
import { 
  Building2, 
  PlusCircle, 
  Layers, 
  Scale, 
  ShoppingBag, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquareCode, 
  CloudSun, 
  FileSpreadsheet, 
  ShieldCheck, 
  Sparkles,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import CommitmentCurveChart from '../components/CommitmentCurveChart';

export default function CoopPanelDashboard({
  cooperative,
  alerts,
  offers,
  commitmentCurveData,
  onOpenTelegram,
  onOpenLotManagement,
  onOpenOffersView,
  onOpenWeatherView,
  onOpenExcelImport,
  onAcceptOffer
}) {
  const coopName = cooperative?.name || "Cooperativa Valle Verde";

  // Desglose de Stock Físico (ATP / CTP)
  const stockAptoTons = (cooperative?.stockAptoKg || 5000) / 1000;
  const acopioProyectadoTons = (cooperative?.acopioProyectadoKg || 15000) / 1000;
  const deviationTons = (cooperative?.deviationKg || -4900) / 1000;

  // 6 Tareas Frecuentes del Día según Rol Operativo (Sección 21.1)
  const dailyTasks = [
    {
      id: 'task-acopio',
      title: 'Registrar una Entrega / Acopio',
      subtitle: 'Ingresa peso bruto, tara y calidad del grano recién llegado.',
      icon: PlusCircle,
      badge: 'Acopiador',
      actionLabel: 'Abrir Bot Telegram o Formulario',
      onClick: onOpenTelegram,
      color: 'bg-emerald-50 border-emerald-200 text-[#174C3C]'
    },
    {
      id: 'task-inventario',
      title: 'Consultar Inventario & Stock Apto',
      subtitle: `${stockAptoTons} t de grano seco listo para despacho inmediato (ATP).`,
      icon: Scale,
      badge: 'Almacenero',
      actionLabel: 'Ver Kardex & Movimientos',
      onClick: onOpenLotManagement,
      color: 'bg-amber-50 border-amber-200 text-amber-900'
    },
    {
      id: 'task-[#174C3C]tes',
      title: 'Crear o Continuar Lote de Proceso',
      subtitle: 'Monitorea fermentación (cajones) y secado (marquesinas).',
      icon: Layers,
      badge: 'Jefe de Planta',
      actionLabel: 'Gestión de Lotes',
      onClick: onOpenLotManagement,
      color: 'bg-sky-50 border-sky-200 text-sky-900'
    },
    {
      id: 'task-evaluar-pedido',
      title: 'Evaluar Pedido & Capacidad ATP/CTP',
      subtitle: `${offers.length} cotizaciones pendientes de evaluación de brecha.`,
      icon: ShoppingBag,
      badge: 'Gerente Comercial',
      actionLabel: 'Revisar Pedidos Pendientes',
      onClick: onOpenOffersView,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900'
    },
    {
      id: 'task-alertas',
      title: 'Resolver Alertas Pendientes',
      subtitle: `${alerts.length} avisos operativos y meteorológicos activos.`,
      icon: AlertTriangle,
      badge: 'Operaciones',
      actionLabel: 'Ver Alertas Climáticas SENAMHI',
      onClick: onOpenWeatherView,
      color: 'bg-rose-50 border-rose-200 text-rose-900'
    },
    {
      id: 'task-excel',
      title: 'Importación Masiva Excel',
      subtitle: 'Carga lista de socios, parcelas y stock inicial.',
      icon: FileSpreadsheet,
      badge: 'Administración',
      actionLabel: 'Importar Archivo Excel',
      onClick: onOpenExcelImport,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-300" />
            <span>Panel de Gestión Operativa & Cumplimiento</span>
          </div>
          <h1 className="text-2xl font-black">{coopName}</h1>
          <p className="text-xs text-emerald-200 max-w-xl leading-relaxed">
            Monitorea el avance de la campaña, la curva de acopio determinística y responde pedidos con capacidad verificable (ATP / CTP).
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={onOpenTelegram}
            className="bg-[#237A57] hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md border border-emerald-500/30"
          >
            <MessageSquareCode className="w-4 h-4 text-sky-300" />
            <span>Simulador Telegram Campo</span>
          </button>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Main Task Grid: "¿Qué necesitas hacer hoy?" (Sección 21.1) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#237A57]" />
            ¿Qué necesitas hacer hoy?
          </h2>
          <span className="text-xs text-slate-500 font-medium">Selecciona tu tarea según tu rol activo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dailyTasks.map((task) => {
            const Icon = task.icon;
            return (
              <div
                key={task.id}
                onClick={task.onClick}
                className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group ${task.color}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-slate-200">
                      {task.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#174C3C] transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900/10 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:translate-x-0.5 transition-transform">
                  <span>{task.actionLabel}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytics & Early Warning Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Commitment Curve Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Curva de Acopio Campaña 2026</h3>
              <p className="text-xs text-slate-500">Comparación entre acopio proyectado determinístico y entregas reales</p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <TrendingDown className="w-3.5 h-3.5" />
                Desviación actual: {deviationTons} t
              </span>
            </div>
          </div>

          {/* Commitment Curve Chart Component */}
          <div className="h-64">
            <CommitmentCurveChart data={commitmentCurveData} />
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Motivo de Desviación:</strong> La Estación SENAMHI Tocache reportó 68mm de lluvia acumulada en 72h (Zona 5 Uchiza), retrasando temporalmente el secado solar en marquesinas y ajustando la capacidad CTP de la Semana 5.
            </p>
          </div>
        </div>

        {/* Right Col: Actionable Early Warning Alerts (Sección 29.1 P0-6) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Alertas Operativas Activas
              </h3>
              <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                {alerts.length} Alertas
              </span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {alerts.map((alt) => (
                <div key={alt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="text-amber-700">{alt.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{alt.zone}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{alt.message}</p>
                  
                  {/* Actionable Button tailored to alert type */}
                  <button
                    onClick={onOpenWeatherView}
                    className="w-full mt-1 bg-white hover:bg-slate-100 text-slate-800 p-2 rounded-lg font-bold border border-slate-300 flex items-center justify-between transition shadow-2xs"
                  >
                    <span>{alt.actionLabel || "Ver Detalle & Solución"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#237A57]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            Alertas respaldadas por telemetría SENAMHI y bitácoras de planta.
          </div>
        </div>

      </div>

    </div>
  );
}
