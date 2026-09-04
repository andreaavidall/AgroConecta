import React, { useState } from 'react';
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
  TrendingUp,
  RefreshCw,
  ChevronRight,
  UserCheck,
  Wrench,
  FileText
} from 'lucide-react';
import CommitmentCurveChart from '../components/CommitmentCurveChart';
import { UNIFIED_ORDER_METRICS } from '../data/mockData';

export default function CoopPanelDashboard({
  cooperative,
  alerts,
  offers,
  commitmentCurveData,
  onOpenWhatsApp,
  onOpenLotManagement,
  onOpenOffersView,
  onOpenWeatherView,
  onOpenExcelImport,
  onAcceptOffer
}) {
  const [activeRoleFilter, setActiveRoleFilter] = useState('all'); // 'all' | 'acopiador' | 'planta' | 'comercial' | 'admin'

  const coopName = cooperative?.name || "Cooperativa Valle Verde";

  // Cifras Unificadas Auditoría (Puntos 2 & 13)
  const availableTodayTons = UNIFIED_ORDER_METRICS.availableTodayTons; // 4.0 t (ATP)
  const probableDateTons = UNIFIED_ORDER_METRICS.probableDateTons;    // 12.0 t (CTP)
  const deviationTons = (cooperative?.deviationKg || -4900) / 1000;   // -4.9 t

  // Tareas Frecuentes Filtradas por Rol Operativo (Punto 12 Corregido)
  const roleTasksMap = {
    acopiador: [
      { id: 't-1', title: 'Registrar una Entrega / Pesaje', subtitle: 'Ingresa peso bruto, tara y calidad del grano recién llegado.', icon: PlusCircle, onClick: onOpenWhatsApp, color: 'bg-emerald-50 border-emerald-200 text-[#174C3C]' },
      { id: 't-2', title: 'Continuar Borrador Pendiente', subtitle: 'Revisa entregas guardadas en memoria local.', icon: FileText, onClick: onOpenWhatsApp, color: 'bg-sky-50 border-sky-200 text-sky-900' },
      { id: 't-3', title: 'Consultar Últimas Recepciones', subtitle: 'Verifica los últimos 15 ingresos en centro de acopio.', icon: Scale, onClick: onOpenLotManagement, color: 'bg-amber-50 border-amber-200 text-amber-900' }
    ],
    planta: [
      { id: 't-4', title: 'Lotes Activos en Proceso', subtitle: 'Monitorea cajones de fermentación y marquesinas de secado.', icon: Layers, onClick: onOpenLotManagement, color: 'bg-sky-50 border-sky-200 text-sky-900' },
      { id: 't-5', title: 'Registrar Fermentación & Volteos', subtitle: 'Registra temperaturas y horas acumuladas (máx 108h).', icon: RefreshCw, onClick: onOpenLotManagement, color: 'bg-amber-50 border-amber-200 text-amber-900' },
      { id: 't-6', title: 'Registrar Secado & Humedad', subtitle: 'Control diario de porcentaje de humedad hasta alcanzar 7.0%.', icon: Scale, onClick: onOpenLotManagement, color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
      { id: 't-7', title: 'Resolver Alertas de Proceso', subtitle: 'Atiende lotes fuera de rango óptimo.', icon: AlertTriangle, onClick: onOpenWeatherView, color: 'bg-rose-50 border-rose-200 text-rose-900' }
    ],
    comercial: [
      { id: 't-8', title: 'Pedidos Pendientes de Evaluación', subtitle: `${offers.length} cotizaciones recibidas con revisión de brecha.`, icon: ShoppingBag, onClick: onOpenOffersView, color: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
      { id: 't-9', title: 'Cantidad Disponible Hoy (4 t)', subtitle: 'Grano seco en almacén disponible para despacho inmediato.', icon: CheckCircle2, onClick: onOpenOffersView, color: 'bg-emerald-50 border-emerald-200 text-[#174C3C]' },
      { id: 't-10', title: 'Cantidad Probable para la Fecha (12 t)', subtitle: 'Proyección de acopio ajustada por precipitaciones.', icon: TrendingUp, onClick: onOpenOffersView, color: 'bg-amber-50 border-amber-200 text-amber-900' },
      { id: 't-11', title: 'Enviar Contraoferta o Fecha', subtitle: 'Responde propuestas con respaldos determinísticos.', icon: ArrowRight, onClick: onOpenOffersView, color: 'bg-slate-50 border-slate-200 text-slate-900' }
    ],
    admin: [
      { id: 't-12', title: 'Configuración Inicial Guiada', subtitle: 'Ajusta datos de la organización, acopio y parámetros.', icon: Sparkles, onClick: onOpenOffersView, color: 'bg-emerald-50 border-emerald-200 text-[#174C3C]' },
      { id: 't-13', title: 'Importación Masiva Excel', subtitle: 'Carga lista de productores socios y parcelas.', icon: FileSpreadsheet, onClick: onOpenExcelImport, color: 'bg-sky-50 border-sky-200 text-sky-900' },
      { id: 't-14', title: 'Auditoría & Documentos', subtitle: 'Revisa vigencia de certificados orgánicos y fitosanitarios.', icon: ShieldCheck, onClick: onOpenOffersView, color: 'bg-amber-50 border-amber-200 text-amber-900' }
    ]
  };

  const getFilteredTasks = () => {
    if (activeRoleFilter === 'all') {
      return [
        roleTasksMap.acopiador[0],
        roleTasksMap.planta[0],
        roleTasksMap.comercial[0],
        roleTasksMap.comercial[1],
        roleTasksMap.planta[3],
        roleTasksMap.admin[1]
      ];
    }
    return roleTasksMap[activeRoleFilter] || [];
  };

  const displayedTasks = getFilteredTasks();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Executive Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0D261E] via-[#164234] to-[#0B2119] text-white p-6 rounded-2xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-emerald-800/40 relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold px-3 py-0.5 rounded-full border border-emerald-500/30 tracking-wide uppercase flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              Gestión Operativa & Auditoría CABA
            </span>
            <span className="bg-amber-400/20 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Campaña 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{coopName}</h1>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Plataforma determinística de acopio. Responde cotizaciones separando estrictamente la <span className="font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">Disponible Hoy: {availableTodayTons} t (ATP)</span> de la <span className="font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">Probable Fecha: {probableDateTons} t (CTP)</span>.
          </p>
        </div>

        {/* Right Metric Summary Chips & Bot Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] text-emerald-300/80 uppercase font-bold block">Capacidad Respaldada</span>
              <span className="font-black text-white text-sm">16.0 t <span className="text-emerald-400 text-xs font-normal">(80%)</span></span>
            </div>
            <div className="h-7 w-px bg-white/15" />
            <div>
              <span className="text-[10px] text-amber-300/80 uppercase font-bold block">Brecha Riesgo</span>
              <span className="font-black text-amber-300 text-sm">4.0 t <span className="text-amber-400 text-xs font-normal">(20%)</span></span>
            </div>
          </div>

          <button
            onClick={onOpenWhatsApp}
            className="bg-[#237A57] hover:bg-emerald-600 text-white px-4 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition shadow-md border border-emerald-400/30 whitespace-nowrap cursor-pointer"
          >
            <MessageSquareCode className="w-4 h-4 text-emerald-300" />
            <span>Simular Bot WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Task Grid: "¿Qué necesitas hacer hoy?" filtrado por Rol (Punto 12 Corregido) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#237A57]" />
            ¿Qué necesitas hacer hoy?
          </h2>

          {/* Role Filter Tabs (Punto 12 Corregido) */}
          <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-bold text-slate-700 overflow-x-auto">
            <button
              onClick={() => setActiveRoleFilter('all')}
              className={`px-3 py-1 rounded-lg transition ${activeRoleFilter === 'all' ? 'bg-[#237A57] text-white' : 'hover:bg-slate-300'}`}
            >
              Todos los roles
            </button>
            <button
              onClick={() => setActiveRoleFilter('acopiador')}
              className={`px-3 py-1 rounded-lg transition ${activeRoleFilter === 'acopiador' ? 'bg-[#237A57] text-white' : 'hover:bg-slate-300'}`}
            >
              Acopiador
            </button>
            <button
              onClick={() => setActiveRoleFilter('planta')}
              className={`px-3 py-1 rounded-lg transition ${activeRoleFilter === 'planta' ? 'bg-[#237A57] text-white' : 'hover:bg-slate-300'}`}
            >
              Jefe de Planta
            </button>
            <button
              onClick={() => setActiveRoleFilter('comercial')}
              className={`px-3 py-1 rounded-lg transition ${activeRoleFilter === 'comercial' ? 'bg-[#237A57] text-white' : 'hover:bg-slate-300'}`}
            >
              Gerente Comercial
            </button>
            <button
              onClick={() => setActiveRoleFilter('admin')}
              className={`px-3 py-1 rounded-lg transition ${activeRoleFilter === 'admin' ? 'bg-[#237A57] text-white' : 'hover:bg-slate-300'}`}
            >
              Administrador
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedTasks.map((task) => {
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
                  <span>Ejecutar tarea</span>
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
        <div className="lg:col-span-2">
          <CommitmentCurveChart data={commitmentCurveData} deviationTons={deviationTons} />
        </div>

        {/* Right Col: Actionable Early Warning Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Alertas Operativas Activas
              </h3>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
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
            Información basada en registros de inventario y datos históricos.
          </div>
        </div>

      </div>

    </div>
  );
}
