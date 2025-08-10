import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Key, Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const AccountManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const accounts = [
    {
      id: 1,
      email: 'usuario1@gmail.com',
      status: 'active',
      lastUsed: '2 min ago',
      notebooks: 3,
      resources: { cpu: 45, gpu: 67, ram: 78 }
    },
    {
      id: 2,
      email: 'usuario2@gmail.com',
      status: 'free',
      lastUsed: '1 hora ago',
      notebooks: 0,
      resources: { cpu: 0, gpu: 0, ram: 15 }
    },
    {
      id: 3,
      email: 'usuario3@gmail.com',
      status: 'blocked',
      lastUsed: '3 dias ago',
      notebooks: 0,
      resources: { cpu: 0, gpu: 0, ram: 0 }
    },
    {
      id: 4,
      email: 'usuario4@gmail.com',
      status: 'active',
      lastUsed: '5 min ago',
      notebooks: 2,
      resources: { cpu: 67, gpu: 89, ram: 56 }
    },
    {
      id: 5,
      email: 'usuario5@gmail.com',
      status: 'free',
      lastUsed: '30 min ago',
      notebooks: 0,
      resources: { cpu: 0, gpu: 0, ram: 20 }
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'En Uso', color: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle };
      case 'free':
        return { label: 'Libre', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: Clock };
      case 'blocked':
        return { label: 'Bloqueada', color: 'text-red-700 bg-red-50 border-red-200', icon: AlertCircle };
      default:
        return { label: 'Desconocido', color: 'text-gray-700 bg-gray-50 border-gray-200', icon: AlertCircle };
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || account.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Administración de Cuentas</h2>
          <p className="text-gray-600">Espacio 1: Gestión y control de cuentas Google</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva Cuenta
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cuentas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">En Uso</option>
            <option value="free">Libre</option>
            <option value="blocked">Bloqueada</option>
          </select>
        </div>

        <div className="grid gap-4">
          {filteredAccounts.map((account) => {
            const statusInfo = getStatusInfo(account.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={account.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {account.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{account.email}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>Última actividad: {account.lastUsed}</span>
                        <span>{account.notebooks} cuadernos activos</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2 text-xs">
                      <div className="bg-gray-50 px-2 py-1 rounded">
                        CPU: {account.resources.cpu}%
                      </div>
                      <div className="bg-gray-50 px-2 py-1 rounded">
                        GPU: {account.resources.gpu}%
                      </div>
                      <div className="bg-gray-50 px-2 py-1 rounded">
                        RAM: {account.resources.ram}%
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusInfo.label}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Key className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Shield className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Cuentas Activas</h3>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {accounts.filter(acc => acc.status === 'active').length}
          </div>
          <p className="text-sm text-gray-500 mt-2">En uso actualmente</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Cuentas Libres</h3>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {accounts.filter(acc => acc.status === 'free').length}
          </div>
          <p className="text-sm text-gray-500 mt-2">Disponibles para uso</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Cuentas Bloqueadas</h3>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600">
            {accounts.filter(acc => acc.status === 'blocked').length}
          </div>
          <p className="text-sm text-gray-500 mt-2">Requieren atención</p>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;