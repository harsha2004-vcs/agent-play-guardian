import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  Zap,
  Users,
  Target,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface AgentStatus {
  id: string;
  name: string;
  status: 'idle' | 'planning' | 'executing' | 'validating' | 'complete' | 'error';
  progress: number;
  currentTask?: string;
}

interface TestExecution {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  testCasesGenerated: number;
  testCasesExecuted: number;
  validationsPassed: number;
  agents: AgentStatus[];
  startTime?: Date;
  duration?: number;
}

export const Dashboard = () => {
  const [execution, setExecution] = useState<TestExecution>({
    id: 'test-001',
    status: 'pending',
    progress: 0,
    testCasesGenerated: 0,
    testCasesExecuted: 0,
    validationsPassed: 0,
    agents: [
      { id: 'planner', name: 'Planning Agent', status: 'idle', progress: 0 },
      { id: 'generator', name: 'Test Generator', status: 'idle', progress: 0 },
      { id: 'executor', name: 'Execution Agent', status: 'idle', progress: 0 },
      { id: 'validator', name: 'Validation Agent', status: 'idle', progress: 0 },
    ]
  });

  const [isRunning, setIsRunning] = useState(false);

  const startExecution = () => {
    setIsRunning(true);
    setExecution(prev => ({
      ...prev,
      status: 'running',
      startTime: new Date()
    }));
    
    // Simulate multi-agent execution
    simulateExecution();
  };

  const simulateExecution = async () => {
    const phases = [
      { agent: 'planner', task: 'Analyzing target game...', duration: 2000 },
      { agent: 'generator', task: 'Generating test cases...', duration: 3000 },
      { agent: 'executor', task: 'Executing top 10 tests...', duration: 5000 },
      { agent: 'validator', task: 'Cross-validating results...', duration: 2000 },
    ];

    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      
      // Update agent status
      setExecution(prev => ({
        ...prev,
        agents: prev.agents.map(agent => 
          agent.id === phase.agent 
            ? { ...agent, status: 'executing' as const, currentTask: phase.task }
            : agent
        )
      }));

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, phase.duration / 10));
        
        setExecution(prev => ({
          ...prev,
          progress: (i * 25) + (progress / 4),
          testCasesGenerated: i >= 1 ? 25 : 0,
          testCasesExecuted: i >= 2 ? 10 : 0,
          validationsPassed: i >= 3 ? 8 : 0,
          agents: prev.agents.map(agent => 
            agent.id === phase.agent 
              ? { ...agent, progress }
              : agent
          )
        }));
      }

      // Mark agent as complete
      setExecution(prev => ({
        ...prev,
        agents: prev.agents.map(agent => 
          agent.id === phase.agent 
            ? { ...agent, status: 'complete' as const, progress: 100 }
            : agent
        )
      }));
    }

    // Mark execution as complete
    setExecution(prev => ({
      ...prev,
      status: 'completed',
      progress: 100,
      duration: Date.now() - (prev.startTime?.getTime() || 0)
    }));
    
    setIsRunning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'status-success';
      case 'completed': return 'status-info';
      case 'failed': return 'status-error';
      default: return 'muted';
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'executing': return 'status-warning';
      case 'complete': return 'status-success';
      case 'error': return 'status-error';
      default: return 'muted';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Multi-Agent Game Tester
          </h1>
          <p className="text-muted-foreground mt-1">
            Automated testing for ezygamers.com math puzzle game
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="cyber-border"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          
          <Button 
            onClick={startExecution}
            disabled={isRunning}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Testing
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 cyber-border bg-gradient-surface">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Execution Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`status-indicator ${execution.status === 'running' ? 'active' : execution.status === 'completed' ? 'active' : ''}`} />
                <Badge className={getStatusColor(execution.status)}>
                  {execution.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            <Activity className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 cyber-border bg-gradient-surface">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Test Cases</p>
              <p className="text-2xl font-bold text-primary">
                {execution.testCasesGenerated}
              </p>
              <p className="text-xs text-muted-foreground">Generated</p>
            </div>
            <Target className="w-8 h-8 text-secondary" />
          </div>
        </Card>

        <Card className="p-6 cyber-border bg-gradient-surface">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Executed</p>
              <p className="text-2xl font-bold text-accent-orange">
                {execution.testCasesExecuted}
              </p>
              <p className="text-xs text-muted-foreground">Top 10 Selected</p>
            </div>
            <Zap className="w-8 h-8 text-accent-orange" />
          </div>
        </Card>

        <Card className="p-6 cyber-border bg-gradient-surface">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Validated</p>
              <p className="text-2xl font-bold text-status-success">
                {execution.validationsPassed}
              </p>
              <p className="text-xs text-muted-foreground">Cross-checked</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-status-success" />
          </div>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 cyber-border bg-gradient-surface">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Execution Progress</h3>
          <Badge variant="outline" className="text-primary border-primary/30">
            {Math.round(execution.progress)}%
          </Badge>
        </div>
        
        <Progress 
          value={execution.progress} 
          className="mb-4 h-2"
        />
        
        {execution.startTime && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Started: {execution.startTime.toLocaleTimeString()}
            </div>
            {execution.duration && (
              <div>
                Duration: {Math.round(execution.duration / 1000)}s
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Agent Status */}
      <Card className="p-6 cyber-border bg-gradient-surface">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Agent Status</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {execution.agents.map((agent) => (
            <Card key={agent.id} className="p-4 bg-surface">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${getAgentStatusColor(agent.status)}`} />
                  <h4 className="font-medium text-foreground">{agent.name}</h4>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getAgentStatusColor(agent.status)} border-current`}
                >
                  {agent.status}
                </Badge>
              </div>
              
              <Progress value={agent.progress} className="mb-2 h-1" />
              
              {agent.currentTask && (
                <p className="text-xs text-muted-foreground truncate">
                  {agent.currentTask}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};