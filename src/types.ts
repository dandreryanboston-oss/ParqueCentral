export type CategoriaProducto = 'Vigilancia' | 'Hardware' | 'Alarmas' | 'Redes';

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  categoria: CategoriaProducto;
  subcategoria: string;
  precio: number;
  stock: number;
  especificaciones: {
    tipo?: string;
    resolucion?: string;
    zoom?: string;
    visionNocturna?: boolean;
    intensificadorLuz?: boolean;
    conectividad?: string;
    garantia?: string;
    potencia?: string;
    almacenamiento?: string;
    alcance?: string;
    procesador?: string;
    ram?: string;
    grafica?: string;
    velocidad?: string;
    funciones?: string;
    rendimiento?: string;
    capacidad?: string;
    interfaz?: string;
    puertos?: string;
    uplinks?: string;
    presupuestoPoE?: string;
    administracion?: string;
    [key: string]: any;
  };
  imagenUrl: string;
  descripcion: string;
  destacado?: boolean;
}

export type RolEmpleado = 
  | 'Administrador de Sistemas'
  | 'Técnico de Instalación Senior'
  | 'Especialista CCTV y Vigilancia'
  | 'Vendedor de Tecnología'
  | 'Ingeniero de Redes y Servidores';

export interface Empleado {
  id: string;
  codigo: string;
  nombre: string;
  cargo: RolEmpleado;
  documento: string;
  telefono: string;
  email: string;
  fechaContratacion: string;
  estado: 'Activo' | 'En Terreno' | 'Inactivo';
  direccion: string;
}

export interface Cliente {
  id: string;
  codigo: string;
  documento: string;
  tipoDoc: 'CC' | 'NIT' | 'CE';
  nombreRazonSocial: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  tipo: 'Empresarial' | 'Residencial' | 'Comercial';
  fechaRegistro: string;
}

export type EstadoPedido = 
  | 'Pendiente'
  | 'En Proceso'
  | 'Instalación Programada'
  | 'Completado'
  | 'Cancelado';

export interface ItemPedido {
  productoId: string;
  productoNombre: string;
  productoCodigo: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Pedido {
  id: string;
  numeroPedido: string;
  fecha: string;
  clienteId: string;
  empleadoId?: string;
  estado: EstadoPedido;
  items: ItemPedido[];
  subtotal: number;
  iva: number; // 19%
  total: number;
  notasInstalacion?: string;
  metodoPago: 'Transferencia Bancolombia / Nequi' | 'Tarjeta Crédito / Débito' | 'Efectivo en Parque Central' | 'Crédito Empresarial 30 Días';
  pagado: boolean;
  facturaGeneradaId?: string;
}

export interface Factura {
  id: string;
  numeroFactura: string;
  pedidoId: string;
  fechaEmision: string;
  clienteId: string;
  empleadoId?: string;
  subtotal: number;
  iva: number;
  retencionFuente?: number;
  total: number;
  estadoPago: 'Pagada' | 'Pendiente' | 'Anulada';
  codigoResolucionDIAN: string;
}

export interface CamaraFeed {
  id: number;
  nombre: string;
  ubicacion: string;
  tipo: 'Fija' | 'PTZ Giratoria' | 'Digital IP 4K' | 'Analógica HD';
  resolucion: string;
  fps: number;
  estado: 'En Línea' | 'Grabando' | 'Alerta Movimiento';
  zoomOptico: string;
  tieneLuzIntensificada: boolean;
  videoPlaceholderUrl?: string;
}

export interface SqlQueryLog {
  id: string;
  timestamp: string;
  tipo: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'EXEC SP';
  tabla: string;
  query: string;
  parametros?: Record<string, any>;
}
