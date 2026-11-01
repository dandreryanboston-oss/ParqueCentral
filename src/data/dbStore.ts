import { 
  Producto, Empleado, Cliente, Pedido, Factura, CamaraFeed, SqlQueryLog 
} from '../types';
import { 
  INITIAL_PRODUCTOS, INITIAL_EMPLEADOS, INITIAL_CLIENTES, 
  INITIAL_PEDIDOS, INITIAL_FACTURAS, INITIAL_CAMARAS 
} from './initialData';

const STORAGE_KEY_PREFIX = 'parque_central_tech_';

type Listener = () => void;

class DatabaseStore {
  private productos: Producto[] = [];
  private empleados: Empleado[] = [];
  private clientes: Cliente[] = [];
  private pedidos: Pedido[] = [];
  private facturas: Factura[] = [];
  private camaras: CamaraFeed[] = [];
  private sqlLogs: SqlQueryLog[] = [];
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedProds = localStorage.getItem(`${STORAGE_KEY_PREFIX}productos`);
      this.productos = storedProds ? JSON.parse(storedProds) : INITIAL_PRODUCTOS;

      const storedEmps = localStorage.getItem(`${STORAGE_KEY_PREFIX}empleados`);
      this.empleados = storedEmps ? JSON.parse(storedEmps) : INITIAL_EMPLEADOS;

      const storedClis = localStorage.getItem(`${STORAGE_KEY_PREFIX}clientes`);
      this.clientes = storedClis ? JSON.parse(storedClis) : INITIAL_CLIENTES;

      const storedPeds = localStorage.getItem(`${STORAGE_KEY_PREFIX}pedidos`);
      this.pedidos = storedPeds ? JSON.parse(storedPeds) : INITIAL_PEDIDOS;

      const storedFacs = localStorage.getItem(`${STORAGE_KEY_PREFIX}facturas`);
      this.facturas = storedFacs ? JSON.parse(storedFacs) : INITIAL_FACTURAS;

      const storedLogs = localStorage.getItem(`${STORAGE_KEY_PREFIX}sqllogs`);
      this.sqlLogs = storedLogs ? JSON.parse(storedLogs) : [];

      this.camaras = INITIAL_CAMARAS;

      if (this.sqlLogs.length === 0) {
        this.logSql(
          'SELECT',
          'tbl_Sistema',
          '-- Inicialización de conexión a Base de Datos SQL Server (Localhost Visual Studio 202X)\nUSE BD_ParqueCentralTech;\nSELECT @@VERSION AS SQL_Server_Version, GETDATE() AS FechaServidor;'
        );
      }
    } catch {
      this.productos = INITIAL_PRODUCTOS;
      this.empleados = INITIAL_EMPLEADOS;
      this.clientes = INITIAL_CLIENTES;
      this.pedidos = INITIAL_PEDIDOS;
      this.facturas = INITIAL_FACTURAS;
      this.camaras = INITIAL_CAMARAS;
    }
  }

  private persist(key: string, data: any) {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage quota exceeded or private mode', e);
    }
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public subscribe(cb: Listener): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public logSql(tipo: SqlQueryLog['tipo'], tabla: string, query: string, parametros?: Record<string, any>) {
    const log: SqlQueryLog = {
      id: `sql-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString('es-CO', { hour12: false }),
      tipo,
      tabla,
      query,
      parametros
    };
    this.sqlLogs = [log, ...this.sqlLogs.slice(0, 49)];
    this.persist('sqllogs', this.sqlLogs);
    this.notify();
  }

  public getSqlLogs(): SqlQueryLog[] {
    return this.sqlLogs;
  }

  public clearSqlLogs() {
    this.sqlLogs = [];
    this.persist('sqllogs', []);
    this.notify();
  }

  // --- PRODUCTOS CRUD ---
  public getProductos(): Producto[] {
    return [...this.productos];
  }

  public addProducto(producto: Omit<Producto, 'id' | 'codigo'> & { codigo?: string }): Producto {
    const id = `prod-${Date.now().toString().slice(-4)}`;
    const codigo = producto.codigo || `PRD-${Math.floor(1000 + Math.random() * 9000)}`;
    const nuevo: Producto = { ...producto, id, codigo };
    this.productos = [nuevo, ...this.productos];
    this.persist('productos', this.productos);

    this.logSql(
      'INSERT',
      'tbl_Productos',
      `INSERT INTO tbl_Productos (Codigo, Nombre, Categoria, Subcategoria, Precio, Stock, Descripcion, ImagenUrl)\nVALUES ('${codigo}', '${nuevo.nombre.replace(/'/g, "''")}', '${nuevo.categoria}', '${nuevo.subcategoria}', ${nuevo.precio}, ${nuevo.stock}, '${nuevo.descripcion.replace(/'/g, "''")}', '${nuevo.imagenUrl}');`,
      { codigo, nombre: nuevo.nombre, precio: nuevo.precio }
    );

    this.notify();
    return nuevo;
  }

  public updateProducto(id: string, updates: Partial<Producto>): Producto {
    this.productos = this.productos.map(p => p.id === id ? { ...p, ...updates } : p);
    this.persist('productos', this.productos);

    const updated = this.productos.find(p => p.id === id)!;
    this.logSql(
      'UPDATE',
      'tbl_Productos',
      `UPDATE tbl_Productos\nSET Nombre = '${updated.nombre.replace(/'/g, "''")}', Precio = ${updated.precio}, Stock = ${updated.stock}\nWHERE Id = '${id}' OR Codigo = '${updated.codigo}';`,
      updates
    );

    this.notify();
    return updated;
  }

  public deleteProducto(id: string) {
    const item = this.productos.find(p => p.id === id);
    this.productos = this.productos.filter(p => p.id !== id);
    this.persist('productos', this.productos);

    this.logSql(
      'DELETE',
      'tbl_Productos',
      `DELETE FROM tbl_Productos WHERE Id = '${id}' /* ${item?.nombre || ''} */;`
    );

    this.notify();
  }

  // --- EMPLEADOS CRUD ---
  public getEmpleados(): Empleado[] {
    return [...this.empleados];
  }

  public addEmpleado(data: Omit<Empleado, 'id' | 'codigo'>): Empleado {
    const id = `emp-${Date.now().toString().slice(-4)}`;
    const nextNum = (this.empleados.length + 101).toString().padStart(4, '0');
    const codigo = `EMP-${nextNum}`;
    const nuevo: Empleado = { ...data, id, codigo };

    this.empleados = [nuevo, ...this.empleados];
    this.persist('empleados', this.empleados);

    this.logSql(
      'INSERT',
      'tbl_Empleados',
      `INSERT INTO tbl_Empleados (Codigo, Nombre, Cargo, Documento, Telefono, Email, FechaContratacion, Estado, Direccion)\nVALUES ('${codigo}', '${nuevo.nombre}', '${nuevo.cargo}', '${nuevo.documento}', '${nuevo.telefono}', '${nuevo.email}', '${nuevo.fechaContratacion}', '${nuevo.estado}', '${nuevo.direccion}');`,
      { codigo, nombre: nuevo.nombre, cargo: nuevo.cargo }
    );

    this.notify();
    return nuevo;
  }

  public updateEmpleado(id: string, updates: Partial<Empleado>): Empleado {
    this.empleados = this.empleados.map(e => e.id === id ? { ...e, ...updates } : e);
    this.persist('empleados', this.empleados);

    const emp = this.empleados.find(e => e.id === id)!;
    this.logSql(
      'UPDATE',
      'tbl_Empleados',
      `UPDATE tbl_Empleados\nSET Cargo = '${emp.cargo}', Telefono = '${emp.telefono}', Estado = '${emp.estado}', Email = '${emp.email}'\nWHERE Id = '${id}';`,
      updates
    );

    this.notify();
    return emp;
  }

  public deleteEmpleado(id: string) {
    const emp = this.empleados.find(e => e.id === id);
    this.empleados = this.empleados.filter(e => e.id !== id);
    this.persist('empleados', this.empleados);

    this.logSql(
      'DELETE',
      'tbl_Empleados',
      `DELETE FROM tbl_Empleados WHERE Id = '${id}' /* Borrado: ${emp?.nombre} - ${emp?.cargo} */;`
    );

    this.notify();
  }

  // --- CLIENTES CRUD ---
  public getClientes(): Cliente[] {
    return [...this.clientes];
  }

  public addCliente(data: Omit<Cliente, 'id' | 'codigo'>): Cliente {
    const id = `cli-${Date.now().toString().slice(-4)}`;
    const nextNum = (this.clientes.length + 5001).toString();
    const codigo = `CLI-${nextNum}`;
    const nuevo: Cliente = { ...data, id, codigo };

    this.clientes = [nuevo, ...this.clientes];
    this.persist('clientes', this.clientes);

    this.logSql(
      'INSERT',
      'tbl_Clientes',
      `INSERT INTO tbl_Clientes (Codigo, Documento, TipoDoc, NombreRazonSocial, Telefono, Email, Direccion, Ciudad, Tipo, FechaRegistro)\nVALUES ('${codigo}', '${nuevo.documento}', '${nuevo.tipoDoc}', '${nuevo.nombreRazonSocial}', '${nuevo.telefono}', '${nuevo.email}', '${nuevo.direccion}', '${nuevo.ciudad}', '${nuevo.tipo}', '${nuevo.fechaRegistro}');`,
      { codigo, cliente: nuevo.nombreRazonSocial }
    );

    this.notify();
    return nuevo;
  }

  public updateCliente(id: string, updates: Partial<Cliente>): Cliente {
    this.clientes = this.clientes.map(c => c.id === id ? { ...c, ...updates } : c);
    this.persist('clientes', this.clientes);

    const cli = this.clientes.find(c => c.id === id)!;
    this.logSql(
      'UPDATE',
      'tbl_Clientes',
      `UPDATE tbl_Clientes\nSET NombreRazonSocial = '${cli.nombreRazonSocial}', Telefono = '${cli.telefono}', Direccion = '${cli.direccion}', Email = '${cli.email}'\nWHERE Id = '${id}';`,
      updates
    );

    this.notify();
    return cli;
  }

  public deleteCliente(id: string) {
    const cli = this.clientes.find(c => c.id === id);
    this.clientes = this.clientes.filter(c => c.id !== id);
    this.persist('clientes', this.clientes);

    this.logSql(
      'DELETE',
      'tbl_Clientes',
      `DELETE FROM tbl_Clientes WHERE Id = '${id}' /* Borrado: ${cli?.nombreRazonSocial} */;`
    );

    this.notify();
  }

  // --- PEDIDOS CRUD ---
  public getPedidos(): Pedido[] {
    return [...this.pedidos];
  }

  public createPedido(data: {
    clienteId: string;
    empleadoId?: string;
    items: { productoId: string; cantidad: number }[];
    notasInstalacion?: string;
    metodoPago: Pedido['metodoPago'];
  }): Pedido {
    const id = `ped-${Date.now().toString().slice(-4)}`;
    const nextPedNum = `PED-2026-${(this.pedidos.length + 44).toString().padStart(4, '0')}`;
    const now = new Date();
    const fecha = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })}`;

    let subtotal = 0;
    const itemsFormatted = data.items.map(it => {
      const prod = this.productos.find(p => p.id === it.productoId);
      const precioUnitario = prod ? prod.precio : 100000;
      const lineaSubtotal = precioUnitario * it.cantidad;
      subtotal += lineaSubtotal;

      // Decrement stock in store
      if (prod) {
        this.updateProducto(prod.id, { stock: Math.max(0, prod.stock - it.cantidad) });
      }

      return {
        productoId: it.productoId,
        productoNombre: prod ? prod.nombre : 'Producto Tecnológico',
        productoCodigo: prod ? prod.codigo : 'TECH',
        cantidad: it.cantidad,
        precioUnitario,
        subtotal: lineaSubtotal
      };
    });

    const iva = Math.round(subtotal * 0.19);
    const total = subtotal + iva;

    const nuevoPedido: Pedido = {
      id,
      numeroPedido: nextPedNum,
      fecha,
      clienteId: data.clienteId,
      empleadoId: data.empleadoId || 'emp-001',
      estado: 'Pendiente',
      items: itemsFormatted,
      subtotal,
      iva,
      total,
      notasInstalacion: data.notasInstalacion || 'Instalación y configuración en Parque Central Barranquilla',
      metodoPago: data.metodoPago,
      pagado: false
    };

    this.pedidos = [nuevoPedido, ...this.pedidos];
    this.persist('pedidos', this.pedidos);

    this.logSql(
      'EXEC SP',
      'tbl_Pedidos',
      `-- Ejecución de Stored Procedure sp_CrearPedidoConDetalle\nEXEC sp_CrearPedido \n  @NumeroPedido = '${nextPedNum}',\n  @ClienteId = '${data.clienteId}',\n  @EmpleadoId = '${data.empleadoId || 'emp-001'}',\n  @Subtotal = ${subtotal},\n  @IVA = ${iva},\n  @Total = ${total},\n  @MetodoPago = '${data.metodoPago}';\n\n-- Inserción en tbl_DetallePedido (${itemsFormatted.length} líneas)`,
      { numeroPedido: nextPedNum, total }
    );

    this.notify();
    return nuevoPedido;
  }

  public updatePedido(id: string, updates: Partial<Pedido>): Pedido {
    this.pedidos = this.pedidos.map(p => p.id === id ? { ...p, ...updates } : p);
    this.persist('pedidos', this.pedidos);

    const ped = this.pedidos.find(p => p.id === id)!;
    this.logSql(
      'UPDATE',
      'tbl_Pedidos',
      `UPDATE tbl_Pedidos\nSET Estado = '${ped.estado}', EmpleadoId = '${ped.empleadoId || ''}', Pagado = ${ped.pagado ? 1 : 0}, NotasInstalacion = '${(ped.notasInstalacion || '').replace(/'/g, "''")}'\nWHERE Id = '${id}' OR NumeroPedido = '${ped.numeroPedido}';`,
      updates
    );

    this.notify();
    return ped;
  }

  public deletePedido(id: string) {
    const ped = this.pedidos.find(p => p.id === id);
    this.pedidos = this.pedidos.filter(p => p.id !== id);
    this.persist('pedidos', this.pedidos);

    this.logSql(
      'DELETE',
      'tbl_Pedidos',
      `-- Borrado en cascada de Pedido y Detalle\nDELETE FROM tbl_DetallePedido WHERE PedidoId = '${id}';\nDELETE FROM tbl_Pedidos WHERE Id = '${id}' /* ${ped?.numeroPedido} */;`
    );

    this.notify();
  }

  public pagarPedido(id: string): Pedido {
    const ped = this.updatePedido(id, { pagado: true, estado: 'En Proceso' });
    this.logSql(
      'UPDATE',
      'tbl_Pedidos',
      `UPDATE tbl_Pedidos SET Pagado = 1, Estado = 'En Proceso' WHERE Id = '${id}';`
    );
    return ped;
  }

  // --- FACTURAS ---
  public getFacturas(): Factura[] {
    return [...this.facturas];
  }

  public generarFactura(pedidoId: string): Factura {
    const ped = this.pedidos.find(p => p.id === pedidoId);
    if (!ped) throw new Error('Pedido no encontrado');

    const nextFacNum = `FE-BAQ-${(this.facturas.length + 191).toString().padStart(5, '0')}`;
    const id = `fac-${Date.now().toString().slice(-4)}`;
    const now = new Date();
    const fechaEmision = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })}`;

    const retencionFuente = Math.round(ped.subtotal * 0.025); // 2.5% ReteFuente comercial
    const totalFactura = ped.subtotal + ped.iva - retencionFuente;

    const nuevaFac: Factura = {
      id,
      numeroFactura: nextFacNum,
      pedidoId,
      fechaEmision,
      clienteId: ped.clienteId,
      empleadoId: ped.empleadoId,
      subtotal: ped.subtotal,
      iva: ped.iva,
      retencionFuente,
      total: totalFactura,
      estadoPago: ped.pagado ? 'Pagada' : 'Pendiente',
      codigoResolucionDIAN: 'DIAN No. 18764000293 de 2026-01-15 (Rango FE-BAQ-0001 a 10000)'
    };

    this.facturas = [nuevaFac, ...this.facturas];
    this.persist('facturas', this.facturas);

    // Link factura to pedido
    this.updatePedido(pedidoId, { facturaGeneradaId: id, estado: ped.estado === 'Pendiente' ? 'En Proceso' : ped.estado });

    this.logSql(
      'INSERT',
      'tbl_Facturas',
      `-- Emisión de Factura Electrónica DIAN para Barranquilla\nINSERT INTO tbl_Facturas (NumeroFactura, PedidoId, FechaEmision, ClienteId, Subtotal, IVA, RetencionFuente, Total, EstadoPago, ResolucionDIAN)\nVALUES ('${nextFacNum}', '${pedidoId}', '${fechaEmision}', '${ped.clienteId}', ${ped.subtotal}, ${ped.iva}, ${retencionFuente}, ${totalFactura}, '${nuevaFac.estadoPago}', '${nuevaFac.codigoResolucionDIAN}');`,
      { numeroFactura: nextFacNum, totalFactura }
    );

    this.notify();
    return nuevaFac;
  }

  // --- CAMARAS ---
  public getCamaras(): CamaraFeed[] {
    return this.camaras;
  }

  // Reset database to initial exam state
  public resetToFactory() {
    this.productos = INITIAL_PRODUCTOS;
    this.empleados = INITIAL_EMPLEADOS;
    this.clientes = INITIAL_CLIENTES;
    this.pedidos = INITIAL_PEDIDOS;
    this.facturas = INITIAL_FACTURAS;
    this.camaras = INITIAL_CAMARAS;
    this.sqlLogs = [];

    this.persist('productos', this.productos);
    this.persist('empleados', this.empleados);
    this.persist('clientes', this.clientes);
    this.persist('pedidos', this.pedidos);
    this.persist('facturas', this.facturas);
    this.persist('sqllogs', []);

    this.logSql(
      'EXEC SP',
      'Database',
      '-- Restauración completa de BD_ParqueCentralTech a valores por defecto del examen\nEXEC sp_RestaurarBaseDatosExamen;'
    );

    this.notify();
  }
}

export const dbStore = new DatabaseStore();
