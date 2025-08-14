import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { DashboardView } from "@/components/Dashboard/DashboardView";
import { ProxyManager } from "@/components/Proxies/ProxyManager";
import { CampaignSettings } from "@/components/Campaigns/CampaignSettings";
import { UserAgentManager } from "@/components/UserAgents/UserAgentManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRunning, setIsRunning] = useState(false);

  const toggleRunning = () => {
    setIsRunning(prev => !prev);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView isRunning={isRunning} />;
      case 'campaigns':
        return <CampaignSettings />;
      case 'proxies':
        return <ProxyManager />;
      case 'user-agents':
        return <UserAgentManager />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Settings</h2>
            </div>
            <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced settings and configuration options will be available here.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <DashboardView isRunning={isRunning} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isRunning={isRunning}
        onToggleRunning={toggleRunning}
      />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;