import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AccountManagement from './components/AccountManagement';
import MetricsPanel from './components/MetricsPanel';
import NotebookManagement from './components/NotebookManagement';
import ControlCenter from './components/ControlCenter';
import Header from './components/Header';

function App() {
  const [activeSection, setActiveSection] = useState('accounts');
  const [systemHealth, setSystemHealth] = useState({
    activeAccounts: 8,
    blockedAccounts: 2,
    runningNotebooks: 15,
    totalResources: 85
  });

  useEffect(() => {
    // Simular actualizaciones en tiempo real
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        activeAccounts: Math.floor(Math.random() * 3) + 7,
        runningNotebooks: Math.floor(Math.random() * 5) + 13,
        totalResources: Math.floor(Math.random() * 20) + 75
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'accounts':
        return <AccountManagement />;
      case 'metrics':
        return <MetricsPanel />;
      case 'notebooks':
        return <NotebookManagement />;
      case 'control':
        return <ControlCenter />;
      default:
        return <AccountManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Header systemHealth={systemHealth} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;