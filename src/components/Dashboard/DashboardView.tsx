import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MousePointerClick, 
  Globe, 
  Shield, 
  Clock,
  Eye,
  TrendingUp,
  Server,
  Activity
} from "lucide-react";

interface DashboardViewProps {
  isRunning: boolean;
}

export function DashboardView({ isRunning }: DashboardViewProps) {
  // Mock data for demonstration
  const stats = {
    totalVisits: "24,847",
    activeThreads: isRunning ? "12" : "0",
    successRate: "98.7%",
    avgStayTime: "2m 34s"
  };

  const recentActivity = [
    { url: "https://example.com", visits: 156, status: "active" },
    { url: "https://demo.site", visits: 89, status: "active" },
    { url: "https://test.com", visits: 234, status: "paused" },
    { url: "https://sample.org", visits: 67, status: "active" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Visits Today"
          value={stats.totalVisits}
          icon={Eye}
          change="+12.5% from yesterday"
          trend="up"
        />
        <StatsCard
          title="Active Threads"
          value={stats.activeThreads}
          icon={Activity}
          change={isRunning ? "Running smoothly" : "Stopped"}
          trend={isRunning ? "up" : "neutral"}
        />
        <StatsCard
          title="Success Rate"
          value={stats.successRate}
          icon={TrendingUp}
          change="+0.8% from last hour"
          trend="up"
        />
        <StatsCard
          title="Avg Stay Time"
          value={stats.avgStayTime}
          icon={Clock}
          change="Target: 2-5 minutes"
          trend="up"
        />
      </div>

      {/* Traffic Progress */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Traffic Generation Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Daily Target Progress</span>
              <span className="font-medium">24,847 / 50,000</span>
            </div>
            <Progress value={49.7} className="h-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-info">156</div>
              <div className="text-xs text-muted-foreground">Visits/Hour</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-xs text-muted-foreground">Active Proxies</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20">
              <div className="text-2xl font-bold text-warning">847</div>
              <div className="text-xs text-muted-foreground">User Agents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.url}</p>
                    <p className="text-sm text-muted-foreground">{activity.visits} visits today</p>
                  </div>
                </div>
                <Badge 
                  variant={activity.status === 'active' ? 'default' : 'secondary'}
                  className={activity.status === 'active' ? 'bg-success text-success-foreground' : ''}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}