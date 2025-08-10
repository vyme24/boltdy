import React from 'react';
import { Users, BarChart3, BookOpen, Shield, Settings } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    {
      id: 'accounts',
      label: 'Administración de Cuentas',
      icon: Users,
      description: 'Espacio 1'
    },
    {
      id: 'metrics',
      label: 'Métricas y Recursos',
      icon: BarChart3,
      description: 'Espacio 3'
    },
    {
      id: 'notebooks',
      label: 'Gestión de Cuadernos',
      icon: BookOpen,
      description: 'Espacio 2'
    },
    {
      id: 'control',
      label: 'Central de Control',
      icon: Shield,
      description: 'Monitoreo'
    }
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IA</span>
          </div>
          IAColab
        </h1>
        <p className="text-sm text-gray-600 mt-1">Sistema de Gestión Google Colab</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4">
        <button className="w-full p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
          <Settings className="w-5 h-5" />
          <span>Configuración</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;