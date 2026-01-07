
import React from 'react';
import { UserPersona } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePersona: UserPersona;
  onPersonaChange: (p: UserPersona) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePersona, onPersonaChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-indigo-900 text-white shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-lg">
            <svg className="w-8 h-8 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.283a2 2 0 01-1.186.127l-2.903-.581a2 2 0 00-1.219.082l-1.27.47c-.756.28-1.512-.343-1.421-1.14l.13-1.14a2 2 0 01.328-1.01l1.1-1.652a2 2 0 011.664-.89h1.037a2 2 0 011.664.89l1.1 1.652a2 2 0 01.328 1.01l.13 1.14c.09.797-.665 1.42-1.42 1.14l-1.27-.47a2 2 0 00-1.219-.082l-2.903.581a2 2 0 01-1.186-.127l-.628-.283a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.2 1.2a2 2 0 00-.586 1.414v2.5a2 2 0 002 2h16a2 2 0 002-2v-2.5a2 2 0 00-.586-1.414l-1.2-1.2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">PharmaPulse <span className="text-indigo-300">AI</span></h1>
        </div>

        <div className="flex bg-indigo-800/50 rounded-full p-1 border border-indigo-700">
          <button 
            onClick={() => onPersonaChange(UserPersona.PHARMA_COMPANY)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activePersona === UserPersona.PHARMA_COMPANY ? 'bg-white text-indigo-900 shadow' : 'text-indigo-200 hover:text-white'}`}
          >
            Pharmaceutical
          </button>
          <button 
            onClick={() => onPersonaChange(UserPersona.HEALTHCARE_INSTITUTION)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activePersona === UserPersona.HEALTHCARE_INSTITUTION ? 'bg-white text-indigo-900 shadow' : 'text-indigo-200 hover:text-white'}`}
          >
            Institution
          </button>
          <button 
            onClick={() => onPersonaChange(UserPersona.GOVERNMENT_REGULATOR)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activePersona === UserPersona.GOVERNMENT_REGULATOR ? 'bg-white text-indigo-900 shadow' : 'text-indigo-200 hover:text-white'}`}
          >
            Regulator
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm text-indigo-100">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span> Live Data: National</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-4 px-6 text-center text-sm text-slate-500">
        &copy; 2024 PharmaPulse AI. All data is sourced from authorized national health databases.
      </footer>
    </div>
  );
};

export default Layout;
