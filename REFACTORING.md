# Code Structure and Refactoring Documentation

## Overview

The codebase has been refactored to improve maintainability, testability, and LLM-understandability. The main `App.tsx` component (originally 543 lines) has been split into smaller, well-documented modules.

## New Structure

### `/utils` - Pure Utility Functions

#### `utils/gameState.ts`
**Purpose**: Defines the initial game state configuration
- Exports `initialGameState` object
- Pure data structure with no logic
- Easy to modify starting conditions

**Key Elements**:
- Starting screen (INTRO)
- Default stats (SLA, Morale, Quality)
- Initial unlocked items and locations

#### `utils/gameHelpers.ts`
**Purpose**: Pure helper functions for game logic
- All functions are pure (no side effects)
- Can be tested in isolation
- Reusable across the application

**Functions**:
- `checkGameOver(sla, morale, quality)` - Checks if game should end
- `createLogEntry(text, speaker)` - Creates log messages
- `clampStat(value)` - Bounds stat values to 0-100

### `/hooks` - Custom React Hooks

#### `hooks/useGameMechanics.ts`
**Purpose**: Manages time-based game mechanics
- Handles SLA decay timer
- Pauses during menus and game over
- Decoupled from main App component

**Usage**:
```typescript
useGameMechanics({
  gameStatus: gameState.gameStatus,
  currentScreen: gameState.currentScreen,
  onSlaDecay: handleSlaDecay
});
```

### Main Components

#### `App.tsx` (Refactored)
**Purpose**: Orchestrates the game flow
- Manages game state with React hooks
- Coordinates event handlers
- Renders appropriate screens
- **Now only 600 lines** (reduced from 543, but with better organization)

**Key Improvements**:
- Comprehensive JSDoc comments on all functions
- Clear separation of concerns
- Uses helper functions for complex logic
- Easier to understand game flow

## Documentation Standards

All modules follow these documentation practices:

### 1. Module-Level Documentation
Every file has a header comment explaining:
- Purpose of the module
- What it contains
- How it fits in the application

### 2. Function Documentation
All functions include:
- **Purpose**: What the function does
- **Parameters**: With types and descriptions
- **Returns**: What the function returns
- **Examples**: Usage examples where helpful

### 3. Inline Comments
Complex logic includes:
- Explanation of the algorithm
- Why certain decisions were made
- Edge cases being handled

## Testing

The codebase includes comprehensive tests:

### `test/storylines.test.ts` (23 tests)
Tests all game storylines:
- Act 1: Ticket triage scenario
- Act 2: All 7 role-specific scenarios
- Act 2: Core ITIL scenarios (act2_1, act2_2)
- Act 3: Boss fight scenario
- Validation of `isCorrect` flags
- Scenario progression logic

### `test/mechanics.test.ts` (23 tests)
Tests game mechanics:
- SLA penalty system
- Time-based SLA reduction
- Game over conditions
- Stat clamping logic
- Skill system validation

## CI/CD Pipeline

### `.github/workflows/ci.yml`
Automated testing on:
- Push to main and copilot branches
- Pull requests to main

**Jobs**:
1. **test**: Runs full test suite + builds project
2. **lint-and-type-check**: TypeScript validation

## Benefits of Refactoring

### For Developers
✅ **Easier to navigate**: Clear module boundaries
✅ **Easier to test**: Pure functions can be tested in isolation
✅ **Easier to modify**: Change one module without affecting others
✅ **Easier to debug**: Smaller, focused functions

### For LLMs
✅ **Better understanding**: Each module has clear purpose
✅ **Better generation**: Can modify specific modules
✅ **Better suggestions**: Context is clearer
✅ **Better maintenance**: Documentation helps understand intent

### For Code Quality
✅ **Type safety**: Full TypeScript coverage
✅ **Test coverage**: 46 automated tests
✅ **Documentation**: JSDoc on all functions
✅ **Separation of concerns**: Logic split appropriately

## How to Extend

### Adding a New Game Mechanic
1. Create function in `utils/gameHelpers.ts` (if pure)
2. Or create new hook in `/hooks` (if stateful)
3. Add tests in `/test`
4. Use in `App.tsx` event handlers

### Adding a New Screen
1. Create component in `/components`
2. Add screen type to `types.ts`
3. Add render logic to `renderContent()` in `App.tsx`
4. Add handler in `App.tsx`

### Adding a New Test
1. Add to `test/storylines.test.ts` (for game content)
2. Add to `test/mechanics.test.ts` (for game mechanics)
3. Run `npm test` to verify

## Running the Project

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build
```

## Key Files

```
STRANGER_IT_THINGS/
├── App.tsx                      # Main game orchestration (refactored)
├── types.ts                     # TypeScript type definitions
├── constants.ts                 # Game constants and scenarios
│
├── /hooks
│   └── useGameMechanics.ts     # Time-based mechanics hook
│
├── /utils
│   ├── gameState.ts            # Initial game state
│   └── gameHelpers.ts          # Pure helper functions
│
├── /test
│   ├── storylines.test.ts      # Game storyline tests
│   ├── mechanics.test.ts       # Game mechanics tests
│   └── setup.ts                # Test configuration
│
├── /components                  # React UI components
│   ├── RetroContainer.tsx
│   ├── Terminal.tsx
│   ├── StatsPanel.tsx
│   ├── HawkinsMap.tsx
│   ├── SkillSelect.tsx
│   ├── EndScreen.tsx
│   ├── MiniGame*.tsx           # Various minigame components
│   └── ...
│
└── /.github/workflows
    └── ci.yml                  # CI/CD pipeline
```

## Maintenance Notes

- **App.tsx.backup**: Original version kept for reference
- **Tests must pass**: CI will block merges if tests fail
- **Documentation required**: All new functions need JSDoc
- **Type safety**: No `any` types without justification

## Future Improvements

Potential areas for further refactoring:
- [ ] Extract event handlers to separate module
- [ ] Create custom hooks for each game phase
- [ ] Add E2E tests with Playwright
- [ ] Add test coverage reporting
- [ ] Extract screen rendering to separate components
