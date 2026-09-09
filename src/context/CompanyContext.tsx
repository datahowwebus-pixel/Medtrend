import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CompanyInfo {
  companyName: string;
  shortName: string;
  brandTagline: string;
  primaryPhone: string;
  tollFreePhone: string;
  whatsappNumber: string;
  primaryEmail: string;
  rfqEmail: string;
  hqAddress: string;
  internationalOffice: string;
  workingHours: string;
  isoCertification: string;
  ceRegistration: string;
  fdaDuns: string;
  catalogYear: string;
}

export const defaultCompanyInfo: CompanyInfo = {
  companyName: 'MEDTREND® Surgical Technologies',
  shortName: 'MEDTREND®',
  brandTagline: 'Precision Titanium & German-Grade Surgical Instruments',
  primaryPhone: '+92 (52) 429-1800',
  tollFreePhone: '+1 (800) 555-0199',
  whatsappNumber: '+92 300 1234567',
  primaryEmail: 'info@medtrendsurgical.com',
  rfqEmail: 'rfq@medtrendsurgical.com',
  hqAddress: 'Sialkot Industrial Estate, Sialkot 51310, Punjab, Pakistan',
  internationalOffice: 'GerMed Hub: 12000 Aerospace Ave, Houston, TX 77034, USA',
  workingHours: 'Mon – Sat: 8:00 AM – 6:30 PM (GMT+5)',
  isoCertification: 'ISO 13485:2016 Certified QMS',
  ceRegistration: 'CE Class I & IIa Compliant (MDR 2017/745)',
  fdaDuns: 'FDA Device Listing & DUNS Registered',
  catalogYear: '2026 Master Edition',
};

interface CompanyContextType {
  company: CompanyInfo;
  updateCompany: (newInfo: Partial<CompanyInfo>) => void;
  resetCompany: () => void;
  isDevModalOpen: boolean;
  setIsDevModalOpen: (open: boolean) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const STORAGE_KEY = 'medtrend_company_settings_v1';

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [company, setCompany] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultCompanyInfo, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return defaultCompanyInfo;
  });

  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const updateCompany = (newInfo: Partial<CompanyInfo>) => {
    setCompany((prev) => {
      const updated = { ...prev, ...newInfo };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetCompany = () => {
    setCompany(defaultCompanyInfo);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        updateCompany,
        resetCompany,
        isDevModalOpen,
        setIsDevModalOpen,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
