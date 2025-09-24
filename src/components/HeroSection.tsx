import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Zap, 
  Brain, 
  Target, 
  Shield, 
  ArrowRight,
  Users,
  CheckCircle2,
  Clock
} from 'lucide-react';
import heroImage from '@/assets/hero-ai-tester.jpg';

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background to-surface">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-cyber text-white border-0 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Testing
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Multi-Agent
                </span>
                <br />
                <span className="text-foreground">Game Testing</span>
                <br />
                <span className="bg-gradient-secondary bg-clip-text text-transparent">
                  Platform
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Leverage advanced LangChain agents to automatically generate, execute, and validate 
                comprehensive test cases for web-based games.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">LangChain Planning</div>
                  <div className="text-xs text-muted-foreground">Smart test generation</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-secondary/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Multi-Agent System</div>
                  <div className="text-xs text-muted-foreground">4 specialized agents</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-cyber/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-sm">Cross Validation</div>
                  <div className="text-xs text-muted-foreground">Repeat & agent checks</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-status-success/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-status-success" />
                </div>
                <div>
                  <div className="font-medium text-sm">Smart Selection</div>
                  <div className="text-xs text-muted-foreground">Top 10 from 25+</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Testing Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="cyber-border">
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-xs text-muted-foreground">Test Cases Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">10</div>
                <div className="text-xs text-muted-foreground">Top Tests Executed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">4</div>
                <div className="text-xs text-muted-foreground">AI Agents Working</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden cyber-border bg-gradient-surface">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="AI Testing Agent analyzing game interfaces"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                    <div className="status-indicator active mr-2" />
                    Live Testing
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                    Target: ezygamers.com
                  </Badge>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 cyber-border bg-gradient-surface">
                <div className="flex items-center gap-3">
                  <div className="status-indicator active" />
                  <div>
                    <div className="font-medium text-sm">Planning Agent</div>
                    <div className="text-xs text-muted-foreground">Analyzing game patterns</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-status-success" />
                  <span className="text-xs">Ready to generate</span>
                </div>
              </Card>
              
              <Card className="p-4 cyber-border bg-gradient-surface">
                <div className="flex items-center gap-3">
                  <div className="status-indicator active" />
                  <div>
                    <div className="font-medium text-sm">Validation Agent</div>
                    <div className="text-xs text-muted-foreground">Cross-checking results</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-status-warning" />
                  <span className="text-xs">Standby mode</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};