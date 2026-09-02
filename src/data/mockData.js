// Datos de demostración estructurados para Vitrina del Origen

export const INITIAL_COOPERATIVES = [
  {
    id: "coop-valle-verde",
    name: "Cooperativa Valle Verde",
    region: "San Martín, Perú",
    province: "Tocache / Huallaga",
    verified: true,
    verificationBadge: "VERIFICADO",
    capacityRange: "22–27 t",
    minCapacity: 22,
    maxCapacity: 27,
    recommendedCapacity: 24,
    confidenceScore: 80,
    confidenceLevelText: "80% Confianza de Entrega",
    fineAromaPct: 82,
    variety: "CCN-51 / Nativo Fino de Aroma",
    varietiesList: ["CCN-51", "Nativo Fino de Aroma", "Chuncho"],
    certifications: [
      { id: "cert-org-eu", name: "Orgánico UE", entity: "Control Union", status: "Vigente", validUntil: "2026-12-15", pdfUrl: "#" },
      { id: "cert-ft", name: "Comercio Justo (Fairtrade)", entity: "FLOCERT", status: "Vigente", validUntil: "2027-03-30", pdfUrl: "#" },
      { id: "cert-senasa", name: "Fitosanitario SENASA", entity: "SENASA Perú", status: "Vigente", validUntil: "2026-10-20", pdfUrl: "#" }
    ],
    historicalFulfillment: "4 de 5 campañas cumplidas (88%)",
    fulfilledCampaignsCount: 4,
    totalCampaignsCount: 5,
    currentRisk: "Moderado",
    riskLevel: "medium", // 'low', 'medium', 'high'
    availableDate: "15 Octubre 2026",
    membersCount: 142,
    parcelsCount: 189,
    georeferencedPct: 91,
    eudrStatus: "Geolocalización Completa (91%)",
    annualTotalCapacity: 120,
    currentCollectionKg: 17100, // 17.1 t
    projectedTargetKg: 24000,   // 24 t target
    shippingDaysLeft: 21,
    deviationKg: -4900,         // -4.9 t shortfall
    description: "Cooperativa líder en el valle del Huallaga especializada en cacao fino de aroma y parcelas sostenibles libres de deforestación.",
    coordinates: { lat: -8.1884, lng: -76.5126 },
    featuredFamilies: [
      { name: "Familia Quispe", zone: "Zona 3 - Tocache Alto", generations: "3 generaciones", parcelArea: "4.5 ha", verified: true },
      { name: "Familia Mamani", zone: "Zona 5 - Uchiza", generations: "2 generaciones", parcelArea: "6.2 ha", verified: true },
      { name: "Familia Torres", zone: "Zona 1 - Bambamarca", generations: "Socios fundadores", parcelArea: "5.0 ha", verified: true }
    ],
    collectionZones: [
      { name: "Zona 1 - Bambamarca", activeLots: 3, climateRisk: "Bajo" },
      { name: "Zona 3 - Tocache Alto", activeLots: 4, climateRisk: "Moderado" },
      { name: "Zona 5 - Uchiza", activeLots: 2, climateRisk: "Alto (SENAMHI: 68mm/72h)" }
    ]
  },
  {
    id: "coop-bosque-andino",
    name: "Cooperativa Bosque Andino",
    region: "Cusco (La Convención), Perú",
    province: "Quillabamba",
    verified: true,
    verificationBadge: "VERIFICADO",
    capacityRange: "32–38 t",
    minCapacity: 32,
    maxCapacity: 38,
    recommendedCapacity: 35,
    confidenceScore: 89,
    confidenceLevelText: "89% Confianza de Entrega",
    fineAromaPct: 94,
    variety: "Chuncho Nativo Fino de Aroma",
    varietiesList: ["Chuncho Nativo", "Criollo"],
    certifications: [
      { id: "cert-org-eu-2", name: "Orgánico UE", entity: "Kiwa BCS", status: "Vigente", validUntil: "2027-01-10", pdfUrl: "#" },
      { id: "cert-ft-2", name: "Comercio Justo (Fairtrade)", entity: "FLOCERT", status: "Vigente", validUntil: "2026-11-18", pdfUrl: "#" }
    ],
    historicalFulfillment: "5 de 5 campañas cumplidas (100%)",
    fulfilledCampaignsCount: 5,
    totalCampaignsCount: 5,
    currentRisk: "Bajo",
    riskLevel: "low",
    availableDate: "20 Octubre 2026",
    membersCount: 198,
    parcelsCount: 240,
    georeferencedPct: 96,
    eudrStatus: "Geolocalización Completa (96%)",
    annualTotalCapacity: 160,
    currentCollectionKg: 28500,
    projectedTargetKg: 35000,
    shippingDaysLeft: 26,
    deviationKg: 500,
    description: "Productores de cacao Chuncho ancestral con notas frutales intensas y perfil sensorial premiado internacionalmente.",
    coordinates: { lat: -12.8631, lng: -72.6958 },
    featuredFamilies: [
      { name: "Familia Condori", zone: "Zona Valle Santa Teresa", generations: "4 generaciones", parcelArea: "3.8 ha", verified: true },
      { name: "Familia Huamán", zone: "Zona Echarati", generations: "Socios agroecológicos", parcelArea: "4.2 ha", verified: true }
    ],
    collectionZones: [
      { name: "Zona Santa Teresa", activeLots: 5, climateRisk: "Bajo" },
      { name: "Zona Echarati", activeLots: 4, climateRisk: "Bajo" }
    ]
  },
  {
    id: "coop-tierra-cacao",
    name: "Cooperativa Tierra Cacao",
    region: "Jazán, Amazonas, Perú",
    province: "Utcubamba",
    verified: true,
    verificationBadge: "VERIFICADO",
    capacityRange: "18–22 t",
    minCapacity: 18,
    maxCapacity: 22,
    recommendedCapacity: 20,
    confidenceScore: 84,
    confidenceLevelText: "84% Confianza de Entrega",
    fineAromaPct: 88,
    variety: "Criollo Amazónico / CCN-51",
    varietiesList: ["Criollo Amazónico", "CCN-51"],
    certifications: [
      { id: "cert-org-usda", name: "USDA Organic", entity: "Control Union", status: "Vigente", validUntil: "2026-09-30", pdfUrl: "#" },
      { id: "cert-senasa-3", name: "Fitosanitario SENASA", entity: "SENASA Perú", status: "Vigente", validUntil: "2027-02-15", pdfUrl: "#" }
    ],
    historicalFulfillment: "4 de 5 campañas cumplidas (80%)",
    fulfilledCampaignsCount: 4,
    totalCampaignsCount: 5,
    currentRisk: "Bajo",
    riskLevel: "low",
    availableDate: "10 Octubre 2026",
    membersCount: 110,
    parcelsCount: 135,
    georeferencedPct: 88,
    eudrStatus: "Geolocalización Completa (88%)",
    annualTotalCapacity: 95,
    currentCollectionKg: 16800,
    projectedTargetKg: 20000,
    shippingDaysLeft: 16,
    deviationKg: -200,
    description: "Cacao criado en microclimas amazónicos de altura con acidez equilibrada y cuerpo especiado.",
    coordinates: { lat: -5.9421, lng: -77.9734 },
    featuredFamilies: [
      { name: "Familia Saavedra", zone: "Zona Bagua Grande", generations: "2 generaciones", parcelArea: "5.1 ha", verified: true }
    ],
    collectionZones: [
      { name: "Zona Utcubamba Sur", activeLots: 3, climateRisk: "Bajo" }
    ]
  },
  {
    id: "coop-aroma-selva",
    name: "Cooperativa Aroma de la Selva",
    region: "Satipo, Junín, Perú",
    province: "Satipo / Río Negro",
    verified: true,
    verificationBadge: "VERIFICADO",
    capacityRange: "18–25 t",
    minCapacity: 18,
    maxCapacity: 25,
    recommendedCapacity: 20,
    confidenceScore: 78,
    confidenceLevelText: "78% Confianza de Entrega",
    fineAromaPct: 85,
    variety: "CCN-51 / VRAEM Fino",
    varietiesList: ["CCN-51", "VRAEM Fino"],
    certifications: [
      { id: "cert-org-eu-4", name: "Orgánico UE", entity: "Imocert", status: "Vigente", validUntil: "2026-11-05", pdfUrl: "#" }
    ],
    historicalFulfillment: "3 de 5 campañas cumplidas (60%)",
    fulfilledCampaignsCount: 3,
    totalCampaignsCount: 5,
    currentRisk: "Moderado",
    riskLevel: "medium",
    availableDate: "25 Octubre 2026",
    membersCount: 125,
    parcelsCount: 148,
    georeferencedPct: 82,
    eudrStatus: "Revisión Requerida (82%)",
    annualTotalCapacity: 105,
    currentCollectionKg: 14200,
    projectedTargetKg: 20000,
    shippingDaysLeft: 31,
    deviationKg: -1800,
    description: "Cooperativa de la selva central enfocada en grano bien fermentado con trazabilidad comunitaria.",
    coordinates: { lat: -11.2522, lng: -74.6386 },
    featuredFamilies: [
      { name: "Familia Pizango", zone: "Zona Pangoa", generations: "3 generaciones", parcelArea: "4.0 ha", verified: true }
    ],
    collectionZones: [
      { name: "Zona Satipo Norte", activeLots: 4, climateRisk: "Moderado" }
    ]
  }
];

export const INITIAL_LOTS = [
  {
    id: "CAC-2026-014",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Almacenamiento",
    stageStatus: "Listo para despachar",
    weightKg: 4200,
    variety: "CCN-51",
    moisturePct: 6.8,
    fineAromaPct: 82,
    producer: "Familia Quispe (Socio #104)",
    parcelId: "PAR-304-TOCACHE",
    location: "Tocache Alto, San Martín",
    coordinates: { lat: -8.1884, lng: -76.5126 },
    manager: "Carlos Mendoza (Técnico de Acopio)",
    fermentationBox: "Cajón Escalonado de Laurel (300kg)",
    fermentationHours: 96,
    fermentationStatus: "Correcto (Rango óptimo 90-108h)",
    dryingDays: 6,
    eudrVerified: true,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-014-VALLEVERDE",
    lastUpdated: "2026-09-01 14:30",
    massBalance: { wetInputKg: 8500, dryOutputKg: 4200, yieldPct: 49.4, status: "Dentro del Rango Esperado" }
  },
  {
    id: "CAC-2026-015",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Fermentación",
    stageStatus: "Fuera de Rango (114h alcanzadas)",
    weightKg: 3800,
    variety: "Nativo Fino de Aroma",
    moisturePct: 14.2,
    fineAromaPct: 85,
    producer: "Familia Mamani (Socio #082)",
    parcelId: "PAR-508-UCHIZA",
    location: "Zona 5 - Uchiza, San Martín",
    coordinates: { lat: -8.4521, lng: -76.4211 },
    manager: "Jorge Rivas (Jefe de Planta)",
    fermentationBox: "Cajón Rectangular de Tornillo",
    fermentationHours: 114,
    fermentationStatus: "ALERTA: Excede rango óptimo (90-108h)",
    dryingDays: 0,
    eudrVerified: true,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-015-VALLEVERDE",
    lastUpdated: "2026-09-01 16:10",
    massBalance: { wetInputKg: 7800, dryOutputKg: 3800, yieldPct: 48.7, status: "Revisar Humedad Excesiva" }
  },
  {
    id: "CAC-2026-016",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Secado",
    stageStatus: "Secado en marquesina - Día 4",
    weightKg: 5100,
    variety: "CCN-51",
    moisturePct: 8.4,
    fineAromaPct: 80,
    producer: "Familia Torres (Socio #012)",
    parcelId: "PAR-102-BAMBAMARCA",
    location: "Zona 1 - Bambamarca, San Martín",
    coordinates: { lat: -8.1120, lng: -76.5890 },
    manager: "Lucía Paredes (Control de Calidad)",
    fermentationBox: "Cajón Cascadas Madera Roble",
    fermentationHours: 98,
    fermentationStatus: "Correcto (98h)",
    dryingDays: 4,
    eudrVerified: true,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-016-VALLEVERDE",
    lastUpdated: "2026-09-01 10:15",
    massBalance: { wetInputKg: 10200, dryOutputKg: 5100, yieldPct: 50.0, status: "Dentro del Rango Esperado" }
  },
  {
    id: "CAC-2026-017",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Acopio",
    stageStatus: "Pendiente de Geolocalización de Parcela",
    weightKg: 4000,
    variety: "CCN-51",
    moisturePct: 54.0, // Grano fresco en baba
    fineAromaPct: 81,
    producer: "Asociación Sector Progreso (4 Socios)",
    parcelId: "PAR-599-INCOMPLETA",
    location: "Zona 5 - Sector Progreso",
    coordinates: null,
    manager: "Pedro Morales (Técnico de Campo)",
    fermentationBox: "En espera de carga",
    fermentationHours: 0,
    fermentationStatus: "Pendiente inicio",
    dryingDays: 0,
    eudrVerified: false,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-017-PENDIENTE",
    lastUpdated: "2026-09-01 09:00",
    massBalance: { wetInputKg: 8000, dryOutputKg: 4000, yieldPct: 50.0, status: "Verificación en Proceso" }
  }
];

// Datos de la Curva del Compromiso (Semanas de la Campaña 2026)
export const COMMITMENT_CURVE_DATA = [
  { week: "Semana 1", proyectado: 2.0, real: 2.1, minRange: 1.8, maxRange: 2.3, status: "Normal" },
  { week: "Semana 2", proyectado: 5.5, real: 5.6, minRange: 4.8, maxRange: 6.0, status: "Normal" },
  { week: "Semana 3", proyectado: 9.8, real: 9.7, minRange: 8.8, maxRange: 10.5, status: "Normal" },
  { week: "Semana 4", proyectado: 14.5, real: 13.8, minRange: 13.0, maxRange: 15.5, status: "Normal" },
  { week: "Semana 5 (Actual)", proyectado: 22.0, real: 17.1, minRange: 19.5, maxRange: 24.5, status: "Desviación -4.9t (Lluvia SENAMHI)" },
  { week: "Semana 6 (Est.)", proyectado: 25.5, real: null, minRange: 22.5, maxRange: 27.5, status: "Proyectado" },
  { week: "Semana 7 (Embarque)", proyectado: 27.0, real: null, minRange: 24.0, maxRange: 29.0, status: "Meta Embarque 15-Oct" }
];

// Datos de Alertas Tempranas
export const EARLY_WARNING_ALERTS = [
  {
    id: "alt-01",
    level: "URGENTE",
    type: "DESVIACION_CAPACIDAD",
    title: "Desviación detectada en Campaña Valle Verde",
    message: "El acopio actual (17.1 t) se encuentra 4.9 t debajo de la curva proyectada (22.0 t). Quedan 3 semanas antes del embarque programado para el 15 de Octubre.",
    cause: "SENAMHI Alerta Hidrológica: Lluvia intensa acumulada (68 mm / 72h en Zona 5 Uchiza) causó bloqueos temporales en caminos rurales e impidió el secado en patiado.",
    zone: "Zona 5 - Uchiza",
    recommendedActions: [
      "Activar acopio de contingencia con socios de Zona 1 (Bambamarca).",
      "Si el comprador solicita > 22 t, proponer Cobertura Conjunta con Cooperativa Bosque Andino (35 t disponibles)."
    ]
  },
  {
    id: "alt-02",
    level: "ATENCION",
    type: "CALIDAD_FERMENTACION",
    title: "Lote CAC-2026-015 fuera de rango óptimo",
    message: "El lote sobrepasó las 108 horas máximas sugeridas para varietales finos (114h registradas en Planta Uchiza).",
    cause: "Retraso en volteo por rotación de turno operario.",
    zone: "Planta Central",
    recommendedActions: [
      "Realizar prueba de corte de grano inmediata.",
      "Ajustar protocolo de secado rápido."
    ]
  },
  {
    id: "alt-03",
    level: "ATENCION",
    type: "GEOLOCALIZACION_EUDR",
    title: "Lote CAC-2026-017 sin geolocalización completa",
    message: "Falta vincular los polígonos GPS de 2 parcelas del Sector Progreso para asegurar 100% de cumplimiento EUDR.",
    cause: "Técnico de campo sin cobertura celular durante el acopio inicial.",
    zone: "Zona 5",
    recommendedActions: [
      "Enviar formulario offline mediante Bot de Telegram (/geolocalizacion) en la próxima visita."
    ]
  }
];

// Ofertas y Cotizaciones en Negociación
export const INITIAL_OFFERS = [
  {
    id: "off-882",
    buyerCompany: "Nordic Cocoa Import AB",
    buyerContact: "Henrik Lindqvist (Chief Buyer)",
    country: "Suecia / UE",
    coopId: "coop-valle-verde",
    volumeTons: 25,
    pricePerKgUsd: 8.10,
    totalValueUsd: 202500,
    incoterm: "FOB Callao",
    variety: "CCN-51 / Fino de Aroma",
    requestedDeliveryDate: "15 Octubre 2026",
    status: "ENVIADA", // 'ENVIADA', 'ACEPTADA', 'CONTRAOFERTADA', 'RECHAZADA'
    expirationHoursLeft: 46,
    marketPriceRefUsdKg: 8.42,
    priceVsMarketPct: -3.8,
    coverageStatus: "Cubierta por Valle Verde (Capacidad 22–27 t)",
    isJointCoverage: false,
    history: [
      { date: "2026-09-01 11:20", text: "Oferta recibida desde Estocolmo por US$ 8.10/kg para 25 t." }
    ]
  },
  {
    id: "off-904",
    buyerCompany: "Chocolaterie Artisanale Paris",
    buyerContact: "Claire Dubois (Sourcing Director)",
    country: "Francia / UE",
    coopId: "coop-valle-verde",
    volumeTons: 50,
    pricePerKgUsd: 8.65,
    totalValueUsd: 432500,
    incoterm: "FOB Callao",
    variety: "Cacao Fino de Aroma Certificado Orgánico",
    requestedDeliveryDate: "20 Octubre 2026",
    status: "CONTRAOFERTADA",
    expirationHoursLeft: 18,
    marketPriceRefUsdKg: 8.42,
    priceVsMarketPct: +2.7,
    coverageStatus: "Requiere Cobertura Conjunta (Valle Verde 25t + Bosque Andino 25t)",
    isJointCoverage: true,
    jointDetails: [
      { coopName: "Cooperativa Valle Verde", volume: 25, region: "San Martín" },
      { coopName: "Cooperativa Bosque Andino", volume: 25, region: "Cusco" }
    ],
    history: [
      { date: "2026-08-30 09:00", text: "Solicitud inicial de 50 t a Valle Verde." },
      { date: "2026-08-30 10:15", text: "Sistema detectó capacidad insuficiente e integró Cobertura Conjunta con Bosque Andino." },
      { date: "2026-08-31 15:40", text: "Valle Verde envió contraoferta ajustando precio a US$ 8.65/kg por costo de trazabilidad integrada." }
    ]
  }
];

// Precios de Mercado Internacional (ICE Futures NY Cocoa - DEMO)
export const ICE_NY_COCOA_MARKET = {
  currentPriceUsdKg: 8.42,
  priceUnit: "USD / kg",
  pricePerTonUsd: 8420,
  change24hPct: +1.4,
  change7dPct: +11.5,
  sourceLabel: "ICE Futures NY (Demostrativo)",
  lastUpdate: "2026-09-01 17:00 EST",
  historical30d: [
    { date: "01 Aug", price: 7.20 },
    { date: "08 Aug", price: 7.45 },
    { date: "15 Aug", price: 7.80 },
    { date: "22 Aug", price: 7.95 },
    { date: "29 Aug", price: 8.30 },
    { date: "01 Sep", price: 8.42 }
  ]
};

// Datos del SENAMHI (Demostrativo)
export const SENAMHI_WEATHER_DATA = {
  station: "Estación Tocache - San Martín (ID: 472891)",
  lastReportDate: "2026-09-01 12:00 PET",
  accumulatedRain72hMm: 68,
  expectedAvgMm: 18,
  rainRatioVsAvg: 3.7,
  riskLevel: "ALTO",
  temperatureAvgC: 28.4,
  humidityPct: 89,
  forecast3Days: [
    { day: "Hoy", status: "Lluvias Moderadas", rainProbabilityPct: 85, tempMax: 29 },
    { day: "Mañana", status: "Chubascos Dispersos", rainProbabilityPct: 60, tempMax: 31 },
    { day: "Jueves", status: "Parcialmente Nublado", rainProbabilityPct: 30, tempMax: 32 }
  ],
  impactStatement: "Las lluvias están 3.7× por encima del promedio estacional en la Zona 5 (Uchiza), explicando la ralentización reciente del secado natural en marquesina y el retraso temporal en el transporte del grano húmedo."
};
