import React, { useState, useEffect } from 'react';
import { useCompany, CompanyInfo } from '../context/CompanyContext';
import { Settings, X, Save, RotateCcw, Check, Building2, Phone, Mail, MapPin, Award, FileText } from 'lucide-react';

export const DeveloperModeModal: React.FC = () => {
  const { company, updateCompany, resetCompany, isDevModalOpen, setIsDevModalOpen } = useCompany();
  const [formData, setFormData] = useState<CompanyInfo>(company);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isDevModalOpen) {
      setFormData(company);
      setSaveSuccess(false);
    }
  }, [isDevModalOpen, company]);

  if (!isDevModalOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all company information to default values?')) {
      resetCompany();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#1ab8ec] w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-[#195aa7]">
        
        {/* Header with Duckworth & Kent / GerMedUSA style */}
        <div className="bg-gradient-to-r from-[#195aa7] via-[#144988] to-[#195aa7] text-white p-5 px-6 flex items-center justify-between border-b-4 border-[#eb5d0b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eb5d0b] flex items-center justify-center text-white shadow-md">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight uppercase font-mono">Developer / Admin Control Center</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1ab8ec] text-[#195aa7]">
                  Live Synchronizer
                </span>
              </div>
              <p className="text-xs text-[#1ab8ec] font-medium">
                Edit company name, contacts & addresses — updates live across all pages & headers instantly!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDevModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-[#eb5d0b] text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-[#1ab8ec]/15 border-2 border-[#1ab8ec] text-[#195aa7] font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
              <Check className="w-5 h-5 text-[#eb5d0b]" />
              <span>Company Information updated across entire website successfully!</span>
            </div>
          )}

          {/* Group 1: Brand & Names */}
          <div className="bg-[#f4f8fc] p-4.5 rounded-2xl border border-[#1ab8ec]/30 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#195aa7]">
              <Building2 className="w-4 h-4 text-[#eb5d0b]" />
              <span>Brand Identity & Legal Name</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company / Brand Full Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Brand Name (Navbar Logo)</label>
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Brand Tagline / Specialty Heading</label>
                <input
                  type="text"
                  name="brandTagline"
                  value={formData.brandTagline}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Group 2: Phone Numbers & WhatsApp */}
          <div className="bg-[#f4f8fc] p-4.5 rounded-2xl border border-[#1ab8ec]/30 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#195aa7]">
              <Phone className="w-4 h-4 text-[#eb5d0b]" />
              <span>Phone Numbers & Direct Desks</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary HQ Phone (Sialkot)</label>
                <input
                  type="text"
                  name="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">USA / Toll-Free Desk</label>
                <input
                  type="text"
                  name="tollFreePhone"
                  value={formData.tollFreePhone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp B2B Support</label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Group 3: Emails */}
          <div className="bg-[#f4f8fc] p-4.5 rounded-2xl border border-[#1ab8ec]/30 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#195aa7]">
              <Mail className="w-4 h-4 text-[#eb5d0b]" />
              <span>Official Emails & Inquiries</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">General Inquiries Email</label>
                <input
                  type="email"
                  name="primaryEmail"
                  value={formData.primaryEmail}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">B2B RFQ / Quotes Desk Email</label>
                <input
                  type="email"
                  name="rfqEmail"
                  value={formData.rfqEmail}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Group 4: Addresses */}
          <div className="bg-[#f4f8fc] p-4.5 rounded-2xl border border-[#1ab8ec]/30 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#195aa7]">
              <MapPin className="w-4 h-4 text-[#eb5d0b]" />
              <span>Manufacturing Facility & Regional Hubs</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Factory & Global HQ (Sialkot)</label>
                <textarea
                  rows={2}
                  name="hqAddress"
                  value={formData.hqAddress}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">USA Logistics / Importer Address</label>
                <textarea
                  rows={2}
                  name="internationalOffice"
                  value={formData.internationalOffice}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Group 5: Certifications & Catalog */}
          <div className="bg-[#f4f8fc] p-4.5 rounded-2xl border border-[#1ab8ec]/30 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#195aa7]">
              <Award className="w-4 h-4 text-[#eb5d0b]" />
              <span>Certifications & Regulatory Disclosures</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ISO Standard</label>
                <input
                  type="text"
                  name="isoCertification"
                  value={formData.isoCertification}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">CE Conformity</label>
                <input
                  type="text"
                  name="ceRegistration"
                  value={formData.ceRegistration}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Master Catalog Year</label>
                <input
                  type="text"
                  name="catalogYear"
                  value={formData.catalogYear}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#1ab8ec] focus:ring-2 focus:ring-[#1ab8ec]/20 outline-hidden font-medium text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="p-4 px-6 bg-[#f4f8fc] border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-gray-500" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDevModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-gray-700 hover:bg-gray-200 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-[#eb5d0b] hover:bg-[#d65106] text-white font-bold text-xs shadow-lg shadow-[#eb5d0b]/25 flex items-center gap-2 transition-all uppercase tracking-wider font-mono"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Everywhere</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
