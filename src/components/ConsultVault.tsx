import React, { useState } from 'react';
import { ClinicalRecord, PrescriptionItem } from '../types';
import { CLINICAL_RECORDS, PRESCRIPTIONS } from '../data/mockData';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  Video,
  Plus,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Pill,
} from 'lucide-react';

interface ConsultVaultProps {
  onOpenVideoConsult: () => void;
  onSelectRecord: (record: ClinicalRecord) => void;
}

export const ConsultVault: React.FC<ConsultVaultProps> = ({
  onOpenVideoConsult,
  onSelectRecord,
}) => {
  const [records, setRecords] = useState<ClinicalRecord[]>(CLINICAL_RECORDS);
  const [prescriptions] = useState<PrescriptionItem[]>(PRESCRIPTIONS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'Blood Work' | 'Ultrasound / Scan' | 'Endocrine' | 'Screening'>('Blood Work');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newRecord: ClinicalRecord = {
      id: `rec-${Date.now()}`,
      title: uploadTitle,
      category: uploadCategory,
      date: 'Today, Sep 24, 2026',
      doctor: 'Dr. Radhika Sharma (MD, DGO)',
      hospital: 'Cloudnine Speciality Diagnostics',
      status: 'Pending Review',
      summary: 'Report uploaded by patient for Dr. Radhika Sharma review in today’s consult.',
      parameters: [
        { name: 'Patient Record Parameter', value: 'Submitted', reference: 'Evaluating', isNormal: true },
      ],
      fileSize: '1.5 MB (PDF)',
    };

    setRecords((prev) => [newRecord, ...prev]);
    setUploadTitle('');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[#7D6F72]">
              <span>Clinical Vault</span>
              <span aria-hidden="true">·</span>
              <span>Encrypted Records</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2426] mt-0.5">
              Consult Track & Records
            </h1>
            <p className="text-xs text-[#7D6F72] mt-0.5 leading-snug">
              Verified clinical reports, due date reconciliation, and doctor-approved prescriptions.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2D2426] text-white hover:bg-black active:scale-95 transition-all text-xs font-bold shadow-xs self-start sm:self-center shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Attending Ob-Gyn & Teleconsult Card */}
      <div className="bg-gradient-to-r from-white via-white to-[#FFE5E8]/30 rounded-3xl p-4 sm:p-5 border border-[#FF8C94]/30 shadow-maternal-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-[#FFE5E8] flex items-center justify-center text-[#FF8C94] shrink-0">
              <span className="material-symbols-outlined text-[26px]">health_and_safety</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#F4FBF8] text-[#2E7D5E] border border-[#A8E6CF]/40 text-[9px] font-bold uppercase tracking-wider">
                  Lead Obstetrician
                </span>
                <span className="text-[11px] text-[#7D6F72]">Reg #MMC-74921</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#2D2426] mt-0.5 leading-snug">
                Dr. Radhika Sharma
              </h2>
              <p className="text-[11px] text-[#7D6F72] leading-tight">
                MD, DGO, FRCOG (London) • Apollo Cradle
              </p>
            </div>
          </div>

          {/* Teleconsult Box */}
          <div className="bg-[#FFF9F6] p-3 sm:p-4 rounded-2xl border border-[#FF8C94]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
            <div className="min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF8C94]">
                Next Teleconsult
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-[#2D2426]">
                <Calendar className="w-3.5 h-3.5 text-[#FF8C94] shrink-0" />
                <span>Today, Sep 24 • 4:30 PM</span>
              </div>
              <span className="text-[10px] text-[#7D6F72] block truncate">16-Week Anatomy Review</span>
            </div>

            <button
              onClick={onOpenVideoConsult}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#FF8C94] text-white hover:bg-[#FF737D] shadow-maternal-primary active:scale-95 transition-all text-xs font-bold whitespace-nowrap self-stretch sm:self-auto"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Due Date Reconciliation & Milestones */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between pb-3 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D6F72]">
              Clinical Chronology
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5">
              Due Date &amp; Stage
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#2E7D5E] bg-[#E2F8EE] px-2 py-0.5 rounded-full">USG Verified</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
          <div className="p-3 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10">
            <span className="text-[9px] text-[#7D6F72] uppercase font-bold block truncate">Estimated Due Date</span>
            <p className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5">Oct 28, 2026</p>
            <span className="text-[10px] text-[#7D6F72] block truncate">168 days remaining</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10">
            <span className="text-[9px] text-[#7D6F72] uppercase font-bold block truncate">Gestational Age</span>
            <p className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5">16 Wks 0 Days</p>
            <span className="text-[10px] text-[#7D6F72] block truncate">Day 112 / 280</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10">
            <span className="text-[9px] text-[#7D6F72] uppercase font-bold block truncate">Current Stage</span>
            <p className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5">2nd Trimester</p>
            <span className="text-[10px] text-[#2E7D5E] font-medium block truncate">Growth & Vitality</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10">
            <span className="text-[9px] text-[#7D6F72] uppercase font-bold block truncate">Next Scan</span>
            <p className="text-sm sm:text-base font-bold text-[#2D2426] mt-0.5">Level II USG</p>
            <span className="text-[10px] text-[#7D6F72] block truncate">Wk 18-20</span>
          </div>
        </div>
      </div>

      {/* 4. Clinical Records Vault */}
      <div className="bg-white rounded-3xl p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D6F72]">
              Diagnostic Vault
            </span>
            <h3 className="text-base font-bold text-[#2D2426] mt-0.5">
              Verified Laboratory & Screening Reports
            </h3>
          </div>
          <span className="text-xs text-[#7D6F72]">{records.length} Documents</span>
        </div>

        <div className="divide-y divide-[#7D6F72]/10 mt-2">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFF9F6]/60 p-2 rounded-2xl transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E2D4F9]/40 flex items-center justify-center text-[#54436B] shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#2D2426]">{rec.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.status === 'Optimal' || rec.status === 'Normal'
                          ? 'bg-[#E2F8EE] text-[#2E7D5E]'
                          : 'bg-[#FFE5E8] text-[#B35860]'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-[#7D6F72]">
                    <span>{rec.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rec.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rec.hospital}</span>
                  </div>
                  <p className="text-[11px] text-[#7D6F72] mt-1 line-clamp-1">
                    {rec.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0">
                <button
                  onClick={() => onSelectRecord(rec)}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#FFF9F6] border border-[#7D6F72]/15 text-[#2D2426] hover:bg-white text-xs font-semibold shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FF8C94]" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => onSelectRecord(rec)}
                  className="p-1.5 rounded-full text-[#7D6F72] hover:text-[#2D2426] hover:bg-[#FFF9F6]"
                  title="Download report"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Active Digital Prescriptions Stack */}
      <div className="bg-white rounded-3xl p-6 border border-[#7D6F72]/10 shadow-maternal-card">
        <div className="flex items-center justify-between pb-4 border-b border-[#7D6F72]/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D6F72]">
              Rx Stack
            </span>
            <h3 className="text-base font-bold text-[#2D2426] mt-0.5">
              Active Obstetric Prescriptions
            </h3>
          </div>
          <span className="text-xs text-[#2E7D5E] font-medium">All 4 Validated</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2D2426]">{rx.medicine}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-[#7D6F72]/10 text-[#7D6F72]">
                    {rx.frequency}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#FF8C94] font-medium">
                  <Pill className="w-3 h-3" />
                  <span>{rx.dosage} • {rx.timing}</span>
                </div>
                <p className="text-[11px] text-[#7D6F72] mt-1.5 leading-relaxed">
                  {rx.purpose}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#7D6F72]/10 flex items-center justify-between text-[10px] text-[#7D6F72]">
                <span>{rx.duration}</span>
                <span className="text-[#2E7D5E] font-semibold">Authorized Rx</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Lab Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-[#7D6F72]/10">
            <h3 className="text-base font-bold text-[#2D2426]">Upload Diagnostic Document</h3>
            <p className="text-xs text-[#7D6F72] mt-0.5">
              Add pathology, ultrasound, or prescription reports to your clinical vault.
            </p>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#2D2426] mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quadruple Marker Test (Serum)"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#7D6F72]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF8C94]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2D2426] mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#7D6F72]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF8C94]/40 bg-white"
                >
                  <option value="Blood Work">Blood Work / Hematology</option>
                  <option value="Ultrasound / Scan">Ultrasound / Imaging</option>
                  <option value="Endocrine">Endocrine / Hormonal</option>
                  <option value="Screening">Genetic / Biochemical Screening</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-[#7D6F72]/20 rounded-2xl p-6 text-center bg-[#FFF9F6]">
                <FileText className="w-8 h-8 text-[#FF8C94] mx-auto mb-2" />
                <span className="text-xs font-semibold text-[#2D2426] block">
                  Select PDF or Medical Scan File
                </span>
                <span className="text-[10px] text-[#7D6F72] mt-0.5 block">
                  Encrypted & stored in HIPAA/ABDM conforming maternal vault
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-[#7D6F72] hover:bg-[#FFF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FF8C94] text-white text-xs font-bold shadow-maternal-primary hover:bg-[#FF737D]"
                >
                  Upload to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
