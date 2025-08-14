import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Globe, 
  Settings, 
  Shield, 
  Users, 
  Play, 
  Pause,
  Activity
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isRunning: boolean;
  onToggleRunning: () => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'campaigns', label: 'Campaigns', icon: Globe },
  { id: 'proxies', label: 'Proxies', icon: Shield },
  { id: 'user-agents', label: 'User Agents', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange, isRunning, onToggleRunning }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">TrafficGen Pro</h1>
            <p className="text-xs text-muted-foreground">Web Traffic Generator</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Button
          onClick={onToggleRunning}
          className={cn(
            "w-full justify-start gap-3 mb-6",
            isRunning 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
              : "bg-success hover:bg-success/90 text-success-foreground"
          )}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Stop Traffic' : 'Start Traffic'}
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isRunning ? "bg-success animate-pulse" : "bg-muted"
          )} />
          Status: {isRunning ? 'Running' : 'Stopped'}
        </div>
      </div>
    </div>
  );
}