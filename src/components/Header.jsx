import React from 'react';
import { 
  Building2, 
  ShoppingBag, 
  MessageSquareCode, 
  FileCheck2, 
  Users, 
  Layers, 
  Map, 
  CloudSun, 
  TrendingUp, 
  Award, 
  Scale, 
  History, 
  Gamepad2, 
  Bot, 
  Sparkles, 
  Download,
  Calendar,
  ChevronDown
} from 'lucide-react';

export default function Header({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  onOpenTelegram,
  onOpenCommitmentReport,
  onOpenOnboarding,
  onOpenExcelImport,
  isPracticeMode,
  onTogglePracticeMode,
  activeOffersCount,
  alertsCount,
  selectedCoopName,
  onSelectCoopByName
}) {

  // Opciones de navegación adaptadas por Rol (Sección 21.1)
  const coopNavTabs = [
    { id: 'coop-dashboard', label: '¿Qué hacer hoy?', icon: Building2 },
    { id: 'lots-management', label: 'Lotes & Proceso', icon: Layers },
    { id: 'coop-offers', label: 'Pedidos & Calculadora ATP/CTP', icon: ShoppingBag, badge: activeOffersCount },
    { id: 'mass-balance', label: 'Balance de Masa', icon: Scale },
    { id: 'certificates', label: 'Certificaciones & SENASA', icon: Award },
    { id: 'senamhi-weather', label: 'Clima SENAMHI & Bolsa ICE', icon: CloudSun }
  ];

  const buyerNavTabs = [
    { id: 'buyer-dashboard', label: 'Resumen Oferta Verificable', icon: Building2 },
    { id: 'marketplace', label: 'Vitrina de Orígenes', icon: ShoppingBag },
    { id: 'interactive-map', label: 'Mapa EUDR (Zonas)', icon: Map },
    { id: 'buyer-offers', label: 'Mis Pedidos & Cotizaciones', icon: FileCheck2, badge: activeOffersCount },
    { id: 'market-prices', label: 'Precios de Bolsa ICE NY', icon: TrendingUp }
  ];

  const currentTabs = activeRole === 'coop' ? coopNavTabs : buyerNavTabs;

  return (
    <header className="bg-[#174C3C] text-white border-b border-emerald-950/40 sticky top-0 z-30 shadow-md">
      
      {/* Top Utility Bar */}
      <div className="bg-[#0F3529] px-4 sm:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/50">
        
        {/* Active Organization & Campaign Context */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AGROCONECTA PERÚ</span>
          </div>

          <span className="text-emerald-700">|</span>

          {/* Active Coop Badge */}
          <div className="flex items-center gap-1 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-700/50 text-emerald-200">
            <Building2 className="w-3 h-3 text-amber-300" />
            <span className="font-semibold text-[11px]">{selectedCoopName}</span>
          </div>

          {/* Active Campaign Badge */}
          <div className="hidden md:flex items-center gap-1 bg-emerald-900/50 px-2 py-0.5 rounded-md text-emerald-300 text-[11px]">
            <Calendar className="w-3 h-3 text-emerald-400" />
            <span>Campaña Cacao 2026</span>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2">
          
          {/* Demo Mode Indicator */}
          <span className="hidden lg:inline-block px-2 py-0.5 bg-emerald-950/60 rounded text-[10px] text-emerald-300 font-mono border border-emerald-800">
            Modo Demostración (Local Repository)
          </span>

          {/* Guided Setup Launcher */}
          {activeRole === 'coop' && (
            <button
              onClick={onOpenOnboarding}
              className="bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition border border-emerald-600/40"
              title="Configuración Inicial Guiada"
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">Configuración Guiada</span>
            </button>
          )}

          {/* Practice Mode Toggle Button */}
          <button
            onClick={onTogglePracticeMode}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition ${
              isPracticeMode
                ? 'bg-amber-500 text-slate-900 shadow-inner'
                : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50'
            }`}
            title="Activar o desactivar entorno seguro de práctica"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{isPracticeMode ? 'Modo Práctica Activo' : 'Activar Modo Práctica'}</span>
          </button>

          {/* Telegram Field Simulator Button */}
          <button
            onClick={onOpenTelegram}
            className="bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Bot Telegram Campo</span>
          </button>

          {/* Role Switcher */}
          <div className="ml-2 bg-emerald-950 p-0.5 rounded-lg flex items-center border border-emerald-800/60">
            <button
              onClick={() => {
                setActiveRole('coop');
                setActiveTab('coop-dashboard');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                activeRole === 'coop'
                  ? 'bg-[#237A57] text-white shadow-sm'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              Portal Cooperativa
            </button>
            <button
              onClick={() => {
                setActiveRole('buyer');
                setActiveTab('buyer-dashboard');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                activeRole === 'buyer'
                  ? 'bg-[#237A57] text-white shadow-sm'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              Portal Comprador
            </button>
          </div>

        </div>

      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {currentTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-800 text-amber-300 shadow-inner border border-emerald-600/50'
                    : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-300'}`} />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Commitment Report Quick Trigger */}
        <button
          onClick={() => onOpenCommitmentReport(false)}
          className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-black shadow-md transition transform hover:scale-[1.02]"
        >
          <FileCheck2 className="w-4 h-4 text-slate-950" />
          <span>Calculadora ATP/CTP (20t)</span>
        </button>

      </div>

    </header>
  );
}
