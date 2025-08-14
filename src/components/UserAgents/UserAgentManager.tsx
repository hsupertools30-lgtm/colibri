import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Users, Download, Plus, Trash2, RefreshCw, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserAgent {
  id: string;
  userAgent: string;
  browser: string;
  os: string;
  device: string;
}

export function UserAgentManager() {
  const { toast } = useToast();
  
  const [userAgents, setUserAgents] = useState<UserAgent[]>([
    {
      id: '1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      browser: 'Chrome',
      os: 'Windows',
      device: 'Desktop'
    },
    {
      id: '2',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
      browser: 'Safari',
      os: 'macOS',
      device: 'Desktop'
    },
    {
      id: '3',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      browser: 'Chrome',
      os: 'Linux',
      device: 'Desktop'
    }
  ]);

  const [useBuiltIn, setUseBuiltIn] = useState(true);
  const [customUserAgents, setCustomUserAgents] = useState('');
  const [scraperSettings, setScraperSettings] = useState({
    browser: 'all',
    os: 'all',
    device: 'all',
    limit: 100
  });
  const [isScrapingAll, setIsScrapingAll] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(0);

  const addCustomUserAgents = () => {
    const lines = customUserAgents.split('\n').filter(line => line.trim());
    const newUserAgents: UserAgent[] = [];

    lines.forEach(line => {
      const ua = line.trim();
      if (ua) {
        // Simple detection logic
        let browser = 'Unknown';
        let os = 'Unknown';
        let device = 'Desktop';

        if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';

        if (ua.includes('Windows')) os = 'Windows';
        else if (ua.includes('Mac OS X')) os = 'macOS';
        else if (ua.includes('Linux')) os = 'Linux';
        else if (ua.includes('Android')) os = 'Android';
        else if (ua.includes('iOS')) os = 'iOS';

        if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) device = 'Mobile';
        else if (ua.includes('Tablet') || ua.includes('iPad')) device = 'Tablet';

        newUserAgents.push({
          id: Date.now().toString() + Math.random(),
          userAgent: ua,
          browser,
          os,
          device
        });
      }
    });

    setUserAgents(prev => [...prev, ...newUserAgents]);
    setCustomUserAgents('');
    
    toast({
      title: "Success",
      description: `Added ${newUserAgents.length} user agents`
    });
  };

  const scrapeUserAgents = async () => {
    setIsScrapingAll(true);
    setScrapingProgress(0);

    // Simulate scraping process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setScrapingProgress(i);
    }

    // Add mock scraped user agents
    const mockUserAgents: UserAgent[] = [
      {
        id: Date.now().toString() + '1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
        browser: 'Firefox',
        os: 'Windows',
        device: 'Desktop'
      },
      {
        id: Date.now().toString() + '2',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
        browser: 'Safari',
        os: 'iOS',
        device: 'Mobile'
      }
    ];

    setUserAgents(prev => [...prev, ...mockUserAgents]);
    setIsScrapingAll(false);
    setScrapingProgress(0);

    toast({
      title: "Success",
      description: `Scraped ${mockUserAgents.length} new user agents`
    });
  };

  const exportUserAgents = () => {
    const content = userAgents.map(ua => ua.userAgent).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-agents.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported",
      description: "User agents exported to file"
    });
  };

  const removeUserAgent = (id: string) => {
    setUserAgents(prev => prev.filter(ua => ua.id !== id));
  };

  const browserColors = {
    Chrome: 'bg-blue-500',
    Firefox: 'bg-orange-500',
    Safari: 'bg-purple-500',
    Edge: 'bg-green-500',
    Unknown: 'bg-gray-500'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">User Agent Management</h2>
      </div>

      {/* Settings */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle>User Agent Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Use Built-in User Agents</Label>
              <p className="text-xs text-muted-foreground">Use curated list of common user agents</p>
            </div>
            <Switch
              checked={useBuiltIn}
              onCheckedChange={setUseBuiltIn}
            />
          </div>
        </CardContent>
      </Card>

      {/* Built-in Scraper */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle>Built-in User Agent Scraper</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Browser</Label>
              <Select 
                value={scraperSettings.browser} 
                onValueChange={(value) => setScraperSettings(prev => ({ ...prev, browser: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Browsers</SelectItem>
                  <SelectItem value="chrome">Chrome</SelectItem>
                  <SelectItem value="firefox">Firefox</SelectItem>
                  <SelectItem value="safari">Safari</SelectItem>
                  <SelectItem value="edge">Edge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Operating System</Label>
              <Select 
                value={scraperSettings.os} 
                onValueChange={(value) => setScraperSettings(prev => ({ ...prev, os: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All OS</SelectItem>
                  <SelectItem value="windows">Windows</SelectItem>
                  <SelectItem value="macos">macOS</SelectItem>
                  <SelectItem value="linux">Linux</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Device Type</Label>
              <Select 
                value={scraperSettings.device} 
                onValueChange={(value) => setScraperSettings(prev => ({ ...prev, device: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Limit</Label>
              <Input
                type="number"
                value={scraperSettings.limit}
                onChange={(e) => setScraperSettings(prev => ({ ...prev, limit: parseInt(e.target.value) || 100 }))}
                min="1"
                max="1000"
              />
            </div>
          </div>

          {isScrapingAll && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scraping user agents...</span>
                <span>{scrapingProgress}%</span>
              </div>
              <Progress value={scrapingProgress} />
            </div>
          )}

          <Button 
            onClick={scrapeUserAgents} 
            disabled={isScrapingAll}
            className="w-full"
          >
            {isScrapingAll ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Scrape User Agents
          </Button>
        </CardContent>
      </Card>

      {/* Custom User Agents */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle>Add Custom User Agents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="custom-ua">User Agents (One per line)</Label>
            <Textarea
              id="custom-ua"
              placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
              value={customUserAgents}
              onChange={(e) => setCustomUserAgents(e.target.value)}
              rows={6}
            />
          </div>
          <Button onClick={addCustomUserAgents} disabled={!customUserAgents.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add User Agents
          </Button>
        </CardContent>
      </Card>

      {/* User Agent List */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            User Agent List ({userAgents.length})
            <Button 
              variant="outline" 
              size="sm"
              onClick={exportUserAgents}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userAgents.map((ua) => (
              <div key={ua.id} className="p-4 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${browserColors[ua.browser as keyof typeof browserColors]}`} />
                      <Badge variant="outline">{ua.browser}</Badge>
                      <Badge variant="secondary">{ua.os}</Badge>
                      <Badge variant="outline">{ua.device}</Badge>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground break-all">
                      {ua.userAgent}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeUserAgent(ua.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {userAgents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No user agents added yet. Add some user agents to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}