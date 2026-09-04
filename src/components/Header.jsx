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

  // Navegación principal reducida y enfocado
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
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs border-b border-slate-200 text-slate-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Streamlined Navbar Header Row */}
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Identity & Active Organization */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2 font-black text-sm tracking-tight cursor-pointer" onClick={() => setActiveTab(isBuyer ? 'buyer-dashboard' : 'coop-dashboard')}>
              <div className="w-8 h-8 rounded-xl bg-[#174C3C] text-white flex items-center justify-center font-black text-base shadow-sm">
                🌱
              </div>
              <div className="flex flex-col">
                <span className="text-[#174C3C] font-black tracking-wider text-base leading-none">
                  AGROCONECTA
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  AgriTech Peru
                </span>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            {/* Active Organization Pill (Coop) */}
            {!isBuyer ? (
              <button 
                onClick={() => setActiveTab('coop-profile')}
                className="hidden lg:flex items-center gap-1.5 bg-emerald-50/80 hover:bg-emerald-100 text-[#174C3C] px-3 py-1 rounded-full text-xs font-bold border border-emerald-200/80 transition shadow-2xs group"
                title="Ver Perfil de la Organización"
              >
                <Building2 className="w-3.5 h-3.5 text-[#237A57]" />
                <span>{selectedCoopName || "Cooperativa Valle Verde"}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            ) : (
              <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>Comprador Internacional</span>
              </div>
            )}
          </div>

          {/* Center: Clean Modern Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-[#174C3C] border border-emerald-200/80 font-black shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#174C3C]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className="bg-[#237A57] text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Dropdown "Herramientas & Auditoría" for Coop */}
            {!isBuyer && (
              <div className="relative">
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    ['certificates', 'senamhi-weather', 'coop-profile', 'market-prices'].includes(activeTab) || isMoreMenuOpen
                      ? 'bg-emerald-50 text-[#174C3C] border border-emerald-200/80 font-black shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-slate-400" />
                  <span>Auditoría & Más</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 text-slate-800 z-50 text-xs animate-in fade-in duration-150">
                    <div className="px-3.5 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Módulos de Auditoría & Calidad
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('certificates');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700"
                    >
                      <Award className="w-4 h-4 text-[#237A57]" />
                      <span>Certificaciones Orgánicas & FT</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('senamhi-weather');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700"
                    >
                      <CloudSun className="w-4 h-4 text-sky-600" />
                      <span>Informes Climáticos SENAMHI</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('coop-profile');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700"
                    >
                      <UserCheck className="w-4 h-4 text-amber-600" />
                      <span>Perfil Completo Organización</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setActiveTab('market-prices');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-700" />
                      <span>Precios Referenciales ICE NY</span>
                    </button>

                    <div className="my-1.5 border-t border-slate-100" />
                    <div className="px-3.5 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Herramientas Interactivas
                    </div>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenTelegram();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700"
                    >
                      <MessageSquareCode className="w-4 h-4 text-sky-600" />
                      <span>Simulador Bot Telegram</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenOnboarding();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Configuración Guiada</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onTogglePracticeMode();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700"
                    >
                      <Gamepad2 className="w-4 h-4 text-rose-500" />
                      <span>{isPracticeMode ? 'Desactivar Modo Práctica' : 'Activar Modo Práctica'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenAssistant();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 font-medium text-slate-700 border-t border-slate-100"
                    >
                      <HelpCircle className="w-4 h-4 text-[#174C3C]" />
                      <span>Asistente Inteligente AGY</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right: Role Switcher & Primary Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Segmented Role Control */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs">
              <button
                onClick={() => {
                  setActiveRole('coop');
                  setActiveTab('coop-dashboard');
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  !isBuyer
                    ? 'bg-[#174C3C] text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
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
                className={`px-3 py-1 rounded-lg font-bold transition-all duration-150 flex items-center gap-1.5 ${
                  isBuyer
                    ? 'bg-[#174C3C] text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Comprador</span>
              </button>
            </div>

            {/* Quick Bot Trigger for Coop */}
            {!isBuyer && (
              <button
                onClick={onOpenTelegram}
                className="hidden sm:flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-sky-200/80 transition shadow-2xs"
                title="Abrir Simulador de Telegram"
              >
                <MessageSquareCode className="w-3.5 h-3.5 text-sky-600" />
                <span>Bot</span>
              </button>
            )}

            {/* Quick Pedido Action Button */}
            <button
              onClick={() => onOpenCommitmentReport(false)}
              className="bg-[#174C3C] hover:bg-[#123E30] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition transform hover:scale-[1.01] flex items-center gap-1.5 border border-emerald-800/40"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Pedido 20t</span>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2.5 pt-1 border-t border-slate-100 no-scrollbar">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                  isActive ? 'bg-emerald-50 text-[#174C3C] border border-emerald-200' : 'text-slate-600'
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 whitespace-nowrap"
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
