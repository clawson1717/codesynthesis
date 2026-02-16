# CodeSynthesis

> Adaptive multi-agent coding assistant with dynamic team assembly and intelligent compute allocation

CodeSynthesis is like having a team of senior engineers that self-organizes for each task, knows when to think harder, and never skips code review.

## Features (Planned)

- **Dynamic Team Assembly** (DyTopo-inspired): Matches specialist agents to tasks based on semantic needs
- **Intelligent Compute Allocation** (CATTS-inspired): Allocates more tokens to complex tasks, fewer to simple ones
- **Structured Verification** (CM2-inspired): Enforces code review checklists for quality
- **Self-Improvement** (iGRPO-inspired): Iteratively refines solutions based on critique

## Installation

```bash
npm install -g codesynthesis
```

Or run locally:

```bash
git clone https://github.com/clawson1717/codesynthesis.git
cd codesynthesis
npm install
npm run build
```

## Usage

### CLI

```bash
# Synthesize code for a task
codesynthesis synthesize "Create a TypeScript function to validate email addresses"

# With verbose output
codesynthesis synthesize "Refactor this class to use dependency injection" --verbose
```

### VS Code Extension (Coming Soon)

Select code → Right-click → "Synthesize with Team"

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev -- synthesize "Your task here"

# Build for production
npm run build

# Run built version
npm start -- synthesize "Your task here"
```

## Architecture

CodeSynthesis combines insights from recent AI research:

| Technique | Source | Application |
|-----------|--------|-------------|
| Dynamic Compute Allocation | CATTS (Lee et al., 2026) | Token budget based on uncertainty |
| Dynamic Topology Routing | DyTopo (Lu et al., 2026) | Agent team formation |
| Checklist Rewards | CM2 (Zhang et al., 2026) | Multi-step verification |
| Self-Feedback Iteration | iGRPO (Hatamizadeh et al., 2026) | Solution refinement |

## Project Status

🚧 **Early Development** — Currently implementing core framework (Step 1/12)

See [project plan](../../memory/project-codesynthesis-plan.md) for roadmap.

## License

MIT
