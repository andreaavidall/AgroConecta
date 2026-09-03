import React from 'react';
import { Award, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Calendar, ExternalLink, Info } from 'lucide-react';

export default function CertificatesView() {
  const permanentCerts = [
    { id: "cert-org-eu", name: "Certificado Orgánico UE", entity: "Control Union Peru", status: "Vigente", validUntil: "2026-12-15", scope: "Cooperativa & 189 Parcelas", category: "ORGANIZACIONAL" },
    { id: "cert-ft", name: "Comercio Justo (Fairtrade)", entity: "FLOCERT GmbH", status: "Vigente", validUntil: "2027-03-30", scope: "Cooperativa Valle Verde", category: "ORGANIZACIONAL" }
  ];

  const shipmentDocs = [
    { id: "doc-senasa-01", name: "Certificado Fitosanitario SENASA", entity: "SENASA Perú", status: "En Trámite", validUntil: "2026-10-20", scope: "Lote CAC-2026-014 / Exportación UE", category: "DESPACHO" }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-[#174C3C] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Biblioteca Documental & Auditoría</span>
          </div>
          <h1 className="text-2xl font-black">Certificaciones de Origen & Documentos SENASA</h1>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Clasifica y audita los certificados permanentes de la organización y los documentos de despacho vinculados a cada lote.
          </p>
        </div>
      </div>

      {/* Official Legal Disclaimer Banner (Sección 17) */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs text-amber-900 leading-relaxed space-y-1">
        <h4 className="font-bold text-amber-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600" />
          Aviso Oficial de Declaración Documental
        </h4>
        <p>
          AgroConecta organiza, contrasta y presenta información proporcionada por las organizaciones cacaoteras, pero <strong>no sustituye a SENASA, VUCE, SUNAT, organismos certificadores ni autoridades del país de destino</strong>.
        </p>
      </div>

      {/* Section 1: Permanent Organizational Certifications */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#237A57]" />
          1. Certificaciones Institucionales Permanentes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {permanentCerts.map((cert) => (
            <div key={cert.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">{cert.name}</h3>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  {cert.status}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Entidad Emisora:</span>
                  <span className="font-bold text-slate-800">{cert.entity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alcance Acreditado:</span>
                  <span className="font-bold text-slate-800">{cert.scope}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fecha de Vencimiento:</span>
                  <span className="font-bold text-emerald-700">{cert.validUntil}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Shipment Specific Dispatch Documents */}
      <div className="space-y-3 pt-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-600" />
          2. Documentos de Despacho & Inspección SENASA (Por Lote/Embarque)
        </h2>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 space-y-3">
          {shipmentDocs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900">{doc.name}</h4>
                <p className="text-slate-500">Vínculo: {doc.scope} — Emisor: {doc.entity}</p>
              </div>

              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200">
                {doc.status} ({doc.validUntil})
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
