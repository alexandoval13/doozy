#include "engine.h" // N: Why quotes "" and note angled <>
#include <string>

bool validateInput(const TaskInput& input) {
  if (input.hour_created < 0 || input.hour_created > 23) {
      return false;
  }

  if (input.urgency < 1 || input.urgency > 5) {
      return false;
  }

  if (input.effort < 1 || input.effort > 5) {
      return false;
  }

  return true;
}

TaskDecision decideTask(const TaskInput& input)
{
  TaskDecision decision;

  // task category
  if (input.hour_created < 18) {
    decision.category = "today";
  } else {
    decision.category = "tomorrow";
  }

  // priority calculation
  decision.priority = (input.urgency * 10) - (input.effort * 2);

  return decision;
}