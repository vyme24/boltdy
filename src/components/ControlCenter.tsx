import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Zap, Activity, FileText, Download } from 'lucide-react';

const ControlCenter: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState({
    overall: 'healthy',
    lastUpdate: new Date(),
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Alta utilización de GPU',
        message: 'usuario1@gmail.com está usando 89% GPU durante más de 2 horas',
        timestamp: '2 min ago',
        severity: 'medium'
      },
      {
        id: 2,
        type: 'error',
        title: 'Cuaderno interrumpido',
        message: 'Transformers_Fine_Tuning.ipynb falló en la celda 12',
        timestamp: '15 min ago',
        severity: 'high'
      },
      {
        id: 3,
        type: 'info',
        title: 'Checkpoint automático',
        message: 'CNN_Clasificacion_Imagenes.ipynb guardado automáticamente',
        timestamp: '1 hora ago',
        severity: 'low'
      }
    ],
    logs: [
      {
        id: 1,
        timestamp: '2024-01-20 14:45:23',
        level: 'INFO',
        source: 'AccountManager',
        message: 'Cuenta usuario1@gmail.com rotada exitosamente'
      },
      {
        id: 2,
        timestamp: '2024-01-20 14:42:15',
        level: 'ERROR',
        source: 'NotebookRunner',
        message: 'Transformers_Fine_Tuning.ipynb: CUDA out of memory'
      },
      {
        id: 3,
        timestamp: '2024-01-20 14:38:07',
        level: 'WARN',
        source: 'ResourceMonitor',
        message: 'GPU utilization > 85% durante 120 min'
      },
      {
        id: 4,
        timestamp: '2024-01-20 14:35:42',
        level: 'INFO',
        source: 'CheckpointManager',
        message: 'Checkpoint creado para CNN_Clasificacion_Imagenes.ipynb'
      }
    ]
  });

  const [healthMetrics, setHealthMetrics] = useState({
    systemUptime: '15d 7h 23m',
    totalOperations: 15420,
    successRate: 98.7,
    avgResponseTime: 245,
    activeConnections: 23,
    errorRate: 1.3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-600 bg-red-50';
      case 'WARN':
        return 'text-yellow-600 bg-yellow-50';
      case 'INFO':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Central de Control</h2>
        <p className="text-gray-600">Monitoreo integral y alertas del sistema IAColab</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Estado del Sistema</h3>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Saludable</span>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tiempo activo:</span>
              <span className="font-medium">{healthMetrics.systemUptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Operaciones totales:</span>
              <span className="font-medium">{healthMetrics.totalOperations.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de éxito:</span>
              <span className="font-medium text-green-600">{healthMetrics.successRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Rendimiento</h3>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tiempo respuesta:</span>
              <span className="font-medium">{healthMetrics.avgResponseTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conexiones activas:</span>
              <span className="font-medium">{healthMetrics.activeConnections}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de errores:</span>
              <span className="font-medium text-yellow-600">{healthMetrics.errorRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Última Actualización</h3>
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {systemStatus.lastUpdate.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {systemStatus.lastUpdate.toLocaleDateString()}
            </div>
            <div className="mt-4">
              <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                En vivo
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Alertas Recientes</h3>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                {systemStatus.alerts.filter(a => a.severity === 'high').length} críticas
              </span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {systemStatus.alerts.map((alert) => (
              <div key={alert.id} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {alert.severity === 'high' ? 'Alta' : 
                         alert.severity === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Logs del Sistema</h3>
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto font-mono text-sm">
            {systemStatus.logs.map((log) => (
              <div key={log.id} className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <span className="text-xs text-gray-500 min-w-[140px]">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLogLevelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <span className="text-xs text-gray-600 min-w-[120px]">{log.source}</span>
                  <span className="text-xs text-gray-800 flex-1">{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Salud del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-green-700">Cuentas Funcionando</div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">2</div>
                <div className="text-sm text-red-700">Cuentas Bloqueadas</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">13</div>
                <div className="text-sm text-blue-700">Entrenamientos OK</div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <div className="text-sm text-yellow-700">Requieren Atención</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;