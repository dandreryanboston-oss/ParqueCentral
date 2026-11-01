import React, { useState } from 'react';
import { 
  Wrench, Cpu, Printer, HardDrive, CheckCircle2, 
  Calendar, ShieldCheck, ShoppingBag, ArrowRight, Clock 
} from 'lucide-react';
import { Producto } from '../types';

interface ImeiPageProps {
  productos: Producto[];
  onAddToCart: (producto: Producto) => void;
  setActiveTab: (tab: string) => void;
}

export const ImeiPage: React.FC<ImeiPageProps> = ({
  productos,
  onAddToCart,
  setActiveTab,
}) => {
  const hardwareProducts = productos.filter((p) => p.categoria === 'Hardware');

  const [serviceBooked, setServiceBooked] = useState(false);
  const [formData, setFormData] = useState({
    nombreContacto: '',
    telefono: '',
    tipoEquipo: 'Ordenador / PC Workstation',
    tipoFalla: 'Mantenimiento preventivo y limpieza general',
    direccion: 'Parque Central, Barranquilla',
  });

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleBookService = (e: React.FormEvent) => {
    e.preventDefault();
    setServiceBooked(true);
    setTimeout(() => {
      setServiceBooked(false);
      setFormData({
        nombreContacto: '',
        telefono: '',
        tipoEquipo: 'Ordenador / PC Workstation',
        tipoFalla: 'Mantenimiento preventivo y limpieza general',
        direccion: 'Parque Central, Barranquilla',
      });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 mb-1">
            <Wrench className="w-4 h-4" />
            <span>IMEI.ASPX · Examen Parcial No 2</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Instalación y Mantenimiento de Equipos Informáticos
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Soporte técnico certificado para ordenadores, impresoras de alta velocidad, discos duros y servidores en Parque Central Barranquilla.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('clientes')}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <span>Ir a Portal Pedidos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Hero Service Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <span className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider">
            LABORATORIO TÉCNICO IMEI · PARQUE CENTRAL
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Mantenimiento Preventivo y Correctivo en Barranquilla
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            El polvo y la humedad del Caribe colombiano exigen un protocolo riguroso de mantenimiento. En nuestro laboratorio en Parque Central realizamos diagnóstico computarizado, cambio de pasta térmica de alta conductividad, optimización de sistemas operativos Windows y rescate de información en discos dañados.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Diagnóstico en 2 Horas</span>
                <span className="text-slate-500 text-[11px]">En nuestro local de Parque Central</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Técnicos a Domicilio</span>
                <span className="text-slate-500 text-[11px]">Atención en toda Barranquilla</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative min-h-[300px] bg-slate-100">
          <img
            src="/src/assets/images/tech_hardware_pc_1792897600516.jpg"
            alt="Mantenimiento de computadores, impresoras y discos duros"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 3 Equipment Categories Mentioned in PDF */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ordenadores */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">1. Ordenadores y Servidores</h3>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li>• Ensamble personalizado de torres para centros de monitoreo CCTV 24/7.</li>
            <li>• Reemplazo de fuentes certificadas 80 Plus y memorias RAM DDR4/DDR5.</li>
            <li>• Formateo limpio con respaldos íntegros de bases de datos SQL Server.</li>
            <li>• Optimización térmica con refrigeración líquida o ventiladores silenciosos.</li>
          </ul>
        </div>

        {/* Impresoras */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Printer className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">2. Impresoras Láser y Térmicas</h3>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li>• Mantenimiento a impresoras láser multifuncionales departamentales.</li>
            <li>• Cambio de rodillos de arrastre (pickup rollers) y unidades fusoras.</li>
            <li>• Calibración de impresoras térmicas de recibos y facturación electrónica POS.</li>
            <li>• Conexión e instalación en red Ethernet y configuración de puertos TCP/IP.</li>
          </ul>
        </div>

        {/* Discos Duros */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">3. Discos Duros y Almacenamiento</h3>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li>• Discos duros especiales para CCTV (WD Purple / Seagate SkyHawk).</li>
            <li>• Actualización de discos mecánicos HDD lentos a unidades SSD NVMe ultrarrápidas.</li>
            <li>• Clonación espejo sector por sector sin pérdida de programas ni licencias.</li>
            <li>• Recuperación de archivos borrados o tablas de partición dañadas.</li>
          </ul>
        </div>
      </div>

      {/* Hardware Products Catalog */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Productos de Computación y Almacenamiento
            </h2>
            <p className="text-xs text-slate-500">
              Equipos disponibles para entrega inmediata en Parque Central Barranquilla
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {hardwareProducts.length} Equipos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hardwareProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="aspect-16/10 bg-slate-100 relative">
                <img
                  src={prod.imagenUrl}
                  alt={prod.nombre}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {prod.codigo}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    {prod.subcategoria}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{prod.nombre}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                    {prod.descripcion}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="text-base font-bold font-mono text-slate-950 tabular-nums">
                    {formatCOP(prod.precio)}
                  </div>
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form for IMEI Technical Service */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800">
        <div className="max-w-2xl">
          <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block mb-1">
            AGENDAMIENTO DE SERVICIO TÉCNICO
          </span>
          <h3 className="text-2xl font-bold tracking-tight">
            Solicite Visita de Mantenimiento Informático
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Un técnico especializado de Parque Central se desplazará a su negocio u oficina en Barranquilla.
          </p>

          {serviceBooked ? (
            <div className="mt-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold block">¡Solicitud de Servicio Registrada!</span>
                <span>
                  El Técnico Senior Carlos Mario Mendoza se pondrá en contacto al número indicado para confirmar la visita.
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookService} className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Nombre o Empresa:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Distribuciones del Caribe"
                    value={formData.nombreContacto}
                    onChange={(e) => setFormData({ ...formData, nombreContacto: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Teléfono / Celular:</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 300-123-4567"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Tipo de Equipo:</label>
                  <select
                    value={formData.tipoEquipo}
                    onChange={(e) => setFormData({ ...formData, tipoEquipo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
                  >
                    <option>Ordenador / PC Workstation</option>
                    <option>Impresora Láser / Térmica</option>
                    <option>Disco Duro / Servidor NVR</option>
                    <option>Red Cableada / Switch PoE</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Dirección en Barranquilla:</label>
                  <input
                    type="text"
                    required
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Descripción del Requerimiento:</label>
                <textarea
                  rows={2}
                  value={formData.tipoFalla}
                  onChange={(e) => setFormData({ ...formData, tipoFalla: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Mantenimiento Técnico</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
