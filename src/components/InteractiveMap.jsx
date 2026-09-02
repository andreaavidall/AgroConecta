import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Layers, 
  ShieldCheck, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Filter,
  Navigation
} from 'lucide-react';

// Custom Leaflet DivIcon Generator
const createCustomIcon = (isSelected, riskLevel, name) => {
  const colorClass = riskLevel === 'high' ? '#EF4444' : riskLevel === 'medium' ? '#F59E0B' : '#10B981';
  
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; cursor: pointer;">
        <div style="
          width: ${isSelected ? '36px' : '28px'};
          height: ${isSelected ? '36px' : '28px'};
          background-color: ${isSelected ? '#1E1512' : '#FFFFFF'};
          border: 3px solid ${colorClass};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
        ">
          <div style="width: 10px; height: 10px; background-color: ${colorClass}; border-radius: 50%;"></div>
        </div>
        ${isSelected ? `
          <div style="
            margin-left: 8px;
            background: #1E1512;
            color: #FFFFFF;
            padding: 4px 8px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: bold;
            white-space: nowrap;
            border: 1px solid ${colorClass};
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          ">
            ${name}
          </div>
        ` : ''}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

// Component to dynamically re-center map when cooperative selected
function MapRecenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 8, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

export default function InteractiveMap({ cooperatives = [], onSelectCoop }) {
  const [activeLayer, setActiveLayer] = useState('COOPERATIVAS'); // 'COOPERATIVAS', 'PARCELAS', 'CLIMA'
  const [selectedPin, setSelectedPin] = useState(cooperatives[0] || null);

  // Peru Center Coordinates
  const peruCenter = { lat: -9.19, lng: -75.015 };

  return (
    <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-hidden flex flex-col h-[680px]">
      
      {/* Map Header & Layer Selector */}
      <div className="bg-[#1E1512] text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#3D2D27]">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-[#D96B27]" />
          <div>
            <h3 className="text-sm font-bold text-white">Mapa Interactivo Real de Orígenes & Capacidad</h3>
            <p className="text-[11px] text-amber-200/70">
              Visualización satelital y cartográfica de cooperativas, parcelas georreferenciadas y zonas de riesgo SENAMHI
            </p>
          </div>
        </div>

        {/* Layer Toggle Pills */}
        <div className="flex items-center space-x-1.5 bg-[#2A1E1A] p-1 rounded-xl border border-[#4A3831] text-xs">
          <button
            onClick={() => setActiveLayer('COOPERATIVAS')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeLayer === 'COOPERATIVAS' ? 'bg-[#D96B27] text-white' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            Cooperativas
          </button>
          <button
            onClick={() => setActiveLayer('PARCELAS')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeLayer === 'PARCELAS' ? 'bg-[#D96B27] text-white' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            Parcelas EUDR
          </button>
          <button
            onClick={() => setActiveLayer('CLIMA')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeLayer === 'CLIMA' ? 'bg-amber-600 text-white' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            Riesgo SENAMHI
          </button>
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden flex flex-col md:flex-row">
        
        {/* Real Leaflet Map Container */}
        <div className="flex-1 relative min-h-[380px] z-10">
          <MapContainer 
            center={[peruCenter.lat, peruCenter.lng]} 
            zoom={6} 
            scrollWheelZoom={true}
            className="w-full h-full"
            style={{ height: '100%', width: '100%' }}
          >
            {/* High Quality CartoDB Voyager Map Tiles */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {/* Recenter helper */}
            {selectedPin && selectedPin.coordinates && (
              <MapRecenter coords={selectedPin.coordinates} />
            )}

            {/* Render Cooperative Markers */}
            {cooperatives.map((coop) => {
              if (!coop.coordinates) return null;
              const isSelected = selectedPin?.id === coop.id;
              const customIcon = createCustomIcon(isSelected, coop.riskLevel, coop.name);

              return (
                <React.Fragment key={coop.id}>
                  <Marker 
                    position={[coop.coordinates.lat, coop.coordinates.lng]} 
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setSelectedPin(coop)
                    }}
                  >
                    <Popup className="custom-map-popup">
                      <div className="p-1 space-y-1 text-xs">
                        <span className="font-bold text-gray-900 block">{coop.name}</span>
                        <span className="text-[10px] text-gray-500 block">{coop.region}</span>
                        <div className="pt-1 border-t border-gray-200 font-semibold text-[#D96B27]">
                          Capacidad: {coop.capacityRange}
                        </div>
                      </div>
                    </Popup>
                  </Marker>

                  {/* SENAMHI Rain Risk Overlay Circle */}
                  {activeLayer === 'CLIMA' && coop.riskLevel === 'high' && (
                    <Circle 
                      center={[coop.coordinates.lat, coop.coordinates.lng]} 
                      radius={45000} // 45km radius
                      pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.25, weight: 2, dashArray: '4 4' }}
                    />
                  )}

                  {/* Parcel Polygon Overlay */}
                  {activeLayer === 'PARCELAS' && (
                    <Polygon
                      positions={[
                        [coop.coordinates.lat + 0.05, coop.coordinates.lng + 0.05],
                        [coop.coordinates.lat + 0.08, coop.coordinates.lng + 0.02],
                        [coop.coordinates.lat + 0.03, coop.coordinates.lng - 0.04],
                        [coop.coordinates.lat - 0.02, coop.coordinates.lng + 0.01]
                      ]}
                      pathOptions={{ color: '#10B981', fillColor: '#10B981', fillOpacity: 0.35, weight: 2 }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </MapContainer>

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 z-20 bg-slate-900/90 text-white backdrop-blur px-3 py-2 rounded-xl border border-slate-700 text-xs shadow-lg">
            <span className="text-[10px] text-amber-400 block font-bold uppercase">MAPA GEORREFERENCIADO PERÚ</span>
            <span className="font-extrabold text-white text-xs">Valles Cacaoteros Activos</span>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 text-white backdrop-blur p-3 rounded-xl border border-slate-700 text-[11px] space-y-1.5 shadow-lg">
            <span className="font-bold text-gray-300 block text-[10px] uppercase">Leyenda Semántica</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>Riesgo Bajo</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span>Atención</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>Lluvia SENAMHI</span></span>
            </div>
          </div>
        </div>

        {/* Selected Cooperative Side Card Drawer */}
        {selectedPin && (
          <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-slate-200 p-5 flex flex-col justify-between space-y-4 text-xs z-20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">
                  {selectedPin.verificationBadge}
                </span>
                <span className="text-gray-400 text-[11px] font-mono">{selectedPin.region}</span>
              </div>

              <div>
                <h4 className="text-base font-black text-[#1E1512]">{selectedPin.name}</h4>
                <p className="text-gray-500 text-[11px] mt-0.5">{selectedPin.description}</p>
              </div>

              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacidad Comprometible:</span>
                  <span className="font-bold text-[#D96B27]">{selectedPin.capacityRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confianza de Entrega:</span>
                  <span className="font-bold text-emerald-700">{selectedPin.confidenceScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trazabilidad EUDR:</span>
                  <span className="font-bold text-emerald-700">{selectedPin.georeferencedPct}% Geolocalizado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Riesgo Actual:</span>
                  <span className="font-bold text-amber-700">{selectedPin.currentRisk}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-800 text-[11px] block mb-1">Zonas de Acopio Activas:</span>
                <div className="space-y-1">
                  {selectedPin.collectionZones.map((z, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
                      <span className="font-medium text-gray-800">{z.name}</span>
                      <span className="text-gray-500">{z.activeLots} lotes</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectCoop(selectedPin)}
              className="w-full bg-[#1E1512] hover:bg-[#3D2D27] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <span>Ver Perfil & Ofertar</span>
              <ArrowRight className="w-4 h-4 text-[#D96B27]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
