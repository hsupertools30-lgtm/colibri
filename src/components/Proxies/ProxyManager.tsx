import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Shield, Plus, Check, X, Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Proxy {
  id: string;
  host: string;
  port: string;
  type: 'http' | 'https' | 'socks4' | 'socks5';
  username?: string;
  password?: string;
  status: 'active' | 'inactive' | 'testing';
  responseTime?: number;
}

export function ProxyManager() {
  const { toast } = useToast();
  const [proxies, setProxies] = useState<Proxy[]>([
    { id: '1', host: '192.168.1.100', port: '8080', type: 'http', status: 'active', responseTime: 150 },
    { id: '2', host: '10.0.0.50', port: '3128', type: 'https', status: 'active', responseTime: 200 },
    { id: '3', host: '172.16.0.25', port: '1080', type: 'socks5', status: 'inactive' },
  ]);
  
  const [newProxy, setNewProxy] = useState({
    host: '',
    port: '',
    type: 'http' as const,
    username: '',
    password: ''
  });
  
  const [bulkProxies, setBulkProxies] = useState('');
  const [testingProxy, setTestingProxy] = useState<string | null>(null);

  const handleAddProxy = () => {
    if (!newProxy.host || !newProxy.port) {
      toast({
        title: "Error",
        description: "Please enter host and port",
        variant: "destructive"
      });
      return;
    }

    const proxy: Proxy = {
      id: Date.now().toString(),
      ...newProxy,
      status: 'inactive'
    };

    setProxies(prev => [...prev, proxy]);
    setNewProxy({ host: '', port: '', type: 'http', username: '', password: '' });
    
    toast({
      title: "Success",
      description: "Proxy added successfully"
    });
  };

  const handleBulkAdd = () => {
    const lines = bulkProxies.split('\n').filter(line => line.trim());
    const newProxies: Proxy[] = [];

    lines.forEach(line => {
      const parts = line.trim().split(':');
      if (parts.length >= 2) {
        newProxies.push({
          id: Date.now().toString() + Math.random(),
          host: parts[0],
          port: parts[1],
          type: 'http',
          username: parts[2] || '',
          password: parts[3] || '',
          status: 'inactive'
        });
      }
    });

    setProxies(prev => [...prev, ...newProxies]);
    setBulkProxies('');
    
    toast({
      title: "Success",
      description: `Added ${newProxies.length} proxies`
    });
  };

  const testProxy = async (proxy: Proxy) => {
    setTestingProxy(proxy.id);
    
    // Simulate proxy testing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isWorking = Math.random() > 0.3; // 70% success rate
    const responseTime = Math.floor(Math.random() * 500) + 100;
    
    setProxies(prev => prev.map(p => 
      p.id === proxy.id 
        ? { ...p, status: isWorking ? 'active' : 'inactive', responseTime: isWorking ? responseTime : undefined }
        : p
    ));
    
    setTestingProxy(null);
    
    toast({
      title: isWorking ? "Success" : "Failed",
      description: isWorking ? `Proxy is working (${responseTime}ms)` : "Proxy is not responding",
      variant: isWorking ? "default" : "destructive"
    });
  };

  const removeProxy = (id: string) => {
    setProxies(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Removed",
      description: "Proxy removed successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Proxy Management</h2>
      </div>

      {/* Add Single Proxy */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle>Add New Proxy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="host">Host/IP</Label>
              <Input
                id="host"
                placeholder="192.168.1.100"
                value={newProxy.host}
                onChange={(e) => setNewProxy(prev => ({ ...prev, host: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="port">Port</Label>
              <Input
                id="port"
                placeholder="8080"
                value={newProxy.port}
                onChange={(e) => setNewProxy(prev => ({ ...prev, port: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={newProxy.type} onValueChange={(value: any) => setNewProxy(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="http">HTTP</SelectItem>
                  <SelectItem value="https">HTTPS</SelectItem>
                  <SelectItem value="socks4">SOCKS4</SelectItem>
                  <SelectItem value="socks5">SOCKS5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddProxy} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Proxy
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username">Username (Optional)</Label>
              <Input
                id="username"
                placeholder="Username"
                value={newProxy.username}
                onChange={(e) => setNewProxy(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={newProxy.password}
                onChange={(e) => setNewProxy(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Add Proxies */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle>Bulk Add Proxies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bulk-proxies">Proxies (Format: host:port or host:port:username:password)</Label>
            <Textarea
              id="bulk-proxies"
              placeholder="192.168.1.100:8080&#10;10.0.0.50:3128:user:pass&#10;172.16.0.25:1080"
              value={bulkProxies}
              onChange={(e) => setBulkProxies(e.target.value)}
              rows={6}
            />
          </div>
          <Button onClick={handleBulkAdd} disabled={!bulkProxies.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add All Proxies
          </Button>
        </CardContent>
      </Card>

      {/* Proxy List */}
      <Card className="bg-gradient-to-br from-card to-accent/5 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Proxy List ({proxies.length})
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => proxies.forEach(proxy => testProxy(proxy))}
            >
              Test All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proxies.map((proxy) => (
              <div key={proxy.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      proxy.status === 'active' ? 'bg-success' : 
                      proxy.status === 'testing' ? 'bg-warning' : 'bg-destructive'
                    }`} />
                    <span className="font-mono text-sm">{proxy.host}:{proxy.port}</span>
                  </div>
                  <Badge variant="outline">{proxy.type.toUpperCase()}</Badge>
                  {proxy.responseTime && (
                    <Badge variant="secondary">{proxy.responseTime}ms</Badge>
                  )}
                  {proxy.username && (
                    <Badge variant="outline">Auth</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testProxy(proxy)}
                    disabled={testingProxy === proxy.id}
                  >
                    {testingProxy === proxy.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : proxy.status === 'active' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeProxy(proxy.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {proxies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No proxies added yet. Add some proxies to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}