import React from 'react';
import { X, Bell, Droplets, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

interface NotificationsDrawerProps {
  onClose: () => void;
  onSelectAction: (tab: 'home' | 'routine' | 'ai' | 'consults' | 'rewards') => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  onClose,
  onSelectAction,
}) => {
  const alerts = [
    {
      id: 'a-1',
      type: 'hydration',
      icon: Droplets,
      color: 'text-[#2E7D5E] bg-[#E2F8EE]',
      title: 'Hydration Anchor',
      time: '15m ago',
      desc: '750ml remaining to fulfill your 3.0L amniotic fluid reservoir goal.',
      actionTab: 'routine' as const,
      actionText: 'Log Water',
    },
    {
      id: 'a-2',
      type: 'consult',
      icon: Calendar,
      color: 'text-[#FF8C94] bg-[#FFE5E8]',
      title: 'Ob-Gyn Teleconsult Today',
      time: '1h ago',
      desc: 'Dr. Radhika Sharma (MD, DGO) review at 4:30 PM. Diagnostic files ready.',
      actionTab: 'consults' as const,
      actionText: 'View Teleconsult',
    },
    {
      id: 'a-3',
      type: 'milestone',
      icon: Sparkles,
      color: 'text-[#54436B] bg-[#F8F4FE]',
      title: 'Week 16 Avocado Milestone',
      time: 'Yesterday',
      desc: 'Baby is 11.6cm long! Tiny facial muscles and hearing are developing.',
      actionTab: 'home' as const,
      actionText: 'Explore Milestone',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-t-[32px] w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl border-t border-[#7D6F72]/15 animate-in slide-in-from-bottom duration-200">
        {/* Pull handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 bg-[#7D6F72]/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-[#7D6F72]/10">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#FF8C94]" />
            <h3 className="text-sm font-bold text-[#2D2426]">Maternal Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7D6F72] hover:bg-[#FFF9F6]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto divide-y divide-[#7D6F72]/10">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.id} className="py-3.5 first:pt-1 last:pb-1">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${alert.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#2D2426]">{alert.title}</h4>
                      <span className="text-[10px] text-[#7D6F72]">{alert.time}</span>
                    </div>
                    <p className="text-[11px] text-[#7D6F72] mt-0.5 leading-relaxed">{alert.desc}</p>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectAction(alert.actionTab);
                      }}
                      className="mt-2 text-[11px] font-bold text-[#FF8C94] hover:underline flex items-center gap-1"
                    >
                      <span>{alert.actionText}</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom dismiss */}
        <div className="p-4 bg-[#FFF9F6] border-t border-[#7D6F72]/10">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-white border border-[#7D6F72]/20 text-xs font-semibold text-[#2D2426] hover:bg-gray-50"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};
