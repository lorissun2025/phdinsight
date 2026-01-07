
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import { UserPersona, MarketInsight } from './types';
import PharmaDashboard from './views/PharmaDashboard';
import InstitutionDashboard from './views/InstitutionDashboard';
import RegulatorDashboard from './views/RegulatorDashboard';
import { InsightPanel } from './components/DashboardCards';
import { getMarketInsights } from './services/geminiService';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<UserPersona>(UserPersona.PHARMA_COMPANY);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInsights = useCallback(async (persona: UserPersona) => {
    setLoading(true);
    // Mocking some context data that would usually come from a real data layer
    const context = {
      timestamp: new Date().toISOString(),
      currentTrends: ["Sales UP 12%", "Shortage WARNING in North", "New Competitor Entry"],
      marketCategory: persona === UserPersona.PHARMA_COMPANY ? 'Oncology' : 'General Practice'
    };

    try {
      const result = await getMarketInsights(persona, context);
      setInsights(result);
    } catch (error) {
      console.error("Failed to load AI insights", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights(activePersona);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePersona]);

  const handlePersonaChange = (persona: UserPersona) => {
    setActivePersona(persona);
  };

  const renderDashboard = () => {
    switch (activePersona) {
      case UserPersona.PHARMA_COMPANY:
        return <PharmaDashboard />;
      case UserPersona.HEALTHCARE_INSTITUTION:
        return <InstitutionDashboard />;
      case UserPersona.GOVERNMENT_REGULATOR:
        return <RegulatorDashboard />;
      default:
        return <PharmaDashboard />;
    }
  };

  return (
    <Layout activePersona={activePersona} onPersonaChange={handlePersonaChange}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Dynamic Dashboard */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {activePersona === UserPersona.PHARMA_COMPANY && "Corporate Strategy Terminal"}
                {activePersona === UserPersona.HEALTHCARE_INSTITUTION && "Clinical Operations Center"}
                {activePersona === UserPersona.GOVERNMENT_REGULATOR && "National Regulatory Hub"}
              </h1>
              <p className="text-slate-500 text-sm mt-1">Real-time analysis of trusted national healthcare datasets.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Last updated: Just now</span>
              <button 
                onClick={() => fetchInsights(activePersona)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                title="Refresh AI Insights"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
            </div>
          </div>
          
          {renderDashboard()}
        </div>

        {/* Right Side: AI Insights Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-24">
            <InsightPanel insights={insights} loading={loading} />
            
            <div className="mt-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                Market Sentiment
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">Growth Potential</span>
                <span className="text-xs font-bold text-green-600">Strong</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[85%]"></div>
              </div>
              
              <div className="flex items-center justify-between mt-4 mb-2">
                <span className="text-xs text-slate-500">Regulatory Risk</span>
                <span className="text-xs font-bold text-yellow-600">Moderate</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full w-[45%]"></div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl text-white">
              <h4 className="font-bold text-sm mb-2">Need a Custom Report?</h4>
              <p className="text-[10px] text-indigo-100 mb-3 opacity-80">Generate deep-dive PDFs for board meetings or policy reviews using our advanced analytical engine.</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg font-bold border border-white/20 transition-colors">
                Generate AI Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
