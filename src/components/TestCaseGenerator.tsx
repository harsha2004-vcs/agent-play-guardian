import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Clock,
  Zap,
  ArrowRight,
  FileCode,
  Shuffle
} from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'gameplay' | 'ui' | 'edge-case' | 'performance';
  estimatedDuration: number;
  generated: boolean;
  selected: boolean;
}

interface GenerationConfig {
  targetUrl: string;
  testTypes: string[];
  maxTestCases: number;
  focusAreas: string[];
}

export const TestCaseGenerator = () => {
  const [config, setConfig] = useState<GenerationConfig>({
    targetUrl: 'https://play.ezygamers.com/',
    testTypes: ['functional', 'ui', 'edge-cases', 'performance'],
    maxTestCases: 25,
    focusAreas: ['number-input', 'puzzle-solving', 'scoring', 'time-limits']
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const mockTestCases: TestCase[] = [
    {
      id: 'tc-001',
      title: 'Basic Number Input Validation',
      description: 'Test input of single digits, multi-digit numbers, and invalid characters',
      priority: 'high',
      category: 'gameplay',
      estimatedDuration: 120,
      generated: false,
      selected: false
    },
    {
      id: 'tc-002', 
      title: 'Puzzle Solution Verification',
      description: 'Verify correct solutions are accepted and incorrect ones rejected',
      priority: 'high',
      category: 'gameplay',
      estimatedDuration: 180,
      generated: false,
      selected: false
    },
    {
      id: 'tc-003',
      title: 'Timer Functionality',
      description: 'Test countdown timer accuracy and timeout behavior',
      priority: 'medium',
      category: 'gameplay',
      estimatedDuration: 90,
      generated: false,
      selected: false
    },
    {
      id: 'tc-004',
      title: 'UI Responsiveness',
      description: 'Test game interface across different screen sizes',
      priority: 'medium',
      category: 'ui',
      estimatedDuration: 150,
      generated: false,
      selected: false
    },
    {
      id: 'tc-005',
      title: 'Boundary Value Testing',
      description: 'Test edge cases with maximum/minimum input values',
      priority: 'high',
      category: 'edge-case',
      estimatedDuration: 200,
      generated: false,
      selected: false
    }
  ];

  const generateTestCases = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setTestCases([]);

    // Simulate LangChain planning and generation
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setGenerationProgress(i);
      
      // Add test cases progressively
      if (i % 20 === 0 && i > 0) {
        const newTestCase = mockTestCases[Math.floor(i / 20) - 1];
        if (newTestCase) {
          setTestCases(prev => [...prev, { ...newTestCase, generated: true }]);
        }
      }
    }

    // Add remaining test cases
    setTimeout(() => {
      const remaining = mockTestCases.slice(testCases.length);
      setTestCases(prev => [...prev, ...remaining.map(tc => ({ ...tc, generated: true }))]);
      setIsGenerating(false);
    }, 500);
  };

  const selectTopTests = () => {
    const sortedTests = testCases
      .map(tc => ({ ...tc, score: calculateTestScore(tc) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setTestCases(prev => 
      prev.map(tc => ({
        ...tc,
        selected: sortedTests.some(st => st.id === tc.id)
      }))
    );
    
    setSelectedCount(sortedTests.length);
  };

  const calculateTestScore = (testCase: TestCase) => {
    let score = 0;
    
    // Priority weighting
    switch (testCase.priority) {
      case 'high': score += 30; break;
      case 'medium': score += 20; break;
      case 'low': score += 10; break;
    }
    
    // Category weighting (gameplay tests are more important)
    switch (testCase.category) {
      case 'gameplay': score += 25; break;
      case 'edge-case': score += 20; break;
      case 'ui': score += 15; break;
      case 'performance': score += 10; break;
    }
    
    // Duration consideration (shorter tests preferred for initial runs)
    score += Math.max(0, 300 - testCase.estimatedDuration) / 10;
    
    return score;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'status-error';
      case 'medium': return 'status-warning';
      case 'low': return 'status-info';
      default: return 'muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gameplay': return <Target className="w-4 h-4" />;
      case 'ui': return <Sparkles className="w-4 h-4" />;
      case 'edge-case': return <Zap className="w-4 h-4" />;
      case 'performance': return <Clock className="w-4 h-4" />;
      default: return <FileCode className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card className="p-6 cyber-border bg-gradient-surface">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">LangChain Test Planning</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="target-url">Target Game URL</Label>
              <Input
                id="target-url"
                value={config.targetUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, targetUrl: e.target.value }))}
                className="bg-surface border-border"
              />
            </div>
            
            <div>
              <Label htmlFor="max-tests">Maximum Test Cases</Label>
              <Input
                id="max-tests"
                type="number"
                value={config.maxTestCases}
                onChange={(e) => setConfig(prev => ({ ...prev, maxTestCases: parseInt(e.target.value) }))}
                className="bg-surface border-border"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="focus-areas">Focus Areas</Label>
            <Textarea
              id="focus-areas"
              value={config.focusAreas.join(', ')}
              onChange={(e) => setConfig(prev => ({ 
                ...prev, 
                focusAreas: e.target.value.split(',').map(s => s.trim()) 
              }))}
              className="bg-surface border-border min-h-[100px]"
              placeholder="number-input, puzzle-solving, scoring..."
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={generateTestCases}
            disabled={isGenerating}
            className="bg-gradient-primary hover:shadow-glow"
          >
            {isGenerating ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Test Cases
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="p-6 cyber-border bg-gradient-surface">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-medium">AI Planning in Progress...</span>
            </div>
            <Badge variant="info">{generationProgress}%</Badge>
          </div>
          
          <Progress value={generationProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Analyzing game patterns and generating comprehensive test scenarios
          </p>
        </Card>
      )}

      {/* Generated Test Cases */}
      {testCases.length > 0 && (
        <Card className="p-6 cyber-border bg-gradient-surface">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold text-foreground">
                Generated Test Cases ({testCases.length})
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                {selectedCount} selected
              </Badge>
              <Button 
                onClick={selectTopTests}
                size="sm"
                className="bg-gradient-cyber hover:shadow-glow"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Select Top 10
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {testCases.map((testCase) => (
              <Card 
                key={testCase.id} 
                className={`p-4 bg-surface transition-all duration-300 ${
                  testCase.selected ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getCategoryIcon(testCase.category)}
                      <h4 className="font-semibold text-foreground">{testCase.title}</h4>
                      {testCase.selected && (
                        <CheckCircle2 className="w-4 h-4 text-status-success" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {testCase.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <Badge variant={getPriorityColor(testCase.priority)}>
                        {testCase.priority}
                      </Badge>
                      <Badge variant="outline">
                        {testCase.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {testCase.estimatedDuration}s
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {selectedCount > 0 && (
            <div className="flex justify-end mt-6">
              <Button className="bg-gradient-secondary hover:shadow-glow-secondary">
                <ArrowRight className="w-4 h-4 mr-2" />
                Execute Selected Tests
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};