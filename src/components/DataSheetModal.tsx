import React from 'react';
import { Download, Printer, Shield, CheckCircle2, FileText } from 'lucide-react';
import { Product } from '../types';
import { BRAND_CONFIG } from '../data/brandData';

interface DataSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const DataSheetModal: React.FC<DataSheetModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2838]/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white text-[#0B2838] rounded-2xl shadow-2xl border border-[#B3E5FC] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with actions */}
        <div className="p-4 bg-[#F8FCFE] flex items-center justify-between border-b border-[#B3E5FC]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0288D1]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#01579B]">Technical Product Data Sheet (TDS)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-mono transition-colors font-bold shadow-md shadow-[#0288D1]/25"
            >
              <Printer className="w-3.5 h-3.5 text-[#B3E5FC]" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white hover:bg-[#E1F5FE] flex items-center justify-center text-[#62879F] hover:text-[#0B2838] border border-[#B3E5FC] font-mono text-xs transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Datasheet Document Area */}
        <div id="printable-datasheet" className="p-8 overflow-y-auto flex-1 text-[#0B2838] font-sans space-y-6 bg-white">
          {/* Document Header */}
          <div className="border-b border-[#B3E5FC] pb-6 flex items-start justify-between">
            <div>
              <div className="text-2xl font-black tracking-tight text-[#0B2838] flex items-center gap-2 font-mono">
                MEDTREND<span className="text-[#0288D1]">®</span>
              </div>
              <p className="text-xs font-bold text-[#355C75] uppercase tracking-wider font-mono">
                Surgical & Medical Instruments • Sialkot, Pakistan
              </p>
              <p className="text-[11px] text-[#62879F] font-mono mt-0.5">
                Ref Doc: TDS-MT-{product.code.replace(/[^A-Z0-9]/g, '')}-V4
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-xl bg-[#E1F5FE] border border-[#81D4FA] text-[#01579B] font-mono text-xs font-bold">
                CODE: {product.code}
              </span>
              <p className="text-[10px] text-[#62879F] font-mono mt-1">Classification: Class I Medical Device</p>
            </div>
          </div>

          {/* Product Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-xl font-bold text-[#0B2838] tracking-tight">{product.name}</h2>
              <p className="text-xs text-[#355C75] leading-relaxed">{product.fullDesc}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC]">
                  <div className="text-[9px] font-bold text-[#62879F] uppercase">Primary Category</div>
                  <div className="text-xs font-semibold text-[#0B2838]">{product.category}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FCFE] border border-[#B3E5FC]">
                  <div className="text-[9px] font-bold text-[#62879F] uppercase">Sub-Group / Folder</div>
                  <div className="text-xs font-semibold text-[#0B2838]">{product.subCategory}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#F8FCFE] border border-[#B3E5FC]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-36 h-36 object-contain"
              />
              <div className="text-[10px] font-mono text-[#62879F] mt-2">
                Standard {product.finish}
              </div>
            </div>
          </div>

          {/* Detailed Engineering Specification Table */}
          <div className="space-y-2 font-mono">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#01579B] border-b border-[#B3E5FC] pb-1">
              1. Metallurgical & Physical Specifications
            </h3>
            <div className="overflow-hidden border border-[#B3E5FC] rounded-xl bg-white">
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-[#B3E5FC]/60">
                  <tr className="bg-[#F8FCFE]">
                    <td className="p-2.5 font-bold text-[#355C75] w-1/3">Raw Material Grade</td>
                    <td className="p-2.5 font-mono text-[#0B2838]">{product.material}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-[#355C75]">Rockwell Hardness Scale</td>
                    <td className="p-2.5 font-mono text-[#0B2838]">{product.hardness}</td>
                  </tr>
                  <tr className="bg-[#F8FCFE]">
                    <td className="p-2.5 font-bold text-[#355C75]">Overall Nominal Size</td>
                    <td className="p-2.5 font-mono text-[#0B2838]">{product.size}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-[#355C75]">Tip / Jaw Geometry</td>
                    <td className="p-2.5 font-mono text-[#0B2838]">{product.tipType}</td>
                  </tr>
                  <tr className="bg-[#F8FCFE]">
                    <td className="p-2.5 font-bold text-[#355C75]">Hinge / Action Type</td>
                    <td className="p-2.5 font-mono text-[#0B2838]">{product.jawType}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-[#355C75]">Passivation Protocol</td>
                    <td className="p-2.5 text-[#355C75]">ASTM A967 Ultrasonic Nitric/Citric Acid Passivated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sterilization & Regulatory Compliance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] space-y-1.5 font-mono text-xs">
              <h4 className="text-xs font-bold text-[#0B2838] uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#0288D1]" />
                Sterilization Protocols
              </h4>
              <ul className="text-[11px] text-[#355C75] space-y-1">
                <li>• Steam Autoclave: 134°C (273°F) for 5 minutes minimum</li>
                <li>• Ethylene Oxide (EtO) compatible</li>
                <li>• pH neutral ultrasonic cleaning recommended prior to autoclave</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] space-y-1.5 font-mono text-xs">
              <h4 className="text-xs font-bold text-[#0B2838] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0288D1]" />
                Traceability & Marking
              </h4>
              <ul className="text-[11px] text-[#355C75] space-y-1">
                <li>• Fiber laser etched with MEDTREND®, SKU, and lot barcode</li>
                <li>• Packaged in {product.packagingInfo}</li>
                <li>• Manufacturing Origin: Sialkot, Pakistan (ISO 13485 Space)</li>
              </ul>
            </div>
          </div>

          {/* Document Footer */}
          <div className="pt-4 border-t border-[#B3E5FC] flex items-center justify-between text-[10px] text-[#62879F] font-mono">
            <div>MEDTREND PVT. LTD. • SIALKOT • WWW.MEDTREND.COM</div>
            <div>STRICT CONFIDENTIAL MEDICAL SPECIFICATION</div>
          </div>
        </div>
      </div>
    </div>
  );
};
