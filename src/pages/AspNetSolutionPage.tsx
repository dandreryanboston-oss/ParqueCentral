import React, { useState } from 'react';
import { 
  FileCode, Download, Copy, Check, Terminal, Database, 
  ExternalLink, Layers, Folder, Code, CheckCircle2 
} from 'lucide-react';
import JSZip from 'jszip';
import { ASPNET_PROJECT_FILES, ProjectFile } from '../data/aspNetProjectFiles';

export const AspNetSolutionPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(ASPNET_PROJECT_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipDownloaded, setZipDownloaded] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Solution root folder
      const rootFolder = zip.folder('ParqueCentralTech_Solucion_VisualStudio202X');

      // Add Solution file
      rootFolder?.file(
        'ParqueCentralTech.sln',
        `Microsoft Visual Studio Solution File, Format Version 12.00\n# Visual Studio Version 17\nVisualStudioVersion = 17.0.31903.59\nMinimumVisualStudioVersion = 10.0.40219.1\nProject("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "ParqueCentralTech", "ParqueCentralTech\\ParqueCentralTech.csproj", "{8F6A3C21-7B32-491A-85F0-A1E4B924C281}"\nEndProject\nGlobal\n\tGlobalSection(SolutionConfigurationPlatforms) = preSolution\n\t\tDebug|Any CPU = Debug|Any CPU\n\t\tRelease|Any CPU = Release|Any CPU\n\tEndGlobalSection\nEndGlobal`
      );

      // Add each project file into appropriate folders
      ASPNET_PROJECT_FILES.forEach((f) => {
        rootFolder?.file(f.path, f.content);
      });

      // Add Readme with instructions for Plataforma EXIA
      rootFolder?.file(
        'LEAME_INSTRUCCIONES_SUSTENTACION.txt',
        `========================================================================\nUNIVERSIDAD AUTÓNOMA DEL CARIBE - FACULTAD DE INGENIERÍA\nELECTIVA ASP.NET - EXAMEN PARCIAL No 2\nPROYECTO: PARQUE CENTRAL TECH & VIGILANCIA (BARRANQUILLA)\nFECHA: 24 DE OCTUBRE DE 2026\n========================================================================\n\nINSTRUCCIONES PARA EJECUTAR EN VISUAL STUDIO 202X:\n1. Abra SQL Server Management Studio (SSMS) o Visual Studio SQL Server Object Explorer.\n2. Ejecute el script 'BD_ParqueCentralTech.sql' ubicado en la carpeta Database/.\n3. Abra la solución 'ParqueCentralTech.sln' en Visual Studio Community 202X.\n4. Verifique la cadena de conexión en Web.config (por defecto apunta a (localdb)\\MSSQLLocalDB).\n5. Presione F5 o Ctrl+F5 para compilar y ejecutar en IIS Express (Localhost).\n\nPÁGINAS INCLUIDAS:\n- Default.aspx / Default.aspx.cs (Vitrina de productos de Parque Central)\n- ALARMAS.aspx (Instalación de Sistemas de Alarmas)\n- SVC.aspx (Sistemas de Vigilancia y Control 64 Canales)\n- IMEI.aspx (Instalación y Mantenimiento de Equipos Informáticos)\n- Admin/GestionPedidos.aspx (CRUD de Pedidos con GridView)\n- App_Code/ConexionBD.cs (Clase ADO.NET con SqlConnection y SqlCommand)\n\nENTREGA: Subir carpeta o enlace de Google Drive a PLATAFORMA EXIA junto con el enlace del video de sustentación.`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ParqueCentralTech_Solucion_ASP.NET_202X.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setZipDownloaded(true);
      setTimeout(() => setZipDownloaded(false), 3000);
    } catch (err) {
      console.error('Error generating zip:', err);
      alert('Error al generar archivo comprimido.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 mb-1">
            <Code className="w-4 h-4" />
            <span>Visual Studio 202X Community · Proyecto WebForms C# & SQL Server</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Solución ASP.NET WebForms & Base de Datos
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Archivos fuente completos en C# y T-SQL desarrollados para el Examen Parcial No 2 de la Universidad Autónoma del Caribe.
          </p>
        </div>

        {/* Big Download ZIP CTA */}
        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-sm self-start md:self-auto"
        >
          {zipDownloaded ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>¡Solución Descargada!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Comprimiendo...' : 'Descargar Proyecto Visual Studio (.zip)'}</span>
            </>
          )}
        </button>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Visual Studio 202X</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Compatible con Visual Studio 2022 Community. Abra el archivo <code>ParqueCentralTech.sln</code> y compile directamente con IIS Express.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Base de Datos SQL Server</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Incluye el script <code>BD_ParqueCentralTech.sql</code> con tablas de Empleados, Clientes, Pedidos, Detalle y Stored Procedures.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Entrega en Plataforma EXIA</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            El archivo <code>.zip</code> descargado contiene la estructura lista para subir a Google Drive y adjuntar el enlace en la plataforma EXIA.
          </p>
        </div>
      </div>

      {/* VS Code Specific Interactive Guide */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span>GUÍA OFICIAL: CÓMO EJECUTAR ASP.NET WEBFORMS & HTML5 EN VISUAL STUDIO CODE</span>
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">
          Trabajar con WebForms (.aspx) y HTML5 directamente en VS Code
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-400 block">Paso 1: Abrir en VS Code</span>
            <p className="text-slate-300 leading-relaxed">
              Descarga el <code>.zip</code> con el botón superior, descomprímelo y en VS Code haz clic en <strong>Archivo &gt; Abrir Carpeta...</strong>
            </p>
            <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-slate-300">
              code ParqueCentralTech
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block">Paso 2: Iniciar Servidor Local</span>
            <p className="text-slate-300 leading-relaxed">
              En la terminal integrada de VS Code (<code>Ctrl + ñ</code>), ejecuta el script incluido:
            </p>
            <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-amber-300">
              .\Iniciar_Servidor_VSCode.bat
            </div>
            <p className="text-[10px] text-slate-400">
              Inicia IIS Express en <code>http://localhost:8080/Default.aspx</code>
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block">Paso 3: Base de Datos SQL</span>
            <p className="text-slate-300 leading-relaxed">
              Abre el archivo <code>BD_ParqueCentralTech.sql</code> en VS Code y ejecútalo con la extensión <strong>MSSQL</strong> o en SQL Server Management Studio.
            </p>
          </div>
        </div>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* File Tree (Sidebar) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-3.5 bg-slate-900 text-white flex items-center gap-2 border-b border-slate-800">
            <Folder className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold">Solución 'ParqueCentralTech'</span>
          </div>

          <div className="p-2 space-y-1">
            {ASPNET_PROJECT_FILES.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                  selectedFile.name === file.name
                    ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode
                    className={`w-4 h-4 shrink-0 ${
                      file.language === 'csharp'
                        ? 'text-purple-600'
                        : file.language === 'sql'
                        ? 'text-amber-600'
                        : file.language === 'xml'
                        ? 'text-sky-600'
                        : 'text-emerald-600'
                    }`}
                  />
                  <span className="truncate">{file.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-sans shrink-0">
                  {file.language}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Viewer (Main) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl flex flex-col">
          {/* File Header */}
          <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <span>{selectedFile.path}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedFile.description}</p>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>

          {/* Code Text Area */}
          <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
            <pre className="text-slate-300 font-mono text-xs leading-relaxed">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
