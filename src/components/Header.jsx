import React, { useState } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  MessageSquareCode, 
  FileCheck2, 
  Layers, 
  Map, 
  CloudSun, 
  TrendingUp, 
  Award, 
  Scale, 
  Gamepad2, 
  Sparkles, 
  Calendar,
  Globe,
  Bot,
  ChevronDown,
  Wrench,
  HelpCircle
} from 'lucide-react';

export default function Header({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  onOpenTelegram,
  onOpenCommitmentReport,
  onOpenOnboarding,
  onOpenAssistant,
  isPracticeMode,
  onTogglePracticeMode,
  activeOffersCount,
  selectedCoopName
}) {
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  // Navegación con Terminología Clara y Retiro de ICE NY de la Barra Principal (Puntos 11 & 13)
  const coopNavTabs = [
    { id: 'coop-dashboard', label: 'Inicio & Tareas', icon: Building2 },
    { id: 'lots-management', label: 'Lotes & Proceso', icon: Layers },
    { id: 'coop-offers', label: 'Pedidos & Capacidad', icon: ShoppingBag, badge: activeOffersCount },
    { id: 'mass-balance', label: 'Control de Mermas', icon: Scale },
    { id: 'certificates', label: 'Certificaciones', icon: Award },
    { id: 'senamhi-weather', label: 'Informes Climáticos', icon: CloudSun }
  ];

  const buyerNavTabs = [
    { id: 'buyer-dashboard', label: 'Resumen del Origen', icon: Building2 },
    { id: 'marketplace', label: 'Vitrina de Ofertas', icon: ShoppingBag },
    { id: 'interactive-map', label: 'Mapa de Zonas EUDR', icon: Map },
    { id: 'buyer-offers', label: 'Mis Pedidos', icon: FileCheck2, badge: activeOffersCount }
  ];

  const currentTabs = activeRole === 'coop' ? coopNavTabs : buyerNavTabs;
  const isBuyer = activeRole === 'buyer';

  return (
    <header className={`text-white sticky top-0 z-30 shadow-lg border-b transition-colors duration-300 ${
      isBuyer 
        ? 'bg-gradient-to-r from-[#0B291E] via-[#123B2C] to-[#0E2F22] border-emerald-900/60' 
        : 'bg-gradient-to-r from-[#174C3C] via-[#1F5F4B] to-[#123E30] border-emerald-900/40'
    }`}>
      
      {/* Top Utility Header Bar */}
      <div className="bg-black/25 backdrop-blur-md px-4 sm:px-8 py-2 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand Identity & Active Context */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-black text-sm tracking-wide text-white">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-amber-300 shadow-inner">
                🌱
              </div>
              <span className="bg-gradient-to-r from-white via-emerald-100 to-amber-200 bg-clip-text text-transparent font-black tracking-wider">
                AGROCONECTA
              </span>
            </div>

            <span className="text-emerald-700/60">|</span>

            {/* Context Badge */}
            {isBuyer ? (
              <div className="flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/40 text-emerald-200">
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-semibold text-[11px] hidden sm:inline">Vitrina de Oferta Cacaotera</span>
                <span className="font-semibold text-[11px] sm:hidden">Oferta Cacao</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-emerald-900/90 px-3 py-1 rounded-full border border-emerald-600/50 text-emerald-100 shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-bold text-[11px]">{selectedCoopName}</span>
                </div>
                <div className="hidden md:flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-md text-emerald-300 text-[11px] border border-emerald-800/40">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Campaña 2026</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Tools & Role Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Coop-specific Field Bot Button */}
            {!isBuyer && (
              <button
                onClick={onOpenTelegram}
                className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition shadow-sm border border-sky-400/30"
              >
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulación Bot</span>
              </button>
            )}

            {/* Config & Tools Dropdown for Coop */}
            {!isBuyer && (
              <div className="relative">
                <button
                  onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                  className="bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition border border-emerald-600/40"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Herramientas</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {isToolsDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 text-slate-800 z-50 text-xs animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setIsToolsDropdownOpen(false);
                        onOpenOnboarding();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-medium text-slate-700"
                    >
                      <Sparkles className="w-4 h-4 text-[#237A57]" />
                      <span>Configuración Guiada</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsToolsDropdownOpen(false);
                        onTogglePracticeMode();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-medium text-slate-700"
                    >
                      <Gamepad2 className="w-4 h-4 text-amber-600" />
                      <span>{isPracticeMode ? 'Desactivar Modo Práctica' : 'Activar Modo Práctica'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsToolsDropdownOpen(false);
                        setActiveTab('market-prices');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-medium text-slate-700"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-700" />
                      <span>Referencia Comercial Simulada</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsToolsDropdownOpen(false);
                        onOpenAssistant();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-medium text-slate-700 border-t border-slate-100"
                    >
                      <HelpCircle className="w-4 h-4 text-[#174C3C]" />
                      <span>Ayuda Guiada del MVP</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Contextual Assistant Button for Buyer View */}
            {isBuyer && (
              <button
                onClick={onOpenAssistant}
                className="bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition border border-emerald-600/30"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Ayuda Guiada</span>
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="ml-1 bg-black/40 p-0.5 rounded-xl flex items-center border border-white/15">
              <button
                onClick={() => {
                  setActiveRole('coop');
                  setActiveTab('coop-dashboard');
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all duration-200 flex items-center gap-1.5 ${
                  !isBuyer
                    ? 'bg-[#237A57] text-white shadow-md border border-emerald-400/30'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Building2 className="w-3 h-3" />
                <span>Cooperativa</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveRole('buyer');
                  setActiveTab('buyer-dashboard');
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all duration-200 flex items-center gap-1.5 ${
                  isBuyer
                    ? 'bg-[#237A57] text-white shadow-md border border-emerald-400/30'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Comprador</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {currentTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white/15 text-amber-300 shadow-inner border border-amber-400/30 font-black'
                    : 'text-emerald-100/90 hover:bg-white/10 hover:text-white'
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
          className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition transform hover:scale-[1.02] border border-amber-300/40"
        >
          <FileCheck2 className="w-4 h-4 text-slate-950" />
          <span>Revisión de Pedido (20t)</span>
        </button>

      </div>

    </header>
  );
}
