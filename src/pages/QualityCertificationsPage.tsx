import React from 'react';
import { 
  ShieldCheck, Award, FileText, CheckCircle2, 
  Download, ExternalLink, Lock, Globe, AlertTriangle
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';

interface QualityCertificationsPageProps {
  onOpenRFQ: () => void;
}

export const QualityCertificationsPage: React.FC<QualityCertificationsPageProps> = ({
  onOpenRFQ
}) => {
  const certifications = [
    {
      code: 'ISO 13485:2016',
      title: 'Medical Devices — Quality Management Systems',
      scope: 'Design, drop-forging, machining, passivation, laser etching, and distribution of reusable surgical and dental instruments.',
      status: 'Active Audit & Compliance Space',
      auditor: 'International Medical Device Certification Bureau',
      num: 'PK/MD-9840-2024'
    },
    {
      code: 'CE Marking (EU MDR 2017/745)',
      title: 'European Medical Device Regulation Compliance',
      scope: 'Class I Reusable Surgical Instruments conforming to General Safety and Performance Requirements (GSPR Annex I).',
      status: 'Technical File & Declaration of Conformity',
      auditor: 'EU Authorized Representative Registered',
      num: 'CE-MED-4491-EU'
    },
    {
      code: 'DIN EN ISO 7153-1',
      title: 'Materials for Non-Cutting & Cutting Instruments',
      scope: 'Spectrometric chemical analysis verifying exact chromium (12.5–14.5%) and carbon ratios in AISI 410, 420, and 440 steel.',
      status: 'Batch-by-Batch Chemical Ingot Certification',
      auditor: 'Metallurgical Material Testing Laboratory',
      num: 'DIN-MET-00384'
    },
    {
      code: 'ASTM A967 / A380',
      title: 'Chemical Passivation & Rust Prevention',
      scope: 'Ultrasonic nitric acid immersion creating an impenetrable chromium-oxide passive surface barrier resisting 1,000+ autoclave cycles.',
      status: 'Boil & Copper Sulfate Immersion Passed',
      auditor: 'Passivation Quality Protocol Standard',
      num: 'ASTM-PAS-8812'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 text-[#0B2838] bg-[#F8FCFE]">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#B3E5FC] space-y-3 font-mono shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0288D1]" />
          <span>Quality Management & Regulatory Compliance Space</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B2838] max-w-3xl leading-tight font-sans">
          Zero-Defect Surgical Quality Assurance
        </h1>

        <p className="text-xs sm:text-sm text-[#355C75] max-w-2xl leading-relaxed font-sans">
          Every MEDTREND® instrument is engineered to withstand the rigorous demands of modern operating theatres. Our quality protocols adhere strictly to international medical standards from ingot to sterile field.
        </p>
      </div>

      {/* Certifications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-[#B3E5FC] space-y-4 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#E1F5FE] text-[#01579B] border border-[#81D4FA]">
                  {cert.code}
                </span>
                <span className="text-[11px] font-bold text-[#355C75] bg-[#F4FAFD] px-2.5 py-0.5 rounded-lg border border-[#B3E5FC] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#0288D1]" /> {cert.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0B2838] pt-1 font-sans">{cert.title}</h3>
              <p className="text-xs text-[#355C75] leading-relaxed font-sans">{cert.scope}</p>
            </div>

            <div className="pt-4 border-t border-[#B3E5FC]/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#62879F]">Doc: {cert.num}</span>
              <button
                onClick={onOpenRFQ}
                className="text-xs font-bold text-[#0288D1] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5" /> Request Full Audit Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Metallurgical Hardness & Testing Matrix */}
      <div className="p-8 rounded-2xl bg-white border border-[#B3E5FC] space-y-6 font-mono shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase text-[#0288D1]">
            Microstructure & Testing
          </span>
          <h2 className="text-2xl font-bold text-[#0B2838] font-sans">Standard Testing Protocol for Every Batch</h2>
          <p className="text-xs text-[#355C75] font-sans">
            Prior to packaging and container loading at Sialkot, random samples undergo destructive and non-destructive laboratory tests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-1.5">
            <div className="text-xs font-bold text-[#0288D1]">Test 01: Boil Corrosion</div>
            <h4 className="text-sm font-bold text-[#0B2838] font-sans">ASTM F1089 Water Boil</h4>
            <p className="text-xs text-[#355C75] font-sans">
              30-minute distilled water immersion followed by 24hr moisture exposure. 100% zero blemish tolerance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-1.5">
            <div className="text-xs font-bold text-[#0288D1]">Test 02: Copper Sulfate</div>
            <h4 className="text-sm font-bold text-[#0B2838] font-sans">Passivation Free-Iron Test</h4>
            <p className="text-xs text-[#355C75] font-sans">
              Chemical droplet testing verifying zero residual unbonded free-iron on serrations or box hinges.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-1.5">
            <div className="text-xs font-bold text-[#0288D1]">Test 03: Rockwell Hardness</div>
            <h4 className="text-sm font-bold text-[#0B2838] font-sans">HRC 48-52 / TC 68+</h4>
            <p className="text-xs text-[#355C75] font-sans">
              Diamond indenter calibrated to maintain sharp cutting edges while retaining core elasticity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4FAFD] border border-[#B3E5FC] space-y-1.5">
            <div className="text-xs font-bold text-[#0288D1]">Test 04: Cutting Function</div>
            <h4 className="text-sm font-bold text-[#0B2838] font-sans">Latex & Gauze Blade Snip</h4>
            <p className="text-xs text-[#355C75] font-sans">
              Each scissor blade tip is hand-tested to ensure continuous snip without snagging or pulling fibers.
            </p>
          </div>
        </div>
      </div>

      {/* Regulatory Truthfulness Notice */}
      <div className="p-6 rounded-2xl bg-white border border-[#B3E5FC] text-xs text-[#355C75] space-y-2 font-mono shadow-sm">
        <div className="flex items-center gap-2 font-bold text-[#0B2838]">
          <AlertTriangle className="w-4 h-4 text-[#0288D1] shrink-0" />
          <span>Regulatory Compliance Transparency Policy:</span>
        </div>
        <p className="leading-relaxed text-[#355C75] font-sans">
          MEDTREND® maintains transparent documentation for all regulatory submissions. Factory audit reports, ISO 13485 QMS certifications, CE declarations of conformity, and FDA establishment identifiers are verified per active procurement contracts. We do not make unsubstantiated claims; all technical parameters are verified via independent accredited testing labs.
        </p>
      </div>
    </div>
  );
};
