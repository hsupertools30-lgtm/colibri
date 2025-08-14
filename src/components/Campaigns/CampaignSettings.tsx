import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe, Plus, Trash2, Settings2, MousePointer, Eye, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CampaignSettings() {
  const { toast } = useToast();
  
  const [urls, setUrls] = useState([
    'https://example.com',
    'https://demo.site',
    'https://test.com'
  ]);
  
  const [newUrl, setNewUrl] = useState('');
  const [settings, setSettings] = useState({
    threads: [10],
    minStayTime: [30],
    maxStayTime: [300],
    trafficSource: 'organic',
    keyword: 'web traffic',
    enableScrolling: true,
    enableInternalPages: true,
    enableClickElement: false,
    clickSelector: '',
    hideBrowser: false,
    enableDoNotTrack: true,
    disableWebRTC: true,
    browser: 'chromium'
  });

  const addUrl = () => {
    if (!newUrl.trim()) return;
    
    try {
      new URL(newUrl);
      setUrls(prev => [...prev, newUrl.trim()]);
      setNewUrl('');
      toast({
        title: "Success",
        description: "URL added successfully"
      });
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
    }
  };

  const removeUrl = (index: number) => {
    setUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Campaign Settings</h2>
      </div>

      {/* Target URLs */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle>Target URLs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addUrl()}
            />
            <Button onClick={addUrl}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {urls.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm">{url}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeUrl(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Configuration */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            Traffic Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Threads */}
          <div className="space-y-3">
            <Label>Concurrent Threads: {settings.threads[0]}</Label>
            <Slider
              value={settings.threads}
              onValueChange={(value) => setSettings(prev => ({ ...prev, threads: value }))}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Number of simultaneous browser instances</p>
          </div>

          <Separator />

          {/* Stay Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Min Stay Time: {settings.minStayTime[0]}s</Label>
              <Slider
                value={settings.minStayTime}
                onValueChange={(value) => setSettings(prev => ({ ...prev, minStayTime: value }))}
                max={600}
                min={5}
                step={5}
              />
            </div>
            <div className="space-y-3">
              <Label>Max Stay Time: {settings.maxStayTime[0]}s</Label>
              <Slider
                value={settings.maxStayTime}
                onValueChange={(value) => setSettings(prev => ({ ...prev, maxStayTime: value }))}
                max={1800}
                min={30}
                step={15}
              />
            </div>
          </div>

          <Separator />

          {/* Traffic Source */}
          <div className="space-y-3">
            <Label>Traffic Source</Label>
            <Select 
              value={settings.trafficSource} 
              onValueChange={(value) => setSettings(prev => ({ ...prev, trafficSource: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organic">Organic (Search Engine)</SelectItem>
                <SelectItem value="direct">Direct Traffic</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.trafficSource === 'organic' && (
            <div className="space-y-3">
              <Label htmlFor="keyword">Search Keyword</Label>
              <Input
                id="keyword"
                placeholder="Enter search keyword"
                value={settings.keyword}
                onChange={(e) => setSettings(prev => ({ ...prev, keyword: e.target.value }))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Browser Behavior */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="w-5 h-5" />
            Browser Behavior
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Human-like Scrolling</Label>
                <p className="text-xs text-muted-foreground">Random smooth scrolling</p>
              </div>
              <Switch
                checked={settings.enableScrolling}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableScrolling: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Visit Internal Pages</Label>
                <p className="text-xs text-muted-foreground">Navigate to other pages on site</p>
              </div>
              <Switch
                checked={settings.enableInternalPages}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableInternalPages: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Hide Browser</Label>
                <p className="text-xs text-muted-foreground">Run in background</p>
              </div>
              <Switch
                checked={settings.hideBrowser}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, hideBrowser: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Do Not Track</Label>
                <p className="text-xs text-muted-foreground">Block tracking scripts</p>
              </div>
              <Switch
                checked={settings.enableDoNotTrack}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableDoNotTrack: checked }))}
              />
            </div>
          </div>

          <Separator />

          {/* Click Element */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Click on Element</Label>
                <p className="text-xs text-muted-foreground">Click specific elements on page</p>
              </div>
              <Switch
                checked={settings.enableClickElement}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableClickElement: checked }))}
              />
            </div>
            
            {settings.enableClickElement && (
              <div>
                <Label htmlFor="click-selector">CSS Selector</Label>
                <Input
                  id="click-selector"
                  placeholder=".button, #submit, a[href*='contact']"
                  value={settings.clickSelector}
                  onChange={(e) => setSettings(prev => ({ ...prev, clickSelector: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground mt-1">CSS selector for elements to click</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Browser Selection */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle>Browser Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Browser Engine</Label>
            <Select 
              value={settings.browser} 
              onValueChange={(value) => setSettings(prev => ({ ...prev, browser: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chromium">Chromium</SelectItem>
                <SelectItem value="firefox">Firefox</SelectItem>
                <SelectItem value="webkit">WebKit</SelectItem>
                <SelectItem value="camoufox">Camoufox (Fingerprint Spoofing)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Disable WebRTC</Label>
              <p className="text-xs text-muted-foreground">Prevent IP leaks</p>
            </div>
            <Switch
              checked={settings.disableWebRTC}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, disableWebRTC: checked }))}
            />
          </div>

          {settings.browser === 'camoufox' && (
            <div className="p-4 rounded-lg bg-info/10 border border-info/20">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-info" />
                <span className="font-medium text-info">Fingerprint Spoofing Enabled</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Camoufox browser will spoof RAM, CPU cores, GPU, screen resolution, fonts, and other browser fingerprints.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button 
          size="lg"
          onClick={() => toast({
            title: "Settings Saved",
            description: "Campaign settings have been updated successfully"
          })}
        >
          Save Campaign Settings
        </Button>
      </div>
    </div>
  );
}