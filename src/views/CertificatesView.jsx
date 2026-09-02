import React from 'react';
import { FileCheck2, ShieldCheck, CheckCircle2, Calendar, Download, Plus, AlertTriangle } from 'lucide-react';

export default function CertificatesView({ certificates = [] }) {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#1E1512]">Gestión de Certificaciones & Auditoría</h1>
          <p className="text-xs text-gray-500">Documentos oficiales de producción orgánica, comercio justo y sanidad agraria.</p>
        </div>

        <button className="bg-[#1E1512] hover:bg-[#3D2D27] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md self-start sm:self-auto">
          + Subir Nuevo Certificado PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { name: "Orgánico UE (Europa)", entity: "Control Union", status: "Vigente", validUntil: "2026-12-15", code: "CERT-EU-99120" },
          { name: "Comercio Justo (Fairtrade)", entity: "FLOCERT", status: "Vigente", validUntil: "2027-03-30", code: "FLO-ID-3041" },
          { name: "Fitosanitario SENASA", entity: "SENASA Perú", status: "Vigente", validUntil: "2026-10-20", code: "SENASA-PE-4481" }
        ].map((c, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                {c.status}
              </span>
              <span className="font-mono text-[10px] text-gray-400 font-bold">{c.code}</span>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-[#1E1512]">{c.name}</h3>
              <span className="text-xs text-gray-500 block mt-0.5">Entidad Certificadora: {c.entity}</span>
            </div>

            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-xs flex justify-between items-center">
              <span className="text-gray-500">Vigencia hasta:</span>
              <span className="font-bold text-gray-900">{c.validUntil}</span>
            </div>

            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Ver Documento PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
