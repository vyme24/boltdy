import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Zap, Activity, TrendingUp } from 'lucide-react';

const MetricsPanel: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalCPU: 67,
    totalGPU: 45,
    totalRAM: 78,
    totalStorage: 42,
    activeCores: 156,
    totalCores: 240,
    gpuHours: 2847,
    computeUnits: 15420
  });

  const [chartData, setChartData] = useState({
    cpuUsage: [45, 52, 48, 61, 67, 58, 72],
    gpuUsage: [23, 34, 45, 52, 45, 48, 45],
    ramUsage: [67, 71, 78, 75, 82, 78, 85]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalCPU: Math.floor(Math.random() * 30) + 50,
        totalGPU: Math.floor(Math.random() * 40) + 30,
        totalRAM: Math.floor(Math.random() * 25) + 65,
        totalStorage: Math.floor(Math.random() * 20) + 35
      }));

      setChartData(prev => ({
        cpuUsage: [...prev.cpuUsage.slice(1), Math.floor(Math.random() * 30) + 50],
        gpuUsage: [...prev.gpuUsage.slice(1), Math.floor(Math.random() * 40) + 30],
        ramUsage: [...prev.ramUsage.slice(1), Math.floor(Math.random() * 25) + 65]
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const ResourceCard = ({ title, value, unit, icon: Icon, color, trend }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">En tiempo real</p>
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+{trend}%</span>
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-lg text-gray-500 mb-1">{unit}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Uso actual</span>
          <span>{value}{unit}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              color.replace('bg-', 'bg-').replace('-500', '-400')
            }`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const SimpleChart = ({ data, label, color }: any) => {
    const max = Math.max(...data);
    const points = data.map((value: number, index: number) => {
      const x = (index / (data.length - 1)) * 300;
      const y = 100 - (value / max) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">{label}</h3>
        <div className="relative">
          <svg width="100%" height="120" viewBox="0 0 300 100" className="overflow-visible">
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="3"
              points={points}
              className="transition-all duration-1000"
            />
            {data.map((value: number, index: number) => {
              const x = (index / (data.length - 1)) * 300;
              const y = 100 - (value / max) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={color}
                  className="transition-all duration-1000"
                />
              );
            })}
          </svg>
          <div className="mt-2 text-sm text-gray-600">
            Último valor: {data[data.length - 1]}%
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Métricas y Recursos</h2>
        <p className="text-gray-600">Espacio 3: Supervisión y análisis de recursos computacionales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResourceCard
          title="CPU Total"
          value={metrics.totalCPU}
          unit="%"
          icon={Cpu}
          color="bg-blue-500"
          trend={5}
        />
        <ResourceCard
          title="GPU Total"
          value={metrics.totalGPU}
          unit="%"
          icon={Zap}
          color="bg-green-500"
          trend={12}
        />
        <ResourceCard
          title="RAM Total"
          value={metrics.totalRAM}
          unit="%"
          icon={Activity}
          color="bg-purple-500"
          trend={3}
        />
        <ResourceCard
          title="Almacenamiento"
          value={metrics.totalStorage}
          unit="%"
          icon={HardDrive}
          color="bg-orange-500"
          trend={8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SimpleChart
          data={chartData.cpuUsage}
          label="Uso de CPU (Últimos 7 minutos)"
          color="#3B82F6"
        />
        <SimpleChart
          data={chartData.gpuUsage}
          label="Uso de GPU (Últimos 7 minutos)"
          color="#10B981"
        />
        <SimpleChart
          data={chartData.ramUsage}
          label="Uso de RAM (Últimos 7 minutos)"
          color="#8B5CF6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Núcleos Activos</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {metrics.activeCores}
            </div>
            <div className="text-gray-500">de {metrics.totalCores} disponibles</div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(metrics.activeCores / metrics.totalCores) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Horas GPU Consumidas</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {metrics.gpuHours.toLocaleString()}
            </div>
            <div className="text-gray-500">Este mes</div>
            <div className="mt-4 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
              +247 horas hoy
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Unidades de Cómputo</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {metrics.computeUnits.toLocaleString()}
            </div>
            <div className="text-gray-500">Total procesadas</div>
            <div className="mt-4 text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block">
              98.7% eficiencia
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Distribución de Recursos por Cuenta</h3>
        <div className="space-y-4">
          {[
            { account: 'usuario1@gmail.com', cpu: 25, gpu: 15, ram: 30 },
            { account: 'usuario2@gmail.com', cpu: 18, gpu: 12, ram: 22 },
            { account: 'usuario4@gmail.com', cpu: 24, gpu: 18, ram: 26 }
          ].map((item, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900">{item.account}</span>
                <span className="text-sm text-gray-500">Total: {item.cpu + item.gpu + item.ram}% recursos</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU</span>
                    <span>{item.cpu}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.cpu * 4}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>GPU</span>
                    <span>{item.gpu}%</span>
                  </div>
                  <div className="w-full bg-green-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.gpu * 4}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>RAM</span>
                    <span>{item.ram}%</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${item.ram * 4}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;