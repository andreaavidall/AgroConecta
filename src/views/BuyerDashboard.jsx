import React from 'react';
import { 
  Building2, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  SlidersHorizontal, 
  FileText,
  Clock,
  Sparkles,
  Layers,
  Globe,
  CloudRain,
  UserCheck,
  Zap,
  DollarSign
} from 'lucide-react';
import { ICE_NY_COCOA_MARKET } from '../data/mockData';

export default function BuyerDashboard({ 
  cooperatives = [], 
  onNavigateToMarketplace, 
  onSelectCoop,
  onOpenCommitmentReport,
  onOpenMakeOffer
}) {
  const recommendedCoops = cooperatives.slice(0, 3);

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* 1. EXECUTIVE WELCOME HEADER */}
      <div className="bg-[#1E1512] text-white p-6 sm:p-8 rounded-3xl border border-[#3D2D27] shadow-xl relative overflow-hidden">
        {/* Subtle background glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D96B27]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#D96B27] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  WORKSPACE COMPRADOR B2B
                </span>
                <span className="text-xs text-amber-200/70">Campaña Activa 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Hola, Esteban
              </h1>
              <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl leading-relaxed">
                Aquí tienes la inteligencia consolidada de abastecimiento: capacidad comprometible evaluada, riesgo climático SENAMHI y recomendaciones de compra para esta semana.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => onNavigateToMarketplace()}
                className="bg-[#D96B27] hover:bg-[#C05A19] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-lg"
              >
                <Search className="w-4 h-4" />
                <span>Explorar Vitrina</span>
              </button>
            </div>
          </div>

          {/* 2. EXECUTIVE KPI STRIP (6 Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 mt-2 border-t border-[#3D2D27] text-xs">
            <div className="bg-[#2A1E1A] p-3 rounded-2xl border border-[#4A3831]">
              <span className="text-[10px] text-amber-200/60 font-semibold block uppercase">Cooperativas Activas</span>
              <span className="text-xl font-black text-white mt-0.5 block">{cooperatives.length}</span>
              <span className="text-[10px] text-emerald-400 font-bold block">100% Auditadas</span>
            </div>

            <div className="bg-[#2A1E1A] p-3 rounded-2xl border border-[#4A3831]">
              <span className="text-[10px] text-amber-200/60 font-semibold block uppercase">Capacidad Disponible</span>
              <span className="text-xl font-black text-amber-400 mt-0.5 block">248–312 t</span>
              <span className="text-[10px] text-amber-300 font-bold block">80% Confianza</span>
            </div>

            <div className="bg-[#2A1E1A] p-3 rounded-2xl border border-[#4A3831]">
              <span className="text-[10px] text-amber-200/60 font-semibold block uppercase">Recomendaciones</span>
              <span className="text-xl font-black text-white mt-0.5 block">4 Oportunidades</span>
              <span className="text-[10px] text-emerald-400 font-bold block">Match &gt; 85%</span>
            </div>

            <div className="bg-[#2A1E1A] p-3 rounded-2xl border border-[#4A3831]">
              <span className="text-[10px] text-amber-200/60 font-semibold block uppercase">Ofertas Pendientes</span>
              <span className="text-xl font-black text-[#D96B27] mt-0.5 block">2 Enviadas</span>
              <span className="text-[10px] text-amber-300 font-bold block">Vencen en 48h</span>
            </div>

            <div className="bg-[#2A1E1A] p-3 rounded-2xl border border-[#4A3831]">
              <span className="text-[10px] text-amber-200/60 font-semibold block uppercase">Mercado ICE NY</span>
              <span className="text-xl font-black text-emerald-400 mt-0.5 block">${ICE_NY_COCOA_MARKET.currentPriceUsdKg}/kg</span>
              <span className="text-[10px] text-emerald-400 font-bold block">+11.5% 7d</span>
            </div>

            <div className="bg-[#2A1E1A] p-3 rounded-2xl border border-[#4A3831]">
              <span className="text-[10px] text-amber-200/60 font-semibold block uppercase">Score Promedio</span>
              <span className="text-xl font-black text-emerald-400 mt-0.5 block">84 / 100</span>
              <span className="text-[10px] text-emerald-300 font-bold block">Cumplimiento Alto</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. "PEDIDOS QUE PODRÍAS CUBRIR HOY" (VOLUME AGGREGATION SCENARIOS) */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#D96B27]" />
              <h2 className="text-lg font-black text-[#1E1512]">Opciones de Cobertura para tus Pedidos de Compra</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Simulación de cobertura según volumen solicitado: individual o agregando cooperativas compatibles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Scenario 1: 25 t Single Coop */}
          <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#EFECE6] space-y-3 hover:border-[#D96B27] transition-all">
            <div className="flex justify-between items-start">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                PEDIDO MEDIANO (25 t)
              </span>
              <span className="text-xs font-black text-emerald-700">1 Cooperativa</span>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-[#1E1512]">1 Cooperativa (Cobertura Individual)</h3>
              <p className="text-xs text-gray-600 mt-1">
                <strong>Cooperativa Valle Verde</strong> puede cubrir 24 t con 80% de confianza proyectada.
              </p>
            </div>

            <div className="text-[11px] text-gray-500 pt-2 border-t border-gray-200 flex justify-between items-center">
              <span>San Martín • CCN-51</span>
              <button 
                onClick={() => onSelectCoop(cooperatives[0])}
                className="font-bold text-[#D96B27] hover:underline cursor-pointer flex items-center space-x-1"
              >
                <span>Hacer Oferta 25 t</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scenario 2: 50 t Dual Coop Coverage */}
          <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-3 hover:border-[#D96B27] transition-all">
            <div className="flex justify-between items-start">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                PEDIDO CONTENEDOR (50 t)
              </span>
              <span className="text-xs font-black text-amber-800">2 Cooperativas</span>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-[#1E1512]">2 Cooperativas (Cobertura Conjunta)</h3>
              <p className="text-xs text-gray-600 mt-1">
                Valle Verde (25 t) + Bosque Andino (25 t) suman <strong>50 t</strong> manteniendo certificaciones Orgánico UE.
              </p>
            </div>

            <div className="text-[11px] text-gray-500 pt-2 border-t border-amber-200 flex justify-between items-center">
              <span>San Martín + Cusco</span>
              <button 
                onClick={() => onOpenCommitmentReport(true)}
                className="font-bold text-[#D96B27] hover:underline cursor-pointer flex items-center space-x-1"
              >
                <span>Ver Paquete 50 t</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 4. "RECOMENDACIONES PARA TI" (CURATED COMMERCIAL OPPORTUNITIES) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#1E1512]">Oportunidades de Abastecimiento Recomendadas</h2>
            <p className="text-xs text-gray-500">Evaluadas por compatibilidad de variedad, confianza de entrega e historial 5 años.</p>
          </div>

          <button
            onClick={() => onNavigateToMarketplace()}
            className="text-xs font-bold text-[#D96B27] hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Ver las {cooperatives.length} cooperativas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendedCoops.map((coop, idx) => {
            const matchScore = idx === 0 ? 94 : idx === 1 ? 89 : 85;

            return (
              <div 
                key={coop.id}
                className="bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>{matchScore}% Match Comercial</span>
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{coop.region}</span>
                  </div>

                  <div>
                    <h3 className="font-black text-base text-[#1E1512]">{coop.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{coop.description}</p>
                  </div>

                  {/* Operational Metrics Block */}
                  <div className="bg-[#FBF9F5] p-3.5 rounded-2xl border border-[#EFECE6] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">Capacidad Comprometible:</span>
                      <span className="font-black text-sm text-[#D96B27]">{coop.capacityRange}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">Confianza de Entrega:</span>
                      <span className="font-extrabold text-emerald-700">{coop.confidenceScore}%</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">% Fino de Aroma:</span>
                      <span className="font-bold text-gray-900">{coop.fineAromaPct}%</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">Riesgo Climático:</span>
                      <span className={`font-bold ${coop.riskLevel === 'medium' ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {coop.currentRisk}
                      </span>
                    </div>
                  </div>

                  {/* Certifications Badges */}
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Certificaciones:</span>
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {coop.certifications.map((c, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI System Recommendation Note */}
                  <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-xs">
                    <span className="font-bold text-amber-950 block text-[11px]">Recomendación AgroConecta:</span>
                    <p className="text-amber-900 mt-0.5 text-[11px] leading-tight">
                      {idx === 0 
                        ? 'Ideal para pedidos de 20–25 t de CCN-51 con trazabilidad 91% GPS y contrato asegurado.'
                        : idx === 1 
                        ? 'Excelente perfil Chuncho Nativo con 100% de cumplimiento histórico en 5 años.'
                        : 'Buena opción para complementar volumen de cacao Criollo en microclimas amazónicos.'}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectCoop(coop)}
                    className="flex-1 bg-[#1E1512] hover:bg-[#3D2D27] text-white py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    Ver Perfil
                  </button>

                  <button
                    onClick={() => onOpenMakeOffer(coop)}
                    className="flex-1 bg-[#D96B27] hover:bg-[#C05A19] text-white py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center shadow-sm"
                  >
                    Hacer Oferta
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 5. LIVE MARKET INTELLIGENCE & ACTIVITY LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Market Context Insights */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-[#D96B27]" />
            <h3 className="text-base font-black text-[#1E1512]">Inteligencia de Mercado ICE NY & Clima SENAMHI</h3>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#EFECE6] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500 font-semibold block">Cotización ICE NY Cocoa (7 días):</span>
              <span className="text-xl font-black text-[#1E1512] mt-0.5 block">${ICE_NY_COCOA_MARKET.currentPriceUsdKg}/kg</span>
              <span className="text-emerald-700 font-bold text-[11px]">+11.5% alza sostenida por déficit global</span>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
              <span className="text-[#D96B27] font-bold block">Implicancia Comercial para Compradores:</span>
              <p className="text-gray-600 mt-1 leading-tight text-[11px]">
                Mercado al alza en bolsa internacional. Se recomienda cerrar contratos con cooperativas de alta confianza (80%+) antes de ajustes de primas en origen.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFECE6] shadow-sm space-y-3 text-xs">
          <h3 className="font-black text-sm text-[#1E1512]">Actividad & Contratos Recientes</h3>
          <div className="divide-y divide-gray-100 space-y-2">
            <div className="pt-2 flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <div>
                <span className="font-bold text-gray-900 block leading-tight">Oferta en revisión (25 t)</span>
                <span className="text-[10px] text-gray-400">Valle Verde • Hace 2 horas</span>
              </div>
            </div>
            <div className="pt-2 flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
              <div>
                <span className="font-bold text-gray-900 block leading-tight">Alerta SENAMHI en Uchiza</span>
                <span className="text-[10px] text-gray-400">Lluvia 68mm/72h • Hace 5 horas</span>
              </div>
            </div>
            <div className="pt-2 flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              <div>
                <span className="font-bold text-gray-900 block leading-tight">Reporte Due Diligence generado</span>
                <span className="text-[10px] text-gray-400">Paquete 50 t • Ayer</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
