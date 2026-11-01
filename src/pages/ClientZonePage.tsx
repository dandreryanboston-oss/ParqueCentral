import React, { useState } from 'react';
import { 
  User, ShoppingBag, Plus, Trash2, Edit3, CheckCircle2, 
  CreditCard, FileText, Clock, AlertCircle, Eye, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { dbStore } from '../data/dbStore';
import { Cliente, Pedido, Producto, Factura, Empleado } from '../types';

interface ClientZonePageProps {
  clientes: Cliente[];
  pedidos: Pedido[];
  productos: Producto[];
  facturas: Factura[];
  empleados: Empleado[];
  cart: { producto: Producto; cantidad: number }[];
  onUpdateCartQuantity: (productoId: string, cantidad: number) => void;
  onRemoveFromCart: (productoId: string) => void;
  onClearCart: () => void;
  onViewInvoice: (factura: Factura, pedido: Pedido) => void;
  setActiveTab: (tab: string) => void;
}

export const ClientZonePage: React.FC<ClientZonePageProps> = ({
  clientes,
  pedidos,
  productos,
  facturas,
  empleados,
  cart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
  onViewInvoice,
  setActiveTab,
}) => {
  // Current active logged-in client
  const [selectedClientId, setSelectedClientId] = useState<string>(
    clientes[0]?.id || 'cli-001'
  );

  const [activeSubTab, setActiveSubTab] = useState<'mis-pedidos' | 'crear-pedido' | 'registrar-cliente'>('mis-pedidos');

  // Form for New Order
  const [metodoPago, setMetodoPago] = useState<Pedido['metodoPago']>('Transferencia Bancolombia / Nequi');
  const [notasInstalacion, setNotasInstalacion] = useState<string>('Entrega e instalación en sede Barranquilla');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [orderCreatedSuccess, setOrderCreatedSuccess] = useState<string | null>(null);

  // Form for Editing an Existing Order
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null);

  // Payment Modal / Simulation State
  const [payingPedido, setPayingPedido] = useState<Pedido | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // New Client Registration Form
  const [newClientData, setNewClientData] = useState({
    nombreRazonSocial: '',
    tipoDoc: 'NIT' as Cliente['tipoDoc'],
    documento: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: 'Barranquilla',
    tipo: 'Empresarial' as Cliente['tipo'],
  });

  const currentClient = clientes.find((c) => c.id === selectedClientId) || clientes[0];
  const clientOrders = pedidos.filter((p) => p.clienteId === currentClient?.id);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );
  const cartIVA = Math.round(cartSubtotal * 0.19);
  const cartTotal = cartSubtotal + cartIVA;

  // Handler: Create Order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Debe agregar al menos un producto al pedido desde el catálogo.');
      return;
    }

    setIsSubmittingOrder(true);
    const items = cart.map((it) => ({
      productoId: it.producto.id,
      cantidad: it.cantidad,
    }));

    setTimeout(() => {
      const nuevoPedido = dbStore.createPedido({
        clienteId: currentClient.id,
        items,
        notasInstalacion,
        metodoPago,
      });

      onClearCart();
      setIsSubmittingOrder(false);
      setOrderCreatedSuccess(nuevoPedido.numeroPedido);
      setActiveSubTab('mis-pedidos');
      setTimeout(() => setOrderCreatedSuccess(null), 4000);
    }, 600);
  };

  // Handler: Save Edited Order
  const handleSaveEditOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPedido) return;

    dbStore.updatePedido(editingPedido.id, {
      estado: editingPedido.estado,
      metodoPago: editingPedido.metodoPago,
      notasInstalacion: editingPedido.notasInstalacion,
    });

    setEditingPedido(null);
  };

  // Handler: Pay Order
  const handleConfirmPayment = () => {
    if (!payingPedido) return;
    setPaymentSuccess(true);
    setTimeout(() => {
      dbStore.pagarPedido(payingPedido.id);
      // Auto generate invoice if not exists
      if (!payingPedido.facturaGeneradaId) {
        dbStore.generarFactura(payingPedido.id);
      }
      setPaymentSuccess(false);
      setPayingPedido(null);
    }, 1200);
  };

  // Handler: Register New Client
  const handleRegisterClient = (e: React.FormEvent) => {
    e.preventDefault();
    const created = dbStore.addCliente({
      ...newClientData,
      fechaRegistro: new Date().toISOString().split('T')[0],
    });
    setSelectedClientId(created.id);
    setActiveSubTab('mis-pedidos');
    setNewClientData({
      nombreRazonSocial: '',
      tipoDoc: 'NIT',
      documento: '',
      telefono: '',
      email: '',
      direccion: '',
      ciudad: 'Barranquilla',
      tipo: 'Empresarial',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Client Profile Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {currentClient?.nombreRazonSocial}
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {currentClient?.codigo}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span>{currentClient?.tipoDoc}: {currentClient?.documento}</span>
              <span>·</span>
              <span>{currentClient?.direccion}, {currentClient?.ciudad}</span>
              <span>·</span>
              <span>{currentClient?.telefono}</span>
            </div>
          </div>
        </div>

        {/* Client Switcher (Simulates login as any of the registered clients) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="text-xs text-slate-500 shrink-0">Cambiar Cliente:</div>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-slate-900"
          >
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombreRazonSocial} ({c.tipoDoc} {c.documento})
              </option>
            ))}
          </select>
        </div>
      </div>

      {orderCreatedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              ¡Pedido <strong className="font-mono">{orderCreatedSuccess}</strong> registrado exitosamente en la base de datos!
            </span>
          </div>
          <span className="text-emerald-700 font-medium">Estado: Pendiente</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('mis-pedidos')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeSubTab === 'mis-pedidos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Mis Pedidos ({clientOrders.length})
        </button>

        <button
          onClick={() => setActiveSubTab('crear-pedido')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'crear-pedido'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Crear Pedido ({cart.length} ítems en carrito)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('registrar-cliente')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeSubTab === 'registrar-cliente'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Registrar Nuevo Cliente
        </button>
      </div>

      {/* SUBTAB 1: Mis Pedidos */}
      {activeSubTab === 'mis-pedidos' && (
        <div className="space-y-4">
          {clientOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8 space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-800">No tiene pedidos registrados aún</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore nuestro catálogo de cámaras de vigilancia, ordenadores y alarmas para crear su primer pedido.
              </p>
              <button
                onClick={() => setActiveSubTab('crear-pedido')}
                className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Ir a Crear Pedido
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {clientOrders.map((pedido) => {
                const factura = facturas.find((f) => f.pedidoId === pedido.id);
                const empleado = empleados.find((e) => e.id === pedido.empleadoId);

                return (
                  <div
                    key={pedido.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-colors space-y-4"
                  >
                    {/* Header of Pedido */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold font-mono text-slate-900">
                          {pedido.numeroPedido}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            pedido.estado === 'Completado'
                              ? 'bg-emerald-50 text-emerald-700'
                              : pedido.estado === 'Instalación Programada'
                              ? 'bg-blue-50 text-blue-700'
                              : pedido.estado === 'En Proceso'
                              ? 'bg-amber-50 text-amber-700'
                              : pedido.estado === 'Cancelado'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {pedido.estado}
                        </span>
                        {pedido.pagado ? (
                          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Pagado</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pendiente Pago</span>
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 font-mono">
                        Fecha: {pedido.fecha}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="border border-slate-100 rounded-lg overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                          <tr>
                            <th className="py-2 px-3">Código</th>
                            <th className="py-2 px-3">Producto</th>
                            <th className="py-2 px-3 text-center">Cant.</th>
                            <th className="py-2 px-3 text-right">Unitario</th>
                            <th className="py-2 px-3 text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {pedido.items.map((it, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="py-2 px-3 font-mono text-slate-500">{it.productoCodigo}</td>
                              <td className="py-2 px-3 text-slate-800 font-medium">{it.productoNombre}</td>
                              <td className="py-2 px-3 text-center font-mono tabular-nums">{it.cantidad}</td>
                              <td className="py-2 px-3 text-right font-mono tabular-nums">
                                {formatCOP(it.precioUnitario)}
                              </td>
                              <td className="py-2 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                                {formatCOP(it.subtotal)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Details & Actions Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div>
                          <span className="text-slate-400">Método de Pago:</span> {pedido.metodoPago}
                        </div>
                        <div>
                          <span className="text-slate-400">Asesor Asignado:</span>{' '}
                          {empleado ? `${empleado.nombre} (${empleado.cargo})` : 'Pendiente de asignación'}
                        </div>
                        {pedido.notasInstalacion && (
                          <div className="text-slate-500 italic">
                            «{pedido.notasInstalacion}»
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                        <div className="text-right mr-3">
                          <span className="text-[10px] text-slate-400 uppercase block">Total Pedido (IVA inc.)</span>
                          <span className="text-lg font-black font-mono text-slate-950 tabular-nums">
                            {formatCOP(pedido.total)}
                          </span>
                        </div>

                        {/* Modificar / Editar Pedido */}
                        {pedido.estado !== 'Completado' && pedido.estado !== 'Cancelado' && (
                          <button
                            onClick={() => setEditingPedido(pedido)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Modificar</span>
                          </button>
                        )}

                        {/* Pagar Pedido (if not paid) */}
                        {!pedido.pagado && (
                          <button
                            onClick={() => setPayingPedido(pedido)}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pagar Pedido</span>
                          </button>
                        )}

                        {/* Ver / Generar Factura */}
                        {factura ? (
                          <button
                            onClick={() => onViewInvoice(factura, pedido)}
                            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-indigo-200"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Ver Factura</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const nueva = dbStore.generarFactura(pedido.id);
                              onViewInvoice(nueva, pedido);
                            }}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Emitir Factura</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: Crear Pedido */}
      {activeSubTab === 'crear-pedido' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">
                Productos Seleccionados para el Pedido
              </h3>
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Vaciar Carrito
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <p className="text-xs text-slate-500">
                  El carrito de pedido está vacío.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Ir al Catálogo de Productos
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.producto.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.producto.imagenUrl}
                        alt={item.producto.nombre}
                        className="w-12 h-12 rounded object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900">{item.producto.nombre}</h4>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {formatCOP(item.producto.precio)} c/u · Stock: {item.producto.stock}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(item.producto.id, item.cantidad - 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold text-slate-900">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateCartQuantity(item.producto.id, item.cantidad + 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right w-24">
                        <span className="text-xs font-bold font-mono text-slate-950 tabular-nums">
                          {formatCOP(item.producto.precio * item.cantidad)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.producto.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Checkout Details */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-200">
              Confirmación del Pedido
            </h3>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Cliente Solicitante:</label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">{currentClient?.nombreRazonSocial}</div>
                  <div className="text-slate-500 text-[11px]">
                    NIT/CC: {currentClient?.documento} · {currentClient?.direccion}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Método de Pago:</label>
                <select
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-slate-900"
                >
                  <option>Transferencia Bancolombia / Nequi</option>
                  <option>Tarjeta Crédito / Débito</option>
                  <option>Efectivo en Parque Central</option>
                  <option>Crédito Empresarial 30 Días</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Notas de Instalación y Entrega (Barranquilla):
                </label>
                <textarea
                  rows={2}
                  value={notasInstalacion}
                  onChange={(e) => setNotasInstalacion(e.target.value)}
                  placeholder="Ej. Instalación de cámaras en patio y bodega..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums font-semibold">{formatCOP(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>IVA (19%):</span>
                  <span className="font-mono tabular-nums font-semibold">{formatCOP(cartIVA)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Pedido:</span>
                  <span className="font-mono tabular-nums text-indigo-700">{formatCOP(cartTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0 || isSubmittingOrder}
                className={`w-full py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm ${
                  cart.length > 0 && !isSubmittingOrder
                    ? 'bg-slate-900 hover:bg-slate-800 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmittingOrder ? 'Guardando en SQL...' : 'Generar y Registrar Pedido'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Registrar Nuevo Cliente */}
      {activeSubTab === 'registrar-cliente' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Registro de Nuevo Cliente (CRUD Clientes)
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Ingreso de nuevo usuario para realizar compras y solicitudes en el sistema de Parque Central.
          </p>

          <form onSubmit={handleRegisterClient} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Tipo Doc:</label>
                <select
                  value={newClientData.tipoDoc}
                  onChange={(e) => setNewClientData({ ...newClientData, tipoDoc: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="NIT">NIT</option>
                  <option value="CC">Cédula (CC)</option>
                  <option value="CE">Cédula Extranjería (CE)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-slate-700 font-semibold block mb-1">Número de Documento:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 901.234.567-8"
                  value={newClientData.documento}
                  onChange={(e) => setNewClientData({ ...newClientData, documento: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Nombre Completo o Razón Social:</label>
              <input
                type="text"
                required
                placeholder="Ej. Inversiones del Norte S.A.S."
                value={newClientData.nombreRazonSocial}
                onChange={(e) => setNewClientData({ ...newClientData, nombreRazonSocial: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Teléfono / Celular:</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 301-555-1234"
                  value={newClientData.telefono}
                  onChange={(e) => setNewClientData({ ...newClientData, telefono: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  required
                  placeholder="contacto@empresa.com"
                  value={newClientData.email}
                  onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Dirección en Barranquilla:</label>
                <input
                  type="text"
                  required
                  placeholder="Calle 50 # 43-28"
                  value={newClientData.direccion}
                  onChange={(e) => setNewClientData({ ...newClientData, direccion: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Tipo de Cliente:</label>
                <select
                  value={newClientData.tipo}
                  onChange={(e) => setNewClientData({ ...newClientData, tipo: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="Empresarial">Empresarial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Residencial">Residencial</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Registrar Cliente en Base de Datos</span>
            </button>
          </form>
        </div>
      )}

      {/* Modal: Edit Existing Order */}
      {editingPedido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Modificar Pedido {editingPedido.numeroPedido}
            </h3>
            <p className="text-xs text-slate-500">
              Actualice los datos o condiciones de entrega de su pedido.
            </p>

            <form onSubmit={handleSaveEditOrder} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Método de Pago:</label>
                <select
                  value={editingPedido.metodoPago}
                  onChange={(e) => setEditingPedido({ ...editingPedido, metodoPago: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option>Transferencia Bancolombia / Nequi</option>
                  <option>Tarjeta Crédito / Débito</option>
                  <option>Efectivo en Parque Central</option>
                  <option>Crédito Empresarial 30 Días</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Notas de Instalación:</label>
                <textarea
                  rows={3}
                  value={editingPedido.notasInstalacion || ''}
                  onChange={(e) => setEditingPedido({ ...editingPedido, notasInstalacion: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPedido(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg"
                >
                  Guardar Cambios (UPDATE SQL)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Simulated Payment Gateway */}
      {payingPedido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <CreditCard className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">
                Pasarela de Pago Online (Simulación)
              </h3>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="text-slate-600">
                Pedido: <span className="font-mono font-bold text-slate-900">{payingPedido.numeroPedido}</span>
              </div>
              <div className="text-slate-600">
                Total a debitar:{' '}
                <span className="font-mono font-bold text-indigo-700 text-sm">
                  {formatCOP(payingPedido.total)}
                </span>
              </div>
              <div className="text-slate-500 text-[11px]">
                Método seleccionado: {payingPedido.metodoPago}
              </div>
            </div>

            {paymentSuccess ? (
              <div className="py-6 text-center text-emerald-600 font-bold text-sm flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
                <span>¡Pago Confirmado! Actualizando estado a 'Pagado' en SQL Server...</span>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Al confirmar, se registrará el pago en la base de datos local y se generará automáticamente la factura electrónica DIAN para Barranquilla.
                </p>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setPayingPedido(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aprobar Pago</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
