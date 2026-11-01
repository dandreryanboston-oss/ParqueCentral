import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Trash2, Database, ExternalLink } from 'lucide-react';
import { SqlQueryLog } from '../types';
import { dbStore } from '../data/dbStore';

interface SqlInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: SqlQueryLog[];
}

export const SqlInspectorDrawer: React.FC<SqlInspectorDrawerProps> = ({
  isOpen,
  onClose,
  logs,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    dbStore.clearSqlLogs();
  };

  const filteredLogs = filterType === 'ALL' 
    ? logs 
    : logs.filter(l => l.tipo === filterType);

  const getTypeColor = (tipo: SqlQueryLog['tipo']) => {
    switch (tipo) {
      case 'INSERT': return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
      case 'UPDATE': return 'text-amber-400 bg-amber-950/60 border-amber-800';
      case 'DELETE': return 'text-rose-400 bg-rose-950/60 border-rose-800';
      case 'EXEC SP': return 'text-purple-400 bg-purple-950/60 border-purple-800';
      case 'SELECT': return 'text-sky-400 bg-sky-950/60 border-sky-800';
      default: return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-2xl bg-slate-950 text-slate-200 h-full shadow-2xl flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-indigo-900/60 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <span>Inspector T-SQL Server 202X</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Localhost BD_ParqueCentralTech
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Consultas ADO.NET generadas por cada acción CRUD en el aplicativo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              title="Limpiar historial"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-2 text-xs overflow-x-auto">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider">Filtrar:</span>
          {['ALL', 'INSERT', 'UPDATE', 'DELETE', 'EXEC SP', 'SELECT'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                filterType === type
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Query List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Database className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No hay consultas registradas para este filtro.</p>
              <p className="text-[11px] mt-1 text-slate-600">
                Realice acciones de Crear, Editar o Borrar en la aplicación para ver la sentencia SQL generada.
              </p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-900/90 rounded-lg border border-slate-800/80 p-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${getTypeColor(
                        log.tipo
                      )}`}
                    >
                      {log.tipo}
                    </span>
                    <span className="text-slate-400 font-semibold">{log.tabla}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>{log.timestamp}</span>
                    <button
                      onClick={() => handleCopy(log.id, log.query)}
                      className="p-1 hover:text-white transition-colors"
                      title="Copiar consulta SQL"
                    >
                      {copiedId === log.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <pre className="text-slate-300 whitespace-pre-wrap overflow-x-auto leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-900 text-[11px]">
                  {log.query}
                </pre>

                {log.parametros && (
                  <div className="mt-2 pt-2 border-t border-slate-800/40 text-[10px] text-slate-500 flex flex-wrap gap-2">
                    <span className="text-slate-400">@Parámetros:</span>
                    {Object.entries(log.parametros).map(([k, v]) => (
                      <span key={k} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                        @{k} = <span className="text-amber-300">{String(v)}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{filteredLogs.length} consultas en búfer de depuración</span>
          <span className="text-slate-500">ADO.NET / System.Data.SqlClient</span>
        </div>
      </div>
    </div>
  );
};
