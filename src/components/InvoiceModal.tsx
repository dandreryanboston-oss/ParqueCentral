import React from 'react';
import { X, Printer, Download, CheckCircle2, Building2, UserCheck, Shield } from 'lucide-react';
import { Factura, Pedido, Cliente, Empleado } from '../types';

interface InvoiceModalProps {
  factura: Factura | null;
  pedido: Pedido | null;
  cliente: Cliente | null;
  empleado: Empleado | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  factura,
  pedido,
  cliente,
  empleado,
  onClose,
}) => {
  if (!factura || !pedido) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold tracking-wide">
              Factura Electrónica de Venta — {factura.numeroFactura}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Exportar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-8 text-slate-800 bg-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded bg-slate-900 text-white font-black flex items-center justify-center text-xs">
                  PC
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-950">
                  PARQUE CENTRAL TECH & VIGILANCIA S.A.S.
                </h1>
              </div>
              <p className="text-xs text-slate-600">NIT: 900.584.210-4 · IVA Régimen Común</p>
              <p className="text-xs text-slate-600">
                Centro Comercial Parque Central, Calle 50 # 43-28 Local 14B
              </p>
              <p className="text-xs text-slate-600">
                Barranquilla, Atlántico · Tel: (605) 385-2244 / 301-458-9921
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Resolución DIAN No. 18764000293 de 2026-01-15 (Rango FE-BAQ-0001 al 10000)
              </p>
            </div>

            <div className="sm:text-right bg-slate-50 p-4 rounded-lg border border-slate-200 shrink-0">
              <span className="text-[11px] font-bold text-indigo-700 tracking-wider uppercase block">
                Factura Electrónica No.
              </span>
              <span className="text-lg font-mono font-bold text-slate-950 block">
                {factura.numeroFactura}
              </span>
              <div className="text-xs text-slate-600 mt-2 space-y-0.5">
                <div>Fecha de Emisión: <span className="font-semibold text-slate-900">{factura.fechaEmision}</span></div>
                <div>Pedido Asociado: <span className="font-mono font-semibold text-slate-900">{pedido.numeroPedido}</span></div>
                <div>
                  Estado:{' '}
                  <span className="font-semibold text-emerald-700">
                    {factura.estadoPago}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Employee Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Datos del Cliente
              </span>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900">
                  {cliente?.nombreRazonSocial || 'Cliente General'}
                </div>
                <div>
                  <span className="text-slate-500">Documento: </span>
                  <span className="font-mono font-medium">{cliente?.tipoDoc} {cliente?.documento}</span>
                </div>
                <div>
                  <span className="text-slate-500">Dirección: </span>
                  <span>{cliente?.direccion || 'Parque Central, Barranquilla'}</span>
                </div>
                <div>
                  <span className="text-slate-500">Ciudad: </span>
                  <span>{cliente?.ciudad || 'Barranquilla'}</span>
                </div>
                <div>
                  <span className="text-slate-500">Teléfono: </span>
                  <span>{cliente?.telefono || '300-000-0000'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Atención y Despacho
              </span>
              <div className="space-y-1">
                <div>
                  <span className="text-slate-500">Técnico / Asesor Asignado: </span>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    {empleado ? `${empleado.nombre} (${empleado.cargo})` : 'Carlos Mario Mendoza Orozco (Técnico Senior)'}
                  </div>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500">Método de Pago: </span>
                  <span className="font-semibold text-slate-900">{pedido.metodoPago}</span>
                </div>
                <div>
                  <span className="text-slate-500">Notas de Entrega / Instalación: </span>
                  <p className="text-slate-700 italic mt-0.5">
                    {pedido.notasInstalacion || 'Entrega inmediata en sede Parque Central.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Line items Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Descripción de Producto / Servicio</th>
                  <th className="py-2.5 px-3 text-center">Cant.</th>
                  <th className="py-2.5 px-3 text-right">Vr. Unitario</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {pedido.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono text-slate-600">{item.productoCodigo}</td>
                    <td className="py-2.5 px-3 text-slate-900">{item.productoNombre}</td>
                    <td className="py-2.5 px-3 text-center font-mono tabular-nums">{item.cantidad}</td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                      {formatCOP(item.precioUnitario)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-950">
                      {formatCOP(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Taxes Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t border-slate-200 pt-4">
            <div className="text-xs text-slate-500 max-w-sm">
              <p className="font-semibold text-slate-700 mb-1">Garantía y Condiciones del Servicio:</p>
              <p className="leading-relaxed">
                Todo el equipamiento electrónico de vigilancia (cámaras PTZ, grabadores NVR, sensores PIR) y cómputo cuenta con garantía directa de 12 a 36 meses. Válido en nuestra sede de Parque Central Barranquilla.
              </p>
              <div className="mt-3 font-mono text-[10px] text-slate-400">
                CUFE: 8f9b2a74c10e54d389012a9e3d81b7642a8b9c1042... (Firma Digital DIAN)
              </div>
            </div>

            <div className="w-full sm:w-72 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Bruto:</span>
                <span className="font-mono tabular-nums font-semibold">{formatCOP(factura.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IVA (19%):</span>
                <span className="font-mono tabular-nums font-semibold">{formatCOP(factura.iva)}</span>
              </div>
              {factura.retencionFuente ? (
                <div className="flex justify-between text-rose-700">
                  <span>ReteFuente (2.5%):</span>
                  <span className="font-mono tabular-nums font-semibold">
                    - {formatCOP(factura.retencionFuente)}
                  </span>
                </div>
              ) : null}
              <div className="border-t border-slate-300 pt-2 flex justify-between text-sm font-bold text-slate-950">
                <span>TOTAL A PAGAR:</span>
                <span className="font-mono tabular-nums text-base text-indigo-700">
                  {formatCOP(factura.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions (Hidden on print) */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Factura</span>
          </button>
        </div>
      </div>
    </div>
  );
};
