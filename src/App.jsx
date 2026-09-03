import React, { useState } from 'react';
import Header from './components/Header';
import TelegramSimulator from './components/TelegramSimulator';
import CommitmentReportModal from './components/CommitmentReportModal';
import JointCoverageModal from './components/JointCoverageModal';
import MakeOfferModal from './components/MakeOfferModal';
import ConfidenceIndexModal from './components/ConfidenceIndexModal';
import LotTraceabilityModal from './components/LotTraceabilityModal';
import InteractiveMap from './components/InteractiveMap';
import OrderTrackingModal from './components/OrderTrackingModal';
import AgroConectaAssistant from './components/AgroConectaAssistant';
import OnboardingWizardModal from './components/OnboardingWizardModal';
import PracticeModeBanner from './components/PracticeModeBanner';
import ExcelImportModal from './components/ExcelImportModal';

// Views
import BuyerDashboard from './views/BuyerDashboard';
import MarketplaceView from './views/MarketplaceView';
import CoopComparisonView from './views/CoopComparisonView';
import CoopProfileView from './views/CoopProfileView';
import CoopPanelDashboard from './views/CoopPanelDashboard';
import LotsManagementView from './views/LotsManagementView';
import SenamhiWeatherView from './views/SenamhiWeatherView';
import MarketPricesView from './views/MarketPricesView';
import CertificatesView from './views/CertificatesView';
import MassBalanceView from './views/MassBalanceView';
import CampaignHistoryView from './views/CampaignHistoryView';
import BuyerOffersView from './views/BuyerOffersView';
import MarketView from './views/MarketView';

// Mock Data
import { 
  INITIAL_COOPERATIVES, 
  INITIAL_LOTS, 
  COMMITMENT_CURVE_DATA, 
  EARLY_WARNING_ALERTS, 
  INITIAL_OFFERS 
} from './data/mockData';

export default function App() {
  // Navigation & Role State (Sección 21.1)
  const [activeRole, setActiveRole] = useState('coop'); // 'coop' | 'buyer'
  const [activeTab, setActiveTab] = useState('coop-dashboard');

  // Application Data State
  const [cooperatives, setCooperatives] = useState(INITIAL_COOPERATIVES);
  const [lots, setLots] = useState(INITIAL_LOTS);
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [commitmentCurve, setCommitmentCurve] = useState(COMMITMENT_CURVE_DATA);
  const [alerts, setAlerts] = useState(EARLY_WARNING_ALERTS);

  // Selected Entities
  const [selectedCoop, setSelectedCoop] = useState(INITIAL_COOPERATIVES[0]);
  const [selectedForCompare, setSelectedForCompare] = useState([INITIAL_COOPERATIVES[0], INITIAL_COOPERATIVES[1]]);
  const [activeLotForTraceability, setActiveLotForTraceability] = useState(null);
  const [activeOfferForTracking, setActiveOfferForTracking] = useState(null);

  // Modals & UI Widgets Toggle State
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);
  const [isCommitmentReportOpen, setIsCommitmentReportOpen] = useState(false);
  const [isCombinedReport, setIsCombinedReport] = useState(false);
  const [isMakeOfferOpen, setIsMakeOfferOpen] = useState(false);
  const [isJointCoverageOpen, setIsJointCoverageOpen] = useState(false);
  const [isConfidenceModalOpen, setIsConfidenceModalOpen] = useState(false);
  const [isLotTraceabilityOpen, setIsLotTraceabilityOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isExcelImportOpen, setIsExcelImportOpen] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [requestedOfferVolume, setRequestedOfferVolume] = useState(20);

  // Telegram Real Data Updates (Idempotente - Sección 19)
  const handleAddNewLotFromTelegram = (newLot) => {
    setLots(prev => [newLot, ...prev]);

    setCommitmentCurve(prev => prev.map(item => {
      if (item.week.includes('Semana 5')) {
        const addedTons = Number((newLot.weightKg / 1000).toFixed(1));
        const newRealVal = Number((item.real + addedTons).toFixed(1));
        return {
          ...item,
          real: newRealVal,
          status: newRealVal >= 22.0 ? 'En curva proyectada' : item.status
        };
      }
      return item;
    }));
  };

  // Handlers para Comparación de Cooperativas
  const handleToggleCompare = (coop) => {
    setSelectedForCompare(prev => {
      const exists = prev.some(c => c.id === coop.id);
      if (exists) return prev.filter(c => c.id !== coop.id);
      if (prev.length >= 4) return prev;
      return [...prev, coop];
    });
  };

  const handleRemoveFromCompare = (coopId) => {
    setSelectedForCompare(prev => prev.filter(c => c.id !== coopId));
  };

  // Handlers para Envío y Aceptación Transaccional de Ofertas (P0-3)
  const handleAddNewOffer = (newOffer) => {
    const formattedOffer = {
      ...newOffer,
      buyerCompany: "Global Cocoa Exporters Ltd.",
      buyerContact: "Trading Desk Direct",
      country: "Alemania / UE",
      cooperativeName: newOffer.coopName || selectedCoop.name,
      offeredPriceUsdKg: newOffer.pricePerKgUsd,
      volumeTons: newOffer.volume,
      backedVolumeTons: Math.min(newOffer.volume, 16.0),
      gapTons: Math.max(0, newOffer.volume - 16.0),
      coberturaPct: Math.round((Math.min(newOffer.volume, 16.0) / newOffer.volume) * 100),
      totalValueUsd: newOffer.volume * 1000 * newOffer.pricePerKgUsd,
      incoterm: "FOB Callao",
      status: "ENVIADA",
      currentStepIndex: 1
    };
    setOffers(prev => [formattedOffer, ...prev]);
    alert(`✅ ¡Oferta formal enviada exitosamente a ${formattedOffer.cooperativeName} por US$ ${formattedOffer.offeredPriceUsdKg}/kg!`);
  };

  const handleAcceptOffer = (offerId) => {
    setOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        const updated = {
          ...off,
          status: "ACEPTADA",
          currentStepIndex: 2
        };
        setActiveOfferForTracking(updated);
        return updated;
      }
      return off;
    }));
    alert(`🎉 ¡Oferta Aceptada por la Cooperativa! Se ha iniciado la Cadena de Entrega y el Seguimiento del Pedido.`);
  };

  const handleSimulateNextStage = (offerId) => {
    setOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        const nextIdx = Math.min((off.currentStepIndex || 2) + 1, 7);
        const updated = {
          ...off,
          currentStepIndex: nextIdx
        };
        setActiveOfferForTracking(updated);
        return updated;
      }
      return off;
    }));
  };

  const handleConfirmJointOffer = (combinedCoopsList, totalTons) => {
    setIsJointCoverageOpen(false);

    const jointOffer = {
      id: `off-joint-${Math.floor(100 + Math.random() * 900)}`,
      buyerCompany: "Global Cocoa Exporters Ltd.",
      buyerContact: "Trading Desk Direct",
      country: "Alemania / UE",
      coopId: "multi-coop-package",
      coopName: "Paquete Combinado (Valle Verde + Bosque Andino)",
      volumeTons: totalTons,
      backedVolumeTons: totalTons,
      gapTons: 0,
      coberturaPct: 100,
      pricePerKgUsd: 8.50,
      totalValueUsd: totalTons * 1000 * 8.50,
      incoterm: "FOB Callao",
      variety: "CCN-51 / Nativo Fino de Aroma (Certificado Orgánico)",
      requestedDeliveryDate: "2026-10-20",
      status: "ENVIADA",
      coverageStatus: "PROPUESTA_COBERTURA_CONJUNTA",
      isJointCoverage: true,
      history: [
        { date: new Date().toLocaleString(), text: `Propuesta de cobertura conjunta enviada a las cooperativas agregadas para ${totalTons} t.` }
      ]
    };

    setOffers(prev => [jointOffer, ...prev]);
    alert(`🎉 ¡Propuesta de Cobertura Conjunta de ${totalTons} t enviada exitosamente para revisión de las cooperativas!`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8F5] text-[#17211B] font-sans antialiased selection:bg-[#237A57] selection:text-white">
      
      {/* Banner Flotante de Modo Práctica */}
      <PracticeModeBanner
        isPracticeMode={isPracticeMode}
        onTogglePracticeMode={() => setIsPracticeMode(!isPracticeMode)}
        onResetPracticeData={() => {
          setLots(INITIAL_LOTS);
          setOffers(INITIAL_OFFERS);
          alert("🔄 Datos del Modo Práctica reiniciados a los valores iniciales.");
        }}
      />

      {/* Header Principal */}
      <Header 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTelegram={() => setIsTelegramOpen(true)}
        onOpenCommitmentReport={(isCombined = false) => {
          setIsCombinedReport(isCombined);
          setIsCommitmentReportOpen(true);
        }}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenExcelImport={() => setIsExcelImportOpen(true)}
        isPracticeMode={isPracticeMode}
        onTogglePracticeMode={() => setIsPracticeMode(!isPracticeMode)}
        activeOffersCount={offers.length}
        alertsCount={alerts.length}
        selectedCoopName={selectedCoop?.name || "Cooperativa Valle Verde"}
        onSelectCoopByName={(name) => {
          const found = cooperatives.find(c => c.name.toLowerCase().includes(name.toLowerCase()));
          if (found) setSelectedCoop(found);
        }}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* BUYER PORTAL VIEWS */}
        {activeRole === 'buyer' && (
          <>
            {activeTab === 'buyer-dashboard' && (
              <BuyerDashboard 
                cooperatives={cooperatives}
                onNavigateToMarketplace={(filters) => setActiveTab('marketplace')}
                onSelectCoop={(coop) => {
                  setSelectedCoop(coop);
                  setActiveTab('coop-profile');
                }}
                onOpenCommitmentReport={() => {
                  setIsCombinedReport(false);
                  setIsCommitmentReportOpen(true);
                }}
              />
            )}

            {activeTab === 'marketplace' && (
              <MarketplaceView 
                cooperatives={cooperatives}
                onSelectCoop={(coop) => {
                  setSelectedCoop(coop);
                  setActiveTab('coop-profile');
                }}
                onOpenMakeOffer={(coop) => {
                  setSelectedCoop(coop);
                  setIsMakeOfferOpen(true);
                }}
                selectedForCompare={selectedForCompare}
                onToggleCompare={handleToggleCompare}
                onOpenCompareView={() => setActiveTab('compare')}
                onClearCompare={() => setSelectedForCompare([])}
              />
            )}

            {activeTab === 'compare' && (
              <CoopComparisonView 
                selectedCoops={selectedForCompare}
                onBackToMarketplace={() => setActiveTab('marketplace')}
                onOpenMakeOffer={(coop) => {
                  setSelectedCoop(coop);
                  setIsMakeOfferOpen(true);
                }}
                onRemoveFromCompare={handleRemoveFromCompare}
              />
            )}

            {activeTab === 'coop-profile' && selectedCoop && (
              <CoopProfileView 
                cooperative={selectedCoop}
                lots={lots}
                commitmentCurveData={commitmentCurve}
                onBack={() => setActiveTab('marketplace')}
                onOpenMakeOffer={() => setIsMakeOfferOpen(true)}
                onOpenCommitmentReport={() => {
                  setIsCombinedReport(false);
                  setIsCommitmentReportOpen(true);
                }}
                onOpenConfidenceModal={() => setIsConfidenceModalOpen(true)}
                onOpenLotTraceability={(lot) => {
                  setActiveLotForTraceability(lot);
                  setIsLotTraceabilityOpen(true);
                }}
              />
            )}

            {activeTab === 'buyer-offers' && (
              <BuyerOffersView 
                offers={offers}
                isCoopRole={false}
                onOpenCommitmentReport={(isCombined = false) => {
                  setIsCombinedReport(isCombined);
                  setIsCommitmentReportOpen(true);
                }}
                onOpenOrderTracking={(off) => {
                  setActiveOfferForTracking(off);
                  setIsOrderTrackingOpen(true);
                }}
              />
            )}

            {activeTab === 'interactive-map' && (
              <div className="space-y-4">
                <h1 className="text-xl font-black text-slate-800">Mapa de Zonas y Orígenes EUDR (Vista Comprador)</h1>
                <InteractiveMap 
                  cooperatives={cooperatives}
                  userRole="buyer"
                  onSelectCoop={(coop) => {
                    setSelectedCoop(coop);
                    setActiveTab('coop-profile');
                  }}
                />
              </div>
            )}

            {(activeTab === 'market' || activeTab === 'market-prices' || activeTab === 'senamhi-weather') && (
              <MarketPricesView />
            )}
          </>
        )}

        {/* COOPERATIVE PORTAL VIEWS */}
        {activeRole === 'coop' && (
          <>
            {(activeTab === 'coop-dashboard' || activeTab === 'commitment-curve') && (
              <CoopPanelDashboard 
                cooperative={selectedCoop || cooperatives[0]}
                alerts={alerts}
                offers={offers}
                commitmentCurveData={commitmentCurve}
                onOpenTelegram={() => setIsTelegramOpen(true)}
                onOpenLotManagement={() => setActiveTab('lots-management')}
                onOpenOffersView={() => setActiveTab('coop-offers')}
                onOpenWeatherView={() => setActiveTab('senamhi-weather')}
                onOpenExcelImport={() => setIsExcelImportOpen(true)}
                onAcceptOffer={handleAcceptOffer}
              />
            )}

            {activeTab === 'lots-management' && (
              <LotsManagementView 
                lots={lots}
                onOpenLotTraceability={(lot) => {
                  setActiveLotForTraceability(lot);
                  setIsLotTraceabilityOpen(true);
                }}
                onOpenTelegram={() => setIsTelegramOpen(true)}
              />
            )}

            {activeTab === 'coop-offers' && (
              <BuyerOffersView 
                offers={offers}
                isCoopRole={true}
                onAcceptOffer={handleAcceptOffer}
                onCounterOffer={(off) => alert(`💬 Solicitud de contraoferta enviada a ${off.buyerCompany}.`)}
                onOpenCommitmentReport={(isCombined = false) => {
                  setIsCombinedReport(isCombined);
                  setIsCommitmentReportOpen(true);
                }}
                onOpenOrderTracking={(off) => {
                  setActiveOfferForTracking(off);
                  setIsOrderTrackingOpen(true);
                }}
              />
            )}

            {activeTab === 'certificates' && (
              <CertificatesView />
            )}

            {activeTab === 'mass-balance' && (
              <MassBalanceView lots={lots} />
            )}

            {activeTab === 'senamhi-weather' && (
              <SenamhiWeatherView />
            )}

            {activeTab === 'campaign-history' && (
              <CampaignHistoryView />
            )}
          </>
        )}

      </main>

      {/* Asistente Contextual AgroConecta */}
      <AgroConectaAssistant
        activeTab={activeTab}
        activeRole={activeRole}
        selectedCoop={selectedCoop}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* GLOBAL INTERACTIVE MODALS */}
      <TelegramSimulator 
        isOpen={isTelegramOpen}
        onToggle={() => setIsTelegramOpen(!isTelegramOpen)}
        lots={lots}
        onAddNewLot={handleAddNewLotFromTelegram}
        cooperative={cooperatives[0]}
      />

      <CommitmentReportModal 
        isOpen={isCommitmentReportOpen}
        onClose={() => setIsCommitmentReportOpen(false)}
        cooperative={selectedCoop || cooperatives[0]}
        isCombined={isCombinedReport}
        combinedCoops={cooperatives}
        requestedVolumeTons={requestedOfferVolume}
      />

      <JointCoverageModal 
        isOpen={isJointCoverageOpen}
        onClose={() => setIsJointCoverageOpen(false)}
        primaryCooperative={selectedCoop || cooperatives[0]}
        requestedVolumeTons={requestedOfferVolume}
        allCooperatives={cooperatives}
        onConfirmJointOffer={handleConfirmJointOffer}
        onOpenCombinedReport={(coops) => {
          setIsCombinedReport(true);
          setIsCommitmentReportOpen(true);
        }}
      />

      <MakeOfferModal 
        isOpen={isMakeOfferOpen}
        onClose={() => setIsMakeOfferOpen(false)}
        cooperative={selectedCoop || cooperatives[0]}
        onSubmitOffer={handleAddNewOffer}
        onTriggerJointCoverage={(coop, vol) => {
          setIsMakeOfferOpen(false);
          setRequestedOfferVolume(vol);
          setIsJointCoverageOpen(true);
        }}
      />

      <ConfidenceIndexModal 
        isOpen={isConfidenceModalOpen}
        onClose={() => setIsConfidenceModalOpen(false)}
        cooperative={selectedCoop || cooperatives[0]}
      />

      <LotTraceabilityModal 
        isOpen={isLotTraceabilityOpen}
        onClose={() => setIsLotTraceabilityOpen(false)}
        lot={activeLotForTraceability || lots[0]}
      />

      {isOrderTrackingOpen && (
        <OrderTrackingModal 
          offer={activeOfferForTracking || offers[0]}
          onClose={() => setIsOrderTrackingOpen(false)}
          onSimulateNextStage={handleSimulateNextStage}
        />
      )}

      <OnboardingWizardModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCompleteSetup={(formData) => alert(`✅ Configuración de ${formData.coopName} guardada e integrada.`)}
      />

      <ExcelImportModal
        isOpen={isExcelImportOpen}
        onClose={() => setIsExcelImportOpen(false)}
        onImportData={(importedRows) => {
          console.log("Filas importadas:", importedRows);
        }}
      />

    </div>
  );
}
