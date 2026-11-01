export interface ProjectFile {
  name: string;
  path: string;
  language: 'csharp' | 'xml' | 'sql' | 'html';
  description: string;
  content: string;
}

export const ASPNET_PROJECT_FILES: ProjectFile[] = [
  {
    name: 'Web.config',
    path: 'ParqueCentralTech/Web.config',
    language: 'xml',
    description: 'Archivo de configuración ASP.NET con cadena de conexión a SQL Server y modo de autenticación',
    content: `<?xml version="1.0" encoding="utf-8"?>
<!--
  Configuración de ASP.NET WebForms para Examen Parcial No 2
  Universidad Autónoma del Caribe - Electiva ASP.NET
-->
<configuration>
  <connectionStrings>
    <!-- Servidor SQL Server Localhost proporcionado por Visual Studio 202X -->
    <add name="CadenaConexionSQL" 
         connectionString="Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=BD_ParqueCentralTech;Integrated Security=True;Connect Timeout=30;Encrypt=False;" 
         providerName="System.Data.SqlClient" />
  </connectionStrings>

  <system.web>
    <compilation debug="true" targetFramework="4.8" />
    <httpRuntime targetFramework="4.8" />
    <pages>
      <namespaces>
        <add namespace="System.Web.Optimization" />
      </namespaces>
    </pages>
    <sessionState mode="InProc" timeout="60" />
    <globalization culture="es-CO" uiCulture="es-CO" />
  </system.web>

  <system.webServer>
    <defaultDocument>
      <files>
        <clear />
        <add value="Default.aspx" />
      </files>
    </defaultDocument>
  </system.webServer>
</configuration>`
  },
  {
    name: 'ConexionBD.cs',
    path: 'ParqueCentralTech/App_Code/ConexionBD.cs',
    language: 'csharp',
    description: 'Clase C# para gestión de conexión ADO.NET con SqlConnection, SqlCommand y SqlDataAdapter',
    content: `using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace ParqueCentralTech
{
    /// <summary>
    /// Clase de acceso a datos para SQL Server - Visual Studio 202X Community
    /// Maneja operaciones CRUD para Empleados, Clientes, Pedidos y Facturas.
    /// </summary>
    public class ConexionBD
    {
        private static string cadenaConexion = ConfigurationManager.ConnectionStrings["CadenaConexionSQL"].ConnectionString;

        public static SqlConnection ObtenerConexion()
        {
            SqlConnection conexion = new SqlConnection(cadenaConexion);
            if (conexion.State == ConnectionState.Closed)
            {
                conexion.Open();
            }
            return conexion;
        }

        public static DataTable EjecutarConsulta(string consultaSql, SqlParameter[] parametros = null)
        {
            DataTable tabla = new DataTable();
            using (SqlConnection con = ObtenerConexion())
            {
                using (SqlCommand cmd = new SqlCommand(consultaSql, con))
                {
                    cmd.CommandType = CommandType.Text;
                    if (parametros != null)
                    {
                        cmd.Parameters.AddRange(parametros);
                    }
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(tabla);
                    }
                }
            }
            return tabla;
        }

        public static int EjecutarComando(string consultaSql, SqlParameter[] parametros = null)
        {
            int filasAfectadas = 0;
            using (SqlConnection con = ObtenerConexion())
            {
                using (SqlCommand cmd = new SqlCommand(consultaSql, con))
                {
                    cmd.CommandType = CommandType.Text;
                    if (parametros != null)
                    {
                        cmd.Parameters.AddRange(parametros);
                    }
                    filasAfectadas = cmd.ExecuteNonQuery();
                }
            }
            return filasAfectadas;
        }

        public static object EjecutarEscalar(string consultaSql, SqlParameter[] parametros = null)
        {
            object resultado = null;
            using (SqlConnection con = ObtenerConexion())
            {
                using (SqlCommand cmd = new SqlCommand(consultaSql, con))
                {
                    if (parametros != null)
                    {
                        cmd.Parameters.AddRange(parametros);
                    }
                    resultado = cmd.ExecuteScalar();
                }
            }
            return resultado;
        }
    }
}`
  },
  {
    name: 'Default.aspx',
    path: 'ParqueCentralTech/Default.aspx',
    language: 'html',
    description: 'Página WebForm principal (Inicio / Vitrina Comercial Parque Central Barranquilla)',
    content: `<%@ Page Title="Parque Central Tech & Vigilancia" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ParqueCentralTech.Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="jumbotron text-center bg-dark text-white p-5 rounded">
        <h1>Parque Central Tech & Vigilancia</h1>
        <p class="lead">Venta e instalación de tecnología de vanguardia y vigilancia electrónica en Barranquilla.</p>
        <hr class="my-4" />
        <p>Cámaras fijas, giratorias PTZ, analógicas, con zoom e intensificador de luz. Equipos de cómputo, impresoras y alarmas.</p>
        <div class="d-flex justify-content-center gap-3">
            <a href="SVC.aspx" class="btn btn-primary btn-lg">Sistemas de Vigilancia (SVC)</a>
            <a href="ALARMAS.aspx" class="btn btn-warning btn-lg">Sistemas de Alarmas</a>
            <a href="IMEI.aspx" class="btn btn-info btn-lg">Mantenimiento de Cómputo (IMEI)</a>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-12">
            <h3>Catálogo de Productos Disponibles</h3>
            <asp:DropDownList ID="ddlCategoria" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlCategoria_SelectedIndexChanged" CssClass="form-select mb-3 w-25">
                <asp:ListItem Value="TODOS">Todas las Categorías</asp:ListItem>
                <asp:ListItem Value="Vigilancia">Sistemas de Vigilancia</asp:ListItem>
                <asp:ListItem Value="Alarmas">Sistemas de Alarmas</asp:ListItem>
                <asp:ListItem Value="Hardware">Equipos de Cómputo</asp:ListItem>
            </asp:DropDownList>

            <asp:GridView ID="gvProductos" runat="server" AutoGenerateColumns="False" CssClass="table table-striped table-hover table-bordered" OnRowCommand="gvProductos_RowCommand">
                <Columns>
                    <asp:BoundField DataField="Codigo" HeaderText="Código" />
                    <asp:BoundField DataField="Nombre" HeaderText="Producto" />
                    <asp:BoundField DataField="Categoria" HeaderText="Categoría" />
                    <asp:BoundField DataField="Subcategoria" HeaderText="Tipo" />
                    <asp:BoundField DataField="Precio" HeaderText="Precio (COP)" DataFormatString="{0:C0}" />
                    <asp:BoundField DataField="Stock" HeaderText="Stock Disp." />
                    <asp:TemplateField HeaderText="Acción">
                        <ItemTemplate>
                            <asp:Button ID="btnComprar" runat="server" Text="Agregar a Pedido" CommandName="AgregarPedido" CommandArgument='<%# Eval("Id") %>' CssClass="btn btn-success btn-sm" />
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
</asp:Content>`
  },
  {
    name: 'Default.aspx.cs',
    path: 'ParqueCentralTech/Default.aspx.cs',
    language: 'csharp',
    description: 'Code-behind en C# para la página principal con carga de datos desde SQL Server',
    content: `using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ParqueCentralTech
{
    public partial class Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                CargarProductos("TODOS");
            }
        }

        private void CargarProductos(string categoria)
        {
            string sql = "SELECT Id, Codigo, Nombre, Categoria, Subcategoria, Precio, Stock FROM tbl_Productos";
            SqlParameter[] parametros = null;

            if (categoria != "TODOS")
            {
                sql += " WHERE Categoria = @Categoria";
                parametros = new SqlParameter[] {
                    new SqlParameter("@Categoria", SqlDbType.NVarChar) { Value = categoria }
                };
            }

            DataTable dt = ConexionBD.EjecutarConsulta(sql, parametros);
            gvProductos.DataSource = dt;
            gvProductos.DataBind();
        }

        protected void ddlCategoria_SelectedIndexChanged(object sender, EventArgs e)
        {
            CargarProductos(ddlCategoria.SelectedValue);
        }

        protected void gvProductos_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "AgregarPedido")
            {
                string productoId = e.CommandArgument.ToString();
                // Redirigir a la zona de pedidos del cliente pasando el producto seleccionado
                Response.Redirect("PedidosCliente.aspx?productoId=" + productoId);
            }
        }
    }
}`
  },
  {
    name: 'ALARMAS.aspx',
    path: 'ParqueCentralTech/ALARMAS.aspx',
    language: 'html',
    description: 'Página WebForm requerida: Instalación de Sistemas de Alarmas (ALARMAS.ASPX)',
    content: `<%@ Page Title="Instalación de Sistemas de Alarmas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ALARMAS.aspx.cs" Inherits="ParqueCentralTech.ALARMAS" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container py-4">
        <h2 class="text-primary border-bottom pb-2">Instalación de Sistemas de Alarmas - ALARMAS.ASPX</h2>
        <p class="lead text-muted">Protección perimetral y volumétrica para empresas y residencias en Parque Central y Barranquilla.</p>

        <div class="row">
            <div class="col-md-7">
                <h4>Componentes y Tecnologías de Detección</h4>
                <ul class="list-group mb-4">
                    <li class="list-group-item"><strong>Paneles Híbridos Touchscreen:</strong> Conexión dual WiFi + 4G GSM, notificación instantánea a su celular.</li>
                    <li class="list-group-item"><strong>Sensores Infrarrojos Pasivos (PIR):</strong> Inmunidad a mascotas hasta 25kg, doble haz para cero falsas alarmas.</li>
                    <li class="list-group-item"><strong>Barreras Fotoeléctricas Perimetrales:</strong> Alcance de hasta 100m para patios, azoteas y bodegas.</li>
                    <li class="list-group-item"><strong>Sirenas de Alta Potencia 110dB:</strong> Con luz estroboscópica y batería autónoma anti-corte de energía.</li>
                </ul>

                <div class="card p-3 bg-light">
                    <h5>Cotizador Interactivo de Alarmas</h5>
                    <div class="mb-2">
                        <label>Tipo de Inmueble:</label>
                        <asp:DropDownList ID="ddlTipoInmueble" runat="server" CssClass="form-select">
                            <asp:ListItem>Local Comercial en Parque Central</asp:ListItem>
                            <asp:ListItem>Bodega Industrial</asp:ListItem>
                            <asp:ListItem>Residencia / Casa Familiar</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="mb-2">
                        <label>Cantidad de Sensores de Movimiento PIR:</label>
                        <asp:TextBox ID="txtNumSensores" runat="server" Text="4" TextMode="Number" CssClass="form-control" />
                    </div>
                    <asp:Button ID="btnCotizar" runat="server" Text="Calcular Presupuesto" OnClick="btnCotizar_Click" CssClass="btn btn-warning" />
                    <asp:Label ID="lblCotizacion" runat="server" CssClass="d-block mt-2 fw-bold text-success" />
                </div>
            </div>

            <div class="col-md-5">
                <div class="card shadow-sm border-0">
                    <img src="Images/alarm_system_pack.jpg" class="card-img-top" alt="Kit Alarma" />
                    <div class="card-body">
                        <h5 class="card-title">Kit Smart 4G Completo con Instalación</h5>
                        <p class="card-text">Incluye panel central, 2 sensores de movimiento, 2 contactos magnéticos para puertas, sirena y configuración por técnicos certificados de Barranquilla.</p>
                        <asp:Button ID="btnSolicitarAlarma" runat="server" Text="Contratar Instalación" OnClick="btnSolicitarAlarma_Click" CssClass="btn btn-primary w-100" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>`
  },
  {
    name: 'SVC.aspx',
    path: 'ParqueCentralTech/SVC.aspx',
    language: 'html',
    description: 'Página WebForm requerida: Instalación de Sistemas de Vigilancia y Control (SVC.ASPX)',
    content: `<%@ Page Title="Sistemas de Vigilancia y Control" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SVC.aspx.cs" Inherits="ParqueCentralTech.SVC" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container py-4">
        <h2 class="text-danger border-bottom pb-2">Instalación de Sistemas de Vigilancia y Control - SVC.ASPX</h2>
        <p class="lead">CCTV Profesional: Cámaras fijas, giratorias PTZ, analógicas, con zoom e intensificador de luz para monitorear hasta 64 cámaras simultáneas.</p>

        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Cámaras PTZ Giratorias 360°</h5>
                        <p class="card-text">Con zoom óptico de hasta 30X, rotación continua y auto-seguimiento de personas o vehículos sospechosos.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Intensificador de Luz Nocturno</h5>
                        <p class="card-text">Tecnología Sony Starvis de ultra-bajo lux: graba imágenes en color a resolución 4K incluso en oscuridad total.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Matriz hasta 64 Cámaras</h5>
                        <p class="card-text">Vigile cualquier sitio a distancia vía internet desde un ordenador o teléfono móvil desde una sola consola.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 bg-dark text-white rounded mb-4">
            <h4>Centro de Monitoreo en Vivo (64 Canales)</h4>
            <p>Visualice en tiempo real los flujos de videovigilancia de Parque Central Barranquilla con controles PTZ y zoom óptico.</p>
            <asp:Button ID="btnAbrirMonitor" runat="server" Text="Iniciar Consola de 64 Cámaras" OnClick="btnAbrirMonitor_Click" CssClass="btn btn-danger btn-lg" />
        </div>
    </div>
</asp:Content>`
  },
  {
    name: 'IMEI.aspx',
    path: 'ParqueCentralTech/IMEI.aspx',
    language: 'html',
    description: 'Página WebForm requerida: Instalación y Mantenimiento de Equipos Informáticos (IMEI.ASPX)',
    content: `<%@ Page Title="Instalación y Mantenimiento de Equipos Informáticos" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="IMEI.aspx.cs" Inherits="ParqueCentralTech.IMEI" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container py-4">
        <h2 class="text-success border-bottom pb-2">Instalación y Mantenimiento de Equipos Informáticos - IMEI.ASPX</h2>
        <p class="lead">Servicio técnico profesional en Parque Central - Barranquilla: Computadores, impresoras, discos duros y redes.</p>

        <div class="row">
            <div class="col-md-4 mb-3">
                <div class="card h-100 p-3 shadow-sm">
                    <h4>Ordenadores y Servidores</h4>
                    <p>Mantenimiento preventivo, cambio de pasta térmica, optimización de Windows Server / Linux y ensamble de torres para monitoreo continuo 24/7.</p>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card h-100 p-3 shadow-sm">
                    <h4>Impresoras Láser y Térmicas</h4>
                    <p>Limpieza de rodillos, calibración de cabezales, configuración en red e instalación de tóners de alto rendimiento para puntos de venta.</p>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card h-100 p-3 shadow-sm">
                    <h4>Discos Duros y Almacenamiento</h4>
                    <p>Clonación a SSD NVMe ultrarrápidos, recuperación forense de datos y configuración de arreglos RAID 1/5 para grabadores NVR.</p>
                </div>
            </div>
        </div>

        <div class="card p-4 mt-3 bg-light">
            <h4>Solicitar Servicio Técnico IMEI</h4>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <label>Nombre del Cliente / Empresa:</label>
                    <asp:TextBox ID="txtClienteIMEI" runat="server" CssClass="form-control" />
                </div>
                <div class="col-md-6 mb-2">
                    <label>Tipo de Equipo:</label>
                    <asp:DropDownList ID="ddlEquipo" runat="server" CssClass="form-select">
                        <asp:ListItem>Computador de Escritorio / Torre</asp:ListItem>
                        <asp:ListItem>Impresora Láser / Térmica</asp:ListItem>
                        <asp:ListItem>Disco Duro / Servidor NVR</asp:ListItem>
                    </asp:DropDownList>
                </div>
            </div>
            <asp:Button ID="btnAgendar" runat="server" Text="Agendar Técnico a Domicilio" OnClick="btnAgendar_Click" CssClass="btn btn-success mt-2" />
            <asp:Label ID="lblMensajeIMEI" runat="server" CssClass="mt-2 text-primary fw-bold" />
        </div>
    </div>
</asp:Content>`
  },
  {
    name: 'GestionPedidos.aspx',
    path: 'ParqueCentralTech/Admin/GestionPedidos.aspx',
    language: 'html',
    description: 'Página WebForm de Administración: CRUD de Pedidos, Asignación de Empleados y Facturación',
    content: `<%@ Page Title="Gestión de Pedidos y CRUD" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionPedidos.aspx.cs" Inherits="ParqueCentralTech.Admin.GestionPedidos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container-fluid py-4">
        <h2>Panel Administrativo - CRUD de Pedidos</h2>
        <p class="text-muted">Crear, Leer, Actualizar (editar) y Borrar pedidos. Asignación de empleados y emisión de facturas.</p>

        <asp:Label ID="lblAlerta" runat="server" CssClass="alert d-block" Visible="false" />

        <asp:GridView ID="gvPedidos" runat="server" AutoGenerateColumns="False" 
            DataKeyNames="Id" 
            CssClass="table table-bordered table-striped"
            OnRowEditing="gvPedidos_RowEditing" 
            OnRowUpdating="gvPedidos_RowUpdating" 
            OnRowCancelingEdit="gvPedidos_RowCancelingEdit" 
            OnRowDeleting="gvPedidos_RowDeleting"
            OnRowCommand="gvPedidos_RowCommand">
            <Columns>
                <asp:BoundField DataField="NumeroPedido" HeaderText="No. Pedido" ReadOnly="True" />
                <asp:BoundField DataField="Fecha" HeaderText="Fecha" ReadOnly="True" />
                <asp:BoundField DataField="Cliente" HeaderText="Cliente" ReadOnly="True" />
                
                <asp:TemplateField HeaderText="Estado">
                    <ItemTemplate>
                        <asp:Label ID="lblEstado" runat="server" Text='<%# Eval("Estado") %>' />
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:DropDownList ID="ddlEstadoEdit" runat="server">
                            <asp:ListItem>Pendiente</asp:ListItem>
                            <asp:ListItem>En Proceso</asp:ListItem>
                            <asp:ListItem>Instalación Programada</asp:ListItem>
                            <asp:ListItem>Completado</asp:ListItem>
                            <asp:ListItem>Cancelado</asp:ListItem>
                        </asp:DropDownList>
                    </EditItemTemplate>
                </asp:TemplateField>

                <asp:BoundField DataField="Total" HeaderText="Total (COP)" DataFormatString="{0:C0}" ReadOnly="True" />
                
                <asp:CommandField ShowEditButton="True" ShowDeleteButton="True" HeaderText="Acciones CRUD" ButtonType="Button" ControlStyle-CssClass="btn btn-sm btn-outline-secondary" />

                <asp:TemplateField HeaderText="Factura">
                    <ItemTemplate>
                        <asp:Button ID="btnFacturar" runat="server" Text="Generar Factura" 
                            CommandName="GenerarFactura" 
                            CommandArgument='<%# Eval("Id") %>' 
                            CssClass="btn btn-sm btn-primary" />
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
</asp:Content>`
  },
  {
    name: 'GestionPedidos.aspx.cs',
    path: 'ParqueCentralTech/Admin/GestionPedidos.aspx.cs',
    language: 'csharp',
    description: 'Code-behind C# para operaciones CRUD completas sobre tbl_Pedidos',
    content: `using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ParqueCentralTech.Admin
{
    public partial class GestionPedidos : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                CargarPedidos();
            }
        }

        private void CargarPedidos()
        {
            string sql = @"SELECT p.Id, p.NumeroPedido, p.Fecha, c.NombreRazonSocial AS Cliente, 
                                  p.Estado, p.Total, p.Pagado 
                           FROM tbl_Pedidos p 
                           INNER JOIN tbl_Clientes c ON p.ClienteId = c.Id 
                           ORDER BY p.Fecha DESC";
            
            DataTable dt = ConexionBD.EjecutarConsulta(sql);
            gvPedidos.DataSource = dt;
            gvPedidos.DataBind();
        }

        // EDITAR (Update)
        protected void gvPedidos_RowEditing(object sender, GridViewEditEventArgs e)
        {
            gvPedidos.EditIndex = e.NewEditIndex;
            CargarPedidos();
        }

        protected void gvPedidos_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            gvPedidos.EditIndex = -1;
            CargarPedidos();
        }

        protected void gvPedidos_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            string pedidoId = gvPedidos.DataKeys[e.RowIndex].Value.ToString();
            GridViewRow fila = gvPedidos.Rows[e.RowIndex];
            DropDownList ddlEstado = (DropDownList)fila.FindControl("ddlEstadoEdit");

            string nuevoEstado = ddlEstado.SelectedValue;

            string sql = "UPDATE tbl_Pedidos SET Estado = @Estado WHERE Id = @Id";
            SqlParameter[] parametros = new SqlParameter[] {
                new SqlParameter("@Estado", nuevoEstado),
                new SqlParameter("@Id", pedidoId)
            };

            ConexionBD.EjecutarComando(sql, parametros);

            gvPedidos.EditIndex = -1;
            CargarPedidos();
            MostrarAlerta("Pedido actualizado correctamente en SQL Server.", "alert-success");
        }

        // BORRAR (Delete)
        protected void gvPedidos_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            string pedidoId = gvPedidos.DataKeys[e.RowIndex].Value.ToString();

            // Borrado en cascada: primero detalle, luego cabecera
            string sqlDetalle = "DELETE FROM tbl_DetallePedido WHERE PedidoId = @Id";
            string sqlPedido = "DELETE FROM tbl_Pedidos WHERE Id = @Id";

            SqlParameter[] param = new SqlParameter[] { new SqlParameter("@Id", pedidoId) };
            ConexionBD.EjecutarComando(sqlDetalle, param);
            ConexionBD.EjecutarComando(sqlPedido, param);

            CargarPedidos();
            MostrarAlerta("Pedido eliminado correctamente de la base de datos.", "alert-danger");
        }

        protected void gvPedidos_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "GenerarFactura")
            {
                string pedidoId = e.CommandArgument.ToString();
                Response.Redirect("Facturacion.aspx?pedidoId=" + pedidoId);
            }
        }

        private void MostrarAlerta(string mensaje, string cssClass)
        {
            lblAlerta.Text = mensaje;
            lblAlerta.CssClass = "alert " + cssClass + " d-block";
            lblAlerta.Visible = true;
        }
    }
}`
  },
  {
    name: 'BD_ParqueCentralTech.sql',
    path: 'ParqueCentralTech/Database/BD_ParqueCentralTech.sql',
    language: 'sql',
    description: 'Script T-SQL completo para creación de Base de Datos, Tablas, Relaciones y Stored Procedures',
    content: `-- ==============================================================================
-- UNIVERSIDAD AUTÓNOMA DEL CARIBE - FACULTAD DE INGENIERÍA
-- ELECTIVA ASP.NET - EXAMEN PARCIAL No 2 - OCTUBRE 24, 2026
-- SCRIPT DE BASE DE DATOS: BD_ParqueCentralTech
-- ==============================================================================

USE master;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = 'BD_ParqueCentralTech')
    DROP DATABASE BD_ParqueCentralTech;
GO

CREATE DATABASE BD_ParqueCentralTech;
GO

USE BD_ParqueCentralTech;
GO

-- 1. TABLA EMPLEADOS
CREATE TABLE tbl_Empleados (
    Id NVARCHAR(50) PRIMARY KEY,
    Codigo NVARCHAR(20) NOT NULL UNIQUE,
    Nombre NVARCHAR(150) NOT NULL,
    Cargo NVARCHAR(100) NOT NULL,
    Documento NVARCHAR(30) NOT NULL,
    Telefono NVARCHAR(30) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    FechaContratacion DATE NOT NULL,
    Estado NVARCHAR(30) DEFAULT 'Activo',
    Direccion NVARCHAR(200) NOT NULL
);
GO

-- 2. TABLA CLIENTES
CREATE TABLE tbl_Clientes (
    Id NVARCHAR(50) PRIMARY KEY,
    Codigo NVARCHAR(20) NOT NULL UNIQUE,
    Documento NVARCHAR(30) NOT NULL,
    TipoDoc NVARCHAR(10) NOT NULL,
    NombreRazonSocial NVARCHAR(200) NOT NULL,
    Telefono NVARCHAR(30) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(200) NOT NULL,
    Ciudad NVARCHAR(50) DEFAULT 'Barranquilla',
    Tipo NVARCHAR(50) NOT NULL,
    FechaRegistro DATE DEFAULT GETDATE()
);
GO

-- 3. TABLA PRODUCTOS
CREATE TABLE tbl_Productos (
    Id NVARCHAR(50) PRIMARY KEY,
    Codigo NVARCHAR(20) NOT NULL UNIQUE,
    Nombre NVARCHAR(200) NOT NULL,
    Categoria NVARCHAR(50) NOT NULL,
    Subcategoria NVARCHAR(100) NOT NULL,
    Precio DECIMAL(18,2) NOT NULL,
    Stock INT NOT NULL DEFAULT 0,
    Descripcion NVARCHAR(MAX),
    ImagenUrl NVARCHAR(300)
);
GO

-- 4. TABLA PEDIDOS
CREATE TABLE tbl_Pedidos (
    Id NVARCHAR(50) PRIMARY KEY,
    NumeroPedido NVARCHAR(30) NOT NULL UNIQUE,
    Fecha DATETIME DEFAULT GETDATE(),
    ClienteId NVARCHAR(50) NOT NULL,
    EmpleadoId NVARCHAR(50) NULL,
    Estado NVARCHAR(50) DEFAULT 'Pendiente',
    Subtotal DECIMAL(18,2) NOT NULL,
    IVA DECIMAL(18,2) NOT NULL,
    Total DECIMAL(18,2) NOT NULL,
    NotasInstalacion NVARCHAR(MAX),
    MetodoPago NVARCHAR(100) NOT NULL,
    Pagado BIT DEFAULT 0,
    CONSTRAINT FK_Pedidos_Clientes FOREIGN KEY (ClienteId) REFERENCES tbl_Clientes(Id),
    CONSTRAINT FK_Pedidos_Empleados FOREIGN KEY (EmpleadoId) REFERENCES tbl_Empleados(Id)
);
GO

-- 5. TABLA DETALLE DE PEDIDOS
CREATE TABLE tbl_DetallePedido (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PedidoId NVARCHAR(50) NOT NULL,
    ProductoId NVARCHAR(50) NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(18,2) NOT NULL,
    Subtotal DECIMAL(18,2) NOT NULL,
    CONSTRAINT FK_Detalle_Pedidos FOREIGN KEY (PedidoId) REFERENCES tbl_Pedidos(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Detalle_Productos FOREIGN KEY (ProductoId) REFERENCES tbl_Productos(Id)
);
GO

-- 6. TABLA FACTURAS
CREATE TABLE tbl_Facturas (
    Id NVARCHAR(50) PRIMARY KEY,
    NumeroFactura NVARCHAR(30) NOT NULL UNIQUE,
    PedidoId NVARCHAR(50) NOT NULL,
    FechaEmision DATETIME DEFAULT GETDATE(),
    ClienteId NVARCHAR(50) NOT NULL,
    EmpleadoId NVARCHAR(50) NULL,
    Subtotal DECIMAL(18,2) NOT NULL,
    IVA DECIMAL(18,2) NOT NULL,
    RetencionFuente DECIMAL(18,2) DEFAULT 0,
    Total DECIMAL(18,2) NOT NULL,
    EstadoPago NVARCHAR(30) DEFAULT 'Pagada',
    ResolucionDIAN NVARCHAR(200),
    CONSTRAINT FK_Facturas_Pedidos FOREIGN KEY (PedidoId) REFERENCES tbl_Pedidos(Id),
    CONSTRAINT FK_Facturas_Clientes FOREIGN KEY (ClienteId) REFERENCES tbl_Clientes(Id)
);
GO

-- STORED PROCEDURE: CREACIÓN DE PEDIDO
CREATE PROCEDURE sp_CrearPedido
    @NumeroPedido NVARCHAR(30),
    @ClienteId NVARCHAR(50),
    @EmpleadoId NVARCHAR(50),
    @Subtotal DECIMAL(18,2),
    @IVA DECIMAL(18,2),
    @Total DECIMAL(18,2),
    @MetodoPago NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @NuevoId NVARCHAR(50) = NEWID();
    INSERT INTO tbl_Pedidos (Id, NumeroPedido, Fecha, ClienteId, EmpleadoId, Estado, Subtotal, IVA, Total, MetodoPago, Pagado)
    VALUES (@NuevoId, @NumeroPedido, GETDATE(), @ClienteId, @EmpleadoId, 'Pendiente', @Subtotal, @IVA, @Total, @MetodoPago, 0);
    SELECT @NuevoId AS PedidoId;
END;
GO`
  },
  {
    name: 'Site.Master',
    path: 'ParqueCentralTech/Site.Master',
    language: 'html',
    description: 'Plantilla Maestra HTML5 responsiva para todas las páginas WebForms (.aspx)',
    content: `<%@ Master Language="C#" AutoEventWireup="true" CodeBehind="Site.master.cs" Inherits="ParqueCentralTech.SiteMaster" %>
<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%: Page.Title %> - Parque Central Tech Barranquilla</title>
    <!-- Bootstrap 5 CSS y Fuentes -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <link href="~/Content/Site.css" rel="stylesheet" />
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; }
        .navbar-brand { font-weight: 800; letter-spacing: -0.5px; }
    </style>
</head>
<body>
    <form runat="server">
        <!-- Barra de Navegación Principal HTML5 -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
            <div class="container">
                <a class="navbar-brand text-white d-flex items-center gap-2" href="Default.aspx">
                    <span class="badge bg-warning text-dark">PC</span> Parque Central Tech
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="Default.aspx">Inicio</a></li>
                        <li class="nav-item"><a class="nav-link" href="ALARMAS.aspx">Alarmas (ALARMAS.ASPX)</a></li>
                        <li class="nav-item"><a class="nav-link" href="SVC.aspx">Vigilancia (SVC.ASPX)</a></li>
                        <li class="nav-item"><a class="nav-link" href="IMEI.aspx">Mantenimiento (IMEI.ASPX)</a></li>
                        <li class="nav-item"><a class="nav-link text-warning fw-bold" href="Admin/GestionPedidos.aspx">Panel CRUD Pedidos</a></li>
                    </ul>
                    <span class="navbar-text text-light small d-none d-lg-inline">
                        Parque Central · Barranquilla
                    </span>
                </div>
            </div>
        </nav>

        <!-- Contenedor Principal de Contenido WebForms -->
        <div class="container body-content py-4">
            <asp:ContentPlaceHolder ID="MainContent" runat="server">
            </asp:ContentPlaceHolder>
            <hr class="mt-5" />
            <footer class="text-muted text-center py-3 small">
                <p>&copy; 2026 - Parque Central Tech & Vigilancia S.A.S. | Universidad Autónoma del Caribe - Electiva ASP.NET WebForms</p>
            </footer>
        </div>
    </form>
    <!-- Bootstrap 5 JavaScript Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`
  },
  {
    name: 'tasks.json (VS Code)',
    path: '.vscode/tasks.json',
    language: 'xml',
    description: 'Configuración de tareas de Visual Studio Code para ejecutar IIS Express en Localhost con un solo clic',
    content: `{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Ejecutar Servidor Localhost (IIS Express)",
      "type": "shell",
      "command": "& 'C:\\\\Program Files\\\\IIS Express\\\\iisexpress.exe' /path:\\"\${workspaceFolder}\\\\ParqueCentralTech\\" /port:8080",
      "isBackground": true,
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}`
  },
  {
    name: 'launch.json (VS Code)',
    path: '.vscode/launch.json',
    language: 'xml',
    description: 'Configuración para presionar F5 en Visual Studio Code y abrir el navegador en Localhost automáticamente',
    content: `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Abrir en Navegador (http://localhost:8080)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:8080/Default.aspx",
      "webRoot": "\${workspaceFolder}/ParqueCentralTech"
    }
  ]
}`
  },
  {
    name: 'Iniciar_Servidor_VSCode.bat',
    path: 'Iniciar_Servidor_VSCode.bat',
    language: 'xml',
    description: 'Script por lotes (.bat) para iniciar IIS Express y abrir el navegador en Localhost desde la terminal de VS Code',
    content: `@echo off
echo =====================================================================
echo  INICIANDO SERVIDOR ASP.NET WEBFORMS - VISUAL STUDIO CODE (LOCALHOST)
echo  UNIVERSIDAD AUTONOMA DEL CARIBE - ELECTIVA ASP.NET
echo  EMPRESA: PARQUE CENTRAL TECH ^& VIGILANCIA (BARRANQUILLA)
echo =====================================================================

set IIS_PATH="C:\\Program Files\\IIS Express\\iisexpress.exe"
set IIS_PATH_X86="C:\\Program Files (x86)\\IIS Express\\iisexpress.exe"
set APP_DIR=%~dp0ParqueCentralTech
set PORT=8080

if exist %IIS_PATH% (
    start http://localhost:%PORT%/Default.aspx
    %IIS_PATH% /path:"%APP_DIR%" /port:%PORT%
) else if exist %IIS_PATH_X86% (
    start http://localhost:%PORT%/Default.aspx
    %IIS_PATH_X86% /path:"%APP_DIR%" /port:%PORT%
) else (
    echo [ERROR] No se encontro IIS Express instalado en su equipo.
    echo Puede instalarlo gratis descargando 'IIS 10.0 Express' de Microsoft
    echo o abrir los archivos .aspx con la extension 'Live Server' en VS Code.
    pause
)`
  }
];
