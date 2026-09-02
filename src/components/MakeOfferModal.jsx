import React, { useState } from 'react';
import { X, Send, AlertTriangle, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import { ICE_NY_COCOA_MARKET } from '../data/mockData';

export default function MakeOfferModal({
  isOpen,
  onClose,
  cooperative,
  onSubmitOffer,
  onTriggerJointCoverage
}) {
  const [volumeTons, setVolumeTons] = useState(25);
  const [pricePerKg, setPricePerKg] = useState(8.20);
  const [incoterm, setIncoterm] = useState('FOB Callao');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-15');
  const [validityHours, setValidityHours] = useState(48);
  const [notes, setNotes] = useState('Requerimos trazabilidad 100% geolocalizada EUDR y certificación orgánica vigente.');

  if (!isOpen || !cooperative) return null;

  const maxCap = cooperative.maxCapacity || 27;
  const isOverCapacity = volumeTons > maxCap;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isOverCapacity) {
      // Trigger Joint Coverage flow!
      onTriggerJointCoverage(cooperative, volumeTons);
      return;
    }

    const newOffer = {
      id: `off-${Math.floor(100 + Math.random() * 900)}`,
      buyerCompany: "Global Cocoa Exporters Ltd.",
      buyerContact: "Trading Desk Direct",
      country: "Alemania / UE",
      coopId: cooperative.id,
      coopName: cooperative.name,
      volumeTons: Number(volumeTons),
      pricePerKgUsd: Number(pricePerKg),
      totalValueUsd: Number(volumeTons) * 1000 * Number(pricePerKg),
      incoterm,
      variety: cooperative.variety,
      requestedDeliveryDate: deliveryDate,
      status: "ENVIADA",
      expirationHoursLeft: Number(validityHours),
      marketPriceRefUsdKg: ICE_NY_COCOA_MARKET.currentPriceUsdKg,
      priceVsMarketPct: Number((((pricePerKg - ICE_NY_COCOA_MARKET.currentPriceUsdKg) / ICE_NY_COCOA_MARKET.currentPriceUsdKg) * 100).toFixed(1)),
      coverageStatus: `Cubierta por ${cooperative.name}`,
      isJointCoverage: false,
      history: [
        { date: new Date().toLocaleString(), text: `Oferta enviada por US$ ${pricePerKg}/kg para ${volumeTons} t.` }
      ]
    };

    onSubmitOffer(newOffer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#1E1512] text-white px-6 py-4 flex items-center justify-between border-b border-[#3D2D27]">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              NEGOCIACIÓN B2B FORMAL
            </span>
            <h2 className="text-sm font-bold text-white">Hacer Oferta de Compra — {cooperative.name}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Capacity Pre-validation Alert */}
          <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
            isOverCapacity 
              ? 'bg-amber-50 border-amber-300 text-amber-900' 
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            {isOverCapacity ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block text-xs">
                {isOverCapacity ? 'Aviso de Capacidad Solicitada' : 'Capacidad Individual Verificada'}
              </span>
              <p className="mt-0.5 text-[11px]">
                {isOverCapacity 
                  ? `Solicitas ${volumeTons} t. La capacidad máx de ${cooperative.name} es ${maxCap} t. Al enviar, el sistema activará la Cobertura Conjunta automática.`
                  : `${cooperative.name} puede cubrir individualmente tus ${volumeTons} t dentro de su rango comprometible (${cooperative.capacityRange}).`}
              </p>
            </div>
          </div>

          {/* Volume and Price Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">Volumen Solicitado (Toneladas)</label>
              <input
                type="number"
                min="1"
                max="500"
                value={volumeTons}
                onChange={(e) => setVolumeTons(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 font-bold text-gray-900 focus:outline-none focus:border-[#D96B27]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">Precio por kg (USD)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min="3.00"
                  max="20.00"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 font-bold text-gray-900 focus:outline-none focus:border-[#D96B27]"
                  required
                />
                <span className="absolute right-3 top-2.5 text-gray-400 font-semibold text-[10px]">
                  Ref NY: ${ICE_NY_COCOA_MARKET.currentPriceUsdKg}
                </span>
              </div>
            </div>
          </div>

          {/* Total Investment calculation */}
          <div className="bg-slate-900 text-white p-3.5 rounded-xl flex items-center justify-between">
            <span className="text-gray-400 font-semibold">Valor Total Estimado del Contrato:</span>
            <span className="text-lg font-black text-amber-400">
              US$ {(volumeTons * 1000 * pricePerKg).toLocaleString()}
            </span>
          </div>

          {/* Incoterm & Delivery Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">Incoterm de Entrega</label>
              <select
                value={incoterm}
                onChange={(e) => setIncoterm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-semibold text-gray-900"
              >
                <option value="FOB Callao">FOB Callao (Puerto de Lima)</option>
                <option value="CIF Hamburgo">CIF Hamburgo (Europa)</option>
                <option value="FOB Paita">FOB Paita (Norte del Perú)</option>
                <option value="EXW Planta">EXW Almacén Cooperativa</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">Fecha de Entrega Requerida</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-semibold text-gray-900"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">Observaciones / Especificaciones Término</label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-800 text-[11px]"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl font-bold text-white transition-all shadow-md cursor-pointer flex items-center space-x-2 ${
                isOverCapacity 
                  ? 'bg-amber-600 hover:bg-amber-700' 
                  : 'bg-[#D96B27] hover:bg-[#C05A19]'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isOverCapacity ? 'Activar Cobertura Conjunta' : 'Enviar Oferta Formal'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
