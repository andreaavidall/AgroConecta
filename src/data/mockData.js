// Datos de demostración estructurados para AgroConecta (Versión Unificada Auditoría)

export const UNIFIED_ORDER_METRICS = {
  requestedTons: 20,
  availableTodayTons: 4,     // ATP (Disponible para prometer hoy)
  probableDateTons: 12,      // CTP (Probable para la fecha)
  totalBackedTons: 16,       // Cobertura total condicionada
  unbackedGapTons: 4,        // Brecha no respaldada
  coveragePct: 80,           // (16 / 20) * 100 = 80% (NUNCA 100% ni 96%)
  firstViableDate: "24/10/2026",
  requestedDate: "15/10/2026",
  bottleneckReason: "Precipitación elevada (68mm en 72h) que retrasa el secado solar en marquesinas"
};

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

    // Cifras unificadas para Pedido 20 t
    stockAptoKg: 5000,           // 5t seco
    stockReservadoKg: 0,
    stockSeguridadKg: 1000,      // 1t reserva técnica => 4t disponible hoy
    acopioProyectadoKg: 12000,   // 12t probable para la fecha => Total 16t respaldadas (80%)
    capacidadFermentacionKg: 18000,
    capacidadSecadoKg: 12000,
    capacidadAlmacenKg: 30000,

    certifications: [
      { id: "cert-org-eu", name: "Certificado Orgánico UE", entity: "Control Union Peru", status: "Vigente", validUntil: "2026-12-15", scope: "Cooperativa & Parcelas", category: "ORGANIZACIONAL" },
      { id: "cert-ft", name: "Comercio Justo (Fairtrade)", entity: "FLOCERT GmbH", status: "Vigente", validUntil: "2027-03-30", scope: "Cooperativa", category: "ORGANIZACIONAL" }
    ],
    shipmentDocs: [
      { id: "doc-senasa-01", name: "Certificado Fitosanitario SENASA", entity: "SENASA Perú", status: "En Trámite", validUntil: "2026-10-20", scope: "Lote CAC-2026-014", category: "DESPACHO" }
    ],

    // Indicadores Independientes Verificables (Punto 4 Corregido)
    historicalFulfillment: "4 de 5 campañas cumplidas (80%)",
    fulfilledCampaignsCount: 4,
    totalCampaignsCount: 5,
    lastDataUpdate: "Hace 2 días",
    currentRisk: "Medio",
    riskLevel: "medium",
    availableDate: "24/10/2026",
    membersCount: 142,
    parcelsCount: 189,
    georeferencedPct: 91,
    georeferencedStatus: "Parcelas geolocalizadas: 91%", // (Corregido Punto 7)
    annualTotalCapacity: 120,
    currentCollectionKg: 17100,
    projectedTargetKg: 24000,
    shippingDaysLeft: 21,
    deviationKg: -4900,
    description: "Cooperativa agrícola del Huallaga especializada en cacao fino de aroma y parcelas geolocalizadas.",
    coordinates: { lat: -8.1884, lng: -76.5126 },
    
    // Anonimizado para privacidad (Punto 11 Corregido)
    featuredFamilies: [
      { name: "Socio #104", zone: "Sector Tocache Alto", parcelArea: "4.5 ha", georeferenced: true, coords: { lat: -8.1884, lng: -76.5126 } },
      { name: "Socio #082", zone: "Sector Uchiza", parcelArea: "6.2 ha", georeferenced: true, coords: { lat: -8.4521, lng: -76.4211 } },
      { name: "Socio #012", zone: "Sector Bambamarca", parcelArea: "5.0 ha", georeferenced: true, coords: { lat: -8.1120, lng: -76.5890 } }
    ],
    collectionZones: [
      { name: "Zona 1 - Bambamarca", activeLots: 3, climateRisk: "Bajo" },
      { name: "Zona 3 - Tocache Alto", activeLots: 4, climateRisk: "Medio" },
      { name: "Zona 5 - Uchiza", activeLots: 2, climateRisk: "Medio (SENAMHI: 68mm precipitación)" }
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

    stockAptoKg: 15000,
    stockReservadoKg: 2000,
    stockSeguridadKg: 2000,
    acopioProyectadoKg: 20000,
    capacidadFermentacionKg: 25000,
    capacidadSecadoKg: 22000,
    capacidadAlmacenKg: 40000,

    certifications: [
      { id: "cert-org-eu-2", name: "Certificado Orgánico UE", entity: "Kiwa BCS", status: "Vigente", validUntil: "2027-01-10", scope: "Cooperativa & Parcelas", category: "ORGANIZACIONAL" }
    ],
    shipmentDocs: [],

    historicalFulfillment: "5 de 5 campañas cumplidas (100%)",
    fulfilledCampaignsCount: 5,
    totalCampaignsCount: 5,
    lastDataUpdate: "Ayer",
    currentRisk: "Bajo",
    riskLevel: "low",
    availableDate: "20/10/2026",
    membersCount: 198,
    parcelsCount: 240,
    georeferencedPct: 96,
    georeferencedStatus: "Parcelas geolocalizadas: 96%",
    annualTotalCapacity: 160,
    currentCollectionKg: 28500,
    projectedTargetKg: 35000,
    shippingDaysLeft: 26,
    deviationKg: 500,
    description: "Productores de cacao Chuncho nativo con origen geolocalizado completo.",
    coordinates: { lat: -12.8631, lng: -72.6958 },
    featuredFamilies: [
      { name: "Socio #201", zone: "Sector Santa Teresa", parcelArea: "3.8 ha", georeferenced: true, coords: { lat: -12.8631, lng: -72.6958 } }
    ],
    collectionZones: [
      { name: "Zona Santa Teresa", activeLots: 5, climateRisk: "Bajo" }
    ]
  }
];

// Balance de Masa Corregido (Punto 5)
// CAC-2026-014: Entrada (8500 kg) = Salida seca (4200 kg) + Merma (4300 kg) + Saldo (0 kg). ¡Cuadra exacto!
export const INITIAL_LOTS = [
  {
    id: "CAC-2026-014",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Almacenamiento",
    stageStatus: "Listo para despachar",
    physicalState: "Grano Seco Comercializable",
    weightKg: 4200,
    outputTypeLabel: "Salida seca definitiva", // (Punto 5: Definitiva si está cerrado)
    variety: "CCN-51",
    moisturePct: 6.8,
    fineAromaPct: 82,
    georeferencedStatus: "Origen geolocalizado: completo", // (Punto 7 Corregido)
    certificationType: "Orgánico UE / Fairtrade",

    contributingProducers: [
      { name: "Socio #104", parcelId: "PAR-304-TOCACHE", sharePct: 50, wetKg: 4250, dryKg: 2100 },
      { name: "Socio #012", parcelId: "PAR-102-BAMBAMARCA", sharePct: 50, wetKg: 4250, dryKg: 2100 }
    ],

    producer: "Socio #104 & Socio #012 (2 Socios)",
    parcelId: "PAR-304-TOCACHE / PAR-102-BAMBAMARCA",
    location: "Tocache Alto y Bambamarca, San Martín",
    coordinates: { lat: -8.1884, lng: -76.5126 },
    manager: "Técnico de Acopio",
    fermentationBox: "Cajón Escalonado de Laurel",
    fermentationHours: 96,
    fermentationStatus: "Correcto (96h)",
    dryingDays: 6,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-014-VALLEVERDE",
    lastUpdated: "01/09/2026 14:30",

    // Balance de masa matemáticamente exacto: 8500 = 4200 + 4300 + 0
    massBalance: {
      wetInputKg: 8500,
      moistureLossKg: 4300,  // Merma total por lixiviación y secado
      dryOutputKg: 4200,     // Salida seca
      inProcessSaldoKg: 0,   // Saldo en proceso (0 si está cerrado)
      yieldPct: 49.4,        // (4200 / 8500) * 100
      toleranceStatus: "CONCILIADO_OK",
      toleranceMessage: "Entrada (8500 kg) = Salida (4200 kg) + Merma (4300 kg). Balance exacto."
    }
  },
  {
    id: "CAC-2026-015",
    coopId: "coop-valle-verde",
    coopName: "Cooperativa Valle Verde",
    stage: "Fermentación",
    stageStatus: "Fuera de Rango (114h alcanzadas)",
    physicalState: "Fermentando Húmedo",
    weightKg: 3800,
    outputTypeLabel: "Salida estimada en proceso", // (Punto 5: Estimada si está en proceso)
    variety: "Nativo Fino de Aroma",
    moisturePct: 14.2,
    fineAromaPct: 85,
    georeferencedStatus: "Origen geolocalizado: completo",
    certificationType: "Orgánico UE",

    contributingProducers: [
      { name: "Socio #082", parcelId: "PAR-508-UCHIZA", sharePct: 100, wetKg: 7800, dryKg: 3800 }
    ],

    producer: "Socio #082",
    parcelId: "PAR-508-UCHIZA",
    location: "Sector Uchiza, San Martín",
    coordinates: { lat: -8.4521, lng: -76.4211 },
    manager: "Jefe de Planta",
    fermentationBox: "Cajón Rectangular de Tornillo",
    fermentationHours: 114,
    fermentationStatus: "ALERTA: Excede rango óptimo (90-108h)",
    dryingDays: 0,
    photoEvidenceUrl: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=600&q=80",
    qrCodeId: "QR-CAC-2026-015-VALLEVERDE",
    lastUpdated: "01/09/2026 16:10",

    massBalance: {
      wetInputKg: 7800,
      moistureLossKg: 4000,
      dryOutputKg: 3800,
      inProcessSaldoKg: 0,
      yieldPct: 48.7,
      toleranceStatus: "EN_PROCESO",
      toleranceMessage: "Salida estimada en proceso de fermentación"
    }
  }
];

// Ofertas Unificadas (Puntos 1, 2, 3, 10 Corregidos)
export const INITIAL_OFFERS = [
  {
    id: "off-882",
    buyerCompany: "Nordic Cocoa Import AB",
    buyerContact: "Henrik Lindqvist",
    country: "Suecia / UE",
    coopId: "coop-valle-verde",
    cooperativeName: "Cooperativa Valle Verde",
    volumeTons: 20,            // Pedido: 20 t
    availableTodayTons: 4.0,   // Disponible hoy (ATP): 4 t
    probableDateTons: 12.0,    // Probable para la fecha (CTP): 12 t
    totalBackedTons: 16.0,     // Cobertura total condicionada: 16 t
    unbackedGapTons: 4.0,      // Brecha: 4 t
    coveragePct: 80,           // 16 / 20 = 80% (NUNCA 100% ni 96%)
    firstViableDate: "24/10/2026",
    requestedDeliveryDate: "15/10/2026",
    pricePerKgUsd: 8.50,
    offeredPriceUsdKg: 8.50,
    totalValueUsd: 170000,
    incoterm: "FOB Callao",
    variety: "CCN-51 Orgánico",
    status: "ENVIADA",
    coverageStatus: "PROPUESTA_PARCIAL_80", // Se requiere contraoferta o nueva fecha
    isJointCoverage: false,
    history: [
      { date: "01/09/2026 11:20", text: "Oferta recibida desde Estocolmo por US$ 8.50/kg para 20 t." }
    ]
  },
  {
    id: "off-904",
    buyerCompany: "Chocolaterie Artisanale Paris",
    buyerContact: "Claire Dubois",
    country: "Francia / UE",
    coopId: "coop-valle-verde",
    cooperativeName: "Cooperativa Valle Verde",
    volumeTons: 50,
    availableTodayTons: 10.0,
    probableDateTons: 40.0,
    totalBackedTons: 50.0,
    unbackedGapTons: 0,
    coveragePct: 100,
    firstViableDate: "20/10/2026",
    requestedDeliveryDate: "20/10/2026",
    pricePerKgUsd: 8.65,
    offeredPriceUsdKg: 8.65,
    totalValueUsd: 432500,
    incoterm: "FOB Callao",
    variety: "Cacao Fino Orgánico",
    status: "CONTRAOFERTADA",
    coverageStatus: "PROPUESTA_COBERTURA_CONJUNTA", // (Punto 10: Permanente como propuesta hasta confirmar)
    isJointCoverage: true,
    jointDetails: [
      { coopName: "Cooperativa Valle Verde", volume: 25, region: "San Martín", confirmed: true },
      { coopName: "Cooperativa Bosque Andino", volume: 25, region: "Cusco", confirmed: false }
    ],
    history: [
      { date: "30/08/2026 09:00", text: "Solicitud inicial de 50 t a Valle Verde." },
      { date: "30/08/2026 10:15", text: "Propuesta de Cobertura Conjunta enviada a Bosque Andino (Pendiente de confirmación final)." }
    ]
  }
];

// Precios de Mercado - Referencia Comercial Simulada (Punto 6 & 11 Corregidos)
export const ICE_NY_COCOA_MARKET = {
  currentPriceUsdKg: 8.42,
  priceUnit: "USD / kg",
  pricePerTonUsd: 8420,
  exchangeRatePenUsd: 3.75,
  sourceLabel: "Referencia comercial simulada — ICE Futures NY",
  dataFreshnessTag: "Dato simulado para demostración", // (Punto 6 Corregido)
  lastUpdate: "03/09/2026 14:00 PET",
  pricingBreakdown: {
    baseNyUsdKg: 8.42,
    organicPremiumUsdKg: +0.50,
    fairtradePremiumUsdKg: +0.20,
    processingCostUsdKg: -0.35,
    logisticsCostUsdKg: -0.25,
    netCoopMarginUsdKg: 8.52
  }
};

// Datos SENAMHI - Simulación con Términos Meteorológicos Correctos (Punto 9 Corregido)
export const SENAMHI_WEATHER_DATA = {
  station: "Estación Tocache - San Martín (SENAMHI)",
  dataFreshnessTag: "Carga manual basada en informe histórico SENAMHI",
  lastReportDate: "03/09/2026 12:00 PET",
  accumulatedRain72hMm: 68,
  expectedAvgMm: 18,
  rainRatioVsAvg: 3.7,
  anomalyType: "Anomalía de Precipitación (Precipitación acumulada 3.7× por encima del promedio estacional)", // (Punto 9 Corregido)
  riskLevel: "Medio",
  temperatureAvgC: 28.4,
  humidityPct: 89,
  forecast3Days: [
    { day: "Hoy", status: "Precipitaciones Elevadas", rainProbabilityPct: 85, tempMax: 29 },
    { day: "Mañana", status: "Chubascos Dispersos", rainProbabilityPct: 60, tempMax: 31 },
    { day: "Sábado", status: "Parcialmente Nublado", rainProbabilityPct: 30, tempMax: 32 }
  ],
  riskFactorAssociated: "Precipitaciones elevadas en Sector Uchiza coincidentes con el retraso del secado solar en marquesina." // (Punto 9 Corregido)
};

// Alertas Operativas
export const EARLY_WARNING_ALERTS = [
  {
    id: "alt-01",
    level: "ATENCION",
    type: "DESVIACION_CLIMA",
    title: "Precipitaciones Elevadas en Sector Uchiza",
    message: "68 mm de lluvia en 72h retrasan el secado solar e incrementan el riesgo logístico de ruta.",
    zone: "Sector Uchiza",
    actionLabel: "Ver Alerta Climática & Reprogramar",
    targetRoute: "senamhi-weather"
  },
  {
    id: "alt-02",
    level: "ATENCION",
    type: "CALIDAD_FERMENTACION",
    title: "Lote CAC-2026-015 en Fermentación (114h)",
    message: "Supera el tiempo sugerido de 108h en Planta Uchiza.",
    zone: "Planta Uchiza",
    actionLabel: "Registrar Acción Correctiva",
    targetRoute: "lots-management"
  }
];

// Curva de Acopio Campaña 2026
export const COMMITMENT_CURVE_DATA = [
  { week: "Semana 1", proyectado: 2.0, real: 2.1, minRange: 1.8, maxRange: 2.3, status: "Dato registrado" },
  { week: "Semana 2", proyectado: 5.5, real: 5.6, minRange: 4.8, maxRange: 6.0, status: "Dato registrado" },
  { week: "Semana 3", proyectado: 9.8, real: 9.7, minRange: 8.8, maxRange: 10.5, status: "Dato registrado" },
  { week: "Semana 4", proyectado: 14.5, real: 13.8, minRange: 13.0, maxRange: 15.5, status: "Dato registrado" },
  { week: "Semana 5 (Actual)", proyectado: 22.0, real: 17.1, minRange: 19.5, maxRange: 24.5, status: "Proyección condicionada (-4.9t lluvia)" },
  { week: "Semana 6 (Est.)", proyectado: 25.5, real: null, minRange: 22.5, maxRange: 27.5, status: "Proyección condicionada" },
  { week: "Semana 7 (Embarque)", proyectado: 27.0, real: null, minRange: 24.0, maxRange: 29.0, status: "Meta Embarque 24/10" }
];
