import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dashboard } from './Dashboard';
import { TestCaseGenerator } from './TestCaseGenerator';
import { ReportViewer } from './ReportViewer';
import { HeroSection } from './HeroSection';
import { 
  LayoutDashboard, 
  Brain, 
  FileText, 
  Settings,
  Zap,
  Target,
  Home
} from 'lucide-react';

export const MainApp = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-cyber flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  GameTest AI
                </h1>
                <p className="text-xs text-muted-foreground">Multi-Agent Testing Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="status-indicator active" />
                <span className="text-muted-foreground">4 Agents Online</span>
              </div>
              
              <Button variant="outline" size="sm" className="cyber-border">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-surface/80 backdrop-blur-sm p-1">
            <TabsTrigger 
              value="home" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="generator" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <Brain className="w-4 h-4 mr-2" />
              Test Generator
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <HeroSection />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="generator" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">AI Test Case Generation</h2>
              <p className="text-muted-foreground">
                Use LangChain-powered agents to automatically generate and prioritize test cases
              </p>
            </div>
            <TestCaseGenerator />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Execution Reports</h2>
              <p className="text-muted-foreground">
                View detailed results from multi-agent test execution and validation
              </p>
            </div>
            <ReportViewer />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Target: ezygamers.com</span>
              </div>
              <div>LangChain Planning Engine</div>
              <div>Multi-Agent Validation</div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Powered by GameTest AI Platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};