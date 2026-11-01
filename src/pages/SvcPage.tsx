import React from 'react';
import { 
  Video, Eye, Shield, ZoomIn, Moon, MonitorPlay, 
  Check, ArrowRight, ShoppingBag, Radio 
} from 'lucide-react';
import { Producto } from '../types';

interface SvcPageProps {
  productos: Producto[];
  onAddToCart: (producto: Producto) => void;
  openCctvModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const SvcPage: React.FC<SvcPageProps> = ({
  productos,
  onAddToCart,
  openCctvModal,
  setActiveTab,
}) => {
  const cctvProducts = productos.filter((p) => p.categoria === 'Vigilancia');

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-600 mb-1">
            <Video className="w-4 h-4" />
            <span>SVC.ASPX · Examen Parcial No 2</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Instalación de Sistemas de Vigilancia y Control
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Soluciones avanzadas de circuito cerrado de televisión (CCTV) con visualización de hasta 64 cámaras simultáneas desde cualquier ordenador o teléfono móvil.
          </p>
        </div>

        <button
          onClick={openCctvModal}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-sm self-start md:self-auto"
        >
          <MonitorPlay className="w-4 h-4" />
          <span>Iniciar Consola de 64 Cámaras</span>
        </button>
      </div>

      {/* Hero Banner with PTZ Camera Feature */}
      <div className="bg-slate-950 text-white rounded-2xl overflow-hidden border border-slate-800 grid grid-cols-1 lg:grid-cols-12 shadow-xl">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="text-xs font-mono text-amber-400">
            INGENIERÍA EN SEGURIDAD · PARQUE CENTRAL BARRANQUILLA
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
            Cámaras Giratorias PTZ con Zoom Óptico 30X e Intensificador de Luz Nocturno
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Grabe imágenes de alta resolución en tiempo real, vigile cualquier sitio a distancia vía internet desde un ordenador o un smartphone y visualice hasta 64 cámaras conectadas en red desde una única pantalla con analítica de movimiento integrada.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800 text-xs">
            <div>
              <span className="text-white font-bold text-sm block">Zoom 30X</span>
              <span className="text-slate-400 text-[11px]">Reconocimiento facial a 150m</span>
            </div>
            <div>
              <span className="text-white font-bold text-sm block">Sony Starvis</span>
              <span className="text-slate-400 text-[11px]">Luz ultrabaja a color 24/7</span>
            </div>
            <div>
              <span className="text-white font-bold text-sm block">Multi-View</span>
              <span className="text-slate-400 text-[11px]">Hasta 64 feeds simultáneos</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={openCctvModal}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Simulación en Vivo</span>
            </button>
            <button
              onClick={() => setActiveTab('clientes')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              Solicitar Cotización CCTV
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[300px]">
          <img
            src="/src/assets/images/cctv_ptz_camera_1792897599846.jpg"
            alt="Cámara PTZ Giratoria 360"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 4 Technologies Matrix */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Tipos de Cámaras de Vigilancia Disponibles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Cámaras Fijas */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Cámaras Fijas</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modelos domo y bullet de ángulo amplio fijas para monitoreo continuo de pasillos, cajas registradoras, accesos y parqueaderos. Carcasa IP67 resistente a la brisa marina.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Lente 2.8mm / Apertura 108°
            </div>
          </div>

          {/* 2. Cámaras Giratorias PTZ */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Cámaras Giratorias PTZ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rotación 360° horizontal continua e inclinación vertical de 90°. Controlables desde el navegador o la aplicación móvil para inspeccionar vehículos y personas sospechosas.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Pan 360° / Tilt 90° / 30X Zoom
            </div>
          </div>

          {/* 3. Cámaras Digitales IP 4K */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Cámaras Digitales IP</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transmisión nativa sobre protocolo de red TCP/IP mediante cable UTP o fibra óptica con alimentación PoE (Power over Ethernet). Resoluciones desde 5MP hasta 4K UltraHD.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              H.265+ / PoE 802.3af / ONVIF
            </div>
          </div>

          {/* 4. Cámaras Analógicas HD */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Cámaras Analógicas HD</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tecnología TurboHD / HD-TVI sobre cable coaxial tradicional. Permite actualizar instalaciones antiguas sin cambiar la infraestructura de cableado con costos reducidos.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Coaxial BNC / Balun UTP
            </div>
          </div>
        </div>
      </div>

      {/* Surveillance Hardware Catalog */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Equipos de Vigilancia y Grabación Disponibles
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Mostrando {cctvProducts.length} productos ingresados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cctvProducts.map((prod) => (
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
                {prod.especificaciones.intensificadorLuz && (
                  <span className="absolute top-2 right-2 bg-indigo-900/90 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                    <Moon className="w-3 h-3" />
                    <span>Starvis Lux</span>
                  </span>
                )}
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

                  <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                    {prod.especificaciones.resolucion && (
                      <div>Resolución: <span className="font-medium text-slate-700">{prod.especificaciones.resolucion}</span></div>
                    )}
                    {prod.especificaciones.zoom && (
                      <div>Capacidad Zoom: <span className="font-medium text-slate-700">{prod.especificaciones.zoom}</span></div>
                    )}
                    {prod.especificaciones.conectividad && (
                      <div>Conexión: <span className="font-medium text-slate-700">{prod.especificaciones.conectividad}</span></div>
                    )}
                  </div>
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
    </div>
  );
};
