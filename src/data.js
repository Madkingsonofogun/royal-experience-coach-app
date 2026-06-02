import { hashPin, movementTests } from "./logic.js";
import { workbookExercises } from "./imported-exercises.js";
import { workbookAssessmentTemplates } from "./assessment-templates-imported.js";
import { workbookPackages } from "./packages-imported.js";
import { workbookPlanOfferings } from "./plan-offerings-imported.js";
import { workbookSummaryTemplates } from "./workout-summary-templates.js";
import { workbookWorkoutTemplateItems } from "./workout-template-items-90.js";

export function createStore() {
  return {
    settings: {
      allowMildAutoAdjustments: true,
      maxImageUploadBytes: 5 * 1024 * 1024,
      allowClientProgressImageDelete: false,
      coachCanEditOtherCoachImages: false
    },
    users: [
      user("admin_1", "Admin", "Admin", "admin@madking.test", "5550000000", "9999", "admin_1"),
      user("coach_user_1", "Coach", "Coach Maya Rivera", "coach@madking.test", "55522222", "2222", "coach_1"),
      user("client_user_ada", "Client", "Ada Johnson", "ada@example.com", "55511111", "1111", "client_ada"),
      user("client_user_marcus", "Client", "Marcus Lee", "marcus@example.com", "55533333", "3333", "client_marcus")
    ],
    coaches: [
      { id: "coach_1", name: "Coach Maya Rivera", role: "Coach", emergencyContact: "Luis Rivera / 555-220-1000" },
      { id: "admin_1", name: "Admin", role: "Admin", emergencyContact: "Office / 555-000-0000" }
    ],
    clients: [
      {
        id: "client_ada",
        coachId: "coach_1",
        name: "Ada Johnson",
        email: "ada@example.com",
        phone: "55511111",
        age: 38,
        goal: "Build boxing conditioning and pain-free strength",
        sportFocus: "Boxing and fight-conditioning",
        trainingDaysPerWeek: 3,
        sessionLength: 45,
        injuryNotes: "Intermittent knee soreness with jumping and fast pivots.",
        equipmentAvailable: ["Bodyweight / open floor space", "Stable chair / bench", "Resistance bands", "Dumbbells", "Boxing bag"],
        packageType: "Hybrid coaching",
        sessionsRemaining: 9,
        startDate: "2026-04-15",
        progressNotes: "Improving consistency. Keep impact controlled until knee tolerance improves.",
        emergencyContact: "Denise Johnson / 555-111-9000",
        currentTrainingLevel: "Intermediate",
        currentPlanLevel: "Intermediate",
        currentRestrictions: ["Knee limitation"],
        currentAdjustmentMode: "Normal",
        lastAssessmentDate: "2026-05-01",
        lastWeeklyCheckInResult: "Normal",
        profileImageUrl: "",
        profileImageStorageKey: "",
        profileImageUploadedAt: null
      },
      {
        id: "client_marcus",
        coachId: "coach_1",
        name: "Marcus Lee",
        email: "marcus@example.com",
        phone: "55533333",
        age: 44,
        goal: "Kickboxing endurance and weight loss",
        sportFocus: "Kickboxing",
        trainingDaysPerWeek: 4,
        sessionLength: 60,
        injuryNotes: "Low cardio tolerance after long layoff. No current joint restriction reported.",
        equipmentAvailable: ["Bodyweight / open floor space", "Stable chair / bench", "Resistance bands", "Cardio machine"],
        packageType: "In-person plus app",
        sessionsRemaining: 13,
        startDate: "2026-05-03",
        progressNotes: "Start with recovery pacing and short kickboxing technique rounds.",
        emergencyContact: "Tara Lee / 555-333-9000",
        currentTrainingLevel: "Beginner",
        currentPlanLevel: null,
        currentRestrictions: ["Low cardio tolerance"],
        currentAdjustmentMode: "Normal",
        lastAssessmentDate: null,
        lastWeeklyCheckInResult: null,
        profileImageUrl: "",
        profileImageStorageKey: "",
        profileImageUploadedAt: null
      }
    ],
    assessments: [],
    weeklyCheckIns: [],
    dailyCheckIns: [],
    painCheckIns: [],
    pinResetRequests: [],
    progressImages: [],
    coachAlerts: [],
    todayWorkoutAdjustments: [],
    workoutCompletions: [],
    chatMessages: [
      {
        id: "msg_seed_1",
        clientId: "client_ada",
        fromUserId: "coach_user_1",
        toUserId: "client_user_ada",
        body: "Remember to check in before today's workout so I can adjust anything that needs it.",
        createdAt: "2026-05-29T10:00:00.000Z",
        readBy: ["coach_user_1"]
      }
    ],
    notifications: [
      {
        id: "notification_seed_1",
        userId: "client_user_ada",
        clientId: "client_ada",
        type: "Chat Message",
        title: "New message from Coach Maya",
        body: "Remember to check in before today's workout.",
        read: false,
        createdAt: "2026-05-29T10:00:00.000Z"
      }
    ],
    inviteCodes: [],
    adminAuditLog: [],
    planOfferings: [
      {
        id: "offering_boxing_3day",
        planName: "3-Day Boxing Plan",
        description: "Boxing strength and conditioning plan for baseline clients.",
        sportFocus: "Boxing",
        goal: "Conditioning",
        trainingLevel: "Intermediate",
        planLevel: "Intermediate",
        trainingDaysPerWeek: 3,
        sessionLength: 45,
        price: 249,
        sessionsIncluded: 12,
        packageType: "Hybrid coaching",
        workoutTemplateIds: ["template_boxing_baseline"],
        planTemplateIds: ["plan_template_boxing_baseline"],
        active: true,
        archived: false,
        createdByAdminId: "admin_1",
        createdAt: "2026-05-29T09:00:00.000Z",
        updatedAt: "2026-05-29T09:00:00.000Z"
      },
      ...workbookPlanOfferings
    ],
    packages: [
      {
        id: "package_hybrid_boxing",
        packageName: "Hybrid Boxing Coaching",
        planOfferingId: "offering_boxing_3day",
        price: 249,
        sessionsIncluded: 12,
        active: true,
        archived: false,
        createdByAdminId: "admin_1",
        createdAt: "2026-05-29T09:00:00.000Z",
        updatedAt: "2026-05-29T09:00:00.000Z"
      },
      ...workbookPackages
    ],
    planTemplates: [
      {
        id: "plan_template_boxing_baseline",
        templateName: "Baseline Boxing Monthly Template",
        sportFocus: "Boxing",
        goal: "Conditioning",
        trainingLevel: "Intermediate",
        planLevel: "Intermediate",
        workoutTemplateIds: ["template_boxing_baseline"],
        active: true,
        archived: false,
        createdByAdminId: "admin_1",
        createdAt: "2026-05-29T09:00:00.000Z",
        updatedAt: "2026-05-29T09:00:00.000Z"
      }
    ],
    assessmentTemplates: [
      {
        id: "assessment_template_default",
        templateName: "Coach-Led Movement Screening",
        movementTestIds: movementTests.map((test) => test.id),
        active: true,
        archived: false,
        createdByAdminId: "admin_1",
        createdAt: "2026-05-29T09:00:00.000Z",
        updatedAt: "2026-05-29T09:00:00.000Z"
      },
      ...workbookAssessmentTemplates
    ],
    workoutTemplates: [
      {
        id: "template_boxing_baseline",
        workoutName: "Intermediate Boxing Strength and Conditioning",
        description: "Reusable boxing session for baseline clients.",
        sportFocus: "Boxing",
        goal: "Conditioning",
        trainingLevel: "Intermediate",
        planLevel: "Intermediate",
        difficulty: "Medium",
        sessionLength: 45,
        trainingDayType: "Day 1",
        workoutCategory: "Boxing",
        visible: true,
        active: true,
        archived: false,
        createdByAdminId: "admin_1",
        createdAt: "2026-05-29T09:00:00.000Z",
        updatedAt: "2026-05-29T09:00:00.000Z"
      },
      ...workbookSummaryTemplates
    ],
    workoutTemplateItems: [
      workoutTemplateItem("wti_1", "template_boxing_baseline", "Warm-Up", "jump_rope", "Jump rope intervals", null, null, "3 min", "60 sec", 3, "Stay relaxed.", "Relax shoulders.", 1),
      workoutTemplateItem("wti_2", "template_boxing_baseline", "Skill / Technique", "light_shadowboxing", "Light shadowboxing", null, null, "2 min", "60 sec", 4, "Stance, jab, cross.", "Smooth technique.", 2),
      workoutTemplateItem("wti_3", "template_boxing_baseline", "Strength", "push_up", "Push-ups", 3, 10, null, "60 sec", null, "Clean bracing.", "Use incline if needed.", 3),
      ...workbookWorkoutTemplateItems
    ],
    adminPermissions: {
      coachCanCreateWorkouts: false,
      coachCanCreateExercises: false
    },
    excelStarterRows,
    workbookWorkoutRows,
    monthlyPlans: [
      {
        id: "plan_ada_active",
        clientId: "client_ada",
        coachId: "coach_1",
        month: "2026-05",
        status: "Active",
        planStatus: "Active",
        approved: true,
        coachApproved: true,
        trainingLevel: "Intermediate",
        planLevel: "Intermediate",
        restrictions: ["Knee limitation"],
        workoutPermission: "Train with Modifications"
      },
      {
        id: "plan_ada_draft",
        clientId: "client_ada",
        coachId: "coach_1",
        month: "2026-06",
        status: "Draft",
        planStatus: "Draft",
        approved: false,
        coachApproved: false,
        trainingLevel: "Advanced",
        planLevel: "Advanced",
        restrictions: [],
        workoutPermission: "Progress"
      },
      {
        id: "plan_marcus_active",
        clientId: "client_marcus",
        coachId: "coach_1",
        month: "2026-05",
        status: "Active",
        planStatus: "Active",
        approved: true,
        coachApproved: true,
        trainingLevel: "Beginner",
        planLevel: "Beginner",
        restrictions: ["Low cardio tolerance"],
        workoutPermission: "Train with Modifications"
      }
    ],
    monthlyPlanItems: [
      {
        id: "item_ada_today",
        clientId: "client_ada",
        monthlyPlanId: "plan_ada_active",
        workoutDate: "2026-05-29",
        trainingDayNumber: 7,
        weekNumber: 4,
        trainingLevel: "Intermediate",
        adjustmentMode: "Normal",
        sessionLength: 45,
        coachAllowsMarkComplete: true,
        coachAllowsBonus: true,
        title: "Boxing Strength and Conditioning",
        items: [
          { exerciseId: "jump_rope", name: "Jump rope intervals", sessionPart: "Warm-up", rounds: 4, time: 60, rest: 45 },
          { exerciseId: "heavy_bag_power", name: "Heavy bag power rounds", sessionPart: "Skill", rounds: 5, time: 120, rest: 60 },
          { exerciseId: "push_up", name: "Push-ups", sessionPart: "Strength", sets: 3, reps: 10, rest: 60 },
          { exerciseId: "battle_ropes", name: "Battle ropes", sessionPart: "Finisher", rounds: 4, time: 30, rest: 45 }
        ]
      },
      {
        id: "item_ada_future",
        clientId: "client_ada",
        monthlyPlanId: "plan_ada_active",
        workoutDate: "2026-05-31",
        trainingDayNumber: 8,
        weekNumber: 4,
        trainingLevel: "Intermediate",
        adjustmentMode: "Normal",
        sessionLength: 45,
        coachAllowsMarkComplete: true,
        title: "Lower Body Control",
        items: [
          { exerciseId: "box_squat", name: "Box squat", sessionPart: "Strength", sets: 3, reps: 8, rest: 75 },
          { exerciseId: "band_row", name: "Band row", sessionPart: "Strength", sets: 3, reps: 12, rest: 60 }
        ]
      },
      {
        id: "item_marcus_today",
        clientId: "client_marcus",
        monthlyPlanId: "plan_marcus_active",
        workoutDate: "2026-05-29",
        trainingDayNumber: 4,
        weekNumber: 2,
        trainingLevel: "Beginner",
        adjustmentMode: "Normal",
        sessionLength: 40,
        coachAllowsMarkComplete: false,
        title: "Recovery Kickboxing Basics",
        items: [
          { exerciseId: "marching", name: "Marching warm-up", sessionPart: "Warm-up", time: 5, rest: 30 },
          { exerciseId: "light_shadowboxing", name: "Light shadowboxing", sessionPart: "Skill", rounds: 4, time: 90, rest: 60 }
        ]
      }
    ],
    exercises: createExercises()
  };
}

function user(id, role, name, email, phone, pin, linkedId) {
  const pinSalt = `seed_${id}`;
  return {
    id,
    role,
    name,
    email,
    phone,
    pinSalt,
    pinHash: hashPin(pin, pinSalt),
    linkedId,
    accountLocked: false,
    accountUnlockedByAdminId: role === "Admin" ? "seed" : "admin_1",
    accountUnlockedAt: "2026-05-29T09:00:00.000Z",
    accountLockReason: "",
    accountStatus: "Active",
    requestedRole: role,
    requestNote: "",
    profileLocked: false,
    emailVerified: role === "Admin",
    forcePinChange: false,
    temporaryPinExpiresAt: null,
    disabled: false,
    profileImageUrl: "",
    profileImageStorageKey: "",
    profileImageUploadedAt: null,
    createdAt: "2026-05-29T09:00:00.000Z"
  };
}

function invite(id, code, roleAllowed, email, phone, clientId, coachId, createdByUserId) {
  return {
    id,
    code,
    email,
    phone,
    roleAllowed,
    clientId,
    coachId,
    createdByUserId,
    createdByAdminId: createdByUserId === "admin_1" ? createdByUserId : null,
    expiresAt: "2099-01-01T00:00:00.000Z",
    used: false,
    usedAt: null,
    createdAt: "2026-05-29T09:00:00.000Z"
  };
}

function workoutTemplateItem(id, workoutTemplateId, sessionPart, exerciseId, exerciseName, sets, reps, time, rest, rounds, coachingNotes, clientNotes, displayOrder) {
  return {
    id,
    workoutTemplateId,
    sessionPart,
    exerciseId,
    exerciseName,
    sets,
    reps,
    time,
    rest,
    rounds,
    coachingNotes,
    clientNotes,
    displayOrder,
    createdAt: "2026-05-29T09:00:00.000Z",
    updatedAt: "2026-05-29T09:00:00.000Z"
  };
}

export const excelStarterRows = [
  { "Exercise ID": "EX0001", "Exercise Name": "Wall Push-Up", Category: "Upper", "Movement Pattern": "Push", Level: "Below Beginner", Equipment: "Bodyweight", "Goal Tag": "Strength", "Mode Tag": "Adaptive / Injury Start", "Restriction Avoid": "Shoulder pain, Wrist Pain", "Easier Alternative": "Seated Wall Press", "Harder Progression": "Incline Push-Up", "Coaching Cue": "Keep body straight and press through palms", "Default Sets": 2, "Default Reps/Time": "8-10", "Default Rest": "60 sec" },
  { "Exercise ID": "EX0002", "Exercise Name": "Incline Push-Up", Category: "Upper", "Movement Pattern": "Push", Level: "Beginner", Equipment: "Bodyweight", "Goal Tag": "Strength", "Mode Tag": "Get in Shape", "Restriction Avoid": "Wrist Pain", "Easier Alternative": "Wall Push-Up", "Harder Progression": "Floor Push-Up", "Coaching Cue": "Hands elevated, chest to surface", "Default Sets": 3, "Default Reps/Time": "8-10", "Default Rest": "60 sec" },
  { "Exercise ID": "EX0004", "Exercise Name": "Floor Push-Up", Category: "Upper", "Movement Pattern": "Push", Level: "Intermediate", Equipment: "Bodyweight", "Goal Tag": "Strength", "Mode Tag": "Get in Shape", "Restriction Avoid": "Shoulder pain, Wrist Pain", "Easier Alternative": "Knee Push-Up", "Harder Progression": "Decline Push-Up", "Coaching Cue": "Ribs down, elbows 30-45 degrees", "Default Sets": 3, "Default Reps/Time": "8-10", "Default Rest": "60 sec" },
  { "Exercise ID": "EX0022", "Exercise Name": "Jump Rope", Category: "Cardio", "Movement Pattern": "Conditioning", Level: "Intermediate", Equipment: "Jump Rope", "Goal Tag": "Conditioning", "Mode Tag": "Boxing", "Restriction Avoid": "Knee pain, Ankle pain, Foot pain", "Easier Alternative": "March in Place", "Harder Progression": "Boxer Skip Rope", "Coaching Cue": "Relax shoulders and stay tall", "Default Sets": 3, "Default Reps/Time": "3 min", "Default Rest": "60 sec" },
  { "Exercise ID": "EX0031", "Exercise Name": "Shadowboxing", Category: "Boxing", "Movement Pattern": "Skill", Level: "Beginner", Equipment: "None", "Goal Tag": "Boxing", "Mode Tag": "Technique", "Restriction Avoid": "Shoulder pain if punching hurts", "Easier Alternative": "Seated Shadow Boxing", "Harder Progression": "Shadow Boxing Jab Cross", "Coaching Cue": "Stance, jab, cross", "Default Sets": 3, "Default Reps/Time": "2 min", "Default Rest": "60 sec" }
];

export const workbookWorkoutRows = [
  { "Program Week": 1, Day: "Monday", "Program Type": "Boxing", Focus: "Cardio + Fundamentals", Exercise: "Jump Rope", Sets: 3, "Reps/Time": "3 min", Intensity: "Moderate", Equipment: "Jump Rope", "Coach Notes": "Stay relaxed", "Easier Alternative": "March in Place", "Harder Progression": "Boxer Skip Rope" },
  { "Program Week": 1, Day: "Monday", "Program Type": "Boxing", Focus: "Cardio + Fundamentals", Exercise: "Shadowboxing", Sets: 3, "Reps/Time": "2 min", Intensity: "Light", Equipment: "None", "Coach Notes": "Stance, jab, cross", "Easier Alternative": "Seated Shadow Boxing", "Harder Progression": "Shadow Boxing Jab Cross" },
  { "Program Week": 1, Day: "Wednesday", "Program Type": "Boxing", Focus: "Conditioning", Exercise: "Bag rounds", Sets: 4, "Reps/Time": "2 min", Intensity: "Moderate", Equipment: "Heavy Bag", "Coach Notes": "Basic 1-2", "Easier Alternative": "Shadowboxing", "Harder Progression": "Heavy Bag Power Rounds" }
];

export function blankAssessment(clientId, date = "2026-05-29") {
  return {
    clientId,
    assessmentDate: date,
    assessmentType: "Initial Assessment",
    coachNotes: "",
    safetyAnswers: {},
    movementScores: Object.fromEntries(movementTests.map((test) => [test.id, 3])),
    equipment: { bodyweight: true, chair: true, bands: true, dumbbells: true }
  };
}

export function createExercises() {
  const appSeedExercises = [
    exercise("chair_sit_to_stand", "Chair sit-to-stand", "Recovery", "bodyweight chair", ["Knee limitation"], "squat", ["Knee"], false, false, false),
    exercise("box_squat", "Box squat", "Baseline", "bodyweight chair", [], "squat", ["Knee", "Hip"], true, false, false, "chair_sit_to_stand"),
    exercise("supported_squat", "Supported squat", "Recovery", "bodyweight chair", [], "squat", ["Knee", "Hip"], true, false, false),
    exercise("glute_bridge", "Glute bridge", "Recovery", "bodyweight", [], "hinge", ["Hip", "Lower back"], true, false, false),
    exercise("wall_hinge", "Wall hinge", "Recovery", "bodyweight", ["Back limitation"], "hinge", ["Lower back"], true, false, false),
    exercise("dowel_hinge", "Dowel hinge", "Baseline", "bodyweight", ["Back limitation"], "hinge", ["Lower back"], true, false, false, "wall_hinge"),
    exercise("deadlift", "Deadlift", "Progression", "barbell dumbbells", ["Back limitation", "Pain high"], "hinge", ["Lower back", "Hip"], false, false, true, "dowel_hinge", "glute_bridge"),
    exercise("supported_split_squat", "Supported split squat", "Recovery", "chair bodyweight", ["Knee limitation"], "lunge", ["Knee", "Hip"], true, false, false),
    exercise("step_up", "Step-up", "Baseline", "chair bodyweight", ["Knee limitation", "Fall risk"], "lunge", ["Knee", "Ankle"], true, false, false, "supported_split_squat"),
    exercise("wall_push_up", "Wall push-up", "Recovery", "bodyweight", ["Shoulder limitation", "Wrist limitation"], "push", ["Shoulder", "Wrist"], true, false, false),
    exercise("incline_push_up", "Incline push-up", "Baseline", "chair bodyweight", ["Shoulder limitation", "Wrist limitation"], "push", ["Shoulder", "Wrist"], true, false, false, "wall_push_up"),
    exercise("push_up", "Push-ups", "Progression", "bodyweight", ["Shoulder limitation", "Wrist limitation"], "push", ["Shoulder", "Wrist"], false, false, false, "incline_push_up", "wall_push_up"),
    exercise("band_row", "Band row", "Baseline", "bands", [], "pull", ["Shoulder", "Upper back"], true, false, false),
    exercise("seated_row", "Seated row", "Recovery", "bands machines", [], "pull", ["Shoulder", "Upper back"], true, false, false),
    exercise("dead_bug", "Dead bug", "Recovery", "bodyweight", [], "core", ["Lower back"], true, false, false),
    exercise("bird_dog", "Bird dog", "Recovery", "bodyweight", [], "core", ["Lower back", "Shoulder", "Wrist"], true, false, false),
    exercise("modified_plank", "Modified plank", "Baseline", "bodyweight", ["Shoulder limitation", "Wrist limitation"], "core", ["Shoulder", "Wrist", "Lower back"], true, false, false, "dead_bug"),
    exercise("supported_balance", "Supported balance", "Recovery", "chair bodyweight", [], "balance", ["Ankle", "Foot", "Knee"], true, false, false),
    exercise("marching", "Marching warm-up", "Recovery", "bodyweight low-impact", [], "conditioning", ["Knee", "Ankle", "Foot"], true, false, false),
    exercise("walk_intervals", "Walk intervals", "Recovery", "bodyweight low-impact", [], "conditioning", ["Knee", "Ankle", "Foot"], true, false, false),
    exercise("bike_easy", "Easy bike", "Recovery", "cardio-machine low-impact", [], "conditioning", ["Knee", "Hip"], true, false, false),
    exercise("jump_rope", "Jump rope intervals", "Progression", "jump-rope", ["Knee limitation", "Ankle limitation", "Fall risk", "Pain high"], "conditioning", ["Knee", "Ankle", "Foot"], false, true, false, "marching", "marching"),
    exercise("light_shadowboxing", "Light shadowboxing", "Recovery", "bodyweight low-impact", [], "boxing", ["Shoulder", "Lower back"], true, false, false),
    exercise("defense_drill", "Defense drill", "Baseline", "bodyweight low-impact", [], "boxing", ["Knee", "Hip"], true, false, false),
    exercise("heavy_bag_power", "Heavy bag power rounds", "Progression", "boxing-bag", ["Shoulder limitation", "Wrist limitation", "Pain high"], "boxing", ["Shoulder", "Wrist", "Elbow", "Lower back"], false, false, true, "light_shadowboxing", "light_shadowboxing"),
    exercise("battle_ropes", "Battle ropes", "Progression", "battle-ropes", ["Shoulder limitation", "Wrist limitation", "Pain high"], "conditioning", ["Shoulder", "Wrist", "Elbow", "Lower back"], false, false, true, "marching", "marching"),
    exercise("wall_slides", "Wall slides", "Recovery", "bodyweight mobility", [], "mobility", ["Shoulder"], true, false, false),
    exercise("hip_mobility", "Seated hip mobility", "Recovery", "bodyweight mobility", [], "mobility", ["Hip"], true, false, false),
    exercise("ankle_rocks", "Ankle rocks", "Recovery", "bodyweight mobility", [], "mobility", ["Ankle"], true, false, false)
  ];
  const imported = workbookExercises.map((exercise) => ({
    ...exercise,
    importedFromWorkbook: true,
    createdByAdminId: "workbook-import",
    createdAt: "2026-05-29T09:00:00.000Z",
    updatedAt: "2026-05-29T09:00:00.000Z"
  }));
  const existingNames = new Set(imported.map((exercise) => normalizeExerciseName(exercise.exerciseName || exercise.name)));
  const compatibilityIds = new Set(["marching", "bike_easy", "glute_bridge", "defense_drill", "light_shadowboxing"]);
  const compatibleSeeds = appSeedExercises
    .filter((exercise) => compatibilityIds.has(exercise.id) || !existingNames.has(normalizeExerciseName(exercise.exerciseName || exercise.name)))
    .map((exercise) => ({ ...exercise, importedFromWorkbook: false, sourceSheets: ["App seed compatibility"] }));
  return [...imported, ...compatibleSeeds];
}

function normalizeExerciseName(name) {
  return String(name || "").toLowerCase().replace(/push[-\s]?up/g, "push up").replace(/[^a-z0-9]+/g, " ").trim();
}

function exercise(id, name, planLevel, equipmentText, contraindications, replacementCategory, stressArea, lowImpact, highImpact, heavy, regressionExerciseId = null, safeAlternativeExerciseId = null) {
  const recoveryAlternative = planLevel === "Recovery";
  const trainingLevel = planLevel === "Progression" ? "Advanced" : planLevel === "Baseline" ? "Intermediate" : "Beginner";
  return {
    id,
    exerciseName: name,
    name,
    progression: ["Advanced", "Pro"].includes(trainingLevel),
    regression: recoveryAlternative || trainingLevel === "Beginner",
    recoveryAlternative,
    lowImpact,
    highImpact,
    heavy,
    difficulty: trainingLevel === "Advanced" ? "Hard" : trainingLevel === "Intermediate" ? "Medium" : "Easy",
    trainingLevel,
    planLevel: trainingLevel,
    sessionPart: replacementCategory,
    bodyArea: stressArea,
    stressArea,
    equipment: equipmentText.split(" "),
    contraindications,
    replacementCategory,
    purpose: `${name} develops ${replacementCategory} capacity while matching the client's current training level.`,
    setupInstructions: `Prepare ${equipmentText.replaceAll("-", " ")} and choose a clear, stable training space.`,
    howToPerform: `Perform ${name} with controlled posture, smooth breathing, and pain-free range. Keep the movement clean before adding speed or load.`,
    breathingInstructions: "Exhale through the effort, inhale during the easier phase, and never hold your breath.",
    tempoOrPace: highImpact || heavy ? "Athletic but controlled. Keep every rep crisp." : "Smooth and controlled with enough rest to keep form.",
    coachingCues: recoveryAlternative ? "Keep it easy, stable, and pain-free." : "Stay tall, relaxed, and technically sharp.",
    commonMistakes: highImpact ? "Rushing impact, landing heavy, and ignoring fatigue." : "Rushing reps, losing posture, and forcing range.",
    safetyWarnings: `Avoid this if it triggers ${contraindications.join(", ") || "sharp pain or unsafe symptoms"}.`,
    painWarnings: `If pain increases around ${stressArea.join(", ") || "the working area"}, stop and use a safer option.`,
    clientNotes: "Use clean form and contact your coach if anything feels wrong.",
    coachNotes: `Coach watch point: scale ${name} based on readiness, pain, equipment, and movement quality.`,
    coachNotesVisibleToClient: false,
    videoUrl: id === "jump_rope" ? "https://www.youtube.com/watch?v=FJmRQ5iTXKE" : id === "push_up" ? "https://www.youtube.com/watch?v=IODxDxX7oi4" : "",
    regressionExerciseId,
    safeAlternativeExerciseId
  };
}

