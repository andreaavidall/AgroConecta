import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  TrendingUp, 
  Globe,
  Bell, 
  ChevronDown, 
  UserCheck, 
  SlidersHorizontal,
  Menu,
  X,
  Check,
  FileText,
  Settings,
  LogOut,
  Sparkles,
  Layers,
  FileCheck2,
  Scale,
  History
} from 'lucide-react';

export default function Header({ 
  activeRole, 
  setActiveRole, 
  activeTab, 
  setActiveTab, 
  onOpenCommitmentReport,
  activeOffersCount = 2,
  alertsCount = 3,
  selectedCoopName = "Cooperativa Valle Verde",
  onSelectCoopByName
}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#140D0A] text-[#EFECE6] border-b border-[#261914] shadow-xl font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo (AC AgroConecta) */}
        <div 
          onClick={() => setActiveTab(activeRole === 'buyer' ? 'buyer-dashboard' : 'coop-dashboard')}
          className="flex items-center space-x-2.5 cursor-pointer shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D96B27] flex items-center justify-center font-black text-white shadow-md text-sm transition-transform group-hover:scale-105">
            AC
          </div>
          <span className="font-bold text-base tracking-tight text-white font-sans">
            AgroConecta
          </span>
        </div>

        {/* Desktop Main Navigation (Adapts to Buyer vs Cooperative Role!) */}
        <nav className="hidden md:flex items-center space-x-1 font-sans">
          {activeRole === 'buyer' ? (
            <>
              <NavItem 
                active={activeTab === 'buyer-dashboard'} 
                onClick={() => setActiveTab('buyer-dashboard')} 
                label="Dashboard" 
              />
              <NavItem 
                active={activeTab === 'marketplace' || activeTab === 'coop-profile'} 
                onClick={() => setActiveTab('marketplace')} 
                label="Vitrina" 
              />
              <NavItem 
                active={activeTab === 'buyer-offers'} 
                onClick={() => setActiveTab('buyer-offers')} 
                label="Ofertas" 
                badge={activeOffersCount}
              />
              <NavItem 
                active={activeTab === 'market' || activeTab === 'market-prices' || activeTab === 'senamhi-weather'} 
                onClick={() => setActiveTab('market')} 
                label="Mercado" 
              />
              <NavItem 
                active={activeTab === 'interactive-map'} 
                onClick={() => setActiveTab('interactive-map')} 
                label="Mapa" 
              />
            </>
          ) : (
            <>
              <NavItem 
                active={activeTab === 'coop-dashboard' || activeTab === 'commitment-curve'} 
                onClick={() => setActiveTab('coop-dashboard')} 
                label="Dashboard" 
              />
              <NavItem 
                active={activeTab === 'lots-management'} 
                onClick={() => setActiveTab('lots-management')} 
                label="Lotes" 
              />
              <NavItem 
                active={activeTab === 'coop-offers'} 
                onClick={() => setActiveTab('coop-offers')} 
                label="Ofertas Recibidas" 
                badge={activeOffersCount}
              />
              <NavItem 
                active={activeTab === 'certificates'} 
                onClick={() => setActiveTab('certificates')} 
                label="Certificados" 
              />
              <NavItem 
                active={activeTab === 'mass-balance'} 
                onClick={() => setActiveTab('mass-balance')} 
                label="Conciliación" 
              />
              <NavItem 
                active={activeTab === 'campaign-history'} 
                onClick={() => setActiveTab('campaign-history')} 
                label="Historial" 
              />
            </>
          )}
        </nav>

        {/* Right Utility: Notifications & User Profile Menu */}
        <div className="flex items-center space-x-3 shrink-0">
          
          {/* Notifications Bell Button & Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-amber-200/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors relative cursor-pointer"
              title="Notificaciones"
            >
              <Bell className="w-4 h-4" />
              {alertsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D96B27] ring-2 ring-[#140D0A]"></span>
              )}
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1E1512] text-white rounded-xl shadow-2xl border border-[#3D2D27] py-2 z-50 text-xs animate-in fade-in zoom-in duration-150">
                <div className="px-4 py-2 border-b border-[#3D2D27] flex justify-between items-center">
                  <span className="font-bold text-amber-50">Notificaciones en Vivo</span>
                  <span className="text-[10px] text-[#D96B27] font-semibold">{alertsCount} nuevas</span>
                </div>
                <div className="divide-y divide-[#2A1E1A] max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-white/5 transition-colors cursor-pointer space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold block uppercase">🌧️ SENAMHI Alerta Clima</span>
                    <p className="text-amber-100/80 leading-tight">Lluvia de 68mm/72h en Uchiza afecta secado temporalmente.</p>
                  </div>
                  <div className="p-3 hover:bg-white/5 transition-colors cursor-pointer space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold block uppercase">💼 Nueva Oferta Recibida</span>
                    <p className="text-amber-100/80 leading-tight">Nordic Cocoa envió propuesta por 25 t a US$ 8.10/kg.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown ([MP] ▾ or [VV] ▾) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 bg-[#211612] hover:bg-[#2C1D18] px-2.5 py-1.5 rounded-xl border border-[#36241C] transition-all cursor-pointer shadow-sm text-xs font-semibold text-white"
            >
              <div className="w-6 h-6 rounded-lg bg-[#D96B27]/30 border border-[#D96B27]/50 text-[#F59E0B] flex items-center justify-center font-bold text-[11px]">
                {activeRole === 'buyer' ? 'MP' : 'VV'}
              </div>
              <span className="hidden sm:inline font-medium text-amber-100">
                {activeRole === 'buyer' ? 'Matías (Comprador)' : 'Cooperativa Admin'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-200/60" />
            </button>

            {/* Profile Menu Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1E1512] text-white rounded-xl shadow-2xl border border-[#3D2D27] py-2 z-50 text-xs animate-in fade-in zoom-in duration-150 space-y-1">
                {/* User Info Header */}
                <div className="px-4 py-2.5 border-b border-[#3D2D27]">
                  <span className="font-bold text-amber-50 block">
                    {activeRole === 'buyer' ? 'Matías Pérez' : selectedCoopName}
                  </span>
                  <span className="text-[10px] text-amber-200/60 block">
                    {activeRole === 'buyer' ? 'Comprador Internacional • UE' : 'Administrador de Campaña 2026'}
                  </span>
                </div>

                {/* Role Switcher Section */}
                <div className="px-4 py-2 space-y-1.5">
                  <span className="text-[10px] text-amber-200/50 uppercase font-bold tracking-wider block">
                    CAMBIAR VISTA DE USUARIO
                  </span>

                  {/* Buyer Option */}
                  <button
                    onClick={() => {
                      setActiveRole('buyer');
                      setActiveTab('buyer-dashboard');
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      activeRole === 'buyer' ? 'bg-[#D96B27]/20 text-[#F59E0B] font-bold border border-[#D96B27]/40' : 'text-amber-200/80 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <span className="block font-bold">Vista Comprador</span>
                      <span className="text-[10px] text-gray-400 font-normal">Descubrimiento, due diligence y ofertas</span>
                    </div>
                    {activeRole === 'buyer' && <Check className="w-4 h-4 text-[#F59E0B] shrink-0" />}
                  </button>

                  {/* Cooperative Option */}
                  <button
                    onClick={() => {
                      setActiveRole('coop');
                      setActiveTab('coop-dashboard');
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      activeRole === 'coop' ? 'bg-[#D96B27]/20 text-[#F59E0B] font-bold border border-[#D96B27]/40' : 'text-amber-200/80 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <span className="block font-bold">Vista Cooperativa</span>
                      <span className="text-[10px] text-gray-400 font-normal">Panel interno, lotes y operaciones de acopio</span>
                    </div>
                    {activeRole === 'coop' && <Check className="w-4 h-4 text-[#F59E0B] shrink-0" />}
                  </button>
                </div>

                {/* Logout / Settings */}
                <div className="pt-2 border-t border-[#3D2D27] px-4 py-1">
                  <button className="w-full text-left py-1.5 text-gray-400 hover:text-white flex items-center space-x-2 cursor-pointer">
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-amber-200/70 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Contextual Status Strip for Cooperative Mode */}
      {activeRole === 'coop' && (
        <div className="bg-[#1C120E] border-t border-[#2C1C16] px-4 py-1.5 text-xs text-amber-200/80 font-sans">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-[#D96B27] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                MODO COOPERATIVA
              </span>
              <span className="font-bold text-white">{selectedCoopName}</span>
              <span className="text-gray-400 text-[11px] hidden sm:inline">• Campaña 2026 en curso</span>
            </div>

            <div className="flex items-center space-x-3 text-[11px]">
              <span>Acopio: <strong className="text-amber-400">17.1 t</strong></span>
              <span className="hidden sm:inline">Capacidad: <strong className="text-white">22–27 t</strong></span>
              <span className="text-emerald-400 font-bold">80% Confianza</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1E1512] border-t border-[#3D2D27] px-4 py-3 space-y-2 text-xs">
          {activeRole === 'buyer' ? (
            <>
              <NavItem active={activeTab === 'buyer-dashboard'} onClick={() => { setActiveTab('buyer-dashboard'); setIsMobileMenuOpen(false); }} label="Dashboard" />
              <NavItem active={activeTab === 'marketplace'} onClick={() => { setActiveTab('marketplace'); setIsMobileMenuOpen(false); }} label="Vitrina" />
              <NavItem active={activeTab === 'buyer-offers'} onClick={() => { setActiveTab('buyer-offers'); setIsMobileMenuOpen(false); }} label="Ofertas" badge={activeOffersCount} />
              <NavItem active={activeTab === 'market'} onClick={() => { setActiveTab('market'); setIsMobileMenuOpen(false); }} label="Mercado" />
              <NavItem active={activeTab === 'interactive-map'} onClick={() => { setActiveTab('interactive-map'); setIsMobileMenuOpen(false); }} label="Mapa" />
            </>
          ) : (
            <>
              <NavItem active={activeTab === 'coop-dashboard'} onClick={() => { setActiveTab('coop-dashboard'); setIsMobileMenuOpen(false); }} label="Dashboard" />
              <NavItem active={activeTab === 'lots-management'} onClick={() => { setActiveTab('lots-management'); setIsMobileMenuOpen(false); }} label="Lotes" />
              <NavItem active={activeTab === 'coop-offers'} onClick={() => { setActiveTab('coop-offers'); setIsMobileMenuOpen(false); }} label="Ofertas Recibidas" badge={activeOffersCount} />
              <NavItem active={activeTab === 'certificates'} onClick={() => { setActiveTab('certificates'); setIsMobileMenuOpen(false); }} label="Certificados" />
              <NavItem active={activeTab === 'mass-balance'} onClick={() => { setActiveTab('mass-balance'); setIsMobileMenuOpen(false); }} label="Conciliación" />
              <NavItem active={activeTab === 'campaign-history'} onClick={() => { setActiveTab('campaign-history'); setIsMobileMenuOpen(false); }} label="Historial" />
            </>
          )}
        </div>
      )}
    </header>
  );
}

function NavItem({ active, onClick, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer relative whitespace-nowrap ${
        active 
          ? 'text-white bg-[#261813] border-b-2 border-[#D96B27] font-bold'
          : 'text-amber-200/60 hover:text-white hover:bg-white/5'
      }`}
    >
      <span>{label}</span>
      {badge > 0 && (
        <span className="ml-1.5 bg-[#D96B27] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}
