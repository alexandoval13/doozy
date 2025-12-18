# Task Engine + JS Shell (C++ Core)

> A minimal task prioritization engine in C++ with a clean, testable interface, designed to be later integrated with a JavaScript frontend and backend.

---

## Overview

This project explores how **C++ can be used as a small, focused decision engine** in modern software systems.

- The **C++ engine** handles task categorization and prioritization.
- The **JS shell** (planned) handles UI, persistence, and orchestration.
- Separation of concerns ensures testability, replaceability, and safe iteration.

Currently, the project focuses on:

- Running the C++ engine locally
- Input/Output-based CLI
- Unit testing with **Catch2**
- CMake-based build system

---

## Features (Phase 1)

- Simple C++ algorithm to determine:
  - Task category (`today` / `tomorrow`)
  - Priority score (integer)
- Command-line interface for testing inputs
- Lightweight unit tests using **Catch2**
- CMake-based build for both executable and tests
- Clean folder structure for future expansion

---

## Project Structure

```
task_engine/
├── external/ # Third-party header-only libraries (Catch2)
├── src/
│   ├── engine.h # Engine contract
│   ├── engine.cpp # Engine logic
│   └── main.cpp # CLI wrapper
├── tests/
│   └── engine_tests.cpp
├── CMakeLists.txt
└── README.md
```

---

## Getting Started

### Prerequisites

- C++ compiler (g++ recommended)
- CMake (>=3.16)
- Terminal or VS Code

### Build

Create build directory

```
mkdir build
cd build
```

Generate build files

```
cmake ..
```

Build executables

```
cmake --build .
```

### Run CLI

Example input: hour_created urgency effort

```
echo "17 4 2" | ./task_engine
```

Output:

```
today 36
```

### Running Unit Tests

From build directory

```
./engine_tests
```

Expected output

```
===============================================================================
All tests passed (4 assertions in 2 test cases)
```

Tests verify:

- Correct category assignment (today / tomorrow)
- Correct priority calculation

---

## Next Steps

- Expand priority logic to handle dependencies
- Integrate the engine with a JS backend (Node.js)
- Build a simple frontend to display tasks
- Extend unit tests to cover edge cases and validation
- Package engine for desktop use via Electron or Tauri (future phase)

---

## Learning Notes

This project is intentionally minimal to allow:

- Understanding CMake and compilation
- Running and testing C++ in isolation
- Safe experimentation before integrating with JS
- Building a reusable architecture for future apps
