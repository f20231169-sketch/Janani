import React, { useState } from 'react';
import {
  X,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface VideoConsultModalProps {
  onClose: () => void;
}

export const VideoConsultModal: React.FC<VideoConsultModalProps> = ({ onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [consultNotes, setConsultNotes] = useState(
    'Fetal growth corresponding well to 16-week parameters. Placenta fundal anterior. Blood pressure optimal at 118/74 mmHg. Continue daily Methylfolate and Iron stack with fresh citrus. Maintain left lateral sleep posture.'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#1C1A1F] text-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="px-5 py-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8E6CF] animate-ping" />
            <span className="text-xs font-bold tracking-wide uppercase text-[#A8E6CF]">
              Live Teleconsultation • Dr. Radhika Sharma
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Area */}
        <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto">
          {/* Main Doctor Video Area */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 aspect-video md:aspect-auto min-h-[260px] flex items-center justify-center border border-white/10">
            <div className="text-center p-4">
              <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-[#FF8C94] flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="material-symbols-outlined text-[42px] text-[#FF8C94]">
                  health_and_safety
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">Dr. Radhika Sharma (MD, DGO)</h4>
              <p className="text-[11px] text-white/60 mt-0.5">Apollo Cradle Speciality Maternity</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8E6CF]/20 text-[#A8E6CF] text-[10px] font-bold mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />
                <span>Connected • Audio High Quality</span>
              </div>
            </div>

            {/* Patient Self-View in corner */}
            <div className="absolute bottom-3 right-3 w-28 h-20 rounded-xl bg-black/80 border border-white/20 overflow-hidden flex items-center justify-center shadow-md">
              {isVideoOff ? (
                <span className="text-[9px] text-white/50">Camera Off</span>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src="/assets/ananya_avatar.jpg"
                    alt="Ananya Self View"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[8px] bg-black/60 px-1 rounded text-white">
                    Ananya
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Clinical Consult Notes Side Panel */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
                <FileText className="w-4 h-4 text-[#FF8C94]" />
                <h5 className="text-xs font-bold text-white">Consult Notes & Plan</h5>
              </div>

              <div className="mt-3 space-y-2 text-xs text-white/80 leading-relaxed">
                <p>{consultNotes}</p>
                <div className="p-2.5 rounded-xl bg-[#A8E6CF]/10 border border-[#A8E6CF]/20 text-[11px] text-[#A8E6CF]">
                  <strong>Next milestone:</strong> Level II Targeted Imaging for Fetal Anomalies (TIFFA scan) at Week 19.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => alert('Consult summary PDF generated and archived in Clinical Vault!')}
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Consult Summary</span>
              </button>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-colors ${
              isMuted ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-full transition-colors ${
              isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isVideoOff ? 'Turn camera on' : 'Turn camera off'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-3 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Consult</span>
          </button>
        </div>
      </div>
    </div>
  );
};
