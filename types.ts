
export enum UserPersona {
  PHARMA_COMPANY = 'PHARMA_COMPANY',
  HEALTHCARE_INSTITUTION = 'HEALTHCARE_INSTITUTION',
  GOVERNMENT_REGULATOR = 'GOVERNMENT_REGULATOR'
}

export interface SalesData {
  month: string;
  revenue: number;
  volume: number;
  growth: number;
}

export interface CompetitorData {
  name: string;
  share: number;
  growth: number;
  category: string;
}

export interface DrugShortage {
  id: string;
  drugName: string;
  manufacturer: string;
  status: 'Critical' | 'Warning' | 'Stable';
  region: string;
  daysToStockOut: number;
}

export interface MarketInsight {
  title: string;
  content: string;
  confidence: number;
  impact: 'High' | 'Medium' | 'Low';
}

export interface AppState {
  persona: UserPersona;
  loading: boolean;
  insights: MarketInsight[];
}
