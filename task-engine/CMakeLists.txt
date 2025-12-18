cmake_minimum_required(VERSION 3.16)
project(task_engine LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE CXX_STANDARD_REQUIRED ON)

# Main executable
add_executable(task_engine src/main.cpp src/engine.cpp)

# Test executable
add_executable(engine_tests tests/engine_tests.cpp src/engine.cpp)

#Include path for Catch2
target_include_directories(engine_tests PRIVATE external)