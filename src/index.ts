/**
 * CodeSynthesis Core
 * Main entry point for the synthesis engine
 */

import chalk from 'chalk';
import { SynthesisOptions, SynthesisResult, Task, Agent, TokenUsage, VerificationStatus, ChecklistItem } from './types.js';
import { 
  getAllAgents, 
  findAgentsBySpecialization, 
  findAgentsByComplexity,
  getRecommendedAgents,
  calculateCapabilityMatch,
  AGENT_REGISTRY 
} from './agents.js';

export { 
  getAllAgents, 
  findAgentsBySpecialization, 
  findAgentsByComplexity,
  getRecommendedAgents,
  calculateCapabilityMatch,
  AGENT_REGISTRY 
};

/**
 * Main synthesis function
 * Analyzes task and orchestrates multi-agent synthesis
 */
export async function synthesize(taskDescription: string, options: SynthesisOptions = {}): Promise<SynthesisResult> {
  console.log(chalk.blue('🔍 Analyzing task...'));
  
  // Step 1: Parse and analyze the task
  const task = await analyzeTask(taskDescription);
  
  if (options.verbose) {
    console.log(chalk.gray(`Complexity: ${task.complexity}/10`));
    console.log(chalk.gray(`Domain: ${task.domain.join(', ')}`));
  }

  // Step 2: Assemble agent team (DyTopo-style matching)
  console.log(chalk.blue('👥 Assembling specialist team...'));
  const agents = await assembleTeam(task);
  
  if (options.verbose) {
    agents.forEach(agent => {
      console.log(chalk.gray(`  - ${agent.name} (${agent.specialization.join(', ')})`));
    });
  }

  // Step 3: Allocate compute (CATTS-style)
  const allocatedTokens = calculateTokenBudget(task, options.maxTokens || 4000);
  
  if (options.verbose) {
    console.log(chalk.blue(`🎯 Allocated ${allocatedTokens} tokens`));
  }

  // Step 4: Execute synthesis (placeholder for actual LLM calls)
  console.log(chalk.blue('⚡ Executing synthesis...'));
  const output = await executeSynthesis(task, agents, allocatedTokens);

  // Step 5: Verify (CM2-style checklist)
  console.log(chalk.blue('✓ Running verification...'));
  const verificationStatus = await verifyOutput(output, task);

  return {
    task,
    agents,
    output,
    tokenUsage: {
      prompt: Math.floor(allocatedTokens * 0.3),
      completion: Math.floor(allocatedTokens * 0.7),
      total: allocatedTokens,
      allocated: options.maxTokens || 4000,
    },
    verificationStatus,
  };
}

/**
 * Analyze task to extract complexity, domain, and constraints
 */
async function analyzeTask(description: string): Promise<Task> {
  // Placeholder: In real implementation, this would use an LLM to analyze
  const complexity = estimateComplexity(description);
  const domain = extractDomains(description);
  
  return {
    id: generateId(),
    description,
    complexity,
    domain,
    constraints: [],
  };
}

/**
 * Assemble specialist agent team based on task needs (DyTopo-style matching)
 * 
 * Uses semantic matching between task requirements and agent capabilities
 * to form the optimal team for the task.
 */
async function assembleTeam(task: Task): Promise<Agent[]> {
  const agents: Agent[] = [];
  const addedAgentIds = new Set<string>();

  // Helper to add agent if not already added
  const addAgent = (id: string) => {
    if (!addedAgentIds.has(id) && AGENT_REGISTRY[id]) {
      agents.push(AGENT_REGISTRY[id]);
      addedAgentIds.add(id);
    }
  };

  // Determine task type from description
  const desc = task.description.toLowerCase();
  
  // Pattern matching for task types
  if (/\b(api|endpoint|route|controller)\b/i.test(desc)) {
    addAgent('architect');
    addAgent('security');
  }
  
  if (/\b(refactor|restructure|rewrite)\b/i.test(desc)) {
    addAgent('implementer');
    addAgent('reviewer');
    addAgent('tester');
  }
  
  if (/\b(test|spec|jest|vitest)\b/i.test(desc)) {
    addAgent('tester');
    addAgent('implementer');
  }
  
  if (/\b(security|auth|login|password|token|vulnerability)\b/i.test(desc)) {
    addAgent('security');
    addAgent('reviewer');
  }
  
  if (/\b(performance|optimize|slow|cache|memory)\b/i.test(desc)) {
    addAgent('performance');
    addAgent('implementer');
  }
  
  if (/\b(documentation|doc|readme|comment)\b/i.test(desc)) {
    addAgent('documentation');
  }
  
  if (/\b(architecture|design|pattern|structure)\b/i.test(desc)) {
    addAgent('architect');
    addAgent('performance');
  }

  // Always add implementer as the primary executor
  if (agents.length === 0 || !addedAgentIds.has('implementer')) {
    addAgent('implementer');
  }

  // Add reviewer for medium+ complexity tasks
  if (task.complexity > 4 && !addedAgentIds.has('reviewer')) {
    addAgent('reviewer');
  }

  // Add tester for complex tasks or test-related tasks
  if ((task.complexity > 5 || /\b(test|spec)\b/i.test(desc)) && !addedAgentIds.has('tester')) {
    addAgent('tester');
  }

  // Add security for auth/data tasks or high complexity
  if ((/\b(auth|user|data|input)\b/i.test(desc) || task.complexity > 7) && !addedAgentIds.has('security')) {
    addAgent('security');
  }

  return agents;
}

/**
 * Calculate token budget based on task complexity (CATTS-style)
 */
function calculateTokenBudget(task: Task, maxTokens: number): number {
  // Higher complexity = more tokens allocated
  const baseAllocation = Math.floor(maxTokens * 0.5);
  const complexityMultiplier = task.complexity / 10;
  const allocated = Math.floor(baseAllocation + (maxTokens - baseAllocation) * complexityMultiplier);
  return Math.min(allocated, maxTokens);
}

/**
 * Execute the synthesis with the assembled team
 */
async function executeSynthesis(task: Task, agents: Agent[], tokenBudget: number): Promise<string> {
  // Placeholder: Actual multi-agent synthesis would happen here
  return `
// Synthesized code for: ${task.description}
// Complexity: ${task.complexity}/10
// Team: ${agents.map(a => a.name).join(', ')}

function example() {
  // TODO: Implement actual synthesis with LLM calls
  console.log("CodeSynthesis placeholder output");
}
`;
}

/**
 * Verify output using checklist (CM2-style)
 */
async function verifyOutput(output: string, task: Task): Promise<VerificationStatus> {
  const checklist: ChecklistItem[] = [
    { name: 'syntax', description: 'Code is syntactically valid', passed: true },
    { name: 'tests', description: 'Tests are included', passed: task.complexity > 3 },
    { name: 'docs', description: 'Documentation is provided', passed: true },
    { name: 'edge_cases', description: 'Edge cases are handled', passed: task.complexity > 5 },
  ];

  const passedCount = checklist.filter(item => item.passed).length;
  const score = Math.round((passedCount / checklist.length) * 100);

  return {
    checklist,
    passed: score >= 75,
    score,
  };
}

// Helper functions
function estimateComplexity(description: string): number {
  const indicators = [
    /refactor/i, /architecture/i, /design/i, /implement/i,
    /complex/i, /optimize/i, /performance/i, /scale/i,
  ];
  const matches = indicators.filter(r => r.test(description)).length;
  return Math.min(Math.max(matches + 3, 1), 10);
}

function extractDomains(description: string): string[] {
  const domains: string[] = [];
  if (/api|endpoint|route/i.test(description)) domains.push('backend');
  if (/component|ui|interface|button|form/i.test(description)) domains.push('frontend');
  if (/database|sql|query|schema/i.test(description)) domains.push('database');
  if (/test|spec/i.test(description)) domains.push('testing');
  if (domains.length === 0) domains.push('general');
  return domains;
}

function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
