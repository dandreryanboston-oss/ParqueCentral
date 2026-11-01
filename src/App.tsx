import React, { useState, useEffect } from 'react';
import { dbStore } from './data/dbStore';
import { 
  Producto, Empleado, Cliente, Pedido, Factura, SqlQueryLog 
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SqlInspectorDrawer } from './components/SqlInspectorDrawer';
import { InvoiceModal } from './components/InvoiceModal';
import { CctvMonitorModal } from './components/CctvMonitorModal';
import { HomePage } from './pages/HomePage';
import { AlarmasPage } from './pages/AlarmasPage';
import { SvcPage } from './pages/SvcPage';
import { ImeiPage } from './pages/ImeiPage';
import { ClientZonePage } from './pages/ClientZonePage';
import { AdminZonePage } from './pages/AdminZonePage';
import { AspNetSolutionPage } from './pages/AspNetSolutionPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Reactive DB states
  const [productos, setProductos] = useState<Producto[]>(dbStore.getProductos());
  const [empleados, setEmpleados] = useState<Empleado[]>(dbStore.getEmpleados());
  const [clientes, setClientes] = useState<Cliente[]>(dbStore.getClientes());
  const [pedidos, setPedidos] = useState<Pedido[]>(dbStore.getPedidos());
  const [facturas, setFacturas] = useState<Factura[]>(dbStore.getFacturas());
  const [sqlLogs, setSqlLogs] = useState<SqlQueryLog[]>(dbStore.getSqlLogs());

  // Cart State
  const [cart, setCart] = useState<{ producto: Producto; cantidad: number }[]>([
    { producto: dbStore.getProductos()[0], cantidad: 2 },
    { producto: dbStore.getProductos()[4], cantidad: 1 },
  ]);

  // Modals State
  const [isSqlDrawerOpen, setIsSqlDrawerOpen] = useState<boolean>(false);
  const [isCctvModalOpen, setIsCctvModalOpen] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<{
    factura: Factura;
    pedido: Pedido;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = dbStore.subscribe(() => {
      setProductos(dbStore.getProductos());
      setEmpleados(dbStore.getEmpleados());
      setClientes(dbStore.getClientes());
      setPedidos(dbStore.getPedidos());
      setFacturas(dbStore.getFacturas());
      setSqlLogs(dbStore.getSqlLogs());
    });
    return () => unsubscribe();
  }, []);

  // Cart operations
  const handleAddToCart = (producto: Producto, cantidad: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.producto.id === producto.id);
      if (existing) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { producto, cantidad }];
    });
  };

  const handleUpdateCartQuantity = (productoId: string, cantidad: number) => {
    if (cantidad <= 0) {
      handleRemoveFromCart(productoId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.producto.id === productoId ? { ...item, cantidad } : item
      )
    );
  };

  const handleRemoveFromCart = (productoId: string) => {
    setCart((prev) => prev.filter((item) => item.producto.id !== productoId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleViewInvoice = (factura: Factura, pedido: Pedido) => {
    setSelectedInvoice({ factura, pedido });
  };

  const invoiceClient = selectedInvoice
    ? clientes.find((c) => c.id === selectedInvoice.pedido.clienteId) || null
    : null;

  const invoiceEmployee = selectedInvoice
    ? empleados.find((e) => e.id === selectedInvoice.pedido.empleadoId) || null
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Subtle Academic Context Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-3">
        <span className="font-semibold text-white">Universidad Autónoma del Caribe</span>
        <span>·</span>
        <span>Electiva ASP.NET — Examen Parcial No 2</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline text-amber-400">
          Parque Central, Barranquilla · WebForms & SQL Server
        </span>
      </div>

      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, it) => sum + it.cantidad, 0)}
        openSqlDrawer={() => setIsSqlDrawerOpen(true)}
        openCctvModal={() => setIsCctvModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            productos={productos}
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
            openCctvModal={() => setIsCctvModalOpen(true)}
          />
        )}

        {activeTab === 'alarmas' && (
          <AlarmasPage
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'svc' && (
          <SvcPage
            productos={productos}
            onAddToCart={handleAddToCart}
            openCctvModal={() => setIsCctvModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'imei' && (
          <ImeiPage
            productos={productos}
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'clientes' && (
          <ClientZonePage
            clientes={clientes}
            pedidos={pedidos}
            productos={productos}
            facturas={facturas}
            empleados={empleados}
            cart={cart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onViewInvoice={handleViewInvoice}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'admin' && (
          <AdminZonePage
            empleados={empleados}
            clientes={clientes}
            pedidos={pedidos}
            productos={productos}
            facturas={facturas}
            onViewInvoice={handleViewInvoice}
            openSqlDrawer={() => setIsSqlDrawerOpen(true)}
          />
        )}

        {activeTab === 'aspnet' && <AspNetSolutionPage />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openSqlDrawer={() => setIsSqlDrawerOpen(true)}
      />

      {/* T-SQL Realtime Inspector Drawer */}
      <SqlInspectorDrawer
        isOpen={isSqlDrawerOpen}
        onClose={() => setIsSqlDrawerOpen(false)}
        logs={sqlLogs}
      />

      {/* CCTV 64-Camera Surveillance Center Modal */}
      <CctvMonitorModal
        isOpen={isCctvModalOpen}
        onClose={() => setIsCctvModalOpen(false)}
      />

      {/* Printable Electronic Invoice Modal */}
      <InvoiceModal
        factura={selectedInvoice?.factura || null}
        pedido={selectedInvoice?.pedido || null}
        cliente={invoiceClient}
        empleado={invoiceEmployee}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}
