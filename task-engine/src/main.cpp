#include "engine.h"
#include <iostream>

using namespace std;

int main() {
  TaskInput input;

  // expect: hour_created urgency(1-5) effort(1-5)
  cin >> input.hour_created >> input.urgency >> input.effort;

  bool valid = validateInput(input);

  if (!valid) {
    cerr << "Invalid input" << endl;
    return 1;
  }

  TaskDecision decision = decideTask(input);

  cout << decision.category << " " << decision.priority << endl;

  return 0;
}