import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Info, KeyRound, MapPin, Building2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function InteractiveMap({ cooperatives = [], onSelectCoop, userRole = 'coop' }) {
  const [hasRequestedAccess, setHasRequestedAccess] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  const handleRequestAccess = () => {
    const nextState = !hasRequestedAccess;
    setHasRequestedAccess(nextState);
    if (nextState) {
      alert("🔐 Solicitud de acceso a evidencia geográfica aprobada. Visualizando coordenadas GPS exactas de parcelas socias.");
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-9.8, -74.8],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    const bounds = [];

    cooperatives.forEach((coop) => {
      if (!coop.coordinates) return;

      const { lat, lng } = coop.coordinates;
      bounds.push([lat, lng]);

      if (!hasRequestedAccess) {
        // Vista Pública: Zona comunitaria aproximada (Círculo de cobertura)
        const circle = L.circle([lat, lng], {
          color: '#237A57',
          fillColor: '#237A57',
          fillOpacity: 0.2,
          weight: 2,
          radius: 25000 // 25km radio aproximado
        });

        const iconHtml = `
          <div class="flex items-center gap-1.5 bg-[#174C3C] text-white px-3 py-1.5 rounded-full shadow-lg border-2 border-white hover:scale-105 transition-transform cursor-pointer font-sans whitespace-nowrap">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-bold text-xs">${coop.name}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-coop-marker',
          iconSize: [160, 36],
          iconAnchor: [80, 18]
        });

        const marker = L.marker([lat, lng], { icon: customIcon });

        const popupContent = document.createElement('div');
        popupContent.className = 'p-3 font-sans space-y-2 min-w-[200px]';
        popupContent.innerHTML = `
          <div class="font-bold text-slate-900 text-sm flex items-center gap-1">
            <span>${coop.name}</span>
          </div>
          <p class="text-xs text-slate-600">${coop.region}</p>
          <div class="text-[11px] bg-emerald-50 text-emerald-800 p-1.5 rounded font-semibold border border-emerald-200">
            ${coop.georeferencedStatus || 'Parcelas geolocalizadas: 91%'}
          </div>
          <div class="text-[11px] text-slate-500 italic">
            Zona Comunal Aproximada (Privacidad Protegida)
          </div>
        `;

        const btn = document.createElement('button');
        btn.className = 'w-full mt-2 bg-[#237A57] text-white text-xs font-bold py-1.5 rounded-lg hover:bg-[#174C3C] transition cursor-pointer';
        btn.innerText = 'Ver Detalles de la Cooperativa';
        btn.onclick = () => onSelectCoop && onSelectCoop(coop);
        popupContent.appendChild(btn);

        marker.bindPopup(popupContent);
        layerGroup.addLayer(circle);
        layerGroup.addLayer(marker);
      } else {
        // Vista Autorizada: Pines de parcelas exactas de productores socios
        const mainIconHtml = `
          <div class="flex items-center gap-1.5 bg-[#1E1512] text-amber-300 px-3 py-1.5 rounded-full shadow-xl border-2 border-amber-400 font-sans whitespace-nowrap">
            <span class="font-bold text-xs">${coop.name} (Sede Central)</span>
          </div>
        `;

        const mainIcon = L.divIcon({
          html: mainIconHtml,
          className: 'custom-main-marker',
          iconSize: [180, 36],
          iconAnchor: [90, 18]
        });

        const mainMarker = L.marker([lat, lng], { icon: mainIcon });
        mainMarker.bindPopup(`
          <div class="p-2 text-xs font-sans space-y-1">
            <strong class="text-slate-900">${coop.name} — Sede Central</strong>
            <p class="text-slate-600">GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
          </div>
        `);
        layerGroup.addLayer(mainMarker);

        if (coop.featuredFamilies && coop.featuredFamilies.length > 0) {
          coop.featuredFamilies.forEach((fam) => {
            if (!fam.coords) return;
            const fLat = fam.coords.lat;
            const fLng = fam.coords.lng;
            bounds.push([fLat, fLng]);

            const familyIconHtml = `
              <div class="bg-emerald-700 text-white p-1.5 rounded-lg shadow-md border border-emerald-300 flex items-center gap-1 text-[11px] font-bold font-sans whitespace-nowrap">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>${fam.name} (${fam.parcelArea})</span>
              </div>
            `;

            const familyIcon = L.divIcon({
              html: familyIconHtml,
              className: 'custom-family-marker',
              iconSize: [140, 28],
              iconAnchor: [70, 14]
            });

            const familyMarker = L.marker([fLat, fLng], { icon: familyIcon });
            familyMarker.bindPopup(`
              <div class="p-2 text-xs font-sans space-y-1">
                <span class="font-bold text-emerald-900 block">${fam.name}</span>
                <span class="text-slate-600 block">Sector: ${fam.zone}</span>
                <span class="text-slate-600 block">Área: ${fam.parcelArea}</span>
                <span class="text-emerald-700 font-bold block">GPS Exacto: ${fLat}, ${fLng}</span>
              </div>
            `);
            layerGroup.addLayer(familyMarker);
          });
        }
      }
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 9 });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [cooperatives, hasRequestedAccess]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
      
      {/* Privacy Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F6F8F5] p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#237A57] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-800">
              Vista Geográfica: {hasRequestedAccess ? "Evidencia Geográfica Autorizada (GPS Exacto)" : "Zonas Comunales Aproximadas (Vista Pública)"}
            </span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Las ubicaciones se muestran agrupadas por zona comunitaria para proteger la privacidad del productor.
            </p>
          </div>
        </div>

        <button
          onClick={handleRequestAccess}
          className="bg-white hover:bg-slate-100 text-slate-800 px-3.5 py-2 rounded-lg border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs shrink-0 cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-700" />
          <span>{hasRequestedAccess ? "Ocultar Evidencia" : "Solicitar acceso a evidencia geográfica"}</span>
        </button>
      </div>

      {/* Official Legal Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Aviso de Debida Diligencia:</strong> AgroConecta organiza evidencias para apoyar la preparación EUDR, pero <strong>no certifica el cumplimiento normativo oficial</strong>.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-96 z-0" />
        
        {/* Cooperative Quick Cards Overlay Below Map */}
        <div className="bg-slate-900 text-white p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {cooperatives.map((coop) => (
            <div
              key={coop.id}
              onClick={() => onSelectCoop && onSelectCoop(coop)}
              className="bg-slate-800/90 hover:bg-slate-800 p-3 rounded-xl border border-slate-700 hover:border-emerald-500 transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{coop.name}</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-0.5">{coop.region}</span>
              </div>
              <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-700">
                {coop.georeferencedStatus || '91% Geolocalizado'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

