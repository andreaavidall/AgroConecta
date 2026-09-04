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
  Globe,
  ChevronDown,
  Wrench,
  HelpCircle,
  UserCheck,
  ShieldCheck,
  MoreHorizontal
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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const isBuyer = activeRole === 'buyer';

  // Primary navigation tabs (slim & focused)
  const coopPrimaryTabs = [
    { id: 'coop-dashboard', label: 'Inicio', icon: Building2 },
    { id: 'lots-management', label: 'Lotes & Acopio', icon: Layers },
    { id: 'coop-offers', label: 'Pedidos (20t)', icon: ShoppingBag, badge: activeOffersCount },
    { id: 'mass-balance', label: 'Control de Mermas', icon: Scale },
  ];

  const buyerPrimaryTabs = [
    { id: 'buyer-dashboard', label: 'Origen', icon: Building2 },
    { id: 'marketplace', label: 'Vitrina Ofertas', icon: ShoppingBag },
    { id: 'interactive-map', label: 'Mapa Zonas EUDR', icon: Map },
    { id: 'buyer-offers', label: 'Mis Pedidos', icon: FileCheck2, badge: activeOffersCount }
  ];

  const primaryTabs = isBuyer ? buyerPrimaryTabs : coopPrimaryTabs;

  return (
    <header className="text-white sticky top-0 z-30 shadow-md bg-[#0F2F24]/95 backdrop-blur-md border-b border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Single Streamlined Navbar (Desktop & Tablet) */}
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand + Role Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2 font-black text-sm tracking-wide">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-amber-300 shadow-inner">
                🌱
              </div>
              <span className="bg-gradient-to-r from-white via-emerald-100 to-amber-200 bg-clip-text text-transparent font-black tracking-wider text-base hidden sm:inline">
                AGROCONECTA
              </span>
            </div>

            {/* Role Switcher Toggle Pill */}
            <div className="bg-black/40 p-1 rounded-xl flex items-center border border-white/15 text-xs">
              <button
                onClick={() => {
                  setActiveRole('coop');
                  setActiveTab('coop-dashboard');
                }}
                className={`px-3 py-1 rounded-lg font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                  !isBuyer
                    ? 'bg-[#237A57] text-white shadow-sm border border-emerald-400/30'
                    : 'text-emerald-300/70 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Cooperativa</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveRole('buyer');
                  setActiveTab('buyer-dashboard');
                }}
                className={`px-3 py-1 rounded-lg font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                  isBuyer
                    ? 'bg-[#237A57] text-white shadow-sm border border-emerald-400/30'
                    : 'text-emerald-300/70 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Comprador</span>
              </button>
            </div>
          </div>

          {/* Center: Clean Primary Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-amber-300 border border-amber-400/30 font-black'
                      : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
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

            {/* Dropdown "Más Herramientas & Auditoría" for Coop */}
            {!isBuyer && (
              <div className="relative">
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    ['certificates', 'senamhi-weather', 'coop-profile', 'market-prices'].includes(activeTab) || isMoreMenuOpen
                      ? 'bg-emerald-500/20 text-amber-300 border border-amber-400/30 font-black'
                      : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-emerald-300" />
                  <span>Más & Auditoría</span>
                  <ChevronDown className="w-3 h-3 opacity-80" />
                </button>

                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 text-slate-800 z-50 text-xs animate-in fade-in duration-150">
                    <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Módulos de Auditoría
                    </div>
                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('certificates');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <Award className="w-4 h-4 text-[#237A57]" />
                      <span>Certificaciones Orgánicas</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('senamhi-weather');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <CloudSun className="w-4 h-4 text-sky-600" />
                      <span>Informes Climáticos SENAMHI</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('coop-profile');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <UserCheck className="w-4 h-4 text-amber-600" />
                      <span>Perfil de Organización</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('market-prices');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-700" />
                      <span>Precios de Referencia NY</span>
                    </button>

                    <div className="my-1 border-t border-slate-100" />
                    <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Herramientas Interactivas
                    </div>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenTelegram();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <MessageSquareCode className="w-4 h-4 text-sky-500" />
                      <span>Simulador Bot Telegram</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenOnboarding();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Configuración Guiada</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onTogglePracticeMode();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700"
                    >
                      <Gamepad2 className="w-4 h-4 text-rose-500" />
                      <span>{isPracticeMode ? 'Desactivar Modo Práctica' : 'Activar Modo Práctica'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenAssistant();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-100 flex items-center gap-2 font-semibold text-slate-700 border-t border-slate-100"
                    >
                      <HelpCircle className="w-4 h-4 text-[#174C3C]" />
                      <span>Ayuda Guiada MVP</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right: Active Coop Name & Action Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            {!isBuyer ? (
              <button 
                onClick={() => setActiveTab('coop-profile')}
                className="flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-800/80 px-3 py-1.5 rounded-xl border border-emerald-600/40 text-emerald-100 text-xs font-bold transition group"
                title="Ver Perfil de la Organización"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">{selectedCoopName || "Valle Verde"}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            ) : (
              <button
                onClick={onOpenAssistant}
                className="bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-emerald-600/30"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Ayuda</span>
              </button>
            )}

            {/* Quick Pedido Action Button */}
            <button
              onClick={() => onOpenCommitmentReport(false)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md transition transform hover:scale-[1.02] border border-amber-300 flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-slate-950" />
              <span>Pedido 20t</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Tabs (Row for small screens) */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 pt-1 border-t border-emerald-900/40 no-scrollbar">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                  isActive ? 'bg-emerald-500/30 text-amber-300 border border-amber-400/40' : 'text-emerald-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          {!isBuyer && (
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-200/80 whitespace-nowrap"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
              <span>Más</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
