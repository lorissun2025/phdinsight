
import React from 'react';

export const StatCard: React.FC<{ title: string; value: string; trend?: number; subtitle: string; icon: React.ReactNode }> = ({ title, value, trend, subtitle, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
        {icon}
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    <p className="text-slate-400 text-xs mt-1">{subtitle}</p>
  </div>
);

export const InsightPanel: React.FC<{ insights: any[]; loading: boolean }> = ({ insights, loading }) => (
  <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg h-full">
    <div className="flex items-center gap-2 mb-6">
      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <h2 className="text-lg font-bold">AI Strategic Insights</h2>
    </div>
    
    {loading ? (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-indigo-800 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-indigo-800 rounded"></div>
                <div className="h-3 bg-indigo-800 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="space-y-6">
        {insights.map((insight, idx) => (
          <div key={idx} className="border-l-2 border-indigo-400 pl-4 py-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-sm">{insight.title}</h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${insight.impact === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>
                {insight.impact} Impact
              </span>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed">{insight.content}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-indigo-400">
              <span>Confidence Score:</span>
              <div className="w-20 bg-indigo-800 h-1 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full" style={{ width: `${insight.confidence * 100}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
