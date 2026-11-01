import React, { useState, useEffect } from 'react';
import { 
  X, Maximize2, Video, ZoomIn, ZoomOut, Moon, Sun, RotateCw, 
  ShieldAlert, Camera, Sliders, ChevronLeft, ChevronRight, Grid 
} from 'lucide-react';
import { dbStore } from '../data/dbStore';
import { CamaraFeed } from '../types';

interface CctvMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CctvMonitorModal: React.FC<CctvMonitorModalProps> = ({ isOpen, onClose }) => {
  const [camaras, setCamaras] = useState<CamaraFeed[]>([]);
  const [selectedCamId, setSelectedCamId] = useState<number>(1);
  const [gridMode, setGridMode] = useState<1 | 4 | 9 | 16 | 64>(4);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [nightVisionMode, setNightVisionMode] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<string>('');
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);

  useEffect(() => {
    setCamaras(dbStore.getCamaras());
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${now.toLocaleDateString('es-CO')} ${now.toLocaleTimeString('es-CO', { hour12: false })}.${Math.floor(
          now.getMilliseconds() / 100
        )}`
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const activeCam = camaras.find((c) => c.id === selectedCamId) || camaras[0];

  const handlePan = (dx: number, dy: number) => {
    setPanOffset((prev) => ({
      x: Math.max(-50, Math.min(50, prev.x + dx)),
      y: Math.max(-50, Math.min(50, prev.y + dy)),
    }));
  };

  const handleSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 1500);
  };

  const visibleCameras = camaras.slice(0, gridMode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-950 text-slate-100 rounded-xl shadow-2xl w-full max-w-7xl border border-slate-800 flex flex-col h-[94vh] overflow-hidden">
        {/* Top Control Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-rose-600 flex items-center justify-center text-white">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>CENTRO DE MONITOREO CCTV 64 CANALES</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  EN VIVO
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Parque Central Barranquilla · Transmisión remota IP / NVR 4K
              </p>
            </div>
          </div>

          {/* Grid Selection */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 px-2 text-[11px]">MATRIZ:</span>
            {([1, 4, 9, 16, 64] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setGridMode(mode)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  gridMode === mode
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {mode === 1 ? '1 CH' : mode === 4 ? '4 CH (2x2)' : mode === 9 ? '9 CH' : mode === 16 ? '16 CH' : '64 CH'}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Work Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden bg-black">
          {/* Cameras Grid Area (3 Columns on Large Screen) */}
          <div className="lg:col-span-3 flex flex-col p-2 bg-slate-950 border-r border-slate-800 overflow-y-auto">
            <div
              className={`grid gap-1.5 h-full ${
                gridMode === 1
                  ? 'grid-cols-1'
                  : gridMode === 4
                  ? 'grid-cols-2 grid-rows-2'
                  : gridMode === 9
                  ? 'grid-cols-3 grid-rows-3'
                  : gridMode === 16
                  ? 'grid-cols-4 grid-rows-4'
                  : 'grid-cols-8 grid-rows-8 text-[9px]'
              }`}
            >
              {visibleCameras.map((cam) => {
                const isSelected = cam.id === selectedCamId;
                return (
                  <div
                    key={cam.id}
                    onClick={() => setSelectedCamId(cam.id)}
                    className={`relative rounded overflow-hidden cursor-pointer bg-slate-900 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-rose-500 ring-2 ring-rose-500/50'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Simulated Camera Video Canvas */}
                    <div
                      className={`relative w-full h-full min-h-[90px] flex items-center justify-center overflow-hidden transition-all duration-300 ${
                        nightVisionMode ? 'filter grayscale contrast-125 brightness-110' : ''
                      }`}
                      style={{
                        background:
                          cam.id % 2 === 0
                            ? 'radial-gradient(circle, #1e293b 0%, #020617 100%)'
                            : 'radial-gradient(circle, #1e1b4b 0%, #030712 100%)',
                      }}
                    >
                      {/* Scanlines / CCTV texture */}
                      <div className="absolute inset-0 bg-repeating-linear-gradient opacity-10 pointer-events-none" />

                      {/* Video graphic simulation */}
                      <div
                        className="text-center transition-transform duration-200"
                        style={{
                          transform: isSelected
                            ? `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
                            : 'none',
                        }}
                      >
                        <div className="text-slate-600 font-mono text-xs opacity-60">
                          [ LIVE RTSP STREAM - CH {cam.id.toString().padStart(2, '0')} ]
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-1 font-semibold">
                          {cam.ubicacion}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {cam.resolucion} · {cam.fps} FPS · {cam.tipo}
                        </div>
                      </div>

                      {/* On-Screen Display (OSD) Overlay */}
                      <div className="absolute top-1 left-2 text-[10px] font-mono text-emerald-400 bg-black/60 px-1 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>CH-{cam.id.toString().padStart(2, '0')}</span>
                      </div>

                      <div className="absolute top-1 right-2 text-[10px] font-mono text-slate-300 bg-black/60 px-1 rounded">
                        {cam.zoomOptico}
                      </div>

                      <div className="absolute bottom-1 left-2 text-[9px] font-mono text-slate-300 bg-black/60 px-1 rounded">
                        {currentTime}
                      </div>

                      {cam.estado === 'Alerta Movimiento' && (
                        <div className="absolute bottom-1 right-2 text-[9px] font-mono text-amber-300 bg-amber-950/80 px-1 border border-amber-600 rounded flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                          <span>MOVIMIENTO</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PTZ & Video Analytics Control Panel (Right Sidebar) */}
          <div className="p-4 bg-slate-900 flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Cámara Seleccionada
                </span>
                <div className="text-sm font-bold text-white mt-1">
                  CH-{activeCam.id.toString().padStart(2, '0')}: {activeCam.nombre}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{activeCam.ubicacion}</div>
                <div className="flex items-center gap-2 mt-2 text-[11px] font-mono">
                  <span className="text-slate-400">{activeCam.tipo}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-emerald-400">{activeCam.resolucion}</span>
                </div>
              </div>

              {/* PTZ Directional Joystick */}
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Controles PTZ Motorizados (360°)
                </span>
                <div className="grid grid-cols-3 gap-1.5 max-w-[190px] mx-auto bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <div />
                  <button
                    onClick={() => handlePan(0, -10)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-rose-600 rounded text-center text-xs font-bold text-white transition-colors"
                    title="Inclinación Arriba"
                  >
                    ▲
                  </button>
                  <div />

                  <button
                    onClick={() => handlePan(-10, 0)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-rose-600 rounded text-center text-xs font-bold text-white transition-colors"
                    title="Giro Izquierda"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => setPanOffset({ x: 0, y: 0 })}
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded text-center text-[10px] font-mono text-slate-400 transition-colors"
                    title="Centrar Posición"
                  >
                    RESET
                  </button>
                  <button
                    onClick={() => handlePan(10, 0)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-rose-600 rounded text-center text-xs font-bold text-white transition-colors"
                    title="Giro Derecha"
                  >
                    ▶
                  </button>

                  <div />
                  <button
                    onClick={() => handlePan(0, 10)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-rose-600 rounded text-center text-xs font-bold text-white transition-colors"
                    title="Inclinación Abajo"
                  >
                    ▼
                  </button>
                  <div />
                </div>
              </div>

              {/* Zoom & Light Intensifier */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span className="flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Zoom Óptico / Digital:</span>
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      {zoomLevel.toFixed(1)}X {zoomLevel > 1 && '(30X Máx)'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    className="w-full accent-rose-600 bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                    <span>1X (Gran Angular)</span>
                    <span>10X</span>
                    <span>30X (Teleobjetivo)</span>
                  </div>
                </div>

                {/* Night Vision / Light Intensifier (Starvis) */}
                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Intensificador de Luz</div>
                      <div className="text-[10px] text-slate-400">Sensor Nocturno Sony Starvis</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setNightVisionMode(!nightVisionMode)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      nightVisionMode
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {nightVisionMode ? 'ACTIVO' : 'NORMAL'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions & Snapshot */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <button
                onClick={handleSnapshot}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>{snapshotTaken ? '¡Foto Capturada!' : 'Tomar Captura de Pantalla'}</span>
              </button>

              <div className="text-[11px] text-slate-500 text-center font-mono">
                Visualización segura vía protocolo RTSP / TLS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
