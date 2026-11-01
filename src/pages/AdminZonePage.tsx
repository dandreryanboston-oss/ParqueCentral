import React, { useState } from 'react';
import { 
  ShieldCheck, Users, Briefcase, ShoppingBag, 
  FileText, Plus, Edit2, Trash2, Check, X, Search, 
  Lock, KeyRound, AlertTriangle, Printer, Eye, Server 
} from 'lucide-react';
import { dbStore } from '../data/dbStore';
import { 
  Empleado, Cliente, Pedido, Producto, Factura, RolEmpleado 
} from '../types';

interface AdminZonePageProps {
  empleados: Empleado[];
  clientes: Cliente[];
  pedidos: Pedido[];
  productos: Producto[];
  facturas: Factura[];
  onViewInvoice: (factura: Factura, pedido: Pedido) => void;
  openSqlDrawer: () => void;
}

export const AdminZonePage: React.FC<AdminZonePageProps> = ({
  empleados,
  clientes,
  pedidos,
  productos,
  facturas,
  onViewInvoice,
  openSqlDrawer,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Logged in by default for ease of testing
  const [loginUser, setLoginUser] = useState<string>('admin');
  const [loginPass, setLoginPass] = useState<string>('admin2026');
  const [loginError, setLoginError] = useState<string>('');

  // Admin Section Tab
  const [adminTab, setAdminTab] = useState<'pedidos' | 'empleados' | 'clientes' | 'productos' | 'facturas'>('pedidos');

  // Search Filter
  const [search, setSearch] = useState<string>('');

  // Modals / Forms State
  const [isAddEmpleadoOpen, setIsAddEmpleadoOpen] = useState(false);
  const [editingEmpleado, setEditingEmpleado] = useState<Empleado | null>(null);

  const [isAddClienteOpen, setIsAddClienteOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null);

  const [isAddProductoOpen, setIsAddProductoOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);

  // New Empleado Form
  const [newEmp, setNewEmp] = useState({
    nombre: '',
    cargo: 'Técnico de Instalación Senior' as RolEmpleado,
    documento: '',
    telefono: '',
    email: '',
    fechaContratacion: new Date().toISOString().split('T')[0],
    estado: 'Activo' as Empleado['estado'],
    direccion: 'Barranquilla, Atlántico',
  });

  // New Cliente Form
  const [newCli, setNewCli] = useState({
    nombreRazonSocial: '',
    tipoDoc: 'NIT' as Cliente['tipoDoc'],
    documento: '',
    telefono: '',
    email: '',
    direccion: 'Parque Central, Barranquilla',
    ciudad: 'Barranquilla',
    tipo: 'Empresarial' as Cliente['tipo'],
  });

  // New Producto Form
  const [newProd, setNewProd] = useState({
    nombre: '',
    categoria: 'Vigilancia' as Producto['categoria'],
    subcategoria: 'Cámara PTZ Giratoria',
    precio: 1500000,
    stock: 10,
    descripcion: '',
    imagenUrl: '/src/assets/images/cctv_ptz_camera_1792897599846.jpg',
  });

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser === 'admin' && loginPass === 'admin2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas. Pruebe: admin / admin2026');
    }
  };

  // --- CRUD EMPLEADOS HANDLERS ---
  const handleCreateEmpleado = (e: React.FormEvent) => {
    e.preventDefault();
    dbStore.addEmpleado(newEmp);
    setIsAddEmpleadoOpen(false);
    setNewEmp({
      nombre: '',
      cargo: 'Técnico de Instalación Senior',
      documento: '',
      telefono: '',
      email: '',
      fechaContratacion: new Date().toISOString().split('T')[0],
      estado: 'Activo',
      direccion: 'Barranquilla, Atlántico',
    });
  };

  const handleUpdateEmpleado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmpleado) return;
    dbStore.updateEmpleado(editingEmpleado.id, {
      cargo: editingEmpleado.cargo,
      telefono: editingEmpleado.telefono,
      estado: editingEmpleado.estado,
      email: editingEmpleado.email,
      direccion: editingEmpleado.direccion,
    });
    setEditingEmpleado(null);
  };

  const handleDeleteEmpleado = (id: string, nombre: string) => {
    if (window.confirm(`¿Está seguro de eliminar al empleado "${nombre}" de la base de datos? (DELETE SQL)`)) {
      dbStore.deleteEmpleado(id);
    }
  };

  // --- CRUD CLIENTES HANDLERS ---
  const handleCreateCliente = (e: React.FormEvent) => {
    e.preventDefault();
    dbStore.addCliente({
      ...newCli,
      fechaRegistro: new Date().toISOString().split('T')[0],
    });
    setIsAddClienteOpen(false);
    setNewCli({
      nombreRazonSocial: '',
      tipoDoc: 'NIT',
      documento: '',
      telefono: '',
      email: '',
      direccion: 'Parque Central, Barranquilla',
      ciudad: 'Barranquilla',
      tipo: 'Empresarial',
    });
  };

  const handleUpdateCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCliente) return;
    dbStore.updateCliente(editingCliente.id, {
      nombreRazonSocial: editingCliente.nombreRazonSocial,
      telefono: editingCliente.telefono,
      email: editingCliente.email,
      direccion: editingCliente.direccion,
      tipo: editingCliente.tipo,
    });
    setEditingCliente(null);
  };

  const handleDeleteCliente = (id: string, nombre: string) => {
    if (window.confirm(`¿Está seguro de eliminar al cliente "${nombre}" de la base de datos?`)) {
      dbStore.deleteCliente(id);
    }
  };

  // --- CRUD PEDIDOS HANDLERS ---
  const handleUpdatePedido = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPedido) return;
    dbStore.updatePedido(editingPedido.id, {
      estado: editingPedido.estado,
      empleadoId: editingPedido.empleadoId,
      pagado: editingPedido.pagado,
      notasInstalacion: editingPedido.notasInstalacion,
    });
    setEditingPedido(null);
  };

  const handleDeletePedido = (id: string, num: string) => {
    if (window.confirm(`¿Desea borrar el pedido "${num}" y su detalle de SQL Server?`)) {
      dbStore.deletePedido(id);
    }
  };

  // --- CRUD PRODUCTOS HANDLERS ---
  const handleCreateProducto = (e: React.FormEvent) => {
    e.preventDefault();
    dbStore.addProducto({
      ...newProd,
      especificaciones: {
        tipo: newProd.subcategoria,
        garantia: '12 a 24 Meses',
      },
    });
    setIsAddProductoOpen(false);
    setNewProd({
      nombre: '',
      categoria: 'Vigilancia',
      subcategoria: 'Cámara PTZ Giratoria',
      precio: 1500000,
      stock: 10,
      descripcion: '',
      imagenUrl: '/src/assets/images/cctv_ptz_camera_1792897599846.jpg',
    });
  };

  const handleUpdateProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProducto) return;
    dbStore.updateProducto(editingProducto.id, {
      nombre: editingProducto.nombre,
      precio: editingProducto.precio,
      stock: editingProducto.stock,
      descripcion: editingProducto.descripcion,
    });
    setEditingProducto(null);
  };

  const handleDeleteProducto = (id: string, nombre: string) => {
    if (window.confirm(`¿Desea eliminar el producto "${nombre}" del catálogo?`)) {
      dbStore.deleteProducto(id);
    }
  };

  // Total sales calculation
  const totalSalesCOP = pedidos.reduce((acc, p) => (p.pagado ? acc + p.total : acc), 0);

  // If Not Authenticated, show login
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Zona de Administración
          </h2>
          <p className="text-xs text-slate-500">
            Acceso restringido para gestión de base de datos, empleados, clientes y pedidos.
          </p>
        </div>

        {loginError && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">Usuario:</label>
            <input
              type="text"
              required
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Contraseña:</label>
            <input
              type="password"
              required
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-lg text-[11px] text-amber-800 border border-amber-200">
            <strong>Credenciales demo:</strong> Usuario: <code>admin</code> / Contraseña: <code>admin2026</code>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors shadow-xs"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Pedidos</div>
          <div className="text-2xl font-black font-mono text-slate-900 mt-1">{pedidos.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Registrados en SQL Server</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Facturación Recaudada</div>
          <div className="text-2xl font-black font-mono text-emerald-600 mt-1 tabular-nums">
            {formatCOP(totalSalesCOP)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Ventas pagadas</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Empleados & Técnicos</div>
          <div className="text-2xl font-black font-mono text-slate-900 mt-1">{empleados.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">En sede Parque Central</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Clientes Registrados</div>
          <div className="text-2xl font-black font-mono text-indigo-600 mt-1">{clientes.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Empresariales y Comerciales</div>
        </div>
      </div>

      {/* Main Admin Navigation and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'pedidos', label: 'Gestión Pedidos', count: pedidos.length },
            { id: 'empleados', label: 'CRUD Empleados', count: empleados.length },
            { id: 'clientes', label: 'CRUD Clientes', count: clientes.length },
            { id: 'productos', label: 'CRUD Productos', count: productos.length },
            { id: 'facturas', label: 'Facturas DIAN', count: facturas.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setAdminTab(tab.id as any);
                setSearch('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                adminTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en registros..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            onClick={openSqlDrawer}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-medium rounded-lg flex items-center gap-1.5"
            title="Ver log de sentencias SQL"
          >
            <Server className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">SQL Log</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. CRUD PEDIDOS */}
      {/* ======================================================== */}
      {adminTab === 'pedidos' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Gestión Integral de Pedidos</h3>
              <p className="text-xs text-slate-500">
                Cambio de estados, asignación de técnicos e inspectores de instalación
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">No. Pedido</th>
                  <th className="py-2.5 px-3">Fecha</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Técnico Asignado</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3">Pago</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {pedidos
                  .filter(
                    (p) =>
                      p.numeroPedido.toLowerCase().includes(search.toLowerCase()) ||
                      p.estado.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((p) => {
                    const cli = clientes.find((c) => c.id === p.clienteId);
                    const emp = empleados.find((e) => e.id === p.empleadoId);
                    const fac = facturas.find((f) => f.pedidoId === p.id);

                    return (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                          {p.numeroPedido}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{p.fecha}</td>
                        <td className="py-2.5 px-3 text-slate-800">
                          {cli?.nombreRazonSocial || 'Cliente no encontrado'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {emp ? emp.nombre : <span className="text-rose-600 italic">Sin asignar</span>}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              p.estado === 'Completado'
                                ? 'bg-emerald-100 text-emerald-800'
                                : p.estado === 'Instalación Programada'
                                ? 'bg-blue-100 text-blue-800'
                                : p.estado === 'En Proceso'
                                ? 'bg-amber-100 text-amber-800'
                                : p.estado === 'Cancelado'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {p.estado}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          {p.pagado ? (
                            <span className="text-emerald-700 font-semibold text-[11px]">Pagado</span>
                          ) : (
                            <span className="text-amber-600 font-semibold text-[11px]">Pendiente</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-950">
                          {formatCOP(p.total)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setEditingPedido(p)}
                              title="Editar pedido"
                              className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            {fac ? (
                              <button
                                onClick={() => onViewInvoice(fac, p)}
                                title="Ver Factura"
                                className="p-1 text-indigo-600 hover:text-indigo-800 rounded hover:bg-indigo-50"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const nueva = dbStore.generarFactura(p.id);
                                  onViewInvoice(nueva, p);
                                }}
                                title="Generar Factura"
                                className="p-1 text-emerald-600 hover:text-emerald-800 rounded hover:bg-emerald-50"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeletePedido(p.id, p.numeroPedido)}
                              title="Eliminar pedido"
                              className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. CRUD EMPLEADOS */}
      {/* ======================================================== */}
      {adminTab === 'empleados' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">CRUD de Empleados y Personal Técnico</h3>
              <p className="text-xs text-slate-500">
                Técnicos de instalación de alarmas, CCTV y vendedores en Parque Central
              </p>
            </div>
            <button
              onClick={() => setIsAddEmpleadoOpen(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Empleado</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Nombre Completo</th>
                  <th className="py-2.5 px-3">Cargo</th>
                  <th className="py-2.5 px-3">Documento</th>
                  <th className="py-2.5 px-3">Teléfono</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {empleados
                  .filter(
                    (e) =>
                      e.nombre.toLowerCase().includes(search.toLowerCase()) ||
                      e.cargo.toLowerCase().includes(search.toLowerCase()) ||
                      e.codigo.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-slate-600">{emp.codigo}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{emp.nombre}</td>
                      <td className="py-2.5 px-3 text-slate-700">{emp.cargo}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{emp.documento}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">{emp.telefono}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            emp.estado === 'Activo'
                              ? 'bg-emerald-50 text-emerald-700'
                              : emp.estado === 'En Terreno'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {emp.estado}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditingEmpleado(emp)}
                            title="Editar empleado"
                            className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEmpleado(emp.id, emp.nombre)}
                            title="Eliminar empleado"
                            className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CRUD CLIENTES */}
      {/* ======================================================== */}
      {adminTab === 'clientes' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">CRUD de Clientes Registrados</h3>
              <p className="text-xs text-slate-500">
                Directorio comercial de compradores en Barranquilla
              </p>
            </div>
            <button
              onClick={() => setIsAddClienteOpen(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Cliente</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Razón Social / Nombre</th>
                  <th className="py-2.5 px-3">Documento</th>
                  <th className="py-2.5 px-3">Teléfono</th>
                  <th className="py-2.5 px-3">Dirección</th>
                  <th className="py-2.5 px-3">Tipo</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {clientes
                  .filter(
                    (c) =>
                      c.nombreRazonSocial.toLowerCase().includes(search.toLowerCase()) ||
                      c.documento.toLowerCase().includes(search.toLowerCase()) ||
                      c.codigo.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((cli) => (
                    <tr key={cli.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-slate-600">{cli.codigo}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {cli.nombreRazonSocial}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">
                        {cli.tipoDoc} {cli.documento}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">{cli.telefono}</td>
                      <td className="py-2.5 px-3 text-slate-600">{cli.direccion}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {cli.tipo}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditingCliente(cli)}
                            title="Editar cliente"
                            className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCliente(cli.id, cli.nombreRazonSocial)}
                            title="Eliminar cliente"
                            className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. CRUD PRODUCTOS */}
      {/* ======================================================== */}
      {adminTab === 'productos' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">CRUD de Productos Tecnológicos y Vigilancia</h3>
              <p className="text-xs text-slate-500">
                Inventario de ordenadores, impresoras, discos duros, cámaras y alarmas
              </p>
            </div>
            <button
              onClick={() => setIsAddProductoOpen(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Producto</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Producto</th>
                  <th className="py-2.5 px-3">Categoría</th>
                  <th className="py-2.5 px-3">Subcategoría</th>
                  <th className="py-2.5 px-3 text-right">Precio</th>
                  <th className="py-2.5 px-3 text-center">Stock</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {productos
                  .filter(
                    (p) =>
                      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
                      p.codigo.toLowerCase().includes(search.toLowerCase()) ||
                      p.categoria.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-slate-600">{prod.codigo}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{prod.nombre}</td>
                      <td className="py-2.5 px-3 text-slate-600">{prod.categoria}</td>
                      <td className="py-2.5 px-3 text-slate-500">{prod.subcategoria}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-950">
                        {formatCOP(prod.precio)}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono tabular-nums">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            prod.stock > 10
                              ? 'text-emerald-700 bg-emerald-50'
                              : prod.stock > 0
                              ? 'text-amber-700 bg-amber-50'
                              : 'text-rose-700 bg-rose-50'
                          }`}
                        >
                          {prod.stock}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditingProducto(prod)}
                            title="Editar producto"
                            className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProducto(prod.id, prod.nombre)}
                            title="Eliminar producto"
                            className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. GESTIÓN FACTURAS DIAN */}
      {/* ======================================================== */}
      {adminTab === 'facturas' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Registro de Facturas Electrónicas DIAN
              </h3>
              <p className="text-xs text-slate-500">
                Resolución DIAN No. 18764000293 de 2026 · Ciudad de Barranquilla
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">No. Factura</th>
                  <th className="py-2.5 px-3">Fecha</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Pedido Ref.</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                  <th className="py-2.5 px-3 text-right">IVA (19%)</th>
                  <th className="py-2.5 px-3 text-right">Total Factura</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {facturas.map((fac) => {
                  const cli = clientes.find((c) => c.id === fac.clienteId);
                  const ped = pedidos.find((p) => p.id === fac.pedidoId);

                  return (
                    <tr key={fac.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">
                        {fac.numeroFactura}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{fac.fechaEmision}</td>
                      <td className="py-2.5 px-3 text-slate-900 font-semibold">
                        {cli?.nombreRazonSocial || 'Cliente General'}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">
                        {ped?.numeroPedido || fac.pedidoId}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {formatCOP(fac.subtotal)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600">
                        {formatCOP(fac.iva)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-950">
                        {formatCOP(fac.total)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => ped && onViewInvoice(fac, ped)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold inline-flex items-center gap-1 shadow-xs"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Ver / Imprimir</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODALS: ADD & EDIT */}
      {/* ======================================================== */}

      {/* Modal: Add Empleado */}
      {isAddEmpleadoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Registrar Nuevo Empleado (INSERT SQL)</h3>
            <form onSubmit={handleCreateEmpleado} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto De la Hoz"
                  value={newEmp.nombre}
                  onChange={(e) => setNewEmp({ ...newEmp, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Cargo:</label>
                  <select
                    value={newEmp.cargo}
                    onChange={(e) => setNewEmp({ ...newEmp, cargo: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option>Técnico de Instalación Senior</option>
                    <option>Especialista CCTV y Vigilancia</option>
                    <option>Vendedor de Tecnología</option>
                    <option>Ingeniero de Redes y Servidores</option>
                    <option>Administrador de Sistemas</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Cédula / Documento:</label>
                  <input
                    type="text"
                    required
                    value={newEmp.documento}
                    onChange={(e) => setNewEmp({ ...newEmp, documento: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Teléfono:</label>
                  <input
                    type="tel"
                    required
                    value={newEmp.telefono}
                    onChange={(e) => setNewEmp({ ...newEmp, telefono: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Correo Electrónico:</label>
                  <input
                    type="email"
                    required
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddEmpleadoOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg"
                >
                  Guardar en Base de Datos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Empleado */}
      {editingEmpleado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Editar Empleado {editingEmpleado.codigo} (UPDATE SQL)
            </h3>
            <form onSubmit={handleUpdateEmpleado} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  disabled
                  value={editingEmpleado.nombre}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Cargo:</label>
                  <select
                    value={editingEmpleado.cargo}
                    onChange={(e) => setEditingEmpleado({ ...editingEmpleado, cargo: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option>Técnico de Instalación Senior</option>
                    <option>Especialista CCTV y Vigilancia</option>
                    <option>Vendedor de Tecnología</option>
                    <option>Ingeniero de Redes y Servidores</option>
                    <option>Administrador de Sistemas</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Estado:</label>
                  <select
                    value={editingEmpleado.estado}
                    onChange={(e) => setEditingEmpleado({ ...editingEmpleado, estado: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="Activo">Activo</option>
                    <option value="En Terreno">En Terreno</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Teléfono:</label>
                  <input
                    type="tel"
                    required
                    value={editingEmpleado.telefono}
                    onChange={(e) => setEditingEmpleado({ ...editingEmpleado, telefono: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Dirección:</label>
                  <input
                    type="text"
                    required
                    value={editingEmpleado.direccion}
                    onChange={(e) => setEditingEmpleado({ ...editingEmpleado, direccion: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEmpleado(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg"
                >
                  Actualizar Empleado (UPDATE)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Pedido Status & Assign Employee */}
      {editingPedido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Gestionar Pedido {editingPedido.numeroPedido}
            </h3>

            <form onSubmit={handleUpdatePedido} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Estado del Pedido:</label>
                  <select
                    value={editingPedido.estado}
                    onChange={(e) => setEditingPedido({ ...editingPedido, estado: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Instalación Programada">Instalación Programada</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Técnico / Responsable:</label>
                  <select
                    value={editingPedido.empleadoId || ''}
                    onChange={(e) => setEditingPedido({ ...editingPedido, empleadoId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="">Seleccione Empleado</option>
                    {empleados.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.nombre} ({emp.cargo})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-slate-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPedido.pagado}
                    onChange={(e) => setEditingPedido({ ...editingPedido, pagado: e.target.checked })}
                    className="w-4 h-4 rounded text-slate-900 accent-slate-900 cursor-pointer"
                  />
                  <span>Marcar como Pagado</span>
                </label>
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
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Producto */}
      {isAddProductoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Agregar Producto al Catálogo (INSERT)</h3>
            <form onSubmit={handleCreateProducto} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Nombre del Producto:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cámara Domo 4K Anti-Vandálica"
                  value={newProd.nombre}
                  onChange={(e) => setNewProd({ ...newProd, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Categoría:</label>
                  <select
                    value={newProd.categoria}
                    onChange={(e) => setNewProd({ ...newProd, categoria: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="Vigilancia">Vigilancia</option>
                    <option value="Hardware">Hardware / Cómputo</option>
                    <option value="Alarmas">Alarmas</option>
                    <option value="Redes">Redes</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Subcategoría:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Cámara PTZ Giratoria"
                    value={newProd.subcategoria}
                    onChange={(e) => setNewProd({ ...newProd, subcategoria: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Precio (COP):</label>
                  <input
                    type="number"
                    required
                    value={newProd.precio}
                    onChange={(e) => setNewProd({ ...newProd, precio: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Stock Disponible:</label>
                  <input
                    type="number"
                    required
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Descripción:</label>
                <textarea
                  rows={2}
                  required
                  value={newProd.descripcion}
                  onChange={(e) => setNewProd({ ...newProd, descripcion: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductoOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg"
                >
                  Insertar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
