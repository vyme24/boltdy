import React, { useState } from 'react';
import { Play, Pause, Square, RotateCcw, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';

const NotebookManagement: React.FC = () => {
  const [notebooks, setNotebooks] = useState([
    {
      id: 1,
      name: 'Entrenamiento_Modelo_NLP_v3.ipynb',
      account: 'usuario1@gmail.com',
      status: 'running',
      progress: 78,
      runtime: '2h 34m',
      lastCheckpoint: '2h 12m',
      cells: { total: 45, executed: 35 },
      resources: { cpu: 67, gpu: 89, ram: 76 }
    },
    {
      id: 2,
      name: 'Análisis_Datos_Financieros.ipynb',
      account: 'usuario1@gmail.com',
      status: 'running',
      progress: 45,
      runtime: '1h 23m',
      lastCheckpoint: '47m',
      cells: { total: 28, executed: 12 },
      resources: { cpu: 34, gpu: 45, ram: 52 }
    },
    {
      id: 3,
      name: 'CNN_Clasificacion_Imagenes.ipynb',
      account: 'usuario4@gmail.com',
      status: 'paused',
      progress: 92,
      runtime: '4h 15m',
      lastCheckpoint: '3h 58m',
      cells: { total: 67, executed: 61 },
      resources: { cpu: 0, gpu: 0, ram: 15 }
    },
    {
      id: 4,
      name: 'Preprocessing_Dataset_Large.ipynb',
      account: 'usuario2@gmail.com',
      status: 'queued',
      progress: 0,
      runtime: '0m',
      lastCheckpoint: 'N/A',
      cells: { total: 34, executed: 0 },
      resources: { cpu: 0, gpu: 0, ram: 0 }
    },
    {
      id: 5,
      name: 'Transformers_Fine_Tuning.ipynb',
      account: 'usuario4@gmail.com',
      status: 'error',
      progress: 23,
      runtime: '45m',
      lastCheckpoint: '34m',
      cells: { total: 52, executed: 12 },
      resources: { cpu: 0, gpu: 0, ram: 0 }
    }
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'running':
        return { 
          label: 'Ejecutándose', 
          color: 'text-green-700 bg-green-50 border-green-200', 
          icon: Play,
          pulse: true 
        };
      case 'paused':
        return { 
          label: 'Pausado', 
          color: 'text-yellow-700 bg-yellow-50 border-yellow-200', 
          icon: Pause,
          pulse: false 
        };
      case 'queued':
        return { 
          label: 'En Cola', 
          color: 'text-blue-700 bg-blue-50 border-blue-200', 
          icon: Clock,
          pulse: false 
        };
      case 'error':
        return { 
          label: 'Error', 
          color: 'text-red-700 bg-red-50 border-red-200', 
          icon: AlertTriangle,
          pulse: false 
        };
      default:
        return { 
          label: 'Desconocido', 
          color: 'text-gray-700 bg-gray-50 border-gray-200', 
          icon: AlertTriangle,
          pulse: false 
        };
    }
  };

  const handleNotebookAction = (id: number, action: string) => {
    setNotebooks(prev => prev.map(notebook => 
      notebook.id === id 
        ? { 
            ...notebook, 
            status: action === 'play' ? 'running' : action === 'pause' ? 'paused' : 'queued' 
          }
        : notebook
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Cuadernos</h2>
          <p className="text-gray-600">Espacio 2: Orquestación y seguimiento de notebooks</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Cuaderno
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {notebooks.filter(n => n.status === 'running').length}
              </div>
              <div className="text-sm text-gray-500">Ejecutándose</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Pause className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {notebooks.filter(n => n.status === 'paused').length}
              </div>
              <div className="text-sm text-gray-500">Pausados</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {notebooks.filter(n => n.status === 'queued').length}
              </div>
              <div className="text-sm text-gray-500">En Cola</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {notebooks.filter(n => n.status === 'error').length}
              </div>
              <div className="text-sm text-gray-500">Con Error</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Cuadernos Activos</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {notebooks.map((notebook) => {
            const statusInfo = getStatusInfo(notebook.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={notebook.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h4 className="font-medium text-gray-900">{notebook.name}</h4>
                      <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${statusInfo.color}`}>
                        <StatusIcon className={`w-4 h-4 ${statusInfo.pulse ? 'animate-pulse' : ''}`} />
                        {statusInfo.label}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Cuenta:</span>
                        <div>{notebook.account}</div>
                      </div>
                      <div>
                        <span className="font-medium">Tiempo activo:</span>
                        <div>{notebook.runtime}</div>
                      </div>
                      <div>
                        <span className="font-medium">Último checkpoint:</span>
                        <div>{notebook.lastCheckpoint}</div>
                      </div>
                      <div>
                        <span className="font-medium">Celdas:</span>
                        <div>{notebook.cells.executed}/{notebook.cells.total}</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progreso de ejecución</span>
                        <span className="font-medium">{notebook.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${notebook.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-6">
                      <div className="text-xs">
                        <span className="text-gray-500">CPU:</span>
                        <span className="ml-1 font-medium">{notebook.resources.cpu}%</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">GPU:</span>
                        <span className="ml-1 font-medium">{notebook.resources.gpu}%</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">RAM:</span>
                        <span className="ml-1 font-medium">{notebook.resources.ram}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    {notebook.status === 'paused' && (
                      <button 
                        onClick={() => handleNotebookAction(notebook.id, 'play')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Reanudar"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {notebook.status === 'running' && (
                      <button 
                        onClick={() => handleNotebookAction(notebook.id, 'pause')}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Pausar"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleNotebookAction(notebook.id, 'restart')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Reiniciar"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleNotebookAction(notebook.id, 'stop')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Detener"
                    >
                      <Square className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotebookManagement;