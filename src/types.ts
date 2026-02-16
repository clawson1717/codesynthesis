/**
 * Core types for CodeSynthesis
 */

export interface SynthesisOptions {
  verbose?: boolean;
  maxTokens?: number;
  model?: string;
}

export interface Agent {
  id: string;
  name: string;
  specialization: string[];
  capabilities: AgentCapability[];
}

export interface AgentCapability {
  name: string;
  description: string;
  complexityRange: [number, number]; // 1-10 scale
}

export interface Task {
  id: string;
  description: string;
  complexity: number; // 1-10
  domain: string[];
  constraints: string[];
}

export interface SynthesisResult {
  task: Task;
  agents: Agent[];
  output: string;
  tokenUsage: TokenUsage;
  verificationStatus: VerificationStatus;
}

export interface TokenUsage {
  prompt: number;
  completion: number;
  total: number;
  allocated: number;
}

export interface VerificationStatus {
  checklist: ChecklistItem[];
  passed: boolean;
  score: number; // 0-100
}

export interface ChecklistItem {
  name: string;
  description: string;
  passed: boolean;
}
