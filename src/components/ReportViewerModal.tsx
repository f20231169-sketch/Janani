import React from 'react';
import { ClinicalRecord } from '../types';
import { X, Download, FileText, CheckCircle2, Hospital } from 'lucide-react';

interface ReportViewerModalProps {
  record: ClinicalRecord;
  onClose: () => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({ record, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#7D6F72]/10 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-[#FFF9F6] border-b border-[#7D6F72]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8C94]">
                Diagnostic Lab Record
              </span>
              <h3 className="text-base font-bold text-[#2D2426] leading-tight">
                {record.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7D6F72] hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Report Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#2D2426]">
          {/* Metadata banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10 text-[11px]">
            <div>
              <span className="text-[#7D6F72] block">Patient</span>
              <span className="font-bold">Ananya Sharma (28y)</span>
            </div>
            <div>
              <span className="text-[#7D6F72] block">Date</span>
              <span className="font-bold">{record.date}</span>
            </div>
            <div>
              <span className="text-[#7D6F72] block">Attending</span>
              <span className="font-bold">{record.doctor}</span>
            </div>
            <div>
              <span className="text-[#7D6F72] block">Facility</span>
              <span className="font-bold">{record.hospital}</span>
            </div>
          </div>

          {/* Clinical Interpretation Summary */}
          <div className="p-4 rounded-2xl bg-[#F8F4FE] border border-[#E2D4F9]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#54436B] block mb-1">
              Clinical Interpretation
            </span>
            <p className="text-xs leading-relaxed text-[#2D2426]">{record.summary}</p>
          </div>

          {/* Test Parameters Table */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7D6F72] block mb-2">
              Analyzed Biomarkers
            </span>
            <div className="border border-[#7D6F72]/10 rounded-2xl overflow-hidden divide-y divide-[#7D6F72]/10">
              <div className="bg-[#FFF9F6] px-4 py-2 text-[11px] font-bold text-[#7D6F72] grid grid-cols-12">
                <span className="col-span-5">Parameter</span>
                <span className="col-span-3">Observed Value</span>
                <span className="col-span-4">Biological Reference</span>
              </div>
              {record.parameters.map((p, idx) => (
                <div key={idx} className="px-4 py-2.5 grid grid-cols-12 items-center text-xs">
                  <span className="col-span-5 font-semibold text-[#2D2426]">{p.name}</span>
                  <span className="col-span-3 font-mono font-bold text-[#2E7D5E] tabular-nums">
                    {p.value}
                  </span>
                  <span className="col-span-4 text-[#7D6F72] text-[11px]">{p.reference}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FFF9F6] border-t border-[#7D6F72]/10 flex items-center justify-between">
          <span className="text-[11px] text-[#7D6F72]">
            Signed off by Head of Pathology & Maternal Fetal Medicine
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#7D6F72] hover:bg-white"
            >
              Close
            </button>
            <button
              onClick={() => alert(`Downloading verified document (${record.fileSize})...`)}
              className="px-4 py-2 rounded-full bg-[#FF8C94] text-white text-xs font-bold shadow-maternal-primary hover:bg-[#FF737D] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
