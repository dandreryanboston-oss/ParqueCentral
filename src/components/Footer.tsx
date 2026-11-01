import React from 'react';
import { MapPin, Phone, Mail, Clock, RefreshCw, Server, Shield } from 'lucide-react';
import { dbStore } from '../data/dbStore';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openSqlDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openSqlDrawer }) => {
  const handleResetData = () => {
    if (window.confirm('¿Desea restaurar los datos de prueba iniciales del examen? Se restablecerán empleados, clientes, pedidos y productos.')) {
      dbStore.resetToFactory();
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Info Empresa */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                PC
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Parque Central Tech</span>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Empresa líder en venta e instalación de tecnología, ordenadores, discos duros, impresoras y sistemas de videovigilancia inteligente en la ciudad de Barranquilla.
            </p>
            <div className="text-xs text-slate-500">
              <span>NIT: 900.584.210-4</span>
              <span className="mx-2">·</span>
              <span>Régimen Común</span>
            </div>
          </div>

          {/* Column 2: Páginas requeridas en ASP.NET */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Páginas del Sistema (ASP.NET)
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors"
                >
                  DEFAULT.ASPX (Inicio y Vitrina)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('alarmas')}
                  className="hover:text-white transition-colors"
                >
                  ALARMAS.ASPX (Sistemas de Alarmas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('svc')}
                  className="hover:text-white transition-colors"
                >
                  SVC.ASPX (Vigilancia y Control 64 CH)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('imei')}
                  className="hover:text-white transition-colors"
                >
                  IMEI.ASPX (Mantenimiento Cómputo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('aspnet')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Descargar Solución Visual Studio (.zip)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Ubicación Parque Central Barranquilla */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Sede Barranquilla
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Centro Comercial Parque Central, Calle 50 # 43-28, Local 14B, Barranquilla, Atlántico</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>(605) 385-2244 · WhatsApp: 301-458-9921</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contacto@parquecentraltech.com.co</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Lunes a Sábado: 8:00 AM - 6:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Examen Parcial & Base de Datos */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Parcial Electiva ASP.NET
            </h4>
            <div className="bg-slate-800/80 rounded-lg p-3 text-xs text-slate-300 border border-slate-700/60 mb-4">
              <div className="font-semibold text-white mb-1">Universidad Autónoma del Caribe</div>
              <div className="text-slate-400">Facultad de Ingeniería de Sistemas</div>
              <div className="text-slate-400">Electiva IV Semestre · Octubre 24, 2026</div>
              <div className="text-amber-400 mt-2 font-mono text-[11px]">Servidor: Localhost Visual Studio 202X</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={openSqlDrawer}
                className="flex-1 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ver Consultas SQL</span>
              </button>
              <button
                onClick={handleResetData}
                title="Reiniciar datos a valores iniciales del parcial"
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded border border-slate-700"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Parque Central Tech & Vigilancia S.A.S. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>CRUD WebForms</span>
            <span>·</span>
            <span>SQL Server 2022</span>
            <span>·</span>
            <span>Facturación Electrónica DIAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
