import React, { useState } from 'react';
import { 
  Shield, Video, Cpu, HardDrive, Printer, ShoppingBag, 
  Search, ArrowRight, Check, MapPin, Eye, Bell, Wrench 
} from 'lucide-react';
import { Producto, CategoriaProducto } from '../types';

interface HomePageProps {
  productos: Producto[];
  onAddToCart: (producto: Producto) => void;
  setActiveTab: (tab: string) => void;
  openCctvModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  productos,
  onAddToCart,
  setActiveTab,
  openCctvModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const filteredProducts = productos.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.categoria === selectedCategory;
    const matchesSearch =
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.codigo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAdd = (p: Producto) => {
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <MapPin className="w-4 h-4" />
              <span>Parque Central · Barranquilla, Atlántico</span>
              <span className="text-slate-600">/</span>
              <span>ASP.NET WebForms</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Tecnología de Vanguardia y Seguridad Electrónica
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Venta, instalación y mantenimiento especializado de sistemas de videovigilancia 4K, 
              cámaras fijas y PTZ giratorias con zoom e intensificador de luz, alarmas perimetrales y 
              equipos de cómputo en Parque Central, Barranquilla.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('svc')}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Video className="w-4 h-4" />
                <span>Explorar Vigilancia (SVC)</span>
              </button>
              <button
                onClick={openCctvModal}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 border border-slate-700"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Monitoreo 64 Cámaras</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
              <div>
                <span className="text-white font-bold block text-sm">64 Canales</span>
                <span>Visualización Remota</span>
              </div>
              <div className="w-px h-7 bg-slate-800" />
              <div>
                <span className="text-white font-bold block text-sm">30X Zoom</span>
                <span>Óptico Motorizado</span>
              </div>
              <div className="w-px h-7 bg-slate-800" />
              <div>
                <span className="text-white font-bold block text-sm">Localhost 202X</span>
                <span>Visual Studio & SQL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_surveillance_tech_1792897599859.jpg"
              alt="Showroom y Centro de Monitoreo Parque Central Barranquilla"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-slate-950 lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-lg border border-slate-800 text-xs">
              <span className="text-white font-semibold block">Showroom Parque Central</span>
              <span className="text-slate-400">C.C. Parque Central Local 14B · Atención personalizada</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Services Required by the PDF (ALARMAS.ASPX, SVC.ASPX, IMEI.ASPX) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
            Servicios Principales Requeridos
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Páginas de Presentación Especializadas
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Desarrollo e implementación según requerimientos de la Electiva ASP.NET
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: ALARMAS.ASPX */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-slate-500 mb-1">PÁGINA: ALARMAS.ASPX</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Instalación de Sistemas de Alarmas
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Centrales inteligentes con pantalla táctil, conexión GSM 4G y WiFi, sensores de movimiento infrarrojos inmunes a mascotas y sirenas disuasorias.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('alarmas')}
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors"
            >
              <span>Ver ALARMAS.ASPX</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: SVC.ASPX */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                <Video className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-slate-500 mb-1">PÁGINA: SVC.ASPX</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Sistemas de Vigilancia y Control
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cámaras fijas, giratorias PTZ 360°, digitales IP 4K y analógicas. Tecnología con zoom e intensificador de luz para monitorear hasta 64 cámaras en vivo.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('svc')}
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors"
            >
              <span>Ver SVC.ASPX</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: IMEI.ASPX */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-slate-500 mb-1">PÁGINA: IMEI.ASPX</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Instalación y Mantenimiento IMEI
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Soporte y mantenimiento para ordenadores empresariales, impresoras láser de alta velocidad, discos duros para servidores NVR y redes cableadas.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('imei')}
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors"
            >
              <span>Ver IMEI.ASPX</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Catalog & Online Store Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider block">
              Catálogo Tecnológico Parque Central
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Equipos de Seguridad y Cómputo Disponibles
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar cámara, ordenador, disco..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 py-4 overflow-x-auto">
          {[
            { id: 'ALL', label: 'Todos los Productos' },
            { id: 'Vigilancia', label: 'Cámaras y Vigilancia' },
            { id: 'Alarmas', label: 'Sistemas de Alarma' },
            { id: 'Hardware', label: 'Cómputo & Discos' },
            { id: 'Redes', label: 'Redes y Conectividad' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {filteredProducts.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              {/* Product Image Container */}
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={producto.imagenUrl}
                  alt={producto.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 border border-slate-200/80">
                  {producto.codigo}
                </div>
                {producto.especificaciones.zoom && (
                  <div className="absolute top-2 right-2 bg-slate-900/90 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                    {producto.especificaciones.zoom}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    {producto.subcategoria}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mt-1 line-clamp-2 leading-snug">
                    {producto.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {producto.descripcion}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Precio IVA inc.</span>
                    <span className="text-base font-bold font-mono text-slate-950 tabular-nums">
                      {formatCOP(producto.precio)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(producto)}
                    disabled={producto.stock === 0}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs ${
                      addedId === producto.id
                        ? 'bg-emerald-600 text-white'
                        : producto.stock > 0
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {addedId === producto.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Agregado</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Physical Store in Parque Central Barranquilla Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-2xl p-8 sm:p-10 border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <MapPin className="w-4 h-4" />
              <span>Sede Física en Parque Central</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Visítenos en el Centro Comercial Parque Central de Barranquilla
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Venga a conocer nuestro showroom en vivo. Podrá probar en persona cámaras PTZ con zoom motorizado, intensificadores de luz para visión nocturna, paneles de alarma táctiles y solicitar asesoría con ingenieros egresados de la Universidad Autónoma del Caribe.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Calle 50 # 43-28 Local 14B · Parque Central, Barranquilla
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('clientes')}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              Registrar Pedido Online
            </button>
            <button
              onClick={() => setActiveTab('aspnet')}
              className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs rounded-lg border border-slate-300 transition-colors shadow-xs"
            >
              Descargar Proyecto Visual Studio 202X
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
