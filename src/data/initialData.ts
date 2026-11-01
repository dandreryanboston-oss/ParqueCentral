import { Producto, Empleado, Cliente, Pedido, Factura, CamaraFeed } from '../types';

export const INITIAL_PRODUCTOS: Producto[] = [
  {
    id: 'prod-001',
    codigo: 'CAM-PTZ-4K',
    nombre: 'Cámara PTZ Giratoria 4K UltraHD con Zoom Óptico 30X',
    categoria: 'Vigilancia',
    subcategoria: 'Cámara PTZ Giratoria',
    precio: 1850000,
    stock: 14,
    especificaciones: {
      tipo: 'Domo Giratorio Motorizado 360°',
      resolucion: '4K (3840x2160) @ 60fps',
      zoom: '30X Óptico + 16X Digital',
      visionNocturna: true,
      intensificadorLuz: true,
      conectividad: 'IP PoE+ / ONVIF Perfil S/G/T',
      garantia: '24 Meses Oficial'
    },
    imagenUrl: '/src/assets/images/cctv_ptz_camera_1792897599846.jpg',
    descripcion: 'Cámara domo de alta gama con seguimiento inteligente de objetos por IA, rotación horizontal continua de 360°, intensificador de luz Sony Starvis de ultra bajo lux y visión nocturna infrarroja hasta 150m. Diseñada para exteriores en el clima de Barranquilla.',
    destacado: true
  },
  {
    id: 'prod-002',
    codigo: 'CAM-FIJ-STAR',
    nombre: 'Cámara Bullet Fija IP 5MP ColorVu con Sensor Nocturno',
    categoria: 'Vigilancia',
    subcategoria: 'Cámara Fija',
    precio: 420000,
    stock: 35,
    especificaciones: {
      tipo: 'Bullet Fija Exterior IP67',
      resolucion: '5 Megapíxeles (2560x1920)',
      zoom: 'Lente Fijo 2.8mm Gran Angular 108°',
      visionNocturna: true,
      intensificadorLuz: true,
      conectividad: 'RJ45 PoE 802.3af',
      garantia: '18 Meses'
    },
    imagenUrl: '/src/assets/images/hero_surveillance_tech_1792897599859.jpg',
    descripcion: 'Cámara con tecnología de intensificador de luz a todo color las 24 horas, iluminación suplementaria cálida de 40m, micrófono integrado y carcasa metálica antivandálica.',
    destacado: true
  },
  {
    id: 'prod-003',
    codigo: 'CAM-ANA-TURBO',
    nombre: 'Cámara Domo Analógica HD-TVI 1080p con Zoom Motorizado',
    categoria: 'Vigilancia',
    subcategoria: 'Cámara Analógica HD',
    precio: 185000,
    stock: 50,
    especificaciones: {
      tipo: 'Domo Interior/Exterior Antivandálico',
      resolucion: 'Full HD 1080p (1920x1080)',
      zoom: 'Zoom Motorizado Varifocal 2.8mm - 12mm',
      visionNocturna: true,
      intensificadorLuz: false,
      conectividad: 'BNC Coaxial / Balun UTP',
      garantia: '12 Meses'
    },
    imagenUrl: '/src/assets/images/cctv_ptz_camera_1792897599846.jpg',
    descripcion: 'Excelente para modernizar cableados coaxiales existentes en locales comerciales sin cambiar la infraestructura física de cableado.',
    destacado: false
  },
  {
    id: 'prod-004',
    codigo: 'NVR-64CH-AI',
    nombre: 'Grabador NVR Profesional 64 Canales 4K con IA y 8 Bahías SATA',
    categoria: 'Vigilancia',
    subcategoria: 'Grabador NVR / Servidor',
    precio: 3600000,
    stock: 8,
    especificaciones: {
      tipo: 'Grabador de Red para 64 Cámaras Simultáneas',
      resolucion: 'Soporta hasta 12MP por canal',
      conectividad: 'Doble puerto Gigabit LAN, HDMI 4K independiente',
      almacenamiento: '8 Bahías SATA hasta 16TB c/u (128TB Total)',
      garantia: '36 Meses'
    },
    imagenUrl: '/src/assets/images/hero_surveillance_tech_1792897599859.jpg',
    descripcion: 'El núcleo ideal para el centro de control. Permite visualizar hasta 64 cámaras en vivo en simultáneo desde un solo ordenador o desde la app móvil en tiempo real.',
    destacado: true
  },
  {
    id: 'prod-005',
    codigo: 'ALM-KIT-GSM',
    nombre: 'Kit Alarma Smart Touchscreen GSM/4G + WiFi con Sirena 110dB',
    categoria: 'Alarmas',
    subcategoria: 'Panel de Control Alarma',
    precio: 890000,
    stock: 22,
    especificaciones: {
      tipo: 'Sistema Híbrido Inalámbrico / Cableado',
      conectividad: 'SIM Card 4G LTE + WiFi 2.4GHz + Línea Fija',
      potencia: 'Sirena exterior 110dB con luz estroboscópica',
      garantia: '24 Meses'
    },
    imagenUrl: '/src/assets/images/alarm_system_pack_1792897601222.jpg',
    descripcion: 'Central de alarma inteligente con pantalla táctil de 7 pulgadas a color, soporte para 100 sensores inalámbricos, notificación push a celular, llamadas automáticas a números de emergencia y batería de respaldo.',
    destacado: true
  },
  {
    id: 'prod-006',
    codigo: 'ALM-PIR-PET',
    nombre: 'Sensor Infrarrojo Pasivo PIR Doble Elemento Inmune a Mascotas',
    categoria: 'Alarmas',
    subcategoria: 'Sensor Perimetral / Movimiento',
    precio: 95000,
    stock: 60,
    especificaciones: {
      tipo: 'Detector de movimiento volumétrico',
      alcance: '12 metros con apertura de 90°',
      conectividad: 'Inalámbrico 433/868 MHz encriptado',
      garantia: '12 Meses'
    },
    imagenUrl: '/src/assets/images/alarm_system_pack_1792897601222.jpg',
    descripcion: 'Detector volumétrico inmune a falsas alarmas causadas por mascotas de hasta 25 kg. Ideal para residencias y almacenes con roedores o mascotas.',
    destacado: false
  },
  {
    id: 'prod-007',
    codigo: 'PC-WORK-PRO',
    nombre: 'Workstation Torre Intel Core i7 14ª Gen / 32GB RAM / 1TB SSD NVMe',
    categoria: 'Hardware',
    subcategoria: 'Ordenadores y Servidores',
    precio: 4890000,
    stock: 10,
    especificaciones: {
      procesador: 'Intel Core i7-14700 20 Núcleos',
      ram: '32GB DDR5 5600MHz Kingston Fury',
      almacenamiento: '1TB SSD M.2 NVMe PCIe 4.0 (7000 MB/s)',
      grafica: 'NVIDIA RTX 4060 8GB GDDR6',
      garantia: '36 Meses con Mantenimiento Incluido'
    },
    imagenUrl: '/src/assets/images/tech_hardware_pc_1792897600516.jpg',
    descripcion: 'Equipo de cómputo de alto rendimiento optimizado para central de monitoreo CCTV 64 canales, análisis de video en tiempo real, arquitectura y trabajo empresarial pesado.',
    destacado: true
  },
  {
    id: 'prod-008',
    codigo: 'IMP-LASER-MFP',
    nombre: 'Impresora Multifuncional Láser Monocromática de Alta Velocidad 42 ppm',
    categoria: 'Hardware',
    subcategoria: 'Impresoras y Escáneres',
    precio: 1650000,
    stock: 16,
    especificaciones: {
      velocidad: '42 páginas por minuto',
      funciones: 'Impresión dúplex automática, escaneo a red, copia',
      conectividad: 'Ethernet Gigabit, WiFi Direct, USB 3.0',
      rendimiento: 'Tóner de alto rendimiento hasta 10.000 páginas'
    },
    imagenUrl: '/src/assets/images/tech_hardware_pc_1792897600516.jpg',
    descripcion: 'Impresora robusta para facturación y documentación continua en puntos de venta y centros administrativos.',
    destacado: false
  },
  {
    id: 'prod-009',
    codigo: 'HDD-PURPLE-8TB',
    nombre: 'Disco Duro Especializado para Vigilancia 24/7 8TB SATA 256MB',
    categoria: 'Hardware',
    subcategoria: 'Discos Duros y Almacenamiento',
    precio: 1120000,
    stock: 25,
    especificaciones: {
      capacidad: '8 Terabytes (8000 GB)',
      interfaz: 'SATA III 6Gb/s, 7200 RPM, 256MB Cache',
      tipo: 'WD Purple / Seagate SkyHawk Vigilancia 24/7',
      garantia: '36 Meses'
    },
    imagenUrl: '/src/assets/images/tech_hardware_pc_1792897600516.jpg',
    descripcion: 'Diseñado específicamente para soportar cargas de escritura continua de hasta 64 transmisiones de video HD sin pérdidas de cuadros.',
    destacado: false
  },
  {
    id: 'prod-010',
    codigo: 'SW-POE-24G',
    nombre: 'Switch Administrable Gigabit PoE+ 24 Puertos 370W con 4 SFP',
    categoria: 'Redes',
    subcategoria: 'Switches y Routing',
    precio: 1980000,
    stock: 12,
    especificaciones: {
      puertos: '24 x 10/100/1000 Mbps PoE+ 802.3at/af',
      uplinks: '4 Puertos SFP Fibra Óptica 1.25G',
      presupuestoPoE: '370 Watts totales',
      administracion: 'VLAN, QoS, IGMP Snooping, SNMP'
    },
    imagenUrl: '/src/assets/images/hero_surveillance_tech_1792897599859.jpg',
    descripcion: 'Switches para montaje en rack de 19 pulgadas. Suministra energía y datos a cámaras IP y puntos de acceso a distancias de hasta 250 metros en modo extendido.',
    destacado: false
  }
];

export const INITIAL_EMPLEADOS: Empleado[] = [
  {
    id: 'emp-001',
    codigo: 'EMP-0101',
    nombre: 'Carlos Mario Mendoza Orozco',
    cargo: 'Técnico de Instalación Senior',
    documento: '72.245.890',
    telefono: '301-458-9921',
    email: 'carlos.mendoza@parquecentraltech.com',
    fechaContratacion: '2022-03-15',
    estado: 'Activo',
    direccion: 'Carrera 44 # 68-30, Barrio Boston, Barranquilla'
  },
  {
    id: 'emp-002',
    codigo: 'EMP-0102',
    nombre: 'Valentina Sofía Charry Morales',
    cargo: 'Especialista CCTV y Vigilancia',
    documento: '1.045.789.231',
    telefono: '315-782-4410',
    email: 'valentina.charry@parquecentraltech.com',
    fechaContratacion: '2023-01-10',
    estado: 'En Terreno',
    direccion: 'Calle 84 # 51B-12, Barrio Alto Prado, Barranquilla'
  },
  {
    id: 'emp-003',
    codigo: 'EMP-0103',
    nombre: 'Andrés Felipe De la Rosa',
    cargo: 'Vendedor de Tecnología',
    documento: '8.541.229',
    telefono: '300-891-3345',
    email: 'andres.delarosa@parquecentraltech.com',
    fechaContratacion: '2021-08-20',
    estado: 'Activo',
    direccion: 'Parque Central Local 14B, Barranquilla'
  },
  {
    id: 'emp-004',
    codigo: 'EMP-0104',
    nombre: 'Ing. Javier Enrique Salcedo',
    cargo: 'Ingeniero de Redes y Servidores',
    documento: '1.140.892.114',
    telefono: '318-632-1178',
    email: 'javier.salcedo@parquecentraltech.com',
    fechaContratacion: '2020-05-02',
    estado: 'Activo',
    direccion: 'Calle 72 # 54-80, El Prado, Barranquilla'
  },
  {
    id: 'emp-005',
    codigo: 'EMP-0105',
    nombre: 'Diana Marcela Barros Polo',
    cargo: 'Administrador de Sistemas',
    documento: '1.047.332.990',
    telefono: '320-554-8890',
    email: 'admin@parquecentraltech.com',
    fechaContratacion: '2019-11-01',
    estado: 'Activo',
    direccion: 'Carrera 53 # 76-115, Barranquilla'
  }
];

export const INITIAL_CLIENTES: Cliente[] = [
  {
    id: 'cli-001',
    codigo: 'CLI-5001',
    documento: '900.584.210-4',
    tipoDoc: 'NIT',
    nombreRazonSocial: 'Distribuciones del Caribe S.A.S.',
    telefono: '300-671-8899',
    email: 'compras@districaribe.com.co',
    direccion: 'Calle 30 # 45-12, Centro, Barranquilla',
    ciudad: 'Barranquilla',
    tipo: 'Empresarial',
    fechaRegistro: '2024-02-14'
  },
  {
    id: 'cli-002',
    codigo: 'CLI-5002',
    documento: '1.140.556.782',
    tipoDoc: 'CC',
    nombreRazonSocial: 'Dra. Patricia Esther Navarro Peña',
    telefono: '316-442-9988',
    email: 'patricia.navarro@clinicaelprado.com',
    direccion: 'Carrera 58 # 70-45, Barrio El Prado, Barranquilla',
    ciudad: 'Barranquilla',
    tipo: 'Residencial',
    fechaRegistro: '2025-06-10'
  },
  {
    id: 'cli-003',
    codigo: 'CLI-5003',
    documento: '800.145.992-1',
    tipoDoc: 'NIT',
    nombreRazonSocial: 'Centro Comercial Parque Central Locales 1-20',
    telefono: '301-889-4455',
    email: 'administracion@ccparquecentral.com',
    direccion: 'Calle 50 # 43-28, Parque Central, Barranquilla',
    ciudad: 'Barranquilla',
    tipo: 'Comercial',
    fechaRegistro: '2023-01-18'
  },
  {
    id: 'cli-004',
    codigo: 'CLI-5004',
    documento: '72.339.811',
    tipoDoc: 'CC',
    nombreRazonSocial: 'Ing. Rodrigo Caballero Meza',
    telefono: '310-221-7766',
    email: 'rodrigo.caballero@gmail.com',
    direccion: 'Calle 98 # 52-118, Riomar, Barranquilla',
    ciudad: 'Barranquilla',
    tipo: 'Residencial',
    fechaRegistro: '2026-03-01'
  }
];

export const INITIAL_PEDIDOS: Pedido[] = [
  {
    id: 'ped-001',
    numeroPedido: 'PED-2026-0041',
    fecha: '2026-10-22 09:30',
    clienteId: 'cli-003',
    empleadoId: 'emp-002',
    estado: 'Completado',
    items: [
      {
        productoId: 'prod-001',
        productoNombre: 'Cámara PTZ Giratoria 4K UltraHD con Zoom Óptico 30X',
        productoCodigo: 'CAM-PTZ-4K',
        cantidad: 4,
        precioUnitario: 1850000,
        subtotal: 7400000
      },
      {
        productoId: 'prod-004',
        productoNombre: 'Grabador NVR Profesional 64 Canales 4K con IA y 8 Bahías SATA',
        productoCodigo: 'NVR-64CH-AI',
        cantidad: 1,
        precioUnitario: 3600000,
        subtotal: 3600000
      },
      {
        productoId: 'prod-009',
        productoNombre: 'Disco Duro Especializado para Vigilancia 24/7 8TB SATA 256MB',
        productoCodigo: 'HDD-PURPLE-8TB',
        cantidad: 4,
        precioUnitario: 1120000,
        subtotal: 4480000
      }
    ],
    subtotal: 15480000,
    iva: 2941200,
    total: 18421200,
    notasInstalacion: 'Instalación en postes del perímetro norte y pasillo central del C.C. Parque Central. Conexión de fibra óptica.',
    metodoPago: 'Transferencia Bancolombia / Nequi',
    pagado: true,
    facturaGeneradaId: 'fac-001'
  },
  {
    id: 'ped-002',
    numeroPedido: 'PED-2026-0042',
    fecha: '2026-10-23 14:15',
    clienteId: 'cli-001',
    empleadoId: 'emp-001',
    estado: 'Instalación Programada',
    items: [
      {
        productoId: 'prod-005',
        productoNombre: 'Kit Alarma Smart Touchscreen GSM/4G + WiFi con Sirena 110dB',
        productoCodigo: 'ALM-KIT-GSM',
        cantidad: 2,
        precioUnitario: 890000,
        subtotal: 1780000
      },
      {
        productoId: 'prod-006',
        productoNombre: 'Sensor Infrarrojo Pasivo PIR Doble Elemento Inmune a Mascotas',
        productoCodigo: 'ALM-PIR-PET',
        cantidad: 6,
        precioUnitario: 95000,
        subtotal: 570000
      }
    ],
    subtotal: 2350000,
    iva: 446500,
    total: 2796500,
    notasInstalacion: 'Programado para el lunes 27 de octubre a las 8:00 AM en bodega centro.',
    metodoPago: 'Tarjeta Crédito / Débito',
    pagado: true,
    facturaGeneradaId: 'fac-002'
  },
  {
    id: 'ped-003',
    numeroPedido: 'PED-2026-0043',
    fecha: '2026-10-24 11:00',
    clienteId: 'cli-002',
    empleadoId: 'emp-003',
    estado: 'Pendiente',
    items: [
      {
        productoId: 'prod-007',
        productoNombre: 'Workstation Torre Intel Core i7 14ª Gen / 32GB RAM / 1TB SSD NVMe',
        productoCodigo: 'PC-WORK-PRO',
        cantidad: 1,
        precioUnitario: 4890000,
        subtotal: 4890000
      },
      {
        productoId: 'prod-008',
        productoNombre: 'Impresora Multifuncional Láser Monocromática de Alta Velocidad 42 ppm',
        productoCodigo: 'IMP-LASER-MFP',
        cantidad: 1,
        precioUnitario: 1650000,
        subtotal: 1650000
      }
    ],
    subtotal: 6540000,
    iva: 1242600,
    total: 7782600,
    notasInstalacion: 'Despacho y configuración en consultorio médico en El Prado.',
    metodoPago: 'Transferencia Bancolombia / Nequi',
    pagado: false
  }
];

export const INITIAL_FACTURAS: Factura[] = [
  {
    id: 'fac-001',
    numeroFactura: 'FE-BAQ-00189',
    pedidoId: 'ped-001',
    fechaEmision: '2026-10-22 17:00',
    clienteId: 'cli-003',
    empleadoId: 'emp-002',
    subtotal: 15480000,
    iva: 2941200,
    retencionFuente: 387000,
    total: 17975400,
    estadoPago: 'Pagada',
    codigoResolucionDIAN: 'DIAN No. 18764000293 de 2026-01-15 (Rango FE-BAQ-0001 a 10000)'
  },
  {
    id: 'fac-002',
    numeroFactura: 'FE-BAQ-00190',
    pedidoId: 'ped-002',
    fechaEmision: '2026-10-23 16:30',
    clienteId: 'cli-001',
    empleadoId: 'emp-001',
    subtotal: 2350000,
    iva: 446500,
    retencionFuente: 58750,
    total: 2737750,
    estadoPago: 'Pagada',
    codigoResolucionDIAN: 'DIAN No. 18764000293 de 2026-01-15 (Rango FE-BAQ-0001 a 10000)'
  }
];

export const INITIAL_CAMARAS: CamaraFeed[] = Array.from({ length: 64 }, (_, index) => {
  const id = index + 1;
  const isPtz = id % 4 === 1;
  const isAnalog = id % 5 === 0;
  const isDigital = !isPtz && !isAnalog;

  const locations = [
    'Parque Central - Acceso Principal Calle 50',
    'Parque Central - Pasillo Tecnológico Norte',
    'Parque Central - Zona Bancaria y Cajeros',
    'Parque Central - Parqueadero Subterráneo Nivel 1',
    'Parque Central - Plazoleta Comercial y Comidas',
    'Showroom - Vitrina Tecnológica Workstations',
    'Showroom - Módulo de Pruebas de Cámaras 4K',
    'Laboratorio IMEI - Banco de Mantenimiento PC',
    'Bodega Principal - Pasillo 1 Discos y Servidores',
    'Bodega Principal - Pasillo 2 Sistemas de Alarmas',
    'Parque Central - Bahía de Despacho y Logística',
    'Control Central - Rack NVR y Servidor 64CH',
    'Barranquilla - Perímetro Paseo Bolívar',
    'Barranquilla - Vía 40 Acceso Logístico',
    'Barranquilla - Murillo con Carrera 44',
    'Barranquilla - Corredor Universitario Norte'
  ];

  const loc = locations[index % locations.length] + ` (Punto #${Math.floor(index / locations.length) + 1})`;

  return {
    id,
    nombre: `CÁMARA-${id.toString().padStart(2, '0')}: ${loc.split('-')[0].trim()}`,
    ubicacion: loc,
    tipo: isPtz ? 'PTZ Giratoria' : isAnalog ? 'Analógica HD' : 'Digital IP 4K',
    resolucion: isPtz ? '4K 3840x2160' : isDigital ? '5MP 2560x1920' : '1080p Full HD',
    fps: 30,
    estado: id === 3 || id === 14 ? 'Alerta Movimiento' : id % 2 === 0 ? 'Grabando' : 'En Línea',
    zoomOptico: isPtz ? '30X' : isDigital ? '4X Varifocal' : 'Fijo 2.8mm',
    tieneLuzIntensificada: id % 3 !== 0
  };
});
