/**
 * Agent Registry System for CodeSynthesis
 * 
 * Defines specialist agent types with their capabilities and specializations.
 * Used by the DyTopo matcher for semantic task-to-agent matching.
 */

import { Agent, AgentCapability } from './types.js';

/**
 * Predefined agent types with their capabilities
 */
export const AGENT_REGISTRY: Record<string, Agent> = {
  architect: {
    id: 'architect',
    name: 'System Architect',
    specialization: ['design', 'architecture', 'api-design', 'patterns', 'scalability'],
    capabilities: [
      {
        name: 'system-design',
        description: 'Design system architecture and component relationships',
        complexityRange: [5, 10],
      },
      {
        name: 'api-design',
        description: 'Design REST/GraphQL APIs with proper conventions',
        complexityRange: [4, 9],
      },
      {
        name: 'pattern-selection',
        description: 'Choose appropriate design patterns for the problem',
        complexityRange: [5, 9],
      },
      {
        name: 'scalability-planning',
        description: 'Plan for performance and scalability concerns',
        complexityRange: [6, 10],
      },
    ],
  },

  implementer: {
    id: 'implementer',
    name: 'Senior Implementer',
    specialization: ['coding', 'implementation', 'refactoring', 'typescript', 'javascript'],
    capabilities: [
      {
        name: 'code-implementation',
        description: 'Write clean, maintainable code following best practices',
        complexityRange: [2, 9],
      },
      {
        name: 'refactoring',
        description: 'Restructure existing code while preserving behavior',
        complexityRange: [4, 9],
      },
      {
        name: 'type-definitions',
        description: 'Create precise TypeScript types and interfaces',
        complexityRange: [3, 8],
      },
      {
        name: 'code-completion',
        description: 'Complete partial implementations',
        complexityRange: [2, 7],
      },
    ],
  },

  reviewer: {
    id: 'reviewer',
    name: 'Code Reviewer',
    specialization: ['review', 'quality', 'best-practices', 'readability'],
    capabilities: [
      {
        name: 'code-review',
        description: 'Review code for issues, suggest improvements',
        complexityRange: [3, 8],
      },
      {
        name: 'style-check',
        description: 'Check code style and formatting consistency',
        complexityRange: [1, 5],
      },
      {
        name: 'readability-analysis',
        description: 'Assess code readability and clarity',
        complexityRange: [2, 7],
      },
      {
        name: 'maintainability-review',
        description: 'Evaluate long-term maintainability',
        complexityRange: [4, 8],
      },
    ],
  },

  security: {
    id: 'security',
    name: 'Security Specialist',
    specialization: ['security', 'audit', 'vulnerabilities', 'authentication', 'authorization'],
    capabilities: [
      {
        name: 'security-audit',
        description: 'Identify security vulnerabilities and risks',
        complexityRange: [4, 10],
      },
      {
        name: 'auth-implementation',
        description: 'Implement authentication and authorization',
        complexityRange: [5, 9],
      },
      {
        name: 'input-validation',
        description: 'Validate and sanitize user inputs',
        complexityRange: [3, 7],
      },
      {
        name: 'secret-management',
        description: 'Handle secrets, tokens, and credentials safely',
        complexityRange: [5, 9],
      },
    ],
  },

  tester: {
    id: 'tester',
    name: 'Test Engineer',
    specialization: ['testing', 'quality-assurance', 'unit-tests', 'integration-tests'],
    capabilities: [
      {
        name: 'unit-testing',
        description: 'Write comprehensive unit tests',
        complexityRange: [2, 8],
      },
      {
        name: 'integration-testing',
        description: 'Create integration and E2E tests',
        complexityRange: [4, 9],
      },
      {
        name: 'edge-case-identification',
        description: 'Identify and test edge cases and boundary conditions',
        complexityRange: [3, 8],
      },
      {
        name: 'test-coverage',
        description: 'Maximize meaningful test coverage',
        complexityRange: [3, 7],
      },
    ],
  },

  performance: {
    id: 'performance',
    name: 'Performance Engineer',
    specialization: ['performance', 'optimization', 'profiling', 'memory', 'cpu'],
    capabilities: [
      {
        name: 'performance-analysis',
        description: 'Analyze code for performance bottlenecks',
        complexityRange: [5, 10],
      },
      {
        name: 'optimization',
        description: 'Optimize algorithms and data structures',
        complexityRange: [5, 10],
      },
      {
        name: 'memory-optimization',
        description: 'Reduce memory usage and prevent leaks',
        complexityRange: [5, 9],
      },
      {
        name: 'async-optimization',
        description: 'Optimize async patterns and concurrency',
        complexityRange: [5, 9],
      },
    ],
  },

  documentation: {
    id: 'documentation',
    name: 'Technical Writer',
    specialization: ['documentation', 'comments', 'readme', 'api-docs'],
    capabilities: [
      {
        name: 'code-documentation',
        description: 'Write clear inline documentation and comments',
        complexityRange: [2, 6],
      },
      {
        name: 'readme-generation',
        description: 'Generate comprehensive README files',
        complexityRange: [3, 7],
      },
      {
        name: 'api-documentation',
        description: 'Create API documentation and examples',
        complexityRange: [3, 7],
      },
      {
        name: 'jsdoc-generation',
        description: 'Generate JSDoc/TSDoc comments',
        complexityRange: [2, 6],
      },
    ],
  },
};

/**
 * Get all available agents
 */
export function getAllAgents(): Agent[] {
  return Object.values(AGENT_REGISTRY);
}

/**
 * Get agent by ID
 */
export function getAgent(id: string): Agent | undefined {
  return AGENT_REGISTRY[id];
}

/**
 * Find agents by specialization
 */
export function findAgentsBySpecialization(specialization: string): Agent[] {
  return getAllAgents().filter(agent => 
    agent.specialization.some(s => 
      s.toLowerCase().includes(specialization.toLowerCase()) ||
      specialization.toLowerCase().includes(s.toLowerCase())
    )
  );
}

/**
 * Find agents capable of handling a given complexity level
 */
export function findAgentsByComplexity(complexity: number): Agent[] {
  return getAllAgents().filter(agent =>
    agent.capabilities.some(cap => 
      complexity >= cap.complexityRange[0] && complexity <= cap.complexityRange[1]
    )
  );
}

/**
 * Get agents recommended for a specific task type
 */
export function getRecommendedAgents(taskType: string): Agent[] {
  const recommendations: Record<string, string[]> = {
    'api-design': ['architect', 'security', 'documentation'],
    'refactoring': ['implementer', 'reviewer', 'tester'],
    'new-feature': ['architect', 'implementer', 'tester', 'reviewer'],
    'bug-fix': ['implementer', 'tester', 'reviewer'],
    'security-audit': ['security', 'reviewer'],
    'performance-optimization': ['performance', 'implementer', 'tester'],
    'code-review': ['reviewer', 'security', 'tester'],
    'testing': ['tester', 'implementer'],
    'documentation': ['documentation', 'implementer'],
    'architecture': ['architect', 'performance', 'security'],
  };

  const agentIds = recommendations[taskType.toLowerCase()] || ['implementer', 'reviewer'];
  return agentIds.map(id => AGENT_REGISTRY[id]).filter(Boolean);
}

/**
 * Calculate capability match score between an agent and a task
 * Returns 0-1 score where 1 is perfect match
 */
export function calculateCapabilityMatch(agent: Agent, complexity: number, domain: string[]): number {
  // Check complexity fit
  const complexityMatches = agent.capabilities.filter(cap => 
    complexity >= cap.complexityRange[0] && complexity <= cap.complexityRange[1]
  ).length;
  const complexityScore = complexityMatches / agent.capabilities.length;

  // Check domain specialization overlap
  const domainOverlap = domain.filter(d => 
    agent.specialization.some(s => 
      s.toLowerCase().includes(d.toLowerCase()) ||
      d.toLowerCase().includes(s.toLowerCase())
    )
  ).length;
  const domainScore = domain.length > 0 ? domainOverlap / domain.length : 0.5;

  // Weighted combination
  return (complexityScore * 0.4) + (domainScore * 0.6);
}
