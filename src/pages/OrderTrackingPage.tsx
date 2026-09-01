import React, { useState } from 'react';
import { 
  Search, Truck, CheckCircle2, MapPin, Calendar, 
  Package, Clock, ArrowRight, ShieldCheck, FileText, Globe 
} from 'lucide-react';

interface OrderTrackingPageProps {
  initialCode?: string;
  onOpenRFQ: () => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  initialCode = '',
  onOpenRFQ
}) => {
  const [trackingCode, setTrackingCode] = useState(initialCode || 'MT-EXP-884912');
  const [searched, setSearched] = useState(true);

  const demoTimeline = [
    {
      stage: 'Order Confirmed & Sialkot Ingot Forged',
      date: 'Aug 24, 2026 • 09:30 AM',
      location: 'Sialkot Small Industrial Estate, Pakistan',
      done: true,
      desc: 'AISI 420 DIN steel drop-forged, heat-treated to Rockwell HRC 50.'
    },
    {
      stage: 'CNC Micro-Milling & Ultrasonic Passivation',
      date: 'Aug 26, 2026 • 02:15 PM',
      location: 'MEDTREND Cleanroom Facility, Sialkot',
      done: true,
      desc: 'ASTM A967 nitric acid bath completed with zero free-iron certification.'
    },
    {
      stage: 'Export Customs Cleared & Handed to DHL Express',
      date: 'Aug 28, 2026 • 11:00 AM',
      location: 'Sialkot International Airport (SKT)',
      done: true,
      desc: 'Air waybill dispatched with EUR-1 & Certificate of Conformity.'
    },
    {
      stage: 'International Transit Flight',
      date: 'Aug 29, 2026 • 06:40 PM',
      location: 'Frankfurt / Dubai Logistics Hub',
      done: true,
      desc: 'En route to destination country port of entry.'
    },
    {
      stage: 'Out for Local Hospital Delivery',
      date: 'Estimated Aug 31, 2026',
      location: 'Destination Regional Courier Depot',
      done: false,
      desc: 'Scheduled for direct delivery with recipient clinical signature.'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24 text-[#0B2838] bg-[#F8FCFE] font-mono">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#B3E5FC] space-y-4 font-mono shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
          <Truck className="w-3.5 h-3.5 text-[#0288D1]" />
          <span>Worldwide Clinical Cargo Tracking</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B2838] max-w-3xl leading-tight font-sans">
          Track Your Surgical Shipment
        </h1>

        <p className="text-xs sm:text-sm text-[#355C75] max-w-2xl leading-relaxed font-sans">
          Enter your MEDTREND® order tracking number or DHL air waybill code to check real-time factory dispatch, metallurgical passivation clearance, and flight milestones.
        </p>

        {/* Search input */}
        <form onSubmit={handleSearch} className="max-w-xl flex gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#62879F]" />
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="e.g. MT-EXP-884912"
              className="w-full pl-10 pr-4 py-3 text-xs bg-[#F4FAFD] focus:bg-white border border-[#B3E5FC] rounded-xl text-[#0B2838] font-mono focus:outline-none focus:border-[#0288D1]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold rounded-xl text-xs transition-colors uppercase tracking-wider shadow-md shadow-[#0288D1]/25"
          >
            Track Status
          </button>
        </form>

        <div className="flex items-center gap-2 text-[11px] text-[#62879F] font-mono">
          <span>Demo Codes:</span>
          <button onClick={() => { setTrackingCode('MT-EXP-884912'); setSearched(true); }} className="text-[#0288D1] hover:underline font-bold">
            MT-EXP-884912 (Transit)
          </button>
          <span>•</span>
          <button onClick={() => { setTrackingCode('MT-EXP-440192'); setSearched(true); }} className="text-[#0288D1] hover:underline font-bold">
            MT-EXP-440192 (Cleanroom)
          </button>
        </div>
      </div>

      {/* Tracking Result */}
      {searched && (
        <div className="bg-white rounded-2xl border border-[#B3E5FC] p-6 sm:p-8 space-y-8 font-mono shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B3E5FC] pb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#62879F]">
                Shipment Identifier
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#0B2838] font-mono">
                {trackingCode.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
                <span className="w-2 h-2 rounded-full bg-[#0288D1] animate-ping" />
                In Active Air Transit (DHL Express)
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative pl-6 border-l-2 border-[#B3E5FC] ml-4">
            {demoTimeline.map((item, idx) => (
              <div key={idx} className="relative space-y-1">
                <div
                  className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    item.done
                      ? 'bg-[#0288D1] text-white font-bold shadow-xs'
                      : 'bg-[#F4FAFD] text-[#62879F] border border-[#B3E5FC]'
                  }`}
                >
                  {item.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className={`text-sm font-bold font-sans ${item.done ? 'text-[#0B2838]' : 'text-[#62879F]'}`}>
                    {item.stage}
                  </h4>
                  <span className="text-xs font-mono text-[#62879F]">{item.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#0288D1] font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                <p className="text-xs text-[#355C75] font-sans">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#355C75]">
              <ShieldCheck className="w-4 h-4 text-[#0288D1] shrink-0" />
              <span>Full ASTM passivated quality cert & manufacturer declaration included in cargo box.</span>
            </div>
            <button
              onClick={onOpenRFQ}
              className="text-[#0288D1] font-bold hover:underline shrink-0"
            >
              Need Delivery Assistance? Contact Logistics Desk →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
