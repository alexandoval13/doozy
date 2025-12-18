#define CATCH_CONFIG_MAIN
#include "../external/catch.hpp"
#include "../src/engine.h"

using namespace std;

TEST_CASE("Category decision", "[decideTask]") {
  TaskInput morningTask{10, 1, 1};
  TaskInput eveningTask{20, 1, 1};

  TaskDecision decision1 = decideTask(morningTask);
  TaskDecision decision2 = decideTask(eveningTask);

  REQUIRE(decision1.category == "today");
  REQUIRE(decision2.category == "tomorrow");
}

TEST_CASE("Priority decision", "[decideTask]") {
  TaskInput task1{10, 5, 1}; // 5*10 - 1*2 = 48
  TaskDecision decision1 = decideTask(task1);
  REQUIRE(decision1.priority == 48);

  TaskInput task2{10, 2, 3}; // 2*10 - 3*2 = 14
  TaskDecision decision2 = decideTask(task2);
  REQUIRE(decision2.priority == 14);
}

TEST_CASE("Invalid input is rejected", "[decideTask]") {
  TaskInput invalidHourTask={30, 1, 1};
  bool validHour = validateInput(invalidHourTask);
  REQUIRE(validHour == false);

  TaskInput invalidUrgencyTask={12, -1, 1};
  bool validUrgency = validateInput(invalidUrgencyTask);
  REQUIRE(validUrgency == false);

  TaskInput invalidEffortTask={12, 1, -1};
  bool validEffort = validateInput(invalidEffortTask);
  REQUIRE(validEffort == false);
}


TEST_CASE("Valid input is not rejected", "[decideTask]") {
  TaskInput validTask={20, 3, 2};
  bool valid = validateInput(validTask);
  REQUIRE(valid == true);
}