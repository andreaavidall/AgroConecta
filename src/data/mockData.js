// Datos de demostración estructurados para AgroConecta
// Incluyen trazabilidad, balance de masa, certificaciones vs despacho, precios referenciales y estaciones meteorológicas.

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

    // Capacidad Operativa y Stocks para Algoritmos ATP / CTP
    stockAptoKg: 5000,          // 5.0 t seco disponible inmediato (ATP)
    stockReservadoKg: 0,        // 0.0 t reservado
    stockSeguridadKg: 1000,     // 1.0 t reserva técnica
    acopioProyectadoKg: 15000,  // 15.0 t acopio proyectado ajustado (CTP)
    capacidadFermentacionKg: 18000, // Limite operativo fermentación
    capacidadSecadoKg: 12000,      // Cuello de botella en secado por lluvias
    capacidadAlmacenKg: 30000,

    certifications: [
      { id: "cert-org-eu", name: "Orgánico UE", entity: "Control Union", status: "Vigente", validUntil: "2026-12-15", scope: "Cooperativa & Parcelas", category: "ORGANIZACIONAL" },
      { id: "cert-ft", name: "Comercio Justo (Fairtrade)", entity: "FLOCERT", status: "Vigente", validUntil: "2027-03-30", scope: "Cooperativa", category: "ORGANIZACIONAL" }
    ],
    shipmentDocs: [
      { id: "doc-senasa-01", name: "Certificado Fitosanitario SENASA", entity: "SENASA Perú", status: "En Trámite", validUntil: "2026-10-20", scope: "Lote CAC-2026-014 / Exportación", category: "DESPACHO" }
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
      { name: "Familia Quispe", zone: "Zona 3 - Tocache Alto", generations: "3 generaciones", parcelArea: "4.5 ha", verified: true, coords: { lat: -8.1884, lng: -76.5126 } },
      { name: "Familia Mamani", zone: "Zona 5 - Uchiza", generations: "2 generaciones", parcelArea: "6.2 ha", verified: true, coords: { lat: -8.4521, lng: -76.4211 } },
      { name: "Familia Torres", zone: "Zona 1 - Bambamarca", generations: "Socios fundadores", parcelArea: "5.0 ha", verified: true, coords: { lat: -8.1120, lng: -76.5890 } }
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

    stockAptoKg: 15000,
    stockReservadoKg: 2000,
    stockSeguridadKg: 2000,
    acopioProyectadoKg: 20000,
    capacidadFermentacionKg: 25000,
    capacidadSecadoKg: 22000,
    capacidadAlmacenKg: 40000,

    certifications: [
      { id: "cert-org-eu-2", name: "Orgánico UE", entity: "Kiwa BCS", status: "Vigente", validUntil: "2027-01-10", scope: "Cooperativa & Parcelas", category: "ORGANIZACIONAL" },
      { id: "cert-ft-2", name: "Comercio Justo (Fairtrade)", entity: "FLOCERT", status: "Vigente", validUntil: "2026-11-18", scope: "Cooperativa", category: "ORGANIZACIONAL" }
    ],
    shipmentDocs: [],

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
      { name: "Familia Condori", zone: "Zona Valle Santa Teresa", generations: "4 generaciones", parcelArea: "3.8 ha", verified: true, coords: { lat: -12.8631, lng: -72.6958 } },
      { name: "Familia Huamán", zone: "Zona Echarati", generations: "Socios agroecológicos", parcelArea: "4.2 ha", verified: true, coords: { lat: -12.7510, lng: -72.6120 } }
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

    stockAptoKg: 8000,
    stockReservadoKg: 1000,
    stockSeguridadKg: 1000,
    acopioProyectadoKg: 12000,
    capacidadFermentacionKg: 15000,
    capacidadSecadoKg: 14000,
    capacidadAlmacenKg: 25000,

    certifications: [
      { id: "cert-org-usda", name: "USDA Organic", entity: "Control Union", status: "Vigente", validUntil: "2026-09-30", scope: "Cooperativa & Parcelas", category: "ORGANIZACIONAL" }
    ],
    shipmentDocs: [],

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
      { name: "Familia Saavedra", zone: "Zona Bagua Grande", generations: "2 generaciones", parcelArea: "5.1 ha", verified: true, coords: { lat: -5.9421, lng: -77.9734 } }
    ],
    collectionZones: [
      { name: "Zona Utcubamba Sur", activeLots: 3, climateRisk: "Bajo" }
    ]
  }
];

// Lotes con Trazabilidad y Balance de Masa por Etapa
export const INITIAL_LOTS = [
  {
    id: "CAC-2026-014",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Almacenamiento",
    stageStatus: "Listo para despachar",
    physicalState: "SECO_COMERCIALIZABLE",
    weightKg: 4200,
    variety: "CCN-51",
    moisturePct: 6.8,
    fineAromaPct: 82,
    eudrVerified: true,
    certificationType: "Orgánico UE / Fairtrade",

    // Trazabilidad de Aportantes (Lote Agregado)
    contributingProducers: [
      { name: "Familia Quispe", parcelId: "PAR-304-TOCACHE", sharePct: 50, wetKg: 4250, dryKg: 2100 },
      { name: "Familia Torres", parcelId: "PAR-102-BAMBAMARCA", sharePct: 50, wetKg: 4250, dryKg: 2100 }
    ],

    producer: "Familia Quispe & Familia Torres (2 Socios)",
    parcelId: "PAR-304-TOCACHE / PAR-102-BAMBAMARCA",
    location: "Tocache Alto y Bambamarca, San Martín",
    coordinates: { lat: -8.1884, lng: -76.5126 },
    manager: "Carlos Mendoza (Técnico de Acopio)",
    fermentationBox: "Cajón Escalonado de Laurel (300kg)",
    fermentationHours: 96,
    fermentationStatus: "Correcto (96h)",
    dryingDays: 6,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-014-VALLEVERDE",
    lastUpdated: "2026-09-01 14:30",

    // Balance de Masa Estricto
    massBalance: {
      wetInputKg: 8500,     // Entrada en baba
      fermentingLossKg: 425, // Merma en lixiviación/fermentación (5%)
      dryOutputKg: 4200,    // Salida grano seco
      moistureLossKg: 3875, // Agua evaporada en secado
      yieldPct: 49.4,       // (4200 / 8500) * 100
      toleranceStatus: "CONCILIADO_OK",
      toleranceMessage: "Rendimiento dentro del rango normativo (45% - 52%)"
    }
  },
  {
    id: "CAC-2026-015",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Fermentación",
    stageStatus: "Fuera de Rango (114h alcanzadas)",
    physicalState: "FERMENTANDO_HUMEDO",
    weightKg: 3800,
    variety: "Nativo Fino de Aroma",
    moisturePct: 14.2,
    fineAromaPct: 85,
    eudrVerified: true,
    certificationType: "Orgánico UE",

    contributingProducers: [
      { name: "Familia Mamani", parcelId: "PAR-508-UCHIZA", sharePct: 100, wetKg: 7800, dryKg: 3800 }
    ],

    producer: "Familia Mamani (Socio #082)",
    parcelId: "PAR-508-UCHIZA",
    location: "Zona 5 - Uchiza, San Martín",
    coordinates: { lat: -8.4521, lng: -76.4211 },
    manager: "Jorge Rivas (Jefe de Planta)",
    fermentationBox: "Cajón Rectangular de Tornillo",
    fermentationHours: 114,
    fermentationStatus: "ALERTA: Excede rango óptimo (90-108h)",
    dryingDays: 0,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-015-VALLEVERDE",
    lastUpdated: "2026-09-01 16:10",

    massBalance: {
      wetInputKg: 7800,
      fermentingLossKg: 390,
      dryOutputKg: 3800,
      moistureLossKg: 3610,
      yieldPct: 48.7,
      toleranceStatus: "EN_PROCESO",
      toleranceMessage: "Estimación preliminar en proceso de fermentación"
    }
  },
  {
    id: "CAC-2026-016",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Secado",
    stageStatus: "Secado en marquesina - Día 4",
    physicalState: "SECANDO",
    weightKg: 5100,
    variety: "CCN-51",
    moisturePct: 8.4,
    fineAromaPct: 80,
    eudrVerified: true,
    certificationType: "Convencional",

    contributingProducers: [
      { name: "Familia Torres", parcelId: "PAR-102-BAMBAMARCA", sharePct: 100, wetKg: 10200, dryKg: 5100 }
    ],

    producer: "Familia Torres (Socio #012)",
    parcelId: "PAR-102-BAMBAMARCA",
    location: "Zona 1 - Bambamarca, San Martín",
    coordinates: { lat: -8.1120, lng: -76.5890 },
    manager: "Lucía Paredes (Control de Calidad)",
    fermentationBox: "Cajón Cascadas Madera Roble",
    fermentationHours: 98,
    fermentationStatus: "Correcto (98h)",
    dryingDays: 4,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-016-VALLEVERDE",
    lastUpdated: "2026-09-01 10:15",

    massBalance: {
      wetInputKg: 10200,
      fermentingLossKg: 510,
      dryOutputKg: 5100,
      moistureLossKg: 4590,
      yieldPct: 50.0,
      toleranceStatus: "EN_PROCESO",
      toleranceMessage: "Secado al 8.4% de humedad. Falta 1 día para embolsado."
    }
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
    cooperativeName: "Cooperativa Valle Verde",
    volumeTons: 20, // Solicitado: 20 t
    backedVolumeTons: 15.0, // Respaldado actual (5t ATP + 10t CTP)
    gapTons: 5.0, // Brecha no respaldada
    coberturaPct: 75, // 15 / 20 = 75%
    pricePerKgUsd: 8.50,
    offeredPriceUsdKg: 8.50,
    totalValueUsd: 170000,
    incoterm: "FOB Callao",
    variety: "CCN-51 / Fino de Aroma Orgánico",
    requestedDeliveryDate: "2026-10-15",
    status: "ENVIADA", // 'ENVIADA', 'REVISADA', 'CONTRAOFERTADA', 'ACEPTADA', 'RECHAZADA'
    expirationHoursLeft: 46,
    marketPriceRefUsdKg: 8.42,
    priceVsMarketPct: +1.0,
    coverageStatus: "PROPUESTA_PARCIAL", // 'PROPUESTA_PARCIAL' | 'ASEGURADA'
    isJointCoverage: false,
    history: [
      { date: "2026-09-01 11:20", text: "Oferta recibida desde Estocolmo por US$ 8.50/kg para 20 t." }
    ]
  },
  {
    id: "off-904",
    buyerCompany: "Chocolaterie Artisanale Paris",
    buyerContact: "Claire Dubois (Sourcing Director)",
    country: "Francia / UE",
    coopId: "coop-valle-verde",
    cooperativeName: "Cooperativa Valle Verde",
    volumeTons: 50,
    backedVolumeTons: 50.0, // 25t Valle Verde + 25t Bosque Andino
    gapTons: 0,
    coberturaPct: 100,
    pricePerKgUsd: 8.65,
    offeredPriceUsdKg: 8.65,
    totalValueUsd: 432500,
    incoterm: "FOB Callao",
    variety: "Cacao Fino de Aroma Certificado Orgánico",
    requestedDeliveryDate: "2026-10-20",
    status: "CONTRAOFERTADA",
    expirationHoursLeft: 18,
    marketPriceRefUsdKg: 8.42,
    priceVsMarketPct: +2.7,
    coverageStatus: "PROPUESTA_COBERTURA_CONJUNTA", // Hasta confirmación transaccional
    isJointCoverage: true,
    jointDetails: [
      { coopName: "Cooperativa Valle Verde", volume: 25, region: "San Martín", confirmed: true },
      { coopName: "Cooperativa Bosque Andino", volume: 25, region: "Cusco", confirmed: false }
    ],
    history: [
      { date: "2026-08-30 09:00", text: "Solicitud inicial de 50 t a Valle Verde." },
      { date: "2026-08-30 10:15", text: "Propuesta de Cobertura Conjunta generada con Bosque Andino (Pendiente firma final)." }
    ]
  }
];

// Precios de Mercado Internacional (ICE Futures NY Cocoa - DEMO CON ETIQUETAS EXPLÍCITAS)
export const ICE_NY_COCOA_MARKET = {
  currentPriceUsdKg: 8.42,
  priceUnit: "USD / kg",
  pricePerTonUsd: 8420,
  exchangeRatePenUsd: 3.75, // PEN por USD
  change24hPct: +1.4,
  change7dPct: +11.5,
  sourceLabel: "ICE Futures NY (Contrato Diciembre 2026)",
  dataFreshnessTag: "Dato Real - SIMULADO PILOTO",
  lastUpdate: "2026-09-03 14:00 PET",
  pricingBreakdown: {
    baseNyUsdKg: 8.42,
    organicPremiumUsdKg: +0.50,
    fairtradePremiumUsdKg: +0.20,
    originDiffUsdKg: +0.15,
    processingCostUsdKg: -0.35,
    logisticsCostUsdKg: -0.25,
    netCoopMarginUsdKg: 8.67
  }
};

// Datos del SENAMHI (Telemetría Demostrativa)
export const SENAMHI_WEATHER_DATA = {
  station: "Estación Tocache - San Martín (ID SENAMHI: 472891)",
  dataFreshnessTag: "Telemetría SENAMHI - Cargado 03/09/2026",
  lastReportDate: "2026-09-03 12:00 PET",
  accumulatedRain72hMm: 68,
  expectedAvgMm: 18,
  rainRatioVsAvg: 3.7,
  riskLevel: "ALTO",
  temperatureAvgC: 28.4,
  humidityPct: 89,
  forecast3Days: [
    { day: "Hoy", status: "Lluvias Torrenciales", rainProbabilityPct: 85, tempMax: 29 },
    { day: "Mañana", status: "Chubascos Dispersos", rainProbabilityPct: 60, tempMax: 31 },
    { day: "Sábado", status: "Parcialmente Nublado", rainProbabilityPct: 30, tempMax: 32 }
  ],
  impactStatement: "Las lluvias están 3.7× por encima del promedio en Uchiza (Zona 5), restringiendo la capacidad de secado solar a 12 t y demorando el despacho de ruta hacia puerto."
};

// Alertas Tempranas Operativas con Acciones Directas
export const EARLY_WARNING_ALERTS = [
  {
    id: "alt-01",
    level: "URGENTE",
    type: "DESVIACION_CLIMA",
    title: "Alerta Lluvias SENAMHI en Zona 5 (Uchiza)",
    message: "68 mm de lluvia en 72h ralentizan el secado solar de 3 lotes activos e incrementan el riesgo logístico.",
    zone: "Zona 5 - Uchiza",
    actionType: "SENAMHI_FORECAST",
    actionLabel: "Ver Pronóstico SENAMHI & Reprogramar",
    targetRoute: "senamhi-weather"
  },
  {
    id: "alt-02",
    level: "ATENCION",
    type: "CALIDAD_FERMENTACION",
    title: "Lote CAC-2026-015 fuera de tiempo óptimo",
    message: "114 horas de fermentación acumuladas superan el límite de 108h en Planta Uchiza.",
    zone: "Planta Uchiza",
    actionType: "FERMENTATION_FIX",
    actionLabel: "Registrar Acción Correctiva",
    targetRoute: "lots-management"
  },
  {
    id: "alt-03",
    level: "ATENCION",
    type: "GEOLOCALIZACION_EUDR",
    title: "Parcela PAR-599 sin Polígono GPS",
    message: "2 parcelas del Sector Progreso carecen de coordenadas exactas para la ficha de exportación UE.",
    zone: "Sector Progreso",
    actionType: "GPS_UPDATE",
    actionLabel: "Completar Ubicación GPS",
    targetRoute: "interactive-map"
  }
];

// Curva de Acopio Campaña 2026
export const COMMITMENT_CURVE_DATA = [
  { week: "Semana 1", proyectado: 2.0, real: 2.1, minRange: 1.8, maxRange: 2.3, status: "Normal" },
  { week: "Semana 2", proyectado: 5.5, real: 5.6, minRange: 4.8, maxRange: 6.0, status: "Normal" },
  { week: "Semana 3", proyectado: 9.8, real: 9.7, minRange: 8.8, maxRange: 10.5, status: "Normal" },
  { week: "Semana 4", proyectado: 14.5, real: 13.8, minRange: 13.0, maxRange: 15.5, status: "Normal" },
  { week: "Semana 5 (Actual)", proyectado: 22.0, real: 17.1, minRange: 19.5, maxRange: 24.5, status: "Desviación -4.9t (Lluvia SENAMHI)" },
  { week: "Semana 6 (Est.)", proyectado: 25.5, real: null, minRange: 22.5, maxRange: 27.5, status: "Proyectado" },
  { week: "Semana 7 (Embarque)", proyectado: 27.0, real: null, minRange: 24.0, maxRange: 29.0, status: "Meta Embarque 15-Oct" }
];
