import {
  adminAddExerciseToWorkoutTemplate,
  adminArchiveMonthlyPlan,
  adminArchiveClient,
  adminArchiveExercise,
  adminArchivePlanOffering,
  adminArchiveWorkoutTemplate,
  adminAssignPackageToClient,
  adminAssignPlanOfferingToPackage,
  adminCreateAssessmentTemplate,
  adminCreateClient,
  adminCreateCoach,
  adminCreateExercise,
  adminCreatePackage,
  adminCreatePlanOffering,
  adminCreateWorkoutTemplate,
  adminDuplicateExercise,
  adminEnsureCoachLogin,
  adminEnsureClientLogin,
  adminImportExercisesFromRows,
  adminImportWorkoutTemplatesFromRows,
  adminInterveneInChat,
  adminDeleteAssessmentTemplate,
  adminDeleteClient,
  adminDeleteCoach,
  adminDeleteExercise,
  adminDeletePackage,
  adminDeletePlanOffering,
  adminDeleteWorkoutTemplate,
  adminUpdateCoach,
  addProgressImageCoachNote,
  adminRemoveWorkoutTemplateItem,
  adminReorderWorkoutTemplateItems,
  adminResetUserPin,
  adminSetUserPin,
  adminSetLoginDisabled,
  adminResolvePinResetRequest,
  adminUpdateClient,
  adminUpdateAssessmentTemplate,
  adminUpdateExercise,
  adminUpdatePackage,
  adminUpdatePlanOffering,
  adminUpdateWorkout,
  adminUpdateWorkoutTemplate,
  adminUpdateWorkoutTemplateItem,
  archiveProgressImage,
  authenticateUser,
  canUserAccessClient,
  approveMonthlyPlan,
  createReassessmentDraftIfNeeded,
  equipmentOptions,
  filterExercisesForAssessment,
  filterExerciseLibrary,
  getAdminAlerts,
  getAccountRequests,
  getChatMessages,
  getClientDashboard,
  getClientVisiblePlan,
  getAssessmentSchedulesForUser,
  getCoachAlerts,
  getExerciseDetailForUser,
  ensureMonthlyPlanHasWorkouts,
  getProgressImagesForUser,
  getWorkoutDetailForUser,
  generateMonthlyPlanFromPlanOffering,
  loginBlockedMessage,
  markNotificationsRead,
  removeProfileImage,
  movementTests,
  resolveCoachAlert,
  safetyQuestions,
  saveAssessment,
  adminReviewAccountRequest,
  sendChatMessage,
  requestLockedAccount,
  proposeAssessmentSchedule,
  respondToAssessmentSchedule,
  saveDailyCheckIn,
  saveWeeklyCheckIn,
  searchExerciseLibrary,
  uploadProfileImage,
  uploadProgressImage,
  scoreColor,
  scoreGuide,
  submitPinResetRequest,
  updateClientSelfProfile,
  updateCoachSelfProfile,
  updateAdminSelfProfile,
  unreadNotificationCount,
  visibleClientsForUser,
  summarizeAssessment
} from "./logic.js";
import { blankAssessment, createStore } from "./data.js";
import { mealDemoLibrary, nutritionDemoStats } from "./meal-demo-data.js";

const STORE_STORAGE_KEY = "madKingSmartCoachStoreV1";
const store = loadSavedStore(createStore());
const today = "2026-05-29";
const nutritionDemoMealPool = buildExpandedNutritionDemoMealPool(mealDemoLibrary);
const nutritionMealCounts = nutritionDemoMealPool.reduce((counts, meal) => {
  counts[meal.mealType] = (counts[meal.mealType] || 0) + 1;
  return counts;
}, {});
const nutritionMealsByType = nutritionDemoMealPool.reduce((groups, meal) => {
  groups[meal.mealType] ||= [];
  groups[meal.mealType].push(meal);
  return groups;
}, {});
const nutritionCuisineList = [...new Set(nutritionDemoMealPool.map((meal) => meal.cuisine).filter(Boolean))].sort();
const state = {
  currentUser: null,
  loginRole: "Client",
  loginPin: "",
  signupOpen: false,
  forgotPinOpen: false,
  forgotPinError: "",
  forgotPinSuccess: "",
  forgotPin: {
    nameOrEmail: "",
    phone: "",
    note: ""
  },
  signupError: "",
  signupSuccess: "",
  supabaseBackupBusy: false,
  supabaseRestoreBusy: false,
  supabaseResetBusy: false,
  cloudSyncAttempted: false,
  nutritionDemo: {
    planLength: 7,
    goal: "Weight loss",
    dietaryNeed: "High Protein",
    allergy: "None",
    cuisine: "Any",
    budgetLevel: "Any",
    sex: "Female",
    heightInches: 66,
    currentWeightLb: 180,
    goalWeightLb: 160,
    activityLevel: "Moderately active",
    workoutDaysPerWeek: 3,
    averageWorkoutLength: 45,
    trainingType: "Boxing",
    mealsPerDay: 3,
    snacksPerDay: 1,
    prepTimePreference: "Any",
    foodDislikes: "",
    favoriteFoods: "",
    medicalFlags: "",
    calorieOverride: "",
    proteinOverride: "",
    carbsOverride: "",
    fatOverride: "",
    openDay: 1,
    dayModalOpen: false,
    recipeModal: null,
    generatedPlan: null
  },
  signup: {
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phone: "",
    accountType: "Client",
    pin: "",
    confirmPin: "",
    requestNote: "",
    goal: "",
    sportFocus: "Boxing",
    alreadyTrainsWithCoach: false,
    coachNameIfKnown: "",
    coachTitle: "",
    experience: "",
    coachRequestReason: "",
    emergencyContact: ""
  },
  accountRequestFilter: "Pending",
  adminDrafts: {
    client: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      goal: "",
      sportFocus: "Boxing",
      trainingDaysPerWeek: 3,
      sessionLength: 45,
      package: "Hybrid coaching",
      assignedCoach: "coach_1",
      startDate: today,
      status: "Active",
      notes: "",
      injuryRestrictionNotes: "",
      emergencyContact: ""
    },
    coach: {
      firstName: "",
      lastName: "",
      fullName: "",
      email: "",
      phone: "",
      specialty: "",
      bio: "",
      emergencyContact: "",
      status: "Active",
      pin: "1234",
      confirmPin: "1234",
      forcePinChange: true
    },
    exercise: {
      exerciseName: "",
      category: "Strength",
      sportFocus: "Boxing",
      goal: "Conditioning",
      difficulty: "Easy",
      trainingLevel: "Beginner",
      planLevel: "Beginner",
      sessionPart: "Strength",
      equipment: "Bodyweight",
      bodyArea: "Lower body",
      stressArea: "Knee",
      lowImpact: true,
      recoveryAlternative: true,
      sets: 2,
      reps: 8,
      time: "",
      rest: "60 sec",
      coachingCues: "",
      contraindications: "",
      videoUrl: ""
    },
    workout: {
      workoutName: "",
      description: "",
      sportFocus: "Boxing",
      goal: "Conditioning",
      trainingLevel: "Intermediate",
      planLevel: "Intermediate",
      difficulty: "Medium",
      sessionLength: 45,
      trainingDayType: "Day 1",
      workoutCategory: "Boxing",
      coachNotes: "",
      clientNotes: ""
    },
    workoutItem: {
      workoutTemplateId: "template_boxing_baseline",
      sessionPart: "Warm-Up",
      exerciseId: "marching",
      sets: "",
      reps: "",
      time: "5 min",
      rest: "60 sec",
      rounds: ""
    },
    planOffering: {
      planName: "",
      description: "",
      sportFocus: "Boxing",
      goal: "Conditioning",
      trainingLevel: "Intermediate",
      planLevel: "Intermediate",
      trainingDaysPerWeek: 3,
      sessionLength: 45,
      price: 249,
      sessionsIncluded: 12,
      packageType: "Hybrid coaching",
      workoutTemplateIds: ["template_boxing_baseline"]
    },
    package: {
      packageName: "",
      planOfferingId: "offering_boxing_3day",
      price: 249,
      sessionsIncluded: 12
    },
    assessmentTemplate: {
      templateName: "",
      sportFocus: "Boxing",
      goal: "Conditioning",
      movementTestIds: movementTests.map((test) => test.id)
    }
  },
  view: "home",
  adminPanel: "overview",
  syncStatus: "",
  planDraftNotice: "",
  nutritionAssignNotice: "",
  clientId: "client_ada",
  selectedWorkoutId: null,
  selectedExerciseId: null,
  selectedAssessmentTemplateId: "assessment_template_default",
  editModal: null,
  editModalDirty: false,
  clientEditTab: "Profile",
  exercisePopupMode: "view",
  exercisePopupTab: "Overview",
  exerciseLibraryFilters: {
    search: "",
    category: "All",
    sportFocus: "All",
    trainingLevel: "All",
    difficulty: "All",
    equipment: "",
    bodyArea: "",
    sessionPart: "All",
    status: "Active"
  },
  chatDraft: "",
  assessment: blankAssessment("client_ada", today),
  assessmentStep: 0,
  weekly: {
    checkInDate: today,
    clientId: "client_ada",
    weight: "",
    energyScore: 3,
    painScore: 1,
    sorenessScore: 2,
    sleepScore: 3,
    stressScore: 2,
    workoutCompleted: true,
    workoutCompletionPercent: 80,
    workoutDifficulty: "Medium",
    performanceScore: 3,
    notes: ""
  },
  daily: {
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
    }
  },
  progressDraft: {
    imageDate: today,
    imageCategory: "Front",
    clientNotes: ""
  },
  libraryFilters: {
    query: "",
    category: "",
    sportFocus: "",
    trainingLevel: "",
    equipment: "",
    bodyArea: "",
    recoveryAlternative: false
  }
};

let autoCloudBackupTimer = null;
let autoCloudBackupRunning = false;
let suppressAutomaticCloudBackup = false;
let lastCloudBackupFingerprint = "";
let lastCloudBackupId = "";
let cloudDataMonitorTimer = null;
let cloudDataMonitorRunning = false;
let liveChatSyncRunning = false;
let loginAccountRefreshTimer = null;
let loginInitialSyncStarted = false;
let lastShoppingListPrintAt = 0;

scheduleLegacyMealPlanCleanup();
const app = document.querySelector("#app");
render();
startLoginAccountAutoRefresh();
startLoggedInCloudDataMonitor();
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !state.currentUser) return;
  if (!hasOpenPopup()) return;
  closeOpenPopups();
  render();
});

function render() {
  saveStore();
  if (!state.currentUser) {
    app.innerHTML = loginPage();
    bindLogin();
    return;
  }
  const visibleClients = visibleClientsForUser(store, state.currentUser);
  if (state.currentUser.role === "Coach" && !visibleClients.length && !["home", "profile"].includes(state.view)) {
    state.view = "home";
  }
  if (!canUserAccessClient(store, state.currentUser, state.clientId)) {
    state.clientId = visibleClients[0]?.id || "";
  }
  app.innerHTML = `
    <header class="topbar">
      <div class="brand-lockup">
        <img class="brand-logo" src="./assets/mad-king-conditioning-logo.png" alt="Mad King Conditioning logo" />
        <div>
          <p class="eyebrow">Mad King Conditioning</p>
          <h1>A Royal Experience</h1>
        </div>
      </div>
      <div class="role-tabs">
        ${navTabs().map((tab) => tabButton(tab.id, tab.label)).join("")}
      </div>
      ${state.currentUser.role !== "Client" && visibleClients.length ? `
        <label class="global-client">Selected Client
          <select id="globalClientSelect">${visibleClients.map((clientOption) => `<option value="${clientOption.id}" ${clientOption.id === state.clientId ? "selected" : ""}>${clientOption.name}</option>`).join("")}</select>
        </label>
      ` : ""}
      <div class="user-chip">
        <strong>${state.currentUser.name}</strong>
        <span>${state.currentUser.role} / ${unreadNotificationCount(store, state.currentUser.id)} unread</span>
        <button id="logoutButton">Log Out</button>
      </div>
    </header>
    <main>${route()}</main>
    ${adminEditModal()}
    ${nutritionDayModal()}
    ${nutritionRecipeModal()}
  `;
  bindGlobal();
}

function closeOpenPopups() {
  state.editModal = null;
  state.editModalDirty = false;
  state.exercisePopupMode = "view";
  state.exercisePopupTab = "Overview";
  state.nutritionDemo.dayModalOpen = false;
  state.nutritionDemo.recipeModal = null;
}

function hasOpenPopup() {
  return Boolean(state.editModal || state.nutritionDemo.dayModalOpen || state.nutritionDemo.recipeModal);
}

function openClientMealPlanView() {
  closeOpenPopups();
  const client = clientForCurrentUser();
  if (client) state.clientId = client.id;
  state.view = "nutrition";
  state.nutritionAssignNotice = "";
}

function clientForCurrentUser() {
  if (state.currentUser?.role !== "Client") return selectedClient();
  return store.clients.find((client) => client.id === state.currentUser.linkedId)
    || store.clients.find((client) => client.email && state.currentUser.email && client.email.toLowerCase() === state.currentUser.email.toLowerCase())
    || store.clients.find((client) => client.phone && state.currentUser.phone && client.phone === state.currentUser.phone)
    || selectedClient();
}

function startLoginAccountAutoRefresh() {
  if (!loginInitialSyncStarted) {
    loginInitialSyncStarted = true;
    setTimeout(() => refreshLoginAccountsAutomatically(true), 250);
  }
  if (loginAccountRefreshTimer) return;
  loginAccountRefreshTimer = setInterval(() => refreshLoginAccountsAutomatically(false), 15000);
}

function startLoggedInCloudDataMonitor() {
  if (cloudDataMonitorTimer) return;
  cloudDataMonitorTimer = setInterval(() => checkCloudDataUpdates(), 3000);
}

async function refreshLoginAccountsAutomatically(showResult) {
  if (state.currentUser || state.supabaseRestoreBusy) return;
  const restored = await syncLatestCloudData(false);
  if (showResult) {
    state.syncStatus = restored
      ? "Accounts automatically updated from Supabase."
      : "Automatic account updates are on. Log in when your account has been approved.";
    render();
  }
}

function loadSavedStore(defaultStore) {
  try {
    const saved = window.localStorage?.getItem(STORE_STORAGE_KEY);
    if (!saved) return defaultStore;
    const parsed = JSON.parse(saved);
    return mergeStore(defaultStore, parsed);
  } catch (error) {
    console.warn("Could not load saved app data.", error);
    return defaultStore;
  }
}

function mergeStore(defaultStore, savedStore) {
  const merged = { ...defaultStore, ...savedStore };
  merged.settings = { ...defaultStore.settings, ...(savedStore.settings || {}) };
  merged.settings.supabaseUrl ||= defaultStore.settings.supabaseUrl;
  merged.settings.supabaseAnonKey ||= defaultStore.settings.supabaseAnonKey;
  merged.settings.supabaseBackupTable ||= defaultStore.settings.supabaseBackupTable;
  merged.adminPermissions = { ...(defaultStore.adminPermissions || {}), ...(savedStore.adminPermissions || {}) };
  ensureStoreListShape(merged);
  Object.keys(merged).forEach((key) => {
    if (Array.isArray(merged[key])) merged[key] = deduplicateRecords(merged[key]);
  });
  return merged;
}

function ensureStoreListShape(targetStore = store) {
  [
    "users", "clients", "coaches", "assessments", "assessmentSchedules", "weeklyCheckIns",
    "dailyCheckIns", "painCheckIns", "pinResetRequests", "progressImages", "coachAlerts",
    "mealPlans", "todayWorkoutAdjustments", "workoutCompletions", "chatMessages",
    "notifications", "inviteCodes", "adminAuditLog", "planOfferings", "packages",
    "workoutTemplates", "workoutTemplateItems", "monthlyPlans", "monthlyPlanItems",
    "exercises", "assessmentTemplates"
  ].forEach((key) => {
    if (!Array.isArray(targetStore[key])) targetStore[key] = [];
  });
  return targetStore;
}

function deduplicateRecords(records) {
  const unique = new Map();
  records.forEach((record, index) => {
    const id = record?.id || record?.assessmentId || record?.checkInId || record?.messageId;
    const fallback = JSON.stringify(record) || `record_${index}`;
    unique.set(String(id || fallback), record);
  });
  return [...unique.values()];
}

function saveStore() {
  try {
    window.localStorage?.setItem(STORE_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn("Could not save app data.", error);
  }
  scheduleAutomaticCloudBackup();
}

function replaceStoreWith(nextStore) {
  Object.keys(store).forEach((key) => delete store[key]);
  Object.assign(store, mergeStore(createStore(), nextStore));
  if (state.currentUser) {
    state.currentUser = store.users.find((user) => user.id === state.currentUser.id) || null;
  }
  if (!store.clients.some((client) => client.id === state.clientId)) {
    state.clientId = visibleClientsForUser(store, state.currentUser || store.users[0])[0]?.id || store.clients[0]?.id || "";
  }
  saveStore();
}

function exportAppData() {
  const payload = JSON.stringify(store, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `mad-king-coach-app-data-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  state.syncStatus = "App data export downloaded. Import that file on the other device to see the newest clients, coaches, packages, plans, chats, and check-ins.";
}

function importAppDataFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed.clients) || !Array.isArray(parsed.coaches) || !Array.isArray(parsed.users)) {
        throw new Error("Missing app data lists.");
      }
      replaceStoreWith(parsed);
      state.syncStatus = `Imported app data from ${file.name}. New clients and coaches from that file are now available on this device.`;
      render();
    } catch (error) {
      state.syncStatus = "That file could not be imported. Please choose an app data JSON export from this app.";
      render();
    }
  };
  reader.readAsText(file);
}

function backupPayload() {
  const backupSettings = {
    ...store.settings,
    supabaseAnonKey: "",
    supabaseUrl: "",
    supabaseBackupTable: store.settings.supabaseBackupTable || "smart_coach_backups"
  };
  const payload = {
    users: store.users,
    clients: store.clients,
    coaches: store.coaches,
    settings: [{ id: "app_settings", ...backupSettings }],
    adminPermissions: [{ id: "admin_permissions", ...(store.adminPermissions || {}) }],
    monthlyPlans: store.monthlyPlans || [],
    monthlyPlanItems: store.monthlyPlanItems || [],
    chatMessages: store.chatMessages || [],
    assessments: store.assessments || [],
    assessmentSchedules: store.assessmentSchedules || [],
    dailyCheckIns: store.dailyCheckIns || [],
    weeklyCheckIns: store.weeklyCheckIns || [],
    painCheckIns: store.painCheckIns || [],
    todayWorkoutAdjustments: store.todayWorkoutAdjustments || [],
    workoutCompletions: store.workoutCompletions || [],
    progressImages: store.progressImages || [],
    notifications: store.notifications || [],
    pinResetRequests: store.pinResetRequests || [],
    coachAlerts: store.coachAlerts || [],
    mealPlans: store.mealPlans || [],
    adminAuditLog: store.adminAuditLog || []
  };
  Object.keys(payload).forEach((key) => {
    if (Array.isArray(payload[key])) payload[key] = deduplicateRecords(payload[key]);
  });
  return payload;
}

function backupCollectionName(key) {
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function backupRecordId(item, fallback) {
  return String(item?.id || item?.assessmentId || item?.checkInId || item?.messageId || fallback).replace(/[^A-Za-z0-9_-]/g, "_");
}

function cleanBackupValue(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function normalizeSupabaseUrl(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/i, "");
}

function cloudBackupFingerprint() {
  return JSON.stringify(backupPayload());
}

function scheduleAutomaticCloudBackup() {
  if (
    suppressAutomaticCloudBackup ||
    !state.currentUser ||
    store.settings.automaticSupabaseBackup === false ||
    !normalizeSupabaseUrl(store.settings.supabaseUrl) ||
    !String(store.settings.supabaseAnonKey || "").trim()
  ) return;
  const fingerprint = cloudBackupFingerprint();
  if (fingerprint === lastCloudBackupFingerprint) return;
  clearTimeout(autoCloudBackupTimer);
  autoCloudBackupTimer = setTimeout(() => runAutomaticCloudBackup(fingerprint), 2500);
}

function canUseSupabaseBackup() {
  return store.settings.automaticSupabaseBackup !== false
    && Boolean(normalizeSupabaseUrl(store.settings.supabaseUrl))
    && Boolean(String(store.settings.supabaseAnonKey || "").trim());
}

async function runAutomaticCloudBackup(expectedFingerprint) {
  autoCloudBackupTimer = null;
  if (autoCloudBackupRunning || state.supabaseBackupBusy || state.supabaseRestoreBusy) {
    scheduleAutomaticCloudBackup();
    return;
  }
  const currentFingerprint = cloudBackupFingerprint();
  if (currentFingerprint === lastCloudBackupFingerprint) return;
  autoCloudBackupRunning = true;
  let saved = false;
  try {
    const result = await backupStoreToSupabase({
      url: store.settings.supabaseUrl,
      anonKey: store.settings.supabaseAnonKey,
      table: store.settings.supabaseBackupTable
    });
    lastCloudBackupFingerprint = currentFingerprint === expectedFingerprint ? expectedFingerprint : currentFingerprint;
    lastCloudBackupId = result.backupId;
    saved = true;
    state.syncStatus = `Automatically saved to Supabase at ${new Date().toLocaleTimeString()}. Backup ${result.backupId}.`;
  } catch (error) {
    state.syncStatus = String(error.message || "").includes("42501") || String(error.message || "").toLowerCase().includes("row-level security")
      ? "Automatic Supabase save is blocked by Row Level Security. Run the Setup SQL in Admin Data Sync."
      : `Automatic Supabase save failed: ${error.message}`;
  } finally {
    autoCloudBackupRunning = false;
    if (saved && cloudBackupFingerprint() !== lastCloudBackupFingerprint) scheduleAutomaticCloudBackup();
  }
}

async function backupPublicChangeToCloud() {
  if (!canUseSupabaseBackup() || state.supabaseBackupBusy || state.supabaseRestoreBusy) return;
  try {
    await runAutomaticCloudBackup(cloudBackupFingerprint());
  } catch (error) {
    console.warn("Could not save public change to Supabase.", error);
  }
}

async function upsertLiveSupabaseRecord(collectionName, recordId, data) {
  if (!canUseSupabaseBackup()) return false;
  const projectUrl = normalizeSupabaseUrl(store.settings.supabaseUrl);
  const key = String(store.settings.supabaseAnonKey || "").trim();
  const tableName = (store.settings.supabaseBackupTable || "smart_coach_backups").trim();
  const endpoint = `${projectUrl}/rest/v1/${encodeURIComponent(tableName)}?on_conflict=backup_id,collection_name,record_id`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      ...supabaseHeaders(key),
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify([{
      backup_id: "live",
      collection_name: collectionName,
      record_id: backupRecordId(data, recordId),
      data: cleanBackupValue(data)
    }])
  });
  if (!response.ok) throw new Error(await response.text() || `Supabase returned ${response.status}`);
  return true;
}

async function pushLiveChatMessage(message) {
  if (!message?.id) return false;
  try {
    await upsertLiveSupabaseRecord("chat_messages", message.id, message);
    return true;
  } catch (error) {
    console.warn("Could not save live chat message.", error);
    return false;
  }
}

async function pushLiveChatMessagesForClient(clientId) {
  const messages = (store.chatMessages || []).filter((message) => message.clientId === clientId);
  await Promise.all(messages.map((message) => pushLiveChatMessage(message)));
}

function ensureLiveChatNotification(message) {
  if (!state.currentUser || message.toUserId !== state.currentUser.id || (message.readBy || []).includes(state.currentUser.id)) return false;
  const notificationId = `notification_live_${message.id}_${state.currentUser.id}`;
  if ((store.notifications || []).some((item) => item.id === notificationId || (item.userId === state.currentUser.id && item.body === message.body && item.createdAt === message.createdAt))) return false;
  const sender = store.users.find((user) => user.id === message.fromUserId);
  store.notifications.push({
    id: notificationId,
    userId: state.currentUser.id,
    clientId: message.clientId,
    type: "Chat Message",
    title: `New message from ${sender?.name || "Chat"}`,
    body: message.body,
    read: false,
    createdAt: message.createdAt
  });
  return true;
}

async function syncLiveChatRecords() {
  if (!canUseSupabaseBackup() || state.supabaseRestoreBusy || liveChatSyncRunning) return false;
  liveChatSyncRunning = true;
  const projectUrl = normalizeSupabaseUrl(store.settings.supabaseUrl);
  const key = String(store.settings.supabaseAnonKey || "").trim();
  const tableName = (store.settings.supabaseBackupTable || "smart_coach_backups").trim();
  try {
    const endpoint = `${projectUrl}/rest/v1/${encodeURIComponent(tableName)}?backup_id=eq.live&collection_name=eq.chat_messages&select=record_id,data&order=id.asc`;
    const response = await supabaseFetchWithTimeout(endpoint, { headers: supabaseHeaders(key) }, 7000);
    if (!response.ok) throw new Error(await response.text() || `Supabase returned ${response.status}`);
    const rows = await response.json();
    let changed = false;
    rows.forEach((row) => {
      const message = row.data;
      if (!message?.id || !message.clientId) return;
      if (state.currentUser && !canUserAccessClient(store, state.currentUser, message.clientId)) return;
      const existingIndex = (store.chatMessages || []).findIndex((item) => item.id === message.id);
      if (existingIndex >= 0) {
        const existing = store.chatMessages[existingIndex];
        const mergedReadBy = [...new Set([...(existing.readBy || []), ...(message.readBy || [])])];
        const merged = { ...existing, ...message, readBy: mergedReadBy };
        if (JSON.stringify(existing) !== JSON.stringify(merged)) {
          store.chatMessages[existingIndex] = merged;
          changed = true;
        }
        changed = ensureLiveChatNotification(merged) || changed;
      } else {
        store.chatMessages.push(message);
        changed = true;
        changed = ensureLiveChatNotification(message) || changed;
      }
    });
    if (changed) {
      store.chatMessages = deduplicateRecords(store.chatMessages);
      try {
        window.localStorage?.setItem(STORE_STORAGE_KEY, JSON.stringify(store));
      } catch (error) {
        console.warn("Could not save live chat data locally.", error);
      }
    }
    return changed;
  } finally {
    liveChatSyncRunning = false;
  }
}

async function getLatestSupabaseBackupId({ url, anonKey, table }) {
  const projectUrl = normalizeSupabaseUrl(url);
  const key = (anonKey || "").trim();
  const tableName = (table || "smart_coach_backups").trim();
  if (!projectUrl || !key) return "";
  const endpoint = `${projectUrl}/rest/v1/${encodeURIComponent(tableName)}`;
  const response = await supabaseFetchWithTimeout(`${endpoint}?backup_id=eq.latest&collection_name=eq._backup_metadata&record_id=eq.latest&select=data&limit=1`, {
    headers: supabaseHeaders(key)
  }, 8000);
  if (!response.ok) throw new Error(await response.text() || `Supabase returned ${response.status}`);
  const rows = await response.json();
  return rows[0]?.data?.backupId || "";
}

async function checkCloudDataUpdates() {
  if (!state.currentUser || cloudDataMonitorRunning || autoCloudBackupRunning || state.supabaseBackupBusy || state.supabaseRestoreBusy || !canUseSupabaseBackup()) return;
  cloudDataMonitorRunning = true;
  try {
    const liveChatChanged = await syncLiveChatRecords();
    if (liveChatChanged && state.view === "chat") render();
    const currentFingerprint = cloudBackupFingerprint();
    if (currentFingerprint !== lastCloudBackupFingerprint) {
      await runAutomaticCloudBackup(currentFingerprint);
      return;
    }
    const latestBackupId = await getLatestSupabaseBackupId({
      url: store.settings.supabaseUrl,
      anonKey: store.settings.supabaseAnonKey,
      table: store.settings.supabaseBackupTable
    });
    if (latestBackupId && latestBackupId !== lastCloudBackupId) {
      const restored = await syncLatestCloudData(false);
      if (restored) {
        state.syncStatus = `Loaded newer Supabase data at ${new Date().toLocaleTimeString()}.`;
        render();
      }
    }
  } catch (error) {
    state.syncStatus = String(error.message || "").includes("42501") || String(error.message || "").toLowerCase().includes("row-level security")
      ? "Supabase sync is blocked by Row Level Security. Run the Setup SQL in Admin Data Sync."
      : String(error.message || "").includes("57014")
        ? "Supabase sync timed out because the backup table needs cleanup. Run the updated Setup SQL in Admin Data Sync, then click Backup to Supabase once."
      : `Supabase sync check failed: ${error.message}`;
  } finally {
    cloudDataMonitorRunning = false;
  }
}

function supabaseBackupRows() {
  const backupId = `backup_${new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 17)}`;
  const payload = backupPayload();
  const summary = Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, Array.isArray(value) ? value.length : 0]));
  const rows = [{
    backup_id: backupId,
    collection_name: "_backup_metadata",
    record_id: backupId,
    data: {
      backupId,
      appName: "Mad King Conditioning Smart Coach",
      createdAt: new Date().toISOString(),
      summary
    }
  }];
  for (const [key, items] of Object.entries(payload)) {
    if (!Array.isArray(items)) continue;
    const collectionName = backupCollectionName(key);
    for (let index = 0; index < items.length; index += 1) {
      const item = cleanBackupValue(items[index]);
      rows.push({
        backup_id: backupId,
        collection_name: collectionName,
        record_id: backupRecordId(item, `${key}_${index}`),
        data: item
      });
    }
  }
  rows.push({
    backup_id: "latest",
    collection_name: "_backup_metadata",
    record_id: "latest",
    data: {
      backupId,
      updatedAt: new Date().toISOString(),
      summary
    }
  });
  return { backupId, summary, rows };
}

async function backupStoreToSupabase({ url, anonKey, table }) {
  const projectUrl = normalizeSupabaseUrl(url);
  const key = (anonKey || "").trim();
  const tableName = (table || "smart_coach_backups").trim();
  if (!projectUrl || !key) throw new Error("Supabase URL and anon key are required.");
  if (!/^https:\/\/.+\.supabase\.co$/i.test(projectUrl)) throw new Error("Supabase URL should look like https://your-project.supabase.co.");
  const { backupId, summary, rows } = supabaseBackupRows();
  const endpoint = `${projectUrl}/rest/v1/${encodeURIComponent(tableName)}`;
  const chunkSize = 50;
  for (let index = 0; index < rows.length; index += chunkSize) {
    let response = await fetch(`${endpoint}?on_conflict=backup_id,collection_name,record_id`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(key),
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(rows.slice(index, index + chunkSize))
    });
    if (!response.ok && /unique|constraint|on_conflict|schema cache/i.test(await response.clone().text())) {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...supabaseHeaders(key),
          Prefer: "return=minimal"
        },
        body: JSON.stringify(rows.slice(index, index + chunkSize))
      });
    }
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Supabase returned ${response.status}`);
    }
  }
  return { backupId, summary, rowCount: rows.length };
}

async function resetSupabaseBackupTable({ url, anonKey, table }) {
  const projectUrl = normalizeSupabaseUrl(url);
  const key = (anonKey || "").trim();
  const tableName = (table || "smart_coach_backups").trim();
  if (!projectUrl || !key) throw new Error("Supabase URL and publishable key are required.");
  if (!/^https:\/\/.+\.supabase\.co$/i.test(projectUrl)) throw new Error("Supabase URL should look like https://your-project.supabase.co.");
  const endpoint = `${projectUrl}/rest/v1/${encodeURIComponent(tableName)}?id=gte.0`;
  const response = await supabaseFetchWithTimeout(endpoint, {
    method: "DELETE",
    headers: {
      ...supabaseHeaders(key),
      Prefer: "return=minimal"
    }
  }, 12000);
  if (!response.ok) throw new Error(await response.text() || `Supabase returned ${response.status}`);
  lastCloudBackupFingerprint = "";
  lastCloudBackupId = "";
  return true;
}

async function checkSupabaseBackupStatus({ url, anonKey, table }) {
  const projectUrl = normalizeSupabaseUrl(url);
  const key = (anonKey || "").trim();
  const tableName = (table || "smart_coach_backups").trim();
  if (!projectUrl || !key) throw new Error("Supabase URL and publishable key are required.");
  const response = await supabaseFetchWithTimeout(`${projectUrl}/rest/v1/${encodeURIComponent(tableName)}?backup_id=eq.latest&collection_name=eq._backup_metadata&record_id=eq.latest&select=backup_id,collection_name,created_at,data&limit=1`, {
    headers: supabaseHeaders(key)
  }, 8000);
  if (!response.ok) throw new Error(await response.text() || `Supabase returned ${response.status}`);
  const rows = await response.json();
  return { rowCount: rows.length ? 1 : 0, latest: rows[0] || null };
}

async function supabaseFetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("Supabase request timed out. Run the updated Setup SQL, then click Backup to Supabase once from the device that has the newest data.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function supabaseHeaders(key) {
  const headers = {
    apikey: key,
    "Content-Type": "application/json"
  };
  // Legacy anon keys are JWTs and can be used as Bearer tokens. New
  // sb_publishable_ keys belong only in the apikey header.
  if (key.split(".").length === 3) headers.Authorization = `Bearer ${key}`;
  return headers;
}

function storeKeyForBackupCollection(collectionName) {
  const map = {
    users: "users",
    clients: "clients",
    coaches: "coaches",
    settings: "settings",
    admin_permissions: "adminPermissions",
    exercises: "exercises",
    workout_templates: "workoutTemplates",
    workout_template_items: "workoutTemplateItems",
    plan_offerings: "planOfferings",
    packages: "packages",
    plan_templates: "planTemplates",
    assessment_templates: "assessmentTemplates",
    monthly_plans: "monthlyPlans",
    monthly_plan_items: "monthlyPlanItems",
    chat_messages: "chatMessages",
    assessments: "assessments",
    assessment_schedules: "assessmentSchedules",
    daily_check_ins: "dailyCheckIns",
    weekly_check_ins: "weeklyCheckIns",
    pain_check_ins: "painCheckIns",
    today_workout_adjustments: "todayWorkoutAdjustments",
    workout_completions: "workoutCompletions",
    progress_images: "progressImages",
    notifications: "notifications",
    pin_reset_requests: "pinResetRequests",
    coach_alerts: "coachAlerts",
    meal_plans: "mealPlans",
    admin_audit_log: "adminAuditLog"
  };
  return map[collectionName] || null;
}

async function restoreLatestFromSupabase({ url, anonKey, table }) {
  const projectUrl = normalizeSupabaseUrl(url);
  const key = (anonKey || "").trim();
  const tableName = (table || "smart_coach_backups").trim();
  if (!projectUrl || !key) throw new Error("Supabase URL and publishable key are required.");
  const endpoint = `${projectUrl}/rest/v1/${encodeURIComponent(tableName)}`;
  const latestResponse = await supabaseFetchWithTimeout(`${endpoint}?backup_id=eq.latest&collection_name=eq._backup_metadata&record_id=eq.latest&select=data&limit=1`, {
    headers: supabaseHeaders(key)
  }, 8000);
  if (!latestResponse.ok) throw new Error(await latestResponse.text() || `Supabase returned ${latestResponse.status}`);
  const latestRows = await latestResponse.json();
  const backupId = latestRows[0]?.data?.backupId;
  if (!backupId) return { restored: false, reason: "No cloud backup exists yet." };
  const rows = [];
  const pageSize = 1000;
  for (let start = 0; ; start += pageSize) {
    const rowsResponse = await supabaseFetchWithTimeout(`${endpoint}?backup_id=eq.${encodeURIComponent(backupId)}&select=collection_name,record_id,data&order=id.asc`, {
      headers: { ...supabaseHeaders(key), Range: `${start}-${start + pageSize - 1}` }
    }, 10000);
    if (!rowsResponse.ok) throw new Error(await rowsResponse.text() || `Supabase returned ${rowsResponse.status}`);
    const page = await rowsResponse.json();
    rows.push(...page);
    if (page.length < pageSize) break;
  }
  const cloudStore = {};
  const uniqueCloudRows = new Map();
  rows.forEach((row) => {
    uniqueCloudRows.set(`${row.collection_name}:${row.record_id}`, row);
  });
  const duplicateRowsRemoved = rows.length - uniqueCloudRows.size;
  uniqueCloudRows.forEach((row) => {
    const keyName = storeKeyForBackupCollection(row.collection_name);
    if (!keyName) return;
    cloudStore[keyName] ||= [];
    cloudStore[keyName].push(row.data);
  });
  Object.keys(cloudStore).forEach((keyName) => {
    if (Array.isArray(cloudStore[keyName])) cloudStore[keyName] = deduplicateRecords(cloudStore[keyName]);
  });
  if (!cloudStore.users?.length) throw new Error("The latest backup does not contain user accounts.");
  if (cloudStore.settings?.[0]) {
    cloudStore.settings = {
      ...cloudStore.settings[0],
      supabaseUrl: store.settings.supabaseUrl,
      supabaseAnonKey: store.settings.supabaseAnonKey,
      supabaseBackupTable: store.settings.supabaseBackupTable
    };
    delete cloudStore.settings.id;
  }
  if (cloudStore.adminPermissions?.[0]) {
    cloudStore.adminPermissions = { ...cloudStore.adminPermissions[0] };
    delete cloudStore.adminPermissions.id;
  }
  suppressAutomaticCloudBackup = true;
  try {
    replaceStoreWith({ ...store, ...cloudStore });
  } finally {
    suppressAutomaticCloudBackup = false;
  }
  lastCloudBackupFingerprint = duplicateRowsRemoved ? "" : cloudBackupFingerprint();
  lastCloudBackupId = backupId;
  if (duplicateRowsRemoved) scheduleAutomaticCloudBackup();
  return {
    restored: true,
    backupId,
    duplicateRowsRemoved,
    counts: Object.fromEntries(Object.entries(cloudStore).map(([name, items]) => [name, items.length]))
  };
}

async function syncLatestCloudData(showStatus = true) {
  if (state.supabaseRestoreBusy) return false;
  state.supabaseRestoreBusy = true;
  if (showStatus) {
    state.syncStatus = "Checking Supabase for the newest app data...";
    render();
  }
  try {
    const result = await restoreLatestFromSupabase({
      url: store.settings.supabaseUrl,
      anonKey: store.settings.supabaseAnonKey,
      table: store.settings.supabaseBackupTable
    });
    state.cloudSyncAttempted = true;
    if (showStatus) {
      state.syncStatus = result.restored
        ? `Loaded latest Supabase coaching backup ${result.backupId}.${result.duplicateRowsRemoved ? ` Removed ${result.duplicateRowsRemoved} duplicate cloud records and queued a clean backup.` : " Profiles, chats, assessments, check-ins, and client plan records are now available on this device."}`
        : result.reason;
      render();
    }
    return result.restored;
  } catch (error) {
    state.cloudSyncAttempted = true;
    if (showStatus) {
      state.syncStatus = String(error.message || "").includes("57014")
        ? "Could not load Supabase data because the backup table timed out. Run the updated Setup SQL in Admin Data Sync, then click Backup to Supabase once."
        : `Could not load Supabase data: ${error.message}`;
    }
    return false;
  } finally {
    state.supabaseRestoreBusy = false;
    if (showStatus) render();
  }
}

function supabaseSetupSql(tableName = "smart_coach_backups") {
  const safeTable = String(tableName || "smart_coach_backups").replace(/[^a-zA-Z0-9_]/g, "") || "smart_coach_backups";
  return `create table if not exists public.${safeTable} (
  id bigint generated by default as identity primary key,
  backup_id text not null,
  collection_name text not null,
  record_id text not null,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists ${safeTable}_backup_id_idx on public.${safeTable} (backup_id);
create index if not exists ${safeTable}_collection_idx on public.${safeTable} (collection_name);
create index if not exists ${safeTable}_lookup_idx on public.${safeTable} (backup_id, collection_name, record_id);

-- Remove duplicate backup rows before adding the unique rule.
-- Keeps the newest row for each backup/collection/record.
delete from public.${safeTable} a
using public.${safeTable} b
where a.backup_id = b.backup_id
  and a.collection_name = b.collection_name
  and a.record_id = b.record_id
  and a.id < b.id;

create unique index if not exists ${safeTable}_record_unique_idx
on public.${safeTable} (backup_id, collection_name, record_id);

-- Setup mode only. Tighten this before using real client data.
alter table public.${safeTable} disable row level security;

grant select, insert, update, delete on table public.${safeTable} to anon, authenticated;
grant usage, select on sequence public.${safeTable}_id_seq to anon, authenticated;`;
}

function supabaseEraseSql(tableName = "smart_coach_backups") {
  const safeTable = String(tableName || "smart_coach_backups").replace(/[^a-zA-Z0-9_]/g, "") || "smart_coach_backups";
  return `-- This erases the old Supabase backup rows so you can start fresh.
-- Run this once, then return to the app and click Backup to Supabase.
truncate table public.${safeTable} restart identity;`;
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function route() {
  if (state.view === "chat") return chatPage();
  if (state.view === "profile") return profilePage();
  if (state.view === "assessment") return assessmentPage();
  if (state.view === "schedule") return schedulePage();
  if (state.view === "weekly") return weeklyPage();
  if (state.view === "plan") return monthlyPlanPage();
  if (state.view === "library") return exerciseLibraryPage();
  if (state.view === "client") return clientDashboard();
  if (state.view === "workoutDetail") return workoutDetailPage();
  if (state.view === "exerciseDetail") return exerciseDetailPage();
  if (state.view === "alerts") return coachAlertsView();
  if (state.view === "nutrition") return nutritionPlannerPage();
  if (state.view === "admin") return adminView();
  return homeDashboard();
}

function tabButton(id, label) {
  const badge = id === "chat" && unreadNotificationCount(store, state.currentUser.id) ? `<span class="nav-badge">${unreadNotificationCount(store, state.currentUser.id)}</span>` : "";
  if (state.currentUser?.role === "Client" && id === "nutrition") {
    return `<button class="tab ${state.view === id ? "active" : ""}" data-view="nutrition" data-open-client-meal-plan>${label}${badge}</button>`;
  }
  return `<button class="tab ${state.view === id ? "active" : ""}" data-view="${id}">${label}${badge}</button>`;
}

function navTabs() {
  const shared = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "plan", label: "Monthly Plan" },
    { id: "schedule", label: "Scheduling" },
    { id: "chat", label: "Chat" }
  ];
  if (state.currentUser.role === "Client") return [...shared, { id: "nutrition", label: "Meal Plan" }, { id: "weekly", label: "Weekly Check-In" }, { id: "client", label: "Client View" }];
  if (state.currentUser.role === "Coach") {
    return [
      ...shared,
      { id: "assessment", label: "Assessment" },
      { id: "library", label: "Exercise Library" },
      { id: "nutrition", label: "Meal Planner" },
      { id: "alerts", label: "Coach Alerts" }
    ];
  }
  return [
    ...shared,
    { id: "assessment", label: "Assessment" },
    { id: "library", label: "Exercise Library" },
    { id: "nutrition", label: "Meal Planner" },
    { id: "alerts", label: "Coach Alerts" },
    { id: "admin", label: "Admin Control" }
  ];
}

function loginPage() {
  return `
    <main class="login-shell">
      <section class="login-card">
        <img class="login-logo" src="./assets/mad-king-conditioning-logo.png" alt="Mad King Conditioning logo" />
        <div>
          <p class="eyebrow">A Royal Experience</p>
          <h1>${state.signupOpen ? "Create Account Request" : state.forgotPinOpen ? "Forgot PIN" : "Log in with your numeric PIN"}</h1>
          ${state.signupOpen ? `<p class="muted">Your account will stay locked until Admin reviews and unlocks it.</p>` : state.forgotPinOpen ? `<p class="muted">Tell Admin who you are so they can reset your PIN and send it by email or text.</p>` : ""}
        </div>
        ${state.signupOpen ? signupForm() : state.forgotPinOpen ? forgotPinForm() : `
          <label>Account type
            <select id="loginRole">
              ${["Client", "Coach", "Admin"].map((role) => `<option ${state.loginRole === role ? "selected" : ""}>${role}</option>`).join("")}
            </select>
          </label>
          <label>Numeric password / PIN
            <input id="loginPin" inputmode="numeric" pattern="[0-9]*" type="password" value="${state.loginPin}" placeholder="1234" />
          </label>
          <button class="primary full" id="loginButton">Log In</button>
          <div class="login-links">
            <button class="ghost" id="forgotPinButton">Forgot PIN</button>
            <button class="success" id="openSignupButton">Create Account</button>
          </div>
          <p class="login-error" id="loginError"></p>
          <p class="login-success">${state.syncStatus}</p>
          <p class="login-success">${state.signupSuccess}</p>
        `}
      </section>
    </main>
  `;
}

function forgotPinForm() {
  return `
    <label>Name or email <input data-forgot-pin-field="nameOrEmail" value="${state.forgotPin.nameOrEmail}" placeholder="Name or email" /></label>
    <label>Phone number <input data-forgot-pin-field="phone" value="${state.forgotPin.phone}" placeholder="Phone number" /></label>
    <label>Note optional <textarea data-forgot-pin-field="note" placeholder="Anything Admin should know">${state.forgotPin.note}</textarea></label>
    <button class="primary full" id="submitForgotPinRequest">Send Reset Request To Admin</button>
    <button class="ghost full" id="backFromForgotPin">Back to Login</button>
    <p class="login-error">${state.forgotPinError}</p>
    <p class="login-success">${state.forgotPinSuccess}</p>
  `;
}

function signupForm() {
  return `
    <div class="signup-choice">
      <button class="${state.signup.accountType === "Client" ? "active" : ""}" data-signup-type="Client">Request Client Account</button>
      <button class="${state.signup.accountType === "Coach" ? "active" : ""}" data-signup-type="Coach">Request Coach Account</button>
    </div>
    <p class="muted">${state.signup.accountType === "Coach" ? "Coach accounts stay locked until Admin approves permissions." : "Client accounts stay locked until Admin approves and connects the profile."}</p>
    <label>First name <input data-signup-field="firstName" value="${state.signup.firstName}" /></label>
    <label>Last name <input data-signup-field="lastName" value="${state.signup.lastName}" /></label>
    <label>Full name <input data-signup-field="fullName" value="${state.signup.fullName}" /></label>
    <label>Email <input data-signup-field="email" value="${state.signup.email}" /></label>
    <label>Phone number <input data-signup-field="phone" value="${state.signup.phone}" /></label>
    ${state.signup.accountType === "Client" ? `
      <label>Goal <input data-signup-field="goal" value="${state.signup.goal}" /></label>
      <label>Preferred sport focus
        <select data-signup-field="sportFocus">${["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "General Fitness"].map((item) => `<option value="${item}" ${state.signup.sportFocus === item ? "selected" : ""}>${item}</option>`).join("")}</select>
      </label>
      <label><input class="inline-check" data-signup-check="alreadyTrainsWithCoach" type="checkbox" ${state.signup.alreadyTrainsWithCoach ? "checked" : ""} /> I already train with a coach</label>
      <label>Coach name if known <input data-signup-field="coachNameIfKnown" value="${state.signup.coachNameIfKnown}" /></label>
    ` : `
      <label>Coach title / specialty <input data-signup-field="coachTitle" value="${state.signup.coachTitle}" /></label>
      <label>Emergency contact <input data-signup-field="emergencyContact" value="${state.signup.emergencyContact}" placeholder="Name / phone" /></label>
      <label>Experience <textarea data-signup-field="experience">${state.signup.experience}</textarea></label>
      <label>Reason for coach access <textarea data-signup-field="coachRequestReason">${state.signup.coachRequestReason}</textarea></label>
    `}
    <label>Short note / reason optional <textarea data-signup-field="requestNote">${state.signup.requestNote}</textarea></label>
    <label>Create numeric PIN <input data-signup-field="pin" inputmode="numeric" type="password" value="${state.signup.pin}" placeholder="4 digits" /></label>
    <label>Confirm numeric PIN <input data-signup-field="confirmPin" inputmode="numeric" type="password" value="${state.signup.confirmPin}" /></label>
    <button class="primary full" id="createLoginButton">Submit Account Request</button>
    <button class="ghost full" id="backToLoginButton">Back to Login</button>
    <p class="login-error">${state.signupError}</p>
    <p class="login-success">${state.signupSuccess}</p>
  `;
}

function homeDashboard() {
  const client = selectedClient();
  if (!client && state.currentUser.role === "Coach") {
    return `
      <section class="workspace">
        <div class="section-head">
          <div>
            <p class="eyebrow">Smart Coach Dashboard</p>
            <h2>${escapeHtml(state.currentUser.name)}</h2>
          </div>
        </div>
        <article class="card empty-state-card">
          <h3>No client has been assigned yet.</h3>
          <p class="muted">Admin will assign clients to your coach account. Your assigned client dashboard will appear here afterward.</p>
          <button class="primary" data-view="profile">View My Coach Profile</button>
        </article>
      </section>
    `;
  }
  if (!client) return `<section class="workspace"><div class="empty">No client is currently available.</div></section>`;
  const latestAssessment = latestClientAssessment(client.id) || summarizeAssessment(state.assessment);
  const plan = getClientVisiblePlan(store, client.id);
  const nextReassessment = nextReassessmentDate(client.lastAssessmentDate || today);
  const checkIns = store.weeklyCheckIns.filter((item) => item.clientId === client.id);
  const lastCheckIn = checkIns.at(-1);
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">Smart Coach Dashboard</p>
          <h2>${client.name}</h2>
          <p class="muted">${client.goal}</p>
        </div>
        <button class="primary" data-view="assessment">Start Assessment</button>
      </div>
      <div class="grid-4 stat-strip">
        ${infoCard("Sport / training goal", client.sportFocus)}
        ${infoCard("Package / session type", client.packageType)}
        ${infoCard("Current assessment score", latestAssessment.averageCapabilityScore)}
        ${infoCard("Risk level", latestAssessment.riskLevel)}
        ${infoCard("Next reassessment", nextReassessment)}
        ${infoCard("Monthly plan status", plan ? `${plan.status} / ${plan.trainingLevel || plan.planLevel}` : "No active approved plan")}
        ${infoCard("Weekly check-in", lastCheckIn?.checkInResult || client.lastWeeklyCheckInResult || "None yet")}
        ${infoCard("Training schedule", `${client.trainingDaysPerWeek} days / ${client.sessionLength} min`)}
      </div>
      <div class="dashboard-grid">
        ${state.currentUser.role === "Client" ? "" : smartDecisionPanel(client, latestAssessment, lastCheckIn)}
        ${todayPreviewPanel(client)}
        ${approvedAppointmentsPanel(client)}
        ${assessmentSchedulePanel(client)}
        ${quickLinksPanel()}
      </div>
    </section>
  `;
}

function profilePage() {
  if (state.currentUser.role === "Coach") return coachProfilePage();
  if (state.currentUser.role === "Admin") return adminProfilePage();
  const client = selectedClient();
  const profileUser = userForProfile(client);
  const progressImages = getProgressImagesForUser(store, state.currentUser, client.id);
  const assignedCoach = store.coaches.find((coach) => coach.id === client.coachId);
  const ownCoach = state.currentUser.role === "Coach" ? store.coaches.find((coach) => coach.id === state.currentUser.linkedId) : null;
  return `
    <section class="workspace">
      <div class="section-head">
        <div><p class="eyebrow">Client Profile</p><h2>${client.name}</h2></div>
        <span class="badge green">${client.packageType}</span>
      </div>
      ${client.profileLocked ? `<article class="card locked">Your profile is locked. Contact Admin to request changes.</article>` : ""}
      ${profileImagePanel(profileUser, client)}
      <div class="grid-3 stat-strip">
        ${infoCard("Age", client.age)}
        ${infoCard("Height", formatClientHeight(client))}
        ${infoCard("Current weight", formatClientWeight(client.currentWeightLb || client.weight))}
        ${infoCard("Goal", client.goal)}
        ${infoCard("Sport focus", client.sportFocus)}
        ${infoCard("Training days", `${client.trainingDaysPerWeek} per week`)}
        ${infoCard("Session length", `${client.sessionLength} min`)}
        ${infoCard("Start date", client.startDate)}
      </div>
      <div class="split">
        ${clientProgramSummaryPanel(client)}
        ${clientSafetyInfoPanel(client)}
        ${state.currentUser.role !== "Client" ? `<article class="card"><h3>Assigned coach emergency contact</h3><p>${assignedCoach?.emergencyContact || "No coach emergency contact saved."}</p></article>` : ""}
        <article class="card"><h3>Equipment available</h3>${chipSection("Available", client.equipmentAvailable)}</article>
        <article class="card"><h3>Progress notes</h3><p>${client.progressNotes}</p></article>
        ${ownCoach ? `<article class="card"><h3>My coach profile emergency contact</h3><p>${ownCoach.emergencyContact || "No emergency contact saved."}</p></article>` : ""}
      </div>
      ${progressImagePanel(client, progressImages)}
    </section>
  `;
}

function adminProfilePage() {
  const profile = store.coaches.find((item) => item.id === state.currentUser.linkedId)
    || { id: state.currentUser.linkedId || state.currentUser.id, name: state.currentUser.name, role: "Admin" };
  return `
    <section class="workspace">
      <div class="section-head">
        <div><p class="eyebrow">Admin Profile</p><h2>${escapeHtml(profile.name || state.currentUser.name)}</h2></div>
        <span class="badge green">Admin</span>
      </div>
      ${personalProfileImagePanel(state.currentUser, profile, "Admin")}
      <article class="card">
        <h3>My Admin Information</h3>
        <p class="muted">Update your personal Admin profile, contact information, emergency contact, and 4-digit PIN.</p>
        <div class="form-grid">
          <label>Name <input id="adminSelfName" value="${escapeHtml(profile.name || state.currentUser.name || "")}" /></label>
          <label>Email <input id="adminSelfEmail" value="${escapeHtml(state.currentUser.email || profile.email || "")}" /></label>
          <label>Phone number <input id="adminSelfPhone" value="${escapeHtml(state.currentUser.phone || profile.phone || "")}" /></label>
          <label>Title <input id="adminSelfTitle" value="${escapeHtml(profile.title || "Administrator")}" /></label>
          <label class="wide">Emergency contact <input id="adminSelfEmergencyContact" value="${escapeHtml(profile.emergencyContact || "")}" placeholder="Name / phone" /></label>
        </div>
        <label>About me <textarea id="adminSelfBio" placeholder="Admin bio and business role">${escapeHtml(profile.bio || "")}</textarea></label>
        <div class="form-grid">
          <label>New 4-digit PIN <input id="adminSelfNewPin" inputmode="numeric" maxlength="4" type="password" placeholder="Leave blank to keep current PIN" /></label>
          <label>Confirm new PIN <input id="adminSelfConfirmPin" inputmode="numeric" maxlength="4" type="password" /></label>
        </div>
        <button class="primary" id="saveAdminSelfProfile">Save My Admin Profile</button>
      </article>
    </section>
  `;
}

function coachProfilePage() {
  const coach = store.coaches.find((item) => item.id === state.currentUser.linkedId);
  if (!coach) return `<section class="workspace"><div class="empty">Coach profile not found. Contact Admin.</div></section>`;
  const profileLocked = Boolean(coach.profileLocked || state.currentUser.profileLocked);
  return `
    <section class="workspace">
      <div class="section-head">
        <div><p class="eyebrow">Coach Profile</p><h2>${escapeHtml(coach.name || state.currentUser.name)}</h2></div>
        <span class="badge green">Coach</span>
      </div>
      ${profileLocked ? `<article class="card locked">Your profile is locked. Contact Admin to unlock profile editing.</article>` : ""}
      ${coachProfileImagePanel(state.currentUser, coach, !profileLocked)}
      <article class="card ${profileLocked ? "locked" : ""}">
        <h3>My Coach Information</h3>
        <p class="muted">Update your personal coach profile, contact information, emergency contact, and 4-digit PIN.</p>
        <div class="form-grid">
          <label>Name <input id="coachSelfName" value="${escapeHtml(coach.name || state.currentUser.name || "")}" ${profileLocked ? "disabled" : ""} /></label>
          <label>Email <input id="coachSelfEmail" value="${escapeHtml(state.currentUser.email || coach.email || "")}" ${profileLocked ? "disabled" : ""} /></label>
          <label>Phone number <input id="coachSelfPhone" value="${escapeHtml(state.currentUser.phone || coach.phone || "")}" ${profileLocked ? "disabled" : ""} /></label>
          <label>Specialty <input id="coachSelfSpecialty" value="${escapeHtml(coach.specialty || "")}" placeholder="Boxing, strength, conditioning..." ${profileLocked ? "disabled" : ""} /></label>
          <label class="wide">Emergency contact <input id="coachSelfEmergencyContact" value="${escapeHtml(coach.emergencyContact || "")}" placeholder="Name / phone" ${profileLocked ? "disabled" : ""} /></label>
        </div>
        <label>About me <textarea id="coachSelfBio" placeholder="Coach bio, experience, and training approach" ${profileLocked ? "disabled" : ""}>${escapeHtml(coach.bio || "")}</textarea></label>
        <div class="form-grid">
          <label>New 4-digit PIN <input id="coachSelfNewPin" inputmode="numeric" maxlength="4" type="password" placeholder="Leave blank to keep current PIN" ${profileLocked ? "disabled" : ""} /></label>
          <label>Confirm new PIN <input id="coachSelfConfirmPin" inputmode="numeric" maxlength="4" type="password" ${profileLocked ? "disabled" : ""} /></label>
        </div>
        ${profileLocked ? "" : `<button class="primary" id="saveCoachSelfProfile">Save My Coach Profile</button>`}
      </article>
    </section>
  `;
}

function coachProfileImagePanel(profileUser, coach, canEdit = true) {
  return personalProfileImagePanel(profileUser, coach, "Coach", canEdit);
}

function personalProfileImagePanel(profileUser, profile, roleLabel, canEdit = true) {
  return `
    <article class="card profile-image-card">
      ${avatar(profileUser.profileImageUrl || profile.profileImageUrl, profile.name, "large")}
      <div>
        <p class="eyebrow">${roleLabel} profile image</p>
        <h3>${escapeHtml(profile.name)}</h3>
        <p class="muted">${profileUser.profileImageUploadedAt ? `Uploaded ${new Date(profileUser.profileImageUploadedAt).toLocaleDateString()}` : "Default avatar is showing."}</p>
        ${canEdit ? `<div class="image-controls">
          <input id="profileImageInput" type="file" accept="image/jpeg,image/png,image/webp" />
          <button class="primary" id="uploadProfileImageButton">${profileUser.profileImageUrl ? "Change Profile Image" : "Upload Profile Image"}</button>
          <button class="ghost" id="removeProfileImageButton">Remove Profile Image</button>
        </div>` : `<p class="muted">Admin must unlock your profile before you can change this image.</p>`}
      </div>
    </article>
  `;
}

function clientSafetyInfoPanel(client) {
  if (state.currentUser.role === "Client") {
    return `
      <article class="card">
        <h3>My editable profile info</h3>
        <p class="muted">You can update these personal details. Coach, package, training level, workouts, and assessments stay controlled by Admin or coach.</p>
        <div class="form-grid">
          <label>Email <input id="clientEmail" value="${escapeHtml(client.email || "")}" /></label>
          <label>Phone number <input id="clientPhone" value="${escapeHtml(client.phone || "")}" /></label>
          <label>Age <input id="clientAge" type="number" min="0" max="120" value="${escapeHtml(client.age || "")}" /></label>
          <label>Sex <select id="clientSex">
            ${["Female", "Male", "Prefer not to say"].map((option) => `<option value="${option}" ${String(client.sex || "") === option ? "selected" : ""}>${option}</option>`).join("")}
          </select></label>
          <label>Height in inches <input id="clientHeightInches" type="number" min="24" max="96" value="${escapeHtml(client.heightInches || "")}" placeholder="Example: 66" /></label>
          <label>Current weight lb <input id="clientCurrentWeight" type="number" min="0" max="800" value="${escapeHtml(client.currentWeightLb || client.weight || "")}" /></label>
          <label>Goal weight lb <input id="clientGoalWeight" type="number" min="0" max="800" value="${escapeHtml(client.goalWeightLb || "")}" /></label>
          <label>Goal <input id="clientGoal" value="${escapeHtml(client.goal || "")}" /></label>
        </div>
        <label>Medical problems / health conditions <textarea id="clientMedicalProblems">${escapeHtml(client.medicalProblems || client.medicalConditions || "")}</textarea></label>
        <label>Medications or medical notes <textarea id="clientMedications">${escapeHtml(client.medications || "")}</textarea></label>
        <label>Allergies <textarea id="clientAllergies">${escapeHtml(client.allergies || "")}</textarea></label>
        <label>Doctor restrictions or clearance notes <textarea id="clientMedicalRestrictions">${escapeHtml(client.medicalRestrictions || "")}</textarea></label>
        <label>Injury notes <textarea id="clientInjuryNotes">${escapeHtml(client.injuryNotes || "")}</textarea></label>
        <label>Emergency contact <input id="clientEmergencyContact" value="${escapeHtml(client.emergencyContact || "")}" placeholder="Name / phone" /></label>
        <div class="form-grid">
          <label>New 4-digit PIN <input id="clientNewPin" inputmode="numeric" maxlength="4" type="password" placeholder="Leave blank to keep current PIN" /></label>
          <label>Confirm new PIN <input id="clientConfirmPin" inputmode="numeric" maxlength="4" type="password" /></label>
        </div>
        <button class="primary" id="saveClientSafetyInfo">Save My Profile Info</button>
      </article>
    `;
  }
  return `
    <article class="card">
      <h3>Health details</h3>
      <div class="detail-grid">
        <p><strong>Age:</strong> ${escapeHtml(client.age || "Not saved")}</p>
        <p><strong>Sex:</strong> ${escapeHtml(client.sex || "Not saved")}</p>
        <p><strong>Height:</strong> ${escapeHtml(formatClientHeight(client))}</p>
        <p><strong>Current weight:</strong> ${escapeHtml(formatClientWeight(client.currentWeightLb || client.weight))}</p>
        <p><strong>Goal weight:</strong> ${escapeHtml(formatClientWeight(client.goalWeightLb))}</p>
        <p><strong>Medical problems:</strong> ${escapeHtml(client.medicalProblems || client.medicalConditions || "None saved")}</p>
        <p><strong>Medications:</strong> ${escapeHtml(client.medications || "None saved")}</p>
        <p><strong>Allergies:</strong> ${escapeHtml(client.allergies || "None saved")}</p>
        <p><strong>Medical restrictions:</strong> ${escapeHtml(client.medicalRestrictions || "None saved")}</p>
      </div>
    </article>
    <article class="card"><h3>Injury notes</h3><p>${client.injuryNotes || "No injury notes saved."}</p></article>
    <article class="card"><h3>Client emergency contact</h3><p>${client.emergencyContact || "No emergency contact saved."}</p></article>
  `;
}

function formatClientHeight(client) {
  const inches = Number(client?.heightInches || 0);
  if (!inches) return "Not saved";
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
}

function formatClientWeight(value) {
  const weight = Number(value || 0);
  return weight ? `${weight} lb` : "Not saved";
}

function clientProgramSummaryPanel(client) {
  const pkg = store.packages.find((item) => item.id === client.packageId || item.packageName === client.packageType);
  const offering = store.planOfferings.find((item) => item.id === client.planOfferingId || item.id === pkg?.planOfferingId);
  const activePlan = getClientVisiblePlan(store, client.id);
  const mealPlan = activeMealPlanForClient(client.id);
  const connectedOfferings = (pkg?.planOfferingIds?.length ? pkg.planOfferingIds : [pkg?.planOfferingId].filter(Boolean))
    .map((id) => store.planOfferings.find((item) => item.id === id))
    .filter(Boolean);
  return `
    <article class="card">
      <h3>My Package and Plans</h3>
      <p class="muted">This shows what is assigned to you right now.</p>
      <div class="detail-grid">
        <p><strong>Package:</strong> ${escapeHtml(client.packageType || pkg?.packageName || "Not assigned")}</p>
        <p><strong>Plan offering:</strong> ${escapeHtml(offering?.planName || "Not assigned")}</p>
        <p><strong>Training level:</strong> ${escapeHtml(activePlan?.trainingLevel || client.currentTrainingLevel || "Not set")}</p>
        <p><strong>Workout plan:</strong> ${activePlan ? `${escapeHtml(activePlan.month || "Current month")} / ${escapeHtml(activePlan.status || "Active")}` : "No active approved workout plan"}</p>
        <p><strong>Training days:</strong> ${client.trainingDaysPerWeek || offering?.trainingDaysPerWeek || "Not set"} per week</p>
        <p><strong>Session length:</strong> ${client.sessionLength || offering?.sessionLength || "Not set"} min</p>
        <p><strong>Sessions remaining:</strong> ${client.sessionsRemaining ?? "Not set"}</p>
        <p><strong>Meal plan:</strong> ${mealPlan ? `${escapeHtml(mealPlan.planName)} assigned ${formatReadableDate(mealPlan.assignedAt)}` : "No active meal plan"}</p>
      </div>
      ${connectedOfferings.length > 1 ? `<p><strong>Package options:</strong> ${connectedOfferings.map((item) => escapeHtml(item.planName)).join(", ")}</p>` : ""}
      <div class="actions">
        <button class="ghost" data-view="plan">Open Monthly Plan</button>
        <button class="ghost" data-open-client-meal-plan>Open Meal Plan</button>
      </div>
    </article>
  `;
}

function profileImagePanel(profileUser, client) {
  const canEdit = profileUser && (profileUser.id === state.currentUser.id || state.currentUser.role === "Admin");
  return `
    <article class="card profile-image-card">
      ${avatar(profileUser?.profileImageUrl || client.profileImageUrl, client.name, "large")}
      <div>
        <p class="eyebrow">Profile image</p>
        <h3>${profileUser?.name || client.name}</h3>
        <p class="muted">${profileUser?.profileImageUploadedAt ? `Uploaded ${new Date(profileUser.profileImageUploadedAt).toLocaleDateString()}` : "Default avatar is showing."}</p>
        ${canEdit ? `
          <div class="image-controls">
            <input id="profileImageInput" type="file" accept="image/jpeg,image/png,image/webp" />
            <button class="primary" id="uploadProfileImageButton">${profileUser?.profileImageUrl ? "Change Profile Image" : "Upload Profile Image"}</button>
            <button class="ghost" id="removeProfileImageButton">Remove Profile Image</button>
          </div>
        ` : `<p class="muted">Image controls are hidden for this account.</p>`}
      </div>
    </article>
  `;
}

function progressImagePanel(client, images) {
  return `
    <section class="card progress-panel">
      <div class="section-head">
        <div><p class="eyebrow">Progress photos</p><h2>Private progress gallery</h2><p class="muted">Only the client, assigned coach, and Admin can view these images.</p></div>
      </div>
      ${canUserAccessClient(store, state.currentUser, client.id) ? `
        <div class="form-grid">
          <label>Progress image <input id="progressImageInput" type="file" accept="image/jpeg,image/png,image/webp" /></label>
          <label>Date <input id="progressImageDate" type="date" value="${state.progressDraft.imageDate}" /></label>
          <label>Category <select id="progressImageCategory">${["Front", "Side", "Back", "Flexed", "Relaxed", "Posture", "Movement Form", "Injury/Concern", "Other"].map((x) => `<option ${state.progressDraft.imageCategory === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>
          <label class="wide">Client notes <textarea id="progressImageNotes">${state.progressDraft.clientNotes}</textarea></label>
        </div>
        <button class="success" id="uploadProgressImageButton">Upload Progress Photo</button>
      ` : ""}
      <div class="progress-gallery">
        ${images.map(progressImageCard).join("") || `<div class="empty">No progress photos yet.</div>`}
      </div>
    </section>
  `;
}

function progressImageCard(image) {
  const uploader = store.users.find((user) => user.id === image.uploadedByUserId);
  const canArchive = state.currentUser.role === "Admin" || (state.currentUser.role === "Client" && state.currentUser.id === image.uploadedByUserId && store.settings.allowClientProgressImageDelete);
  return `
    <article class="progress-image-card">
      <div class="progress-image-thumb">${image.imageUrl ? `<img src="${image.imageUrl}" alt="${image.imageCategory} progress photo" />` : avatar("", image.imageCategory)}</div>
      <div>
        <div class="section-head compact"><h4>${image.imageCategory}</h4><span class="badge green">${image.imageDate}</span></div>
        <p>${image.clientNotes || "No client notes."}</p>
        ${image.coachNotes && (state.currentUser.role !== "Client" || image.coachNotesVisibleToClient) ? `<p><strong>Coach note:</strong> ${image.coachNotes}</p>` : ""}
        <p class="muted">Uploaded by ${uploader?.name || "Unknown"} / storage key: ${image.imageStorageKey}</p>
        ${state.currentUser.role !== "Client" ? `<textarea data-progress-note="${image.id}" placeholder="Coach note">${image.coachNotes}</textarea><button data-save-progress-note="${image.id}">Save Coach Note</button>` : ""}
        ${canArchive ? `<button class="ghost" data-archive-progress-image="${image.id}">Archive Image</button>` : ""}
      </div>
    </article>
  `;
}

function assessmentPage() {
  const client = selectedClient();
  return `
    <section class="workspace panel">
      ${assessmentTemplatePicker(client)}
      ${assessmentWizard(client)}
    </section>
  `;
}

function schedulePage() {
  const client = selectedClient();
  if (!client) {
    return `
      <section class="workspace">
        <div class="empty">No client is available for scheduling yet.</div>
      </section>
    `;
  }
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">Assessment Scheduling</p>
          <h2>Initial assessment and reassessment appointments</h2>
          <p class="muted">${state.currentUser.role === "Client"
            ? "Approve your coach's suggested time or suggest a better one."
            : "Send an assessment time to the selected client, review counters, or move the discussion into chat."}</p>
        </div>
        ${state.currentUser.role !== "Client" ? `<button class="primary" data-view="assessment">Open Assessment</button>` : ""}
      </div>
      ${approvedAppointmentsPanel(client)}
      ${assessmentSchedulePanel(client)}
      ${state.currentUser.role === "Admin" ? `
        <article class="card">
          <div class="section-head compact-head">
            <div>
              <p class="eyebrow">Admin oversight</p>
              <h3>All assessment schedule requests</h3>
              <p class="muted">Admin can see every client/coach schedule request here and intervene when needed.</p>
            </div>
          </div>
          ${approvedAppointmentsPanel(null, { adminView: true })}
          ${adminAssessmentScheduleBoard()}
        </article>
      ` : ""}
    </section>
  `;
}

function assessmentTemplatePicker(client) {
  const options = assessmentTemplateOptions(client);
  const selected = selectedAssessmentTemplate(client);
  return `
    <article class="card">
      <div class="section-head compact">
        <div>
          <p class="eyebrow">Assessment Template</p>
          <h3>Pick the screen for this client</h3>
          <p class="muted">Templates can match the client goal and sport focus. Admin can add more templates.</p>
        </div>
        <label>Template
          <select id="assessmentTemplateSelect">
            ${options.map((template) => `<option value="${template.id}" ${template.id === selected.id ? "selected" : ""}>${template.templateName}</option>`).join("")}
          </select>
        </label>
      </div>
    </article>
  `;
}

function weeklyPage() {
  if (state.currentUser.role !== "Client") {
    return `
      <section class="workspace">
        <div class="empty">
          Weekly check-ins are submitted from the client side. Coaches and Admin can review trends from the client profile, alerts, and plan history.
        </div>
      </section>
    `;
  }
  return `<section class="workspace">${weeklyCheckInView(selectedClient())}</section>`;
}

function monthlyPlanPage() {
  const client = selectedClient();
  const plan = getClientVisiblePlan(store, client.id);
  const latestAssessment = latestClientAssessment(client.id) || summarizeAssessment({ ...state.assessment, clientId: client.id });
  if (plan) {
    const beforeCount = store.monthlyPlanItems.filter((item) => item.monthlyPlanId === plan.id).length;
    ensureMonthlyPlanHasWorkouts(store, plan.id, latestAssessment);
    const afterCount = store.monthlyPlanItems.filter((item) => item.monthlyPlanId === plan.id).length;
    if (afterCount > beforeCount) saveStore();
  }
  const items = store.monthlyPlanItems.filter((item) => item.clientId === client.id && item.monthlyPlanId === plan?.id);
  const canManagePlans = state.currentUser.role !== "Client";
  const draftPlans = canManagePlans ? store.monthlyPlans.filter((item) => item.clientId === client.id && item.status === "Draft") : [];
  const recommended = recommendPlanDirection(client, latestAssessment);
  const sortedItems = items.sort((a, b) => (a.weekNumber - b.weekNumber) || (a.trainingDayNumber - b.trainingDayNumber) || String(a.workoutDate).localeCompare(String(b.workoutDate)));
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">Dynamic Monthly Plan</p>
          <h2>${client.name}</h2>
          <p class="muted">Full month view. Past, current, and future workouts stay visible so the client can review the whole month.</p>
        </div>
        <span class="badge ${latestAssessment.recoveryRecommended ? "orange" : "green"}">${recommended}</span>
      </div>
      <div class="grid-4 stat-strip">
        ${infoCard("Active plan", plan ? `${plan.month} / ${plan.trainingLevel || plan.planLevel}` : "None")}
        ${infoCard("Risk level", latestAssessment.riskLevel)}
        ${infoCard("Equipment score", `${latestAssessment.equipmentScore} / 5`)}
        ${infoCard("Plan rule", recommended)}
      </div>
      ${state.planDraftNotice ? `<div class="result-band"><strong>Plan workflow</strong><p>${state.planDraftNotice}</p></div>` : ""}
      <div class="card-list">
        ${sortedItems.map((item) => workoutCard(item, false)).join("") || `<div class="empty">No approved active plan is visible for this client.</div>`}
      </div>
      ${canManagePlans ? draftPlanSection(draftPlans) : ""}
    </section>
  `;
}

function draftPlanSection(draftPlans) {
  return `
    <section class="draft-plan-panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Coach workflow</p>
          <h3>Draft monthly plans</h3>
          <p class="muted">Clients cannot see draft plans. Approving a draft archives the old active plan and makes the new plan visible to the client.</p>
        </div>
      </div>
      ${draftPlans.length ? draftPlans.map((plan) => {
        const draftItems = store.monthlyPlanItems.filter((item) => item.monthlyPlanId === plan.id);
        return `
          <article class="card">
            <div class="section-head">
              <div>
                <p class="eyebrow">${plan.month} / ${plan.trainingLevel}</p>
                <h3>Assessment-generated draft</h3>
                <p class="muted">Coach-editable suggested workouts based on the latest assessment, client goals, sport focus, pain/restrictions, equipment, and progression level.</p>
              </div>
              <button class="success" data-approve-plan="${plan.id}">Approve and Activate</button>
            </div>
            <div class="card-list compact-plan-list">
              ${draftItems.map((item) => `
                <div>
                  ${workoutCard(item, false)}
                  <div class="actions">
                    <button class="ghost" data-add-suggested-exercise="${item.id}">Add Suggested Exercise</button>
                    <button class="ghost" data-replace-suggested-workout="${item.id}">Replace with New Suggestion</button>
                  </div>
                </div>
              `).join("") || `<div class="empty">Draft created. Add workouts before approval.</div>`}
            </div>
          </article>
        `;
      }).join("") : `<div class="empty">No draft monthly plans waiting for approval.</div>`}
    </section>
  `;
}

function exerciseLibraryPage() {
  const client = selectedClient();
  const assessment = latestClientAssessment(client.id) || summarizeAssessment(state.assessment);
  const usable = filterExercisesForAssessment(store.exercises, assessment);
  const searched = searchExerciseLibrary(store.exercises, state.libraryFilters.query);
  const visible = filterExerciseLibrary(searched, {
    category: state.libraryFilters.category,
    sportFocus: state.libraryFilters.sportFocus,
    trainingLevel: state.libraryFilters.trainingLevel,
    equipment: state.libraryFilters.equipment,
    bodyArea: state.libraryFilters.bodyArea,
    recoveryAlternative: state.libraryFilters.recoveryAlternative ? true : null
  });
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">Exercise Library</p>
          <h2>Full imported workbook library</h2>
          <p class="muted">${store.exercises.length} exercises loaded from the workbook and app-ready for workout building, monthly plans, and pain-based replacements.</p>
        </div>
        <span class="badge green">${visible.length} shown / ${usable.length} usable for ${client.name}</span>
      </div>
      <div class="card library-filters">
        <div class="form-grid">
          <label>Search <input id="librarySearch" value="${state.libraryFilters.query}" placeholder="Search exercise, cue, equipment..." /></label>
          <label>Category <input id="libraryCategory" value="${state.libraryFilters.category}" placeholder="Strength, Mobility..." /></label>
          <label>Sport focus <input id="librarySport" value="${state.libraryFilters.sportFocus}" placeholder="Boxing, General..." /></label>
          <label>Training level <select id="libraryLevel"><option value="">All</option>${["Beginner", "Intermediate", "Advanced", "Pro"].map((x) => `<option value="${x}" ${state.libraryFilters.trainingLevel === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>
          <label>Equipment <input id="libraryEquipment" value="${state.libraryFilters.equipment}" placeholder="Bodyweight, Dumbbell..." /></label>
          <label>Body area <input id="libraryBodyArea" value="${state.libraryFilters.bodyArea}" placeholder="Knee, Shoulder..." /></label>
        </div>
        <label><input id="libraryRecoveryOnly" type="checkbox" ${state.libraryFilters.recoveryAlternative ? "checked" : ""} /> Recovery alternatives only</label>
      </div>
      <div class="library-grid">
        ${visible.map((exercise) => {
          const allowed = usable.some((item) => item.id === exercise.id);
          return `
            <article class="card library-card clickable-library-card ${allowed ? "" : "muted-card"}" data-open-library-exercise="${exercise.id}" role="${state.currentUser.role === "Admin" ? "button" : "article"}" tabindex="${state.currentUser.role === "Admin" ? "0" : "-1"}">
              <div class="section-head">
                <div><p class="eyebrow">${exercise.replacementCategory}</p><h3>${exercise.name}</h3></div>
                <span class="badge ${allowed ? "green" : "orange"}">${allowed ? "Available" : "Filtered"}</span>
              </div>
              <div class="chips">
                <span>${exercise.trainingLevel || exercise.planLevel}${exercise.recoveryAlternative ? " / Recovery alt" : ""}</span>
                <span>${exercise.difficulty}</span>
                <span>${exercise.lowImpact ? "Low impact" : exercise.highImpact ? "High impact" : "Standard impact"}</span>
                <span>${exercise.equipment.join(", ")}</span>
              </div>
              <p><strong>Body area:</strong> ${exercise.bodyArea.join(", ")}</p>
              <p><strong>Warnings:</strong> ${exercise.contraindications.join(", ") || "None"}</p>
              <p><strong>Progression / regression:</strong> ${exercise.progression ? "Progression" : exercise.regression ? "Regression" : "Standard"}${exercise.recoveryAlternative ? " / Recovery alternative" : ""}${exercise.regressionExerciseId ? ` from ${exercise.regressionExerciseId}` : ""}</p>
              ${state.currentUser.role === "Admin" ? `<button class="primary full" data-open-library-exercise-button="${exercise.id}">View / Edit Exercise</button>` : ""}
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function coachView() {
  const client = selectedClient();
  return `
    <section class="workspace two-col">
      <aside class="side">
        <label>Client</label>
        <select id="clientSelect">${store.clients.map((clientOption) => `<option value="${clientOption.id}" ${clientOption.id === state.clientId ? "selected" : ""}>${clientOption.name}</option>`).join("")}</select>
        <button class="primary full" id="startAssessment">Start Assessment</button>
        <div class="mini-panel">
          <h3>${client.name}</h3>
          <p>${client.goal}</p>
          <dl>
            <div><dt>Client ID</dt><dd>${client.id}</dd></div>
            <div><dt>Sport focus</dt><dd>${client.sportFocus}</dd></div>
            <div><dt>Package</dt><dd>${client.packageType}</dd></div>
            <div><dt>Training level</dt><dd>${client.currentTrainingLevel || client.currentPlanLevel || "No assessment yet"}</dd></div>
          </dl>
        </div>
      </aside>
      <section class="panel">
        ${assessmentTemplatePicker(client)}
        ${assessmentWizard(client)}
      </section>
    </section>
  `;
}

function assessmentTemplateOptions(client) {
  const active = store.assessmentTemplates.filter((template) => template.active !== false && !template.archived);
  const sport = String(client.sportFocus || "").toLowerCase();
  const goal = String(client.goal || "").toLowerCase();
  const matched = active.filter((template) => {
    const templateSport = String(template.sportFocus || "").toLowerCase();
    const templateGoal = String(template.goal || "").toLowerCase();
    return templateSport.includes(sport.split(" ")[0]) || sport.includes(templateSport.split(" ")[0]) || goal.includes(templateGoal.split(" ")[0]);
  });
  return matched.length ? matched : active;
}

function selectedAssessmentTemplate(client = selectedClient()) {
  return store.assessmentTemplates.find((template) => template.id === state.selectedAssessmentTemplateId)
    || assessmentTemplateOptions(client)[0]
    || store.assessmentTemplates[0];
}

function currentMovementTests(client = selectedClient()) {
  const template = selectedAssessmentTemplate(client);
  const ids = template?.movementTestIds?.length ? template.movementTestIds : movementTests.map((test) => test.id);
  return movementTests.filter((test) => ids.includes(test.id));
}

function assessmentWizard(client) {
  const steps = ["Setup", "Safety", "Movement", "Equipment", "Summary", "History"];
  const template = selectedAssessmentTemplate(client);
  state.assessment.movementTestIds = template?.movementTestIds || movementTests.map((test) => test.id);
  const summary = summarizeAssessment(state.assessment);
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">Coach-led movement screening</p>
        <h2>${client.name} Assessment</h2>
      </div>
      <span class="badge ${summary.riskLevel === "High" ? "red" : summary.riskLevel === "Medium" ? "orange" : "green"}">${summary.riskLevel}</span>
    </div>
    <p class="muted">Using template: ${template?.templateName || "Default assessment"}</p>
    <div class="progress">${steps.map((step, index) => `<button class="step ${state.assessmentStep === index ? "active" : ""}" data-step="${index}"><span>${index + 1}</span>${step}</button>`).join("")}</div>
    ${assessmentStep(client, summary)}
    <div class="actions">
      <button class="ghost" id="prevStep" ${state.assessmentStep === 0 ? "disabled" : ""}>Back</button>
      <button class="primary" id="nextStep">${state.assessmentStep === steps.length - 1 ? "Done" : "Next"}</button>
      <button class="success" id="saveAssessment">Save Assessment</button>
    </div>
  `;
}

function assessmentStep(client, summary) {
  if (state.assessmentStep === 0) {
    return `
      <div class="grid-3 stat-strip">
        ${infoCard("Client name", client.name)}
        ${infoCard("Client ID", client.id)}
        ${infoCard("Date", state.assessment.assessmentDate)}
        ${infoCard("Goal", client.goal)}
        ${infoCard("Sport focus", client.sportFocus)}
        ${infoCard("Training days", `${client.trainingDaysPerWeek} per week`)}
        ${infoCard("Session length", `${client.sessionLength} min`)}
        ${infoCard("Package", client.packageType)}
        ${infoCard("Last check-in", client.lastWeeklyCheckInResult || "None")}
      </div>
      <div class="form-grid">
        <label>Assessment date <input id="assessmentDate" value="${state.assessment.assessmentDate}" /></label>
        <label>Assessment type <select id="assessmentType"><option>Initial Assessment</option><option ${state.assessment.assessmentType === "Reassessment" ? "selected" : ""}>Reassessment</option></select></label>
        <label class="wide">Coach notes <textarea id="coachNotes">${state.assessment.coachNotes}</textarea></label>
      </div>
    `;
  }
  if (state.assessmentStep === 1) {
    return `
      <div class="card-list">
        ${safetyQuestions.map((q) => {
          const answer = state.assessment.safetyAnswers[q.id]?.answer === true;
          return `
            <article class="card safety-card">
              <div>
                <h3>${q.text}</h3>
                <p>${answer ? q.action : "No flag set."}</p>
              </div>
              <div class="yesno">
                <button class="${answer ? "danger" : ""}" data-safety="${q.id}" data-answer="yes">Yes</button>
                <button class="${!answer ? "active" : ""}" data-safety="${q.id}" data-answer="no">No</button>
              </div>
              <input class="notes" data-safety-note="${q.id}" placeholder="Optional notes" value="${state.assessment.safetyAnswers[q.id]?.notes || ""}" />
              ${answer ? `<div class="alert ${q.severity === "High Risk" ? "red" : "orange"}">${q.severity}: ${q.permission}</div>` : ""}
            </article>
          `;
        }).join("")}
      </div>
    `;
  }
  if (state.assessmentStep === 2) {
    return `<div class="guide">${scoreGuide.map((s) => `<span class="score-guide ${scoreColor(s.score)}">${s.score} ${s.label}</span>`).join("")}</div>
      <div class="card-list">${currentMovementTests(client).map(testCard).join("")}</div>`;
  }
  if (state.assessmentStep === 3) {
    return `<div class="equipment-grid">
      ${equipmentOptions.map((eq) => `
        <label class="equipment ${state.assessment.equipment[eq.id] ? "checked" : ""}">
          <input type="checkbox" data-equipment="${eq.id}" ${state.assessment.equipment[eq.id] ? "checked" : ""} />
          <strong>${eq.name}</strong>
          <small>${eq.tag} / +${eq.credit}</small>
        </label>
      `).join("")}
    </div>
    <div class="summary-row">
      ${infoCard("Equipment score", `${summary.equipmentScore} / 5`)}
      ${infoCard("Equipment level", summary.equipmentLevel)}
      ${infoCard("Plan rule", equipmentRule(summary.equipmentLevel))}
    </div>`;
  }
  if (state.assessmentStep === 4) {
    return summaryBlock(summary);
  }
  return historyView();
}

function testCard(test) {
  const score = Number(state.assessment.movementScores[test.id] ?? 0);
  return `
    <article class="card test-card">
      <div class="test-top">
        <div>
          <p class="eyebrow">${test.section} / ${test.tag}</p>
          <h3>${test.name}</h3>
          <p>${test.purpose}</p>
        </div>
        <span class="badge ${scoreColor(score)}">Score ${score}</span>
      </div>
      <div class="test-grid">
        <div><h4>Setup</h4><p>${test.setup}</p></div>
        <div><h4>Client does</h4><p>${test.clientDoes}</p></div>
        <div><h4>What to look for</h4><ul>${test.lookFor.map(li).join("")}</ul></div>
        <div><h4>Red flags</h4><ul>${test.redFlags.map(li).join("")}</ul></div>
      </div>
      <div class="score-buttons">${[0, 1, 2, 3, 4, 5].map((n) => `<button class="${score === n ? "selected " : ""}${scoreColor(n)}" data-score="${test.id}:${n}" title="${test.scoring[n]}">${n}</button>`).join("")}</div>
      <p class="low-focus"><strong>If low, focus on:</strong> ${test.ifLow}</p>
      <textarea data-test-note="${test.id}" placeholder="Coach notes for ${test.name}"></textarea>
    </article>
  `;
}

function summaryBlock(summary) {
  return `
    <div class="summary-hero">
      <div>
        <p class="eyebrow">Assessment Result</p>
        <h2>${summary.workoutPermission}</h2>
        <p>${summary.summaryText}</p>
      </div>
      ${state.currentUser?.role === "Client"
        ? `<span class="badge orange">Coach review required</span>`
        : `<button class="primary" id="generateAssessmentPlan">Use Suggestion: ${summary.recommendedNextStep}</button>`}
    </div>
    ${state.planDraftNotice ? `<div class="result-band"><strong>Coach plan workflow</strong><p>${state.planDraftNotice}</p></div>` : ""}
    <div class="grid-4 stat-strip">
      ${infoCard("Average score", summary.averageCapabilityScore)}
      ${infoCard("Lowest score", summary.lowestCapabilityScore)}
      ${infoCard("Suggested level", summary.suggestedStartLevel)}
      ${infoCard("Training level", summary.trainingLevel || summary.planLevel)}
      ${infoCard("Adjustment mode", summary.adjustmentMode || "Normal")}
    </div>
    <div class="split">
      <div>${chipSection("Restrictions", summary.restrictions)}</div>
      <div>${chipSection("Main focus", summary.mainFocus)}</div>
      <div>${chipSection("Avoid", summary.avoid)}</div>
    </div>
    <div class="coach-action"><strong>Coach action:</strong> ${summary.coachAction}</div>
  `;
}

function weeklyCheckInView(client) {
  return `
    <div class="section-head">
      <div><p class="eyebrow">Weekly check-in</p><h2>Plan trend and next-week adjustment</h2></div>
      <button class="success" id="saveWeekly">Save Weekly Check-In</button>
    </div>
    <div class="check-grid">
      ${scoreInput("Energy", "energyScore", state.weekly.energyScore)}
      ${scoreInput("Pain", "painScore", state.weekly.painScore)}
      ${scoreInput("Soreness", "sorenessScore", state.weekly.sorenessScore)}
      ${scoreInput("Sleep", "sleepScore", state.weekly.sleepScore)}
      ${scoreInput("Stress", "stressScore", state.weekly.stressScore)}
      ${scoreInput("Performance", "performanceScore", state.weekly.performanceScore)}
      <label>Completion % <input id="weeklyCompletion" type="number" min="0" max="100" value="${state.weekly.workoutCompletionPercent}" /></label>
      <label>Difficulty <select id="weeklyDifficulty">${["Easy", "Medium", "Hard", "Too Hard"].map((x) => `<option ${state.weekly.workoutDifficulty === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>
    </div>
    ${store.weeklyCheckIns.filter((item) => item.clientId === client.id).slice(-1).map((item) => `<div class="result-band"><strong>${item.checkInResult}</strong><span>${item.planAdjustment}</span><p>${item.recommendation}</p></div>`).join("")}
  `;
}

function clientDashboard() {
  const dashboard = getClientDashboard(store, state.clientId, today);
  const client = dashboard.client;
  const workout = dashboard.workout;
  const profileUser = userForProfile(client);
  const progressImages = getProgressImagesForUser(store, state.currentUser, client.id).slice(-3);
  return `
    <section class="workspace">
      <div class="section-head">
        <div class="profile-heading">
          ${avatar(profileUser?.profileImageUrl || client.profileImageUrl, client.name)}
          <div>
            <p class="eyebrow">Client dashboard</p>
            <h2>${client.name}</h2>
          </div>
        </div>
        <span class="badge ${dashboard.locked ? "red" : "green"}">${dashboard.message}</span>
      </div>
      <div class="grid-4 stat-strip">
        ${infoCard("Active monthly plan", dashboard.plan?.trainingLevel || dashboard.plan?.planLevel || "None")}
        ${infoCard("Today", today)}
        ${infoCard("Package", client.packageType)}
        ${infoCard("Sessions remaining", client.sessionsRemaining)}
      </div>
      ${workoutCard(workout, dashboard.locked)}
      ${assessmentSchedulePanel(client)}
      <div class="dashboard-actions">
        <button class="primary" id="openDaily">Check In Before Workout</button>
        ${workout ? `<button class="primary" data-workout-detail="${workout.id}">View Full Workout</button>` : ""}
        <button class="ghost" data-view="plan">View Full Monthly Plan</button>
        <button class="ghost" data-open-client-meal-plan>View Meal Plan</button>
        <button class="ghost" data-view="profile">Upload Progress Photo</button>
        ${workout?.coachAllowsMarkComplete && !dashboard.locked ? `<button class="success" id="markComplete">Mark Workout Complete</button>` : ""}
      </div>
      ${progressImages.length ? `<article class="card"><h3>Recent progress photos</h3><div class="mini-progress-row">${progressImages.map((image) => `<div><strong>${image.imageCategory}</strong><span>${image.imageDate}</span></div>`).join("")}</div></article>` : ""}
      ${dailyCheckInForm()}
    </section>
  `;
}

function workoutDetailPage() {
  const client = selectedClient();
  const detail = getWorkoutDetailForUser(store, state.currentUser, client.id, state.selectedWorkoutId, today);
  if (!detail) {
    return `<section class="workspace"><div class="empty">This workout is not available for this account.</div><button class="ghost" data-view="${state.currentUser.role === "Client" ? "client" : "plan"}">Back</button></section>`;
  }
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">${detail.adjustedForToday ? "Adjusted for today based on your check-in" : `Workout detail / ${client.name}`}</p>
          <h2>${detail.title}</h2>
          <p class="muted">Week ${detail.weekNumber} / Training day ${detail.trainingDayNumber} / ${detail.sessionLength} minutes / ${detail.trainingLevel || "Intermediate"}</p>
        </div>
        <div class="actions">
          <button class="ghost" data-view="${state.currentUser.role === "Client" ? "client" : "plan"}">Back</button>
          <button class="ghost" data-view="chat">Message Coach</button>
          ${detail.canEdit ? `<button class="success">Send Workout Update</button>` : ""}
        </div>
      </div>
      ${detail.adjustedForToday ? `<div class="result-band"><strong>Adjusted workout</strong><span>Today's version is based on the latest check-in and coach/app approval.</span></div>` : ""}
      ${detail.sections.map((section) => `
        <section class="workout-section">
          <div class="section-title"><h3>${section.name}</h3><span>${section.items.length} exercise${section.items.length === 1 ? "" : "s"}</span></div>
          <div class="exercise-card-grid">
            ${section.items.map((item) => workoutExerciseCard(item, detail.canEdit)).join("")}
          </div>
        </section>
      `).join("")}
      ${detail.originalWorkout ? `<details class="card"><summary>Coach/Admin original workout snapshot</summary>${compactWorkout("Original planned workout", detail.originalWorkout)}</details>` : ""}
    </section>
  `;
}

function workoutExerciseCard(item, canEdit) {
  const detail = item.detail || {};
  return `
    <article class="exercise-preview-card">
      <div class="section-head compact">
        <div><p class="eyebrow">${item.sessionPart}</p><h4>${item.exerciseName}</h4></div>
        <span class="badge ${item.difficulty === "Hard" ? "red" : item.difficulty === "Medium" ? "orange" : "green"}">${item.difficulty}</span>
      </div>
      ${doseDetailGrid(item)}
      <div class="chips">
        <span>${Array.isArray(item.equipment) ? item.equipment.join(", ") : item.equipment || "Bodyweight"}</span>
        <span>${detail.trainingLevel || "Intermediate"}</span>
      </div>
      <p>${detail.purpose || "Coach-selected exercise for today's workout."}</p>
      <div class="actions">
        ${item.hasVideo ? `<a class="button-link" href="${detail.videoUrl}" target="_blank" rel="noopener">Watch Video</a>` : ""}
        <button class="primary" data-exercise-detail="${item.exerciseId}" data-workout-context="${state.selectedWorkoutId}">View Details</button>
        ${canEdit ? `<button class="ghost" data-coach-workout-item="${state.selectedWorkoutId}:${item.itemIndex}" data-coach-workout-mode="replace">Replace Exercise</button><button class="ghost" data-coach-workout-item="${state.selectedWorkoutId}:${item.itemIndex}" data-coach-workout-mode="dose">Edit Rounds / Sets / Time</button><button class="ghost" data-coach-workout-item="${state.selectedWorkoutId}:${item.itemIndex}" data-coach-workout-mode="note">Add Coach Note</button>` : ""}
      </div>
    </article>
  `;
}

function doseDetailGrid(item) {
  const fields = [
    ["Sets", item.sets],
    ["Reps", item.reps],
    ["Rounds", item.rounds],
    ["Round time", item.time],
    ["Rest", item.rest]
  ].filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "");
  if (!fields.length) return `<div class="dose-grid"><span><small>Suggested rounds</small><strong>Coach set</strong></span></div>`;
  return `
    <div class="dose-grid">
      ${fields.map(([label, value]) => `<span><small>${label}</small><strong>${escapeHtml(formatDoseValue(label, value))}</strong></span>`).join("")}
    </div>
  `;
}

function exerciseDetailPage() {
  const client = selectedClient();
  const detail = getExerciseDetailForUser(store, state.currentUser, state.selectedExerciseId, { clientId: client.id, workoutId: state.selectedWorkoutId, date: today });
  if (!detail) {
    return `<section class="workspace"><div class="empty">This exercise detail is not available for this account.</div><button class="ghost" data-view="workoutDetail">Back</button></section>`;
  }
  const workoutDetail = getWorkoutDetailForUser(store, state.currentUser, client.id, state.selectedWorkoutId, today);
  const workoutItem = workoutDetail?.sections?.flatMap((section) => section.items || []).find((item) => item.exerciseId === state.selectedExerciseId);
  const suggestedWork = workoutItem || detail;
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">Exercise detail</p>
          <h2>${detail.exerciseName}</h2>
          <p class="muted">${detail.description}</p>
        </div>
        <div class="actions">
          <button class="ghost" data-view="workoutDetail">Back to Workout</button>
          ${detail.canEdit ? `<button class="success">Edit Video Links</button>` : ""}
        </div>
      </div>
      <div class="exercise-detail-layout">
        <article class="card exercise-detail-main">
          <div class="chips">
            <span>${detail.trainingLevel}</span>
            <span>${detail.difficulty}</span>
            <span>${detail.recoveryAlternative ? "Recovery alternative" : "Normal option"}</span>
            <span>${detail.equipment.join(", ") || "No equipment"}</span>
          </div>
          <h3>Purpose</h3><p>${detail.purpose}</p>
          <h3>Setup</h3><p>${detail.setupInstructions}</p>
          <h3>Step-by-step</h3><p>${detail.stepByStepInstructions}</p>
          <h3>Breathing</h3><p>${detail.breathingInstructions}</p>
          <h3>Tempo / pace</h3><p>${detail.tempoOrPace}</p>
          <h3>Coaching cues</h3><p>${detail.coachingCues}</p>
          <h3>Common mistakes</h3><p>${detail.commonMistakes}</p>
          <h3>Safety warnings</h3><p>${detail.safetyWarnings}</p>
          <h3>Pain warnings</h3><p>${detail.painWarnings}</p>
        </article>
        <aside class="card exercise-detail-side">
          <h3>Suggested rounds / work</h3>
          ${doseDetailGrid(suggestedWork)}
          <h3>Options</h3>
          <p><strong>Easier:</strong> ${detail.easierVersion}</p>
          <p><strong>Harder:</strong> ${detail.harderVersion}</p>
          <p><strong>Low impact:</strong> ${detail.lowImpactOption}</p>
          <p><strong>Safe alternative:</strong> ${detail.safeAlternative || "Coach will choose if needed."}</p>
          <p><strong>Body areas:</strong> ${detail.bodyAreasWorked.join(", ") || "General"}</p>
          ${videoBlock(detail)}
          ${detail.clientNotes ? `<h3>Client notes</h3><p>${detail.clientNotes}</p>` : ""}
          ${detail.coachOnlyNotes ? `<h3>Coach notes</h3><p>${detail.coachOnlyNotes}</p>` : ""}
          ${detail.replacementOptions.length ? `<h3>Replacement options</h3>${chipSection("Options", detail.replacementOptions.map((item) => item.name))}` : ""}
          ${detail.canAdjustInWorkout ? exerciseDetailCoachActions() : ""}
        </aside>
      </div>
    </section>
  `;
}

function exerciseDetailCoachActions() {
  const workout = store.monthlyPlanItems.find((item) => item.id === state.selectedWorkoutId);
  const itemIndex = workout?.items?.findIndex((item) => item.exerciseId === state.selectedExerciseId);
  const disabled = itemIndex === undefined || itemIndex < 0;
  return `
    <div class="actions vertical">
      <button ${disabled ? "disabled" : ""} data-coach-workout-item="${state.selectedWorkoutId}:${itemIndex}" data-coach-workout-mode="replace">Replace Exercise</button>
      <button ${disabled ? "disabled" : ""} data-coach-workout-item="${state.selectedWorkoutId}:${itemIndex}" data-coach-workout-mode="dose">Edit Sets/Reps/Time/Rest</button>
      <button ${disabled ? "disabled" : ""} data-coach-workout-item="${state.selectedWorkoutId}:${itemIndex}" data-coach-workout-mode="note">Add Coach Note</button>
      <button ${disabled ? "disabled" : ""} data-coach-workout-item="${state.selectedWorkoutId}:${itemIndex}" data-coach-workout-mode="approve">Approve Adjusted Workout</button>
    </div>
  `;
}

function videoBlock(detail) {
  if (!detail.videoUrl) return "";
  if (detail.youtubeEmbedUrl) {
    return `<h3>Video example</h3><div class="video-frame"><iframe src="${detail.youtubeEmbedUrl}" title="${detail.exerciseName} video" allowfullscreen></iframe></div><a class="button-link full-link" href="${detail.videoUrl}" target="_blank" rel="noopener">Watch on YouTube</a>`;
  }
  return `<h3>Video example</h3><a class="button-link full-link" href="${detail.videoUrl}" target="_blank" rel="noopener">Watch Video</a>`;
}

function dailyCheckInForm() {
  const d = state.daily;
  const pain = d.painCheckIn;
  return `
    <section class="daily-form" id="dailyForm">
      <div class="section-head"><div><p class="eyebrow">Before workout</p><h2>Daily readiness and pain check</h2></div><button class="success" id="submitDaily">Submit Check-In</button></div>
      <div class="check-grid">
        ${dailyScore("Energy", "energyScore", d.energyScore)}
        ${dailyScore("Pain", "painScore", d.painScore)}
        ${dailyScore("Soreness", "sorenessScore", d.sorenessScore)}
        ${dailyScore("Sleep", "sleepScore", d.sleepScore)}
        ${dailyScore("Stress", "stressScore", d.stressScore)}
        ${dailyScore("Readiness", "readinessScore", d.readinessScore)}
      </div>
      <div class="pain-box">
        <h3>Are you having pain today?</h3>
        <div class="yesno">
          <button class="${pain.hasPain ? "danger" : ""}" data-pain-toggle="yes">Yes</button>
          <button class="${!pain.hasPain ? "active" : ""}" data-pain-toggle="no">No</button>
        </div>
        ${pain.hasPain ? painDetails() : `<p class="muted">No pain selected. The app will still use your readiness scores.</p>`}
      </div>
    </section>
  `;
}

function painDetails() {
  const pain = state.daily.painCheckIn;
  const locations = ["Neck", "Shoulder", "Elbow", "Wrist", "Upper back", "Lower back", "Hip", "Knee", "Ankle", "Foot", "Chest", "Head", "Other"];
  const types = ["Sore", "Tight", "Sharp", "Burning", "Throbbing", "Numbness", "Tingling", "Stiff", "Swollen", "Dizziness", "Faint feeling", "Breathing issue", "Other"];
  return `
    <h4>Where do you feel pain?</h4>
    <div class="chip-grid">${locations.map((x) => toggleChip("pain-location", x, pain.painLocations.includes(x))).join("")}</div>
    <h4>What type of pain is it?</h4>
    <div class="chip-grid">${types.map((x) => toggleChip("pain-type", x, pain.painType.includes(x))).join("")}</div>
    <label>Pain level from 1-10 <input id="painLevel" type="range" min="1" max="10" value="${pain.painLevel1to10}" /><strong>${pain.painLevel1to10}</strong></label>
    <div class="check-grid">
      <label><input type="checkbox" id="painStartedToday" ${pain.painStartedToday ? "checked" : ""} /> Pain started today</label>
      <label><input type="checkbox" id="painWorse" ${pain.painWorseWithMovement ? "checked" : ""} /> Worse when moving</label>
      <label><input type="checkbox" id="safeTrain" ${pain.feelsSafeToTrain ? "checked" : ""} /> I feel safe to train</label>
    </div>
    <textarea id="dailyPainNotes" placeholder="Any injury or pain notes today?">${pain.painNotes}</textarea>
  `;
}

function coachAlertsView() {
  const alerts = getCoachAlerts(store, "coach_1");
  return `
    <section class="workspace">
      <div class="section-head"><div><p class="eyebrow">Coach dashboard</p><h2>Workout change approval queue</h2></div></div>
      ${alerts.length ? alerts.map(alertCard).join("") : `<div class="empty">No coach alerts yet. Submit a daily check-in with pain or poor readiness to see this workflow.</div>`}
    </section>
  `;
}

function chatPage() {
  const client = currentChatClient();
  if (!client) {
    return `
      <section class="workspace">
        <div class="empty">No client chat is available for this account yet.</div>
      </section>
    `;
  }
  state.clientId = client.id;
  const messages = getChatMessages(store, state.currentUser, client.id)
    .slice()
    .sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
  const partner = chatPartnerFor(client);
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">Secure Coach / Client Chat</p>
          <h2>${client.name}</h2>
          <p class="muted">Messages save to Supabase and refresh across devices while both users are logged in. Admins can audit and intervene when needed.</p>
        </div>
        <button class="ghost" id="markReadButton">Mark Messages Read</button>
      </div>
      <div class="chat-layout">
        <article class="card chat-thread">
          ${messages.map((message) => {
            const sender = store.users.find((user) => user.id === message.fromUserId);
            return `<div class="message ${message.fromUserId === state.currentUser.id ? "mine" : ""}">
              <strong>${sender?.name || "Unknown"}</strong>
              <p>${escapeHtml(message.body)}</p>
              <small>${new Date(message.createdAt).toLocaleString()}</small>
            </div>`;
          }).join("") || `<div class="empty">No messages yet.</div>`}
        </article>
        <aside class="card">
          <h3>Send Message</h3>
          <p class="muted">To: ${partner?.name || "Conversation partner"}</p>
          <textarea id="chatDraft" placeholder="Type a message to ${partner?.name || "this chat"}">${state.chatDraft}</textarea>
          <button class="primary full" id="sendChatButton" ${partner ? "" : "disabled"}>Send Message</button>
          <h3>Notifications</h3>
          ${store.notifications.filter((item) => item.userId === state.currentUser.id && item.clientId === client.id).map((item) => `<div class="notification ${item.read ? "" : "unread"}"><strong>${item.title}</strong><p>${item.body}</p></div>`).join("") || `<p class="muted">No notifications.</p>`}
        </aside>
      </div>
    </section>
  `;
}

function currentChatClient() {
  return state.currentUser?.role === "Client" ? clientForCurrentUser() : selectedClient();
}

function chatPartnerFor(client) {
  if (!client) return null;
  if (state.currentUser.role === "Client") return store.users.find((user) => user.role === "Coach" && user.linkedId === client.coachId);
  if (state.currentUser.role === "Coach") return store.users.find((user) => user.role === "Client" && user.linkedId === client.id);
  return store.users.find((user) => user.role === "Coach" && user.linkedId === client.coachId);
}

function hasUnreadChatActivity(userId, clientId) {
  return (store.notifications || []).some((item) => item.userId === userId && item.clientId === clientId && !item.read)
    || (store.chatMessages || []).some((message) =>
      message.clientId === clientId &&
      (message.toUserId === userId || message.fromUserId === userId) &&
      !(message.readBy || []).includes(userId)
    );
}

function markVisibleChatReadIfNeeded() {
  const client = currentChatClient();
  if (state.view !== "chat" || !state.currentUser || !client?.id) return;
  if (!hasUnreadChatActivity(state.currentUser.id, client.id)) return;
  markNotificationsRead(store, state.currentUser.id, client.id);
  saveStore();
  pushLiveChatMessagesForClient(client.id);
  backupPublicChangeToCloud();
  setTimeout(() => {
    if (state.view === "chat") render();
  }, 0);
}

function alertCard(alert) {
  const client = store.clients.find((item) => item.id === alert.clientId);
  const daily = store.dailyCheckIns.find((item) => item.id === alert.dailyCheckInId);
  const pain = alert.painSummary;
  const isScheduleAlert = alert.alertType === "Assessment Schedule";
  return `
    <article class="card alert-card ${alert.alertSeverity.toLowerCase()}">
      <div class="section-head">
        <div>
          <p class="eyebrow">${alert.alertType} / ${alert.alertSeverity}</p>
          <h3>${client?.name || alert.clientId}</h3>
          <p>${alert.alertReason}</p>
        </div>
        <span class="badge ${alert.alertSeverity === "Serious" ? "red" : alert.alertSeverity === "Moderate" ? "orange" : "green"}">${alert.status}</span>
      </div>
      <div class="split">
        <div><h4>${isScheduleAlert ? "Appointment" : "Check-in answers"}</h4><p>${daily ? `Energy ${daily.energyScore}, pain ${daily.painScore}, soreness ${daily.sorenessScore}, sleep ${daily.sleepScore}, stress ${daily.stressScore}, readiness ${daily.readinessScore}` : escapeHtml(alert.scheduleSummary || "Assessment appointment update.")}</p></div>
        <div><h4>Pain details</h4><p>${pain ? `Location: ${pain.locations.join(", ") || "Not selected"}. Type: ${pain.types.join(", ") || "Not selected"}. Level: ${pain.level}/10.${pain.worseWithMovement ? " Worse with movement." : ""}` : "No pain reported."}</p></div>
        <div><h4>App recommendation</h4><p>${alert.appRecommendation}</p></div>
        <div><h4>Suggested adjustment</h4><p>${alert.suggestedAdjustmentType}</p></div>
      </div>
      ${alert.originalWorkoutSnapshot || alert.suggestedWorkoutSnapshot ? `<div class="workout-compare">
        ${compactWorkout("Original workout", alert.originalWorkoutSnapshot)}
        ${compactWorkout("Suggested workout", alert.suggestedWorkoutSnapshot)}
      </div>` : ""}
      <div class="actions">
        ${alert.suggestedWorkoutSnapshot ? `<button class="primary" data-edit-alert-workout="${alert.id}">Edit Suggested Workout</button>` : ""}
        ${isScheduleAlert ? `<button data-view="schedule">Open Schedule</button><button data-alert-decision="${alert.id}:Reviewed">Mark Reviewed</button>` : ["Approved Suggested Change", "Edited Suggested Change", "Kept Original Workout", "Replaced Workout", "Coach Review Needed", "No Workout Today"].map((decision) => `<button data-alert-decision="${alert.id}:${decision}">${decision}</button>`).join("")}
        <button class="ghost" data-view="chat">Message Client</button>
      </div>
    </article>
  `;
}

function adminView() {
  const alerts = getAdminAlerts(store);
  const d = state.adminDrafts;
  const creationActions = [
    { label: "Add Client", panel: "clients" },
    { label: "Add Coach", panel: "coaches" },
    { label: "Account Requests", panel: "accountRequests" },
    { label: "Exercise Library", panel: "exercises" },
    { label: "Add Workout", panel: "workouts" },
    { label: "Add Plan Offering", panel: "offerings" },
    { label: "Add Package", panel: "packages" },
    { label: "Add Assessment Template", panel: "assessmentTemplates" },
    { label: "Meal Planner", panel: "nutritionDemo" },
    { label: "Assessment Scheduling", panel: "assessmentSchedules" },
    { label: "PINs / Security", panel: "security" },
    { label: "Data Sync", panel: "dataSync" }
  ];
  return `
    <section class="workspace">
      <div class="section-head"><div><p class="eyebrow">Admin Control Center</p><h2>Create and manage the whole coaching system</h2><p class="muted">Build exercises, workouts, templates, offerings, packages, clients, locked accounts, passwords, alerts, and chats from one place.</p></div></div>
      <div class="quick-actions admin-quick">
        ${creationActions.map((action) => `<button class="${state.adminPanel === action.panel ? "active" : ""}" data-admin-panel="${action.panel}">${action.label}</button>`).join("")}
        <button data-admin-jump="View Alerts">View Alerts</button>
        <button data-admin-jump="View Chats">View Chats</button>
      </div>
      <article class="card admin-overview ${adminPanelClass("overview")}">
        <div class="section-head compact-head">
          <div>
            <p class="eyebrow">Admin Overview</p>
            <h3>Choose one control area above</h3>
            <p class="muted">The large creation tools now open one section at a time, so this page stays cleaner while Admin still has full control.</p>
          </div>
        </div>
        <div class="grid-3 stat-strip">
          ${infoCard("Clients", store.clients.length)}
          ${infoCard("Exercises", store.exercises.length)}
          ${infoCard("Open alerts", alerts.filter((alert) => alert.status !== "Resolved").length)}
        </div>
        <h3>Profile Images</h3>
        <div class="admin-list">
          ${store.users.filter((user) => user.role !== "Admin").map((user) => `
            <div class="admin-row avatar-row">
              ${avatar(user.profileImageUrl, user.name)}
              <span>${user.name} / ${user.role}</span>
              <input data-profile-file="${user.id}" type="file" accept="image/jpeg,image/png,image/webp" />
              <button data-admin-upload-profile="${user.id}">Upload / Change</button>
              <button data-admin-remove-profile="${user.id}">Remove</button>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="card admin-card ${adminPanelClass("dataSync")}" id="admin-data-sync">
        <div class="section-head compact-head">
          <div>
            <p class="eyebrow">Cloud Coaching Sync</p>
            <h3>Share profiles, chats, assessments, and client progress across devices</h3>
            <p class="muted">Supabase saves the live coaching records that clients, coaches, and Admin need to share. The exercise library, workout templates, plan offerings, packages, plan templates, and assessment templates stay built into the app for now.</p>
          </div>
        </div>
        <div class="grid-3 stat-strip">
          ${infoCard("Clients saved here", store.clients.length)}
          ${infoCard("Coaches saved here", store.coaches.filter((coach) => coach.role !== "Admin").length)}
          ${infoCard("Monthly plans saved here", store.monthlyPlans.length)}
        </div>
        <div class="result-band success-band">
          <strong>Shared coaching sync</strong>
          <span>Use Supabase to keep approved accounts, client and coach profiles, chats, assessments, check-ins, alerts, and assigned client plans matched across devices.</span>
        </div>
        <div class="actions">
          <button class="primary" id="exportAppData">Export App Data</button>
          <button class="success" id="importAppDataButton">Import App Data</button>
          <input class="visually-hidden" id="importAppDataInput" type="file" accept="application/json,.json" />
        </div>
        <h3>Supabase Backup</h3>
        <p class="muted">Automatic cloud saving is <strong>${store.settings.automaticSupabaseBackup === false ? "Off" : "On"}</strong>. After a logged-in user saves shared coaching data, the app saves locally immediately and sends the updated records to Supabase after 2.5 seconds. Logging out also runs a final Supabase backup.</p>
        <div class="form-grid">
          <label>Supabase project URL
            <input id="supabaseUrl" value="${escapeHtml(store.settings.supabaseUrl || "")}" placeholder="https://your-project.supabase.co" />
          </label>
          <label>Supabase anon key
            <input id="supabaseAnonKey" value="${escapeHtml(store.settings.supabaseAnonKey || "")}" placeholder="Paste anon public key" />
          </label>
          <label>Backup table
            <input id="supabaseBackupTable" value="${escapeHtml(store.settings.supabaseBackupTable || "smart_coach_backups")}" />
          </label>
        </div>
        <label>Setup SQL to run once in Supabase SQL Editor
          <textarea id="supabaseSetupSql" class="code-textarea" readonly>${escapeHtml(supabaseSetupSql(store.settings.supabaseBackupTable || "smart_coach_backups"))}</textarea>
        </label>
        <div class="actions">
          <button type="button" id="copySupabaseSql">Copy Setup SQL</button>
          <button type="button" class="danger" id="copySupabaseEraseSql">Copy Erase Supabase SQL</button>
          <button type="button" id="saveSupabaseConfig">Save Supabase Settings</button>
          <button type="button" id="testSupabaseConnection">Test Supabase Connection</button>
          <button type="button" class="success" id="restoreSupabaseData" ${state.supabaseRestoreBusy ? "disabled" : ""}>${state.supabaseRestoreBusy ? "Loading..." : "Load Latest Supabase Data"}</button>
          <button type="button" class="primary" id="backupSupabaseData" ${state.supabaseBackupBusy ? "disabled" : ""}>${state.supabaseBackupBusy ? "Backing Up..." : "Backup to Supabase"}</button>
          <button type="button" class="danger" id="resetSupabaseTable" ${state.supabaseResetBusy ? "disabled" : ""}>${state.supabaseResetBusy ? "Resetting..." : "Reset Supabase Table"}</button>
        </div>
        <h4>Information included in every Supabase backup</h4>
        <div class="chip-grid">
          ${[
            "Users and PIN hashes", "Client profiles", "Coach/Admin profiles", "App settings", "Admin permissions",
            "Chats", "Notifications", "Assessments and reassessments", "Assessment schedules",
            "Daily check-ins", "Weekly check-ins", "Pain check-ins", "Coach alerts", "Assigned meal plans",
            "Today workout adjustments", "Workout completions", "Client monthly plans", "Progress image records",
            "PIN reset requests", "Admin audit log"
          ].map((label) => `<span class="chip">${label}</span>`).join("")}
        </div>
        <p class="muted">Not included in Supabase: exercise library, workout templates and items, plan offerings, packages, plan templates, and assessment templates. Those stay built into the app and can be changed here in the app files when needed.</p>
        <div class="result-band warning-band">
          <strong>Built-in workout content</strong>
          <span>Workouts, exercises, packages, and plan offerings are fixed app content for now. They will load the same on every device from the app files, while client-specific coaching records come from Supabase.</span>
        </div>
        ${state.syncStatus ? `<div class="result-band"><strong>Sync status</strong><span>${escapeHtml(state.syncStatus)}</span></div>` : ""}
        <div class="result-band warning-band">
          <strong>Automatic multi-device access</strong>
          <span>The Supabase connection is embedded and login now loads the newest backup before checking the PIN. For production use with real client health data, Supabase Auth and Row Level Security still need to be added.</span>
        </div>
      </article>
      <div class="split">
        ${nutritionDemoPanel()}
        <article class="card admin-card ${adminPanelClass("clients")}" id="admin-clients-new">
          <h3>Add Client</h3>
          <div class="form-grid">
            ${adminInput("client", "firstName", "First name")}
            ${adminInput("client", "lastName", "Last name")}
            ${adminInput("client", "email", "Email")}
            ${adminInput("client", "phone", "Phone number")}
            ${adminInput("client", "age", "Age", "number")}
            ${adminInput("client", "goal", "Goal")}
            ${adminSelect("client", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"])}
            ${adminInput("client", "trainingDaysPerWeek", "Training days per week", "number")}
            ${adminSelect("client", "sessionLength", "Session length", [30, 45, 60, 120])}
            ${adminInput("client", "package", "Package")}
            ${adminSelect("client", "assignedCoach", "Assigned coach", store.coaches.map((coach) => ({ value: coach.id, label: coach.name })))}
            ${adminInput("client", "startDate", "Start date", "date")}
            ${adminSelect("client", "status", "Status", ["Active", "Inactive", "Suspended", "Archived"])}
            ${adminInput("client", "emergencyContact", "Emergency contact")}
          </div>
          <label>Notes <textarea data-admin-draft="client:notes">${d.client.notes}</textarea></label>
          <label>Injury / restriction notes <textarea data-admin-draft="client:injuryRestrictionNotes">${d.client.injuryRestrictionNotes}</textarea></label>
          <button class="primary full" id="adminCreateClient">Add New Client</button>
          <div class="admin-list">${store.clients.map((client) => `<div class="admin-row"><span>${client.name} / ${client.status || "Active"} / ${client.packageType || "No package"}</span><button data-open-client-editor="${client.id}">Edit</button><button data-archive-client="${client.id}">Archive</button><button data-delete-client="${client.id}">Delete</button><button data-reset-client-pin="${client.id}">Reset PIN</button></div>`).join("")}</div>
        </article>
        <article class="card admin-card ${adminPanelClass("coaches")}" id="admin-coaches-new">
          <h3>Add Coach</h3>
          <div class="form-grid">
            ${adminInput("coach", "firstName", "First name")}
            ${adminInput("coach", "lastName", "Last name")}
            ${adminInput("coach", "email", "Email")}
            ${adminInput("coach", "phone", "Phone number")}
            ${adminInput("coach", "specialty", "Coach title / specialty")}
            ${adminInput("coach", "emergencyContact", "Emergency contact")}
            ${adminSelect("coach", "status", "Status", ["Active", "Inactive", "Suspended", "Archived"])}
            ${adminInput("coach", "pin", "4-digit PIN", "password")}
            ${adminInput("coach", "confirmPin", "Confirm 4-digit PIN", "password")}
          </div>
          <label>Bio <textarea data-admin-draft="coach:bio">${d.coach.bio}</textarea></label>
          <label><input class="inline-check" data-admin-check="coach:forcePinChange" type="checkbox" ${d.coach.forcePinChange ? "checked" : ""} /> Force PIN change on first login</label>
          <button class="primary full" id="adminCreateCoach">Add New Coach</button>
          <div class="admin-list">
            ${store.coaches.filter((coach) => coach.role !== "Admin").map((coach) => `<div class="admin-row"><span>${coach.name} / ${coach.status || "Active"} / ${coach.specialty || "Coach"} / Emergency: ${coach.emergencyContact || "Not saved"}</span><button data-open-coach-editor="${coach.id}">Edit</button><button data-delete-coach="${coach.id}">Delete</button><button data-reset-coach-pin="${coach.id}">Reset PIN</button></div>`).join("")}
          </div>
        </article>
        <article class="card admin-card ${adminPanelClass("exercises")}" id="admin-exercise-library-new">
          <h3>Add Exercise</h3>
          <div class="form-grid">
            ${adminInput("exercise", "exerciseName", "Exercise name")}
            ${adminSelect("exercise", "category", "Category", ["Strength", "Cardio", "Boxing", "Kickboxing", "Mobility", "Core", "Recovery"])}
            ${adminSelect("exercise", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "General Fitness"])}
            ${adminInput("exercise", "goal", "Goal")}
            ${adminSelect("exercise", "difficulty", "Difficulty", ["Easy", "Medium", "Hard"])}
            ${adminSelect("exercise", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"])}
            ${adminSelect("exercise", "sessionPart", "Session part", ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery"])}
            ${adminInput("exercise", "equipment", "Equipment needed")}
            ${adminInput("exercise", "bodyArea", "Body area")}
            ${adminInput("exercise", "stressArea", "Stress area")}
            ${adminInput("exercise", "sets", "Sets", "number")}
            ${adminInput("exercise", "reps", "Reps", "number")}
            ${adminInput("exercise", "time", "Time")}
            ${adminInput("exercise", "rest", "Rest")}
            ${adminInput("exercise", "contraindications", "Contraindications")}
            ${adminInput("exercise", "videoUrl", "Video URL")}
          </div>
          <label><input class="inline-check" data-admin-check="exercise:lowImpact" type="checkbox" ${d.exercise.lowImpact ? "checked" : ""} /> Low impact</label>
          <label><input class="inline-check" data-admin-check="exercise:recoveryAlternative" type="checkbox" ${d.exercise.recoveryAlternative ? "checked" : ""} /> Recovery alternative</label>
          <label>Coaching cues <textarea data-admin-draft="exercise:coachingCues">${d.exercise.coachingCues}</textarea></label>
          <button class="primary full" id="adminCreateExercise">Add New Exercise</button>
          <input id="adminExerciseExcelInput" class="visually-hidden" type="file" accept=".xlsx,.xls,.csv,.tsv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv,text/tab-separated-values" />
          <button class="success full" id="adminImportExcel">Import Excel Exercise Library</button>
          ${exerciseLibraryAdminList()}
        </article>
        <article class="card admin-card ${adminPanelClass("workouts")}" id="admin-workouts-new">
          <h3>Add Workout Template</h3>
          <div class="form-grid">
            ${adminInput("workout", "workoutName", "Workout name")}
            ${adminSelect("workout", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"])}
            ${adminInput("workout", "goal", "Goal")}
            ${adminSelect("workout", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"])}
            ${adminSelect("workout", "difficulty", "Difficulty", ["Easy", "Medium", "Hard"])}
            ${adminSelect("workout", "sessionLength", "Session length", [30, 45, 60, 120])}
            ${adminSelect("workout", "trainingDayType", "Training day type", ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"])}
            ${adminSelect("workout", "workoutCategory", "Workout category", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "Conditioning", "Recovery", "General Fitness"])}
          </div>
          <label>Description <textarea data-admin-draft="workout:description">${d.workout.description}</textarea></label>
          <button class="primary full" id="adminCreateWorkout">Add New Workout</button>
          <button class="success full" id="adminImportWorkoutRows">Import Workbook Workout Template</button>
          <div class="form-grid compact-form">
            ${adminSelect("workoutItem", "workoutTemplateId", "Workout", store.workoutTemplates.map((workout) => ({ value: workout.id, label: workout.workoutName })))}
            ${adminSelect("workoutItem", "exerciseId", "Exercise", store.exercises.map((exercise) => ({ value: exercise.id, label: exercise.exerciseName || exercise.name })))}
            ${adminSelect("workoutItem", "sessionPart", "Block", ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery"])}
            ${adminInput("workoutItem", "sets", "Sets", "number")}
            ${adminInput("workoutItem", "reps", "Reps", "number")}
            ${adminInput("workoutItem", "time", "Time")}
            ${adminInput("workoutItem", "rest", "Rest")}
            ${adminInput("workoutItem", "rounds", "Rounds", "number")}
          </div>
          <button class="full" id="adminAddWorkoutItem">Add Exercise To Workout</button>
          <div class="admin-list">${store.workoutTemplates.map((workout) => `<div class="admin-row"><span>${workout.workoutName} / ${workout.trainingLevel || workout.planLevel} / ${store.workoutTemplateItems.filter((item) => item.workoutTemplateId === workout.id).length} items</span><button data-open-workout-editor="${workout.id}">Edit</button><button data-archive-template="${workout.id}">Archive</button><button data-delete-template="${workout.id}">Delete</button><button data-reorder-template="${workout.id}">Reorder</button></div>`).join("")}</div>
        </article>
        <article class="card admin-card ${adminPanelClass("offerings")}" id="admin-plan-offerings-new">
          <h3>Add Plan Offering</h3>
          <div class="form-grid">
            ${adminInput("planOffering", "planName", "Plan name")}
            ${adminSelect("planOffering", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"])}
            ${adminInput("planOffering", "goal", "Goal")}
            ${adminSelect("planOffering", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"])}
            ${adminInput("planOffering", "trainingDaysPerWeek", "Training days per week", "number")}
            ${adminSelect("planOffering", "sessionLength", "Session length", [30, 45, 60, 120])}
            ${adminInput("planOffering", "price", "Price", "number")}
            ${adminInput("planOffering", "sessionsIncluded", "Sessions included", "number")}
            ${adminInput("planOffering", "packageType", "Package type")}
          </div>
          <button class="primary full" id="adminCreatePlanOffering">Add New Plan Offering</button>
          <div class="admin-list">${store.planOfferings.map((offering) => `<div class="admin-row"><span>${offering.planName} / ${offering.trainingLevel || offering.planLevel} / $${offering.price}</span><button data-open-offering-editor="${offering.id}">Edit</button><button data-archive-offering="${offering.id}">Archive</button><button data-delete-offering="${offering.id}">Delete</button></div>`).join("")}</div>
        </article>
        <article class="card admin-card ${adminPanelClass("packages")}" id="admin-packages-new">
          <h3>Add Package</h3>
          <div class="form-grid">
            ${adminInput("package", "packageName", "Package name")}
            ${adminSelect("package", "planOfferingId", "Plan offering", store.planOfferings.map((offering) => ({ value: offering.id, label: offering.planName })))}
            ${adminInput("package", "price", "Price", "number")}
            ${adminInput("package", "sessionsIncluded", "Sessions included", "number")}
          </div>
          <button class="primary full" id="adminCreatePackage">Add Package</button>
          <button class="success full" id="adminAssignPackage">Assign Package To Client</button>
          <div class="admin-list">${store.packages.map((pkg) => {
            const connectedOfferings = (pkg.planOfferingIds?.length ? pkg.planOfferingIds : [pkg.planOfferingId].filter(Boolean))
              .map((id) => store.planOfferings.find((offering) => offering.id === id)?.planName)
              .filter(Boolean);
            return `<div class="admin-row"><span>${pkg.packageName} / ${connectedOfferings.length ? connectedOfferings.join(", ") : "No offering"} / $${pkg.price || 0}</span><button data-open-package-editor="${pkg.id}">Edit</button><button data-package-offering="${pkg.id}">Connect Offerings</button><button data-assign-package="${pkg.id}">Assign to Client</button><button data-delete-package="${pkg.id}">Delete</button></div>`;
          }).join("")}</div>
        </article>
        <article class="card admin-card ${adminPanelClass("assessmentTemplates")}" id="admin-assessment-templates-new">
          <h3>Add Assessment Template</h3>
          <div class="form-grid">
            ${adminInput("assessmentTemplate", "templateName", "Template name")}
            ${adminSelect("assessmentTemplate", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"])}
            ${adminInput("assessmentTemplate", "goal", "Goal")}
          </div>
          <h4>Movement tests in this template</h4>
          <div class="chip-grid">
            ${movementTests.map((test) => `<button class="chip-toggle ${d.assessmentTemplate.movementTestIds.includes(test.id) ? "active" : ""}" data-template-test="${test.id}">${test.name}</button>`).join("")}
          </div>
          <button class="primary full" id="adminCreateAssessmentTemplate">Add Assessment Template</button>
          <div class="admin-list">${store.assessmentTemplates.map((template) => `<div class="admin-row"><span>${template.templateName} / ${template.sportFocus || "Any sport"} / ${template.movementTestIds?.length || 0} tests</span><button data-open-assessment-template-editor="${template.id}">Edit</button><button data-delete-assessment-template="${template.id}">Delete</button></div>`).join("")}</div>
        </article>
        <article class="card ${adminPanelClass("security")}">
          <h3>User Passwords</h3>
          <h4>Forgot PIN Requests</h4>
          ${(store.pinResetRequests || []).map((request) => `<div class="admin-row"><span>${request.nameOrEmail || request.phone} / ${request.status}${request.adminMessage ? ` / ${request.adminMessage}` : ""}</span><button data-resolve-pin-request="${request.id}:Email">Reset and Email PIN</button><button data-resolve-pin-request="${request.id}:Text">Reset and Text PIN</button></div>`).join("") || `<p class="muted">No forgot PIN requests yet.</p>`}
          <h4>Manual PIN Controls</h4>
          ${store.users.map((user) => `<div class="admin-row"><span>${user.name} / ${user.role}${user.forcePinChange ? " / must change PIN" : ""}${user.disabled ? " / disabled" : ""}</span><input data-pin-user="${user.id}" inputmode="numeric" placeholder="New numeric PIN" /><button data-save-pin="${user.id}">Set PIN</button><button data-temp-pin="${user.id}">Temp PIN</button><button data-toggle-login="${user.id}">${user.disabled ? "Reactivate" : "Disable"}</button></div>`).join("")}
          <h3>Coaches</h3>
          ${store.coaches.filter((coach) => coach.role !== "Admin").map((coach) => `<div class="admin-row"><span>${coach.name} / Emergency: ${coach.emergencyContact || "Not saved"}</span><input data-coach-emergency="${coach.id}" value="${coach.emergencyContact || ""}" placeholder="Emergency contact" /><button data-save-coach-emergency="${coach.id}">Save Emergency</button><button data-delete-coach="${coach.id}">Delete Coach</button></div>`).join("")}
        </article>
        <article class="card ${adminPanelClass("accountRequests")}">
          <h3>Pending Account Requests</h3>
          <label>Filter
            <select id="accountRequestFilter">${["Pending", "Active", "Locked", "Rejected", "Suspended", "Archived", "Client", "Coach", "All"].map((filter) => `<option value="${filter}" ${state.accountRequestFilter === filter ? "selected" : ""}>${filter}</option>`).join("")}</select>
          </label>
          <div class="admin-list">${getAccountRequests(store, state.currentUser, state.accountRequestFilter).map((user) => `<div class="admin-row"><span>${user.name} / ${user.email || user.phone} / ${user.requestedRole || user.role} / ${user.accountStatus || "Active"}${user.accountLocked ? " / Locked" : ""}</span><button data-review-account="${user.id}">Review</button><button data-account-action="${user.id}:Approve">Unlock / Approve</button><button data-account-action="${user.id}:Reject">Reject</button><button data-account-action="${user.id}:Archive">Archive</button></div>`).join("") || `<div class="empty">No account requests match this filter.</div>`}</div>
        </article>
        <article class="card ${adminPanelClass("clients")}"><h3>Current Client Details</h3>${adminClientDetail(selectedClient())}</article>
        <article class="card ${adminPanelClass("assessmentSchedules")}">
          <div class="section-head compact-head">
            <div>
              <p class="eyebrow">Assessment Scheduling</p>
              <h3>Admin schedule oversight</h3>
              <p class="muted">See every initial assessment and reassessment request. Admin can approve, move it to chat, or open the client/chat to intervene.</p>
            </div>
          </div>
          ${adminAssessmentScheduleBoard()}
        </article>
        <article class="card ${adminPanelClass("chats")}">
          <h3>Intervene in Chat</h3>
          <textarea id="adminIntervention" placeholder="Write an admin note to the coach about this client chat."></textarea>
          <button class="primary full" id="adminInterveneButton">Send Admin Intervention</button>
        </article>
      </div>
      <div class="section-head" id="admin-alerts"><div><p class="eyebrow">All alerts</p><h2>Coach alert audit</h2></div></div>
      <table>
        <thead><tr><th>Client</th><th>Coach</th><th>Reason</th><th>Severity</th><th>Status</th><th>Decision</th><th>Time unresolved</th></tr></thead>
        <tbody>${alerts.map((alert) => {
          const client = store.clients.find((item) => item.id === alert.clientId);
          return `<tr><td>${client?.name}</td><td>${alert.coachId}</td><td>${alert.alertReason}</td><td>${alert.alertSeverity}</td><td>${alert.status}</td><td>${alert.coachDecision || "Pending"}</td><td>${alert.status === "Resolved" ? "Resolved" : "Open"}</td></tr>`;
        }).join("")}</tbody>
      </table>
      <div class="section-head admin-section" id="admin-chats"><div><p class="eyebrow">All chats</p><h2>Chat audit</h2></div></div>
      <div class="card-list">
        ${store.chatMessages.map((message) => {
          const sender = store.users.find((user) => user.id === message.fromUserId);
          const receiver = store.users.find((user) => user.id === message.toUserId);
          const client = store.clients.find((item) => item.id === message.clientId);
          return `<article class="card"><h3>${client?.name}: ${sender?.name} to ${receiver?.name}</h3><p>${escapeHtml(message.body)}</p><small>${new Date(message.createdAt).toLocaleString()}</small></article>`;
        }).join("")}
      </div>
      <div class="section-head admin-section"><div><p class="eyebrow">Audit log</p><h2>Admin actions</h2></div></div>
      <div class="card-list">${store.adminAuditLog.map((entry) => `<article class="card"><p>${entry.action}</p><small>${new Date(entry.createdAt).toLocaleString()}</small></article>`).join("") || `<div class="empty">No admin actions yet.</div>`}</div>
    </section>
  `;
}

function adminEditModal() {
  if (!state.editModal) return "";
  if (["coachWorkoutItem", "coachAlertWorkout"].includes(state.editModal.type) && ["Coach", "Admin"].includes(state.currentUser?.role)) {
    if (state.editModal.type === "coachWorkoutItem") return coachWorkoutItemModal();
    if (state.editModal.type === "coachAlertWorkout") return coachAlertWorkoutModal(state.editModal.id);
  }
  if (state.currentUser?.role !== "Admin") return "";
  if (state.editModal.type === "client") return clientEditModal(state.editModal.id);
  if (state.editModal.type === "exercise") return exerciseEditModal(state.editModal.id);
  if (state.editModal.type === "workout") return workoutEditModal(state.editModal.id);
  if (state.editModal.type === "offering") return planOfferingEditModal(state.editModal.id);
  if (state.editModal.type === "package") return packageEditModal(state.editModal.id);
  if (state.editModal.type === "packageConnect") return packageConnectModal(state.editModal.id);
  if (state.editModal.type === "packageAssign") return packageAssignModal(state.editModal.id);
  if (state.editModal.type === "coach") return coachEditModal(state.editModal.id);
  if (state.editModal.type === "assessmentTemplate") return assessmentTemplateEditModal(state.editModal.id);
  if (state.editModal.type === "account") return accountReviewModal(state.editModal.id);
  return "";
}

function coachWorkoutItemModal() {
  const modal = state.editModal || {};
  const workout = store.monthlyPlanItems.find((item) => item.id === modal.workoutId);
  const item = workout?.items?.[Number(modal.itemIndex)];
  if (!workout || !item) return "";
  const client = store.clients.find((entry) => entry.id === workout.clientId) || selectedClient();
  if (state.currentUser.role === "Coach" && client.coachId !== state.currentUser.linkedId) {
    return `<div class="modal-backdrop"><section class="modal-card"><h2>Not available</h2><p>This client is not assigned to this coach.</p><button id="closeEditModal">Close</button></section></div>`;
  }
  const options = exerciseReplacementOptionsForItem(item, client);
  const smart = smartCoachExerciseReplacement(item, client, workout);
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal">
        <div class="modal-head">
          <div>
            <p class="eyebrow">Coach workout control / ${escapeHtml(client.name)}</p>
            <h2>${escapeHtml(item.name || item.exerciseName || "Workout exercise")}</h2>
            <p class="muted">Change this exercise only for this client's workout. Pick from the exercise library or use Smart Coaching.</p>
          </div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="result-band">
          <strong>Current exercise</strong>
          <span>${escapeHtml(item.sessionPart || "Training")} / ${formatDose(item)}${item.replacementReason ? ` / ${escapeHtml(item.replacementReason)}` : ""}</span>
        </div>
        <div class="form-grid">
          <label>Replace with exercise
            <select id="coachReplacementExercise">
              ${options.map((exercise) => `<option value="${exercise.id}" ${exercise.id === item.exerciseId ? "selected" : ""}>${escapeHtml(exercise.exerciseName || exercise.name)} / ${escapeHtml(exercise.sessionPart || exercise.category || "Training")} / ${escapeHtml(exercise.difficulty || "Medium")}</option>`).join("")}
            </select>
          </label>
          <label>Sets <input id="coachItemSets" type="number" value="${escapeHtml(item.sets || "")}" /></label>
          <label>Reps <input id="coachItemReps" value="${escapeHtml(item.reps || "")}" /></label>
          <label>Round time <input id="coachItemTime" value="${escapeHtml(item.time || "")}" placeholder="3 min, 45 sec, 30s" /></label>
          <label>Rest <input id="coachItemRest" value="${escapeHtml(item.rest || "")}" /></label>
          <label>Rounds <input id="coachItemRounds" type="number" value="${escapeHtml(item.rounds || "")}" /></label>
        </div>
        <label>Coach note <textarea id="coachItemCoachNote">${escapeHtml(item.coachingNotes || item.coachNote || "")}</textarea></label>
        <label>Client-visible note <textarea id="coachItemClientNote">${escapeHtml(item.clientNotes || item.clientNote || "")}</textarea></label>
        <div class="result-band">
          <strong>Smart Coaching suggestion</strong>
          <span>${smart ? `${escapeHtml(smart.exerciseName || smart.name)} - ${escapeHtml(smart.difficulty || "Medium")} ${smart.lowImpact ? "/ low impact" : ""}` : "No smart replacement found for this section."}</span>
        </div>
        <div class="modal-actions sticky-modal-actions">
          <button class="success" data-save-coach-workout-item>Save Changes</button>
          ${smart ? `<button class="ghost" data-smart-coach-replace-item="${smart.id}">Use Smart Coaching Pick</button>` : ""}
          <button class="primary" data-approve-current-adjusted-workout>Approve Adjusted Workout</button>
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
        </div>
      </section>
    </div>
  `;
}

function coachAlertWorkoutModal(alertId) {
  const alert = store.coachAlerts.find((item) => item.id === alertId);
  if (!alert) return "";
  const client = store.clients.find((entry) => entry.id === alert.clientId) || selectedClient();
  if (state.currentUser.role === "Coach" && client.coachId !== state.currentUser.linkedId) {
    return `<div class="modal-backdrop"><section class="modal-card"><h2>Not available</h2><p>This client is not assigned to this coach.</p><button id="closeEditModal">Close</button></section></div>`;
  }
  const workout = alert.suggestedWorkoutSnapshot || { items: [] };
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal">
        <div class="modal-head">
          <div>
            <p class="eyebrow">Coach alert workout editor / ${escapeHtml(client.name)}</p>
            <h2>${escapeHtml(workout.title || "Suggested adjusted workout")}</h2>
            <p class="muted">Edit the app suggestion before approving it for today. This changes today's adjusted workout only.</p>
          </div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="card-list compact-plan-list">
          ${(workout.items || []).map((item, index) => {
            const options = exerciseReplacementOptionsForItem(item, client);
            const smart = smartCoachExerciseReplacement(item, client, workout);
            return `
              <article class="card coach-alert-item-editor">
                <div class="section-head compact-head">
                  <div><p class="eyebrow">${escapeHtml(item.sessionPart || "Training")}</p><h3>${escapeHtml(item.name || item.exerciseName || "Exercise")}</h3></div>
                  ${smart ? `<button class="ghost" data-smart-alert-item="${alert.id}:${index}:${smart.id}">Smart Pick</button>` : ""}
                </div>
                <div class="form-grid compact-form">
                  <label>Replace exercise
                    <select id="alertReplace-${index}">
                      ${options.map((exercise) => `<option value="${exercise.id}" ${exercise.id === item.exerciseId ? "selected" : ""}>${escapeHtml(exercise.exerciseName || exercise.name)} / ${escapeHtml(exercise.difficulty || "Medium")}</option>`).join("")}
                    </select>
                  </label>
                  <label>Sets <input id="alertSets-${index}" value="${escapeHtml(item.sets || "")}" /></label>
                  <label>Reps <input id="alertReps-${index}" value="${escapeHtml(item.reps || "")}" /></label>
                  <label>Round time <input id="alertTime-${index}" value="${escapeHtml(item.time || "")}" /></label>
                  <label>Rest <input id="alertRest-${index}" value="${escapeHtml(item.rest || "")}" /></label>
                  <label>Rounds <input id="alertRounds-${index}" value="${escapeHtml(item.rounds || "")}" /></label>
                </div>
                <label>Coach note <textarea id="alertCoachNote-${index}">${escapeHtml(item.coachingNotes || item.coachNote || "")}</textarea></label>
              </article>
            `;
          }).join("") || `<div class="empty">No workout items available in this suggestion.</div>`}
        </div>
        <label>Coach approval note <textarea id="alertCoachApprovalNote">${escapeHtml(alert.coachNotes || "")}</textarea></label>
        <div class="modal-actions sticky-modal-actions">
          <button class="success" data-save-alert-suggested-workout="${alert.id}">Save Edited Suggestion</button>
          <button class="primary" data-approve-edited-alert-workout="${alert.id}">Approve Edited Workout</button>
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
        </div>
      </section>
    </div>
  `;
}

function exerciseReplacementOptionsForItem(item, client) {
  const section = normalizeText(item.sessionPart || item.replacementCategory || "");
  const currentExercise = store.exercises.find((exercise) => exercise.id === item.exerciseId);
  const currentCategory = normalizeText(currentExercise?.replacementCategory || currentExercise?.category || item.sessionPart || "");
  const restrictions = appValueList(client?.currentRestrictions || client?.restrictions || client?.injuryNotes || []);
  const options = store.exercises.filter((exercise) => {
    if (exercise.active === false || exercise.archived) return false;
    const exerciseSection = normalizeText(exercise.sessionPart || exercise.category || exercise.replacementCategory || "");
    const exerciseCategory = normalizeText(exercise.replacementCategory || exercise.category || "");
    const matchesSection = section && (exerciseSection.includes(section.split(" ")[0]) || section.includes(exerciseSection.split(" ")[0]));
    const matchesCategory = currentCategory && (exerciseCategory.includes(currentCategory.split(" ")[0]) || currentCategory.includes(exerciseCategory.split(" ")[0]));
    if (!matchesSection && !matchesCategory) return false;
    const contraindications = appValueList(exercise.contraindications).map(normalizeText).join(" ");
    if (restrictions.some((restriction) => contraindications.includes(normalizeText(restriction)))) return false;
    return true;
  });
  const fallback = store.exercises.filter((exercise) => exercise.active !== false && !exercise.archived && (exercise.lowImpact || exercise.recoveryAlternative));
  return uniqueById([currentExercise, ...options, ...fallback].filter(Boolean)).slice(0, 80);
}

function smartCoachExerciseReplacement(item, client, workout) {
  const options = exerciseReplacementOptionsForItem(item, client).filter((exercise) => exercise.id !== item.exerciseId);
  const workoutText = normalizeText(`${workout?.adjustmentMode || ""} ${workout?.title || ""} ${item.replacementReason || ""}`);
  const recoveryPreferred = workoutText.includes("recovery") || workoutText.includes("pain") || workoutText.includes("lower");
  return options.find((exercise) => recoveryPreferred && (exercise.lowImpact || exercise.recoveryAlternative))
    || options.find((exercise) => exercise.lowImpact)
    || options.find((exercise) => normalizeText(exercise.difficulty) === "easy")
    || options[0]
    || null;
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function appValueList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value).split(",").map((item) => item.trim()).filter(Boolean);
}

function applyExerciseToWorkoutItem(item, exercise, reason = "Coach replacement") {
  if (!item || !exercise) return item;
  item.exerciseId = exercise.id;
  item.name = exercise.exerciseName || exercise.name;
  item.exerciseName = exercise.exerciseName || exercise.name;
  item.sessionPart = item.sessionPart || exercise.sessionPart || exercise.replacementCategory || "Strength";
  item.difficulty = exercise.difficulty || item.difficulty || "Medium";
  item.equipment = appValueList(exercise.equipment).join(", ");
  item.replacementReason = reason;
  if (!item.sets && exercise.sets) item.sets = exercise.sets;
  if (!item.reps && exercise.reps) item.reps = exercise.reps;
  if (!item.time && exercise.time) item.time = exercise.time;
  if (!item.rest && exercise.rest) item.rest = exercise.rest;
  if (!item.rounds && exercise.rounds) item.rounds = exercise.rounds;
  return item;
}

function saveCoachWorkoutItemModal(approveToday = false) {
  const modal = state.editModal || {};
  const workout = store.monthlyPlanItems.find((item) => item.id === modal.workoutId);
  const item = workout?.items?.[Number(modal.itemIndex)];
  if (!workout || !item) return;
  const exercise = store.exercises.find((entry) => entry.id === document.querySelector("#coachReplacementExercise")?.value);
  if (exercise && exercise.id !== item.exerciseId) applyExerciseToWorkoutItem(item, exercise, "Coach selected replacement");
  item.sets = fieldValue("#coachItemSets");
  item.reps = fieldValue("#coachItemReps");
  item.time = fieldValue("#coachItemTime");
  item.rest = fieldValue("#coachItemRest");
  item.rounds = fieldValue("#coachItemRounds");
  item.coachingNotes = document.querySelector("#coachItemCoachNote")?.value || "";
  item.clientNotes = document.querySelector("#coachItemClientNote")?.value || "";
  syncCoachEditedWorkoutItemToTodayAdjustment(workout, Number(modal.itemIndex));
  workout.coachEditedAt = new Date().toISOString();
  workout.coachEditedByUserId = state.currentUser.id;
  workout.source = "Coach edited workout";
  store.adminAuditLog.push({
    id: `audit_coach_workout_${Date.now()}`,
    adminUserId: state.currentUser.id,
    action: `${state.currentUser.name} edited workout item for ${workout.clientId}`,
    createdAt: new Date().toISOString()
  });
  if (approveToday && workout.workoutDate === today) {
    approveWorkoutSnapshotForToday(workout, "Edited Suggested Change", "Coach approved adjusted workout from workout detail.");
  }
  state.editModal = null;
  window.alert(approveToday ? "Adjusted workout approved for today." : "Workout exercise updated.");
}

function syncCoachEditedWorkoutItemToTodayAdjustment(workout, itemIndex) {
  if (!workout?.clientId || workout.workoutDate !== today) return;
  const editedItem = workout.items?.[itemIndex];
  if (!editedItem) return;
  const latestAdjustment = store.todayWorkoutAdjustments
    .filter((item) => item.clientId === workout.clientId && item.workoutDate === workout.workoutDate)
    .at(-1);
  if (!latestAdjustment) return;
  ["coachApprovedWorkoutSnapshot", "adjustedWorkoutSnapshot", "appSuggestedWorkoutSnapshot"].forEach((key) => {
    const snapshot = latestAdjustment[key];
    if (!snapshot?.items?.length) return;
    const targetIndex = Math.min(itemIndex, snapshot.items.length - 1);
    const targetItem = snapshot.items[targetIndex];
    if (!targetItem) return;
    snapshot.items[targetIndex] = {
      ...targetItem,
      exerciseId: editedItem.exerciseId,
      name: editedItem.name || editedItem.exerciseName,
      exerciseName: editedItem.exerciseName || editedItem.name,
      sessionPart: editedItem.sessionPart,
      difficulty: editedItem.difficulty,
      equipment: editedItem.equipment,
      sets: editedItem.sets,
      reps: editedItem.reps,
      time: editedItem.time,
      rest: editedItem.rest,
      rounds: editedItem.rounds,
      coachingNotes: editedItem.coachingNotes,
      clientNotes: editedItem.clientNotes,
      replacementReason: editedItem.replacementReason || "Coach updated this client's workout"
    };
  });
  latestAdjustment.coachDecision = latestAdjustment.coachDecision || "Edited Suggested Change";
  latestAdjustment.coachNotes = "Coach updated this client's suggested rounds/work.";
  latestAdjustment.approvedAt = new Date().toISOString();
}

function saveAlertSuggestedWorkout(alertId) {
  const alert = store.coachAlerts.find((item) => item.id === alertId);
  if (!alert?.suggestedWorkoutSnapshot) return;
  alert.suggestedWorkoutSnapshot.items = (alert.suggestedWorkoutSnapshot.items || []).map((item, index) => {
    const next = { ...item };
    const exercise = store.exercises.find((entry) => entry.id === document.querySelector(`#alertReplace-${index}`)?.value);
    if (exercise && exercise.id !== next.exerciseId) applyExerciseToWorkoutItem(next, exercise, "Coach edited alert suggestion");
    next.sets = fieldValue(`#alertSets-${index}`);
    next.reps = fieldValue(`#alertReps-${index}`);
    next.time = fieldValue(`#alertTime-${index}`);
    next.rest = fieldValue(`#alertRest-${index}`);
    next.rounds = fieldValue(`#alertRounds-${index}`);
    next.coachingNotes = document.querySelector(`#alertCoachNote-${index}`)?.value || "";
    return next;
  });
  alert.coachNotes = document.querySelector("#alertCoachApprovalNote")?.value || alert.coachNotes || "";
  alert.appRecommendation = `${alert.appRecommendation || "Coach review"} Coach has edited the suggested workout.`;
}

function approveWorkoutSnapshotForToday(workout, decision, note) {
  const client = store.clients.find((item) => item.id === workout.clientId);
  const daily = store.dailyCheckIns.find((item) => item.clientId === workout.clientId && item.workoutDate === workout.workoutDate);
  store.todayWorkoutAdjustments.push({
    id: `today-adjustment_${Date.now()}`,
    clientId: workout.clientId,
    coachId: client?.coachId || state.currentUser.linkedId,
    dailyCheckInId: daily?.id || null,
    monthlyPlanId: workout.monthlyPlanId,
    workoutDate: workout.workoutDate,
    alertId: null,
    originalWorkoutSnapshot: cloneLocal(workout),
    appSuggestedWorkoutSnapshot: cloneLocal(workout),
    coachApprovedWorkoutSnapshot: cloneLocal(workout),
    adjustedWorkoutSnapshot: cloneLocal(workout),
    adjustmentType: workout.adjustmentMode || "Coach Edited",
    adjustmentReason: note,
    coachDecision: decision,
    coachNotes: note,
    approvedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  });
}

function cloneLocal(value) {
  return JSON.parse(JSON.stringify(value || null));
}

function fieldValue(selector) {
  const field = document.querySelector(selector);
  return field ? field.value.trim() : "";
}

function createAssessmentScheduleCoachAlert(schedule, reason = "Assessment schedule updated") {
  if (!schedule?.coachId) return null;
  const existing = store.coachAlerts.find((alert) =>
    alert.alertType === "Assessment Schedule" &&
    alert.scheduleId === schedule.id &&
    alert.status === "New" &&
    alert.alertReason === reason
  );
  if (existing) return existing;
  const alert = {
    id: `alert_schedule_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    clientId: schedule.clientId,
    coachId: schedule.coachId,
    dailyCheckInId: null,
    scheduleId: schedule.id,
    alertType: "Assessment Schedule",
    alertSeverity: schedule.status === "Needs Chat" ? "Moderate" : "Mild",
    alertReason: reason,
    scheduleSummary: `${schedule.assessmentType || "Assessment"}: ${schedule.proposedDate || "date needed"} at ${schedule.proposedTime || "time needed"} / ${schedule.status || "Pending"}`,
    painSummary: null,
    appRecommendation: schedule.status === "Needs Chat"
      ? "Open chat with the client to agree on the assessment time."
      : "Review the assessment appointment and follow up if needed.",
    suggestedAdjustmentType: "Schedule Review",
    originalWorkoutSnapshot: null,
    suggestedWorkoutSnapshot: null,
    status: "New",
    coachDecision: null,
    coachNotes: "",
    createdAt: new Date().toISOString(),
    resolvedAt: null
  };
  store.coachAlerts.push(alert);
  return alert;
}

function exerciseLibraryAdminList() {
  const f = state.exerciseLibraryFilters;
  const categories = ["All", ...uniqueValues(store.exercises.map((exercise) => exercise.category))];
  const sports = ["All", ...uniqueValues(store.exercises.map((exercise) => exercise.sportFocus))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Pro"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const parts = ["All", "Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery"];
  const filtered = store.exercises.filter((exercise) => {
    const text = `${exercise.exerciseName || exercise.name} ${exercise.description || ""} ${exercise.category || ""}`.toLowerCase();
    if (f.search && !text.includes(f.search.toLowerCase())) return false;
    if (f.category !== "All" && exercise.category !== f.category) return false;
    if (f.sportFocus !== "All" && exercise.sportFocus !== f.sportFocus) return false;
    if (f.trainingLevel !== "All" && (exercise.trainingLevel || exercise.planLevel) !== f.trainingLevel) return false;
    if (f.difficulty !== "All" && exercise.difficulty !== f.difficulty) return false;
    if (f.sessionPart !== "All" && exercise.sessionPart !== f.sessionPart) return false;
    if (f.status === "Active" && (exercise.active === false || exercise.archived)) return false;
    if (f.status === "Archived" && !exercise.archived) return false;
    if (f.equipment && !listValue(exercise.equipment).toLowerCase().includes(f.equipment.toLowerCase())) return false;
    if (f.bodyArea && !listValue(exercise.bodyArea).toLowerCase().includes(f.bodyArea.toLowerCase())) return false;
    return true;
  });
  return `
    <div class="section-title"><h3>Workout Library Exercises</h3><span>${filtered.length} shown / ${store.exercises.length} total</span></div>
    <div class="form-grid compact-form">
      <label>Search exercises<input data-exercise-filter="search" value="${escapeHtml(f.search)}" placeholder="Search by name or notes" /></label>
      ${filterSelect("category", "Category", categories, f.category)}
      ${filterSelect("sportFocus", "Sport focus", sports, f.sportFocus)}
      ${filterSelect("trainingLevel", "Training level", levels, f.trainingLevel)}
      ${filterSelect("difficulty", "Difficulty", difficulties, f.difficulty)}
      <label>Equipment<input data-exercise-filter="equipment" value="${escapeHtml(f.equipment)}" placeholder="Bands, bag, dumbbells" /></label>
      <label>Body area<input data-exercise-filter="bodyArea" value="${escapeHtml(f.bodyArea)}" placeholder="Shoulder, knee, core" /></label>
      ${filterSelect("sessionPart", "Session part", parts, f.sessionPart)}
      ${filterSelect("status", "Status", ["Active", "Archived", "All"], f.status)}
    </div>
    <div class="admin-list exercise-library-list">
      ${filtered.map((exercise) => `
        <div class="admin-row clickable-row exercise-row" data-open-exercise-row="${exercise.id}" role="button" tabindex="0">
          <span><strong>${exercise.exerciseName || exercise.name}</strong><br><small>${exercise.category || "Uncategorized"} / ${exercise.trainingLevel || exercise.planLevel || "No level"}${exercise.recoveryAlternative ? " / Recovery alt" : ""}</small></span>
          <small>${exercise.sessionPart || "Any block"} / ${exercise.difficulty || "No difficulty"} / ${exercise.archived ? "Archived" : "Active"}</small>
          <button class="primary" data-open-exercise-editor="${exercise.id}">View / Edit</button>
        </div>
      `).join("") || `<div class="empty">No exercises match these filters.</div>`}
    </div>
  `;
}

function filterSelect(key, label, options, value) {
  return `<label>${label}<select data-exercise-filter="${key}">${options.map((option) => `<option value="${option}" ${String(option) === String(value) ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function openExercisePopup(exerciseId, options = {}) {
  state.editModal = {
    type: "exercise",
    id: exerciseId,
    workoutItemId: options.workoutItemId || null,
    returnWorkoutId: options.returnWorkoutId || null
  };
  state.exercisePopupMode = "view";
  state.exercisePopupTab = "Overview";
  state.editModalDirty = false;
  store.adminAuditLog.push({
    id: `audit_${Date.now()}`,
    adminUserId: state.currentUser.id,
    action: options.workoutItemId ? `Opened exercise popup from workout item ${options.workoutItemId}` : `Opened exercise popup for ${exerciseId}`,
    createdAt: new Date().toISOString()
  });
}

function clientEditModal(clientId) {
  const client = store.clients.find((item) => item.id === clientId);
  if (!client) return "";
  const user = store.users.find((item) => item.role === "Client" && item.linkedId === clientId);
  const activePlan = store.monthlyPlans.find((plan) => plan.clientId === clientId && plan.status === "Active" && plan.approved);
  const latestAssessment = store.assessments.filter((item) => item.clientId === clientId).at(-1);
  const latestReassessment = store.assessments.filter((item) => item.clientId === clientId && item.assessmentType === "Reassessment").at(-1);
  const tabs = ["Profile", "Coach & Access", "Program", "Package", "Workouts", "Assessments", "Notes"];
  const tabClass = (tab) => tab === state.clientEditTab ? "client-edit-panel active-client-edit-panel" : "client-edit-panel hidden";
  const currentPackageId = client.packageId || store.packages.find((pkg) => pkg.packageName === client.packageType)?.id || "";
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal client-edit-modal">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Client</p><h2>${escapeHtml(client.name)}</h2><p class="muted">Save changes without leaving the Admin dashboard.</p></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="tab-row client-edit-tabs">
          ${tabs.map((tab) => `<button class="${state.clientEditTab === tab ? "active" : ""}" data-client-edit-tab="${tab}">${tab}</button>`).join("")}
        </div>
        <div class="${tabClass("Profile")}">
          <div class="form-grid">
            ${editInput("client", "firstName", "First name", client.firstName || user?.firstName || client.name.split(" ")[0] || "")}
            ${editInput("client", "lastName", "Last name", client.lastName || user?.lastName || client.name.split(" ").slice(1).join(" ") || "")}
            ${editInput("client", "name", "Full name", client.name || "")}
            ${editInput("client", "email", "Email", client.email || user?.email || "")}
            ${editInput("client", "phone", "Phone", client.phone || user?.phone || "")}
            ${editInput("client", "age", "Age", client.age || "", "number")}
            ${editSelect("client", "sex", "Sex", ["Female", "Male", "Prefer not to say"], client.sex || "Prefer not to say")}
            ${editInput("client", "heightInches", "Height in inches", client.heightInches || "", "number")}
            ${editInput("client", "currentWeightLb", "Current weight lb", client.currentWeightLb || client.weight || "", "number")}
            ${editInput("client", "goalWeightLb", "Goal weight lb", client.goalWeightLb || "", "number")}
            ${editInput("client", "dateOfBirth", "Date of birth", client.dateOfBirth || "", "date")}
            ${editInput("client", "emergencyContact", "Emergency contact", client.emergencyContact || "")}
            ${editSelect("client", "status", "Status", ["Pending", "Active", "Locked", "Suspended", "Archived"], client.status || user?.accountStatus || "Active")}
          </div>
          <label>Medical problems / health conditions <textarea data-edit-client-field="medicalProblems">${escapeHtml(client.medicalProblems || client.medicalConditions || "")}</textarea></label>
          <label>Medications or medical notes <textarea data-edit-client-field="medications">${escapeHtml(client.medications || "")}</textarea></label>
          <label>Allergies <textarea data-edit-client-field="allergies">${escapeHtml(client.allergies || "")}</textarea></label>
          <label>Doctor restrictions or clearance notes <textarea data-edit-client-field="medicalRestrictions">${escapeHtml(client.medicalRestrictions || "")}</textarea></label>
          <div class="admin-row avatar-row">
            ${avatar(client.profileImageUrl || user?.profileImageUrl, client.name)}
            <span>Profile image can still be managed from Admin Overview or the client profile controls.</span>
          </div>
        </div>
        <div class="${tabClass("Coach & Access")}">
          <div class="form-grid">
            ${editSelect("client", "coachId", "Assigned coach", [{ value: "", label: "No coach assigned" }, ...store.coaches.filter((coach) => coach.role !== "Admin").map((coach) => ({ value: coach.id, label: coach.name }))], client.coachId || "")}
            ${editSelect("client", "accountLocked", "Account access", [{ value: "false", label: "Unlocked" }, { value: "true", label: "Locked" }], String(Boolean(user?.accountLocked)))}
            ${editSelect("client", "profileLocked", "Profile editing", [{ value: "false", label: "Unlocked" }, { value: "true", label: "Locked" }], String(Boolean(client.profileLocked || user?.profileLocked)))}
            <label>Set new 4-digit PIN <input id="clientModalNewPin" inputmode="numeric" maxlength="4" type="password" placeholder="New PIN" /></label>
            <label>Confirm new PIN <input id="clientModalConfirmPin" inputmode="numeric" maxlength="4" type="password" placeholder="Confirm PIN" /></label>
          </div>
          <div class="modal-actions left-actions">
            <button id="clientModalSetPin" data-client-id="${client.id}">Set Client PIN</button>
            <button id="clientModalResetPin" data-client-id="${client.id}">Reset 4-digit PIN</button>
            <button id="clientModalToggleLock" data-client-id="${client.id}">${user?.accountLocked ? "Unlock Account" : "Lock Account"}</button>
            <button id="clientModalToggleProfileLock" data-client-id="${client.id}">${client.profileLocked || user?.profileLocked ? "Unlock Profile Editing" : "Lock Profile Editing"}</button>
          </div>
        </div>
        <div class="${tabClass("Program")}">
          <div class="result-band"><strong>Program warning</strong><span>Changing program details may require a new monthly plan. Workout history will stay saved.</span></div>
          <div class="form-grid">
            ${editInput("client", "programName", "Program name", client.programName || client.packageType || "")}
            ${editSelect("client", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"], client.sportFocus)}
            ${editInput("client", "goal", "Goal", client.goal || "")}
            ${editSelect("client", "currentTrainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"], client.currentTrainingLevel || "Beginner")}
            ${editSelect("client", "trainingDaysPerWeek", "Training days per week", [2, 3, 4, 5], client.trainingDaysPerWeek)}
            ${editSelect("client", "sessionLength", "Session length", [30, 45, 60, 120], client.sessionLength)}
            ${editInput("client", "startDate", "Start date", client.startDate || "", "date")}
          </div>
          <label>Restrictions <textarea data-edit-client-field="currentRestrictions">${escapeHtml(listValue(client.currentRestrictions))}</textarea></label>
          <label>Equipment access <textarea data-edit-client-field="equipmentAvailable">${escapeHtml(listValue(client.equipmentAvailable))}</textarea></label>
          <label>Injury notes <textarea data-edit-client-field="injuryNotes">${escapeHtml(client.injuryNotes || client.injuryRestrictionNotes || "")}</textarea></label>
        </div>
        <div class="${tabClass("Package")}">
          <div class="result-band"><strong>Package warning</strong><span>This package change may affect workout days per week.</span></div>
          <div class="form-grid">
            ${editSelect("client", "packageId", "Package", [{ value: "", label: "No package" }, ...store.packages.map((pkg) => ({ value: pkg.id, label: pkg.packageName }))], currentPackageId)}
            ${editSelect("client", "planOfferingId", "Plan offering", [{ value: "", label: "No plan offering" }, ...store.planOfferings.map((offering) => ({ value: offering.id, label: offering.planName }))], client.planOfferingId || store.packages.find((pkg) => pkg.id === currentPackageId)?.planOfferingId || "")}
            ${editInput("client", "sessionsPurchased", "Sessions purchased", client.sessionsPurchased || client.sessionsIncluded || "", "number")}
            ${editInput("client", "sessionsUsed", "Sessions used", client.sessionsUsed || "", "number")}
            ${editInput("client", "sessionsRemaining", "Sessions remaining", client.sessionsRemaining || "", "number")}
            ${editSelect("client", "packageStatus", "Package status", ["Active", "Paused", "Completed", "Archived"], client.packageStatus || "Active")}
            ${editSelect("client", "paymentStatus", "Payment status", ["Not tracked", "Paid", "Partial", "Past Due"], client.paymentStatus || "Not tracked")}
          </div>
        </div>
        <div class="${tabClass("Workouts")}">
          <div class="grid-3 stat-strip">
            ${infoCard("Active plan", activePlan?.month || "None")}
            ${infoCard("Workout history", store.monthlyPlanItems.filter((item) => item.clientId === client.id).length)}
            ${infoCard("Draft plans", store.monthlyPlans.filter((plan) => plan.clientId === client.id && plan.status === "Draft").length)}
          </div>
          <div class="form-grid">
            ${modalSelect("clientModalPlanOfferingForDraft", "Plan offering for new Draft", store.planOfferings.map((offering) => ({ value: offering.id, label: offering.planName })), client.planOfferingId || store.planOfferings[0]?.id)}
            ${modalSelect("clientModalWorkoutTemplate", "Assign workout template", store.workoutTemplates.map((template) => ({ value: template.id, label: template.workoutName })), "")}
          </div>
          <div class="modal-actions left-actions">
            <button id="clientModalGenerateDraft" data-client-id="${client.id}">Generate New Draft Plan</button>
            ${activePlan ? `<button id="clientModalArchivePlan" data-plan-id="${activePlan.id}">Archive Current Plan</button>` : ""}
            <button id="clientModalWorkoutWarning">Change Future Workouts Only</button>
          </div>
          <div class="admin-list modal-list">
            ${store.monthlyPlans.filter((plan) => plan.clientId === client.id).map((plan) => `<div class="admin-row"><span>${plan.month} / ${plan.status} / ${plan.trainingLevel || plan.planLevel}</span></div>`).join("") || `<div class="empty">No monthly plan history yet.</div>`}
          </div>
        </div>
        <div class="${tabClass("Assessments")}">
          <div class="grid-3 stat-strip">
            ${infoCard("Latest assessment", latestAssessment?.assessmentDate || client.lastAssessmentDate || "None")}
            ${infoCard("Latest result", latestAssessment?.recommendedTrainingLevel || latestAssessment?.suggestedStartLevel || "None")}
            ${infoCard("Latest reassessment", latestReassessment?.assessmentDate || "None")}
          </div>
          <div class="form-grid">
            ${editInput("client", "nextReassessmentDate", "Next reassessment due", client.nextReassessmentDate || "", "date")}
            ${editSelect("client", "reassessmentFrequency", "Reassessment frequency", ["Monthly", "Every 6 Weeks", "Quarterly", "As Needed"], client.reassessmentFrequency || "Monthly")}
          </div>
          <div class="modal-actions left-actions">
            <button id="clientModalScheduleAssessment" data-client-id="${client.id}">Schedule Assessment</button>
            <button id="clientModalScheduleReassessment" data-client-id="${client.id}">Schedule Reassessment</button>
            <button id="clientModalViewHistory" data-client-id="${client.id}">View History</button>
          </div>
        </div>
        <div class="${tabClass("Notes")}">
          <label>Admin notes <textarea data-edit-client-field="notes">${escapeHtml(client.notes || "")}</textarea></label>
          <label>Coach notes summary <textarea data-edit-client-field="coachNotesSummary">${escapeHtml(client.coachNotesSummary || "")}</textarea></label>
          <label>Client notes summary <textarea data-edit-client-field="clientNotesSummary">${escapeHtml(client.clientNotesSummary || client.progressNotes || "")}</textarea></label>
          <label>Injury / restriction notes <textarea data-edit-client-field="injuryRestrictionNotes">${escapeHtml(client.injuryRestrictionNotes || client.injuryNotes || "")}</textarea></label>
        </div>
        <div class="modal-actions sticky-modal-actions">
          <span class="muted" id="clientEditSuccess">${state.editModal?.success || ""}</span>
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="saveClientModal" data-client-id="${client.id}">Save Changes</button>
        </div>
      </section>
    </div>
  `;
}

function coachEditModal(coachId) {
  const coach = store.coaches.find((item) => item.id === coachId);
  if (!coach) return "";
  const user = store.users.find((item) => item.role === "Coach" && item.linkedId === coachId);
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Coach</p><h2>${escapeHtml(coach.name)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="form-grid">
          ${editInput("coach", "name", "Full name", coach.name)}
          ${editInput("coach", "firstName", "First name", coach.firstName || user?.firstName || "")}
          ${editInput("coach", "lastName", "Last name", coach.lastName || user?.lastName || "")}
          ${editInput("coach", "email", "Email", coach.email || user?.email || "")}
          ${editInput("coach", "phone", "Phone number", coach.phone || user?.phone || "")}
          ${editInput("coach", "specialty", "Coach title / specialty", coach.specialty || "")}
          ${editInput("coach", "emergencyContact", "Emergency contact", coach.emergencyContact || "")}
          ${editSelect("coach", "status", "Status", ["Active", "Inactive", "Suspended", "Archived"], coach.status || user?.accountStatus || "Active")}
          ${editSelect("coach", "profileLocked", "Coach profile page", [{ value: "false", label: "Unlocked" }, { value: "true", label: "Locked" }], String(Boolean(coach.profileLocked || user?.profileLocked)))}
          <label>Set new 4-digit PIN <input id="coachModalNewPin" inputmode="numeric" maxlength="4" type="password" placeholder="New PIN" /></label>
          <label>Confirm new PIN <input id="coachModalConfirmPin" inputmode="numeric" maxlength="4" type="password" placeholder="Confirm PIN" /></label>
        </div>
        <label>Bio <textarea data-edit-coach-field="bio">${escapeHtml(coach.bio || "")}</textarea></label>
        <div class="modal-actions">
          <button id="coachModalSetPin" data-coach-id="${coach.id}">Set Coach PIN</button>
          <button id="coachModalResetPin" data-coach-id="${coach.id}">Reset Coach PIN</button>
          <button id="coachModalToggleProfileLock" data-coach-id="${coach.id}">${coach.profileLocked || user?.profileLocked ? "Unlock Coach Profile" : "Lock Coach Profile"}</button>
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="saveCoachModal" data-coach-id="${coach.id}">Save Coach</button>
        </div>
      </section>
    </div>
  `;
}

function planOfferingEditModal(offeringId) {
  const offering = store.planOfferings.find((item) => item.id === offeringId);
  if (!offering) return "";
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Plan Offering</p><h2>${escapeHtml(offering.planName)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="form-grid">
          ${editInput("offering", "planName", "Plan name", offering.planName)}
          ${editSelect("offering", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"], offering.sportFocus)}
          ${editInput("offering", "goal", "Goal", offering.goal)}
          ${editSelect("offering", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"], offering.trainingLevel || offering.planLevel)}
          ${editInput("offering", "trainingDaysPerWeek", "Training days per week", offering.trainingDaysPerWeek, "number")}
          ${editSelect("offering", "sessionLength", "Session length", [30, 45, 60, 120], offering.sessionLength)}
          ${editInput("offering", "price", "Price", offering.price, "number")}
          ${editInput("offering", "sessionsIncluded", "Sessions included", offering.sessionsIncluded, "number")}
          ${editInput("offering", "packageType", "Package type", offering.packageType)}
        </div>
        <label>Description <textarea data-edit-offering-field="description">${escapeHtml(offering.description || "")}</textarea></label>
        <label>Connected workout templates
          <select id="editOfferingTemplates" multiple size="6">
            ${store.workoutTemplates.map((template) => `<option value="${template.id}" ${(offering.workoutTemplateIds || []).includes(template.id) ? "selected" : ""}>${template.workoutName}</option>`).join("")}
          </select>
        </label>
        <div class="modal-actions">
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="saveOfferingModal" data-offering-id="${offering.id}">Save Plan Offering</button>
        </div>
      </section>
    </div>
  `;
}

function packageEditModal(packageId) {
  const pkg = store.packages.find((item) => item.id === packageId);
  if (!pkg) return "";
  const connectedIds = pkg.planOfferingIds?.length ? pkg.planOfferingIds : [pkg.planOfferingId].filter(Boolean);
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Package</p><h2>${escapeHtml(pkg.packageName)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="form-grid">
          ${editInput("package", "packageName", "Package name", pkg.packageName)}
          ${editInput("package", "price", "Price", pkg.price || 0, "number")}
          ${editInput("package", "sessionsIncluded", "Sessions included", pkg.sessionsIncluded || 0, "number")}
          ${editSelect("package", "active", "Status", [{ value: "true", label: "Active" }, { value: "false", label: "Inactive" }], String(pkg.active !== false))}
        </div>
        <label>Main plan offering
          <select data-edit-package-field="planOfferingId">
            <option value="">No main offering</option>
            ${store.planOfferings.map((offering) => `<option value="${offering.id}" ${offering.id === pkg.planOfferingId ? "selected" : ""}>${offering.planName}</option>`).join("")}
          </select>
        </label>
        <label>Connected plan offerings
          <select id="editPackageOfferings" multiple size="8">
            ${store.planOfferings.map((offering) => `<option value="${offering.id}" ${connectedIds.includes(offering.id) ? "selected" : ""}>${offering.planName}</option>`).join("")}
          </select>
        </label>
        <p class="muted">The first selected offering becomes the main offering used for price, sessions, and client assignment.</p>
        <div class="modal-actions">
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="savePackageModal" data-package-id="${pkg.id}">Save Package</button>
        </div>
      </section>
    </div>
  `;
}

function packageConnectModal(packageId) {
  const pkg = store.packages.find((item) => item.id === packageId);
  if (!pkg) return "";
  const connectedIds = pkg.planOfferingIds?.length ? pkg.planOfferingIds : [pkg.planOfferingId].filter(Boolean);
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card">
        <div class="modal-head">
          <div><p class="eyebrow">Connect Plan Offerings</p><h2>${escapeHtml(pkg.packageName)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <p class="muted">Select one or more plan offerings this package can use. The first selected offering controls the package price and sessions.</p>
        <label>Plan offerings
          <select id="connectPackageOfferings" multiple size="12">
            ${store.planOfferings.map((offering) => `<option value="${offering.id}" ${connectedIds.includes(offering.id) ? "selected" : ""}>${offering.planName} / ${offering.trainingLevel || offering.planLevel} / $${offering.price || 0}</option>`).join("")}
          </select>
        </label>
        <div class="modal-actions">
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="savePackageOfferingsModal" data-package-id="${pkg.id}">Save Connected Offerings</button>
        </div>
      </section>
    </div>
  `;
}

function packageAssignModal(packageId = "") {
  const pkg = store.packages.find((item) => item.id === packageId) || store.packages[0];
  const connectedOfferingIds = pkg?.planOfferingIds?.length ? pkg.planOfferingIds : [pkg?.planOfferingId].filter(Boolean);
  const connectedOfferings = connectedOfferingIds
    .map((id) => store.planOfferings.find((offering) => offering.id === id))
    .filter(Boolean);
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card">
        <div class="modal-head">
          <div><p class="eyebrow">Assign Package</p><h2>Package to client</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="form-grid">
          <label>Package
            <select id="assignPackageId">
              ${store.packages.map((item) => `<option value="${item.id}" ${item.id === pkg?.id ? "selected" : ""}>${item.packageName}</option>`).join("")}
            </select>
          </label>
          <label>Client
            <select id="assignPackageClientId">
              ${store.clients.map((client) => `<option value="${client.id}" ${client.id === state.clientId ? "selected" : ""}>${client.name}</option>`).join("")}
            </select>
          </label>
          <label>Plan offering for this client
            <select id="assignPackageOfferingId">
              ${connectedOfferings.map((offering) => `<option value="${offering.id}" ${offering.id === pkg?.planOfferingId ? "selected" : ""}>${offering.planName} / ${offering.trainingLevel || offering.planLevel} / $${offering.price || 0}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="result-band"><strong>After assigning</strong><span>The selected client gets this package and the exact connected plan offering chosen above.</span></div>
        <div class="modal-actions">
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="saveAssignPackageModal">Assign Package</button>
        </div>
      </section>
    </div>
  `;
}

function assessmentTemplateEditModal(templateId) {
  const template = store.assessmentTemplates.find((item) => item.id === templateId);
  if (!template) return "";
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Assessment Template</p><h2>${escapeHtml(template.templateName)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="form-grid">
          ${editInput("assessmentTemplate", "templateName", "Template name", template.templateName)}
          ${editSelect("assessmentTemplate", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"], template.sportFocus)}
          ${editInput("assessmentTemplate", "goal", "Goal", template.goal)}
        </div>
        <h3>Movement tests in this template</h3>
        <div class="chip-grid">
          ${movementTests.map((test) => `<button class="chip-toggle ${(template.movementTestIds || []).includes(test.id) ? "active" : ""}" data-edit-template-test="${test.id}">${test.name}</button>`).join("")}
        </div>
        <div class="modal-actions">
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="saveAssessmentTemplateModal" data-template-id="${template.id}">Save Assessment Template</button>
        </div>
      </section>
    </div>
  `;
}

function accountReviewModal(userId) {
  const user = store.users.find((item) => item.id === userId);
  if (!user) return "";
  const details = user.requestDetails || {};
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card">
        <div class="modal-head">
          <div><p class="eyebrow">Account Request Review</p><h2>${escapeHtml(user.name)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="grid-3 stat-strip">
          ${infoCard("Requested role", user.requestedRole || user.role)}
          ${infoCard("Status", `${user.accountStatus || "Active"}${user.accountLocked ? " / Locked" : ""}`)}
          ${infoCard("Profile", user.profileLocked ? "Locked" : "Unlocked")}
        </div>
        <div class="split">
          <p><strong>Email:</strong> ${user.email || "None"}</p>
          <p><strong>Phone:</strong> ${user.phone || "None"}</p>
          <p><strong>Note:</strong> ${user.requestNote || "No note"}</p>
          <p><strong>Goal:</strong> ${details.goal || "None"}</p>
          <p><strong>Sport focus:</strong> ${details.sportFocus || "None"}</p>
          <p><strong>Coach info:</strong> ${details.coachNameIfKnown || details.coachTitle || "None"}</p>
          <p><strong>Experience:</strong> ${details.experience || "None"}</p>
          <p><strong>Reason:</strong> ${details.coachRequestReason || "None"}</p>
        </div>
        <label>Requested role
          <select id="reviewRequestedRole">
            ${["Client", "Coach"].map((role) => `<option value="${role}" ${(user.requestedRole || user.role) === role ? "selected" : ""}>${role}</option>`).join("")}
          </select>
        </label>
        <label>Assign coach if Client
          <select id="reviewCoachId">${store.coaches.filter((coach) => coach.role !== "Admin").map((coach) => `<option value="${coach.id}">${coach.name}</option>`).join("")}</select>
        </label>
        <label><input class="inline-check" id="reviewUnlockProfile" type="checkbox" /> Unlock login and profile editing</label>
        <div class="modal-actions">
          <button data-account-action="${user.id}:Approve">Approve and Unlock Account</button>
          <button data-account-action="${user.id}:Reject">Reject Account</button>
          <button data-account-action="${user.id}:Archive">Archive Account</button>
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
        </div>
      </section>
    </div>
  `;
}

function exerciseEditModal(exerciseId) {
  const exercise = store.exercises.find((item) => item.id === exerciseId);
  if (!exercise) return "";
  const workoutItem = state.editModal?.workoutItemId ? store.workoutTemplateItems.find((item) => item.id === state.editModal.workoutItemId) : null;
  const usage = exerciseUsageSummary(exerciseId);
  if (state.exercisePopupMode === "edit") return exerciseEditModeModal(exercise, workoutItem, usage);
  const tabs = ["Overview", "Instructions", "Safety", "Alternatives", "Video", "Admin Notes"];
  const tabClass = (tab) => tab === state.exercisePopupTab ? "client-edit-panel active-client-edit-panel" : "client-edit-panel hidden";
  const detail = (label, value) => `<div><dt>${label}</dt><dd>${escapeHtml(listValue(value) || "Not set")}</dd></div>`;
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal exercise-detail-modal">
        <div class="modal-head">
          <div><p class="eyebrow">Exercise Library Record</p><h2>${escapeHtml(exercise.exerciseName || exercise.name)}</h2><p class="muted">View details first. Use Edit only when you want to change the master library record.</p></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        ${workoutItem ? `<div class="result-band"><strong>Workout item context</strong><span>Editing the Exercise Library record may affect future workouts. Editing this workout item only affects this workout.</span></div>` : ""}
        ${usage.used ? `<div class="result-band"><strong>Connected exercise</strong><span>This exercise is connected to existing workouts or history. Archive is recommended instead of delete.</span></div>` : ""}
        <div class="tab-row client-edit-tabs">
          ${tabs.map((tab) => `<button class="${state.exercisePopupTab === tab ? "active" : ""}" data-exercise-popup-tab="${tab}">${tab}</button>`).join("")}
        </div>
        <div class="${tabClass("Overview")}">
          <div class="grid-3 stat-strip">
            ${infoCard("Training level", exercise.trainingLevel || exercise.planLevel || "Not set")}
            ${infoCard("Difficulty", exercise.difficulty || "Not set")}
            ${infoCard("Status", exercise.archived || exercise.active === false ? "Archived" : "Active")}
          </div>
          <p>${escapeHtml(exercise.description || "No description added yet.")}</p>
          <dl class="detail-grid">
            ${detail("Purpose", exercise.purpose || exercise.goal)}
            ${detail("Category", exercise.category)}
            ${detail("Sport focus", exercise.sportFocus)}
            ${detail("Goal", exercise.goal)}
            ${detail("Recovery alternative", exercise.recoveryAlternative ? "Yes" : "No")}
            ${detail("Session part", exercise.sessionPart)}
            ${detail("Equipment", exercise.equipment)}
            ${detail("Body area", exercise.bodyArea)}
            ${detail("Stress area", exercise.stressArea)}
            ${detail("Low impact", exercise.lowImpact ? "Yes" : "No")}
            ${detail("Sets", exercise.sets)}
            ${detail("Reps", exercise.reps)}
            ${detail("Time", exercise.time)}
            ${detail("Rest", exercise.rest)}
            ${detail("Rounds", exercise.rounds)}
          </dl>
        </div>
        <div class="${tabClass("Instructions")}">
          <dl class="detail-grid">
            ${detail("Setup", exercise.setupInstructions)}
            ${detail("Step-by-step", exercise.howToPerform || exercise.stepByStepInstructions || exercise.instructions)}
            ${detail("Breathing", exercise.breathingInstructions)}
            ${detail("Tempo / pace", exercise.tempo || exercise.pace)}
            ${detail("Coaching cues", exercise.coachingCues)}
            ${detail("Common mistakes", exercise.commonMistakes)}
          </dl>
        </div>
        <div class="${tabClass("Safety")}">
          <dl class="detail-grid">
            ${detail("Safety warnings", exercise.safetyWarnings)}
            ${detail("Pain warnings", exercise.painWarnings)}
            ${detail("Contraindications", exercise.contraindications)}
            ${detail("Stress area", exercise.stressArea)}
            ${detail("Low impact", exercise.lowImpact ? "Yes" : "No")}
          </dl>
        </div>
        <div class="${tabClass("Alternatives")}">
          <dl class="detail-grid">
            ${detail("Regression / easier version", exercise.regressionExerciseId || exercise.easierVersion)}
            ${detail("Progression / harder version", exercise.progressionExerciseId || exercise.harderVersion)}
            ${detail("Low-impact option", exercise.lowImpactOption)}
            ${detail("Safe alternative", exercise.safeAlternativeExerciseId || exercise.safeAlternative)}
            ${detail("Replacement category", exercise.replacementCategory)}
          </dl>
        </div>
        <div class="${tabClass("Video")}">
          ${exercise.imageUrl ? `<img class="exercise-preview-image" src="${escapeHtml(exercise.imageUrl)}" alt="${escapeHtml(exercise.exerciseName || exercise.name)} preview" />` : ""}
          ${youtubeEmbed(exercise.youtubeUrl || exercise.videoUrl)}
          ${exercise.youtubeUrl ? `<a class="button-link" target="_blank" rel="noreferrer" href="${escapeHtml(exercise.youtubeUrl)}">Open YouTube</a>` : ""}
          ${exercise.videoUrl ? `<a class="button-link" target="_blank" rel="noreferrer" href="${escapeHtml(exercise.videoUrl)}">Watch Video</a>` : ""}
          ${!exercise.youtubeUrl && !exercise.videoUrl ? `<p class="muted">No video added yet.</p>` : ""}
        </div>
        <div class="${tabClass("Admin Notes")}">
          <dl class="detail-grid">
            ${detail("Coach-only notes", exercise.coachOnlyNotes || exercise.coachNotes)}
            ${detail("Client-facing notes", exercise.clientNotes || exercise.clientFacingNotes)}
            ${detail("Internal notes", exercise.internalNotes)}
            ${detail("Used in", usage.label)}
          </dl>
        </div>
        ${workoutItem ? workoutItemOnlyPanel(workoutItem) : ""}
        <div class="modal-actions sticky-modal-actions">
          <button id="exercisePopupEdit" data-exercise-id="${exercise.id}">Edit Exercise Library Record</button>
          ${workoutItem ? `<button id="exercisePopupItemOnly" data-workout-item-id="${workoutItem.id}">Edit This Workout Item Only</button>` : ""}
          <button id="exercisePopupDuplicate" data-exercise-id="${exercise.id}">Duplicate</button>
          <button id="exercisePopupArchive" data-exercise-id="${exercise.id}">Archive</button>
          <button class="danger" id="exercisePopupDelete" data-exercise-id="${exercise.id}">Delete</button>
          <button class="ghost" id="closeEditModalSecondary">Close</button>
        </div>
      </section>
    </div>
  `;
}

function exerciseEditModeModal(exercise, workoutItem, usage) {
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal exercise-detail-modal">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Exercise Library Record</p><h2>${escapeHtml(exercise.exerciseName || exercise.name)}</h2><p class="muted">Changes here update the master exercise record for future use.</p></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        ${usage.used ? `<div class="result-band"><strong>Connected exercise</strong><span>This exercise is connected to existing workouts or history. Archive is recommended instead of delete.</span></div>` : ""}
        <div class="form-grid">
          ${editInput("exercise", "exerciseName", "Exercise name", exercise.exerciseName || exercise.name)}
          ${editInput("exercise", "description", "Short description", exercise.description)}
          ${editInput("exercise", "purpose", "Purpose", exercise.purpose || exercise.goal)}
          ${editSelect("exercise", "category", "Category", ["Strength", "Cardio", "Boxing", "Kickboxing", "Mobility", "Core", "Recovery"], exercise.category)}
          ${editSelect("exercise", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "General Fitness"], exercise.sportFocus)}
          ${editInput("exercise", "goal", "Goal", exercise.goal)}
          ${editSelect("exercise", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"], exercise.trainingLevel || exercise.planLevel)}
          ${editSelect("exercise", "difficulty", "Difficulty", ["Easy", "Medium", "Hard"], exercise.difficulty)}
          ${editSelect("exercise", "sessionPart", "Session part", ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery"], exercise.sessionPart)}
          ${editInput("exercise", "equipment", "Equipment needed", listValue(exercise.equipment))}
          ${editInput("exercise", "bodyArea", "Body area", listValue(exercise.bodyArea))}
          ${editInput("exercise", "stressArea", "Stress area", listValue(exercise.stressArea))}
          ${editInput("exercise", "sets", "Sets", exercise.sets, "number")}
          ${editInput("exercise", "reps", "Reps", exercise.reps, "number")}
          ${editInput("exercise", "time", "Time", exercise.time)}
          ${editInput("exercise", "rest", "Rest", exercise.rest)}
          ${editInput("exercise", "rounds", "Rounds", exercise.rounds, "number")}
          ${editInput("exercise", "tempo", "Tempo or pace", exercise.tempo || exercise.pace)}
          ${editInput("exercise", "videoUrl", "Video URL", exercise.videoUrl || "")}
          ${editInput("exercise", "youtubeUrl", "YouTube URL", exercise.youtubeUrl || "")}
          ${editInput("exercise", "imageUrl", "Image URL", exercise.imageUrl || "")}
          ${editInput("exercise", "regressionExerciseId", "Regression exercise", exercise.regressionExerciseId)}
          ${editInput("exercise", "progressionExerciseId", "Progression exercise", exercise.progressionExerciseId)}
          ${editInput("exercise", "lowImpactOption", "Low-impact option", exercise.lowImpactOption)}
          ${editInput("exercise", "safeAlternativeExerciseId", "Safe alternative exercise", exercise.safeAlternativeExerciseId)}
          ${editInput("exercise", "replacementCategory", "Replacement category", exercise.replacementCategory)}
        </div>
        <div class="check-grid">
          <label><input class="inline-check" id="editExerciseLowImpact" type="checkbox" ${exercise.lowImpact ? "checked" : ""} /> Low impact</label>
          <label><input class="inline-check" id="editExerciseRecoveryAlternative" type="checkbox" ${exercise.recoveryAlternative ? "checked" : ""} /> Recovery alternative</label>
          <label><input class="inline-check" id="editExerciseActive" type="checkbox" ${exercise.active !== false ? "checked" : ""} /> Active</label>
        </div>
        <label>Setup instructions <textarea data-edit-exercise-field="setupInstructions">${escapeHtml(exercise.setupInstructions || "")}</textarea></label>
        <label>Step-by-step instructions <textarea data-edit-exercise-field="howToPerform">${escapeHtml(exercise.howToPerform || exercise.stepByStepInstructions || exercise.instructions || "")}</textarea></label>
        <label>Breathing instructions <textarea data-edit-exercise-field="breathingInstructions">${escapeHtml(exercise.breathingInstructions || "")}</textarea></label>
        <label>Coaching cues <textarea data-edit-exercise-field="coachingCues">${escapeHtml(listValue(exercise.coachingCues))}</textarea></label>
        <label>Common mistakes <textarea data-edit-exercise-field="commonMistakes">${escapeHtml(listValue(exercise.commonMistakes))}</textarea></label>
        <label>Safety warnings <textarea data-edit-exercise-field="safetyWarnings">${escapeHtml(listValue(exercise.safetyWarnings))}</textarea></label>
        <label>Pain warnings <textarea data-edit-exercise-field="painWarnings">${escapeHtml(listValue(exercise.painWarnings))}</textarea></label>
        <label>Contraindications <textarea data-edit-exercise-field="contraindications">${escapeHtml(listValue(exercise.contraindications))}</textarea></label>
        <label>Coach-only notes <textarea data-edit-exercise-field="coachNotes">${escapeHtml(exercise.coachNotes || exercise.coachOnlyNotes || "")}</textarea></label>
        <label>Client-facing notes <textarea data-edit-exercise-field="clientNotes">${escapeHtml(exercise.clientNotes || exercise.clientFacingNotes || "")}</textarea></label>
        ${workoutItem ? workoutItemOnlyPanel(workoutItem) : ""}
        <div class="modal-actions sticky-modal-actions">
          <button class="ghost" id="exercisePopupCancelEdit">Cancel</button>
          <button class="primary" id="saveExerciseModal" data-exercise-id="${exercise.id}">Save Changes</button>
          <button id="exercisePopupArchive" data-exercise-id="${exercise.id}">Archive</button>
          <button class="danger" id="exercisePopupDelete" data-exercise-id="${exercise.id}">Delete</button>
        </div>
      </section>
    </div>
  `;
}

function workoutItemOnlyPanel(item) {
  return `
    <div class="result-band"><strong>Edit This Workout Item Only</strong><span>This changes sets, reps, time, rest, rounds, notes, and order only for this workout item.</span></div>
    <div class="form-grid compact-form">
      ${modalInput(`popupItemSets-${item.id}`, "Sets", item.sets || "", "number")}
      ${modalInput(`popupItemReps-${item.id}`, "Reps", item.reps || "", "number")}
      ${modalInput(`popupItemTime-${item.id}`, "Time", item.time || "")}
      ${modalInput(`popupItemRest-${item.id}`, "Rest", item.rest || "")}
      ${modalInput(`popupItemRounds-${item.id}`, "Rounds", item.rounds || "", "number")}
      ${modalInput(`popupItemOrder-${item.id}`, "Display order", item.displayOrder || "", "number")}
    </div>
    <label>Workout item coaching notes <textarea id="popupItemCoachNotes-${item.id}">${escapeHtml(item.coachingNotes || "")}</textarea></label>
    <label>Workout item client notes <textarea id="popupItemClientNotes-${item.id}">${escapeHtml(item.clientNotes || "")}</textarea></label>
    <button class="success" data-save-popup-workout-item="${item.id}">Save Workout Item Only</button>
  `;
}

function exerciseUsageSummary(exerciseId) {
  const templateItems = store.workoutTemplateItems.filter((item) => item.exerciseId === exerciseId);
  const monthlyItems = store.monthlyPlanItems.filter((item) => (item.items || []).some((exercise) => exercise.exerciseId === exerciseId));
  const adjustments = store.todayWorkoutAdjustments.filter((adjustment) => JSON.stringify(adjustment).includes(exerciseId));
  const count = templateItems.length + monthlyItems.length + adjustments.length;
  return {
    used: count > 0,
    count,
    label: count ? `${templateItems.length} workout template item(s), ${monthlyItems.length} monthly plan item(s), ${adjustments.length} adjustment record(s)` : "No current workout connections found."
  };
}

function youtubeEmbed(url) {
  const id = youtubeId(url);
  if (!id) return "";
  return `<iframe class="video-frame" src="https://www.youtube.com/embed/${id}" title="Exercise video" loading="lazy" allowfullscreen></iframe>`;
}

function youtubeId(url) {
  const text = String(url || "");
  const match = text.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/);
  return match?.[1] || "";
}

function workoutEditModal(workoutId) {
  const workout = store.workoutTemplates.find((item) => item.id === workoutId);
  if (!workout) return "";
  const items = store.workoutTemplateItems
    .filter((item) => item.workoutTemplateId === workoutId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Workout Template</p><h2>${escapeHtml(workout.workoutName)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="form-grid">
          ${editInput("workout", "workoutName", "Workout name", workout.workoutName)}
          ${editSelect("workout", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"], workout.sportFocus)}
          ${editInput("workout", "goal", "Goal", workout.goal)}
          ${editSelect("workout", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"], workout.trainingLevel || workout.planLevel)}
          ${editSelect("workout", "difficulty", "Difficulty", ["Easy", "Medium", "Hard"], workout.difficulty)}
          ${editSelect("workout", "sessionLength", "Session length", [30, 45, 60, 120], workout.sessionLength)}
          ${editSelect("workout", "trainingDayType", "Training day type", ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"], workout.trainingDayType)}
          ${editSelect("workout", "workoutCategory", "Workout category", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "Conditioning", "Recovery", "General Fitness"], workout.workoutCategory)}
        </div>
        <label>Description <textarea data-edit-workout-field="description">${escapeHtml(workout.description || "")}</textarea></label>
        <label>Coach notes <textarea data-edit-workout-field="coachNotes">${escapeHtml(workout.coachNotes || "")}</textarea></label>
        <label>Client notes <textarea data-edit-workout-field="clientNotes">${escapeHtml(workout.clientNotes || "")}</textarea></label>
        <div class="section-title"><h3>Workout Exercises</h3><span>${items.length} item${items.length === 1 ? "" : "s"}</span></div>
        <div class="admin-list modal-list">
          ${items.map((item) => workoutItemEditRow(item)).join("") || `<div class="empty">No exercises in this workout yet.</div>`}
        </div>
        <div class="section-title"><h3>Add Exercise</h3><span>Use full library</span></div>
        <div class="form-grid compact-form">
          ${modalSelect("modalNewItemExercise", "Exercise", store.exercises.map((exerciseItem) => ({ value: exerciseItem.id, label: exerciseItem.exerciseName || exerciseItem.name })))}
          ${modalSelect("modalNewItemPart", "Block", ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery"])}
          ${modalInput("modalNewItemSets", "Sets", "", "number")}
          ${modalInput("modalNewItemReps", "Reps", "", "number")}
          ${modalInput("modalNewItemTime", "Time", "")}
          ${modalInput("modalNewItemRest", "Rest", "60 sec")}
          ${modalInput("modalNewItemRounds", "Rounds", "", "number")}
        </div>
        <button class="success full" id="modalAddWorkoutItem" data-workout-id="${workout.id}">Add Exercise To This Workout</button>
        <div class="modal-actions">
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="saveWorkoutModal" data-workout-id="${workout.id}">Save Workout</button>
        </div>
      </section>
    </div>
  `;
}

function workoutItemEditRow(item) {
  return `
    <div class="admin-row modal-item-row">
      <button data-open-workout-exercise="${item.exerciseId}:${item.id}">View Exercise</button>
      ${modalSelect(`itemExercise-${item.id}`, "Exercise", store.exercises.map((exercise) => ({ value: exercise.id, label: exercise.exerciseName || exercise.name })), item.exerciseId)}
      ${modalSelect(`itemPart-${item.id}`, "Block", ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery"], item.sessionPart)}
      ${modalInput(`itemSets-${item.id}`, "Sets", item.sets || "", "number")}
      ${modalInput(`itemReps-${item.id}`, "Reps", item.reps || "", "number")}
      ${modalInput(`itemTime-${item.id}`, "Time", item.time || "")}
      ${modalInput(`itemRest-${item.id}`, "Rest", item.rest || "")}
      ${modalInput(`itemRounds-${item.id}`, "Rounds", item.rounds || "", "number")}
      ${modalInput(`itemOrder-${item.id}`, "Order", item.displayOrder || "", "number")}
      <button data-save-workout-item="${item.id}">Save Item</button>
      <button data-remove-workout-item="${item.id}">Remove</button>
    </div>
  `;
}

function editInput(group, key, label, value = "", type = "text") {
  return `<label>${label}<input data-edit-${group}-field="${key}" type="${type}" value="${escapeHtml(value ?? "")}" /></label>`;
}

function editSelect(group, key, label, options, value = "") {
  return `<label>${label}<select data-edit-${group}-field="${key}">${options.map((option) => {
    const item = typeof option === "object" ? option : { value: option, label: option };
    return `<option value="${item.value}" ${String(item.value) === String(value ?? "") ? "selected" : ""}>${item.label}</option>`;
  }).join("")}</select></label>`;
}

function modalInput(id, label, value = "", type = "text") {
  return `<label>${label}<input id="${id}" type="${type}" value="${escapeHtml(value ?? "")}" /></label>`;
}

function modalSelect(id, label, options, value = "") {
  return `<label>${label}<select id="${id}">${options.map((option) => {
    const item = typeof option === "object" ? option : { value: option, label: option };
    return `<option value="${item.value}" ${String(item.value) === String(value ?? "") ? "selected" : ""}>${item.label}</option>`;
  }).join("")}</select></label>`;
}

function listValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
}

function csvValue(value) {
  return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

function collectEditFields(group) {
  const patch = {};
  document.querySelectorAll(`[data-edit-${group}-field]`).forEach((field) => {
    patch[field.dataset[`edit${group[0].toUpperCase()}${group.slice(1)}Field`]] = field.value;
  });
  return patch;
}

function adminInput(group, key, label, type = "text") {
  return `<label>${label}<input data-admin-draft="${group}:${key}" type="${type}" value="${state.adminDrafts[group][key] ?? ""}" /></label>`;
}

function adminPanelClass(panel) {
  return state.adminPanel === panel ? "active-admin-panel" : "hidden";
}

function adminSelect(group, key, label, options) {
  const value = String(state.adminDrafts[group][key] ?? "");
  return `<label>${label}<select data-admin-draft="${group}:${key}">${options.map((option) => {
    const item = typeof option === "object" ? option : { value: option, label: option };
    return `<option value="${item.value}" ${String(item.value) === value ? "selected" : ""}>${item.label}</option>`;
  }).join("")}</select></label>`;
}

function adminClientDetail(client) {
  if (!client) return `<div class="empty">No client selected.</div>`;
  const clientAssessments = store.assessments.filter((item) => item.clientId === client.id).length;
  const weekly = store.weeklyCheckIns.filter((item) => item.clientId === client.id).length;
  const workouts = store.monthlyPlanItems.filter((item) => item.clientId === client.id).length;
  const chats = store.chatMessages.filter((item) => item.clientId === client.id).length;
  return `
    <div class="split tight">
      <p><strong>Assessments:</strong> ${clientAssessments}</p>
      <p><strong>Check-ins:</strong> ${weekly}</p>
      <p><strong>Workouts:</strong> ${workouts}</p>
      <p><strong>Package history:</strong> ${(client.packageHistory || []).length}</p>
      <p><strong>Chats:</strong> ${chats}</p>
      <p><strong>Age / height / weight:</strong> ${escapeHtml(client.age || "Not saved")} / ${escapeHtml(formatClientHeight(client))} / ${escapeHtml(formatClientWeight(client.currentWeightLb || client.weight))}</p>
      <p><strong>Medical problems:</strong> ${escapeHtml(client.medicalProblems || client.medicalConditions || "None saved")}</p>
      <p><strong>Allergies:</strong> ${escapeHtml(client.allergies || "None saved")}</p>
      <p><strong>Notes:</strong> ${client.notes || client.progressNotes || "No notes yet."}</p>
    </div>
  `;
}

function adminAssessmentScheduleBoard() {
  const schedules = getAssessmentSchedulesForUser(store, state.currentUser);
  if (!schedules.length) {
    return `<div class="empty">No assessment schedule requests yet. When a coach or client proposes a time, Admin will see it here.</div>`;
  }
  return `
    <div class="admin-list schedule-admin-list">
      ${schedules.map((schedule) => {
        const client = store.clients.find((item) => item.id === schedule.clientId);
        const coach = store.coaches.find((item) => item.id === schedule.coachId);
        const needsApproval = schedule.status === "Pending Coach Approval" || schedule.status === "Pending Client Approval";
        return `
          <div class="admin-row schedule-admin-row">
            <div>
              <strong>${client?.name || "Unknown client"} / ${schedule.assessmentType}</strong>
              <p>${formatScheduleDateTime(schedule.proposedDate, schedule.proposedTime)} / ${schedule.status}</p>
              <p class="muted">Coach: ${coach?.name || "Not assigned"}${schedule.rejectionReason ? ` / ${escapeHtml(schedule.rejectionReason)}` : ""}</p>
            </div>
            <div class="actions">
              <button data-admin-open-schedule-client="${schedule.clientId}">View Client Schedule</button>
              ${needsApproval ? `<button class="success" data-admin-approve-schedule="${schedule.id}">Approve</button>` : ""}
              ${schedule.status !== "Approved" ? `<button class="ghost" data-admin-schedule-chat="${schedule.id}">Send To Chat</button>` : ""}
              <button data-admin-open-schedule-chat="${schedule.clientId}">Open Chat</button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function bindLogin() {
  document.querySelector("#loginRole")?.addEventListener("change", (event) => {
    state.loginRole = event.target.value;
  });
  document.querySelector("#loginPin")?.addEventListener("input", (event) => {
    state.loginPin = event.target.value.replace(/\D/g, "");
    event.target.value = state.loginPin;
  });
  document.querySelector("#loginButton")?.addEventListener("click", async () => {
    const loginButton = document.querySelector("#loginButton");
    if (loginButton) {
      loginButton.disabled = true;
      loginButton.textContent = "Log In";
    }
    await syncLatestCloudData(false);
    const loginKey = state.loginRole;
    const user = authenticateUser(store, loginKey, state.loginPin);
    if (!user) {
      render();
      document.querySelector("#loginError").textContent = loginBlockedMessage(store, loginKey, state.loginPin);
      return;
    }
    state.currentUser = user;
    const firstClient = visibleClientsForUser(store, user)[0];
    if (firstClient) changeSelectedClient(firstClient.id, false);
    state.view = user.role === "Client" ? "client" : "home";
    state.loginPin = "";
    render();
  });
  document.querySelector("#forgotPinButton")?.addEventListener("click", () => {
    state.forgotPinOpen = true;
    state.forgotPinError = "";
    state.forgotPinSuccess = "";
    render();
  });
  document.querySelector("#backFromForgotPin")?.addEventListener("click", () => {
    state.forgotPinOpen = false;
    render();
  });
  document.querySelectorAll("[data-forgot-pin-field]").forEach((input) => input.addEventListener("input", () => {
    state.forgotPin[input.dataset.forgotPinField] = input.value;
  }));
  document.querySelector("#submitForgotPinRequest")?.addEventListener("click", () => {
    try {
      submitPinResetRequest(store, state.forgotPin);
      backupPublicChangeToCloud();
      state.forgotPinSuccess = "Your PIN reset request was sent to Admin.";
      state.forgotPinError = "";
      state.forgotPin = { nameOrEmail: "", phone: "", note: "" };
      render();
    } catch (error) {
      state.forgotPinError = error.message;
      render();
    }
  });
  document.querySelector("#openSignupButton")?.addEventListener("click", () => {
    state.signupOpen = true;
    state.forgotPinOpen = false;
    state.signupError = "";
    state.signupSuccess = "";
    render();
  });
  document.querySelector("#backToLoginButton")?.addEventListener("click", () => {
    state.signupOpen = false;
    render();
  });
  document.querySelectorAll("[data-signup-type]").forEach((button) => button.addEventListener("click", () => {
    state.signup.accountType = button.dataset.signupType;
    state.signupError = "";
    render();
  }));
  document.querySelectorAll("[data-signup-field]").forEach((input) => input.addEventListener("input", () => {
    const key = input.dataset.signupField;
    state.signup[key] = key === "pin" || key === "confirmPin" ? input.value.replace(/\D/g, "") : input.value;
    if (key === "pin" || key === "confirmPin") input.value = state.signup[key];
  }));
  document.querySelectorAll("[data-signup-check]").forEach((input) => input.addEventListener("change", () => {
    state.signup[input.dataset.signupCheck] = input.checked;
  }));
  document.querySelector("#createLoginButton")?.addEventListener("click", () => {
    try {
      requestLockedAccount(store, state.signup);
      backupPublicChangeToCloud();
      state.signupOpen = false;
      state.signupSuccess = "Account request submitted. Admin must approve and unlock your account before you can log in.";
      state.signupError = "";
      render();
    } catch (error) {
      state.signupError = error.message;
      render();
    }
  });
}

function bindGlobal() {
  window.printNutritionShoppingList = printNutritionShoppingList;
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.view === "nutrition" && state.currentUser?.role === "Client") {
      openClientMealPlanView();
      render();
      return;
    }
    closeOpenPopups();
    state.view = button.dataset.view;
    if (state.view === "nutrition") {
      const client = state.currentUser?.role === "Client" ? clientForCurrentUser() : null;
      if (client) state.clientId = client.id;
    }
    render();
  }));
  document.querySelectorAll("[data-open-client-meal-plan]").forEach((button) => button.addEventListener("click", () => {
    openClientMealPlanView();
    render();
  }));
  document.querySelectorAll("[data-workout-detail]").forEach((button) => button.addEventListener("click", () => {
    state.selectedWorkoutId = button.dataset.workoutDetail;
    state.view = "workoutDetail";
    render();
  }));
  document.querySelectorAll("[data-exercise-detail]").forEach((button) => button.addEventListener("click", () => {
    state.selectedExerciseId = button.dataset.exerciseDetail;
    state.selectedWorkoutId = button.dataset.workoutContext || state.selectedWorkoutId;
    state.view = "exerciseDetail";
    render();
  }));
  document.querySelectorAll("[data-approve-plan]").forEach((button) => button.addEventListener("click", () => {
    ensureMonthlyPlanHasWorkouts(store, button.dataset.approvePlan, latestClientAssessment(state.clientId));
    const plan = approveMonthlyPlan(store, button.dataset.approvePlan);
    saveStore();
    state.planDraftNotice = `${plan.month} ${plan.trainingLevel} plan approved. The client can now open Monthly Plan and see the full month of workouts.`;
    render();
  }));
  document.querySelectorAll("[data-add-suggested-exercise]").forEach((button) => button.addEventListener("click", () => {
    addSuggestedExerciseToWorkout(button.dataset.addSuggestedExercise);
    saveStore();
    state.planDraftNotice = "Suggested exercise added. Coach can keep editing before approval.";
    render();
  }));
  document.querySelectorAll("[data-replace-suggested-workout]").forEach((button) => button.addEventListener("click", () => {
    replaceSuggestedWorkout(button.dataset.replaceSuggestedWorkout);
    saveStore();
    state.planDraftNotice = "Workout replaced with a fresh suggestion from the exercise library.";
    render();
  }));
  document.querySelector("#globalClientSelect")?.addEventListener("change", (event) => {
    changeSelectedClient(event.target.value);
  });
  document.querySelector("#logoutButton")?.addEventListener("click", async () => {
    const logoutButton = document.querySelector("#logoutButton");
    if (logoutButton) {
      logoutButton.disabled = true;
      logoutButton.textContent = "Saving...";
    }
    if (canUseSupabaseBackup()) {
      try {
        await runAutomaticCloudBackup(cloudBackupFingerprint());
      } catch (error) {
        console.warn("Could not run logout backup.", error);
      }
    }
    state.currentUser = null;
    state.view = "home";
    render();
  });
  document.querySelector("#clientSelect")?.addEventListener("change", (event) => {
    changeSelectedClient(event.target.value);
  });
  document.querySelector("#sendAssessmentSchedule")?.addEventListener("click", () => {
    const proposedDate = document.querySelector("#assessmentScheduleDate")?.value;
    const proposedTime = document.querySelector("#assessmentScheduleTime")?.value;
    try {
      const schedule = proposeAssessmentSchedule(store, state.currentUser, {
        clientId: state.clientId,
        assessmentType: document.querySelector("#assessmentScheduleType")?.value || "Initial Assessment",
        proposedDate,
        proposedTime,
        coachNotes: document.querySelector("#assessmentScheduleCoachNote")?.value || ""
      });
      if (state.currentUser.role === "Client") {
        createAssessmentScheduleCoachAlert(schedule, "Client requested an assessment appointment.");
      }
      state.planDraftNotice = "Assessment time sent to the client for approval.";
      render();
    } catch (error) {
      alert(error.message);
    }
  });
  document.querySelector("#clientApproveAssessmentSchedule")?.addEventListener("click", (event) => {
    const schedule = respondToAssessmentSchedule(store, state.currentUser, event.target.dataset.scheduleId, { action: "approve" });
    createAssessmentScheduleCoachAlert(schedule, "Client approved the assessment appointment.");
    state.planDraftNotice = "Assessment appointment approved.";
    render();
  });
  document.querySelector("#coachApproveAssessmentSchedule")?.addEventListener("click", (event) => {
    const schedule = respondToAssessmentSchedule(store, state.currentUser, event.target.dataset.scheduleId, { action: "approve" });
    createAssessmentScheduleCoachAlert(schedule, "Coach approved the client suggested assessment time.");
    state.planDraftNotice = "Client suggested time approved.";
    render();
  });
  document.querySelector("#clientCounterAssessmentSchedule")?.addEventListener("click", (event) => {
    const scheduleId = event.target.dataset.scheduleId;
    const proposedDate = document.querySelector("#assessmentCounterDate")?.value;
    const proposedTime = document.querySelector("#assessmentCounterTime")?.value;
    try {
      if (scheduleId) {
        const schedule = respondToAssessmentSchedule(store, state.currentUser, scheduleId, {
          action: "counter",
          proposedDate,
          proposedTime,
          clientNotes: document.querySelector("#assessmentScheduleClientNote")?.value || ""
        });
        createAssessmentScheduleCoachAlert(schedule, "Client suggested a different assessment time.");
      } else {
        const schedule = proposeAssessmentSchedule(store, state.currentUser, {
          clientId: state.clientId,
          assessmentType: "Initial Assessment",
          proposedDate,
          proposedTime,
          clientNotes: document.querySelector("#assessmentScheduleClientNote")?.value || ""
        });
        createAssessmentScheduleCoachAlert(schedule, "Client requested an assessment appointment.");
      }
      state.planDraftNotice = "Your suggested assessment time was sent to the coach.";
      render();
    } catch (error) {
      alert(error.message);
    }
  });
  document.querySelector("#rejectAssessmentScheduleOpenChat")?.addEventListener("click", (event) => {
    const schedule = respondToAssessmentSchedule(store, state.currentUser, event.target.dataset.scheduleId, {
      action: "reject",
      rejectionReason: "Coach rejected the suggested time. Open chat to agree on a better appointment."
    });
    createAssessmentScheduleCoachAlert(schedule, "Assessment schedule needs a coach-client chat.");
    state.view = "chat";
    render();
  });
  document.querySelector("[data-open-assessment-chat]")?.addEventListener("click", () => {
    state.view = "chat";
    render();
  });
  document.querySelector("#assessmentTemplateSelect")?.addEventListener("change", (event) => {
    state.selectedAssessmentTemplateId = event.target.value;
    const template = selectedAssessmentTemplate();
    state.assessment.movementTestIds = template?.movementTestIds || movementTests.map((test) => test.id);
    render();
  });
  document.querySelector("#startAssessment")?.addEventListener("click", () => {
    state.assessment = blankAssessment(state.clientId, today);
    state.assessment.movementTestIds = selectedAssessmentTemplate()?.movementTestIds || movementTests.map((test) => test.id);
    state.assessmentStep = 0;
    render();
  });
  document.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => {
    state.assessmentStep = Number(button.dataset.step);
    render();
  }));
  document.querySelector("#prevStep")?.addEventListener("click", () => {
    state.assessmentStep = Math.max(0, state.assessmentStep - 1);
    render();
  });
  document.querySelector("#nextStep")?.addEventListener("click", () => {
    state.assessmentStep = Math.min(5, state.assessmentStep + 1);
    render();
  });
  document.querySelector("#assessmentDate")?.addEventListener("input", (event) => state.assessment.assessmentDate = event.target.value);
  document.querySelector("#assessmentType")?.addEventListener("change", (event) => state.assessment.assessmentType = event.target.value);
  document.querySelector("#coachNotes")?.addEventListener("input", (event) => state.assessment.coachNotes = event.target.value);
  document.querySelectorAll("[data-safety]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.safety;
    state.assessment.safetyAnswers[id] = { ...(state.assessment.safetyAnswers[id] || {}), answer: button.dataset.answer === "yes" };
    render();
  }));
  document.querySelectorAll("[data-safety-note]").forEach((input) => input.addEventListener("input", () => {
    const id = input.dataset.safetyNote;
    state.assessment.safetyAnswers[id] = { ...(state.assessment.safetyAnswers[id] || {}), notes: input.value };
  }));
  document.querySelectorAll("[data-score]").forEach((button) => button.addEventListener("click", () => {
    const [id, value] = button.dataset.score.split(":");
    state.assessment.movementScores[id] = Number(value);
    render();
  }));
  document.querySelectorAll("[data-equipment]").forEach((input) => input.addEventListener("change", () => {
    state.assessment.equipment[input.dataset.equipment] = input.checked;
    render();
  }));
  document.querySelector("#saveAssessment")?.addEventListener("click", () => {
    const saved = saveAssessment(store, state.assessment);
    state.planDraftNotice = `Assessment saved for ${selectedClient().name}. Coach can generate a draft monthly plan from the summary suggestion.`;
    state.assessmentStep = 5;
    state.assessment = { ...state.assessment, assessmentId: saved.assessmentId };
    render();
  });
  document.querySelector("#generateAssessmentPlan")?.addEventListener("click", () => {
    const saved = saveAssessment(store, state.assessment);
    state.assessment = { ...state.assessment, assessmentId: saved.assessmentId };
    const currentPlan = getClientVisiblePlan(store, saved.clientId);
    const result = createReassessmentDraftIfNeeded(store, saved, currentPlan, true);
    state.planDraftNotice = result.draftPlan
      ? `Draft ${result.draftPlan.trainingLevel} monthly plan created from the assessment. Review it, then approve it before the client can see it.`
      : `The assessment did not require a new draft plan. You can still manually edit or generate a plan from Admin controls.`;
    state.view = "plan";
    render();
  });
  document.querySelector("#saveWeekly")?.addEventListener("click", () => {
    state.weekly.workoutCompletionPercent = Number(document.querySelector("#weeklyCompletion").value);
    state.weekly.workoutDifficulty = document.querySelector("#weeklyDifficulty").value;
    saveWeeklyCheckIn(store, { ...state.weekly, clientId: state.clientId, checkInDate: today });
    render();
  });
  document.querySelectorAll("[data-weekly-score]").forEach((button) => button.addEventListener("click", () => {
    const [key, value] = button.dataset.weeklyScore.split(":");
    state.weekly[key] = Number(value);
    render();
  }));
  document.querySelectorAll("[data-daily-score]").forEach((button) => button.addEventListener("click", () => {
    const [key, value] = button.dataset.dailyScore.split(":");
    state.daily[key] = Number(value);
    render();
  }));
  document.querySelectorAll("[data-pain-toggle]").forEach((button) => button.addEventListener("click", () => {
    state.daily.painCheckIn.hasPain = button.dataset.painToggle === "yes";
    render();
  }));
  document.querySelectorAll("[data-pain-location]").forEach((button) => button.addEventListener("click", () => toggleArray(state.daily.painCheckIn.painLocations, button.dataset.painLocation)));
  document.querySelectorAll("[data-pain-type]").forEach((button) => button.addEventListener("click", () => toggleArray(state.daily.painCheckIn.painType, button.dataset.painType)));
  document.querySelector("#painLevel")?.addEventListener("input", (event) => {
    state.daily.painCheckIn.painLevel1to10 = Number(event.target.value);
    render();
  });
  document.querySelector("#submitDaily")?.addEventListener("click", () => {
    const alreadyCheckedIn = store.dailyCheckIns.some((item) => item.clientId === state.clientId && item.workoutDate === state.daily.workoutDate);
    if (alreadyCheckedIn) {
      window.alert("You already checked in for today.");
      return;
    }
    state.daily.painCheckIn.painStartedToday = document.querySelector("#painStartedToday")?.checked || false;
    state.daily.painCheckIn.painWorseWithMovement = document.querySelector("#painWorse")?.checked || false;
    state.daily.painCheckIn.feelsSafeToTrain = document.querySelector("#safeTrain")?.checked ?? true;
    state.daily.painCheckIn.painNotes = document.querySelector("#dailyPainNotes")?.value || "";
    try {
      saveDailyCheckIn(store, { ...state.daily, clientId: state.clientId });
      state.view = "client";
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelectorAll("[data-alert-decision]").forEach((button) => button.addEventListener("click", () => {
    const [alertId, decision] = button.dataset.alertDecision.split(":");
    const alert = store.coachAlerts.find((item) => item.id === alertId);
    if (!alert) return;
    if (!alert.dailyCheckInId || decision === "Reviewed") {
      alert.status = "Reviewed";
      alert.coachDecision = decision;
      alert.resolvedAt = new Date().toISOString();
      render();
      return;
    }
    const workoutSnapshot = decision === "Edited Suggested Change" || decision === "Replaced Workout"
      ? { ...alert.suggestedWorkoutSnapshot, title: decision === "Replaced Workout" ? "Coach replacement recovery session" : `${alert.suggestedWorkoutSnapshot.title} (Coach edited)` }
      : undefined;
    resolveCoachAlert(store, alertId, decision, { workoutSnapshot, coachNotes: "Coach reviewed in dashboard." });
    render();
  }));
  document.querySelectorAll("[data-edit-alert-workout]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "coachAlertWorkout", id: button.dataset.editAlertWorkout };
    render();
  }));
  document.querySelectorAll("[data-coach-workout-item]").forEach((button) => button.addEventListener("click", () => {
    const [workoutId, itemIndex] = button.dataset.coachWorkoutItem.split(":");
    state.editModal = { type: "coachWorkoutItem", workoutId, itemIndex: Number(itemIndex), mode: button.dataset.coachWorkoutMode || "dose" };
    render();
  }));
  document.querySelector("[data-save-coach-workout-item]")?.addEventListener("click", () => {
    saveCoachWorkoutItemModal(false);
    render();
  });
  document.querySelector("[data-approve-current-adjusted-workout]")?.addEventListener("click", () => {
    saveCoachWorkoutItemModal(true);
    render();
  });
  document.querySelectorAll("[data-smart-coach-replace-item]").forEach((button) => button.addEventListener("click", () => {
    const select = document.querySelector("#coachReplacementExercise");
    if (select) select.value = button.dataset.smartCoachReplaceItem;
  }));
  document.querySelectorAll("[data-smart-alert-item]").forEach((button) => button.addEventListener("click", () => {
    const [, index, exerciseId] = button.dataset.smartAlertItem.split(":");
    const select = document.querySelector(`#alertReplace-${index}`);
    if (select) select.value = exerciseId;
  }));
  document.querySelectorAll("[data-save-alert-suggested-workout]").forEach((button) => button.addEventListener("click", () => {
    saveAlertSuggestedWorkout(button.dataset.saveAlertSuggestedWorkout);
    window.alert("Suggested workout updated for coach approval.");
    render();
  }));
  document.querySelectorAll("[data-approve-edited-alert-workout]").forEach((button) => button.addEventListener("click", () => {
    const alertId = button.dataset.approveEditedAlertWorkout;
    saveAlertSuggestedWorkout(alertId);
    const alert = store.coachAlerts.find((item) => item.id === alertId);
    resolveCoachAlert(store, alertId, "Edited Suggested Change", {
      workoutSnapshot: cloneLocal(alert.suggestedWorkoutSnapshot),
      coachNotes: document.querySelector("#alertCoachApprovalNote")?.value || "Coach edited and approved today's workout."
    });
    state.editModal = null;
    render();
  }));
  document.querySelector("#chatDraft")?.addEventListener("input", (event) => {
    state.chatDraft = event.target.value;
  });
  document.querySelector("#sendChatButton")?.addEventListener("click", async () => {
    let client = currentChatClient();
    try {
      const body = state.chatDraft;
      let partner = chatPartnerFor(client);
      if (!partner || !client) return;
      if (canUseSupabaseBackup()) {
        await syncLatestCloudData(false);
        await syncLiveChatRecords();
        client = currentChatClient();
        partner = chatPartnerFor(client);
      }
      if (!partner || !client) return;
      state.clientId = client.id;
      const message = sendChatMessage(store, {
        fromUserId: state.currentUser.id,
        toUserId: partner.id,
        clientId: client.id,
        body
      });
      state.chatDraft = "";
      saveStore();
      await pushLiveChatMessage(message);
      backupPublicChangeToCloud();
      state.syncStatus = `Message sent to ${partner.name}.`;
    } catch (error) {
      state.syncStatus = `Message could not be sent: ${error.message}`;
      window.alert(state.syncStatus);
    } finally {
      client = currentChatClient();
      if (client) state.clientId = client.id;
      render();
    }
  });
  document.querySelector("#markReadButton")?.addEventListener("click", () => {
    const client = currentChatClient();
    if (!client) return;
    markNotificationsRead(store, state.currentUser.id, client.id);
    saveStore();
    pushLiveChatMessagesForClient(client.id);
    backupPublicChangeToCloud();
    render();
  });
  markVisibleChatReadIfNeeded();
  if (state.view === "chat" && canUseSupabaseBackup()) {
    syncLiveChatRecords()
      .then((changed) => {
        if (changed && state.view === "chat") render();
      })
      .catch((error) => {
        state.syncStatus = `Live chat sync failed: ${error.message}`;
      });
  }
  const bindLibraryFilter = (selector, key, eventName = "input") => {
    document.querySelector(selector)?.addEventListener(eventName, (event) => {
      state.libraryFilters[key] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
      render();
    });
  };
  bindLibraryFilter("#librarySearch", "query");
  bindLibraryFilter("#libraryCategory", "category");
  bindLibraryFilter("#librarySport", "sportFocus");
  bindLibraryFilter("#libraryLevel", "trainingLevel", "change");
  bindLibraryFilter("#libraryEquipment", "equipment");
  bindLibraryFilter("#libraryBodyArea", "bodyArea");
  bindLibraryFilter("#libraryRecoveryOnly", "recoveryAlternative", "change");
  document.querySelector("#saveClientSafetyInfo")?.addEventListener("click", () => {
    try {
      const pin = document.querySelector("#clientNewPin")?.value || "";
      const confirmPin = document.querySelector("#clientConfirmPin")?.value || "";
      updateClientSelfProfile(store, state.currentUser, {
        email: document.querySelector("#clientEmail")?.value || "",
        phone: document.querySelector("#clientPhone")?.value || "",
        age: document.querySelector("#clientAge")?.value || "",
        sex: document.querySelector("#clientSex")?.value || "",
        heightInches: document.querySelector("#clientHeightInches")?.value || "",
        currentWeightLb: document.querySelector("#clientCurrentWeight")?.value || "",
        goalWeightLb: document.querySelector("#clientGoalWeight")?.value || "",
        goal: document.querySelector("#clientGoal")?.value || "",
        medicalProblems: document.querySelector("#clientMedicalProblems")?.value || "",
        medications: document.querySelector("#clientMedications")?.value || "",
        allergies: document.querySelector("#clientAllergies")?.value || "",
        medicalRestrictions: document.querySelector("#clientMedicalRestrictions")?.value || "",
        injuryNotes: document.querySelector("#clientInjuryNotes")?.value || "",
        emergencyContact: document.querySelector("#clientEmergencyContact")?.value || "",
        ...(pin || confirmPin ? { pin, confirmPin } : {})
      });
      window.alert("Profile info saved.");
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  ["#clientNewPin", "#clientConfirmPin"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
    });
  });
  document.querySelector("#saveCoachSelfProfile")?.addEventListener("click", () => {
    try {
      const pin = document.querySelector("#coachSelfNewPin")?.value || "";
      const confirmPin = document.querySelector("#coachSelfConfirmPin")?.value || "";
      updateCoachSelfProfile(store, state.currentUser, {
        name: document.querySelector("#coachSelfName")?.value || "",
        email: document.querySelector("#coachSelfEmail")?.value || "",
        phone: document.querySelector("#coachSelfPhone")?.value || "",
        specialty: document.querySelector("#coachSelfSpecialty")?.value || "",
        emergencyContact: document.querySelector("#coachSelfEmergencyContact")?.value || "",
        bio: document.querySelector("#coachSelfBio")?.value || "",
        ...(pin || confirmPin ? { pin, confirmPin } : {})
      });
      window.alert("Coach profile saved.");
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  ["#coachSelfNewPin", "#coachSelfConfirmPin"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
    });
  });
  document.querySelector("#saveAdminSelfProfile")?.addEventListener("click", () => {
    try {
      const pin = document.querySelector("#adminSelfNewPin")?.value || "";
      const confirmPin = document.querySelector("#adminSelfConfirmPin")?.value || "";
      updateAdminSelfProfile(store, state.currentUser, {
        name: document.querySelector("#adminSelfName")?.value || "",
        email: document.querySelector("#adminSelfEmail")?.value || "",
        phone: document.querySelector("#adminSelfPhone")?.value || "",
        title: document.querySelector("#adminSelfTitle")?.value || "",
        emergencyContact: document.querySelector("#adminSelfEmergencyContact")?.value || "",
        bio: document.querySelector("#adminSelfBio")?.value || "",
        ...(pin || confirmPin ? { pin, confirmPin } : {})
      });
      window.alert("Admin profile saved.");
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  ["#adminSelfNewPin", "#adminSelfConfirmPin"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
    });
  });
  document.querySelector("#uploadProfileImageButton")?.addEventListener("click", () => {
    const file = document.querySelector("#profileImageInput")?.files?.[0];
    const targetUser = ["Coach", "Admin"].includes(state.currentUser.role) && state.view === "profile" ? state.currentUser : userForProfile(selectedClient());
    if (!file || !targetUser) return window.alert("Choose an image first.");
    try {
      uploadProfileImage(store, state.currentUser, targetUser.id, file);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelector("#removeProfileImageButton")?.addEventListener("click", () => {
    const targetUser = ["Coach", "Admin"].includes(state.currentUser.role) && state.view === "profile" ? state.currentUser : userForProfile(selectedClient());
    if (!targetUser) return;
    try {
      removeProfileImage(store, state.currentUser, targetUser.id);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelector("#uploadProgressImageButton")?.addEventListener("click", () => {
    const file = document.querySelector("#progressImageInput")?.files?.[0];
    if (!file) return window.alert("Choose an image first.");
    state.progressDraft.imageDate = document.querySelector("#progressImageDate")?.value || today;
    state.progressDraft.imageCategory = document.querySelector("#progressImageCategory")?.value || "Other";
    state.progressDraft.clientNotes = document.querySelector("#progressImageNotes")?.value || "";
    try {
      uploadProgressImage(store, state.currentUser, state.clientId, { ...state.progressDraft, file });
      state.progressDraft.clientNotes = "";
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelectorAll("[data-save-progress-note]").forEach((button) => button.addEventListener("click", () => {
    const note = document.querySelector(`[data-progress-note="${button.dataset.saveProgressNote}"]`)?.value || "";
    addProgressImageCoachNote(store, state.currentUser, button.dataset.saveProgressNote, note, true);
    render();
  }));
  document.querySelectorAll("[data-archive-progress-image]").forEach((button) => button.addEventListener("click", () => {
    archiveProgressImage(store, state.currentUser, button.dataset.archiveProgressImage);
    render();
  }));
  document.querySelectorAll("[data-admin-upload-profile]").forEach((button) => button.addEventListener("click", () => {
    const file = document.querySelector(`[data-profile-file="${button.dataset.adminUploadProfile}"]`)?.files?.[0];
    if (!file) return window.alert("Choose an image first.");
    try {
      uploadProfileImage(store, state.currentUser, button.dataset.adminUploadProfile, file);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  }));
  document.querySelectorAll("[data-admin-remove-profile]").forEach((button) => button.addEventListener("click", () => {
    try {
      removeProfileImage(store, state.currentUser, button.dataset.adminRemoveProfile);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  }));
  document.querySelectorAll("[data-admin-draft]").forEach((field) => {
    const updateDraft = () => {
      const [group, key] = field.dataset.adminDraft.split(":");
      state.adminDrafts[group][key] = field.type === "number" ? Number(field.value || 0) : field.value;
    };
    field.addEventListener("input", updateDraft);
    field.addEventListener("change", updateDraft);
  });
  document.querySelectorAll("[data-admin-check]").forEach((field) => field.addEventListener("change", () => {
    const [group, key] = field.dataset.adminCheck.split(":");
    state.adminDrafts[group][key] = field.checked;
  }));
  document.querySelectorAll("[data-exercise-filter]").forEach((field) => {
    const updateFilter = () => {
      state.exerciseLibraryFilters[field.dataset.exerciseFilter] = field.value;
      render();
    };
    field.addEventListener("change", updateFilter);
    if (field.tagName === "INPUT") field.addEventListener("input", updateFilter);
  });
  document.querySelectorAll("[data-admin-panel]").forEach((button) => button.addEventListener("click", () => {
    state.adminPanel = button.dataset.adminPanel;
    render();
  }));
  document.querySelector("#nutritionDemoMode")?.addEventListener("change", (event) => {
    store.settings.nutritionPlannerEnabled = event.target.value !== "Off";
    store.settings.nutritionDemoMode = event.target.value === "Off" ? "Off" : "Active";
    if (event.target.value === "Off") state.nutritionDemo.generatedPlan = null;
    saveStore();
    render();
  });
  document.querySelectorAll("[data-nutrition-profile]").forEach((field) => {
    const updateNutritionProfile = () => {
      state.nutritionDemo = { ...state.nutritionDemo, ...collectNutritionDemoOptions(), generatedPlan: null };
      render();
    };
    const cacheNutritionProfile = () => {
      state.nutritionDemo = { ...state.nutritionDemo, ...collectNutritionDemoOptions(), generatedPlan: null };
    };
    field.addEventListener("change", updateNutritionProfile);
    if (["INPUT", "TEXTAREA"].includes(field.tagName)) field.addEventListener("input", cacheNutritionProfile);
  });
  document.querySelector("#generateNutritionDemo")?.addEventListener("click", () => {
    resetNutritionPlannerForAction();
    state.nutritionAssignNotice = "Fresh meal plan generated. Choose a client and press Assign Plan To Client.";
    render();
  });
  document.querySelector("#resetNutritionPlanner")?.addEventListener("click", () => {
    state.editModal = null;
    state.editModalDirty = false;
    store.settings.nutritionPlannerEnabled = true;
    store.settings.nutritionDemoMode = "Active";
    state.nutritionDemo = {
      ...state.nutritionDemo,
      ...collectNutritionDemoOptions(),
      openDay: 1,
      dayModalOpen: false,
      recipeModal: null,
      generatedPlan: null,
      assignedPlanId: null
    };
    state.nutritionAssignNotice = "Meal planner reset. Press Generate Meal Plan to build a fresh plan.";
    saveStore();
    render();
  });
  document.querySelector("#nutritionAssignClient")?.addEventListener("change", (event) => {
    state.clientId = event.target.value;
    state.nutritionAssignNotice = "";
    render();
  });
  document.querySelector("#assignNutritionPlan")?.addEventListener("click", () => {
    state.editModal = null;
    state.editModalDirty = false;
    state.nutritionDemo.dayModalOpen = false;
    state.nutritionDemo.recipeModal = null;
    store.settings.nutritionPlannerEnabled = true;
    store.settings.nutritionDemoMode = "Active";
    try {
      ensureStoreListShape(store);
      const assigned = assignGeneratedMealPlanToClient(document.querySelector("#nutritionAssignClient")?.value || state.clientId);
      if (!assigned) window.alert(state.nutritionAssignNotice || "Choose a client before assigning a meal plan.");
    } catch (error) {
      console.error("Meal plan assignment failed.", error);
      state.nutritionAssignNotice = `Meal plan could not be assigned: ${error.message || "saved app data needed cleanup"}. Press Reset Meal Planner, then Generate Meal Plan.`;
      window.alert(state.nutritionAssignNotice);
    }
    render();
  });
  document.querySelector("#requestMealPlanAddon")?.addEventListener("click", () => {
    requestClientMealPlanAddon();
    state.view = "chat";
    render();
  });
  document.querySelectorAll("[data-open-nutrition-day]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = null;
    state.editModalDirty = false;
    state.nutritionDemo.recipeModal = null;
    state.nutritionDemo.openDay = Number(button.dataset.openNutritionDay || 1);
    state.nutritionDemo.dayModalOpen = true;
    render();
  }));
  document.querySelectorAll("[data-open-meal-recipe]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = null;
    state.editModalDirty = false;
    state.nutritionDemo.dayModalOpen = false;
    state.nutritionDemo.recipeModal = {
      planId: button.dataset.planId,
      day: Number(button.dataset.day || 1),
      mealIndex: Number(button.dataset.mealIndex || 0)
    };
    render();
  }));
  document.querySelector("#closeNutritionDayModal")?.addEventListener("click", () => {
    state.nutritionDemo.dayModalOpen = false;
    render();
  });
  document.querySelector("#closeNutritionRecipeModal")?.addEventListener("click", () => {
    state.nutritionDemo.recipeModal = null;
    render();
  });
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.addEventListener("click", (event) => {
    if (event.target !== backdrop) return;
    closeOpenPopups();
    render();
  }));
  document.querySelectorAll("[data-toggle-favorite-meal]").forEach((button) => button.addEventListener("click", (event) => {
    toggleFavoriteMealForClient(event.currentTarget.dataset.mealId);
    render();
  }));
  document.querySelectorAll("[data-toggle-disliked-meal]").forEach((button) => button.addEventListener("click", (event) => {
    toggleDislikedMealForClient(event.currentTarget.dataset.mealId);
    render();
  }));
  document.querySelectorAll("[data-track-meal-status]").forEach((button) => button.addEventListener("click", (event) => {
    const planId = event.currentTarget.dataset.planId;
    const dayNumber = Number(event.currentTarget.dataset.day || 1);
    const mealIndex = Number(event.currentTarget.dataset.mealIndex || 0);
    const note = document.querySelector(`#mealTrackNote-${dayNumber}-${mealIndex}`)?.value || "";
    trackMealStatus(planId, dayNumber, mealIndex, event.currentTarget.dataset.trackMealStatus, note);
    render();
  }));
  document.querySelector("[data-substitute-client-meal]")?.addEventListener("click", (event) => {
    const planId = event.currentTarget.dataset.planId;
    const dayNumber = Number(event.currentTarget.dataset.day || 1);
    const mealIndex = Number(event.currentTarget.dataset.mealIndex || 0);
    const selectedMealId = document.querySelector(`#clientMealSubstitute-${dayNumber}-${mealIndex}`)?.value;
    replaceAssignedMeal(planId, dayNumber, mealIndex, selectedMealId);
    state.nutritionDemo.recipeModal = { planId, day: dayNumber, mealIndex };
    render();
  });
  document.querySelectorAll("[data-change-nutrition-meal]").forEach((button) => button.addEventListener("click", () => {
    const dayNumber = Number(button.dataset.day || 1);
    const mealIndex = Number(button.dataset.mealIndex || 0);
    const selectedMealId = document.querySelector(`#nutritionSwap-${dayNumber}-${mealIndex}`)?.value;
    replaceNutritionDemoMeal(dayNumber, mealIndex, selectedMealId);
    state.nutritionDemo.dayModalOpen = true;
    state.nutritionDemo.openDay = dayNumber;
    render();
  }));
  document.querySelectorAll("[data-smart-nutrition-meal]").forEach((button) => button.addEventListener("click", () => {
    const dayNumber = Number(button.dataset.day || 1);
    const mealIndex = Number(button.dataset.mealIndex || 0);
    smartReplaceNutritionDemoMeal(dayNumber, mealIndex);
    state.nutritionDemo.dayModalOpen = true;
    state.nutritionDemo.openDay = dayNumber;
    render();
  }));
  document.querySelectorAll("[data-smart-nutrition-day]").forEach((button) => button.addEventListener("click", () => {
    const dayNumber = Number(button.dataset.day || state.nutritionDemo.openDay || 1);
    smartReplaceNutritionDemoDay(dayNumber);
    state.nutritionDemo.dayModalOpen = true;
    state.nutritionDemo.openDay = dayNumber;
    render();
  }));
  document.querySelectorAll("[data-print-nutrition-shopping-list], #printNutritionShoppingList").forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    printNutritionShoppingList();
  }));
  document.querySelector("#turnOffNutritionDemo")?.addEventListener("click", () => {
    store.settings.nutritionDemoMode = "Off";
    store.settings.nutritionPlannerEnabled = false;
    state.nutritionDemo.generatedPlan = null;
    saveStore();
    render();
  });
  document.querySelectorAll("[data-admin-open-schedule-client]").forEach((button) => button.addEventListener("click", () => {
    changeSelectedClient(button.dataset.adminOpenScheduleClient, false);
    state.view = "home";
    state.planDraftNotice = "Admin is viewing this client's assessment scheduling card.";
    render();
  }));
  document.querySelectorAll("[data-admin-open-schedule-chat]").forEach((button) => button.addEventListener("click", () => {
    changeSelectedClient(button.dataset.adminOpenScheduleChat, false);
    state.view = "chat";
    render();
  }));
  document.querySelectorAll("[data-admin-approve-schedule]").forEach((button) => button.addEventListener("click", () => {
    const schedule = respondToAssessmentSchedule(store, state.currentUser, button.dataset.adminApproveSchedule, { action: "approve" });
    createAssessmentScheduleCoachAlert(schedule, "Admin approved the assessment appointment.");
    state.planDraftNotice = "Admin approved the assessment appointment.";
    render();
  }));
  document.querySelectorAll("[data-admin-schedule-chat]").forEach((button) => button.addEventListener("click", () => {
    const schedule = respondToAssessmentSchedule(store, state.currentUser, button.dataset.adminScheduleChat, {
      action: "reject",
      rejectionReason: "Admin moved this schedule to chat so coach and client can agree on a better time."
    });
    createAssessmentScheduleCoachAlert(schedule, "Admin moved the assessment appointment into chat.");
    changeSelectedClient(schedule.clientId, false);
    state.view = "chat";
    render();
  }));
  document.querySelector("#exportAppData")?.addEventListener("click", () => {
    exportAppData();
    render();
  });
  document.querySelector("#importAppDataButton")?.addEventListener("click", () => {
    document.querySelector("#importAppDataInput")?.click();
  });
  document.querySelector("#importAppDataInput")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    importAppDataFile(file);
  });
  document.querySelector("#copySupabaseSql")?.addEventListener("click", async () => {
    await copyTextToClipboard(supabaseSetupSql(document.querySelector("#supabaseBackupTable")?.value || store.settings.supabaseBackupTable));
    state.syncStatus = "Supabase setup SQL copied. Paste it into Supabase SQL Editor and run it once.";
    render();
  });
  document.querySelector("#copySupabaseEraseSql")?.addEventListener("click", async () => {
    await copyTextToClipboard(supabaseEraseSql(document.querySelector("#supabaseBackupTable")?.value || store.settings.supabaseBackupTable));
    state.syncStatus = "Erase Supabase SQL copied. Run it in Supabase SQL Editor only if you want to remove old cloud backups, then click Backup to Supabase to create a fresh coaching-data backup.";
    render();
  });
  document.querySelector("#saveSupabaseConfig")?.addEventListener("click", () => {
    store.settings.supabaseUrl = normalizeSupabaseUrl(document.querySelector("#supabaseUrl")?.value || "");
    store.settings.supabaseAnonKey = document.querySelector("#supabaseAnonKey")?.value.trim() || "";
    store.settings.supabaseBackupTable = document.querySelector("#supabaseBackupTable")?.value.trim() || "smart_coach_backups";
    saveStore();
    state.syncStatus = "Supabase settings saved on this device.";
    render();
  });
  document.querySelector("#testSupabaseConnection")?.addEventListener("click", async () => {
    store.settings.supabaseUrl = normalizeSupabaseUrl(document.querySelector("#supabaseUrl")?.value || store.settings.supabaseUrl || "");
    store.settings.supabaseAnonKey = document.querySelector("#supabaseAnonKey")?.value.trim() || store.settings.supabaseAnonKey || "";
    store.settings.supabaseBackupTable = document.querySelector("#supabaseBackupTable")?.value.trim() || store.settings.supabaseBackupTable || "smart_coach_backups";
    saveStore();
    state.syncStatus = "Testing Supabase connection...";
    render();
    try {
      const result = await checkSupabaseBackupStatus({
        url: store.settings.supabaseUrl,
        anonKey: store.settings.supabaseAnonKey,
        table: store.settings.supabaseBackupTable
      });
      state.syncStatus = result.rowCount
        ? `Supabase connection works. The latest coaching-data backup pointer is available from ${result.latest?.created_at || "Unknown date"}.`
        : "Supabase connection works, but the backup table has 0 rows. Click Backup to Supabase to create the first backup.";
    } catch (error) {
      state.syncStatus = `Supabase connection test failed: ${error.message}`;
    }
    window.alert(state.syncStatus);
    render();
  });
  document.querySelector("#restoreSupabaseData")?.addEventListener("click", async () => {
    await syncLatestCloudData(true);
  });
  document.querySelector("#backupSupabaseData")?.addEventListener("click", async () => {
    store.settings.supabaseUrl = normalizeSupabaseUrl(document.querySelector("#supabaseUrl")?.value || store.settings.supabaseUrl || "");
    store.settings.supabaseAnonKey = document.querySelector("#supabaseAnonKey")?.value.trim() || store.settings.supabaseAnonKey || "";
    store.settings.supabaseBackupTable = document.querySelector("#supabaseBackupTable")?.value.trim() || store.settings.supabaseBackupTable || "smart_coach_backups";
    saveStore();
    state.supabaseBackupBusy = true;
    state.syncStatus = "Starting Supabase backup...";
    render();
    try {
      const result = await backupStoreToSupabase({
        url: store.settings.supabaseUrl,
        anonKey: store.settings.supabaseAnonKey,
        table: store.settings.supabaseBackupTable
      });
      lastCloudBackupFingerprint = cloudBackupFingerprint();
      lastCloudBackupId = result.backupId;
      state.syncStatus = `Supabase coaching backup complete: ${result.backupId}. Saved ${result.summary.users || 0} users, ${result.summary.clients || 0} clients, ${result.summary.coaches || 0} coach/admin profiles, ${result.summary.chatMessages || 0} chat messages, ${result.summary.assessments || 0} assessments, ${result.summary.dailyCheckIns || 0} daily check-ins, ${result.summary.weeklyCheckIns || 0} weekly check-ins, and ${result.summary.monthlyPlans || 0} client monthly plans. Built-in workouts, exercise library, templates, offerings, and packages stay inside the app files.`;
    } catch (error) {
      state.syncStatus = String(error.message || "").includes("42501") || String(error.message || "").toLowerCase().includes("row-level security")
        ? "Supabase is connected, but Row Level Security is blocking backups. In Supabase, open SQL Editor and run the Setup SQL shown in this app's Data Sync section, then click Backup to Supabase again."
        : `Supabase backup failed: ${error.message}. Check the URL, publishable key, table exists, and setup SQL has been run.`;
    } finally {
      state.supabaseBackupBusy = false;
      window.alert(state.syncStatus);
      render();
    }
  });
  document.querySelector("#resetSupabaseTable")?.addEventListener("click", async () => {
    const confirmed = window.confirm("This will clear every backup row in the Supabase backup table. The app data on this device will stay here. After reset, click Backup to Supabase to create a fresh cloud copy. Continue?");
    if (!confirmed) return;
    store.settings.supabaseUrl = normalizeSupabaseUrl(document.querySelector("#supabaseUrl")?.value || store.settings.supabaseUrl || "");
    store.settings.supabaseAnonKey = document.querySelector("#supabaseAnonKey")?.value.trim() || store.settings.supabaseAnonKey || "";
    store.settings.supabaseBackupTable = document.querySelector("#supabaseBackupTable")?.value.trim() || store.settings.supabaseBackupTable || "smart_coach_backups";
    saveStore();
    state.supabaseResetBusy = true;
    state.syncStatus = "Resetting Supabase backup table...";
    render();
    try {
      await resetSupabaseBackupTable({
        url: store.settings.supabaseUrl,
        anonKey: store.settings.supabaseAnonKey,
        table: store.settings.supabaseBackupTable
      });
      state.syncStatus = "Supabase backup table reset. Click Backup to Supabase now to create a fresh cloud copy from this device.";
    } catch (error) {
      state.syncStatus = String(error.message || "").includes("42501") || String(error.message || "").toLowerCase().includes("row-level security")
        ? "Supabase reset is blocked by permissions. Copy and run the updated Setup SQL in Supabase SQL Editor, then try Reset Supabase Table again."
        : `Supabase reset failed: ${error.message}. Check the URL, publishable key, table exists, and updated Setup SQL has been run.`;
    } finally {
      state.supabaseResetBusy = false;
      window.alert(state.syncStatus);
      render();
    }
  });
  document.querySelectorAll("[data-open-exercise-editor]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    openExercisePopup(button.dataset.openExerciseEditor);
    render();
  }));
  document.querySelectorAll("[data-open-exercise-row]").forEach((row) => row.addEventListener("click", () => {
    openExercisePopup(row.dataset.openExerciseRow);
    render();
  }));
  document.querySelectorAll("[data-open-exercise-row]").forEach((row) => row.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    openExercisePopup(row.dataset.openExerciseRow);
    render();
  }));
  document.querySelectorAll("[data-open-library-exercise]").forEach((card) => card.addEventListener("click", () => {
    if (state.currentUser.role !== "Admin") return;
    openExercisePopup(card.dataset.openLibraryExercise);
    render();
  }));
  document.querySelectorAll("[data-open-library-exercise]").forEach((card) => card.addEventListener("keydown", (event) => {
    if (state.currentUser.role !== "Admin" || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    openExercisePopup(card.dataset.openLibraryExercise);
    render();
  }));
  document.querySelectorAll("[data-open-library-exercise-button]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    openExercisePopup(button.dataset.openLibraryExerciseButton);
    render();
  }));
  document.querySelectorAll("[data-open-workout-exercise]").forEach((button) => button.addEventListener("click", () => {
    const [exerciseId, workoutItemId] = button.dataset.openWorkoutExercise.split(":");
    openExercisePopup(exerciseId, { workoutItemId, returnWorkoutId: state.editModal?.id });
    render();
  }));
  document.querySelectorAll("[data-open-client-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "client", id: button.dataset.openClientEditor };
    state.clientEditTab = "Profile";
    state.editModalDirty = false;
    store.adminAuditLog.push({ id: `audit_${Date.now()}`, adminUserId: state.currentUser.id, action: `Opened Edit Client popup for ${button.dataset.openClientEditor}`, createdAt: new Date().toISOString() });
    render();
  }));
  document.querySelectorAll("[data-open-workout-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "workout", id: button.dataset.openWorkoutEditor };
    render();
  }));
  document.querySelectorAll("[data-open-offering-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "offering", id: button.dataset.openOfferingEditor };
    render();
  }));
  document.querySelectorAll("[data-open-package-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "package", id: button.dataset.openPackageEditor };
    state.editModalDirty = false;
    render();
  }));
  document.querySelectorAll("[data-assign-package]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "packageAssign", id: button.dataset.assignPackage };
    render();
  }));
  document.querySelectorAll("[data-open-coach-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "coach", id: button.dataset.openCoachEditor };
    render();
  }));
  document.querySelectorAll("[data-open-assessment-template-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "assessmentTemplate", id: button.dataset.openAssessmentTemplateEditor };
    render();
  }));
  document.querySelectorAll("[data-review-account]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "account", id: button.dataset.reviewAccount };
    render();
  }));
  document.querySelectorAll("[data-account-action]").forEach((button) => button.addEventListener("click", () => {
    const [userId, action] = button.dataset.accountAction.split(":");
    adminReviewAccountRequest(store, state.currentUser, userId, action, {
      requestedRole: document.querySelector("#reviewRequestedRole")?.value,
      coachId: document.querySelector("#reviewCoachId")?.value,
      unlockProfile: document.querySelector("#reviewUnlockProfile")?.checked || false
    });
    state.editModal = null;
    render();
  }));
  document.querySelector("#accountRequestFilter")?.addEventListener("change", (event) => {
    state.accountRequestFilter = event.target.value;
    render();
  });
  document.querySelectorAll("#closeEditModal, #closeEditModalSecondary").forEach((button) => button.addEventListener("click", () => {
    if (["client", "package", "packageConnect", "packageAssign"].includes(state.editModal?.type) && state.editModalDirty && !window.confirm("Close without saving your changes?")) return;
    if (state.editModal?.type === "exercise" && state.exercisePopupMode === "edit" && state.editModalDirty && !window.confirm("Close without saving your exercise changes?")) return;
    state.editModal = null;
    state.editModalDirty = false;
    render();
  }));
  document.querySelectorAll("[data-edit-client-field]").forEach((field) => {
    field.addEventListener("input", () => state.editModalDirty = true);
    field.addEventListener("change", () => state.editModalDirty = true);
  });
  document.querySelectorAll("[data-client-edit-tab]").forEach((button) => button.addEventListener("click", () => {
    state.clientEditTab = button.dataset.clientEditTab;
    render();
  }));
  document.querySelectorAll("[data-edit-exercise-field]").forEach((field) => {
    field.addEventListener("input", () => state.editModalDirty = true);
    field.addEventListener("change", () => state.editModalDirty = true);
  });
  document.querySelectorAll("[data-exercise-popup-tab]").forEach((button) => button.addEventListener("click", () => {
    state.exercisePopupTab = button.dataset.exercisePopupTab;
    render();
  }));
  document.querySelector("#exercisePopupEdit")?.addEventListener("click", () => {
    state.exercisePopupMode = "edit";
    state.editModalDirty = false;
    render();
  });
  document.querySelector("#exercisePopupItemOnly")?.addEventListener("click", () => {
    window.alert("Use the workout item fields in this popup to change only sets, reps, time, rest, rounds, notes, or order.");
  });
  document.querySelector("#exercisePopupCancelEdit")?.addEventListener("click", () => {
    if (state.editModalDirty && !window.confirm("Cancel without saving exercise changes?")) return;
    state.exercisePopupMode = "view";
    state.editModalDirty = false;
    render();
  });
  document.querySelector("#saveExerciseModal")?.addEventListener("click", (event) => {
    const exerciseId = event.currentTarget.dataset.exerciseId;
    const patch = collectEditFields("exercise");
    patch.name = patch.exerciseName;
    patch.planLevel = patch.trainingLevel;
    patch.youtubeUrl = patch.youtubeUrl || patch.videoUrl;
    patch.equipment = csvValue(patch.equipment);
    patch.bodyArea = csvValue(patch.bodyArea);
    patch.stressArea = csvValue(patch.stressArea);
    patch.coachingCues = csvValue(patch.coachingCues);
    patch.commonMistakes = csvValue(patch.commonMistakes);
    patch.safetyWarnings = csvValue(patch.safetyWarnings);
    patch.painWarnings = patch.safetyWarnings;
    patch.contraindications = csvValue(patch.contraindications);
    patch.lowImpact = document.querySelector("#editExerciseLowImpact")?.checked || false;
    patch.recoveryAlternative = document.querySelector("#editExerciseRecoveryAlternative")?.checked || false;
    patch.active = document.querySelector("#editExerciseActive")?.checked || false;
    patch.archived = !patch.active;
    adminUpdateExercise(store, state.currentUser, exerciseId, patch);
    store.adminAuditLog.push({ id: `audit_${Date.now()}`, adminUserId: state.currentUser.id, action: `Edited exercise from popup ${exerciseId}`, createdAt: new Date().toISOString() });
    if (patch.youtubeUrl || patch.videoUrl) store.adminAuditLog.push({ id: `audit_${Date.now()}_video`, adminUserId: state.currentUser.id, action: `Added or updated video link from popup ${exerciseId}`, createdAt: new Date().toISOString() });
    state.exercisePopupMode = "view";
    state.editModalDirty = false;
    window.alert("Exercise changes saved.");
    render();
  });
  document.querySelector("#exercisePopupDuplicate")?.addEventListener("click", (event) => {
    const duplicate = adminDuplicateExercise(store, state.currentUser, event.currentTarget.dataset.exerciseId);
    store.adminAuditLog.push({ id: `audit_${Date.now()}`, adminUserId: state.currentUser.id, action: `Duplicated exercise from popup ${event.currentTarget.dataset.exerciseId}`, createdAt: new Date().toISOString() });
    state.editModal = { type: "exercise", id: duplicate.id };
    state.exercisePopupMode = "view";
    state.exercisePopupTab = "Overview";
    render();
  });
  document.querySelector("#exercisePopupArchive")?.addEventListener("click", (event) => {
    if (!window.confirm("Are you sure you want to archive this exercise? It will no longer be active, but workout history will be kept.")) return;
    adminArchiveExercise(store, state.currentUser, event.currentTarget.dataset.exerciseId);
    store.adminAuditLog.push({ id: `audit_${Date.now()}`, adminUserId: state.currentUser.id, action: `Archived exercise from popup ${event.currentTarget.dataset.exerciseId}`, createdAt: new Date().toISOString() });
    state.exercisePopupMode = "view";
    render();
  });
  document.querySelector("#exercisePopupDelete")?.addEventListener("click", (event) => {
    const usage = exerciseUsageSummary(event.currentTarget.dataset.exerciseId);
    if (usage.used) {
      window.alert("This exercise is connected to existing workouts or history. Archive is recommended instead of delete.");
      if (!window.confirm("Are you sure you still want to permanently delete this exercise? This cannot be undone.")) return;
    } else if (!window.confirm("Are you sure you want to permanently delete this exercise? This cannot be undone.")) return;
    adminDeleteExercise(store, state.currentUser, event.currentTarget.dataset.exerciseId);
    store.adminAuditLog.push({ id: `audit_${Date.now()}`, adminUserId: state.currentUser.id, action: `Deleted exercise from popup ${event.currentTarget.dataset.exerciseId}`, createdAt: new Date().toISOString() });
    state.editModal = null;
    render();
  });
  document.querySelectorAll("[data-save-popup-workout-item]").forEach((button) => button.addEventListener("click", () => {
    const itemId = button.dataset.savePopupWorkoutItem;
    adminUpdateWorkoutTemplateItem(store, state.currentUser, itemId, {
      sets: document.getElementById(`popupItemSets-${itemId}`)?.value,
      reps: document.getElementById(`popupItemReps-${itemId}`)?.value,
      time: document.getElementById(`popupItemTime-${itemId}`)?.value,
      rest: document.getElementById(`popupItemRest-${itemId}`)?.value,
      rounds: document.getElementById(`popupItemRounds-${itemId}`)?.value,
      displayOrder: Number(document.getElementById(`popupItemOrder-${itemId}`)?.value || 0),
      coachingNotes: document.getElementById(`popupItemCoachNotes-${itemId}`)?.value || "",
      clientNotes: document.getElementById(`popupItemClientNotes-${itemId}`)?.value || ""
    });
    store.adminAuditLog.push({ id: `audit_${Date.now()}`, adminUserId: state.currentUser.id, action: `Edited workout item from exercise popup ${itemId}`, createdAt: new Date().toISOString() });
    window.alert("Workout item updated without changing the master exercise.");
    render();
  }));
  document.querySelector("#saveWorkoutModal")?.addEventListener("click", (event) => {
    const workoutId = event.currentTarget.dataset.workoutId;
    const patch = collectEditFields("workout");
    patch.planLevel = patch.trainingLevel;
    adminUpdateWorkoutTemplate(store, state.currentUser, workoutId, patch);
    state.editModal = null;
    render();
  });
  document.querySelector("#saveOfferingModal")?.addEventListener("click", (event) => {
    const offeringId = event.currentTarget.dataset.offeringId;
    const patch = collectEditFields("offering");
    patch.planLevel = patch.trainingLevel;
    patch.trainingDaysPerWeek = Number(patch.trainingDaysPerWeek || 0);
    patch.sessionLength = Number(patch.sessionLength || 0);
    patch.price = Number(patch.price || 0);
    patch.sessionsIncluded = Number(patch.sessionsIncluded || 0);
    patch.workoutTemplateIds = Array.from(document.querySelector("#editOfferingTemplates")?.selectedOptions || []).map((option) => option.value);
    adminUpdatePlanOffering(store, state.currentUser, offeringId, patch);
    state.editModal = null;
    render();
  });
  document.querySelector("#savePackageModal")?.addEventListener("click", (event) => {
    const packageId = event.currentTarget.dataset.packageId;
    const patch = collectEditFields("package");
    const selectedOfferingIds = Array.from(document.querySelector("#editPackageOfferings")?.selectedOptions || []).map((option) => option.value);
    if (patch.planOfferingId && !selectedOfferingIds.includes(patch.planOfferingId)) selectedOfferingIds.unshift(patch.planOfferingId);
    patch.planOfferingIds = selectedOfferingIds;
    patch.planOfferingId = patch.planOfferingId || selectedOfferingIds[0] || null;
    patch.active = patch.active === "true";
    adminUpdatePackage(store, state.currentUser, packageId, patch);
    state.editModal = null;
    state.editModalDirty = false;
    render();
  });
  document.querySelector("#savePackageOfferingsModal")?.addEventListener("click", (event) => {
    const packageId = event.currentTarget.dataset.packageId;
    const selectedOfferingIds = Array.from(document.querySelector("#connectPackageOfferings")?.selectedOptions || []).map((option) => option.value);
    if (!selectedOfferingIds.length) return window.alert("Choose at least one plan offering to connect.");
    const mainOffering = store.planOfferings.find((offering) => offering.id === selectedOfferingIds[0]);
    adminUpdatePackage(store, state.currentUser, packageId, {
      planOfferingId: mainOffering.id,
      planOfferingIds: selectedOfferingIds,
      price: mainOffering.price || 0,
      sessionsIncluded: mainOffering.sessionsIncluded || 0
    });
    window.alert("Plan offerings connected to package.");
    state.editModal = null;
    state.editModalDirty = false;
    render();
  });
  document.querySelector("#saveAssignPackageModal")?.addEventListener("click", () => {
    const packageId = document.querySelector("#assignPackageId")?.value;
    const clientId = document.querySelector("#assignPackageClientId")?.value;
    const planOfferingId = document.querySelector("#assignPackageOfferingId")?.value || null;
    if (!packageId || !clientId) return window.alert("Choose both a package and a client.");
    adminAssignPackageToClient(store, state.currentUser, clientId, packageId, planOfferingId);
    state.clientId = clientId;
    window.alert("Package assigned to client.");
    state.editModal = null;
    state.editModalDirty = false;
    render();
  });
  document.querySelector("#assignPackageId")?.addEventListener("change", (event) => {
    state.editModal = { type: "packageAssign", id: event.currentTarget.value };
    render();
  });
  document.querySelector("#saveCoachModal")?.addEventListener("click", (event) => {
    const coachId = event.currentTarget.dataset.coachId;
    const patch = collectEditFields("coach");
    patch.fullName = patch.name;
    patch.profileLocked = patch.profileLocked === "true";
    adminUpdateCoach(store, state.currentUser, coachId, patch);
    state.editModal = null;
    render();
  });
  document.querySelector("#coachModalToggleProfileLock")?.addEventListener("click", (event) => {
    const coachId = event.currentTarget.dataset.coachId;
    const coach = store.coaches.find((item) => item.id === coachId);
    const user = store.users.find((item) => item.role === "Coach" && item.linkedId === coachId);
    const currentlyLocked = Boolean(coach?.profileLocked || user?.profileLocked);
    adminUpdateCoach(store, state.currentUser, coachId, { profileLocked: !currentlyLocked });
    window.alert(currentlyLocked ? "Coach profile page unlocked." : "Coach profile page locked.");
    render();
  });
  document.querySelector("#coachModalSetPin")?.addEventListener("click", (event) => {
    try {
      const pin = document.querySelector("#coachModalNewPin")?.value || "";
      const confirmPin = document.querySelector("#coachModalConfirmPin")?.value || "";
      if (pin !== confirmPin) throw new Error("PIN and Confirm PIN must match.");
      let user = store.users.find((item) => item.role === "Coach" && item.linkedId === event.currentTarget.dataset.coachId);
      user = user || adminEnsureCoachLogin(store, state.currentUser, event.currentTarget.dataset.coachId, pin);
      adminSetUserPin(store, state.currentUser, user.id, pin);
      window.alert(`PIN updated for ${user.name}. They must use the new PIN next login.`);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelector("#coachModalResetPin")?.addEventListener("click", (event) => {
    let user = store.users.find((item) => item.role === "Coach" && item.linkedId === event.currentTarget.dataset.coachId);
    user = user || adminEnsureCoachLogin(store, state.currentUser, event.currentTarget.dataset.coachId, "0000");
    window.alert(`Temporary PIN for ${user.name}: ${adminResetUserPin(store, state.currentUser, user.id).temporaryPin}`);
    render();
  });
  document.querySelector("#saveClientModal")?.addEventListener("click", (event) => {
    try {
      const clientId = event.currentTarget.dataset.clientId;
      const patch = collectEditFields("client");
      patch.fullName = patch.name;
      patch.assignedCoach = patch.coachId;
      patch.age = Number(patch.age || 0);
      patch.heightInches = Number(patch.heightInches || 0);
      patch.currentWeightLb = Number(patch.currentWeightLb || 0);
      patch.weight = patch.currentWeightLb;
      patch.goalWeightLb = Number(patch.goalWeightLb || 0);
      patch.trainingDaysPerWeek = Number(patch.trainingDaysPerWeek || 0);
      patch.sessionLength = Number(patch.sessionLength || 0);
      patch.sessionsPurchased = Number(patch.sessionsPurchased || 0);
      patch.sessionsUsed = Number(patch.sessionsUsed || 0);
      patch.sessionsRemaining = Number(patch.sessionsRemaining || 0);
      patch.accountLocked = patch.accountLocked === "true";
      patch.profileLocked = patch.profileLocked === "true";
      patch.currentRestrictions = csvValue(patch.currentRestrictions);
      patch.equipmentAvailable = csvValue(patch.equipmentAvailable);
      if (patch.packageId) {
        const pkg = store.packages.find((item) => item.id === patch.packageId);
        patch.packageType = pkg?.packageName || patch.packageType;
      }
      adminUpdateClient(store, state.currentUser, clientId, patch);
      changeSelectedClient(clientId, false);
      window.alert("Client changes saved.");
      state.editModal = null;
      state.editModalDirty = false;
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelector("#clientModalSetPin")?.addEventListener("click", (event) => {
    try {
      const pin = document.querySelector("#clientModalNewPin")?.value || "";
      const confirmPin = document.querySelector("#clientModalConfirmPin")?.value || "";
      if (pin !== confirmPin) throw new Error("PIN and Confirm PIN must match.");
      let user = store.users.find((item) => item.role === "Client" && item.linkedId === event.currentTarget.dataset.clientId);
      user = user || adminEnsureClientLogin(store, state.currentUser, event.currentTarget.dataset.clientId, pin);
      adminSetUserPin(store, state.currentUser, user.id, pin);
      window.alert(`PIN updated for ${user.name}. They must use the new PIN next login.`);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelectorAll("[data-edit-template-test]").forEach((button) => button.addEventListener("click", () => {
    const template = store.assessmentTemplates.find((item) => item.id === state.editModal?.id);
    if (!template) return;
    template.movementTestIds = template.movementTestIds || [];
    toggleArrayNoRender(template.movementTestIds, button.dataset.editTemplateTest);
    render();
  }));
  document.querySelector("#saveAssessmentTemplateModal")?.addEventListener("click", (event) => {
    const templateId = event.currentTarget.dataset.templateId;
    const template = store.assessmentTemplates.find((item) => item.id === templateId);
    const patch = collectEditFields("assessmentTemplate");
    patch.movementTestIds = template?.movementTestIds || movementTests.map((test) => test.id);
    adminUpdateAssessmentTemplate(store, state.currentUser, templateId, patch);
    state.editModal = null;
    render();
  });
  document.querySelectorAll("[data-save-workout-item]").forEach((button) => button.addEventListener("click", () => {
    const itemId = button.dataset.saveWorkoutItem;
    const exercise = store.exercises.find((item) => item.id === document.getElementById(`itemExercise-${itemId}`)?.value);
    adminUpdateWorkoutTemplateItem(store, state.currentUser, itemId, {
      exerciseId: exercise?.id,
      exerciseName: exercise?.exerciseName || exercise?.name,
      sessionPart: document.getElementById(`itemPart-${itemId}`)?.value,
      sets: document.getElementById(`itemSets-${itemId}`)?.value,
      reps: document.getElementById(`itemReps-${itemId}`)?.value,
      time: document.getElementById(`itemTime-${itemId}`)?.value,
      rest: document.getElementById(`itemRest-${itemId}`)?.value,
      rounds: document.getElementById(`itemRounds-${itemId}`)?.value,
      displayOrder: Number(document.getElementById(`itemOrder-${itemId}`)?.value || 0)
    });
    render();
  }));
  document.querySelectorAll("[data-remove-workout-item]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Remove this exercise from the workout?")) return;
    adminRemoveWorkoutTemplateItem(store, state.currentUser, button.dataset.removeWorkoutItem);
    render();
  }));
  document.querySelector("#modalAddWorkoutItem")?.addEventListener("click", (event) => {
    const workoutId = event.currentTarget.dataset.workoutId;
    const exercise = store.exercises.find((item) => item.id === document.querySelector("#modalNewItemExercise")?.value);
    adminAddExerciseToWorkoutTemplate(store, state.currentUser, workoutId, {
      exerciseId: exercise?.id,
      exerciseName: exercise?.exerciseName || exercise?.name,
      sessionPart: document.querySelector("#modalNewItemPart")?.value,
      sets: document.querySelector("#modalNewItemSets")?.value,
      reps: document.querySelector("#modalNewItemReps")?.value,
      time: document.querySelector("#modalNewItemTime")?.value,
      rest: document.querySelector("#modalNewItemRest")?.value,
      rounds: document.querySelector("#modalNewItemRounds")?.value
    });
    render();
  });
  document.querySelectorAll("[data-admin-jump]").forEach((button) => button.addEventListener("click", () => {
    const map = {
      "View Alerts": "admin-alerts",
      "View Chats": "admin-chats"
    };
    document.getElementById(map[button.dataset.adminJump])?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  document.querySelector("#adminCreateClient")?.addEventListener("click", () => {
    const client = adminCreateClient(store, state.currentUser, state.adminDrafts.client);
    changeSelectedClient(client.id, false);
    render();
  });
  document.querySelector("#adminCreateCoach")?.addEventListener("click", () => {
    try {
      adminCreateCoach(store, state.currentUser, state.adminDrafts.coach);
      state.adminDrafts.coach = {
        firstName: "",
        lastName: "",
        fullName: "",
        email: "",
        phone: "",
        specialty: "",
        bio: "",
        emergencyContact: "",
        status: "Active",
        pin: "1234",
        confirmPin: "1234",
        forcePinChange: true
      };
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelectorAll("[data-save-client]").forEach((button) => button.addEventListener("click", () => {
    const name = document.querySelector(`[data-client-name="${button.dataset.saveClient}"]`).value;
    adminUpdateClient(store, state.currentUser, button.dataset.saveClient, { name, fullName: name });
    render();
  }));
  document.querySelector("#clientModalResetPin")?.addEventListener("click", (event) => {
    let user = store.users.find((item) => item.role === "Client" && item.linkedId === event.currentTarget.dataset.clientId);
    user = user || adminEnsureClientLogin(store, state.currentUser, event.currentTarget.dataset.clientId, "0000");
    window.alert(`Temporary PIN for ${user.name}: ${adminResetUserPin(store, state.currentUser, user.id).temporaryPin}`);
    render();
  });
  document.querySelector("#clientModalToggleLock")?.addEventListener("click", (event) => {
    const user = store.users.find((item) => item.role === "Client" && item.linkedId === event.currentTarget.dataset.clientId);
    if (user) adminUpdateClient(store, state.currentUser, event.currentTarget.dataset.clientId, { accountLocked: !user.accountLocked });
    render();
  });
  document.querySelector("#clientModalToggleProfileLock")?.addEventListener("click", (event) => {
    const client = store.clients.find((item) => item.id === event.currentTarget.dataset.clientId);
    adminUpdateClient(store, state.currentUser, event.currentTarget.dataset.clientId, { profileLocked: !client?.profileLocked });
    render();
  });
  document.querySelector("#clientModalGenerateDraft")?.addEventListener("click", (event) => {
    const planOfferingId = document.querySelector("#clientModalPlanOfferingForDraft")?.value;
    if (!planOfferingId) return window.alert("Choose a plan offering first.");
    const draft = generateMonthlyPlanFromPlanOffering(store, state.currentUser, event.currentTarget.dataset.clientId, planOfferingId);
    store.adminAuditLog.push({ id: `audit_${Date.now()}`, adminUserId: state.currentUser.id, action: `Generated new Draft monthly plan ${draft.id} from Edit Client popup`, createdAt: new Date().toISOString() });
    window.alert("New Draft monthly plan created.");
    render();
  });
  document.querySelector("#clientModalArchivePlan")?.addEventListener("click", (event) => {
    adminArchiveMonthlyPlan(store, state.currentUser, event.currentTarget.dataset.planId);
    window.alert("Current monthly plan archived.");
    render();
  });
  document.querySelector("#clientModalWorkoutWarning")?.addEventListener("click", () => {
    window.alert("Future workout changes are noted. Past workout history will not be deleted.");
  });
  document.querySelector("#clientModalScheduleAssessment")?.addEventListener("click", () => window.alert("Assessment scheduling note saved for Admin follow-up."));
  document.querySelector("#clientModalScheduleReassessment")?.addEventListener("click", () => window.alert("Reassessment scheduling note saved for Admin follow-up."));
  document.querySelector("#clientModalViewHistory")?.addEventListener("click", () => window.alert("Assessment and workout history is shown in the client profile and plan history sections."));
  ["#clientModalNewPin", "#clientModalConfirmPin", "#coachModalNewPin", "#coachModalConfirmPin"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", (event) => {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
    });
  });
  document.querySelectorAll("[data-archive-client]").forEach((button) => button.addEventListener("click", () => {
    adminArchiveClient(store, state.currentUser, button.dataset.archiveClient);
    render();
  }));
  document.querySelectorAll("[data-delete-client]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this client and their linked app records?")) return;
    adminDeleteClient(store, state.currentUser, button.dataset.deleteClient);
    state.clientId = store.clients[0]?.id || state.clientId;
    render();
  }));
  document.querySelectorAll("[data-reset-client-pin]").forEach((button) => button.addEventListener("click", () => {
    let user = store.users.find((item) => item.role === "Client" && item.linkedId === button.dataset.resetClientPin);
    user = user || adminEnsureClientLogin(store, state.currentUser, button.dataset.resetClientPin, "0000");
    window.alert(`Temporary PIN for ${user.name}: ${adminResetUserPin(store, state.currentUser, user.id).temporaryPin}`);
    render();
  }));
  document.querySelector("#adminCreateExercise")?.addEventListener("click", () => {
    adminCreateExercise(store, state.currentUser, state.adminDrafts.exercise);
    render();
  });
  document.querySelector("#adminImportExcel")?.addEventListener("click", () => {
    document.querySelector("#adminExerciseExcelInput")?.click();
  });
  document.querySelector("#adminExerciseExcelInput")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const rows = await readExerciseImportFile(file);
      const imported = adminImportExercisesFromRows(store, state.currentUser, rows);
      window.alert(`Imported ${imported.length} new exercises from ${file.name}. Existing duplicates were skipped.`);
      render();
    } catch (error) {
      window.alert(error.message);
    } finally {
      event.target.value = "";
    }
  });
  document.querySelectorAll("[data-save-exercise]").forEach((button) => button.addEventListener("click", () => {
    const exerciseName = document.querySelector(`[data-exercise-name="${button.dataset.saveExercise}"]`).value;
    const videoUrl = document.querySelector(`[data-exercise-video="${button.dataset.saveExercise}"]`)?.value || "";
    adminUpdateExercise(store, state.currentUser, button.dataset.saveExercise, { exerciseName, name: exerciseName, videoUrl, youtubeUrl: videoUrl });
    render();
  }));
  document.querySelectorAll("[data-archive-exercise]").forEach((button) => button.addEventListener("click", () => {
    adminArchiveExercise(store, state.currentUser, button.dataset.archiveExercise);
    render();
  }));
  document.querySelectorAll("[data-delete-exercise]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this exercise and remove it from templates?")) return;
    adminDeleteExercise(store, state.currentUser, button.dataset.deleteExercise);
    render();
  }));
  document.querySelector("#adminCreateWorkout")?.addEventListener("click", () => {
    const workout = adminCreateWorkoutTemplate(store, state.currentUser, state.adminDrafts.workout);
    state.adminDrafts.workoutItem.workoutTemplateId = workout.id;
    render();
  });
  document.querySelector("#adminImportWorkoutRows")?.addEventListener("click", () => {
    const workout = adminImportWorkoutTemplatesFromRows(store, state.currentUser, store.workbookWorkoutRows);
    state.adminDrafts.workoutItem.workoutTemplateId = workout.id;
    render();
  });
  document.querySelector("#adminAddWorkoutItem")?.addEventListener("click", () => {
    adminAddExerciseToWorkoutTemplate(store, state.currentUser, state.adminDrafts.workoutItem.workoutTemplateId, state.adminDrafts.workoutItem);
    render();
  });
  document.querySelectorAll("[data-save-template]").forEach((button) => button.addEventListener("click", () => {
    const workoutName = document.querySelector(`[data-template-name="${button.dataset.saveTemplate}"]`).value;
    adminUpdateWorkoutTemplate(store, state.currentUser, button.dataset.saveTemplate, { workoutName });
    render();
  }));
  document.querySelectorAll("[data-archive-template]").forEach((button) => button.addEventListener("click", () => {
    adminArchiveWorkoutTemplate(store, state.currentUser, button.dataset.archiveTemplate);
    render();
  }));
  document.querySelectorAll("[data-delete-template]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this workout template?")) return;
    adminDeleteWorkoutTemplate(store, state.currentUser, button.dataset.deleteTemplate);
    render();
  }));
  document.querySelectorAll("[data-reorder-template]").forEach((button) => button.addEventListener("click", () => {
    const items = store.workoutTemplateItems.filter((item) => item.workoutTemplateId === button.dataset.reorderTemplate).sort((a, b) => b.displayOrder - a.displayOrder);
    adminReorderWorkoutTemplateItems(store, state.currentUser, button.dataset.reorderTemplate, items.map((item) => item.id));
    render();
  }));
  document.querySelector("#adminCreatePlanOffering")?.addEventListener("click", () => {
    adminCreatePlanOffering(store, state.currentUser, {
      ...state.adminDrafts.planOffering,
      workoutTemplateIds: [state.adminDrafts.workoutItem.workoutTemplateId].filter(Boolean)
    });
    render();
  });
  document.querySelectorAll("[data-archive-offering]").forEach((button) => button.addEventListener("click", () => {
    adminArchivePlanOffering(store, state.currentUser, button.dataset.archiveOffering);
    render();
  }));
  document.querySelectorAll("[data-delete-offering]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this plan offering?")) return;
    adminDeletePlanOffering(store, state.currentUser, button.dataset.deleteOffering);
    render();
  }));
  document.querySelector("#adminCreatePackage")?.addEventListener("click", () => {
    adminCreatePackage(store, state.currentUser, state.adminDrafts.package);
    render();
  });
  document.querySelectorAll("[data-package-offering]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "packageConnect", id: button.dataset.packageOffering };
    render();
  }));
  document.querySelectorAll("[data-delete-package]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this package?")) return;
    adminDeletePackage(store, state.currentUser, button.dataset.deletePackage);
    render();
  }));
  document.querySelector("#adminAssignPackage")?.addEventListener("click", () => {
    state.editModal = { type: "packageAssign", id: store.packages[0]?.id || "" };
    render();
  });
  document.querySelectorAll("[data-save-pin]").forEach((button) => button.addEventListener("click", () => {
    const userId = button.dataset.savePin;
    const pin = document.querySelector(`[data-pin-user="${userId}"]`).value;
    adminSetUserPin(store, state.currentUser, userId, pin);
    render();
  }));
  document.querySelectorAll("[data-temp-pin]").forEach((button) => button.addEventListener("click", () => {
    const result = adminResetUserPin(store, state.currentUser, button.dataset.tempPin);
    window.alert(`Temporary PIN for ${result.user.name}: ${result.temporaryPin}`);
    render();
  }));
  document.querySelectorAll("[data-reset-coach-pin]").forEach((button) => button.addEventListener("click", () => {
    let user = store.users.find((item) => item.role === "Coach" && item.linkedId === button.dataset.resetCoachPin);
    user = user || adminEnsureCoachLogin(store, state.currentUser, button.dataset.resetCoachPin, "0000");
    window.alert(`Temporary PIN for ${user.name}: ${adminResetUserPin(store, state.currentUser, user.id).temporaryPin}`);
    render();
  }));
  document.querySelectorAll("[data-resolve-pin-request]").forEach((button) => button.addEventListener("click", () => {
    const [requestId, method] = button.dataset.resolvePinRequest.split(":");
    try {
      const result = adminResolvePinResetRequest(store, state.currentUser, requestId, method);
      window.alert(result.request.adminMessage);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  }));
  document.querySelectorAll("[data-toggle-login]").forEach((button) => button.addEventListener("click", () => {
    const user = store.users.find((item) => item.id === button.dataset.toggleLogin);
    adminSetLoginDisabled(store, state.currentUser, user.id, !user.disabled);
    render();
  }));
  document.querySelectorAll("[data-delete-coach]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this coach login/profile and reassign their clients?")) return;
    adminDeleteCoach(store, state.currentUser, button.dataset.deleteCoach);
    render();
  }));
  document.querySelectorAll("[data-save-coach-emergency]").forEach((button) => button.addEventListener("click", () => {
    const emergencyContact = document.querySelector(`[data-coach-emergency="${button.dataset.saveCoachEmergency}"]`)?.value || "";
    adminUpdateCoach(store, state.currentUser, button.dataset.saveCoachEmergency, { emergencyContact });
    render();
  }));
  document.querySelectorAll("[data-template-test]").forEach((button) => button.addEventListener("click", () => {
    toggleArrayNoRender(state.adminDrafts.assessmentTemplate.movementTestIds, button.dataset.templateTest);
    render();
  }));
  document.querySelector("#adminCreateAssessmentTemplate")?.addEventListener("click", () => {
    adminCreateAssessmentTemplate(store, state.currentUser, state.adminDrafts.assessmentTemplate);
    render();
  });
  document.querySelectorAll("[data-delete-assessment-template]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this assessment template?")) return;
    adminDeleteAssessmentTemplate(store, state.currentUser, button.dataset.deleteAssessmentTemplate);
    if (state.selectedAssessmentTemplateId === button.dataset.deleteAssessmentTemplate) state.selectedAssessmentTemplateId = store.assessmentTemplates[0]?.id || "";
    render();
  }));
  document.querySelectorAll("[data-save-workout]").forEach((button) => button.addEventListener("click", () => {
    const workoutId = button.dataset.saveWorkout;
    const title = document.querySelector(`[data-workout-title="${workoutId}"]`).value;
    adminUpdateWorkout(store, state.currentUser, workoutId, { title });
    render();
  }));
  document.querySelector("#adminInterveneButton")?.addEventListener("click", () => {
    const body = document.querySelector("#adminIntervention").value;
    const message = adminInterveneInChat(store, state.currentUser, state.clientId, body);
    saveStore();
    pushLiveChatMessage(message);
    backupPublicChangeToCloud();
    render();
  });
}

function changeSelectedClient(clientId, shouldRender = true) {
  state.clientId = clientId;
  state.assessment = blankAssessment(state.clientId, today);
  state.weekly.clientId = state.clientId;
  state.daily.clientId = state.clientId;
  const plan = store.monthlyPlans.find((p) => p.clientId === state.clientId && p.status === "Active" && p.approved);
  state.daily.monthlyPlanId = plan?.id;
  if (shouldRender) render();
}

function selectedClient() {
  return store.clients.find((client) => client.id === state.clientId);
}

function userForProfile(client) {
  if (state.currentUser.role === "Coach" && state.currentUser.linkedId === client?.coachId && state.view !== "profile") return state.currentUser;
  if (state.currentUser.role === "Admin" && !client) return state.currentUser;
  return store.users.find((user) => user.role === "Client" && user.linkedId === client?.id) || null;
}

function avatar(imageUrl, name, size = "") {
  const initials = String(name || "MK").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return `<div class="avatar ${size}">${imageUrl ? `<img src="${imageUrl}" alt="${name} profile image" />` : `<span>${initials}</span>`}</div>`;
}

async function readExerciseImportFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (["csv", "tsv"].includes(extension)) {
    const text = await file.text();
    return parseDelimitedRows(text, extension === "tsv" ? "\t" : ",");
  }
  if (["xlsx", "xls"].includes(extension)) {
    const XLSX = await loadXlsxLibrary();
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const preferredSheet = workbook.SheetNames.find((name) => /exercise|database|library/i.test(name)) || workbook.SheetNames[0];
    const sheet = workbook.Sheets[preferredSheet];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    if (!rows.length) throw new Error("No exercise rows were found in that Excel sheet.");
    return rows;
  }
  throw new Error("Choose an Excel, CSV, or TSV file.");
}

function parseDelimitedRows(text, delimiter) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) throw new Error("The file needs a header row and at least one exercise row.");
  const headers = splitDelimitedLine(lines[0], delimiter);
  return lines.slice(1).map((line) => {
    const values = splitDelimitedLine(line, delimiter);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] || "";
      return row;
    }, {});
  });
}

function splitDelimitedLine(line, delimiter) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === "\"" && quoted && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function loadXlsxLibrary() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (window.__xlsxLoader) return window.__xlsxLoader;
  window.__xlsxLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    script.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error("Excel reader loaded, but was not available."));
    script.onerror = () => reject(new Error("Could not load the Excel reader. Check your internet connection or try saving the sheet as CSV."));
    document.head.appendChild(script);
  });
  return window.__xlsxLoader;
}

function latestClientAssessment(clientId) {
  return store.assessments.filter((assessment) => assessment.clientId === clientId).at(-1) || null;
}

function smartDecisionPanel(client, assessment, lastCheckIn) {
  const easier = assessment.riskLevel === "High" || assessment.adjustmentMode === "Recovery" || lastCheckIn?.nextWorkoutDirection === "Easier";
  const harder = ["Advanced", "Pro"].includes(assessment.trainingLevel || assessment.planLevel) && lastCheckIn?.nextWorkoutDirection === "Harder";
  const decision = easier ? "Make workouts easier" : harder ? "Make workouts harder" : "Keep plan controlled";
  const actions = easier
    ? ["Lower impact", "More mobility", "More rest", "Easier strength exercises", "Less intense cardio"]
    : harder
      ? ["More rounds", "Harder variations", "More conditioning", "Advanced combinations", "Shorter rest periods"]
      : ["Rotate exercises", "Keep intensity steady", "Monitor weekly check-in", "Progress only if trend improves"];
  return `
    <article class="card decision-card">
      <p class="eyebrow">Smart plan decision</p>
      <h3>${decision}</h3>
      <p>${client.name}'s current plan should respond to assessment score, risk, weekly recovery, equipment, and training schedule.</p>
      ${chipSection("Next coaching actions", actions)}
    </article>
  `;
}

function todayPreviewPanel(client) {
  const dashboard = getClientDashboard(store, client.id, today);
  return `
    <article class="card decision-card">
      <p class="eyebrow">Today</p>
      <h3>${dashboard.workout?.title || "No workout scheduled"}</h3>
      <p>${dashboard.message}</p>
      ${dashboard.workout ? `<div class="chips"><span>Week ${dashboard.workout.weekNumber}</span><span>Day ${dashboard.workout.trainingDayNumber}</span><span>${dashboard.workout.sessionLength} min</span></div>` : ""}
      <button class="primary" data-view="client">Open Client View</button>
    </article>
  `;
}

function assessmentSchedulePanel(client) {
  const schedules = (store.assessmentSchedules || [])
    .filter((item) => item.clientId === client.id)
    .sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));
  const latest = schedules[0];
  const isClient = state.currentUser.role === "Client";
  const isCoachSide = state.currentUser.role === "Coach" || state.currentUser.role === "Admin";
  const canCoachRespond = latest && latest.status === "Pending Coach Approval" && isCoachSide;
  const canClientRespond = latest && latest.status === "Pending Client Approval" && isClient;
  const scheduleDate = latest?.proposedDate || latest?.counterDate || "";
  const scheduleTime = latest?.proposedTime || latest?.counterTime || "";
  const chatPrompt = latest?.status === "Needs Chat"
    ? `<div class="alert orange"><strong>Needs chat:</strong> Please agree on a date/time in chat, then the coach can resend the final appointment.</div>
       <button class="ghost" data-open-assessment-chat>Open Chat</button>`
    : "";
  const statusLine = latest
    ? `<div class="result-band assessment-schedule-status">
        <strong>${latest.assessmentType}: ${latest.status}</strong>
        <span>${formatScheduleDateTime(scheduleDate, scheduleTime)}</span>
        ${latest.clientNotes ? `<p><strong>Client note:</strong> ${escapeHtml(latest.clientNotes)}</p>` : ""}
        ${latest.coachNotes ? `<p><strong>Coach note:</strong> ${escapeHtml(latest.coachNotes)}</p>` : ""}
      </div>`
    : `<p class="muted">No assessment appointment is set yet.</p>`;

  return `
    <article class="card decision-card assessment-schedule-card">
      <p class="eyebrow">Assessment scheduling</p>
      <h3>${latest?.status === "Approved" ? "Assessment set" : "Set initial or reassessment time"}</h3>
      ${statusLine}
      ${chatPrompt}
      ${isCoachSide ? `
        <div class="form-grid compact-form">
          <label>Assessment type
            <select id="assessmentScheduleType">
              ${["Initial Assessment", "Reassessment"].map((type) => `<option ${latest?.assessmentType === type ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </label>
          <label>Date <input id="assessmentScheduleDate" type="date" value="${escapeHtml(scheduleDate)}" /></label>
          <label>Time <input id="assessmentScheduleTime" type="time" value="${escapeHtml(scheduleTime)}" /></label>
          <label>Coach note <input id="assessmentScheduleCoachNote" value="${escapeHtml(latest?.coachNotes || "")}" placeholder="Optional note" /></label>
        </div>
        <div class="actions">
          <button class="primary" id="sendAssessmentSchedule">${latest?.status === "Needs Chat" ? "Resend Agreed Time" : "Send Assessment Time"}</button>
          ${canCoachRespond ? `<button class="success" id="coachApproveAssessmentSchedule" data-schedule-id="${latest.id}">Approve Client Time</button>
          <button class="ghost" id="rejectAssessmentScheduleOpenChat" data-schedule-id="${latest.id}">Reject and Open Chat</button>` : ""}
        </div>
      ` : ""}
      ${isClient ? `
        ${canClientRespond ? `
          <div class="actions">
            <button class="success" id="clientApproveAssessmentSchedule" data-schedule-id="${latest.id}">Approve Time</button>
          </div>
        ` : ""}
        <div class="form-grid compact-form">
          <label>Suggest date <input id="assessmentCounterDate" type="date" value="${escapeHtml(scheduleDate)}" /></label>
          <label>Suggest time <input id="assessmentCounterTime" type="time" value="${escapeHtml(scheduleTime)}" /></label>
          <label>Client note <input id="assessmentScheduleClientNote" value="${escapeHtml(latest?.clientNotes || "")}" placeholder="Optional note" /></label>
        </div>
        <button class="ghost" id="clientCounterAssessmentSchedule" data-schedule-id="${latest?.id || ""}">${latest ? "Reject / Suggest Different Time" : "Request Assessment Time"}</button>
      ` : ""}
    </article>
  `;
}

function approvedAppointmentsPanel(client = null, options = {}) {
  const adminView = Boolean(options.adminView);
  const appointments = approvedAssessmentAppointments(client?.id, adminView);
  const title = adminView ? "All Approved Appointments" : "Approved Appointments";
  if (!appointments.length) {
    return `
      <article class="card approved-appointments-card">
        <p class="eyebrow">Approved schedule</p>
        <h3>${title}</h3>
        <p class="muted">No approved assessment appointments yet.</p>
      </article>
    `;
  }
  return `
    <article class="card approved-appointments-card">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">Approved schedule</p>
          <h3>${title}</h3>
          <p class="muted">${adminView ? "Admin can see every finalized assessment and reassessment appointment." : "These are the finalized assessment and reassessment appointments."}</p>
        </div>
        <span class="badge green">${appointments.length} approved</span>
      </div>
      <div class="admin-list compact-list">
        ${appointments.map((schedule) => {
          const scheduleClient = store.clients.find((item) => item.id === schedule.clientId);
          const coach = store.coaches.find((item) => item.id === schedule.coachId);
          return `
            <div class="admin-row">
              <span>
                <strong>${escapeHtml(schedule.assessmentType || "Assessment")}</strong>
                ${adminView ? `<br><small>${escapeHtml(scheduleClient?.name || "Unknown client")} / ${escapeHtml(coach?.name || "Coach not assigned")}</small>` : `<br><small>${escapeHtml(coach?.name || "Coach not assigned")}</small>`}
              </span>
              <small>${formatScheduleDateTime(schedule.proposedDate || schedule.counterDate, schedule.proposedTime || schedule.counterTime)} / Approved</small>
            </div>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function approvedAssessmentAppointments(clientId = null, adminView = false) {
  return (store.assessmentSchedules || [])
    .filter((schedule) => schedule.status === "Approved")
    .filter((schedule) => {
      if (clientId) return schedule.clientId === clientId;
      if (adminView && state.currentUser.role === "Admin") return true;
      if (state.currentUser.role === "Coach") return schedule.coachId === state.currentUser.linkedId;
      if (state.currentUser.role === "Client") return schedule.clientId === state.currentUser.linkedId;
      return false;
    })
    .sort((a, b) => String(a.proposedDate || a.counterDate || "").localeCompare(String(b.proposedDate || b.counterDate || "")) || String(a.proposedTime || a.counterTime || "").localeCompare(String(b.proposedTime || b.counterTime || "")));
}

function formatScheduleDateTime(date, time) {
  if (!date && !time) return "No date/time selected";
  return `${date || "Date needed"} at ${time || "time needed"}`;
}

function quickLinksPanel() {
  const isClient = state.currentUser.role === "Client";
  const actions = isClient
    ? [
        ["profile", "My Profile"],
        ["schedule", "Scheduling"],
        ["weekly", "Weekly Check-In"],
        ["plan", "Monthly Plan"],
        ["nutrition", "Meal Plan"],
        ["client", "Today"],
        ["chat", "Chat"]
      ]
    : [
        ["profile", "Profile"],
        ["schedule", "Scheduling"],
        ["assessment", "Assessment"],
        ["plan", "Monthly Plan"],
        ["library", "Exercise Library"],
        ["alerts", "Alerts"],
        ...(state.currentUser.role === "Admin" ? [["admin", "Admin Control"]] : [])
      ];
  return `
    <article class="card decision-card">
      <p class="eyebrow">Workflow</p>
      <h3>${isClient ? "Client tools" : state.currentUser.role === "Admin" ? "Admin tools" : "Coach tools"}</h3>
      <div class="quick-actions">
        ${actions.map(([view, label]) => isClient && view === "nutrition"
          ? `<button data-open-client-meal-plan>${label}</button>`
          : `<button data-view="${view}">${label}</button>`
        ).join("")}
      </div>
    </article>
  `;
}

function nextReassessmentDate(lastDate) {
  const date = new Date(`${lastDate}T12:00:00`);
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}

function recommendPlanDirection(client, assessment) {
  const recent = store.weeklyCheckIns.filter((item) => item.clientId === client.id).slice(-4);
  const poorTrend = recent.length >= 2 && recent.filter((item) => item.checkInResult === "Poor Recovery").length >= 2;
  const strongTrend = recent.length >= 2 && recent.filter((item) => item.checkInResult === "Strong Week").length >= 2;
  if (assessment.adjustmentMode === "Recovery" || poorTrend) return `${assessment.trainingLevel || "Beginner"} plan with recovery alternatives ready`;
  if ((assessment.trainingLevel === "Advanced" || assessment.trainingLevel === "Pro") && strongTrend) return "Progress carefully with harder sport-specific variations";
  if (assessment.trainingLevel === "Pro") return "Pro plan with coach-supervised high-output options";
  return `${assessment.trainingLevel || "Intermediate"} plan with smart exercise rotation`;
}

function nutritionPlannerPage() {
  if (state.currentUser?.role === "Client") return clientMealPlanPage();
  return `
    <section class="page-stack">
      ${nutritionDemoPanel({ standalone: true })}
    </section>
  `;
}

function clientMealPlanPage() {
  const client = clientForCurrentUser();
  const plan = client ? activeMealPlanForClient(client.id) : null;
  const requested = client ? client.mealPlanRequested : false;
  return `
    <section class="page-stack">
      <article class="card">
        <div class="section-head compact-head">
          <div>
            <p class="eyebrow">Nutrition</p>
            <h2>${plan ? "Your Meal Plan" : "Meal Plan Add-On"}</h2>
            <p class="muted">${plan ? "This plan was assigned by your coach or admin. Click any meal to see the recipe and step-by-step instructions." : "Meal planning is an optional nutrition add-on. It is an extra $50 added to your plan."}</p>
          </div>
          ${plan ? `<span class="badge green">${plan.days.length} days</span>` : `<span class="badge orange">No plan assigned</span>`}
        </div>
        <div class="result-band">
          <strong>${plan ? "Meal plan ready" : requested ? "Request sent" : "Meal plan not active"}</strong>
          <span>${plan ? `${escapeHtml(plan.planName || "Meal Plan")} was assigned ${formatReadableDate(plan.assignedAt || plan.createdAt)}.` : requested ? "Your coach/admin has been notified that you want the $50 meal plan add-on." : "Request the add-on here and your coach/admin will follow up."}</span>
        </div>
        ${plan ? nutritionAssignedPlanView(plan, { clientView: true }) : `
          ${clientMealPlanRequestPanel(client, requested)}
        `}
      </article>
    </section>
  `;
}

function clientMealPlanRequestPanel(client, requested) {
  return `
    <div class="empty meal-plan-empty">
      <h3>Request a Smart Meal Plan</h3>
      <p>Get a weekly or monthly meal plan with recipe cards, step-by-step instructions, shopping support, and food swaps. This add-on is an extra <strong>$50</strong> added to your current plan.</p>
      <div class="detail-grid">
        <p><strong>Includes:</strong> meals matched to your goal, dietary needs, cuisine preferences, and allergies.</p>
        <p><strong>Recipes:</strong> click each meal to see ingredients and how to make it step by step.</p>
        <p><strong>Coach review:</strong> your coach/admin assigns the plan after approving the add-on.</p>
      </div>
      <div class="actions">
        <button class="primary" id="requestMealPlanAddon" ${requested ? "disabled" : ""}>${requested ? "Meal Plan Requested" : "Request Meal Plan Add-On - $50"}</button>
        <button class="ghost" data-view="chat">Message Coach</button>
      </div>
    </div>
  `;
}

function nutritionDemoPanel(options = {}) {
  const standalone = Boolean(options.standalone);
  const mode = store.settings.nutritionPlannerEnabled === false ? "Off" : "Active";
  const demo = state.nutritionDemo;
  const plan = demo.generatedPlan;
  const visibleClients = visibleClientsForUser(store, state.currentUser);
  const clientNutritionProfile = nutritionProfileFromSelectedClient();
  const nutritionForm = { ...demo, ...clientNutritionProfile };
  const targetSummary = calculateNutritionTargets(nutritionForm);
  return `
    <article class="card admin-card ${standalone ? "" : adminPanelClass("nutritionDemo")}" id="admin-nutrition-demo">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">Nutrition Add-On</p>
          <h3>Meal Planner</h3>
          <p class="muted">Build a weekly or monthly meal plan, change suggested meals, and assign the finished plan to a client.</p>
        </div>
        <span class="badge ${mode === "Off" ? "orange" : "green"}">${escapeHtml(mode)}</span>
      </div>
      <div class="result-band warning-band">
        <strong>Client assignment</strong>
        <span>Assigned meal plans are saved to the selected client profile and included in Supabase shared records. The planner is using the Royal Elixir ${Number(nutritionDemoStats.uniqueMealNames || nutritionDemoStats.totalMeals).toLocaleString()}-meal library with old recipe data cleaned out.</span>
      </div>
      <div class="result-band">
        <strong>Profile fields applied</strong>
        <span>${escapeHtml(selectedClient()?.name || "Selected client")} profile is filling matching meal-plan fields: age, sex, height, weight, goal, training schedule, allergies, medical problems, restrictions, and injury notes.</span>
      </div>
      <div class="grid-4 stat-strip">
        ${infoCard("Workbook meals", nutritionDemoStats.totalMeals.toLocaleString())}
        ${infoCard("Preview meals", nutritionDemoMealPool.length)}
        ${infoCard("Breakfast", nutritionMealCounts.Breakfast || 0)}
        ${infoCard("Dinner choices", nutritionMealCounts.Dinner || 0)}
        ${infoCard("Snack choices", nutritionMealCounts.Snack || 0)}
      </div>
      <div class="form-grid">
        <label>Feature mode
          <select id="nutritionDemoMode" data-nutrition-profile>
            ${["Off", "Active"].map((option) => `<option value="${option}" ${mode === option ? "selected" : ""}>${option}</option>`).join("")}
          </select>
        </label>
        <label>Assign to client
          <select id="nutritionAssignClient">
            ${visibleClients.map((client) => `<option value="${client.id}" ${client.id === state.clientId ? "selected" : ""}>${escapeHtml(client.name)}</option>`).join("")}
          </select>
        </label>
        <label>Plan length
          <select id="nutritionPlanLength" data-nutrition-profile>
            ${[7, 14, 30].map((days) => `<option value="${days}" ${Number(demo.planLength) === days ? "selected" : ""}>${days} days</option>`).join("")}
          </select>
        </label>
        <label>Goal
          <select id="nutritionGoal" data-nutrition-profile>
            ${["Weight loss", "Muscle gain", "Maintenance", "Athletic performance", "Fat loss with muscle retention", "Postpartum return to fitness", "General wellness"].map((goal) => `<option value="${goal}" ${nutritionForm.goal === goal ? "selected" : ""}>${goal}</option>`).join("")}
          </select>
        </label>
        <label>Dietary need
          <select id="nutritionDietaryNeed" data-nutrition-profile>
            ${["Balanced", "High Protein", "Low Carb", "Moderate Carb", "Diabetes Friendly", "Prediabetes Friendly", "Low Sodium", "Heart Healthy", "Gluten-Free", "Dairy-Free", "Vegan", "Vegetarian", "Pescatarian"].map((tag) => `<option value="${tag}" ${nutritionForm.dietaryNeed === tag ? "selected" : ""}>${tag}</option>`).join("")}
          </select>
        </label>
        <label>Allergy to avoid
          <select id="nutritionAllergy" data-nutrition-profile>
            ${["None", "Nuts", "Dairy", "Eggs", "Shellfish", "Gluten", "Soy", "Fish", "Other"].map((allergy) => `<option value="${allergy}" ${nutritionForm.allergy === allergy ? "selected" : ""}>${allergy}</option>`).join("")}
          </select>
        </label>
        <label>Cuisine
          <select id="nutritionCuisine" data-nutrition-profile>
            ${nutritionCuisineOptions().map((cuisine) => `<option value="${cuisine}" ${nutritionForm.cuisine === cuisine ? "selected" : ""}>${cuisine}</option>`).join("")}
          </select>
        </label>
        <label>Budget
          <select id="nutritionBudget" data-nutrition-profile>
            ${["Any", "Low", "Medium", "High"].map((budget) => `<option value="${budget}" ${nutritionForm.budgetLevel === budget ? "selected" : ""}>${budget}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="form-grid nutrition-profile-grid">
        <label>Age <input id="nutritionAge" data-nutrition-profile type="number" min="12" max="100" value="${escapeHtml(targetSummary.profile.age)}" /></label>
        <label>Sex
          <select id="nutritionSex" data-nutrition-profile>
            ${["Female", "Male"].map((sex) => `<option value="${sex}" ${targetSummary.profile.sex === sex ? "selected" : ""}>${sex}</option>`).join("")}
          </select>
        </label>
        <label>Height inches <input id="nutritionHeightInches" data-nutrition-profile type="number" min="48" max="90" value="${escapeHtml(targetSummary.profile.heightInches)}" /></label>
        <label>Current weight lb <input id="nutritionCurrentWeight" data-nutrition-profile type="number" min="60" max="600" value="${escapeHtml(targetSummary.profile.currentWeightLb)}" /></label>
        <label>Goal weight lb <input id="nutritionGoalWeight" data-nutrition-profile type="number" min="60" max="600" value="${escapeHtml(targetSummary.profile.goalWeightLb)}" /></label>
        <label>Activity level
          <select id="nutritionActivityLevel" data-nutrition-profile>
            ${["Sedentary", "Lightly active", "Moderately active", "Very active", "Athlete / intense training"].map((level) => `<option value="${level}" ${targetSummary.profile.activityLevel === level ? "selected" : ""}>${level}</option>`).join("")}
          </select>
        </label>
        <label>Workout days / week <input id="nutritionWorkoutDays" data-nutrition-profile type="number" min="0" max="7" value="${escapeHtml(targetSummary.profile.workoutDaysPerWeek)}" /></label>
        <label>Workout length min <input id="nutritionWorkoutLength" data-nutrition-profile type="number" min="0" max="180" value="${escapeHtml(targetSummary.profile.averageWorkoutLength)}" /></label>
        <label>Training type
          <select id="nutritionTrainingType" data-nutrition-profile>
            ${["Strength training", "Boxing", "Kickboxing", "MMA", "Running", "General fitness", "Weight loss training", "Muscle gain training", "Recovery", "Mobility", "Conditioning"].map((type) => `<option value="${type}" ${targetSummary.profile.trainingType === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
        <label>Meals / day <input id="nutritionMealsPerDay" data-nutrition-profile type="number" min="2" max="5" value="${escapeHtml(targetSummary.profile.mealsPerDay)}" /></label>
        <label>Snacks / day <input id="nutritionSnacksPerDay" data-nutrition-profile type="number" min="0" max="3" value="${escapeHtml(targetSummary.profile.snacksPerDay)}" /></label>
        <label>Prep time
          <select id="nutritionPrepTime" data-nutrition-profile>
            ${["Any", "Quick", "Moderate", "Meal prep friendly"].map((time) => `<option value="${time}" ${targetSummary.profile.prepTimePreference === time ? "selected" : ""}>${time}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="form-grid">
        <label>Food dislikes <input id="nutritionFoodDislikes" data-nutrition-profile value="${escapeHtml(nutritionForm.foodDislikes || "")}" placeholder="Foods to avoid, comma separated" /></label>
        <label>Favorite foods <input id="nutritionFavoriteFoods" data-nutrition-profile value="${escapeHtml(nutritionForm.favoriteFoods || "")}" placeholder="Foods to prefer, comma separated" /></label>
        <label>Medical / safety flags <input id="nutritionMedicalFlags" data-nutrition-profile value="${escapeHtml(nutritionForm.medicalFlags || "")}" placeholder="diabetes, kidney disease, pregnancy, heart disease..." /></label>
        ${state.currentUser?.role === "Admin" ? `
          <label>Calorie override <input id="nutritionCalorieOverride" data-nutrition-profile type="number" value="${escapeHtml(demo.calorieOverride || "")}" placeholder="${targetSummary.targetCalories}" /></label>
          <label>Protein override <input id="nutritionProteinOverride" data-nutrition-profile type="number" value="${escapeHtml(demo.proteinOverride || "")}" placeholder="${targetSummary.proteinGrams}" /></label>
          <label>Carb override <input id="nutritionCarbsOverride" data-nutrition-profile type="number" value="${escapeHtml(demo.carbsOverride || "")}" placeholder="${targetSummary.carbGrams}" /></label>
          <label>Fat override <input id="nutritionFatOverride" data-nutrition-profile type="number" value="${escapeHtml(demo.fatOverride || "")}" placeholder="${targetSummary.fatGrams}" /></label>
        ` : ""}
      </div>
      ${nutritionTargetsPanel(targetSummary)}
      <div class="actions">
        <button class="primary" id="generateNutritionDemo">${mode === "Off" ? "Turn On & Generate Meal Plan" : "Generate Meal Plan"}</button>
        <button class="ghost" id="resetNutritionPlanner">Reset Meal Planner</button>
        <button class="success" id="assignNutritionPlan">${mode === "Off" ? "Turn On & Assign Plan" : "Assign Plan To Client"}</button>
        <button id="printNutritionShoppingList" data-print-nutrition-shopping-list onclick="window.printNutritionShoppingList && window.printNutritionShoppingList()" ${!plan ? "disabled" : ""}>Print Shopping List</button>
        ${state.currentUser?.role === "Admin" ? `<button class="danger" id="turnOffNutritionDemo">Turn Meal Planner Off</button>` : ""}
      </div>
      ${state.nutritionAssignNotice ? `<div class="result-band"><strong>Meal planner</strong><span>${escapeHtml(state.nutritionAssignNotice)}</span></div>` : ""}
      ${nutritionAssignedPlanSummary(state.clientId)}
      ${mode === "Off" ? `<div class="empty">Meal Planner is off. Turn Feature mode to Active when you want to use it again.</div>` : nutritionDemoResults(plan)}
    </article>
  `;
}

function nutritionDemoResults(plan) {
  if (!plan) {
    return `
      <div class="empty">
        Press Generate Meal Plan to preview weekly/monthly meals, then choose a client and press Assign Plan To Client.
      </div>
    `;
  }
  const shopping = buildNutritionShoppingList(plan.days);
  const targetLine = plan.summary?.targetCalories
    ? `Target: ${plan.summary.targetCalories} cal / P ${plan.summary.targetProtein}g / C ${plan.summary.targetCarbs}g / F ${plan.summary.targetFat}g`
    : "";
  return `
    <section class="nutrition-demo-results">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">${plan.days.length}-day demo</p>
          <h3>${escapeHtml(plan.summary.goal)} / ${escapeHtml(plan.summary.dietaryNeed)}</h3>
          <p class="muted">Estimated daily average: ${plan.summary.averageCalories} cal, ${plan.summary.averageProtein}g protein, ${plan.summary.averageCarbs}g carbs, ${plan.summary.averageFat}g fat.</p>
          ${targetLine ? `<p class="muted">${escapeHtml(targetLine)}</p>` : ""}
          <p class="muted">Plan structure: ${Number(plan.summary?.mealsPerDay ?? 3)} meals + ${Number(plan.summary?.snacksPerDay ?? 1)} snacks per day.</p>
          ${plan.summary?.reviewRequired ? `<p class="badge danger">Coach/Admin review needed</p>` : ""}
        </div>
      </div>
      <div class="card-list compact-plan-list">
        ${plan.days.map((day) => {
          return `
          <article class="card nutrition-day-card">
            <div class="section-head compact-head">
              <div>
                <p class="eyebrow">Day ${day.day}</p>
                <h3>${day.totalCalories} cal / ${day.totalProtein}g protein</h3>
                <p class="muted">C ${day.totalCarbs}g / F ${day.totalFat}g / Fiber ${day.totalFiber || 0}g / Sugar ${day.totalSugar || 0}g / Sodium ${day.totalSodium || 0}mg</p>
              </div>
              <button class="ghost" data-open-nutrition-day="${day.day}">Open Day</button>
            </div>
            ${day.meals.map((meal, mealIndex) => `
              <div class="admin-row meal-demo-row">
                <span><strong>${escapeHtml(nutritionMealDisplayType(meal, mealIndex))}:</strong> ${escapeHtml(meal.name)}<br><small>${meal.calories} cal / P ${meal.protein}g / C ${meal.carbs}g / F ${meal.fat}g / ${escapeHtml(meal.prepTime)}</small></span>
              </div>
            `).join("")}
          </article>
        `;
        }).join("")}
      </div>
      <article class="card printable-shopping-list">
        <div class="section-head compact-head">
          <div><p class="eyebrow">Printable</p><h3>Shopping list preview</h3></div>
        </div>
        <div class="shopping-columns">
          ${Object.entries(shopping).map(([category, items]) => `
            <div>
              <h4>${escapeHtml(category)}</h4>
              <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
          `).join("")}
        </div>
      </article>
      ${plan.summary?.warnings?.length ? `
        <article class="card">
          <h3>Coach/Admin review notes</h3>
          <ul>${plan.summary.warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}</ul>
          <p class="muted">${escapeHtml(nutritionMedicalDisclaimer())}</p>
        </article>
      ` : ""}
    </section>
  `;
}

function nutritionCuisineOptions() {
  return ["Any", ...nutritionCuisineList];
}

function nutritionProfileFromSelectedClient() {
  const client = selectedClient() || {};
  const text = (...values) => values.filter(Boolean).join(", ");
  return {
    age: Number(client.age || state.nutritionDemo.age || 35),
    sex: client.sex || state.nutritionDemo.sex || "Female",
    heightInches: Number(client.heightInches || state.nutritionDemo.heightInches || 66),
    currentWeightLb: Number(client.currentWeightLb || client.weight || state.nutritionDemo.currentWeightLb || 180),
    goalWeightLb: Number(client.goalWeightLb || state.nutritionDemo.goalWeightLb || client.weight || 160),
    goal: client.goal ? nutritionGoalFromClient(client.goal) : state.nutritionDemo.goal || "Weight loss",
    dietaryNeed: nutritionDietaryNeedFromClient(client),
    allergy: nutritionAllergyFromClient(client),
    cuisine: client.culturalFoodPreference || client.cuisinePreference || state.nutritionDemo.cuisine || "Any",
    budgetLevel: client.budgetLevel || client.foodBudgetLevel || state.nutritionDemo.budgetLevel || "Any",
    activityLevel: state.nutritionDemo.activityLevel || "Moderately active",
    workoutDaysPerWeek: Number(client.trainingDaysPerWeek || state.nutritionDemo.workoutDaysPerWeek || 3),
    averageWorkoutLength: Number(client.sessionLength || state.nutritionDemo.averageWorkoutLength || 45),
    trainingType: nutritionTrainingTypeFromClient(client),
    mealsPerDay: Number(state.nutritionDemo.mealsPerDay || 3),
    snacksPerDay: Number(state.nutritionDemo.snacksPerDay || 1),
    prepTimePreference: state.nutritionDemo.prepTimePreference || "Any",
    foodDislikes: text(client.foodDislikes, client.dislikedFoods, state.nutritionDemo.foodDislikes),
    favoriteFoods: text(client.favoriteFoods, state.nutritionDemo.favoriteFoods),
    medicalFlags: text(client.medicalProblems, client.medicalConditions, client.medicalRestrictions, client.medications, client.injuryNotes, client.currentRestrictions?.join?.(", "), state.nutritionDemo.medicalFlags)
  };
}

function nutritionGoalFromClient(goal = "") {
  const text = String(goal).toLowerCase();
  if (/muscle|strength|gain/.test(text)) return "Muscle gain";
  if (/fat loss|lean|retain/.test(text)) return "Fat loss with muscle retention";
  if (/weight loss|lose|slim/.test(text)) return "Weight loss";
  if (/performance|fighter|fight|athlete|conditioning|endurance/.test(text)) return "Athletic performance";
  if (/maintain/.test(text)) return "Maintenance";
  if (/postpartum/.test(text)) return "Postpartum return to fitness";
  return "General wellness";
}

function nutritionTrainingTypeFromClient(client = {}) {
  const text = `${client.sportFocus || ""} ${client.goal || ""}`.toLowerCase();
  if (/kickboxing/.test(text)) return "Kickboxing";
  if (/boxing/.test(text)) return "Boxing";
  if (/mma/.test(text)) return "MMA";
  if (/running/.test(text)) return "Running";
  if (/muscle|strength/.test(text)) return "Strength training";
  if (/recovery/.test(text)) return "Recovery";
  if (/mobility/.test(text)) return "Mobility";
  if (/conditioning|endurance|fight/.test(text)) return "Conditioning";
  if (/weight loss/.test(text)) return "Weight loss training";
  return "General fitness";
}

function nutritionDietaryNeedFromClient(client = {}) {
  const text = `${client.dietaryNeeds || ""} ${client.medicalProblems || ""} ${client.medicalConditions || ""} ${client.medicalRestrictions || ""} ${client.goal || ""}`.toLowerCase();
  if (/prediabetes/.test(text)) return "Prediabetes Friendly";
  if (/diabetes/.test(text)) return "Diabetes Friendly";
  if (/heart|blood pressure|hypertension/.test(text)) return "Heart Healthy";
  if (/sodium/.test(text)) return "Low Sodium";
  if (/gluten/.test(text)) return "Gluten-Free";
  if (/dairy/.test(text)) return "Dairy-Free";
  if (/vegan/.test(text)) return "Vegan";
  if (/vegetarian/.test(text)) return "Vegetarian";
  if (/pescatarian/.test(text)) return "Pescatarian";
  if (/low carb/.test(text)) return "Low Carb";
  if (/protein|muscle|strength/.test(text)) return "High Protein";
  return state.nutritionDemo.dietaryNeed || "Balanced";
}

function nutritionAllergyFromClient(client = {}) {
  const text = String(client.allergies || "").toLowerCase();
  if (/nut|peanut|almond|cashew|walnut/.test(text)) return "Nuts";
  if (/dairy|milk|cheese|yogurt/.test(text)) return "Dairy";
  if (/egg/.test(text)) return "Eggs";
  if (/shellfish|shrimp|crab|lobster/.test(text)) return "Shellfish";
  if (/gluten|wheat/.test(text)) return "Gluten";
  if (/soy|tofu/.test(text)) return "Soy";
  if (/fish|salmon|tuna|cod/.test(text)) return "Fish";
  if (text.trim()) return "Other";
  return state.nutritionDemo.allergy || "None";
}

function calculateNutritionTargets(input = {}) {
  const profile = {
    age: Number(input.age || 35),
    sex: input.sex || "Female",
    heightInches: Number(input.heightInches || 66),
    currentWeightLb: Number(input.currentWeightLb || 180),
    goalWeightLb: Number(input.goalWeightLb || input.currentWeightLb || 160),
    goal: input.goal || "Weight loss",
    activityLevel: input.activityLevel || "Moderately active",
    workoutDaysPerWeek: Number(input.workoutDaysPerWeek || 3),
    averageWorkoutLength: Number(input.averageWorkoutLength || 45),
    trainingType: input.trainingType || "General fitness",
    dietaryNeed: input.dietaryNeed || "Balanced",
    allergy: input.allergy || "None",
    cuisine: input.cuisine || "Any",
    budgetLevel: input.budgetLevel || "Any",
    mealsPerDay: Number(input.mealsPerDay || 3),
    snacksPerDay: Number(input.snacksPerDay || 1),
    prepTimePreference: input.prepTimePreference || "Any",
    foodDislikes: input.foodDislikes || "",
    favoriteFoods: input.favoriteFoods || "",
    medicalFlags: input.medicalFlags || ""
  };
  const weightKg = profile.currentWeightLb / 2.20462;
  const heightCm = profile.heightInches * 2.54;
  const bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * profile.age + (profile.sex === "Male" ? 5 : -161));
  const activityMultipliers = {
    "Sedentary": 1.2,
    "Lightly active": 1.375,
    "Moderately active": 1.55,
    "Very active": 1.725,
    "Athlete / intense training": 1.9
  };
  const tdee = Math.round(bmr * (activityMultipliers[profile.activityLevel] || 1.55));
  const goalKey = normalizeNutritionText(profile.goal);
  let calorieAdjustment = 0;
  if (goalKey.includes("weight loss")) calorieAdjustment = -400;
  if (goalKey.includes("fat loss")) calorieAdjustment = -325;
  if (goalKey.includes("muscle gain")) calorieAdjustment = 325;
  if (goalKey.includes("athletic performance")) calorieAdjustment = 150;
  const reviewWarnings = nutritionSafetyWarnings(profile);
  let targetCalories = Math.round(tdee + calorieAdjustment);
  const minimumCalories = profile.sex === "Male" ? 1500 : 1200;
  if (targetCalories < minimumCalories) {
    targetCalories = minimumCalories;
    reviewWarnings.push("Calories reached the safety floor. Coach/Admin review required before using a lower target.");
  }
  const proteinMultiplier = chooseProteinMultiplier(profile, reviewWarnings);
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;
  const fatPercent = chooseFatPercent(profile);
  const fatGrams = Math.round((targetCalories * fatPercent) / 9);
  const fatCalories = fatGrams * 9;
  const carbGrams = Math.max(40, Math.round((targetCalories - proteinCalories - fatCalories) / 4));
  if (profile.dietaryNeed === "Low Carb" && /boxing|kickboxing|mma|running|strength|conditioning/i.test(profile.trainingType)) {
    reviewWarnings.push("High-intensity clients should not be placed on very low carbs unless Coach/Admin approves it.");
  }
  const override = (value, fallback) => {
    const number = Number(value || 0);
    return number > 0 ? Math.round(number) : fallback;
  };
  const finalTargets = {
    profile,
    weightKg,
    heightCm,
    bmr,
    tdee,
    targetCalories: override(input.calorieOverride, targetCalories),
    proteinGrams: override(input.proteinOverride, proteinGrams),
    carbGrams: override(input.carbsOverride, carbGrams),
    fatGrams: override(input.fatOverride, fatGrams),
    proteinMultiplier,
    fatPercent,
    reviewRequired: reviewWarnings.length > 0,
    warnings: reviewWarnings
  };
  finalTargets.proteinCalories = finalTargets.proteinGrams * 4;
  finalTargets.carbCalories = finalTargets.carbGrams * 4;
  finalTargets.fatCalories = finalTargets.fatGrams * 9;
  finalTargets.disclaimer = nutritionMedicalDisclaimer();
  return finalTargets;
}

function chooseProteinMultiplier(profile, warnings = []) {
  const text = `${profile.goal} ${profile.trainingType} ${profile.medicalFlags}`.toLowerCase();
  if (/kidney/.test(text)) {
    warnings.push("Kidney-related flag found. Do not auto-create a high-protein target without Coach/Admin and healthcare review.");
    return 1.2;
  }
  if (/fat loss/.test(text)) return 2.0;
  if (/weight loss|muscle gain|boxing|kickboxing|mma|conditioning/.test(text)) return 1.8;
  if (/athletic/.test(text)) return 1.6;
  if (/recovery|beginner/.test(text)) return 1.3;
  return 1.4;
}

function chooseFatPercent(profile) {
  const text = `${profile.goal} ${profile.dietaryNeed}`.toLowerCase();
  if (/low carb/.test(text)) return 0.35;
  if (/heart healthy|low sodium|athletic|muscle gain/.test(text)) return 0.25;
  if (/diabetes|prediabetes|maintenance/.test(text)) return 0.3;
  return 0.28;
}

function nutritionSafetyWarnings(profile) {
  const text = `${profile.medicalFlags || ""} ${profile.dietaryNeed || ""} ${profile.goal || ""}`.toLowerCase();
  const warnings = [];
  [
    ["diabetes", "Diabetes-friendly planning requires controlled carbohydrates, higher fiber, and healthcare review when needed."],
    ["prediabetes", "Prediabetes-friendly planning should spread carbs and avoid high added sugar meals."],
    ["pregnancy", "Pregnancy nutrition should be reviewed by a qualified healthcare professional."],
    ["postpartum", "Postpartum return to fitness nutrition should be reviewed carefully."],
    ["kidney", "Kidney disease or kidney-related flags require Coach/Admin review before high protein targets."],
    ["heart", "Heart disease or heart-health flags require sodium and saturated-fat review."],
    ["eating disorder", "Eating disorder history requires qualified healthcare support before meal planning."],
    ["senior", "Senior clients may need additional review for calorie, protein, and medication considerations."],
    ["youth", "Youth clients require guardian and healthcare guidance for nutrition targets."]
  ].forEach(([needle, warning]) => {
    if (text.includes(needle)) warnings.push(warning);
  });
  return warnings;
}

function nutritionMedicalDisclaimer() {
  return "This meal plan is for general fitness and wellness support only. It is not medical advice. Nutrition needs vary by person. Clients with diabetes, prediabetes, pregnancy, kidney disease, heart disease, food allergies, medication use, eating disorder history, or other medical conditions should consult a qualified healthcare professional or registered dietitian before following a meal plan.";
}

function nutritionTargetsPanel(targets) {
  return `
    <article class="result-band nutrition-target-panel">
      <div>
        <strong>Calorie & macro targets</strong>
        <span>BMR ${targets.bmr} / TDEE ${targets.tdee} / Target ${targets.targetCalories} cal / Protein ${targets.proteinGrams}g / Carbs ${targets.carbGrams}g / Fat ${targets.fatGrams}g</span>
      </div>
      <div class="chips">
        <span>${escapeHtml(targets.profile.activityLevel)}</span>
        <span>${escapeHtml(targets.profile.trainingType)}</span>
        <span>${targets.reviewRequired ? "Coach/Admin review needed" : "Ready for coach review"}</span>
      </div>
      ${targets.warnings.length ? `<ul>${targets.warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}</ul>` : ""}
      <p class="muted">${escapeHtml(targets.disclaimer)}</p>
    </article>
  `;
}

function buildExpandedNutritionDemoMealPool(sourceMeals) {
  if (sourceMeals.length > 1000) return dedupeNutritionMeals(sourceMeals, { keepCuisineVariants: true });
  const flavorProfiles = [
    { label: "Cajun", cuisine: "Black American / African Diaspora", seasoning: "cajun seasoning", produce: "collard greens", budgetLevel: "Medium", calories: 24, protein: 2, carbs: 3, fat: 1 },
    { label: "Jerk", cuisine: "Black American / African Diaspora", seasoning: "jerk seasoning", produce: "cabbage slaw", budgetLevel: "Medium", calories: 18, protein: 1, carbs: 4, fat: 0 },
    { label: "Soul Herb", cuisine: "Black American / African Diaspora", seasoning: "smoked herb seasoning", produce: "okra tomato medley", budgetLevel: "Low", calories: 16, protein: 1, carbs: 3, fat: 1 },
    { label: "Creole", cuisine: "Black American / African Diaspora", seasoning: "creole seasoning", produce: "pepper onion mix", budgetLevel: "Medium", calories: 20, protein: 1, carbs: 4, fat: 0 },
    { label: "Lemon Pepper", cuisine: "Mixed / General", seasoning: "lemon pepper", produce: "green beans", budgetLevel: "Low", calories: -12, protein: 0, carbs: -2, fat: 0 },
    { label: "Garlic Herb", cuisine: "Mediterranean", seasoning: "garlic herb blend", produce: "cucumber tomato salad", budgetLevel: "Medium", calories: 10, protein: 1, carbs: 2, fat: 0 },
    { label: "Rosemary", cuisine: "Mediterranean", seasoning: "rosemary sea salt", produce: "roasted zucchini", budgetLevel: "Medium", calories: 12, protein: 1, carbs: 2, fat: 1 },
    { label: "Fajita", cuisine: "Latin", seasoning: "fajita seasoning", produce: "sauteed peppers", budgetLevel: "Low", calories: 22, protein: 1, carbs: 5, fat: 0 },
    { label: "Mango Lime", cuisine: "Latin", seasoning: "mango lime seasoning", produce: "corn pepper salsa", budgetLevel: "Medium", calories: 34, protein: 1, carbs: 7, fat: 0 },
    { label: "Ginger Sesame", cuisine: "Asian Inspired", seasoning: "ginger sesame seasoning", produce: "snap peas", budgetLevel: "High", calories: 30, protein: 1, carbs: 3, fat: 2 },
    { label: "Teriyaki Light", cuisine: "Asian Inspired", seasoning: "low-sugar teriyaki glaze", produce: "broccoli slaw", budgetLevel: "Medium", calories: 26, protein: 1, carbs: 5, fat: 0 },
    { label: "Greek", cuisine: "Greek", seasoning: "oregano lemon seasoning", produce: "spinach cucumber mix", budgetLevel: "Medium", calories: 8, protein: 1, carbs: 1, fat: 0 },
    { label: "Tzatziki Style", cuisine: "Greek", seasoning: "dill garlic seasoning", produce: "tomato cucumber relish", budgetLevel: "Medium", calories: 14, protein: 1, carbs: 2, fat: 1 },
    { label: "Curry", cuisine: "Indian", seasoning: "mild curry seasoning", produce: "roasted cauliflower", budgetLevel: "Low", calories: 28, protein: 2, carbs: 5, fat: 0 },
    { label: "Tandoori", cuisine: "Indian", seasoning: "tandoori spice blend", produce: "cabbage carrot mix", budgetLevel: "Medium", calories: 18, protein: 1, carbs: 4, fat: 0 },
    { label: "Italian Herb", cuisine: "Italian", seasoning: "italian herb seasoning", produce: "roasted mushrooms", budgetLevel: "Medium", calories: 18, protein: 1, carbs: 3, fat: 1 },
    { label: "Pesto Light", cuisine: "Italian", seasoning: "light basil pesto", produce: "arugula tomato mix", budgetLevel: "High", calories: 38, protein: 1, carbs: 2, fat: 3 }
  ];
  const cleanName = (name) => String(name || "Meal").replace(/^(Glow|Strong|Quick|Loaded)\s+/i, "").trim();
  return sourceMeals.flatMap((meal) => [
    meal,
    ...flavorProfiles.map((profile, index) => ({
      ...meal,
      id: `${meal.id}-D${index + 1}`,
      name: `${profile.label} ${cleanName(meal.name)}`,
      calories: Math.max(90, Number(meal.calories || 0) + profile.calories),
      protein: Math.max(8, Number(meal.protein || 0) + profile.protein),
      carbs: Math.max(4, Number(meal.carbs || 0) + profile.carbs),
      fat: Math.max(2, Number(meal.fat || 0) + profile.fat),
      ingredients: `${meal.ingredients}; ${profile.produce}; ${profile.seasoning}`,
      instructions: `Prepare the main ingredients from the original meal. Add ${profile.produce} and season with ${profile.seasoning}. Cook or assemble until the meal is hot or chilled as appropriate. Portion as listed and serve.`,
      shoppingListItems: `${meal.shoppingListItems}; Produce: ${profile.produce}; Pantry: ${profile.seasoning}`,
      cuisine: profile.cuisine,
      budgetLevel: profile.budgetLevel,
      coachOnlyNotes: "Demo-generated variety from the meal workbook sample. Review before using in a paid nutrition add-on."
    }))
  ]);
}

function normalizeNutritionText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function nutritionMealDuplicateKey(meal, options = {}) {
  const mealType = normalizeNutritionText(meal.mealType);
  const name = normalizeNutritionText(meal.name);
  const cuisine = options.keepCuisineVariants ? normalizeNutritionText(meal.cuisine) : "";
  return [mealType, name, cuisine].filter(Boolean).join("|");
}

function nutritionMealPlanRepeatKey(meal) {
  return [normalizeNutritionText(meal.mealType), normalizeNutritionText(meal.name)].join("|");
}

function nutritionMealDisplayType(meal, index = 0) {
  return meal?.slotLabel || meal?.mealLabel || meal?.mealType || `Meal ${Number(index) + 1}`;
}

function nutritionMealWithSlot(meal, slot = {}) {
  if (!meal) return null;
  return {
    ...meal,
    mealType: meal.mealType || slot.type || "Dinner",
    slotLabel: slot.label || meal.slotLabel || meal.mealLabel || meal.mealType || "Meal"
  };
}

function dedupeNutritionMeals(meals, options = {}) {
  const seenIds = new Set();
  const seenMeals = new Set();
  return (meals || []).filter((meal) => {
    const id = String(meal.id || "").trim();
    const mealKey = nutritionMealDuplicateKey(meal, options);
    if ((id && seenIds.has(id)) || seenMeals.has(mealKey)) return false;
    if (id) seenIds.add(id);
    seenMeals.add(mealKey);
    return true;
  });
}

function scheduleLegacyMealPlanCleanup() {
  const runCleanup = () => {
    try {
      sanitizeLegacyMealPlans();
    } catch (error) {
      console.warn("Skipped legacy meal cleanup.", error);
    }
  };
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(runCleanup, { timeout: 4000 });
  } else {
    setTimeout(runCleanup, 1200);
  }
}

function sanitizeLegacyMealPlans() {
  if (!store.mealPlans?.length) return;
  const libraryById = new Map(nutritionDemoMealPool.map((meal) => [meal.id, meal]));
  const mealsByType = nutritionDemoMealPool.reduce((groups, meal) => {
    groups[meal.mealType] ||= [];
    groups[meal.mealType].push(meal);
    return groups;
  }, {});
  let changed = false;
  (store.mealPlans || []).forEach((plan) => {
    (plan.days || []).forEach((day) => {
      day.meals = (day.meals || []).map((meal) => {
        const currentLibraryMeal = libraryById.get(meal?.id);
        if (currentLibraryMeal) {
          if (currentLibraryMeal.name !== meal.name) changed = true;
          return nutritionMealWithSlot(currentLibraryMeal, { label: meal.slotLabel || meal.mealLabel || meal.mealType });
        }
        const mealType = meal?.mealType || "Dinner";
        const fallbackPool = mealsByType[mealType] || nutritionDemoMealPool;
        const replacement = fallbackPool[Math.floor(Math.random() * fallbackPool.length)] || nutritionDemoMealPool[0];
        changed = true;
        return nutritionMealWithSlot(replacement, { label: meal.slotLabel || meal.mealLabel || meal.mealType, type: mealType });
      });
      day.totalCalories = day.meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
      day.totalProtein = day.meals.reduce((sum, meal) => sum + Number(meal.protein || 0), 0);
      day.totalCarbs = day.meals.reduce((sum, meal) => sum + Number(meal.carbs || 0), 0);
      day.totalFat = day.meals.reduce((sum, meal) => sum + Number(meal.fat || 0), 0);
      day.totalFiber = day.meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "fiber"), 0);
      day.totalSugar = day.meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "sugar"), 0);
      day.totalSodium = day.meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "sodium"), 0);
    });
    if (changed && plan.summary) {
      const days = plan.days || [];
      const totals = days.reduce((sum, day) => ({
        calories: sum.calories + Number(day.totalCalories || 0),
        protein: sum.protein + Number(day.totalProtein || 0),
        carbs: sum.carbs + Number(day.totalCarbs || 0),
        fat: sum.fat + Number(day.totalFat || 0)
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
      plan.summary.averageCalories = Math.round(totals.calories / Math.max(1, days.length));
      plan.summary.averageProtein = Math.round(totals.protein / Math.max(1, days.length));
      plan.summary.averageCarbs = Math.round(totals.carbs / Math.max(1, days.length));
      plan.summary.averageFat = Math.round(totals.fat / Math.max(1, days.length));
      plan.updatedAt = new Date().toISOString();
      plan.cleanedLegacyMeals = true;
    }
  });
  if (changed) {
    try {
      window.localStorage?.setItem(STORE_STORAGE_KEY, JSON.stringify(store));
    } catch (error) {
      console.warn("Could not save cleaned meal plans.", error);
    }
  }
}

function shuffledNutritionMeals(meals) {
  const shuffled = [...meals];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function nutritionPlanUsedKeys(plan) {
  return new Set((plan?.days || [])
    .flatMap((day) => day.meals || [])
    .map((meal) => nutritionMealPlanRepeatKey(meal)));
}

function uniqueNutritionMealOptions(meals, options = {}) {
  const seen = new Set();
  return (meals || []).filter((meal) => {
    const key = options.planWide ? nutritionMealPlanRepeatKey(meal) : nutritionMealDuplicateKey(meal, { keepCuisineVariants: true });
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function selectFastNutritionCandidate(pool, options, mealType, { usedIds = new Set(), usedKeys = new Set(), currentMealId = "", limit = 180 } = {}) {
  let best = null;
  let bestScore = -Infinity;
  let checked = 0;
  const start = Math.floor(Math.random() * Math.max(1, pool.length));
  for (let offset = 0; offset < pool.length && checked < limit; offset += 1) {
    const meal = pool[(start + offset) % pool.length];
    if (!meal || meal.id === currentMealId || usedIds.has(meal.id) || usedKeys.has(nutritionMealPlanRepeatKey(meal))) continue;
    checked += 1;
    const score = nutritionMealSmartScore(meal, options, mealType) + Math.random() * 4;
    if (score > bestScore) {
      best = meal;
      bestScore = score;
    }
  }
  return best;
}

function nutritionMealInstructionCard(meal) {
  return `
    <article class="meal-instruction-card">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">${escapeHtml(nutritionMealDisplayType(meal))} / ${escapeHtml(meal.cuisine || "General")}</p>
          <h4>${escapeHtml(meal.name)}</h4>
        </div>
        <span class="badge green">${escapeHtml(meal.servingSize || "1 serving")}</span>
      </div>
      <div class="detail-grid">
        <p><strong>Prep time:</strong> ${escapeHtml(meal.prepTime || "Not listed")}</p>
        <p><strong>Diet tags:</strong> ${meal.dietTags.map(escapeHtml).join(", ") || "None listed"}</p>
        <p><strong>Allergens:</strong> ${meal.allergens.map(escapeHtml).join(", ") || "None listed"}</p>
        <p><strong>Macros:</strong> ${meal.calories} cal / P ${meal.protein}g / C ${meal.carbs}g / F ${meal.fat}g</p>
      </div>
      <p><strong>Ingredients:</strong> ${escapeHtml(meal.ingredients || "Not listed")}</p>
      <div>
        <strong>How to make it:</strong>
        <ol class="meal-steps">
          ${mealInstructionsToSteps(meal.instructions).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      </div>
    </article>
  `;
}

function nutritionDayModal() {
  const plan = state.nutritionDemo.generatedPlan;
  if (!state.nutritionDemo.dayModalOpen || !plan) return "";
  const day = plan.days.find((item) => Number(item.day) === Number(state.nutritionDemo.openDay || 1));
  if (!day) return "";
  const canChangeMeals = ["Admin", "Coach"].includes(state.currentUser?.role);
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal nutrition-day-modal">
        <div class="modal-head">
          <div>
            <p class="eyebrow">Nutrition demo / Day ${day.day}</p>
            <h2>Meal plan details</h2>
            <p class="muted">${day.totalCalories} calories / P ${day.totalProtein}g / C ${day.totalCarbs}g / F ${day.totalFat}g</p>
          </div>
          <button id="closeNutritionDayModal">Close</button>
        </div>
        <div class="result-band warning-band">
          <strong>Demo window</strong>
          <span>Changes here update this generated meal plan before assignment. Smart choices pull from the meal library using cuisine, allergies, and dietary needs.</span>
        </div>
        ${canChangeMeals ? `
          <div class="actions">
            <button class="success" data-smart-nutrition-day data-day="${day.day}">Smart Choice For Whole Day</button>
          </div>
        ` : ""}
        <div class="meal-instruction-list">
          ${day.meals.map((meal, index) => nutritionMealInstructionCardWithSwap(meal, day.day, index, canChangeMeals)).join("")}
        </div>
      </section>
    </div>
  `;
}

function nutritionMealInstructionCardWithSwap(meal, dayNumber, mealIndex, canChangeMeals) {
  const swapOptions = nutritionReplacementOptions(meal);
  return `
    <article class="meal-instruction-card">
      ${nutritionMealInstructionCard(meal).replace(/^<article class="meal-instruction-card">|<\/article>\s*$/g, "")}
      ${canChangeMeals ? `
        <div class="nutrition-swap-panel">
          <div>
            <p class="eyebrow">Change suggested ${escapeHtml(nutritionMealDisplayType(meal, mealIndex))}</p>
            <p class="muted">Pick from a wider library match by cuisine, allergy, and dietary need, or let the app make a smart choice.</p>
          </div>
          <div class="nutrition-swap-controls">
            <select id="nutritionSwap-${dayNumber}-${mealIndex}">
              ${swapOptions.map((option) => `<option value="${option.id}" ${option.id === meal.id ? "selected" : ""}>${escapeHtml(option.name)} / ${option.calories} cal / P ${option.protein}g</option>`).join("")}
            </select>
            <button class="success" data-change-nutrition-meal data-day="${dayNumber}" data-meal-index="${mealIndex}">Apply Change</button>
            <button class="ghost" data-smart-nutrition-meal data-day="${dayNumber}" data-meal-index="${mealIndex}">Smart Meal</button>
          </div>
        </div>
      ` : ""}
    </article>
  `;
}

function nutritionMealPreviewCard(meal, planId, dayNumber, mealIndex) {
  const plan = (store.mealPlans || []).find((item) => item.id === planId);
  const favoriteIds = clientFavoriteMealIds(plan?.clientId);
  const isFavorite = favoriteIds.includes(meal.id);
  return `
    <button class="meal-preview-card" data-open-meal-recipe data-plan-id="${escapeHtml(planId)}" data-day="${dayNumber}" data-meal-index="${mealIndex}" title="Open recipe for ${escapeHtml(meal.name)}">
      <span>
        <strong>${escapeHtml(nutritionMealDisplayType(meal, mealIndex))}:</strong> ${escapeHtml(meal.name)}
        <small>${meal.calories} cal / P ${meal.protein}g / C ${meal.carbs}g / F ${meal.fat}g / ${escapeHtml(meal.prepTime || "Prep time not listed")}</small>
      </span>
      <span class="meal-preview-badges">
        ${isFavorite ? `<span class="badge green">Favorite</span>` : ""}
        <span class="badge green">Recipe</span>
      </span>
    </button>
  `;
}

function nutritionRecipeModal() {
  const modal = state.nutritionDemo.recipeModal;
  if (!modal) return "";
  const plan = (store.mealPlans || []).find((item) => item.id === modal.planId);
  const day = plan?.days?.find((item) => Number(item.day) === Number(modal.day));
  const meal = day?.meals?.[modal.mealIndex];
  if (!plan || !day || !meal) return "";
  const client = clientForCurrentUser();
  const canClientAdjust = state.currentUser?.role === "Client" && client?.id === plan.clientId;
  const favoriteIds = clientFavoriteMealIds(plan.clientId);
  const dislikedIds = clientDislikedMealIds(plan.clientId);
  const isFavorite = favoriteIds.includes(meal.id);
  const isDisliked = dislikedIds.includes(meal.id);
  const alternatives = nutritionReplacementOptions(meal, {
    favoriteMealIds: favoriteIds,
    dislikedMealIds: dislikedIds,
    limit: 160,
    includeCurrent: false,
    broaden: true,
    options: plan.options || {},
    strictPreferences: true
  });
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card nutrition-recipe-modal">
        <div class="modal-head">
          <div>
            <p class="eyebrow">Day ${day.day} / ${escapeHtml(nutritionMealDisplayType(meal, modal.mealIndex))}</p>
            <h2>${escapeHtml(meal.name)}</h2>
            <p class="muted">${meal.calories} cal / P ${meal.protein}g / C ${meal.carbs}g / F ${meal.fat}g</p>
          </div>
          <button id="closeNutritionRecipeModal">Close</button>
        </div>
        ${canClientAdjust ? `
          <div class="nutrition-client-actions">
            <button class="${isFavorite ? "success" : "ghost"}" data-toggle-favorite-meal="${meal.id}" data-meal-id="${meal.id}">
              ${isFavorite ? "Favorited" : "Mark Favorite"}
            </button>
            <button class="${isDisliked ? "danger" : "ghost"}" data-toggle-disliked-meal="${meal.id}" data-meal-id="${meal.id}">
              ${isDisliked ? "Disliked" : "Dislike Meal"}
            </button>
            <div class="nutrition-swap-panel">
              <div>
                <p class="eyebrow">Meal tracking</p>
                <p class="muted">Save what happened today so the next plan can avoid repeats and show planned vs eaten totals.</p>
              </div>
              <div class="nutrition-swap-controls">
                <input id="mealTrackNote-${day.day}-${modal.mealIndex}" placeholder="Optional meal note">
                <button class="success" data-track-meal-status="Ate" data-plan-id="${plan.id}" data-day="${day.day}" data-meal-index="${modal.mealIndex}">Ate</button>
                <button data-track-meal-status="Skipped" data-plan-id="${plan.id}" data-day="${day.day}" data-meal-index="${modal.mealIndex}">Skipped</button>
                <button data-track-meal-status="Substituted" data-plan-id="${plan.id}" data-day="${day.day}" data-meal-index="${modal.mealIndex}">Substituted</button>
              </div>
            </div>
            <div class="nutrition-swap-panel">
              <div>
                <p class="eyebrow">Substitute this meal</p>
                <p class="muted">Choose from favorites first, or pick another ${escapeHtml(nutritionMealDisplayType(meal, modal.mealIndex))} that fits this plan's allergy, culture, and budget settings.</p>
              </div>
              <div class="nutrition-swap-controls">
                <select id="clientMealSubstitute-${day.day}-${modal.mealIndex}">
                  ${nutritionSwapOptionGroups(alternatives, favoriteIds)}
                </select>
                <button class="success" data-substitute-client-meal data-plan-id="${plan.id}" data-day="${day.day}" data-meal-index="${modal.mealIndex}" ${alternatives.length ? "" : "disabled"}>Use This Meal</button>
              </div>
            </div>
          </div>
        ` : ""}
        ${nutritionMealInstructionCard(meal)}
      </section>
    </div>
  `;
}

function mealInstructionsToSteps(instructions) {
  const text = String(instructions || "").trim();
  if (!text) return ["Review ingredients.", "Prepare the meal in a clean cooking area.", "Serve in the listed portion size."];
  const split = text
    .replace(/\s+/g, " ")
    .split(/\s+(?=\d+\.\s)/)
    .map((step) => step.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
  return split.length > 1 ? split : text.split(". ").map((step) => step.trim().replace(/\.$/, "")).filter(Boolean);
}

function nutritionReplacementOptions(currentMeal, config = {}) {
  const options = { ...(state.nutritionDemo || {}), ...(config.options || {}) };
  const favoriteMealIds = config.favoriteMealIds || [];
  const dislikedMealIds = config.dislikedMealIds || [];
  const sameMealType = nutritionDemoMealPool.filter((meal) =>
    meal.mealType === currentMeal.mealType &&
    (config.includeCurrent !== false || meal.id !== currentMeal.id) &&
    !dislikedMealIds.includes(meal.id) &&
    mealFitsNutritionPreferences(meal, options)
  );
  const allergySafeFallback = nutritionDemoMealPool.filter((meal) =>
    meal.mealType === currentMeal.mealType &&
    (config.includeCurrent !== false || meal.id !== currentMeal.id) &&
    !dislikedMealIds.includes(meal.id) &&
    !mealHasAllergy(meal, options.allergy)
  );
  const favoriteMatches = nutritionDemoMealPool.filter((meal) =>
    favoriteMealIds.includes(meal.id) &&
    meal.mealType === currentMeal.mealType &&
    (config.includeCurrent !== false || meal.id !== currentMeal.id) &&
    mealFitsNutritionPreferences(meal, options)
  );
  const pool = config.strictPreferences
    ? sameMealType
    : sameMealType.length ? sameMealType : allergySafeFallback.length ? allergySafeFallback : nutritionDemoMealPool.filter((meal) => meal.mealType === currentMeal.mealType);
  const favoriteFirstPool = [...favoriteMatches, ...pool.filter((meal) => !favoriteMatches.some((favorite) => favorite.id === meal.id))];
  return uniqueNutritionMealOptions(shuffledNutritionMeals(favoriteFirstPool), { planWide: true })
    .sort((a, b) =>
      Number(favoriteMealIds.includes(b.id)) - Number(favoriteMealIds.includes(a.id)) ||
      nutritionMealSmartScore(b, options, currentMeal.mealType) - nutritionMealSmartScore(a, options, currentMeal.mealType) ||
      Math.random() - 0.5
    )
    .slice(0, config.limit || 120);
}

function mealFitsNutritionPreferences(meal, options) {
  if (mealHasAllergy(meal, options.allergy)) return false;
  if (mealHasDislikedFood(meal, options.foodDislikes)) return false;
  if (options.dietaryNeed && !["Any", "Balanced", "Moderate Carb"].includes(options.dietaryNeed) && !meal.dietTags.includes(options.dietaryNeed)) return false;
  if (options.cuisine && options.cuisine !== "Any" && meal.cuisine !== options.cuisine) return false;
  if (options.budgetLevel && options.budgetLevel !== "Any" && meal.budgetLevel !== options.budgetLevel) return false;
  if (options.prepTimePreference && options.prepTimePreference !== "Any" && !mealFitsPrepTime(meal, options.prepTimePreference)) return false;
  return true;
}

function nutritionSwapOptionGroups(meals, favoriteIds = []) {
  if (!meals.length) return `<option value="">No matching meals found for this plan's filters</option>`;
  const favorites = meals.filter((meal) => favoriteIds.includes(meal.id));
  const others = meals.filter((meal) => !favoriteIds.includes(meal.id));
  const option = (meal) => `<option value="${meal.id}">${escapeHtml(meal.name)} / ${escapeHtml(meal.cuisine || "Any culture")} / ${escapeHtml(meal.budgetLevel || "Any budget")} / ${meal.calories} cal / P ${meal.protein}g</option>`;
  if (!favorites.length) return others.map(option).join("");
  return `
    <optgroup label="Favorite meals">
      ${favorites.map(option).join("")}
    </optgroup>
    <optgroup label="Other matching meals">
      ${others.map(option).join("")}
    </optgroup>
  `;
}

function nutritionMealSmartScore(meal, options, mealType) {
  let score = 0;
  const targets = options.targets || calculateNutritionTargets({ ...nutritionProfileFromSelectedClient(), ...options });
  const mealsPerDay = Math.max(1, Number(options.mealsPerDay || 3) + Number(options.snacksPerDay || 1));
  const mealCalorieTarget = Math.round(targets.targetCalories / mealsPerDay);
  const mealProteinTarget = Math.round(targets.proteinGrams / mealsPerDay);
  if (meal.mealType === mealType) score += 20;
  if (!mealHasAllergy(meal, options.allergy)) score += 20;
  if (!mealHasDislikedFood(meal, options.foodDislikes)) score += 18;
  if (!options.dietaryNeed || ["Any", "Balanced", "Moderate Carb"].includes(options.dietaryNeed) || meal.dietTags.includes(options.dietaryNeed)) score += 16;
  if (!options.cuisine || options.cuisine === "Any" || meal.cuisine === options.cuisine) score += 14;
  if (!options.goal || options.goal === "Any" || meal.goal === options.goal) score += 8;
  if (!options.budgetLevel || options.budgetLevel === "Any" || meal.budgetLevel === options.budgetLevel) score += 4;
  score += Math.max(0, 12 - Math.abs(Number(meal.calories || 0) - mealCalorieTarget) / 35);
  score += Math.max(0, 10 - Math.abs(Number(meal.protein || 0) - mealProteinTarget) / 3);
  if (/diabetes|prediabetes/i.test(options.dietaryNeed || "")) {
    score += nutritionMealNutrient(meal, "fiber");
    score -= nutritionMealNutrient(meal, "addedSugar") * 3;
    score -= nutritionMealNutrient(meal, "sugar") > 25 ? 8 : 0;
  }
  if (/low sodium|heart/i.test(options.dietaryNeed || "")) score -= nutritionMealNutrient(meal, "sodium") > 650 ? 10 : 0;
  if (meal.dietTags.includes("High Protein")) score += 2;
  return score;
}

function mealHasDislikedFood(meal, dislikes = "") {
  const disliked = String(dislikes || "").split(",").map((item) => normalizeNutritionText(item)).filter(Boolean);
  if (!disliked.length) return false;
  const source = normalizeNutritionText(`${meal.name} ${meal.ingredients} ${meal.shoppingListItems}`);
  return disliked.some((item) => source.includes(item));
}

function mealFitsPrepTime(meal, preference) {
  const prep = Number(String(meal.prepTime || "").match(/\d+/)?.[0] || 0);
  if (!prep) return true;
  if (preference === "Quick") return prep <= 15;
  if (preference === "Moderate") return prep <= 30;
  return true;
}

function replaceNutritionDemoMeal(dayNumber, mealIndex, mealId) {
  const plan = state.nutritionDemo.generatedPlan;
  const day = plan?.days.find((item) => Number(item.day) === Number(dayNumber));
  const replacement = nutritionDemoMealPool.find((meal) => meal.id === mealId);
  if (!day || !replacement || !day.meals[mealIndex]) return;
  day.meals[mealIndex] = nutritionMealWithSlot(replacement, {
    label: day.meals[mealIndex].slotLabel || day.meals[mealIndex].mealLabel || day.meals[mealIndex].mealType,
    type: replacement.mealType
  });
  recalculateNutritionDemoPlan(plan);
}

function smartReplaceNutritionDemoMeal(dayNumber, mealIndex) {
  const plan = state.nutritionDemo.generatedPlan;
  const day = plan?.days.find((item) => Number(item.day) === Number(dayNumber));
  const currentMeal = day?.meals?.[mealIndex];
  if (!plan || !day || !currentMeal) return;
  const usedIds = new Set(plan.days.flatMap((planDay) => planDay.meals || []).map((meal) => meal.id));
  const usedKeys = nutritionPlanUsedKeys(plan);
  usedIds.delete(currentMeal.id);
  usedKeys.delete(nutritionMealPlanRepeatKey(currentMeal));
  const replacement = pickSmartNutritionMeal(currentMeal.mealType, state.nutritionDemo, usedIds, currentMeal.id, usedKeys);
  if (!replacement) return;
  day.meals[mealIndex] = nutritionMealWithSlot(replacement, {
    label: currentMeal.slotLabel || currentMeal.mealLabel || currentMeal.mealType,
    type: replacement.mealType
  });
  recalculateNutritionDemoPlan(plan);
}

function smartReplaceNutritionDemoDay(dayNumber) {
  const plan = state.nutritionDemo.generatedPlan;
  const day = plan?.days.find((item) => Number(item.day) === Number(dayNumber));
  if (!plan || !day) return;
  const usedIds = new Set(plan.days.filter((item) => Number(item.day) !== Number(dayNumber)).flatMap((planDay) => planDay.meals || []).map((meal) => meal.id));
  const usedKeys = new Set(plan.days.filter((item) => Number(item.day) !== Number(dayNumber)).flatMap((planDay) => planDay.meals || []).map((meal) => nutritionMealPlanRepeatKey(meal)));
  day.meals = day.meals.map((meal) => {
    const replacement = pickSmartNutritionMeal(meal.mealType, state.nutritionDemo, usedIds, meal.id, usedKeys);
    if (replacement) {
      usedIds.add(replacement.id);
      usedKeys.add(nutritionMealPlanRepeatKey(replacement));
      return nutritionMealWithSlot(replacement, {
        label: meal.slotLabel || meal.mealLabel || meal.mealType,
        type: replacement.mealType
      });
    }
    usedIds.add(meal.id);
    usedKeys.add(nutritionMealPlanRepeatKey(meal));
    return meal;
  });
  recalculateNutritionDemoPlan(plan);
}

function pickSmartNutritionMeal(mealType, options, usedIds = new Set(), currentMealId = "", usedKeys = new Set()) {
  const typePool = nutritionMealsByType[mealType] || nutritionDemoMealPool;
  const strictPool = typePool.filter((meal) => mealFitsNutritionPreferences(meal, options));
  const allergySafePool = typePool.filter((meal) => !mealHasAllergy(meal, options.allergy));
  return selectFastNutritionCandidate(strictPool.length ? strictPool : allergySafePool.length ? allergySafePool : typePool, options, mealType, {
    usedIds,
    usedKeys,
    currentMealId,
    limit: 220
  });
}

function clientFavoriteMealIds(clientId) {
  const client = store.clients.find((item) => item.id === clientId);
  return Array.isArray(client?.favoriteMealIds) ? client.favoriteMealIds : [];
}

function clientDislikedMealIds(clientId) {
  const client = store.clients.find((item) => item.id === clientId);
  return Array.isArray(client?.dislikedMealIds) ? client.dislikedMealIds : [];
}

function toggleFavoriteMealForClient(mealId) {
  const client = clientForCurrentUser();
  if (!client || !mealId) return;
  client.favoriteMealIds ||= [];
  if (client.favoriteMealIds.includes(mealId)) {
    client.favoriteMealIds = client.favoriteMealIds.filter((id) => id !== mealId);
  } else {
    client.favoriteMealIds.push(mealId);
  }
  saveStore();
}

function toggleDislikedMealForClient(mealId) {
  const client = clientForCurrentUser();
  if (!client || !mealId) return;
  client.dislikedMealIds ||= [];
  if (client.dislikedMealIds.includes(mealId)) {
    client.dislikedMealIds = client.dislikedMealIds.filter((id) => id !== mealId);
  } else {
    client.dislikedMealIds.push(mealId);
    client.favoriteMealIds = (client.favoriteMealIds || []).filter((id) => id !== mealId);
  }
  saveStore();
}

function trackMealStatus(planId, dayNumber, mealIndex, status, note = "") {
  const plan = (store.mealPlans || []).find((item) => item.id === planId);
  const day = plan?.days?.find((item) => Number(item.day) === Number(dayNumber));
  const meal = day?.meals?.[mealIndex];
  if (!plan || !day || !meal || !status) return;
  plan.mealTracking ||= [];
  const recordId = `${planId}_${dayNumber}_${mealIndex}`;
  const record = {
    id: recordId,
    clientId: plan.clientId,
    planId,
    day: Number(dayNumber),
    mealIndex: Number(mealIndex),
    mealId: meal.id,
    mealName: meal.name,
    status,
    notes: note,
    calories: status === "Ate" || status === "Substituted" ? Number(meal.calories || 0) : 0,
    protein: status === "Ate" || status === "Substituted" ? Number(meal.protein || 0) : 0,
    carbs: status === "Ate" || status === "Substituted" ? Number(meal.carbs || 0) : 0,
    fat: status === "Ate" || status === "Substituted" ? Number(meal.fat || 0) : 0,
    createdAt: new Date().toISOString()
  };
  const existingIndex = plan.mealTracking.findIndex((item) => item.id === recordId);
  if (existingIndex >= 0) plan.mealTracking[existingIndex] = record;
  else plan.mealTracking.push(record);
  plan.updatedAt = new Date().toISOString();
  saveStore();
}

function mealTrackingSummary(plan, day) {
  const records = (plan.mealTracking || []).filter((item) => Number(item.day) === Number(day.day));
  const eaten = records.filter((item) => item.status === "Ate" || item.status === "Substituted");
  return {
    completed: eaten.length,
    tracked: records.length,
    calories: eaten.reduce((sum, item) => sum + Number(item.calories || 0), 0),
    protein: eaten.reduce((sum, item) => sum + Number(item.protein || 0), 0),
    carbs: eaten.reduce((sum, item) => sum + Number(item.carbs || 0), 0),
    fat: eaten.reduce((sum, item) => sum + Number(item.fat || 0), 0)
  };
}

function replaceAssignedMeal(planId, dayNumber, mealIndex, mealId) {
  const plan = (store.mealPlans || []).find((item) => item.id === planId);
  const day = plan?.days?.find((item) => Number(item.day) === Number(dayNumber));
  const replacement = nutritionDemoMealPool.find((meal) => meal.id === mealId);
  if (!plan || !day || !replacement || !day.meals?.[mealIndex]) return;
  day.meals[mealIndex] = nutritionMealWithSlot(replacement, {
    label: day.meals[mealIndex].slotLabel || day.meals[mealIndex].mealLabel || day.meals[mealIndex].mealType,
    type: replacement.mealType
  });
  plan.updatedAt = new Date().toISOString();
  recalculateNutritionDemoPlan(plan);
  saveStore();
}

function recalculateNutritionDemoPlan(plan) {
  plan.days.forEach((day) => {
    day.totalCalories = day.meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
    day.totalProtein = day.meals.reduce((sum, meal) => sum + Number(meal.protein || 0), 0);
    day.totalCarbs = day.meals.reduce((sum, meal) => sum + Number(meal.carbs || 0), 0);
    day.totalFat = day.meals.reduce((sum, meal) => sum + Number(meal.fat || 0), 0);
    day.totalFiber = day.meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "fiber"), 0);
    day.totalSugar = day.meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "sugar"), 0);
    day.totalSodium = day.meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "sodium"), 0);
  });
  const totals = plan.days.reduce((sum, day) => ({
    calories: sum.calories + day.totalCalories,
    protein: sum.protein + day.totalProtein,
    carbs: sum.carbs + day.totalCarbs,
    fat: sum.fat + day.totalFat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  plan.summary.averageCalories = Math.round(totals.calories / plan.days.length);
  plan.summary.averageProtein = Math.round(totals.protein / plan.days.length);
  plan.summary.averageCarbs = Math.round(totals.carbs / plan.days.length);
  plan.summary.averageFat = Math.round(totals.fat / plan.days.length);
}

function nutritionMealNutrient(meal, nutrient) {
  if (Number.isFinite(Number(meal?.[nutrient]))) return Math.round(Number(meal[nutrient]));
  const calories = Number(meal?.calories || 0);
  const carbs = Number(meal?.carbs || 0);
  if (nutrient === "fiber") return Math.max(2, Math.round(carbs * 0.16));
  if (nutrient === "sugar") return Math.max(1, Math.round(carbs * 0.22));
  if (nutrient === "sodium") return Math.max(120, Math.round(calories * (meal?.dietTags?.includes("Low Sodium") ? 0.45 : 0.8)));
  if (nutrient === "addedSugar") return meal?.dietTags?.includes("Diabetes Friendly") || meal?.dietTags?.includes("Prediabetes Friendly") ? 0 : Math.round(carbs * 0.05);
  if (nutrient === "saturatedFat") return Math.round(Number(meal?.fat || 0) * 0.28);
  return 0;
}

function formatReadableDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toLocaleDateString();
}

function activeMealPlanForClient(clientId) {
  return (store.mealPlans || [])
    .filter((plan) => plan.clientId === clientId && plan.status === "Active")
    .sort((a, b) => String(b.assignedAt || b.createdAt).localeCompare(String(a.assignedAt || a.createdAt)))[0] || null;
}

function printNutritionShoppingList() {
  const now = Date.now();
  if (now - lastShoppingListPrintAt < 700) return;
  lastShoppingListPrintAt = now;
  const shoppingList = document.querySelector(".printable-shopping-list");
  if (!shoppingList) {
    alert("No shopping list is ready to print yet. Generate or assign a meal plan first.");
    return;
  }
  const title = shoppingList.querySelector("h3")?.textContent || "Shopping List";
  const shoppingGroups = Array.from(shoppingList.querySelectorAll(".shopping-columns > div"))
    .map((group) => {
      const heading = group.querySelector("h4")?.textContent?.trim() || "";
      const items = Array.from(group.querySelectorAll("li")).map((item) => item.textContent.trim()).filter(Boolean);
      return { heading, items };
    })
    .filter((group) => group.items.length);
  const printMarkup = `
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(title)}</title>
        <style>
          @page { margin: 8mm; size: auto; }
          * { box-sizing: border-box; }
          html, body { background: #fff !important; color: #111 !important; margin: 0; padding: 0; min-height: 0; }
          body { font-family: Arial, sans-serif; font-size: 11px; line-height: 1.12; }
          h1 { margin: 0 0 6px; font-size: 16px; line-height: 1.1; }
          .shopping-list-print { columns: 3; column-gap: 18px; }
          .shopping-group { break-inside: avoid; page-break-inside: avoid; margin: 0 0 6px; }
          h4 { margin: 0 0 2px; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #999; }
          ul { margin: 0; padding-left: 14px; }
          li { margin: 0 0 1px; line-height: 1.12; }
          @media print {
            body { margin: 0; }
            .shopping-list-print { columns: 3; }
          }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <div class="shopping-list-print">
          ${shoppingGroups.map((group) => `
            <section class="shopping-group">
              <h4>${escapeHtml(group.heading)}</h4>
              <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>
          `).join("")}
        </div>
        <script>
          window.onload = function() {};
        <\/script>
      </body>
    </html>
  `;
  const oldFrame = document.querySelector("#nutritionShoppingPrintFrame");
  oldFrame?.remove();
  const frame = document.createElement("iframe");
  frame.id = "nutritionShoppingPrintFrame";
  frame.setAttribute("title", "Shopping list print");
  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";
  frame.style.opacity = "0";
  document.body.appendChild(frame);
  const frameDocument = frame.contentWindow?.document;
  if (!frameDocument) {
    alert("The shopping list could not open the print dialog. Please try again.");
    frame.remove();
    return;
  }
  frameDocument.open();
  frameDocument.write(printMarkup);
  frameDocument.close();
  setTimeout(() => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    setTimeout(() => frame.remove(), 1200);
  }, 120);
}

function requestClientMealPlanAddon() {
  ensureStoreListShape(store);
  const client = clientForCurrentUser();
  if (!client || state.currentUser?.role !== "Client") return;
  const coachUser = store.users.find((user) => user.role === "Coach" && user.linkedId === client.coachId) || store.users.find((user) => user.role === "Coach");
  const adminUser = store.users.find((user) => user.role === "Admin");
  const now = new Date().toISOString();
  client.mealPlanRequested = true;
  client.mealPlanRequestedAt = now;
  client.mealPlanAddonPrice = 50;
  if (coachUser) {
    sendChatMessage(store, {
      fromUserId: state.currentUser.id,
      toUserId: coachUser.id,
      clientId: client.id,
      body: `${client.name} requested the Smart Meal Plan add-on. Add-on price: $50.`
    });
  }
  if (adminUser) {
    store.notifications.push({
      id: `notification_meal_request_${Date.now()}`,
      userId: adminUser.id,
      clientId: client.id,
      type: "Meal Plan Request",
      title: "Meal plan add-on requested",
      body: `${client.name} requested the $50 Smart Meal Plan add-on.`,
      read: false,
      createdAt: now
    });
  }
  store.adminAuditLog.push({
    id: `audit_meal_request_${Date.now()}`,
    adminUserId: state.currentUser.id,
    action: `${client.name} requested the $50 Smart Meal Plan add-on`,
    createdAt: now
  });
  saveStore();
}

function resetNutritionPlannerForAction() {
  state.editModal = null;
  state.editModalDirty = false;
  state.nutritionDemo.dayModalOpen = false;
  state.nutritionDemo.recipeModal = null;
  store.settings.nutritionPlannerEnabled = true;
  store.settings.nutritionDemoMode = "Active";
  const options = collectNutritionDemoOptions();
  state.nutritionDemo = {
    ...state.nutritionDemo,
    ...options,
    openDay: 1,
    dayModalOpen: false,
    recipeModal: null,
    generatedPlan: generateNutritionDemoPlan(options)
  };
  return state.nutritionDemo.generatedPlan;
}

function assignGeneratedMealPlanToClient(clientId) {
  ensureStoreListShape(store);
  const client = store.clients.find((item) => item.id === clientId);
  if (!state.nutritionDemo.generatedPlan) {
    resetNutritionPlannerForAction();
  }
  const plan = state.nutritionDemo.generatedPlan;
  if (!client || !plan) {
    state.nutritionAssignNotice = "Generate a meal plan and choose a client first.";
    return false;
  }
  if (!Array.isArray(plan.days) || !plan.days.length || !plan.summary) {
    resetNutritionPlannerForAction();
  }
  const planToSave = state.nutritionDemo.generatedPlan;
  if (!Array.isArray(planToSave.days) || !planToSave.days.length || !planToSave.summary) {
    state.nutritionAssignNotice = "Meal plan could not be built. Please adjust the meal planner filters and try again.";
    return false;
  }
  state.clientId = clientId;
  store.mealPlans.forEach((item) => {
    if (item.clientId === clientId && item.status === "Active") {
      item.status = "Archived";
      item.archivedAt = new Date().toISOString();
    }
  });
  const savedPlan = {
    id: `meal_plan_${clientId}_${Date.now()}`,
    clientId,
    clientName: client.name,
    createdByUserId: state.currentUser.id,
    createdByName: state.currentUser.name,
    status: "Active",
    planName: `${planToSave.days.length}-Day ${planToSave.summary.goal} Meal Plan`,
    assignedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    options: { ...(planToSave.options || collectNutritionDemoOptions()) },
    summary: { ...planToSave.summary },
    days: JSON.parse(JSON.stringify(planToSave.days))
  };
  store.mealPlans.push(savedPlan);
  state.nutritionDemo.assignedPlanId = savedPlan.id;
  store.adminAuditLog.push({
    id: `audit_meal_plan_${Date.now()}`,
    adminUserId: state.currentUser.id,
    action: `Assigned meal plan ${savedPlan.id} to ${client.name}`,
    createdAt: new Date().toISOString()
  });
  state.nutritionAssignNotice = `Meal plan assigned to ${client.name}. The client can now see it on their Meal Plan tab.`;
  try {
    window.localStorage?.setItem(STORE_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn("Meal plan assigned, but local browser save hit a storage limit.", error);
    state.nutritionAssignNotice = `Meal plan assigned to ${client.name}, but this browser could not save it locally because storage is full.`;
  }
  scheduleAutomaticCloudBackup();
  return true;
}

function nutritionAssignedPlanSummary(clientId) {
  const client = store.clients.find((item) => item.id === clientId);
  if (!client) return "";
  const plan = activeMealPlanForClient(clientId);
  return `
    <div class="result-band">
      <strong>Current assigned meal plan</strong>
      <span>${plan ? `${escapeHtml(client.name)} has ${escapeHtml(plan.planName)} assigned on ${formatReadableDate(plan.assignedAt)}.` : `${escapeHtml(client.name)} does not have an active meal plan assigned yet.`}</span>
    </div>
  `;
}

function nutritionAssignedPlanView(plan, options = {}) {
  const shopping = buildNutritionShoppingList(plan.days || []);
  const targetLine = plan.summary?.targetCalories
    ? `Target: ${plan.summary.targetCalories} cal / P ${plan.summary.targetProtein}g / C ${plan.summary.targetCarbs}g / F ${plan.summary.targetFat}g`
    : "";
  return `
    <section class="nutrition-demo-results">
      <div class="section-head compact-head">
        <div>
          <p class="eyebrow">${escapeHtml(plan.status || "Active")} / ${escapeHtml(plan.planName || "Meal Plan")}</p>
          <h3>${escapeHtml(plan.summary?.goal || "Goal")} / ${escapeHtml(plan.summary?.dietaryNeed || "Nutrition")}</h3>
          <p class="muted">Assigned ${formatReadableDate(plan.assignedAt || plan.createdAt)}. Estimated daily average: ${plan.summary?.averageCalories || 0} cal, ${plan.summary?.averageProtein || 0}g protein.</p>
          ${targetLine ? `<p class="muted">${escapeHtml(targetLine)}</p>` : ""}
          <p class="muted">Plan structure: ${Number(plan.summary?.mealsPerDay ?? plan.options?.mealsPerDay ?? 3)} meals + ${Number(plan.summary?.snacksPerDay ?? plan.options?.snacksPerDay ?? 1)} snacks per day.</p>
          ${plan.summary?.reviewRequired ? `<p class="badge danger">Coach/Admin review needed</p>` : ""}
          ${options.clientView ? `<p class="muted">Click any meal card to open the recipe, ingredients, and step-by-step instructions.</p>` : ""}
        </div>
      </div>
      <div class="card-list compact-plan-list">
        ${(plan.days || []).map((day) => `
          <article class="card nutrition-day-card">
            <div class="section-head compact-head">
              <div>
                <p class="eyebrow">Day ${day.day}</p>
                <h3>${day.totalCalories} cal / ${day.totalProtein}g protein</h3>
                <p class="muted">C ${day.totalCarbs}g / F ${day.totalFat}g / Fiber ${day.totalFiber || 0}g / Sugar ${day.totalSugar || 0}g / Sodium ${day.totalSodium || 0}mg</p>
                ${options.clientView ? nutritionMealTrackingLine(plan, day) : ""}
              </div>
            </div>
            <div class="meal-preview-list">
              ${day.meals.map((meal, mealIndex) => nutritionMealPreviewCard(meal, plan.id, day.day, mealIndex)).join("")}
            </div>
          </article>
        `).join("")}
      </div>
      ${options.clientView ? `
        <article class="card printable-shopping-list">
          <div class="section-head compact-head">
            <div><p class="eyebrow">Shopping</p><h3>Shopping list</h3></div>
            <button id="printNutritionShoppingList" data-print-nutrition-shopping-list onclick="window.printNutritionShoppingList && window.printNutritionShoppingList()">Print Shopping List</button>
          </div>
          <div class="shopping-columns">
            ${Object.entries(shopping).map(([category, items]) => `
              <div>
                <h4>${escapeHtml(category)}</h4>
                <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </div>
            `).join("")}
          </div>
        </article>
      ` : ""}
    </section>
  `;
}

function nutritionMealTrackingLine(plan, day) {
  const tracked = mealTrackingSummary(plan, day);
  if (!tracked.tracked) return `<p class="muted">Tracking: no meals marked yet.</p>`;
  return `<p class="muted">Tracking: ${tracked.completed}/${day.meals.length} meals completed / eaten ${tracked.calories} cal / P ${tracked.protein}g / C ${tracked.carbs}g / F ${tracked.fat}g</p>`;
}

function collectNutritionDemoOptions() {
  const clientProfile = nutritionProfileFromSelectedClient();
  return {
    planLength: Number(document.querySelector("#nutritionPlanLength")?.value || state.nutritionDemo.planLength || 7),
    goal: document.querySelector("#nutritionGoal")?.value || clientProfile.goal || state.nutritionDemo.goal,
    dietaryNeed: document.querySelector("#nutritionDietaryNeed")?.value || clientProfile.dietaryNeed || state.nutritionDemo.dietaryNeed,
    allergy: document.querySelector("#nutritionAllergy")?.value || clientProfile.allergy || state.nutritionDemo.allergy,
    cuisine: document.querySelector("#nutritionCuisine")?.value || clientProfile.cuisine || state.nutritionDemo.cuisine,
    budgetLevel: document.querySelector("#nutritionBudget")?.value || clientProfile.budgetLevel || state.nutritionDemo.budgetLevel,
    age: Number(document.querySelector("#nutritionAge")?.value || clientProfile.age || state.nutritionDemo.age || 35),
    sex: document.querySelector("#nutritionSex")?.value || clientProfile.sex || state.nutritionDemo.sex,
    heightInches: Number(document.querySelector("#nutritionHeightInches")?.value || clientProfile.heightInches || state.nutritionDemo.heightInches || 66),
    currentWeightLb: Number(document.querySelector("#nutritionCurrentWeight")?.value || clientProfile.currentWeightLb || state.nutritionDemo.currentWeightLb || 180),
    goalWeightLb: Number(document.querySelector("#nutritionGoalWeight")?.value || clientProfile.goalWeightLb || state.nutritionDemo.goalWeightLb || 160),
    activityLevel: document.querySelector("#nutritionActivityLevel")?.value || clientProfile.activityLevel || state.nutritionDemo.activityLevel,
    workoutDaysPerWeek: Number(document.querySelector("#nutritionWorkoutDays")?.value || clientProfile.workoutDaysPerWeek || state.nutritionDemo.workoutDaysPerWeek || 3),
    averageWorkoutLength: Number(document.querySelector("#nutritionWorkoutLength")?.value || clientProfile.averageWorkoutLength || state.nutritionDemo.averageWorkoutLength || 45),
    trainingType: document.querySelector("#nutritionTrainingType")?.value || clientProfile.trainingType || state.nutritionDemo.trainingType,
    mealsPerDay: Number(document.querySelector("#nutritionMealsPerDay")?.value || clientProfile.mealsPerDay || state.nutritionDemo.mealsPerDay || 3),
    snacksPerDay: Number(document.querySelector("#nutritionSnacksPerDay")?.value || clientProfile.snacksPerDay || state.nutritionDemo.snacksPerDay || 1),
    prepTimePreference: document.querySelector("#nutritionPrepTime")?.value || clientProfile.prepTimePreference || state.nutritionDemo.prepTimePreference,
    foodDislikes: document.querySelector("#nutritionFoodDislikes")?.value || clientProfile.foodDislikes || state.nutritionDemo.foodDislikes || "",
    favoriteFoods: document.querySelector("#nutritionFavoriteFoods")?.value || clientProfile.favoriteFoods || state.nutritionDemo.favoriteFoods || "",
    medicalFlags: document.querySelector("#nutritionMedicalFlags")?.value || clientProfile.medicalFlags || state.nutritionDemo.medicalFlags || "",
    calorieOverride: document.querySelector("#nutritionCalorieOverride")?.value || state.nutritionDemo.calorieOverride || "",
    proteinOverride: document.querySelector("#nutritionProteinOverride")?.value || state.nutritionDemo.proteinOverride || "",
    carbsOverride: document.querySelector("#nutritionCarbsOverride")?.value || state.nutritionDemo.carbsOverride || "",
    fatOverride: document.querySelector("#nutritionFatOverride")?.value || state.nutritionDemo.fatOverride || ""
  };
}

function generateNutritionDemoPlan(options) {
  const targets = calculateNutritionTargets({ ...nutritionProfileFromSelectedClient(), ...options });
  const mealSlots = nutritionDailyMealSlots(options);
  const days = [];
  const counters = {};
  const usedIds = new Set();
  const usedKeys = new Set();
  for (let day = 1; day <= options.planLength; day += 1) {
    const meals = mealSlots.map((slot) => {
      const meal = pickNutritionDemoMeal(slot.type, options, day, counters, usedIds, usedKeys);
      if (meal) {
        usedIds.add(meal.id);
        usedKeys.add(nutritionMealPlanRepeatKey(meal));
      }
      return nutritionMealWithSlot(meal, slot);
    }).filter(Boolean);
    days.push({
      day,
      meals,
      totalCalories: meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0),
      totalProtein: meals.reduce((sum, meal) => sum + Number(meal.protein || 0), 0),
      totalCarbs: meals.reduce((sum, meal) => sum + Number(meal.carbs || 0), 0),
      totalFat: meals.reduce((sum, meal) => sum + Number(meal.fat || 0), 0),
      totalFiber: meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "fiber"), 0),
      totalSugar: meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "sugar"), 0),
      totalSodium: meals.reduce((sum, meal) => sum + nutritionMealNutrient(meal, "sodium"), 0)
    });
  }
  const totals = days.reduce((sum, day) => ({
    calories: sum.calories + day.totalCalories,
    protein: sum.protein + day.totalProtein,
    carbs: sum.carbs + day.totalCarbs,
    fat: sum.fat + day.totalFat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  return {
    options,
    targets,
    days,
    summary: {
      goal: options.goal,
      dietaryNeed: options.dietaryNeed,
      averageCalories: Math.round(totals.calories / days.length),
      averageProtein: Math.round(totals.protein / days.length),
      averageCarbs: Math.round(totals.carbs / days.length),
      averageFat: Math.round(totals.fat / days.length),
      targetCalories: targets.targetCalories,
      targetProtein: targets.proteinGrams,
      targetCarbs: targets.carbGrams,
      targetFat: targets.fatGrams,
      mealsPerDay: nutritionDailyMainMealCount(options),
      snacksPerDay: nutritionDailySnackCount(options),
      dailyMealSlots: mealSlots.map((slot) => slot.label),
      reviewRequired: targets.reviewRequired,
      warnings: targets.warnings
    }
  };
}

function nutritionDailyMainMealCount(options = {}) {
  return Math.max(1, Math.min(5, Number(options.mealsPerDay || 3)));
}

function nutritionDailySnackCount(options = {}) {
  return Math.max(0, Math.min(4, Number(options.snacksPerDay ?? 1)));
}

function nutritionDailyMealSlots(options = {}) {
  const mealsPerDay = nutritionDailyMainMealCount(options);
  const snacksPerDay = nutritionDailySnackCount(options);
  const mainMealPatterns = {
    1: [{ type: "Dinner", label: "Meal 1" }],
    2: [
      { type: "Breakfast", label: "Breakfast" },
      { type: "Dinner", label: "Dinner" }
    ],
    3: [
      { type: "Breakfast", label: "Breakfast" },
      { type: "Lunch", label: "Lunch" },
      { type: "Dinner", label: "Dinner" }
    ],
    4: [
      { type: "Breakfast", label: "Breakfast" },
      { type: "Lunch", label: "Lunch" },
      { type: "Dinner", label: "Dinner" },
      { type: "Lunch", label: "Extra Meal" }
    ],
    5: [
      { type: "Breakfast", label: "Breakfast" },
      { type: "Lunch", label: "Lunch" },
      { type: "Dinner", label: "Dinner" },
      { type: "Lunch", label: "Extra Meal 1" },
      { type: "Dinner", label: "Extra Meal 2" }
    ]
  };
  const mainMeals = mainMealPatterns[mealsPerDay] || mainMealPatterns[3];
  const snacks = Array.from({ length: snacksPerDay }, (_, index) => ({
    type: "Snack",
    label: snacksPerDay === 1 ? "Snack" : `Snack ${index + 1}`
  }));
  return [...mainMeals, ...snacks];
}

function pickNutritionDemoMeal(mealType, options, day, counters, usedIds = new Set(), usedKeys = new Set()) {
  const typePool = nutritionMealsByType[mealType] || nutritionDemoMealPool;
  const matches = typePool.filter((meal) => nutritionMealMatches(meal, mealType, options));
  const fallback = typePool.filter((meal) => !mealHasAllergy(meal, options.allergy));
  let picked = selectFastNutritionCandidate(matches.length ? matches : fallback.length ? fallback : typePool, options, mealType, {
    usedIds,
    usedKeys,
    limit: 240
  });
  if (!picked) {
    picked = selectFastNutritionCandidate(fallback.length ? fallback : typePool, options, mealType, { usedIds: new Set(), usedKeys: new Set(), limit: 120 });
  }
  picked ||= typePool[(day - 1) % Math.max(1, typePool.length)] || nutritionDemoMealPool[0];
  counters[picked.id] = (counters[picked.id] || 0) + 1;
  return picked;
}

function nutritionMealMatches(meal, mealType, options) {
  if (meal.mealType !== mealType) return false;
  if (mealHasAllergy(meal, options.allergy)) return false;
  if (mealHasDislikedFood(meal, options.foodDislikes)) return false;
  if (options.goal && options.goal !== "Any" && meal.goal && meal.goal !== options.goal) return false;
  if (options.dietaryNeed && !["Any", "Balanced", "Moderate Carb"].includes(options.dietaryNeed) && !meal.dietTags.includes(options.dietaryNeed)) return false;
  if (options.cuisine && options.cuisine !== "Any" && meal.cuisine !== options.cuisine) return false;
  if (options.budgetLevel && options.budgetLevel !== "Any" && meal.budgetLevel !== options.budgetLevel) return false;
  if (options.prepTimePreference && options.prepTimePreference !== "Any" && !mealFitsPrepTime(meal, options.prepTimePreference)) return false;
  return true;
}

function mealHasAllergy(meal, allergy) {
  const allergyKey = normalizeNutritionText(allergy || "");
  if (!allergyKey || allergyKey === "none" || allergyKey === "any") return false;
  const allergenText = normalizeNutritionText([...(meal?.allergens || []), meal?.ingredients, meal?.shoppingListItems, meal?.name].filter(Boolean).join(" "));
  const directMatches = {
    nuts: /\b(nut|peanut|almond|cashew|walnut|pecan|pistachio|hazelnut)\b/,
    dairy: /\b(dairy|milk|cheese|yogurt|butter|cream|whey)\b/,
    eggs: /\b(egg|eggs)\b/,
    shellfish: /\b(shellfish|shrimp|crab|lobster|scallop|clam|oyster)\b/,
    gluten: /\b(gluten|wheat|barley|rye|bread|pasta|flour|tortilla)\b/,
    soy: /\b(soy|tofu|edamame|soybean|tamari)\b/,
    fish: /\b(fish|salmon|tuna|cod|tilapia|sardine|trout)\b/
  };
  return directMatches[allergyKey] ? directMatches[allergyKey].test(allergenText) : allergenText.includes(allergyKey);
}

function buildNutritionShoppingList(days) {
  const categories = {
    Protein: new Map(),
    Produce: new Map(),
    "Grains / Starches": new Map(),
    "Dairy / Eggs": new Map(),
    "Pantry / Seasoning": new Map(),
    Other: new Map()
  };
  days.flatMap((day) => day.meals).forEach((meal) => {
    parseNutritionShoppingItems(meal.shoppingListItems || meal.ingredients || "").forEach((item) => {
      const normalized = normalizeShoppingItem(item);
      if (!normalized) return;
      const category = inferShoppingCategory(normalized);
      const key = normalizeNutritionText(normalized);
      if (!categories[category].has(key)) categories[category].set(key, titleCaseShoppingItem(normalized));
    });
  });
  return Object.fromEntries(Object.entries(categories)
    .map(([category, items]) => [category, [...items.values()].sort((a, b) => a.localeCompare(b))])
    .filter(([, items]) => items.length));
}

function parseNutritionShoppingItems(value) {
  return String(value || "")
    .split(";")
    .flatMap((group) => {
      const parts = group.split(":");
      const rawItems = parts.length > 1 ? parts.slice(1).join(":") : group;
      return rawItems.split(",");
    })
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeShoppingItem(item) {
  return String(item || "")
    .replace(/\b(about|fresh|extra|light|low sodium|salt free|salt-free|no added sugar)\b/gi, "")
    .replace(/\s+/g, " ")
    .replace(/^[\s,;-]+|[\s,;-]+$/g, "")
    .trim();
}

function titleCaseShoppingItem(item) {
  const keepLower = new Set(["or", "and", "of"]);
  return String(item || "").split(" ").map((word, index) => {
    const lower = word.toLowerCase();
    if (index > 0 && keepLower.has(lower)) return lower;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(" ");
}

function inferShoppingCategory(item) {
  const text = normalizeNutritionText(item);
  if (/\b(chicken|turkey|beef|fish|salmon|tilapia|catfish|shrimp|tuna|tofu|beans|lentils|chickpeas|peas|black eyed peas|black beans|kidney beans|protein)\b/.test(text)) return "Protein";
  if (/\b(greek yogurt|yogurt|cottage cheese|cheese|feta|parmesan|milk|egg|eggs|egg whites)\b/.test(text)) return "Dairy / Eggs";
  if (/\b(rice|oats|quinoa|bread|pita|roti|tortilla|noodles|pasta|potato|sweet potato|fonio|granola|wrap)\b/.test(text)) return "Grains / Starches";
  if (/\b(spinach|greens|collard|green beans|okra|tomato|tomatoes|pepper|peppers|cabbage|onion|garlic|cucumber|lettuce|romaine|broccoli|carrots|cauliflower|zucchini|eggplant|mushrooms|berries|banana|mango|avocado|lemon|lime|mint|parsley|cilantro|herbs)\b/.test(text)) return "Produce";
  if (/\b(oil|olive oil|avocado oil|seasoning|paprika|cumin|coriander|sumac|za atar|salsa|sauce|honey|chia|tahini|hummus|salt|pepper|ginger|thyme|cinnamon|granola)\b/.test(text)) return "Pantry / Seasoning";
  return "Other";
}

function addSuggestedExerciseToWorkout(workoutId) {
  const workout = store.monthlyPlanItems.find((item) => item.id === workoutId);
  if (!workout) return;
  const assessment = latestClientAssessment(workout.clientId) || summarizeAssessment({ ...state.assessment, clientId: workout.clientId });
  const currentIds = new Set(workout.items.map((item) => item.exerciseId));
  const exercise = findSuggestedExerciseForWorkout(workout, assessment, currentIds);
  if (!exercise) return;
  workout.items.push({
    exerciseId: exercise.id,
    name: exercise.exerciseName || exercise.name,
    sessionPart: exercise.sessionPart || exercise.replacementCategory || "Strength",
    sets: exercise.sets || 2,
    reps: exercise.reps || null,
    time: parseUiDose(exercise.time),
    rest: parseUiDose(exercise.rest) || 60,
    rounds: exercise.rounds || null,
    difficulty: exercise.difficulty,
    equipment: Array.isArray(exercise.equipment) ? exercise.equipment.join(", ") : exercise.equipment,
    replacementReason: "Coach added suggested exercise"
  });
}

function replaceSuggestedWorkout(workoutId) {
  const workout = store.monthlyPlanItems.find((item) => item.id === workoutId);
  if (!workout) return;
  const assessment = latestClientAssessment(workout.clientId) || summarizeAssessment({ ...state.assessment, clientId: workout.clientId });
  const sections = assessment.recoveryRecommended || assessment.adjustmentMode === "Recovery"
    ? ["Warm-Up", "Recovery", "Skill / Technique", "Core", "Cooldown"]
    : ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Cooldown"];
  const used = new Set();
  workout.items = sections.map((section) => {
    const exercise = findSuggestedExerciseForWorkout({ ...workout, preferredSection: section }, assessment, used);
    if (!exercise) return null;
    used.add(exercise.id);
    return {
      exerciseId: exercise.id,
      name: exercise.exerciseName || exercise.name,
      sessionPart: section,
      sets: assessment.recoveryRecommended ? Math.min(2, Number(exercise.sets || 2)) : exercise.sets || null,
      reps: exercise.reps || null,
      time: parseUiDose(exercise.time) || (section === "Warm-Up" || section === "Cooldown" || section === "Recovery" ? 5 : null),
      rest: parseUiDose(exercise.rest) || (assessment.recoveryRecommended ? 90 : 60),
      rounds: assessment.recoveryRecommended ? Math.min(2, Number(exercise.rounds || 2)) : exercise.rounds || null,
      difficulty: exercise.difficulty,
      equipment: Array.isArray(exercise.equipment) ? exercise.equipment.join(", ") : exercise.equipment,
      replacementReason: "Fresh coach suggestion"
    };
  }).filter(Boolean);
}

function findSuggestedExerciseForWorkout(workout, assessment, usedIds = new Set()) {
  const client = store.clients.find((item) => item.id === workout.clientId) || selectedClient();
  const targetLevel = assessment.trainingLevel || workout.trainingLevel || client.currentTrainingLevel || "Beginner";
  const levelOrder = ["Beginner", "Intermediate", "Advanced", "Pro"];
  const targetIndex = levelOrder.indexOf(targetLevel);
  const section = String(workout.preferredSection || "").toLowerCase();
  const equipment = (client.equipmentAvailable || []).join(" ").toLowerCase();
  const recoveryMode = assessment.recoveryRecommended || assessment.adjustmentMode === "Recovery";
  const candidates = store.exercises.filter((exercise) => {
    if (exercise.active === false || exercise.archived || usedIds.has(exercise.id)) return false;
    const exerciseLevel = levelOrder.indexOf(exercise.trainingLevel || exercise.planLevel || "Beginner");
    if (exerciseLevel > targetIndex) return false;
    if (recoveryMode && !exercise.lowImpact && !exercise.recoveryAlternative) return false;
    if ((assessment.restrictions || []).some((restriction) => (exercise.contraindications || []).includes(restriction))) return false;
    if (section) {
      const exerciseSection = String(exercise.sessionPart || exercise.category || exercise.replacementCategory || "").toLowerCase();
      if (!exerciseSection.includes(section.split(" ")[0])) return false;
    }
    const needed = Array.isArray(exercise.equipment) ? exercise.equipment.join(" ").toLowerCase() : String(exercise.equipment || "").toLowerCase();
    if (needed && !needed.includes("bodyweight") && !needed.includes("mobility") && !needed.includes("low-impact") && !equipment.includes(needed.split(" ")[0])) return false;
    return true;
  });
  return candidates.find((exercise) => String(exercise.sportFocus || "").toLowerCase().includes(String(client.sportFocus || "").toLowerCase().split(" ")[0]))
    || candidates.find((exercise) => String(exercise.goal || "").toLowerCase().includes(String(client.goal || "").toLowerCase().split(" ")[0]))
    || candidates[0];
}

function parseUiDose(value) {
  if (typeof value === "number") return value;
  const match = String(value || "").match(/\d+/);
  return match ? Number(match[0]) : value || null;
}

function scoreInput(label, key, value) {
  return `<div class="score-field"><span>${label}</span><div>${[0, 1, 2, 3, 4, 5].map((n) => `<button class="${value === n ? "selected" : ""}" data-weekly-score="${key}:${n}">${n}</button>`).join("")}</div></div>`;
}

function dailyScore(label, key, value) {
  return `<div class="score-field"><span>${label}</span><div>${[0, 1, 2, 3, 4, 5].map((n) => `<button class="${value === n ? "selected" : ""}" data-daily-score="${key}:${n}">${n}</button>`).join("")}</div></div>`;
}

function workoutCard(workout, locked) {
  if (locked) return `<div class="locked">Please contact your coach before completing today's workout.</div>`;
  if (!workout) return `<div class="empty">No workout scheduled today.</div>`;
  return `
    <article class="workout">
      <div class="section-head">
        <div><p class="eyebrow">Week ${workout.weekNumber} / Training day ${workout.trainingDayNumber}</p><h2>${workout.title}</h2></div>
        <span class="badge green">${workout.sessionLength} min</span>
      </div>
      <div class="chips"><span>${workout.trainingLevel || "Intermediate"}</span><span>${workout.items?.length || 0} exercises</span><span>${workout.items?.map((item) => item.equipment).filter(Boolean).join(", ") || "Mixed equipment"}</span></div>
      <div class="workout-items">${workout.items.map((item) => `<button class="workout-item-button" data-exercise-detail="${item.exerciseId}" data-workout-context="${workout.id}"><strong>${item.name}</strong><span>${item.sessionPart}</span><small>${formatDose(item)}${item.replacementReason ? ` / ${item.replacementReason}` : ""}</small></button>`).join("")}</div>
      <div class="actions"><button class="primary" data-workout-detail="${workout.id}">View Full Workout</button></div>
    </article>
  `;
}

function compactWorkout(title, workout) {
  return `<div class="mini-workout"><h4>${title}</h4>${workout ? workout.items.map((item) => `<p>${item.name} <small>${formatDose(item)}</small></p>`).join("") : "<p>Locked/no workout</p>"}</div>`;
}

function historyView() {
  return `<div class="card-list">${store.assessments.length ? store.assessments.map((a) => `<article class="card"><h3>${a.assessmentDate} / ${a.assessmentType}</h3><p>${a.summaryText}</p>${chipSection("Restrictions", a.restrictions)}</article>`).join("") : `<div class="empty">No assessments saved yet.</div>`}</div>`;
}

function infoCard(label, value) {
  return `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`;
}

function chipSection(title, items) {
  return `<h4>${title}</h4><div class="chips">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
}

function toggleChip(kind, value, active) {
  return `<button class="chip-toggle ${active ? "active" : ""}" data-${kind}="${value}">${value}</button>`;
}

function formatDose(item) {
  const parts = [];
  if (item.sets) parts.push(`${item.sets} sets`);
  if (item.reps) parts.push(`${item.reps} reps`);
  if (item.rounds) parts.push(`${item.rounds} rounds`);
  if (item.time) parts.push(formatDoseValue("Round time", item.time));
  if (item.rest) parts.push(`${formatDoseValue("Rest", item.rest)} rest`);
  return parts.join(" / ");
}

function formatDoseValue(label, value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (!["Round time", "Rest"].includes(label)) return text;
  if (/[a-z]/i.test(text)) return text;
  return `${text}s`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function equipmentRule(level) {
  if (level === "Minimal Equipment") return "bodyweight, chair, mobility, low-impact conditioning";
  if (level === "Basic Equipment") return "bodyweight, chair, bands, dumbbells if available";
  return "gym strength, machines, bags, ropes, cardio machines, advanced options";
}

function li(text) {
  return `<li>${text}</li>`;
}

function toggleArray(array, value) {
  const index = array.indexOf(value);
  if (index >= 0) array.splice(index, 1);
  else array.push(value);
  render();
}

function toggleArrayNoRender(array, value) {
  const index = array.indexOf(value);
  if (index >= 0) array.splice(index, 1);
  else array.push(value);
}

