#!/usr/bin/env node
/**
 * CodeSynthesis CLI
 * Adaptive multi-agent coding assistant
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { synthesize } from './index.js';
import { SynthesisOptions } from './types.js';

const program = new Command();

program
  .name('codesynthesis')
  .description('Adaptive multi-agent coding assistant with dynamic team assembly')
  .version('0.1.0');

program
  .command('synthesize')
  .description('Synthesize code for a given task')
  .argument('<task>', 'Description of the coding task')
  .option('-v, --verbose', 'Enable verbose output', false)
  .option('-m, --model <model>', 'LLM model to use', 'default')
  .option('-t, --max-tokens <tokens>', 'Maximum tokens to allocate', '4000')
  .action(async (task: string, options: { verbose: boolean; model: string; maxTokens: string }) => {
    try {
      const synthesisOptions: SynthesisOptions = {
        verbose: options.verbose,
        model: options.model,
        maxTokens: parseInt(options.maxTokens, 10),
      };

      if (options.verbose) {
        console.log(chalk.blue('🧠 CodeSynthesis initialized'));
        console.log(chalk.gray(`Task: ${task}`));
        console.log(chalk.gray(`Options: ${JSON.stringify(synthesisOptions, null, 2)}`));
        console.log();
      }

      const result = await synthesize(task, synthesisOptions);

      console.log(chalk.green('\n✓ Synthesis complete'));
      console.log(chalk.cyan('\n--- Output ---\n'));
      console.log(result.output);
      
      if (options.verbose) {
        console.log(chalk.gray(`\nToken usage: ${result.tokenUsage.total}/${result.tokenUsage.allocated}`));
        console.log(chalk.gray(`Verification: ${result.verificationStatus.passed ? 'PASSED' : 'FAILED'} (${result.verificationStatus.score}%)`));
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Default action (show help)
if (process.argv.length === 2) {
  program.help();
}

program.parse();
