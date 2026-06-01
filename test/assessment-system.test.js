import test from "node:test";
import assert from "node:assert/strict";
import {
  adminInterveneInChat,
  addProgressImageCoachNote,
  archiveProgressImage,
  adminAddExerciseToWorkoutTemplate,
  adminArchiveClient,
  adminArchiveExercise,
  adminAssignPackageToClient,
  adminAssignPlanOfferingToPackage,
  adminCreateAssessmentTemplate,
  adminCreateClient,
  adminCreateCoach,
  adminCreateExercise,
  adminCreatePackage,
  adminCreatePlanOffering,
  adminCreateWorkoutTemplate,
  adminDeleteAssessmentTemplate,
  adminDeleteClient,
  adminDeleteCoach,
  adminDeleteExercise,
  adminDeletePackage,
  adminDeletePlanOffering,
  adminDeleteWorkoutTemplate,
  adminUpdateCoach,
  adminImportExercisesFromRows,
  adminImportWorkoutTemplatesFromRows,
  adminReorderWorkoutTemplateItems,
  adminUpdateClient,
  adminUpdateExercise,
  adminResetUserPin,
  adminSetUserPin,
  adminSetLoginDisabled,
  adminResolvePinResetRequest,
  adminUpdateWorkout,
  approveMonthlyPlan,
  authenticateUser,
  canAccessAdminRoute,
  canUserAccessClient,
  clientOwnsRecord,
  coachCanSeeClient,
  createReassessmentDraftIfNeeded,
  filterExercisesForAssessment,
  filterExerciseLibrary,
  getAdminAlerts,
  getAccountRequests,
  getClientDashboard,
  getClientVisiblePlan,
  getCoachAlerts,
  getChatMessages,
  getExerciseDetailForUser,
  ensureMonthlyPlanHasWorkouts,
  getProgressImagesForUser,
  getTodayWorkoutForClient,
  getWorkoutDetailForUser,
  generateMonthlyPlanFromPlanOffering,
  loginBlockedMessage,
  markNotificationsRead,
  resolveCoachAlert,
  requestLockedAccount,
  saveAssessment,
  adminReviewAccountRequest,
  sendChatMessage,
  saveDailyCheckIn,
  saveWeeklyCheckIn,
  searchExerciseLibrary,
  suggestMonthlyPlanLevel,
  submitPinResetRequest,
  unreadNotificationCount,
  uploadProfileImage,
  uploadProgressImage,
  removeProfileImage,
  validateImageUpload,
  validateNumericPin,
  visibleClientsForUser,
  summarizeAssessment
} from "../src/logic.js";
import { blankAssessment, createStore } from "../src/data.js";

const today = "2026-05-29";

function imageFile(name = "photo.jpg", size = 120_000, type = "image/jpeg") {
  return { name, size, type };
}

function allScores(score) {
  return {
    squat: score,
    hinge: score,
    lunge: score,
    push: score,
    pull: score,
    core: score,
    balance: score,
    conditioning: score,
    shoulderMobility: score,
    hipMobility: score,
    ankleMobility: score,
    pain: score,
    standing: score,
    breathing: score,
    rom: score
  };
}

function daily(overrides = {}) {
  return {
    clientId: "client_ada",
    monthlyPlanId: "plan_ada_active",
    workoutDate: today,
    energyScore: 3,
    painScore: 1,
    sorenessScore: 1,
    sleepScore: 3,
    stressScore: 2,
    readinessScore: 3,
    feelsSafeToTrain: true,
    painNotes: "",
    changeNotes: "",
    painCheckIn: {
      hasPain: false,
      painLocations: [],
      painType: [],
      painLevel1to10: 1,
      painStartedToday: false,
      painWorseWithMovement: false,
      feelsSafeToTrain: true,
      painNotes: ""
    },
    ...overrides,
    painCheckIn: {
      hasPain: false,
      painLocations: [],
      painType: [],
      painLevel1to10: 1,
      painStartedToday: false,
      painWorseWithMovement: false,
      feelsSafeToTrain: true,
      painNotes: "",
      ...(overrides.painCheckIn || {})
    }
  };
}

test("assessment saves to correct clientId", () => {
  const store = createStore();
  const result = saveAssessment(store, { ...blankAssessment("client_ada"), movementScores: allScores(3) });
  assert.equal(result.clientId, "client_ada");
  assert.equal(store.assessments[0].clientId, "client_ada");
});

test("safety flags change workout permission", () => {
  const result = summarizeAssessment({
    ...blankAssessment("client_ada"),
    movementScores: allScores(4),
    safetyAnswers: { cardioSymptoms: { answer: true } }
  });
  assert.equal(result.riskLevel, "High");
  assert.equal(result.workoutPermission, "Stop / Refer Out");
});

test("average and lowest score calculate correctly", () => {
  const scores = allScores(3);
  scores.squat = 1;
  scores.pain = 5;
  const result = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: scores });
  assert.equal(result.lowestCapabilityScore, 1);
  assert.equal(result.averageCapabilityScore, 3);
});

test("high pain creates Beginner training with Recovery mode", () => {
  const scores = allScores(4);
  scores.pain = 1;
  const result = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: scores });
  assert.equal(result.trainingLevel, "Beginner");
  assert.equal(result.adjustmentMode, "Recovery");
  assert.equal(result.recoveryRecommended, true);
});

test("low movement score creates Beginner training with Recovery recommended", () => {
  const result = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(1) });
  assert.equal(result.trainingLevel, "Beginner");
  assert.equal(result.adjustmentMode, "Recovery");
});

test("medium score creates Intermediate training level", () => {
  const result = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(3) });
  assert.equal(result.trainingLevel, "Intermediate");
});

test("high score with low pain creates Advanced training level", () => {
  const result = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(4) });
  assert.equal(result.trainingLevel, "Advanced");
});

test("equipment score affects exercise selection", () => {
  const store = createStore();
  const result = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(3), equipment: { bodyweight: true } });
  const filtered = filterExercisesForAssessment(store.exercises, result);
  assert.equal(result.equipmentLevel, "Minimal Equipment");
  assert.equal(filtered.some((exercise) => exercise.id === "deadlift"), false);
});

test("restriction tags filter exercises", () => {
  const store = createStore();
  const result = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: { ...allScores(3), shoulderMobility: 1 } });
  const filtered = filterExercisesForAssessment(store.exercises, result);
  assert.equal(result.restrictions.includes("Shoulder limitation"), true);
  assert.equal(filtered.some((exercise) => exercise.id === "heavy_bag_power"), false);
});

test("weekly check-in saves to correct clientId", () => {
  const store = createStore();
  const result = saveWeeklyCheckIn(store, {
    clientId: "client_ada",
    checkInDate: today,
    energyScore: 3,
    painScore: 1,
    sorenessScore: 1,
    sleepScore: 3,
    stressScore: 2,
    workoutCompleted: true,
    workoutCompletionPercent: 80,
    workoutDifficulty: "Medium",
    performanceScore: 3
  });
  assert.equal(result.clientId, "client_ada");
  assert.equal(store.weeklyCheckIns[0].clientId, "client_ada");
});

test("poor check-in makes next workout easier", () => {
  const store = createStore();
  const result = saveWeeklyCheckIn(store, {
    clientId: "client_ada",
    checkInDate: today,
    energyScore: 1,
    painScore: 4,
    sorenessScore: 4,
    sleepScore: 1,
    stressScore: 5,
    workoutCompleted: true,
    workoutCompletionPercent: 70,
    workoutDifficulty: "Hard",
    performanceScore: 2
  });
  assert.equal(result.checkInResult, "Poor Recovery");
  assert.equal(result.nextWorkoutDirection, "Easier");
});

test("strong check-in progresses next workout", () => {
  const store = createStore();
  const result = saveWeeklyCheckIn(store, {
    clientId: "client_ada",
    checkInDate: today,
    energyScore: 5,
    painScore: 1,
    sorenessScore: 1,
    sleepScore: 5,
    stressScore: 1,
    workoutCompleted: true,
    workoutCompletionPercent: 95,
    workoutDifficulty: "Medium",
    performanceScore: 5
  });
  assert.equal(result.checkInResult, "Strong Week");
  assert.equal(result.nextWorkoutDirection, "Harder");
});

test("average check-in maintains plan", () => {
  const store = createStore();
  const result = saveWeeklyCheckIn(store, {
    clientId: "client_ada",
    checkInDate: today,
    energyScore: 3,
    painScore: 1,
    sorenessScore: 2,
    sleepScore: 3,
    stressScore: 2,
    workoutCompleted: true,
    workoutCompletionPercent: 75,
    workoutDifficulty: "Medium",
    performanceScore: 3
  });
  assert.equal(result.checkInResult, "Normal");
  assert.equal(result.planAdjustment, "Maintain Plan");
});

test("last 4 check-ins affect new monthly plan", () => {
  const checks = Array.from({ length: 4 }, () => ({ checkInResult: "Strong Week" }));
  assert.equal(suggestMonthlyPlanLevel("Beginner", checks), "Intermediate");
  assert.equal(suggestMonthlyPlanLevel("Intermediate", checks), "Advanced");
  assert.equal(suggestMonthlyPlanLevel("Advanced", Array.from({ length: 4 }, () => ({ checkInResult: "Poor Recovery" }))), "Intermediate");
});

test("draft monthly plans are hidden from client and approved active plans are visible", () => {
  const store = createStore();
  const visible = getClientVisiblePlan(store, "client_ada");
  assert.equal(visible.id, "plan_ada_active");
  assert.notEqual(visible.id, "plan_ada_draft");
});

test("monthly plan can fill the entire month even when earlier weeks have passed", () => {
  const store = createStore();
  const plan = getClientVisiblePlan(store, "client_ada");
  const before = store.monthlyPlanItems.filter((item) => item.monthlyPlanId === plan.id).length;
  const items = ensureMonthlyPlanHasWorkouts(store, plan.id, summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(3) }));
  assert.ok(before < 12);
  assert.equal(items.length, 12);
});

test("client can only see own assessments and check-ins", () => {
  const assessment = { clientId: "client_ada" };
  assert.equal(clientOwnsRecord(assessment, "client_ada"), true);
  assert.equal(clientOwnsRecord(assessment, "client_marcus"), false);
});

test("coach can see all assigned clients", () => {
  const store = createStore();
  assert.equal(coachCanSeeClient(store, "coach_1", "client_ada"), true);
  assert.equal(coachCanSeeClient(store, "coach_1", "client_marcus"), true);
});

test("app does not crash if a client has no assessment yet", () => {
  const store = createStore();
  const dashboard = getClientDashboard(store, "client_marcus", today);
  assert.equal(dashboard.client.name, "Marcus Lee");
  assert.equal(dashboard.plan.trainingLevel, "Beginner");
});

test("client dashboard shows today's workout from Active approved plan", () => {
  const store = createStore();
  const dashboard = getClientDashboard(store, "client_ada", today);
  assert.equal(dashboard.workout.title, "Boxing Strength and Conditioning");
});

test("client cannot see another client's workout", () => {
  const store = createStore();
  const workout = getTodayWorkoutForClient(store, "client_ada", today);
  assert.equal(workout.clientId, "client_ada");
  assert.notEqual(workout.id, "item_marcus_today");
});

test("client can submit daily check-in before workout", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily());
  assert.equal(result.dailyCheckIn.clientId, "client_ada");
  assert.equal(store.dailyCheckIns.length, 1);
  assert.equal(store.painCheckIns[0].clientId, "client_ada");
  assert.equal(result.dailyCheckIn.painCheckInId, store.painCheckIns[0].id);
});

test("client can only submit one daily check-in per day", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily());
  assert.throws(() => saveDailyCheckIn(store, daily()), /already checked in/i);
});

test("poor daily check-in creates today-only adjusted workout", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ energyScore: 2 }));
  assert.equal(result.dailyCheckIn.dailyAdjustment, "Lower Intensity");
  assert.equal(store.todayWorkoutAdjustments.length, 1);
  assert.equal(store.monthlyPlanItems.find((item) => item.id === "item_ada_today").items[0].name, "Jump rope intervals");
});

test("strong daily check-in keeps workout same or shows optional progression", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ energyScore: 5, painScore: 1, sleepScore: 5, sorenessScore: 1, readinessScore: 5 }));
  assert.equal(result.dailyCheckIn.dailyAdjustment, "Optional Progression");
});

test("daily check-in does not overwrite monthly plan or future workouts", () => {
  const store = createStore();
  const beforePlan = JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active"));
  const beforeFuture = JSON.stringify(store.monthlyPlanItems.find((item) => item.id === "item_ada_future"));
  saveDailyCheckIn(store, daily({ energyScore: 1 }));
  assert.equal(JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active")), beforePlan);
  assert.equal(JSON.stringify(store.monthlyPlanItems.find((item) => item.id === "item_ada_future")), beforeFuture);
});

test("TodayWorkoutAdjustment is linked to the correct DailyCheckIn", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ energyScore: 2 }));
  assert.equal(store.todayWorkoutAdjustments[0].dailyCheckInId, result.dailyCheckIn.id);
});

test("coach can see original workout and adjusted workout", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ energyScore: 2 }));
  const adjustment = store.todayWorkoutAdjustments[0];
  assert.equal(adjustment.originalWorkoutSnapshot.title, "Boxing Strength and Conditioning");
  assert.equal(Boolean(adjustment.coachApprovedWorkoutSnapshot), true);
});

test("reassessment can trigger new Draft monthly plan", () => {
  const store = createStore();
  const assessment = summarizeAssessment({ ...blankAssessment("client_ada"), assessmentType: "Reassessment", movementScores: allScores(2) });
  const current = store.monthlyPlans.find((plan) => plan.id === "plan_ada_active");
  const result = createReassessmentDraftIfNeeded(store, assessment, current, true);
  assert.equal(result.shouldPrompt, true);
  assert.equal(result.draftPlan.status, "Draft");
});

test("reassessment does not automatically replace active plan without coach approval", () => {
  const store = createStore();
  const assessment = summarizeAssessment({ ...blankAssessment("client_ada"), assessmentType: "Reassessment", movementScores: allScores(2) });
  const current = store.monthlyPlans.find((plan) => plan.id === "plan_ada_active");
  createReassessmentDraftIfNeeded(store, assessment, current, false);
  assert.equal(store.monthlyPlans.find((plan) => plan.id === "plan_ada_active").status, "Active");
});

test("approving reassessment-based plan archives old plan and activates new plan", () => {
  const store = createStore();
  const assessment = summarizeAssessment({ ...blankAssessment("client_ada"), assessmentType: "Reassessment", movementScores: allScores(2) });
  const current = store.monthlyPlans.find((plan) => plan.id === "plan_ada_active");
  const { draftPlan } = createReassessmentDraftIfNeeded(store, assessment, current, true);
  approveMonthlyPlan(store, draftPlan.id);
  assert.equal(store.monthlyPlans.find((plan) => plan.id === "plan_ada_active").status, "Archived");
  assert.equal(store.monthlyPlans.find((plan) => plan.id === draftPlan.id).status, "Active");
  assert.ok(store.monthlyPlanItems.filter((item) => item.monthlyPlanId === draftPlan.id).length >= 12);
  assert.equal(getClientVisiblePlan(store, "client_ada").id, draftPlan.id);
});

test("coach can accept suggested workouts even when reassessment level stays the same", () => {
  const store = createStore();
  const current = getClientVisiblePlan(store, "client_ada");
  const assessment = saveAssessment(store, {
    ...blankAssessment("client_ada"),
    assessmentType: "Reassessment",
    movementScores: allScores(3),
    equipment: { bodyweight: true, chair: true, bands: true, dumbbells: true, bag: true }
  });
  assessment.trainingLevel = current.trainingLevel;
  assessment.planLevel = current.trainingLevel;
  assessment.restrictions = current.restrictions;
  assessment.workoutPermission = current.workoutPermission;
  const { draftPlan } = createReassessmentDraftIfNeeded(store, assessment, current, true);
  assert.equal(draftPlan.status, "Draft");
  assert.equal(draftPlan.coachEditable, true);
  assert.ok(store.monthlyPlanItems.filter((item) => item.monthlyPlanId === draftPlan.id).length > 0);
});

test("multiple poor daily check-ins create a coach alert", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ energyScore: 1 }));
  saveDailyCheckIn(store, daily({ id: "daily_two", workoutDate: "2026-05-30", energyScore: 1 }));
  assert.equal(store.coachAlerts.some((alert) => alert.alertReason.includes("Multiple poor check-ins")), true);
});

test("multiple strong daily check-ins create a coach-ready trend signal without changing plan", () => {
  const store = createStore();
  const beforePlan = JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active"));
  saveDailyCheckIn(store, daily({ energyScore: 5, painScore: 1, sleepScore: 5, sorenessScore: 1, readinessScore: 5 }));
  saveDailyCheckIn(store, daily({ id: "daily_strong_two", workoutDate: "2026-05-30", energyScore: 5, painScore: 1, sleepScore: 5, sorenessScore: 1, readinessScore: 5 }));
  assert.equal(JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active")), beforePlan);
});

test("poor daily check-in creates coach alert", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ painScore: 4 }));
  assert.equal(store.coachAlerts.length, 1);
});

test("serious safety check-in locks client workout", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ feelsSafeToTrain: false }));
  const dashboard = getClientDashboard(store, "client_ada", today);
  assert.equal(dashboard.locked, true);
});

test("mild check-in creates suggested adjustment", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ stressScore: 4 }));
  assert.equal(result.dailyCheckIn.dailyAdjustment, "Recovery Focus");
  assert.equal(result.alert.suggestedAdjustmentType, "Recovery Focus");
});

test("coach can approve suggested change", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  const adjustment = resolveCoachAlert(store, alert.id, "Approved Suggested Change");
  assert.equal(adjustment.coachDecision, "Approved Suggested Change");
});

test("coach can edit suggested change", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  const adjustment = resolveCoachAlert(store, alert.id, "Edited Suggested Change", { workoutSnapshot: { title: "Edited", items: [] } });
  assert.equal(adjustment.coachApprovedWorkoutSnapshot.title, "Edited");
});

test("coach can keep original workout", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  const adjustment = resolveCoachAlert(store, alert.id, "Kept Original Workout");
  assert.equal(adjustment.coachApprovedWorkoutSnapshot.title, "Boxing Strength and Conditioning");
});

test("coach can replace workout", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  const adjustment = resolveCoachAlert(store, alert.id, "Replaced Workout", { workoutSnapshot: { title: "Replacement", items: [] } });
  assert.equal(adjustment.coachApprovedWorkoutSnapshot.title, "Replacement");
});

test("coach can mark Coach Review Needed", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  const adjustment = resolveCoachAlert(store, alert.id, "Coach Review Needed");
  assert.equal(adjustment.coachDecision, "Coach Review Needed");
  assert.equal(adjustment.coachApprovedWorkoutSnapshot, null);
});

test("coach decision updates client dashboard", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  resolveCoachAlert(store, alert.id, "Kept Original Workout");
  const dashboard = getClientDashboard(store, "client_ada", today);
  assert.equal(dashboard.message, "Your coach reviewed your check-in and kept today's workout the same.");
});

test("TodayWorkoutAdjustment saves original, suggested, and coach-approved workout snapshots", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  const adjustment = resolveCoachAlert(store, alert.id, "Approved Suggested Change");
  assert.ok(adjustment.originalWorkoutSnapshot);
  assert.ok(adjustment.appSuggestedWorkoutSnapshot);
  assert.ok(adjustment.coachApprovedWorkoutSnapshot);
});

test("coach alert does not change the monthly plan", () => {
  const store = createStore();
  const beforePlan = JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active"));
  saveDailyCheckIn(store, daily({ painScore: 4 }));
  assert.equal(JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active")), beforePlan);
});

test("multiple poor alerts suggest reassessment", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ painScore: 4 }));
  saveDailyCheckIn(store, daily({ id: "daily_three", workoutDate: "2026-05-30", painScore: 4 }));
  assert.equal(store.coachAlerts.some((alert) => alert.alertReason.includes("reassessment")), true);
});

test("admin can view all coach alerts", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ painScore: 4 }));
  assert.equal(getAdminAlerts(store).length, 1);
});

test("client cannot bypass locked workout after serious alert", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Chest"], painType: ["Sharp"], painLevel1to10: 5 } }));
  const dashboard = getClientDashboard(store, "client_ada", today);
  assert.equal(dashboard.locked, true);
  assert.equal(dashboard.workout, null);
});

test("client only sees the final coach-approved workout for today", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painScore: 4 }));
  resolveCoachAlert(store, alert.id, "Replaced Workout", { workoutSnapshot: { title: "Coach final workout", items: [] } });
  const dashboard = getClientDashboard(store, "client_ada", today);
  assert.equal(dashboard.workout.title, "Coach final workout");
});

test("client can select pain location and enter pain level 1-10", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 6 } }));
  assert.deepEqual(result.dailyCheckIn.painCheckIn.painLocations, ["Knee"]);
  assert.equal(result.dailyCheckIn.painCheckIn.painLevel1to10, 6);
});

test("pain 1-2 keeps workout mostly same", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 2 } }));
  assert.equal(result.dailyCheckIn.dailyAdjustment, "Keep Same");
  assert.equal(result.dailyCheckIn.adjustedWorkout.coachNote, "Use pain-free range and clean form today.");
  assert.equal(getClientDashboard(store, "client_ada", today).message, "Your workout is ready. Stay in a pain-free range.");
});

test("pain 3-4 modifies today's workout only", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 4 } }));
  assert.equal(result.dailyCheckIn.dailyAdjustment, "Lower Intensity");
  assert.equal(result.alert.alertSeverity, "Mild");
  assert.equal(store.todayWorkoutAdjustments.length, 1);
  assert.equal(store.monthlyPlanItems.find((item) => item.id === "item_ada_today").items[0].name, "Jump rope intervals");
});

test("pain 5-6 creates coach alert and easier workout suggestion", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Shoulder"], painType: ["Sore"], painLevel1to10: 6 } }));
  assert.equal(result.alert.alertSeverity, "Moderate");
  assert.equal(result.dailyCheckIn.dailyAdjustment, "Recovery Version");
  assert.equal(store.todayWorkoutAdjustments.length, 0);
  assert.equal(getClientDashboard(store, "client_ada", today).message, "Your workout may need adjustment. Your coach has been alerted.");
});

test("pain 7-8 locks workout until coach review", () => {
  const store = createStore();
  saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 8 } }));
  assert.equal(getClientDashboard(store, "client_ada", today).locked, true);
  assert.equal(getClientDashboard(store, "client_ada", today).message, "Your pain level is high. Your coach has been alerted. Please wait for coach review before doing today's workout.");
});

test("pain 9-10 locks workout and creates serious alert", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Lower back"], painType: ["Sharp"], painLevel1to10: 9 } }));
  assert.equal(result.alert.alertSeverity, "Serious");
  assert.equal(result.dailyCheckIn.locked, true);
  assert.equal(getClientDashboard(store, "client_ada", today).message, "Your pain level is severe. Do not complete today's workout until your coach reviews this.");
});

test("chest pain locks workout and creates urgent alert", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Chest"], painType: ["Sharp"], painLevel1to10: 3 } }));
  assert.equal(result.alert.alertSeverity, "Serious");
  assert.equal(result.dailyCheckIn.locked, true);
  assert.equal(getClientDashboard(store, "client_ada", today).message, "Chest pain can be serious. Do not train. Seek medical attention if needed.");
});

test("knee pain replaces jumping and sprinting", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 6 } }));
  const names = result.dailyCheckIn.adjustedWorkout.items.map((item) => item.name);
  assert.equal(names.includes("Jump rope intervals"), false);
  assert.equal(names.includes("Marching warm-up"), true);
});

test("shoulder pain replaces heavy punching and overhead work", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Shoulder"], painType: ["Sore"], painLevel1to10: 5 } }));
  const names = result.dailyCheckIn.adjustedWorkout.items.map((item) => item.name);
  assert.equal(names.includes("Heavy bag power rounds"), false);
  assert.equal(names.includes("Defense drill"), true);
});

test("lower back pain replaces heavy hinge and twisting", () => {
  const store = createStore();
  store.monthlyPlanItems.find((item) => item.id === "item_ada_today").items.push({ exerciseId: "deadlift", name: "Deadlift", sessionPart: "Strength", sets: 3, reps: 5, rest: 90 });
  const result = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Lower back"], painType: ["Sore"], painLevel1to10: 6 } }));
  const names = result.dailyCheckIn.adjustedWorkout.items.map((item) => item.name);
  assert.equal(names.includes("Deadlift"), false);
  assert.equal(names.includes("Glute bridge"), true);
});

test("today-only pain adjustment does not change monthly plan", () => {
  const store = createStore();
  const beforePlan = JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active"));
  saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 6 } }));
  assert.equal(JSON.stringify(store.monthlyPlans.find((p) => p.id === "plan_ada_active")), beforePlan);
});

test("coach can approve and edit suggested pain-based workout change", () => {
  const store = createStore();
  const { alert } = saveDailyCheckIn(store, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 6 } }));
  const approved = resolveCoachAlert(store, alert.id, "Approved Suggested Change");
  assert.equal(approved.coachDecision, "Approved Suggested Change");
  assert.equal(getClientDashboard(store, "client_ada", today).message, "Your coach adjusted today's workout based on your pain check-in.");
  const store2 = createStore();
  const { alert: alert2 } = saveDailyCheckIn(store2, daily({ painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 6 } }));
  const edited = resolveCoachAlert(store2, alert2.id, "Edited Suggested Change", { workoutSnapshot: { title: "Edited pain-safe session", items: [] } });
  assert.equal(edited.coachApprovedWorkoutSnapshot.title, "Edited pain-safe session");
});

test("users log in with role and number password", () => {
  const store = createStore();
  assert.equal(authenticateUser(store, "Coach", "2222").name, "Coach Maya Rivera");
  assert.equal(authenticateUser(store, "Client", "1111").linkedId, "client_ada");
  assert.equal(authenticateUser(store, "Admin", "9999").role, "Admin");
  assert.equal(authenticateUser(store, "coach@madking.test", "2222").name, "Coach Maya Rivera");
  assert.equal(authenticateUser(store, "Coach", "1111"), null);
});

test("client view is limited to their own client record", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  assert.deepEqual(visibleClientsForUser(store, user).map((client) => client.id), ["client_ada"]);
  assert.equal(canUserAccessClient(store, user, "client_ada"), true);
  assert.equal(canUserAccessClient(store, user, "client_marcus"), false);
});

test("client accounts do not need a selected-client dropdown", () => {
  const store = createStore();
  const clientUser = authenticateUser(store, "Client", "1111");
  const coachUser = authenticateUser(store, "Coach", "2222");
  assert.equal(visibleClientsForUser(store, clientUser).length, 1);
  assert.ok(visibleClientsForUser(store, coachUser).length > 1);
});

test("coach can see assigned clients and admin can see all clients", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  const admin = authenticateUser(store, "Admin", "9999");
  assert.equal(visibleClientsForUser(store, coach).length, 2);
  assert.equal(visibleClientsForUser(store, admin).length, store.clients.length);
});

test("chat message creates notification for receiver", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  const clientUser = authenticateUser(store, "Client", "1111");
  const before = unreadNotificationCount(store, clientUser.id);
  sendChatMessage(store, {
    fromUserId: coach.id,
    toUserId: clientUser.id,
    clientId: "client_ada",
    body: "How did your knee feel today?"
  });
  assert.equal(unreadNotificationCount(store, clientUser.id), before + 1);
});

test("client and coach can only read their shared client chat while admin can audit it", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  const clientUser = authenticateUser(store, "Client", "1111");
  const admin = authenticateUser(store, "Admin", "9999");
  sendChatMessage(store, { fromUserId: clientUser.id, toUserId: coach.id, clientId: "client_ada", body: "I finished the workout." });
  assert.equal(getChatMessages(store, clientUser, "client_marcus").length, 0);
  assert.ok(getChatMessages(store, coach, "client_ada").length >= 1);
  assert.ok(getChatMessages(store, admin, "client_ada").length >= 1);
});

test("notifications can be marked read", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  assert.ok(unreadNotificationCount(store, user.id) > 0);
  markNotificationsRead(store, user.id);
  assert.equal(unreadNotificationCount(store, user.id), 0);
});

test("forgot PIN request notifies Admin and can be resolved by email or text", () => {
  const store = createStore();
  const request = submitPinResetRequest(store, { nameOrEmail: "ada@example.com", phone: "55511111", note: "Forgot my PIN" });
  assert.equal(request.status, "New");
  assert.equal(request.userId, "client_user_ada");
  assert.equal(store.notifications.some((item) => item.userId === "admin_1" && item.type === "PIN Reset Request"), true);
  const admin = authenticateUser(store, "Admin", "9999");
  const result = adminResolvePinResetRequest(store, admin, request.id, "Text");
  assert.equal(result.request.status, "Resolved");
  assert.match(result.request.adminMessage, /Text to 55511111/);
  assert.equal(authenticateUser(store, "ada@example.com", result.temporaryPin).id, "client_user_ada");
});

test("admin can change coach password", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  adminSetUserPin(store, admin, "coach_user_1", "2468");
  assert.equal(authenticateUser(store, "Coach", "2468").id, "coach_user_1");
  assert.equal(store.adminAuditLog.at(-1).action, "Changed PIN for Coach Maya Rivera");
});

test("non-admin cannot change passwords", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  assert.throws(() => adminSetUserPin(store, coach, "client_user_ada", "5555"), /Only admins/);
});

test("admin can update workouts", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  adminUpdateWorkout(store, admin, "item_ada_today", { title: "Admin Updated Workout" });
  assert.equal(store.monthlyPlanItems.find((item) => item.id === "item_ada_today").title, "Admin Updated Workout");
});

test("admin can intervene in chat", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const message = adminInterveneInChat(store, admin, "client_ada", "Please review this client before progressing.");
  assert.equal(message.fromUserId, admin.id);
  assert.equal(store.adminAuditLog.at(-1).action, "Intervened in chat for client_ada");
});

test("public user can request Client account without invite code", () => {
  const store = createStore();
  const user = requestLockedAccount(store, {
    firstName: "New",
    lastName: "Client",
    fullName: "New Client",
    email: "newclient@example.com",
    phone: "5554444444",
    accountType: "Client",
    pin: "1234",
    confirmPin: "1234",
    goal: "Boxing conditioning",
    sportFocus: "Boxing"
  });
  assert.equal(user.role, "Client");
  assert.equal(user.accountStatus, "Pending");
  assert.equal(user.accountLocked, true);
  assert.equal(user.profileLocked, true);
});

test("public user can request Coach account without invite code", () => {
  const store = createStore();
  const user = requestLockedAccount(store, {
    fullName: "New Coach",
    email: "newcoach@example.com",
    phone: "5557777777",
    accountType: "Coach",
    pin: "6543",
    confirmPin: "6543",
    coachTitle: "Boxing coach",
    coachRequestReason: "Need coach dashboard access"
  });
  assert.equal(user.role, "Coach");
  assert.equal(user.accountStatus, "Pending");
  assert.equal(user.accountLocked, true);
});

test("Admin account cannot be created from public signup", () => {
  const store = createStore();
  assert.throws(() => requestLockedAccount(store, {
    fullName: "Public Admin",
    email: "publicadmin@example.com",
    phone: "55599999",
    accountType: "Admin",
    pin: "1234",
    confirmPin: "1234"
  }), /Admin accounts cannot be created/);
});

test("PIN is exactly 4 digits, numeric only, and must match", () => {
  assert.throws(() => validateNumericPin("123abc", "123abc"), /numbers only/);
  assert.throws(() => validateNumericPin("123!", "123!"), /numbers only/);
  assert.throws(() => validateNumericPin("123", "123"), /exactly 4/);
  assert.throws(() => validateNumericPin("12345", "12345"), /exactly 4/);
  assert.throws(() => validateNumericPin("1234", "1235"), /must match/);
});

test("PIN is hashed and pending users cannot log in before Admin unlocks", () => {
  const store = createStore();
  const user = requestLockedAccount(store, {
    fullName: "New Coach",
    email: "newcoach@example.com",
    phone: "5557777777",
    accountType: "Client",
    pin: "1234",
    confirmPin: "1234"
  });
  assert.equal(user.pin, undefined);
  assert.notEqual(user.pinHash, "1234");
  assert.equal(authenticateUser(store, "newcoach@example.com", "1234"), null);
  assert.match(loginBlockedMessage(store, "newcoach@example.com", "1234"), /waiting for Admin approval/);
});

test("Admin dashboard can list, approve, reject, and archive account requests", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const client = requestLockedAccount(store, {
    fullName: "New Client",
    email: "newclient@example.com",
    phone: "5554444444",
    accountType: "Client",
    pin: "1234",
    confirmPin: "1234",
    goal: "Conditioning",
    sportFocus: "Boxing"
  });
  const coach = requestLockedAccount(store, {
    fullName: "New Coach",
    email: "newcoach@example.com",
    phone: "5557777777",
    accountType: "Coach",
    pin: "6543",
    confirmPin: "6543"
  });
  const archived = requestLockedAccount(store, {
    fullName: "Archive Me",
    email: "archive@example.com",
    phone: "5557777778",
    accountType: "Coach",
    pin: "9876",
    confirmPin: "9876"
  });
  assert.equal(getAccountRequests(store, admin, "Pending").length, 3);
  adminReviewAccountRequest(store, admin, client.id, "Approve", { coachId: "coach_1", unlockProfile: true });
  adminReviewAccountRequest(store, admin, coach.id, "Reject");
  adminReviewAccountRequest(store, admin, archived.id, "Archive");
  assert.equal(authenticateUser(store, "newclient@example.com", "1234").id, client.id);
  assert.equal(store.clients.find((item) => item.id === client.linkedId).profileLocked, false);
  assert.equal(authenticateUser(store, "newcoach@example.com", "6543"), null);
  assert.match(loginBlockedMessage(store, "newcoach@example.com", "6543"), /not approved/);
  assert.equal(getAccountRequests(store, admin, "Archived").some((item) => item.id === archived.id), true);
});

test("Admin can approve Coach with limited permissions", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const coach = requestLockedAccount(store, {
    fullName: "Limited Coach",
    email: "limited@example.com",
    phone: "5557770000",
    accountType: "Coach",
    pin: "1234",
    confirmPin: "1234"
  });
  adminReviewAccountRequest(store, admin, coach.id, "Approve", { permissions: { coachCanCreateWorkouts: false } });
  const loggedIn = authenticateUser(store, "limited@example.com", "1234");
  assert.equal(loggedIn.id, coach.id);
  assert.deepEqual(loggedIn.coachPermissions, { coachCanCreateWorkouts: false });
});

test("InviteCode is not required for signup, login, or unlock", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const user = requestLockedAccount(store, {
    fullName: "No Invite",
    email: "noinvite@example.com",
    phone: "5551010101",
    accountType: "Client",
    pin: "4321",
    confirmPin: "4321"
  });
  assert.equal(store.inviteCodes.length, 0);
  adminReviewAccountRequest(store, admin, user.id, "Approve", { unlockProfile: false });
  assert.equal(authenticateUser(store, "noinvite@example.com", "4321").id, user.id);
});

test("admin can reset client and coach PINs without seeing current PIN", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const clientReset = adminResetUserPin(store, admin, "client_user_ada");
  const coachReset = adminResetUserPin(store, admin, "coach_user_1");
  assert.equal(clientReset.user.pin, undefined);
  assert.equal(coachReset.user.pin, undefined);
  assert.equal(clientReset.user.forcePinChange, true);
  assert.equal(coachReset.user.forcePinChange, true);
  assert.equal(authenticateUser(store, "ada@example.com", clientReset.temporaryPin).id, "client_user_ada");
});

test("admin can disable and reactivate login", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  adminSetLoginDisabled(store, admin, "client_user_ada", true);
  assert.equal(authenticateUser(store, "ada@example.com", "1111"), null);
  adminSetLoginDisabled(store, admin, "client_user_ada", false);
  assert.equal(authenticateUser(store, "ada@example.com", "1111").id, "client_user_ada");
});

test("new account request system starts without invite codes", () => {
  const store = createStore();
  assert.deepEqual(store.inviteCodes, []);
});

test("admin can create, edit, and archive a new client", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const client = adminCreateClient(store, admin, {
    firstName: "Rosa",
    lastName: "Diaz",
    email: "rosa@example.com",
    phone: "5551212000",
    goal: "Boxing fitness",
    sportFocus: "Boxing",
    trainingDaysPerWeek: 2,
    sessionLength: 30,
    package: "2-Day Boxing Plan",
    assignedCoach: "coach_1",
    startDate: today,
    status: "Active",
    injuryRestrictionNotes: "No current restrictions",
    emergencyContact: "Amy Diaz / 555-121-9000"
  });
  assert.equal(client.name, "Rosa Diaz");
  assert.equal(client.emergencyContact, "Amy Diaz / 555-121-9000");
  assert.equal(store.users.some((user) => user.linkedId === client.id), false);
  adminUpdateClient(store, admin, client.id, { goal: "Kickboxing fitness", coachId: "coach_1" });
  assert.equal(store.clients.find((item) => item.id === client.id).goal, "Kickboxing fitness");
  adminArchiveClient(store, admin, client.id);
  assert.equal(store.clients.find((item) => item.id === client.id).status, "Archived");
});

test("admin can update coach emergency contact", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const coach = adminUpdateCoach(store, admin, "coach_1", { emergencyContact: "Coach Contact / 555-222-9999" });
  assert.equal(coach.emergencyContact, "Coach Contact / 555-222-9999");
});

test("admin can create, edit, and delete a coach", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const { coach, user } = adminCreateCoach(store, admin, {
    firstName: "Jordan",
    lastName: "King",
    email: "jordan@example.com",
    phone: "5554442222",
    specialty: "Kickboxing",
    emergencyContact: "Sam King / 555-444-9999",
    pin: "4444",
    confirmPin: "4444"
  });
  assert.equal(coach.name, "Jordan King");
  assert.equal(user.linkedId, coach.id);
  assert.equal(authenticateUser(store, "jordan@example.com", "4444").id, user.id);
  adminUpdateCoach(store, admin, coach.id, { name: "Jordan Royal", phone: "5554443333", specialty: "Boxing" });
  assert.equal(store.coaches.find((item) => item.id === coach.id).name, "Jordan Royal");
  assert.equal(store.users.find((item) => item.id === user.id).phone, "5554443333");
  adminDeleteCoach(store, admin, coach.id);
  assert.equal(store.coaches.some((item) => item.id === coach.id), false);
  assert.equal(store.users.some((item) => item.id === user.id), false);
});

test("admin can delete a client and linked records", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  adminDeleteClient(store, admin, "client_ada");
  assert.equal(store.clients.some((client) => client.id === "client_ada"), false);
  assert.equal(store.monthlyPlans.some((plan) => plan.clientId === "client_ada"), false);
  assert.equal(store.users.some((user) => user.linkedId === "client_ada"), false);
});

test("admin can create, edit, and archive an exercise", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const exercise = adminCreateExercise(store, admin, {
    exerciseName: "Seated Bag Drill",
    category: "Boxing",
    sportFocus: "Boxing",
    goal: "Technique",
    difficulty: "Easy",
    trainingLevel: "Beginner",
    sessionPart: "Skill / Technique",
    equipment: "Boxing bag",
    bodyArea: "Upper body",
    stressArea: "Shoulder",
    lowImpact: true
  });
  assert.equal(exercise.exerciseName, "Seated Bag Drill");
  adminUpdateExercise(store, admin, exercise.id, { trainingLevel: "Intermediate", difficulty: "Medium" });
  assert.equal(store.exercises.find((item) => item.id === exercise.id).trainingLevel, "Intermediate");
  adminArchiveExercise(store, admin, exercise.id);
  assert.equal(store.exercises.find((item) => item.id === exercise.id).archived, true);
});

test("admin can delete exercises, workout templates, plan offerings, packages, and coaches", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const exercise = adminCreateExercise(store, admin, { exerciseName: "Delete Me Drill" });
  const workout = adminCreateWorkoutTemplate(store, admin, { workoutName: "Delete Me Workout" });
  adminAddExerciseToWorkoutTemplate(store, admin, workout.id, { exerciseId: exercise.id });
  const offering = adminCreatePlanOffering(store, admin, { planName: "Delete Me Offering", workoutTemplateIds: [workout.id] });
  const pkg = adminCreatePackage(store, admin, { packageName: "Delete Me Package", planOfferingId: offering.id });
  store.coaches.push({ id: "coach_delete", name: "Delete Coach", role: "Coach" });
  store.users.push({ id: "coach_user_delete", role: "Coach", name: "Delete Coach", linkedId: "coach_delete" });
  adminDeleteExercise(store, admin, exercise.id);
  adminDeleteWorkoutTemplate(store, admin, workout.id);
  adminDeletePlanOffering(store, admin, offering.id);
  adminDeletePackage(store, admin, pkg.id);
  adminDeleteCoach(store, admin, "coach_delete");
  assert.equal(store.exercises.some((item) => item.id === exercise.id), false);
  assert.equal(store.workoutTemplates.some((item) => item.id === workout.id), false);
  assert.equal(store.planOfferings.some((item) => item.id === offering.id), false);
  assert.equal(store.packages.some((item) => item.id === pkg.id), false);
  assert.equal(store.coaches.some((item) => item.id === "coach_delete"), false);
});

test("admin can create and delete assessment templates", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const template = adminCreateAssessmentTemplate(store, admin, {
    templateName: "Boxing Power Assessment",
    sportFocus: "Boxing",
    goal: "Power",
    movementTestIds: ["push", "pull", "core", "conditioning"]
  });
  const summary = summarizeAssessment({ ...blankAssessment("client_ada"), movementTestIds: template.movementTestIds, movementScores: allScores(4) });
  assert.equal(summary.movementTestIds.length, 4);
  adminDeleteAssessmentTemplate(store, admin, template.id);
  assert.equal(store.assessmentTemplates.some((item) => item.id === template.id), false);
});

test("admin can create a workout, add exercises, and reorder workout items", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const workout = adminCreateWorkoutTemplate(store, admin, {
    workoutName: "Kickboxing Day 1",
    sportFocus: "Kickboxing",
    goal: "Fight Conditioning",
    trainingLevel: "Intermediate",
    difficulty: "Medium",
    sessionLength: 45,
    trainingDayType: "Day 1",
    workoutCategory: "Kickboxing"
  });
  const first = adminAddExerciseToWorkoutTemplate(store, admin, workout.id, { exerciseId: "light_shadowboxing", sessionPart: "Skill / Technique" });
  const second = adminAddExerciseToWorkoutTemplate(store, admin, workout.id, { exerciseId: "marching", sessionPart: "Warm-Up" });
  const reordered = adminReorderWorkoutTemplateItems(store, admin, workout.id, [second.id, first.id]);
  assert.equal(reordered[0].id, second.id);
  assert.equal(store.workoutTemplateItems.filter((item) => item.workoutTemplateId === workout.id).length, 2);
});

test("admin can create plan offering, assign it to package, and assign package to client", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const offering = adminCreatePlanOffering(store, admin, {
    planName: "2-Day Beginner Plan",
    sportFocus: "General Fitness",
    goal: "Recovery",
    trainingLevel: "Beginner",
    trainingDaysPerWeek: 2,
    sessionLength: 30,
    price: 149,
    sessionsIncluded: 8,
    packageType: "Recovery coaching",
    workoutTemplateIds: ["template_boxing_baseline"]
  });
  const pkg = adminCreatePackage(store, admin, { packageName: "Recovery Package" });
  adminAssignPlanOfferingToPackage(store, admin, pkg.id, offering.id);
  adminAssignPackageToClient(store, admin, "client_ada", pkg.id);
  const client = store.clients.find((item) => item.id === "client_ada");
  assert.equal(client.packageId, pkg.id);
  assert.equal(client.planOfferingId, offering.id);
});

test("coach cannot create workouts unless Admin permission allows it", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  assert.throws(() => adminCreateWorkoutTemplate(store, coach, { workoutName: "Coach Workout" }), /Only Admin/);
  store.adminPermissions.coachCanCreateWorkouts = true;
  const workout = adminCreateWorkoutTemplate(store, coach, { workoutName: "Coach Workout" });
  assert.equal(workout.workoutName, "Coach Workout");
});

test("client cannot access admin creation pages", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  assert.equal(canAccessAdminRoute(client, "/admin/clients/new", store), false);
  assert.equal(canAccessAdminRoute(client, "/admin/workouts/new", store), false);
});

test("exercise library data can be imported from Excel-style rows", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const imported = adminImportExercisesFromRows(store, admin, [
    { "Exercise ID": "EX9001", "Exercise Name": "Low Box Step", Category: "Lower", "Movement Pattern": "Lunge", Level: "Beginner", Equipment: "Box", "Goal Tag": "Strength", "Mode Tag": "General", "Restriction Avoid": "Knee pain", "Easier Alternative": "Step Tap", "Harder Progression": "Step-Up", "Coaching Cue": "Control the lower", "Default Sets": 2, "Default Reps/Time": "8 each", "Default Rest": "60 sec" }
  ]);
  assert.equal(imported.length, 1);
  assert.equal(imported[0].exerciseName, "Low Box Step");
  assert.equal(imported[0].trainingLevel, "Beginner");
});

test("workout templates can use exercises from Exercise Library and workbook rows", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const imported = adminImportWorkoutTemplatesFromRows(store, admin, store.workbookWorkoutRows);
  assert.ok(store.workoutTemplateItems.some((item) => item.workoutTemplateId === imported.id && item.exerciseName === "Jump Rope"));
});

test("monthly plan generator can pull from Admin-created plan offerings and workout templates", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const workout = adminCreateWorkoutTemplate(store, admin, { workoutName: "Admin Beginner Session", trainingLevel: "Beginner", sessionLength: 30 });
  adminAddExerciseToWorkoutTemplate(store, admin, workout.id, { exerciseId: "marching", sessionPart: "Warm-Up", time: "5 min" });
  const offering = adminCreatePlanOffering(store, admin, {
    planName: "Admin Beginner Month",
    trainingLevel: "Beginner",
    trainingDaysPerWeek: 2,
    sessionLength: 30,
    workoutTemplateIds: [workout.id]
  });
  const plan = generateMonthlyPlanFromPlanOffering(store, admin, "client_marcus", offering.id, { month: "2026-06", startDate: "2026-06-01" });
  assert.equal(plan.status, "Draft");
  assert.equal(plan.sourcePlanOfferingId, offering.id);
  assert.equal(plan.trainingLevel, "Beginner");
  assert.ok(store.monthlyPlanItems.some((item) => item.monthlyPlanId === plan.id && item.title === "Admin Beginner Session"));
});

test("assessment recommends Beginner, Intermediate, Advanced, and Pro", () => {
  assert.equal(summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(2.5) }).recommendedTrainingLevel, "Beginner");
  assert.equal(summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(3.2) }).recommendedTrainingLevel, "Intermediate");
  assert.equal(summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(4) }).recommendedTrainingLevel, "Advanced");
  assert.equal(summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: allScores(5) }).recommendedTrainingLevel, "Pro");
});

test("Recovery is adjustment mode, not default training level", () => {
  const scores = allScores(4);
  scores.pain = 1;
  const assessment = summarizeAssessment({ ...blankAssessment("client_ada"), movementScores: scores });
  assert.equal(assessment.trainingLevel, "Beginner");
  assert.equal(assessment.adjustmentMode, "Recovery");
  assert.notEqual(assessment.trainingLevel, "Recovery");
});

test("daily check-in changes today adjustment mode only", () => {
  const store = createStore();
  store.clients.find((client) => client.id === "client_ada").currentTrainingLevel = "Advanced";
  const beforeLevel = store.clients.find((client) => client.id === "client_ada").currentTrainingLevel;
  const result = saveDailyCheckIn(store, {
    clientId: "client_ada",
    monthlyPlanId: "plan_ada_active",
    workoutDate: today,
    energyScore: 2,
    painScore: 1,
    sorenessScore: 1,
    sleepScore: 3,
    stressScore: 2,
    readinessScore: 2,
    feelsSafeToTrain: true,
    painCheckIn: { hasPain: false }
  });
  assert.equal(result.dailyCheckIn.dailyAdjustmentMode, "Lower Intensity");
  assert.equal(store.clients.find((client) => client.id === "client_ada").currentTrainingLevel, beforeLevel);
});

test("reassessment can change main training level after coach and client approval", () => {
  const store = createStore();
  const assessment = summarizeAssessment({ ...blankAssessment("client_ada"), assessmentType: "Reassessment", movementScores: allScores(5) });
  const currentPlan = getClientVisiblePlan(store, "client_ada");
  const result = createReassessmentDraftIfNeeded(store, assessment, currentPlan, true);
  assert.equal(result.shouldPrompt, true);
  assert.equal(result.draftPlan.trainingLevel, "Pro");
  approveMonthlyPlan(store, result.draftPlan.id);
  assert.equal(getClientVisiblePlan(store, "client_ada").trainingLevel, "Pro");
});

test("accepted assessment suggestion creates a draft monthly plan with workouts", () => {
  const store = createStore();
  const assessment = saveAssessment(store, { ...blankAssessment("client_ada"), assessmentType: "Reassessment", movementScores: allScores(5) });
  const currentPlan = getClientVisiblePlan(store, "client_ada");
  const result = createReassessmentDraftIfNeeded(store, assessment, currentPlan, true);
  const generatedItems = store.monthlyPlanItems.filter((item) => item.monthlyPlanId === result.draftPlan.id);
  assert.equal(result.draftPlan.status, "Draft");
  assert.equal(result.draftPlan.approved, false);
  assert.equal(generatedItems.length, 12);
  assert.ok(generatedItems.every((item) => item.trainingLevel === "Pro"));
  assert.ok(generatedItems.every((item) => item.items.length > 0));
});

test("reassessment pain recommendation generates recovery alternatives without changing active plan", () => {
  const store = createStore();
  const scores = allScores(4);
  scores.pain = 1;
  const beforePlan = getClientVisiblePlan(store, "client_ada");
  const assessment = saveAssessment(store, { ...blankAssessment("client_ada"), assessmentType: "Reassessment", movementScores: scores });
  const result = createReassessmentDraftIfNeeded(store, assessment, beforePlan, true);
  const generatedItems = store.monthlyPlanItems.filter((item) => item.monthlyPlanId === result.draftPlan.id);
  const generatedExercises = generatedItems.flatMap((item) => item.items).map((item) => store.exercises.find((exercise) => exercise.id === item.exerciseId)).filter(Boolean);
  assert.equal(getClientVisiblePlan(store, "client_ada").id, beforePlan.id);
  assert.equal(result.draftPlan.status, "Draft");
  assert.ok(generatedItems.every((item) => item.adjustmentMode === "Recovery"));
  assert.ok(generatedExercises.every((exercise) => exercise.lowImpact || exercise.recoveryAlternative));
});

test("Advanced client with high pain gets Recovery Mode for today only", () => {
  const store = createStore();
  const plan = getClientVisiblePlan(store, "client_ada");
  plan.trainingLevel = "Advanced";
  const result = saveDailyCheckIn(store, {
    clientId: "client_ada",
    monthlyPlanId: plan.id,
    workoutDate: today,
    energyScore: 4,
    painScore: 4,
    sorenessScore: 1,
    sleepScore: 4,
    stressScore: 1,
    readinessScore: 4,
    feelsSafeToTrain: true,
    painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sharp"], painLevel1to10: 7, feelsSafeToTrain: true }
  });
  assert.equal(result.dailyCheckIn.dailyAdjustmentMode, "Recovery");
  assert.equal(getClientVisiblePlan(store, "client_ada").trainingLevel, "Advanced");
});

test("Beginner client with strong check-in does not automatically become Intermediate", () => {
  const store = createStore();
  const client = store.clients.find((item) => item.id === "client_marcus");
  client.currentTrainingLevel = "Beginner";
  const result = saveDailyCheckIn(store, {
    clientId: "client_marcus",
    monthlyPlanId: "plan_marcus_active",
    workoutDate: today,
    energyScore: 5,
    painScore: 0,
    sorenessScore: 1,
    sleepScore: 5,
    stressScore: 1,
    readinessScore: 5,
    feelsSafeToTrain: true,
    painCheckIn: { hasPain: false }
  });
  assert.equal(result.dailyCheckIn.dailyAdjustmentMode, "Normal");
  assert.equal(client.currentTrainingLevel, "Beginner");
});

test("Recovery alternatives replace risky exercises when pain is high", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, {
    clientId: "client_ada",
    monthlyPlanId: "plan_ada_active",
    workoutDate: today,
    energyScore: 3,
    painScore: 5,
    sorenessScore: 2,
    sleepScore: 3,
    stressScore: 2,
    readinessScore: 2,
    feelsSafeToTrain: true,
    painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 6, feelsSafeToTrain: true }
  });
  const names = result.dailyCheckIn.adjustedWorkout.items.map((item) => item.name);
  assert.equal(names.includes("Jump rope intervals"), false);
  assert.ok(names.includes("Marching warm-up") || names.includes("Easy bike"));
});

test("Admin can create Recovery alternatives separately from Beginner workouts", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const beginner = adminCreateExercise(store, admin, { exerciseName: "Beginner Squat Drill", trainingLevel: "Beginner", recoveryAlternative: false, lowImpact: true });
  const recovery = adminCreateExercise(store, admin, { exerciseName: "Recovery Chair Drill", trainingLevel: "Beginner", recoveryAlternative: true, lowImpact: true });
  assert.equal(beginner.trainingLevel, "Beginner");
  assert.equal(beginner.recoveryAlternative, false);
  assert.equal(recovery.trainingLevel, "Beginner");
  assert.equal(recovery.recoveryAlternative, true);
});

test("client can see today's workout details", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  const detail = getWorkoutDetailForUser(store, user, "client_ada", "item_ada_today", today);
  assert.equal(detail.title, "Boxing Strength and Conditioning");
  assert.ok(detail.sections.some((section) => section.name === "Warm-Up"));
  assert.ok(detail.sections.flatMap((section) => section.items).some((item) => item.exerciseId === "jump_rope"));
});

test("client can click an exercise and view full instructions", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  const detail = getExerciseDetailForUser(store, user, "push_up", { clientId: "client_ada", workoutId: "item_ada_today", date: today });
  assert.equal(detail.exerciseName, "Push-ups");
  assert.ok(detail.setupInstructions);
  assert.ok(detail.stepByStepInstructions);
});

test("client can see Watch Video button data when video exists", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  const workout = getWorkoutDetailForUser(store, user, "client_ada", "item_ada_today", today);
  const jumpRope = workout.sections.flatMap((section) => section.items).find((item) => item.exerciseId === "jump_rope");
  assert.equal(jumpRope.hasVideo, true);
  assert.ok(jumpRope.detail.youtubeEmbedUrl.includes("youtube.com/embed"));
});

test("client does not see video button data when no video exists", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  const workout = getWorkoutDetailForUser(store, user, "client_ada", "item_ada_today", today);
  const ropes = workout.sections.flatMap((section) => section.items).find((item) => item.exerciseId === "battle_ropes");
  assert.equal(ropes.hasVideo, false);
});

test("client cannot see coach-only notes unless visibleToClient is true", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  store.exercises.find((item) => item.id === "push_up").coachNotes = "Internal shoulder cue.";
  let detail = getExerciseDetailForUser(store, user, "push_up", { clientId: "client_ada", workoutId: "item_ada_today", date: today });
  assert.equal(detail.coachOnlyNotes, "");
  store.exercises.find((item) => item.id === "push_up").coachNotesVisibleToClient = true;
  detail = getExerciseDetailForUser(store, user, "push_up", { clientId: "client_ada", workoutId: "item_ada_today", date: today });
  assert.equal(detail.coachOnlyNotes, "Internal shoulder cue.");
});

test("coach can see workout details and coach-only notes", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  store.exercises.find((item) => item.id === "push_up").coachNotes = "Internal shoulder cue.";
  const workout = getWorkoutDetailForUser(store, coach, "client_ada", "item_ada_today", today);
  const push = workout.sections.flatMap((section) => section.items).find((item) => item.exerciseId === "push_up");
  assert.equal(push.detail.coachOnlyNotes, "Internal shoulder cue.");
});

test("coach can click exercise and view full details", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  const detail = getExerciseDetailForUser(store, coach, "heavy_bag_power", { clientId: "client_ada", workoutId: "item_ada_today", date: today });
  assert.equal(detail.exerciseName, "Heavy bag power rounds");
  assert.ok(detail.safetyWarnings);
});

test("coach can see replacement and edit controls when allowed", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  const detail = getExerciseDetailForUser(store, coach, "heavy_bag_power", { clientId: "client_ada", workoutId: "item_ada_today", date: today });
  assert.equal(detail.canAdjustInWorkout, true);
  assert.ok(detail.replacementOptions.some((item) => item.name === "Light shadowboxing"));
});

test("admin can edit exercise video links", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  adminUpdateExercise(store, admin, "battle_ropes", { videoUrl: "https://example.com/battle-ropes.mp4" });
  const detail = getExerciseDetailForUser(store, admin, "battle_ropes");
  assert.equal(detail.videoUrl, "https://example.com/battle-ropes.mp4");
});

test("adjusted workout still shows clickable exercise details", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  saveDailyCheckIn(store, {
    clientId: "client_ada",
    monthlyPlanId: "plan_ada_active",
    workoutDate: today,
    energyScore: 3,
    painScore: 2,
    sorenessScore: 1,
    sleepScore: 3,
    stressScore: 1,
    readinessScore: 3,
    feelsSafeToTrain: true,
    painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 3, feelsSafeToTrain: true }
  });
  const detail = getWorkoutDetailForUser(store, user, "client_ada", "item_ada_today", today);
  assert.equal(detail.adjustedForToday, true);
  assert.ok(detail.sections.flatMap((section) => section.items).every((item) => item.detail?.exerciseName));
});

test("exercise details are pulled from Exercise Library by exerciseId", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  store.exercises.find((item) => item.id === "jump_rope").purpose = "Custom library purpose.";
  const workout = getWorkoutDetailForUser(store, user, "client_ada", "item_ada_today", today);
  const jumpRope = workout.sections.flatMap((section) => section.items).find((item) => item.exerciseId === "jump_rope");
  assert.equal(jumpRope.detail.purpose, "Custom library purpose.");
});

test("client cannot access another client's workout detail URL", () => {
  const store = createStore();
  const user = authenticateUser(store, "Client", "1111");
  const detail = getWorkoutDetailForUser(store, user, "client_marcus", "item_marcus_today", today);
  assert.equal(detail, null);
});

test("client can upload their own profile image", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  const result = uploadProfileImage(store, client, client.id, imageFile("ada.webp", 200_000, "image/webp"));
  assert.ok(result.imageStorageKey.startsWith("profile/client_user_ada/"));
  assert.equal(store.clients.find((item) => item.id === "client_ada").profileImageStorageKey, result.imageStorageKey);
});

test("client cannot upload profile image for another client", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  const otherUser = store.users.find((user) => user.linkedId === "client_marcus");
  assert.throws(() => uploadProfileImage(store, client, otherUser.id, imageFile()), /permission/);
});

test("coach can upload their own profile image", () => {
  const store = createStore();
  const coach = authenticateUser(store, "Coach", "2222");
  const result = uploadProfileImage(store, coach, coach.id, imageFile("coach.png", 100_000, "image/png"));
  assert.equal(coach.profileImageStorageKey, result.imageStorageKey);
});

test("Admin can upload and remove coach profile image", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const coach = authenticateUser(store, "Coach", "2222");
  uploadProfileImage(store, admin, coach.id, imageFile("coach.jpg"));
  assert.ok(coach.profileImageUrl);
  removeProfileImage(store, admin, coach.id);
  assert.equal(coach.profileImageUrl, "");
});

test("invalid file types and oversized images are rejected", () => {
  assert.throws(() => validateImageUpload(imageFile("bad.exe", 100, "application/x-msdownload")), /Invalid image type/);
  assert.throws(() => validateImageUpload(imageFile("huge.jpg", 6 * 1024 * 1024, "image/jpeg")), /too large/);
});

test("client can upload progress image", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  const image = uploadProgressImage(store, client, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front", imageDate: today, clientNotes: "Week one" });
  assert.equal(image.clientId, "client_ada");
  assert.ok(image.imageStorageKey.startsWith("progress/client_ada/"));
  assert.equal(typeof image.file, "undefined");
});

test("client can view their own progress images but not another client's", () => {
  const store = createStore();
  const ada = authenticateUser(store, "Client", "1111");
  const marcus = authenticateUser(store, "Client", "3333");
  uploadProgressImage(store, ada, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front" });
  uploadProgressImage(store, marcus, "client_marcus", { file: imageFile("side.jpg"), imageCategory: "Side" });
  const visible = getProgressImagesForUser(store, ada);
  assert.equal(visible.length, 1);
  assert.equal(visible[0].clientId, "client_ada");
});

test("assigned coach can view assigned client progress images", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  const coach = authenticateUser(store, "Coach", "2222");
  uploadProgressImage(store, client, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front" });
  const visible = getProgressImagesForUser(store, coach, "client_ada");
  assert.equal(visible.length, 1);
});

test("unassigned coach cannot view client progress images", () => {
  const store = createStore();
  store.coaches.push({ id: "coach_2", name: "Coach Two", role: "Coach" });
  store.users.push({ id: "coach_user_2", role: "Coach", name: "Coach Two", email: "two@test.com", phone: "5552223333", pinSalt: "x", pinHash: "x", linkedId: "coach_2" });
  const client = authenticateUser(store, "Client", "1111");
  const coachTwo = store.users.find((user) => user.id === "coach_user_2");
  uploadProgressImage(store, client, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front" });
  assert.equal(getProgressImagesForUser(store, coachTwo, "client_ada").length, 0);
});

test("Admin can view all progress images", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const ada = authenticateUser(store, "Client", "1111");
  const marcus = authenticateUser(store, "Client", "3333");
  uploadProgressImage(store, ada, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front" });
  uploadProgressImage(store, marcus, "client_marcus", { file: imageFile("side.jpg"), imageCategory: "Side" });
  assert.equal(getProgressImagesForUser(store, admin).length, 2);
});

test("coach gets alert when assigned client uploads progress image", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  uploadProgressImage(store, client, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front" });
  const coach = authenticateUser(store, "Coach", "2222");
  assert.equal(unreadNotificationCount(store, coach.id), 1);
});

test("image upload actions are saved in AuditLog", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  const image = uploadProgressImage(store, client, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front" });
  const coach = authenticateUser(store, "Coach", "2222");
  addProgressImageCoachNote(store, coach, image.id, "Reviewed.", true);
  assert.ok(store.adminAuditLog.some((entry) => entry.action.includes("uploaded progress image")));
  assert.ok(store.adminAuditLog.some((entry) => entry.action.includes("added progress image note")));
});

test("Admin can archive inappropriate progress images", () => {
  const store = createStore();
  const client = authenticateUser(store, "Client", "1111");
  const admin = authenticateUser(store, "Admin", "9999");
  const image = uploadProgressImage(store, client, "client_ada", { file: imageFile("front.jpg"), imageCategory: "Front" });
  archiveProgressImage(store, admin, image.id);
  assert.equal(getProgressImagesForUser(store, admin).length, 0);
});

test("workbook exercises are imported into Exercise Library", () => {
  const store = createStore();
  const imported = store.exercises.filter((exercise) => exercise.importedFromWorkbook);
  assert.ok(imported.length >= 444);
  assert.ok(imported.some((exercise) => exercise.exerciseName === "Wall Push-Up"));
});

test("duplicate exercise names are normalized", () => {
  const store = createStore();
  const names = store.exercises.map((exercise) => String(exercise.exerciseName).toLowerCase().replace(/push[-\s]?up/g, "push up").replace(/[^a-z0-9]+/g, " ").trim());
  assert.equal(names.filter((name) => name === "wall push up").length, 1);
});

test("meaningful exercise variations are preserved", () => {
  const store = createStore();
  const pushVariations = store.exercises.filter((exercise) => /push/i.test(exercise.exerciseName));
  assert.ok(pushVariations.some((exercise) => exercise.exerciseName === "Wall Push-Up"));
  assert.ok(pushVariations.some((exercise) => exercise.exerciseName === "Incline Push-Up"));
  assert.ok(pushVariations.some((exercise) => exercise.exerciseName === "Floor Push-Up"));
});

test("imported exercises have at least basic instructions", () => {
  const store = createStore();
  const imported = store.exercises.find((exercise) => exercise.importedFromWorkbook && exercise.exerciseName === "Goblet Squat");
  assert.ok(imported.setupInstructions);
  assert.ok(imported.howToPerform);
  assert.ok(imported.safetyWarnings);
  assert.equal(imported.needsReview, true);
});

test("workout-sheet sourced imported exercises are enriched and cleared from Needs Review", () => {
  const store = createStore();
  const jumpRope = store.exercises.find((exercise) => exercise.importedFromWorkbook && exercise.exerciseName === "Jump Rope");
  assert.ok(jumpRope.sourceSheets.includes("Workout Plan"));
  assert.equal(jumpRope.needsReview, false);
  assert.match(jumpRope.description, /workbook.informed/i);
  assert.match(jumpRope.setupInstructions, /workbook dose/i);
  assert.match(jumpRope.coachNotes, /Filled from workbook workout sheets/i);
});

test("Admin can edit imported exercises and add video links", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const imported = store.exercises.find((exercise) => exercise.exerciseName === "Goblet Squat");
  adminUpdateExercise(store, admin, imported.id, { setupInstructions: "Feet shoulder width. Hold the dumbbell close.", videoUrl: "https://youtube.com/watch?v=abc123" });
  const updated = store.exercises.find((exercise) => exercise.id === imported.id);
  assert.equal(updated.setupInstructions, "Feet shoulder width. Hold the dumbbell close.");
  assert.equal(updated.videoUrl, "https://youtube.com/watch?v=abc123");
});

test("workout builder can search full Exercise Library", () => {
  const store = createStore();
  const results = searchExerciseLibrary(store.exercises, "goblet");
  assert.ok(results.some((exercise) => exercise.exerciseName === "Goblet Squat"));
});

test("monthly plan generator uses imported Exercise Library", () => {
  const store = createStore();
  const admin = authenticateUser(store, "Admin", "9999");
  const workout = adminCreateWorkoutTemplate(store, admin, { workoutName: "Imported Library Session", trainingLevel: "Beginner", sessionLength: 30 });
  const offering = adminCreatePlanOffering(store, admin, {
    planName: "Imported Library Plan",
    trainingLevel: "Beginner",
    trainingDaysPerWeek: 2,
    sessionLength: 30,
    workoutTemplateIds: [workout.id]
  });
  const plan = generateMonthlyPlanFromPlanOffering(store, admin, "client_ada", offering.id, { month: "2026-07", startDate: "2026-07-01" });
  const item = store.monthlyPlanItems.find((entry) => entry.monthlyPlanId === plan.id);
  assert.ok(item.items.some((entry) => store.exercises.find((exercise) => exercise.id === entry.exerciseId)?.importedFromWorkbook));
});

test("daily pain adjustment uses safe alternatives from Exercise Library", () => {
  const store = createStore();
  const result = saveDailyCheckIn(store, {
    clientId: "client_ada",
    monthlyPlanId: "plan_ada_active",
    workoutDate: today,
    energyScore: 3,
    painScore: 5,
    sorenessScore: 2,
    sleepScore: 3,
    stressScore: 2,
    readinessScore: 2,
    feelsSafeToTrain: true,
    painCheckIn: { hasPain: true, painLocations: ["Knee"], painType: ["Sore"], painLevel1to10: 6, feelsSafeToTrain: true }
  });
  assert.ok(result.dailyCheckIn.adjustedWorkout.items.some((item) => store.exercises.find((exercise) => exercise.id === item.exerciseId)));
});

test("Exercise Library filters work by category, sport, level, equipment, body area, and recovery alternative", () => {
  const store = createStore();
  assert.ok(filterExerciseLibrary(store.exercises, { category: "Strength" }).length > 0);
  assert.ok(filterExerciseLibrary(store.exercises, { sportFocus: "Get in Shape" }).length > 0);
  assert.ok(filterExerciseLibrary(store.exercises, { trainingLevel: "Beginner" }).length > 0);
  assert.ok(filterExerciseLibrary(store.exercises, { equipment: "Bodyweight" }).length > 0);
  assert.ok(filterExerciseLibrary(store.exercises, { bodyArea: "Shoulder" }).length > 0);
  assert.ok(filterExerciseLibrary(store.exercises, { recoveryAlternative: true }).length > 0);
});

