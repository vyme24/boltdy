import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface HeaderProps {
  systemHealth: {
    activeAccounts: number;
    blockedAccounts: number;
    runningNotebooks: number;
    totalResources: number;
  };
}

const Header: React.FC<HeaderProps> = ({ systemHealth }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{systemHealth.activeAccounts} Cuentas Activas</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">{systemHealth.runningNotebooks} Cuadernos Ejecutándose</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">Recursos: {systemHealth.totalResources}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {systemHealth.blockedAccounts > 0 && (
              <div className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                <AlertTriangle className="w-4 h-4" />
                {systemHealth.blockedAccounts} Bloqueadas
              </div>
            )}
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              Sistema Operativo
            </div>
          </div>
          
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;