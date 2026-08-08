import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { AiChat } from './components/AiChat';
import { UserDashboard } from './components/UserDashboard';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { SupportProgramsView } from './components/SupportProgramsView';
import { ExpertTicketsView } from './components/ExpertTicketsView';
import { AdminPanel } from './components/AdminPanel';
import { ExpertTicket } from './types';
import { INITIAL_TICKETS } from './data/demoData';

export default function App() {
  const [activePage, setActivePage] = useState<string>('landing');
  const [currentRole, setCurrentRole] = useState<'founder' | 'expert'>('founder');
  const [tickets, setTickets] = useState<ExpertTicket[]>(INITIAL_TICKETS);

  // Fetch Tickets from API
  const refreshTickets = async () => {
    try {
      const res = await fetch('/api/tickets');
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (e) {
      console.error('Failed to fetch tickets:', e);
    }
  };

  useEffect(() => {
    refreshTickets();
  }, []);

  // When role changes to expert, switch to admin or tickets view
  const handleRoleChange = (newRole: 'founder' | 'expert') => {
    setCurrentRole(newRole);
    if (newRole === 'expert' && activePage !== 'admin') {
      setActivePage('admin');
    } else if (newRole === 'founder' && activePage === 'admin') {
      setActivePage('dashboard');
    }
  };

  const pendingTicketsCount = tickets.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onNavigate={setActivePage}
        activePage={activePage}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden p-3 gap-3 sm:p-4 sm:gap-4">
        {/* Left Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          pendingTicketsCount={pendingTicketsCount}
          currentRole={currentRole}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
          {activePage === 'landing' && (
            <LandingPage onNavigate={setActivePage} />
          )}

          {activePage === 'chat' && (
            <AiChat
              onNavigate={setActivePage}
              onTicketCreated={() => {
                refreshTickets();
              }}
            />
          )}

          {activePage === 'dashboard' && (
            <UserDashboard
              tickets={tickets}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'knowledge' && (
            <KnowledgeBaseView
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'support' && (
            <SupportProgramsView
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'tickets' && (
            <ExpertTicketsView
              tickets={tickets}
              onNavigate={setActivePage}
              onRefreshTickets={refreshTickets}
            />
          )}

          {activePage === 'admin' && (
            <AdminPanel
              tickets={tickets}
              onRefreshTickets={refreshTickets}
            />
          )}
        </main>
      </div>
    </div>
  );
}
