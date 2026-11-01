import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Database, Menu, X, Terminal, MonitorPlay } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openSqlDrawer: () => void;
  openCctvModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openSqlDrawer,
  openCctvModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'alarmas', label: 'Alarmas (ALARMAS.aspx)' },
    { id: 'svc', label: 'Vigilancia (SVC.aspx)' },
    { id: 'imei', label: 'Mantenimiento (IMEI.aspx)' },
    { id: 'clientes', label: 'Portal Clientes & Pedidos' },
    { id: 'admin', label: 'Administración' },
    { id: 'aspnet', label: 'Código ASP.NET 202X' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-base shadow-sm">
                PC
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block leading-tight">
                  Parque Central Tech
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:block">
                  Barranquilla · ASP.NET WebForms
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'home' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('alarmas')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'alarmas' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              Alarmas
            </button>
            <button
              onClick={() => handleNavClick('svc')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'svc' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              Vigilancia SVC
            </button>
            <button
              onClick={() => handleNavClick('imei')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'imei' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              Cómputo IMEI
            </button>
            <button
              onClick={() => handleNavClick('clientes')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'clientes' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              Clientes & Pedidos
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'admin' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              Administración
            </button>
            <button
              onClick={() => handleNavClick('aspnet')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'aspnet' ? 'text-slate-900 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              ASP.NET 202X
            </button>
          </nav>

          {/* Zone 3: Actions & Primary Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live CCTV quick launch */}
            <button
              onClick={openCctvModal}
              title="Centro de Monitoreo de Vigilancia 64 Cámaras"
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <MonitorPlay className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden md:inline">Cámaras en Vivo</span>
            </button>

            {/* SQL Terminal inspector button */}
            <button
              onClick={openSqlDrawer}
              title="Ver Consultas SQL Server ejecutadas en tiempo real"
              className="px-2.5 py-1.5 text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">T-SQL</span>
            </button>

            {/* Shopping Bag / Orders CTA */}
            <button
              onClick={() => handleNavClick('clientes')}
              className="relative px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-2 shrink-0 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Mi Pedido</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                openCctvModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs text-center font-medium bg-rose-50 text-rose-700 rounded-md"
            >
              Monitoreo 64 Cámaras
            </button>
            <button
              onClick={() => {
                openSqlDrawer();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs text-center font-mono font-medium bg-slate-100 text-slate-800 rounded-md"
            >
              Visor T-SQL
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
