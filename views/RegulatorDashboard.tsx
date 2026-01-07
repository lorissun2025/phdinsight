
import React from 'react';
import { StatCard } from '../components/DashboardCards';

const mockShortages = [
  { id: '1', drug: 'Amoxicillin Oral Suspension', mfg: 'HealthPlus Ltd', status: 'Critical', region: 'North East', days: 3 },
  { id: '2', drug: 'Epinephrine Auto-Injector', mfg: 'MedCore Inc', status: 'Warning', region: 'South West', days: 12 },
  { id: '3', drug: 'Insulin Glargine', mfg: 'NovoDose', status: 'Stable', region: 'Central', days: 45 },
  { id: '4', drug: 'Salbutamol Inhaler', mfg: 'AstraVeda', status: 'Critical', region: 'Coastal', days: 5 },
];

const RegulatorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="National Drug Shortages" 
          value="42 Items" 
          trend={15} 
          subtitle="Increase from last month"
          icon={<svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Compliance Score" 
          value="94.2%" 
          trend={0.5} 
          subtitle="Aggregate Industry Health"
          icon={<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Price Volatility" 
          value="Low" 
          subtitle="Essential Drug Index"
          icon={<svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <StatCard 
          title="New Drug Approvals" 
          value="18" 
          subtitle="Pending NMPA review"
          icon={<svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">National Shortage Watchlist</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Export Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Drug Name</th>
                <th className="px-6 py-4">Manufacturer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Impact Region</th>
                <th className="px-6 py-4 text-right">Supply Days Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockShortages.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.drug}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{item.mfg}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'Critical' ? 'bg-red-100 text-red-600' : 
                      item.status === 'Warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{item.region}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold ${item.days < 7 ? 'text-red-600' : 'text-slate-900'}`}>{item.days} Days</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2">Emergency Supply Strategy</h3>
          <p className="text-sm text-indigo-700 mb-4">
            AI has detected a critical shortage pattern in the North East region. Recommendation: Re-route 15% of surplus insulin stock from Central logistics hub.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            Initiate Transfer
          </button>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl text-white">
          <h3 className="font-bold mb-2 text-indigo-300">Market Surveillance Alert</h3>
          <p className="text-sm text-slate-300 mb-4">
            Anomalous price hiking detected for "Category A" antibiotics across 3 provinces. Investigation triggered for 5 distributors.
          </p>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 hover:bg-slate-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegulatorDashboard;
