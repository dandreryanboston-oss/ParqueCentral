import React, { useState } from 'react';
import { 
  Bell, Shield, Radio, Smartphone, AlertTriangle, 
  CheckCircle2, Plus, Minus, ShoppingBag, ArrowRight 
} from 'lucide-react';
import { Producto } from '../types';

interface AlarmasPageProps {
  onAddToCart: (producto: Producto, cantidad?: number) => void;
  setActiveTab: (tab: string) => void;
}

export const AlarmasPage: React.FC<AlarmasPageProps> = ({ onAddToCart, setActiveTab }) => {
  const [propertyType, setPropertyType] = useState<'comercial' | 'residencial' | 'industrial'>('comercial');
  const [numSensors, setNumSensors] = useState<number>(4);
  const [includeBeams, setIncludeBeams] = useState<boolean>(true);
  const [includeStrobeSiren, setIncludeStrobeSiren] = useState<boolean>(true);
  const [hasBatteryBackup, setHasBatteryBackup] = useState<boolean>(true);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Price Calculation in COP
  const basePanelPrice = 890000; // Panel GSM/WiFi Smart Touch
  const sensorPrice = 95000;
  const beamPrice = 180000;
  const sirenPrice = 140000;
  const batteryPrice = 85000;
  const installationFee = propertyType === 'industrial' ? 350000 : 200000;

  const totalCalculated =
    basePanelPrice +
    numSensors * sensorPrice +
    (includeBeams ? beamPrice : 0) +
    (includeStrobeSiren ? sirenPrice : 0) +
    (hasBatteryBackup ? batteryPrice : 0) +
    installationFee;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddCustomKit = () => {
    const customAlarmProduct: Producto = {
      id: `alarm-custom-${Date.now()}`,
      codigo: 'ALM-KIT-PERSONALIZADO',
      nombre: `Sistema de Alarma Integral (${propertyType.toUpperCase()}) + ${numSensors} Sensores PIR`,
      categoria: 'Alarmas',
      subcategoria: 'Kit de Alarma Completo',
      precio: totalCalculated,
      stock: 10,
      especificaciones: {
        tipo: `Kit Alarma para Inmueble ${propertyType}`,
        conectividad: '4G LTE + WiFi 2.4GHz Dual SIM',
        potencia: includeStrobeSiren ? 'Sirena 110dB Estroboscópica' : 'Sirena Básica 95dB',
        garantia: '24 Meses Instalación Incluida',
      },
      imagenUrl: '/src/assets/images/alarm_system_pack_1792897601222.jpg',
      descripcion: `Sistema de seguridad con panel táctil, ${numSensors} sensores infrarrojos pasivos (PIR) anti-mascotas, notificación celular en tiempo real e instalación certificada en Barranquilla.`,
    };

    onAddToCart(customAlarmProduct);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setActiveTab('clientes');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-600 mb-1">
            <Bell className="w-4 h-4" />
            <span>ALARMAS.ASPX · Universidad Autónoma del Caribe</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Instalación de Sistemas de Alarmas
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Protección integral contra intrusión para comercios en Parque Central, residencias y bodegas industriales en Barranquilla.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('svc')}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <span>Ir a SVC.ASPX (Vigilancia)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Feature Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual & Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-16/10 bg-slate-100">
              <img
                src="/src/assets/images/alarm_system_pack_1792897601222.jpg"
                alt="Kit de Alarma Touchscreen con sensores y sirena"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-mono px-2.5 py-1 rounded">
                KIT SMART 4G / WIFI
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Tecnología de Detección sin Falsas Alarmas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nuestros sistemas implementan detección volumétrica por infrarrojos pasivos (PIR) con doble elemento piroeléctrico que ignora mascotas y fluctuaciones térmicas habituales en el clima caribeño de Barranquilla.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
                    <Radio className="w-4 h-4 text-indigo-600" />
                    <span>Conexión Híbrida 4G</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">
                    Continúa transmitiendo aún si cortan la línea telefónica o el internet fijo.
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Control desde Móvil</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">
                    Arme, desarme y reciba alertas push en tiempo real desde cualquier lugar.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Alarm Customizer & Quoter */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider block">
              Cotizador en Línea
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Personalice su Paquete de Alarma
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cálculo inmediato con instalación profesional en la ciudad de Barranquilla
            </p>
          </div>

          {/* Property Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Tipo de Inmueble en Barranquilla:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'comercial', label: 'Local Comercial' },
                { id: 'residencial', label: 'Casa / Residencia' },
                { id: 'industrial', label: 'Bodega Industrial' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPropertyType(opt.id as any)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                    propertyType === opt.id
                      ? 'border-slate-900 bg-slate-900 text-white font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper for PIR Motion Sensors */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">
                Sensores de Movimiento Infrarrojos (PIR):
              </span>
              <span className="font-mono text-slate-900 font-bold">
                {numSensors} sensores ({formatCOP(numSensors * sensorPrice)})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setNumSensors(Math.max(1, numSensors - 1))}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="1"
                max="16"
                value={numSensors}
                onChange={(e) => setNumSensors(parseInt(e.target.value))}
                className="flex-1 accent-slate-900 h-2 bg-slate-200 rounded cursor-pointer"
              />
              <button
                onClick={() => setNumSensors(Math.min(16, numSensors + 1))}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Cobertura recomendada: 1 sensor por cada acceso o habitación principal.
            </p>
          </div>

          {/* Toggles for Add-ons */}
          <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <div>
                <span className="font-semibold text-slate-900 block">Barreras Perimetrales Infrarrojas (100m)</span>
                <span className="text-[11px] text-slate-500">Protege azoteas, tapias y patios exteriores</span>
              </div>
              <input
                type="checkbox"
                checked={includeBeams}
                onChange={(e) => setIncludeBeams(e.target.checked)}
                className="w-4 h-4 rounded text-slate-900 accent-slate-900 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <div>
                <span className="font-semibold text-slate-900 block">Sirena Exterior Estroboscópica 110dB</span>
                <span className="text-[11px] text-slate-500">Alerta visual con luz LED destellante y acústica disuasoria</span>
              </div>
              <input
                type="checkbox"
                checked={includeStrobeSiren}
                onChange={(e) => setIncludeStrobeSiren(e.target.checked)}
                className="w-4 h-4 rounded text-slate-900 accent-slate-900 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <div>
                <span className="font-semibold text-slate-900 block">Batería de Respaldo Autonomía 24 Horas</span>
                <span className="text-[11px] text-slate-500">Mantiene el sistema activo durante cortes eléctricos de Air-e</span>
              </div>
              <input
                type="checkbox"
                checked={hasBatteryBackup}
                onChange={(e) => setHasBatteryBackup(e.target.checked)}
                className="w-4 h-4 rounded text-slate-900 accent-slate-900 cursor-pointer"
              />
            </label>
          </div>

          {/* Total & Action */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-500 block">Presupuesto Estimado con Instalación:</span>
              <span className="text-2xl font-black font-mono text-slate-950 tabular-nums">
                {formatCOP(totalCalculated)}
              </span>
            </div>

            <button
              onClick={handleAddCustomKit}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {addedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Kit Agregado al Pedido!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar Kit a mi Pedido</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
