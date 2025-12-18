#!/bin/bash

run_test() {
  input="$1"
  expected="$2"

  output=$(echo "$input" | ./task_engine) # cli

  if [ "$output" == "$expected" ]; then
    echo "PASS: $input -> $output"
  else
    echo "FAIL: $input -> $output (expected $expected)"
  fi
}

run_test "10 5 1" "today 48"
run_test "18 2 5" "tomorrow 10"
run_test "23 1 1" "tomorrow 8"