// local library
#pragma once
#include <string>

using namespace std;

struct TaskInput {
  int hour_created; // 0-23
  int urgency; // 1-5
  int effort; // 1-5
};

struct TaskDecision {
  string category; // "today" | "tomorrow"
  int priority;
};

TaskDecision decideTask(const TaskInput& input);

bool validateInput(const TaskInput& input);