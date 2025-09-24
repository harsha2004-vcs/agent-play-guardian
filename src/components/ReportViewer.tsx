import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Share, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  Eye,
  Bug,
  Zap
} from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'warning';
  duration: number;
  artifacts: string[];
  validations: {
    repeatCheck: boolean;
    crossAgentCheck: boolean;
    confidence: number;
  };
  details: string;
  screenshot?: string;
}

interface ExecutionReport {
  id: string;
  timestamp: Date;
  totalTests: number;
  passed: number;
  failed: number;
  warnings: number;
  totalDuration: number;
  coverage: number;
  results: TestResult[];
}

export const ReportViewer = () => {
  const [selectedReport] = useState<ExecutionReport>({
    id: 'report-001',
    timestamp: new Date(),
    totalTests: 10,
    passed: 7,
    failed: 2,
    warnings: 1,
    totalDuration: 387,
    coverage: 85,
    results: [
      {
        id: 'test-001',
        name: 'Basic Number Input Validation',
        status: 'passed',
        duration: 45,
        artifacts: ['input-validation.json', 'screenshot-001.png'],
        validations: {
          repeatCheck: true,
          crossAgentCheck: true,
          confidence: 0.95
        },
        details: 'All input validation tests passed. Numbers 1-999 accepted, invalid chars rejected.',
        screenshot: '/api/placeholder/400/300'
      },
      {
        id: 'test-002',
        name: 'Puzzle Solution Verification',
        status: 'passed',
        duration: 78,
        artifacts: ['solution-checks.json', 'game-state.json'],
        validations: {
          repeatCheck: true,
          crossAgentCheck: true,
          confidence: 0.98
        },
        details: 'Correct solutions properly validated. Edge cases handled appropriately.',
        screenshot: '/api/placeholder/400/300'
      },
      {
        id: 'test-003',
        name: 'Timer Functionality',
        status: 'warning',
        duration: 34,
        artifacts: ['timer-logs.json'],
        validations: {
          repeatCheck: true,
          crossAgentCheck: false,
          confidence: 0.75
        },
        details: 'Timer accuracy within acceptable range but cross-agent validation inconsistent.',
        screenshot: '/api/placeholder/400/300'
      },
      {
        id: 'test-004',
        name: 'UI Responsiveness',
        status: 'failed',
        duration: 67,
        artifacts: ['responsive-test.json', 'error-log.txt'],
        validations: {
          repeatCheck: false,
          crossAgentCheck: false,
          confidence: 0.45
        },
        details: 'Layout breaks on mobile viewport. Elements overlap at 320px width.',
        screenshot: '/api/placeholder/400/300'
      },
      {
        id: 'test-005',
        name: 'Boundary Value Testing',
        status: 'failed',
        duration: 89,
        artifacts: ['boundary-test.json', 'crash-dump.log'],
        validations: {
          repeatCheck: false,
          crossAgentCheck: true,
          confidence: 0.30
        },
        details: 'Application crashes when input exceeds 9999. Need to implement proper bounds checking.',
        screenshot: '/api/placeholder/400/300'
      }
    ]
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="w-4 h-4 text-status-success" />;
      case 'failed': return <XCircle className="w-4 h-4 text-status-error" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-status-warning" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'status-success';
      case 'failed': return 'status-error';
      case 'warning': return 'status-warning';
      default: return 'muted';
    }
  };

  const successRate = Math.round((selectedReport.passed / selectedReport.totalTests) * 100);

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="p-6 cyber-border bg-gradient-surface">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Test Execution Report
            </h2>
            <p className="text-muted-foreground mt-1">
              Generated: {selectedReport.timestamp.toLocaleString()}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="cyber-border">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-gradient-secondary hover:shadow-glow-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{selectedReport.totalTests}</div>
            <div className="text-sm text-muted-foreground">Total Tests</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-status-success">{selectedReport.passed}</div>
            <div className="text-sm text-muted-foreground">Passed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-status-error">{selectedReport.failed}</div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-status-warning">{selectedReport.warnings}</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{successRate}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>{successRate}%</span>
          </div>
          <Progress value={successRate} className="h-2" />
        </div>
      </Card>

      {/* Detailed Results */}
      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-surface">
          <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Target className="w-4 h-4 mr-2" />
            Test Results
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="artifacts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="w-4 h-4 mr-2" />
            Artifacts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {selectedReport.results.map((result) => (
            <Card key={result.id} className="p-6 cyber-border bg-gradient-surface">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <h3 className="font-semibold text-foreground">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Duration: {result.duration}s • Confidence: {Math.round(result.validations.confidence * 100)}%
                    </p>
                  </div>
                </div>
                
                <Badge variant={getStatusColor(result.status)}>
                  {result.status.toUpperCase()}
                </Badge>
              </div>

              <p className="text-sm text-foreground mb-4">
                {result.details}
              </p>

              {/* Validation Status */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  {result.validations.repeatCheck ? (
                    <CheckCircle2 className="w-4 h-4 text-status-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-status-error" />
                  )}
                  <span className="text-sm">Repeat Check</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {result.validations.crossAgentCheck ? (
                    <CheckCircle2 className="w-4 h-4 text-status-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-status-error" />
                  )}
                  <span className="text-sm">Cross-Agent Check</span>
                </div>
              </div>

              {/* Artifacts */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Artifacts:</span>
                <div className="flex gap-2">
                  {result.artifacts.map((artifact, index) => (
                    <Button key={index} variant="outline" size="sm" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      {artifact}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 cyber-border bg-gradient-surface">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">Performance Metrics</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Average Test Duration</span>
                  <span className="font-medium">{Math.round(selectedReport.totalDuration / selectedReport.totalTests)}s</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Total Execution Time</span>
                  <span className="font-medium">{Math.round(selectedReport.totalDuration / 60)}m {selectedReport.totalDuration % 60}s</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Test Coverage</span>
                  <span className="font-medium">{selectedReport.coverage}%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 cyber-border bg-gradient-surface">
              <div className="flex items-center gap-2 mb-4">
                <Bug className="w-5 h-5 text-accent-red" />
                <h3 className="font-semibold text-foreground">Issue Summary</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Critical Issues</span>
                  <Badge variant="status-error">{selectedReport.failed}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Warnings</span>
                  <Badge variant="status-warning">{selectedReport.warnings}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Validation Failures</span>
                  <Badge variant="muted">3</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="artifacts" className="space-y-4">
          <Card className="p-6 cyber-border bg-gradient-surface">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Generated Artifacts</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedReport.results.flatMap(result => 
                result.artifacts.map((artifact, index) => (
                  <Card key={`${result.id}-${index}`} className="p-4 bg-surface hover:bg-surface-hover transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium truncate">{artifact}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      From: {result.name}
                    </p>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};