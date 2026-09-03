import React from 'react';
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
  ShieldCheck,
  CheckCircle2,
  ChevronRight
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
    { id: 'buyer-dashboard', label: 'Resumen del Origen', icon: Building2 },
    { id: 'marketplace', label: 'Vitrina de Ofertas', icon: ShoppingBag },
    { id: 'interactive-map', label: 'Mapa EUDR (Zonas)', icon: Map },
    { id: 'buyer-offers', label: 'Mis Pedidos & Cotizaciones', icon: FileCheck2, badge: activeOffersCount },
    { id: 'market-prices', label: 'Cotizaciones Bolsa ICE NY', icon: TrendingUp }
  ];

  const currentTabs = activeRole === 'coop' ? coopNavTabs : buyerNavTabs;
  const isBuyer = activeRole === 'buyer';

  return (
    <header className={`text-white sticky top-0 z-30 shadow-lg border-b transition-colors duration-300 ${
      isBuyer 
        ? 'bg-gradient-to-r from-[#0B291E] via-[#123B2C] to-[#0E2F22] border-emerald-900/60' 
        : 'bg-gradient-to-r from-[#174C3C] via-[#1E5D4A] to-[#0F3529] border-emerald-900/40'
    }`}>
      
      {/* Top Utility Header Bar */}
      <div className="bg-black/30 backdrop-blur-md px-4 sm:px-8 py-2 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left Brand Identity & Context */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-black text-sm tracking-wide text-white">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-amber-300">
                🌱
              </div>
              <span className="bg-gradient-to-r from-white via-emerald-100 to-amber-200 bg-clip-text text-transparent">
                AGROCONECTA
              </span>
            </div>

            <span className="text-emerald-700/60 hidden sm:inline">|</span>

            {/* Context Badge based on Role */}
            {isBuyer ? (
              <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/40 text-emerald-200">
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-semibold text-[11px]">Vitrina Internacional de Oferta Verificable (EUDR)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-emerald-900/90 px-2.5 py-0.5 rounded-full border border-emerald-700/50 text-emerald-100">
                  <Building2 className="w-3 h-3 text-amber-300" />
                  <span className="font-bold text-[11px]">{selectedCoopName}</span>
                </div>
                <div className="hidden md:flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-md text-emerald-300 text-[11px]">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Campaña 2026</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Tools & Role Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Coop-specific field tools */}
            {!isBuyer && (
              <>
                <button
                  onClick={onOpenOnboarding}
                  className="bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition border border-emerald-600/40"
                  title="Configuración Inicial Guiada"
                >
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">Configuración Guiada</span>
                </button>

                <button
                  onClick={onTogglePracticeMode}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition ${
                    isPracticeMode
                      ? 'bg-amber-500 text-slate-900 shadow-inner'
                      : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50'
                  }`}
                  title="Activar entorno seguro de práctica"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{isPracticeMode ? 'Modo Práctica Activo' : 'Modo Práctica'}</span>
                </button>

                <button
                  onClick={onOpenTelegram}
                  className="bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
                >
                  <MessageSquareCode className="w-3.5 h-3.5" />
                  <span>Bot Telegram</span>
                </button>
              </>
            )}

            {/* Contextual Assistant Launcher */}
            <button
              onClick={onOpenAssistant}
              className="bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition border border-emerald-600/30"
              title="Abrir Asistente Explicativo"
            >
              <Bot className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Ayuda Contextual</span>
            </button>

            {/* Premium Role Switcher Toggle */}
            <div className="ml-1 bg-black/40 p-1 rounded-xl flex items-center border border-white/10">
              <button
                onClick={() => {
                  setActiveRole('coop');
                  setActiveTab('coop-dashboard');
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all duration-200 flex items-center gap-1 ${
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
                className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all duration-200 flex items-center gap-1 ${
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
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
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

        {/* ATP/CTP Calculator Button */}
        <button
          onClick={() => onOpenCommitmentReport(false)}
          className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition transform hover:scale-[1.02] border border-amber-300/40"
        >
          <FileCheck2 className="w-4 h-4 text-slate-950" />
          <span>Calculadora ATP/CTP (20t)</span>
        </button>

      </div>

    </header>
  );
}
