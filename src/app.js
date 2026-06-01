import {
  adminAddExerciseToWorkoutTemplate,
  adminArchiveClient,
  adminArchiveExercise,
  adminArchivePlanOffering,
  adminArchiveWorkoutTemplate,
  adminAssignPackageToClient,
  adminAssignPlanOfferingToPackage,
  adminCreateAssessmentTemplate,
  adminCreateClient,
  adminCreateExercise,
  adminCreatePackage,
  adminCreatePlanOffering,
  adminCreateWorkoutTemplate,
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
  addProgressImageCoachNote,
  adminRemoveWorkoutTemplateItem,
  adminReorderWorkoutTemplateItems,
  adminResetUserPin,
  adminSetUserPin,
  adminSetLoginDisabled,
  adminUpdateClient,
  adminUpdateAssessmentTemplate,
  adminUpdateExercise,
  adminUpdatePlanOffering,
  adminUpdateWorkout,
  adminUpdateWorkoutTemplate,
  adminUpdateWorkoutTemplateItem,
  archiveProgressImage,
  authenticateUser,
  canUserAccessClient,
  approveMonthlyPlan,
  createReassessmentDraftIfNeeded,
  createInviteCode,
  deleteInviteCode,
  equipmentOptions,
  expireInviteCode,
  filterExercisesForAssessment,
  filterExerciseLibrary,
  getAdminAlerts,
  getChatMessages,
  getClientDashboard,
  getClientVisiblePlan,
  getCoachAlerts,
  getExerciseDetailForUser,
  ensureMonthlyPlanHasWorkouts,
  getProgressImagesForUser,
  getWorkoutDetailForUser,
  markNotificationsRead,
  removeProfileImage,
  movementTests,
  resolveCoachAlert,
  resendInviteCode,
  safetyQuestions,
  saveAssessment,
  sendChatMessage,
  signUpWithInvite,
  saveDailyCheckIn,
  saveWeeklyCheckIn,
  searchExerciseLibrary,
  uploadProfileImage,
  uploadProgressImage,
  scoreColor,
  scoreGuide,
  unreadNotificationCount,
  visibleClientsForUser,
  summarizeAssessment
} from "./logic.js";
import { blankAssessment, createStore } from "./data.js";

const store = createStore();
const today = "2026-05-29";
const state = {
  currentUser: null,
  loginRole: "Client",
  loginIdentifier: "",
  loginPin: "",
  signupOpen: false,
  signupError: "",
  signupSuccess: "",
  signup: {
    fullName: "",
    email: "",
    phone: "",
    accountType: "Client",
    inviteCode: "",
    pin: "",
    confirmPin: ""
  },
  inviteDraft: {
    roleAllowed: "CLIENT",
    email: "",
    phone: "",
    clientId: "client_ada",
    coachId: "coach_1"
  },
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
      emergencyContact: "",
      clientInviteCode: ""
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
  planDraftNotice: "",
  clientId: "client_ada",
  selectedWorkoutId: null,
  selectedExerciseId: null,
  selectedAssessmentTemplateId: "assessment_template_default",
  editModal: null,
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

const app = document.querySelector("#app");
render();

function render() {
  if (!state.currentUser) {
    app.innerHTML = loginPage();
    bindLogin();
    return;
  }
  const visibleClients = visibleClientsForUser(store, state.currentUser);
  if (!canUserAccessClient(store, state.currentUser, state.clientId)) {
    state.clientId = visibleClients[0]?.id || state.clientId;
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
      ${state.currentUser.role !== "Client" ? `
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
  `;
  bindGlobal();
}

function route() {
  if (state.view === "chat") return chatPage();
  if (state.view === "profile") return profilePage();
  if (state.view === "assessment") return assessmentPage();
  if (state.view === "weekly") return weeklyPage();
  if (state.view === "plan") return monthlyPlanPage();
  if (state.view === "library") return exerciseLibraryPage();
  if (state.view === "client") return clientDashboard();
  if (state.view === "workoutDetail") return workoutDetailPage();
  if (state.view === "exerciseDetail") return exerciseDetailPage();
  if (state.view === "alerts") return coachAlertsView();
  if (state.view === "admin") return adminView();
  return homeDashboard();
}

function tabButton(id, label) {
  const badge = id === "chat" && unreadNotificationCount(store, state.currentUser.id) ? `<span class="nav-badge">${unreadNotificationCount(store, state.currentUser.id)}</span>` : "";
  return `<button class="tab ${state.view === id ? "active" : ""}" data-view="${id}">${label}${badge}</button>`;
}

function navTabs() {
  const shared = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "plan", label: "Monthly Plan" },
    { id: "chat", label: "Chat" }
  ];
  if (state.currentUser.role === "Client") return [...shared, { id: "weekly", label: "Weekly Check-In" }, { id: "client", label: "Client View" }];
  if (state.currentUser.role === "Coach") {
    return [
      ...shared,
      { id: "assessment", label: "Assessment" },
      { id: "library", label: "Exercise Library" },
      { id: "alerts", label: "Coach Alerts" }
    ];
  }
  return [
    ...shared,
    { id: "assessment", label: "Assessment" },
    { id: "library", label: "Exercise Library" },
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
          <h1>${state.signupOpen ? "Create Login" : "Log in with your numeric PIN"}</h1>
          <p class="muted">${state.signupOpen ? "Client logins must match an existing profile or invite. Coach accounts require an invite code from Admin." : "Demo PINs: Coach 2222, Client Ada 1111, Client Marcus 3333, Admin 9999."}</p>
        </div>
        ${state.signupOpen ? signupForm() : `
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
            <button class="success" id="openSignupButton">Create Login / Sign Up</button>
          </div>
          <p class="login-error" id="loginError"></p>
        `}
      </section>
    </main>
  `;
}

function signupForm() {
  return `
    <div class="signup-choice">
      <button class="${state.signup.accountType === "Client" ? "active" : ""}" data-signup-type="Client">Create Client Login</button>
      <button class="${state.signup.accountType === "Coach" ? "active" : ""}" data-signup-type="Coach">Create Coach Login with Invite Code</button>
    </div>
    <p class="muted">${state.signup.accountType === "Coach" ? "Coach accounts require an invite code from Admin." : "Client accounts must match an existing client profile or invite from your coach."}</p>
    <label>Full name <input data-signup-field="fullName" value="${state.signup.fullName}" /></label>
    <label>Email <input data-signup-field="email" value="${state.signup.email}" /></label>
    <label>Phone number <input data-signup-field="phone" value="${state.signup.phone}" /></label>
    <label>Invite code / access code <input data-signup-field="inviteCode" value="${state.signup.inviteCode}" /></label>
    <label>Create numeric PIN <input data-signup-field="pin" inputmode="numeric" type="password" value="${state.signup.pin}" placeholder="4 digits" /></label>
    <label>Confirm numeric PIN <input data-signup-field="confirmPin" inputmode="numeric" type="password" value="${state.signup.confirmPin}" /></label>
    <button class="primary full" id="createLoginButton">Create Login</button>
    <button class="ghost full" id="backToLoginButton">Back to Login</button>
    <p class="login-error">${state.signupError}</p>
    <p class="login-success">${state.signupSuccess}</p>
  `;
}

function homeDashboard() {
  const client = selectedClient();
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
        ${smartDecisionPanel(client, latestAssessment, lastCheckIn)}
        ${todayPreviewPanel(client)}
        ${quickLinksPanel()}
      </div>
    </section>
  `;
}

function profilePage() {
  const client = selectedClient();
  const profileUser = userForProfile(client);
  const progressImages = getProgressImagesForUser(store, state.currentUser, client.id);
  return `
    <section class="workspace">
      <div class="section-head">
        <div><p class="eyebrow">Client Profile</p><h2>${client.name}</h2></div>
        <span class="badge green">${client.packageType}</span>
      </div>
      ${profileImagePanel(profileUser, client)}
      <div class="grid-3 stat-strip">
        ${infoCard("Age", client.age)}
        ${infoCard("Goal", client.goal)}
        ${infoCard("Sport focus", client.sportFocus)}
        ${infoCard("Training days", `${client.trainingDaysPerWeek} per week`)}
        ${infoCard("Session length", `${client.sessionLength} min`)}
        ${infoCard("Start date", client.startDate)}
      </div>
      <div class="split">
        <article class="card"><h3>Injury notes</h3><p>${client.injuryNotes}</p></article>
        <article class="card"><h3>Equipment available</h3>${chipSection("Available", client.equipmentAvailable)}</article>
        <article class="card"><h3>Progress notes</h3><p>${client.progressNotes}</p></article>
      </div>
      ${progressImagePanel(client, progressImages)}
    </section>
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
  if (plan) ensureMonthlyPlanHasWorkouts(store, plan.id, latestAssessment);
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
            <article class="card library-card ${allowed ? "" : "muted-card"}">
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
      <div class="dashboard-actions">
        <button class="primary" id="openDaily">Check In Before Workout</button>
        ${workout ? `<button class="primary" data-workout-detail="${workout.id}">View Full Workout</button>` : ""}
        <button class="ghost" data-view="plan">View Full Monthly Plan</button>
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
      <div class="chips">
        <span>${formatDose(item)}</span>
        <span>${Array.isArray(item.equipment) ? item.equipment.join(", ") : item.equipment || "Bodyweight"}</span>
        <span>${detail.trainingLevel || "Intermediate"}</span>
      </div>
      <p>${detail.purpose || "Coach-selected exercise for today's workout."}</p>
      <div class="actions">
        ${item.hasVideo ? `<a class="button-link" href="${detail.videoUrl}" target="_blank" rel="noopener">Watch Video</a>` : ""}
        <button class="primary" data-exercise-detail="${item.exerciseId}" data-workout-context="${state.selectedWorkoutId}">View Details</button>
        ${canEdit ? `<button class="ghost">Replace</button><button class="ghost">Edit Dose</button><button class="ghost">Add Coach Note</button>` : ""}
      </div>
    </article>
  `;
}

function exerciseDetailPage() {
  const client = selectedClient();
  const detail = getExerciseDetailForUser(store, state.currentUser, state.selectedExerciseId, { clientId: client.id, workoutId: state.selectedWorkoutId, date: today });
  if (!detail) {
    return `<section class="workspace"><div class="empty">This exercise detail is not available for this account.</div><button class="ghost" data-view="workoutDetail">Back</button></section>`;
  }
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
          <h3>Dose</h3>
          <dl>
            <div><dt>Sets</dt><dd>${detail.sets ?? "Coach set"}</dd></div>
            <div><dt>Reps</dt><dd>${detail.reps ?? "Coach set"}</dd></div>
            <div><dt>Time</dt><dd>${detail.time ?? "Coach set"}</dd></div>
            <div><dt>Rest</dt><dd>${detail.rest ?? "Coach set"}</dd></div>
            <div><dt>Rounds</dt><dd>${detail.rounds ?? "Coach set"}</dd></div>
          </dl>
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
          ${detail.canAdjustInWorkout ? `<div class="actions vertical"><button>Replace Exercise</button><button>Edit Sets/Reps/Time/Rest</button><button>Add Coach Note</button><button>Approve Adjusted Workout</button></div>` : ""}
        </aside>
      </div>
    </section>
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
  const client = selectedClient();
  const messages = getChatMessages(store, state.currentUser, client.id);
  const partner = chatPartnerFor(client);
  return `
    <section class="workspace">
      <div class="section-head">
        <div>
          <p class="eyebrow">Secure Coach / Client Chat</p>
          <h2>${client.name}</h2>
          <p class="muted">Messages create notifications for the receiver. Admins can audit and intervene when needed.</p>
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

function chatPartnerFor(client) {
  if (state.currentUser.role === "Client") return store.users.find((user) => user.role === "Coach" && user.linkedId === client.coachId);
  if (state.currentUser.role === "Coach") return store.users.find((user) => user.role === "Client" && user.linkedId === client.id);
  return store.users.find((user) => user.role === "Coach" && user.linkedId === client.coachId);
}

function alertCard(alert) {
  const client = store.clients.find((item) => item.id === alert.clientId);
  const daily = store.dailyCheckIns.find((item) => item.id === alert.dailyCheckInId);
  const pain = alert.painSummary;
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
        <div><h4>Check-in answers</h4><p>Energy ${daily.energyScore}, pain ${daily.painScore}, soreness ${daily.sorenessScore}, sleep ${daily.sleepScore}, stress ${daily.stressScore}, readiness ${daily.readinessScore}</p></div>
        <div><h4>Pain details</h4><p>${pain ? `Location: ${pain.locations.join(", ") || "Not selected"}. Type: ${pain.types.join(", ") || "Not selected"}. Level: ${pain.level}/10.${pain.worseWithMovement ? " Worse with movement." : ""}` : "No pain reported."}</p></div>
        <div><h4>App recommendation</h4><p>${alert.appRecommendation}</p></div>
        <div><h4>Suggested adjustment</h4><p>${alert.suggestedAdjustmentType}</p></div>
      </div>
      <div class="workout-compare">
        ${compactWorkout("Original workout", alert.originalWorkoutSnapshot)}
        ${compactWorkout("Suggested workout", alert.suggestedWorkoutSnapshot)}
      </div>
      <div class="actions">
        ${["Approved Suggested Change", "Edited Suggested Change", "Kept Original Workout", "Replaced Workout", "Coach Review Needed", "No Workout Today"].map((decision) => `<button data-alert-decision="${alert.id}:${decision}">${decision}</button>`).join("")}
        <button class="ghost">Message Client</button>
      </div>
    </article>
  `;
}

function adminView() {
  const alerts = getAdminAlerts(store);
  const d = state.adminDrafts;
  const creationActions = [
    { label: "Add Client", panel: "clients" },
    { label: "Add Coach", panel: "invites" },
    { label: "Add Exercise", panel: "exercises" },
    { label: "Add Workout", panel: "workouts" },
    { label: "Add Plan Offering", panel: "offerings" },
    { label: "Add Package", panel: "packages" },
    { label: "Add Assessment Template", panel: "assessmentTemplates" },
    { label: "PINs / Security", panel: "security" }
  ];
  return `
    <section class="workspace">
      <div class="section-head"><div><p class="eyebrow">Admin Control Center</p><h2>Create and manage the whole coaching system</h2><p class="muted">Build exercises, workouts, templates, offerings, packages, clients, invites, passwords, alerts, and chats from one place.</p></div></div>
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
      <div class="split">
        <article class="card admin-card ${adminPanelClass("clients")}" id="admin-clients-new">
          <h3>Add Client</h3>
          <div class="form-grid">
            ${adminInput("client", "firstName", "First name")}
            ${adminInput("client", "lastName", "Last name")}
            ${adminInput("client", "email", "Email")}
            ${adminInput("client", "phone", "Phone number")}
            ${adminInput("client", "goal", "Goal")}
            ${adminSelect("client", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"])}
            ${adminInput("client", "trainingDaysPerWeek", "Training days per week", "number")}
            ${adminSelect("client", "sessionLength", "Session length", [30, 45, 60])}
            ${adminInput("client", "package", "Package")}
            ${adminSelect("client", "assignedCoach", "Assigned coach", store.coaches.map((coach) => ({ value: coach.id, label: coach.name })))}
            ${adminInput("client", "startDate", "Start date", "date")}
            ${adminSelect("client", "status", "Status", ["Active", "Inactive", "Suspended", "Archived"])}
            ${adminInput("client", "emergencyContact", "Emergency contact")}
            ${adminInput("client", "clientInviteCode", "Client invite code")}
          </div>
          <label>Notes <textarea data-admin-draft="client:notes">${d.client.notes}</textarea></label>
          <label>Injury / restriction notes <textarea data-admin-draft="client:injuryRestrictionNotes">${d.client.injuryRestrictionNotes}</textarea></label>
          <button class="primary full" id="adminCreateClient">Add New Client</button>
          <div class="admin-list">${store.clients.map((client) => `<div class="admin-row"><span>${client.name} / ${client.status || "Active"} / ${client.packageType || "No package"}</span><input data-client-name="${client.id}" value="${client.name}" /><button data-save-client="${client.id}">Edit</button><button data-archive-client="${client.id}">Archive</button><button data-delete-client="${client.id}">Delete</button><button data-client-invite="${client.id}">Invite</button><button data-reset-client-pin="${client.id}">Reset PIN</button></div>`).join("")}</div>
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
          <div class="admin-list">${store.exercises.slice(-8).map((exercise) => `<div class="admin-row"><span>${exercise.exerciseName || exercise.name} / ${exercise.trainingLevel || exercise.planLevel}${exercise.recoveryAlternative ? " / Recovery alt" : ""}</span><button data-open-exercise-editor="${exercise.id}">Edit</button><button data-archive-exercise="${exercise.id}">Archive</button><button data-delete-exercise="${exercise.id}">Delete</button></div>`).join("")}</div>
        </article>
        <article class="card admin-card ${adminPanelClass("workouts")}" id="admin-workouts-new">
          <h3>Add Workout Template</h3>
          <div class="form-grid">
            ${adminInput("workout", "workoutName", "Workout name")}
            ${adminSelect("workout", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "Strength", "General Fitness"])}
            ${adminInput("workout", "goal", "Goal")}
            ${adminSelect("workout", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"])}
            ${adminSelect("workout", "difficulty", "Difficulty", ["Easy", "Medium", "Hard"])}
            ${adminSelect("workout", "sessionLength", "Session length", [30, 45, 60])}
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
            ${adminSelect("planOffering", "sessionLength", "Session length", [30, 45, 60])}
            ${adminInput("planOffering", "price", "Price", "number")}
            ${adminInput("planOffering", "sessionsIncluded", "Sessions included", "number")}
            ${adminInput("planOffering", "packageType", "Package type")}
          </div>
          <button class="primary full" id="adminCreatePlanOffering">Add New Plan Offering</button>
          <div class="admin-list">${store.planOfferings.map((offering) => `<div class="admin-row"><span>${offering.planName} / ${offering.trainingLevel || offering.planLevel} / $${offering.price}</span><input data-offering-name="${offering.id}" value="${offering.planName}" /><button data-save-offering="${offering.id}">Edit</button><button data-archive-offering="${offering.id}">Archive</button><button data-delete-offering="${offering.id}">Delete</button></div>`).join("")}</div>
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
          <button class="success full" id="adminAssignPackage">Assign Selected Package To Selected Client</button>
          <div class="admin-list">${store.packages.map((pkg) => `<div class="admin-row"><span>${pkg.packageName} / ${store.planOfferings.find((offering) => offering.id === pkg.planOfferingId)?.planName || "No offering"}</span><button data-package-offering="${pkg.id}">Connect Offering</button><button data-delete-package="${pkg.id}">Delete</button></div>`).join("")}</div>
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
          <div class="admin-list">${store.assessmentTemplates.map((template) => `<div class="admin-row"><span>${template.templateName} / ${template.sportFocus || "Any sport"} / ${template.movementTestIds?.length || 0} tests</span><input data-assessment-template-name="${template.id}" value="${template.templateName}" /><button data-save-assessment-template="${template.id}">Edit</button><button data-delete-assessment-template="${template.id}">Delete</button></div>`).join("")}</div>
        </article>
        <article class="card ${adminPanelClass("security")}">
          <h3>User Passwords</h3>
          ${store.users.map((user) => `<div class="admin-row"><span>${user.name} / ${user.role}${user.forcePinChange ? " / must change PIN" : ""}${user.disabled ? " / disabled" : ""}</span><input data-pin-user="${user.id}" inputmode="numeric" placeholder="New numeric PIN" /><button data-save-pin="${user.id}">Set PIN</button><button data-temp-pin="${user.id}">Temp PIN</button><button data-toggle-login="${user.id}">${user.disabled ? "Reactivate" : "Disable"}</button></div>`).join("")}
          <h3>Coaches</h3>
          ${store.coaches.filter((coach) => coach.role !== "Admin").map((coach) => `<div class="admin-row"><span>${coach.name}</span><button data-delete-coach="${coach.id}">Delete Coach</button></div>`).join("")}
        </article>
        <article class="card ${adminPanelClass("invites")}">
          <h3>Invite Codes</h3>
          <label>Invite type <select id="inviteRole"><option value="CLIENT">Client</option><option value="COACH">Coach</option></select></label>
          <label>Email <input id="inviteEmail" placeholder="invite@email.com" /></label>
          <label>Phone <input id="invitePhone" placeholder="55512347" /></label>
          <button class="primary full" id="createInviteButton">Create Invite</button>
          ${store.inviteCodes.map((invite) => `<div class="admin-row"><span>${invite.code} / ${invite.roleAllowed} / ${invite.used ? "Used" : "Unused"}</span><button data-resend-invite="${invite.id}">Resend</button><button data-expire-invite="${invite.id}">Expire</button><button data-delete-invite="${invite.id}">Delete</button></div>`).join("")}
        </article>
        <article class="card ${adminPanelClass("clients")}"><h3>Current Client Details</h3>${adminClientDetail(selectedClient())}</article>
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
  if (!state.editModal || state.currentUser?.role !== "Admin") return "";
  if (state.editModal.type === "exercise") return exerciseEditModal(state.editModal.id);
  if (state.editModal.type === "workout") return workoutEditModal(state.editModal.id);
  return "";
}

function exerciseEditModal(exerciseId) {
  const exercise = store.exercises.find((item) => item.id === exerciseId);
  if (!exercise) return "";
  return `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <section class="modal-card large-modal">
        <div class="modal-head">
          <div><p class="eyebrow">Edit Exercise</p><h2>${escapeHtml(exercise.exerciseName || exercise.name)}</h2></div>
          <button class="ghost" id="closeEditModal">Close</button>
        </div>
        <div class="form-grid">
          ${editInput("exercise", "exerciseName", "Exercise name", exercise.exerciseName || exercise.name)}
          ${editInput("exercise", "description", "Description", exercise.description)}
          ${editSelect("exercise", "category", "Category", ["Strength", "Cardio", "Boxing", "Kickboxing", "Mobility", "Core", "Recovery"], exercise.category)}
          ${editSelect("exercise", "sportFocus", "Sport focus", ["Boxing", "Kickboxing", "BJJ", "Fight Conditioning", "General Fitness"], exercise.sportFocus)}
          ${editInput("exercise", "goal", "Goal", exercise.goal)}
          ${editSelect("exercise", "difficulty", "Difficulty", ["Easy", "Medium", "Hard"], exercise.difficulty)}
          ${editSelect("exercise", "trainingLevel", "Training level", ["Beginner", "Intermediate", "Advanced", "Pro"], exercise.trainingLevel || exercise.planLevel)}
          ${editSelect("exercise", "sessionPart", "Session part", ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery"], exercise.sessionPart)}
          ${editInput("exercise", "equipment", "Equipment needed", listValue(exercise.equipment))}
          ${editInput("exercise", "bodyArea", "Body area", listValue(exercise.bodyArea))}
          ${editInput("exercise", "stressArea", "Stress area", listValue(exercise.stressArea))}
          ${editInput("exercise", "sets", "Sets", exercise.sets, "number")}
          ${editInput("exercise", "reps", "Reps", exercise.reps, "number")}
          ${editInput("exercise", "time", "Time", exercise.time)}
          ${editInput("exercise", "rest", "Rest", exercise.rest)}
          ${editInput("exercise", "rounds", "Rounds", exercise.rounds, "number")}
          ${editInput("exercise", "videoUrl", "Video URL", exercise.videoUrl || exercise.youtubeUrl)}
          ${editInput("exercise", "regressionExerciseId", "Easier version ID", exercise.regressionExerciseId)}
          ${editInput("exercise", "progressionExerciseId", "Harder version ID", exercise.progressionExerciseId)}
          ${editInput("exercise", "safeAlternativeExerciseId", "Safe alternative ID", exercise.safeAlternativeExerciseId)}
          ${editInput("exercise", "replacementCategory", "Replacement category", exercise.replacementCategory)}
        </div>
        <div class="check-grid">
          <label><input class="inline-check" id="editExerciseLowImpact" type="checkbox" ${exercise.lowImpact ? "checked" : ""} /> Low impact</label>
          <label><input class="inline-check" id="editExerciseRecoveryAlternative" type="checkbox" ${exercise.recoveryAlternative ? "checked" : ""} /> Recovery alternative</label>
          <label><input class="inline-check" id="editExerciseActive" type="checkbox" ${exercise.active !== false ? "checked" : ""} /> Active</label>
        </div>
        <label>Setup instructions <textarea data-edit-exercise-field="setupInstructions">${escapeHtml(exercise.setupInstructions || "")}</textarea></label>
        <label>How to perform <textarea data-edit-exercise-field="howToPerform">${escapeHtml(exercise.howToPerform || exercise.instructions || "")}</textarea></label>
        <label>Coaching cues <textarea data-edit-exercise-field="coachingCues">${escapeHtml(listValue(exercise.coachingCues))}</textarea></label>
        <label>Common mistakes <textarea data-edit-exercise-field="commonMistakes">${escapeHtml(listValue(exercise.commonMistakes))}</textarea></label>
        <label>Safety / pain warnings <textarea data-edit-exercise-field="safetyWarnings">${escapeHtml(listValue(exercise.safetyWarnings || exercise.painWarnings))}</textarea></label>
        <label>Contraindications <textarea data-edit-exercise-field="contraindications">${escapeHtml(listValue(exercise.contraindications))}</textarea></label>
        <div class="modal-actions">
          <button class="ghost" id="closeEditModalSecondary">Cancel</button>
          <button class="primary" id="saveExerciseModal" data-exercise-id="${exercise.id}">Save Exercise</button>
        </div>
      </section>
    </div>
  `;
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
          ${editSelect("workout", "sessionLength", "Session length", [30, 45, 60], workout.sessionLength)}
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
      <p><strong>Notes:</strong> ${client.notes || client.progressNotes || "No notes yet."}</p>
    </div>
  `;
}

function bindLogin() {
  document.querySelector("#loginRole")?.addEventListener("change", (event) => {
    state.loginRole = event.target.value;
  });
  document.querySelector("#loginIdentifier")?.addEventListener("input", (event) => {
    state.loginIdentifier = event.target.value;
  });
  document.querySelector("#loginPin")?.addEventListener("input", (event) => {
    state.loginPin = event.target.value.replace(/\D/g, "");
    event.target.value = state.loginPin;
  });
  document.querySelector("#loginButton")?.addEventListener("click", () => {
    const user = authenticateUser(store, state.loginRole, state.loginPin);
    if (!user) {
      document.querySelector("#loginError").textContent = "That account type and numeric PIN did not match an active account.";
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
    document.querySelector("#loginError").textContent = "PIN reset needs email or SMS setup. Contact your coach or admin for now.";
  });
  document.querySelector("#openSignupButton")?.addEventListener("click", () => {
    state.signupOpen = true;
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
  document.querySelector("#createLoginButton")?.addEventListener("click", () => {
    try {
      const user = signUpWithInvite(store, state.signup);
      state.currentUser = user;
      state.signupOpen = false;
      state.signupSuccess = "";
      const firstClient = visibleClientsForUser(store, user)[0];
      if (firstClient) changeSelectedClient(firstClient.id, false);
      state.view = user.role === "Client" ? "client" : "home";
      render();
    } catch (error) {
      state.signupError = error.message;
      render();
    }
  });
}

function bindGlobal() {
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    state.view = button.dataset.view;
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
    state.planDraftNotice = `${plan.month} ${plan.trainingLevel} plan approved. The client can now open Monthly Plan and see the full month of workouts.`;
    render();
  }));
  document.querySelectorAll("[data-add-suggested-exercise]").forEach((button) => button.addEventListener("click", () => {
    addSuggestedExerciseToWorkout(button.dataset.addSuggestedExercise);
    state.planDraftNotice = "Suggested exercise added. Coach can keep editing before approval.";
    render();
  }));
  document.querySelectorAll("[data-replace-suggested-workout]").forEach((button) => button.addEventListener("click", () => {
    replaceSuggestedWorkout(button.dataset.replaceSuggestedWorkout);
    state.planDraftNotice = "Workout replaced with a fresh suggestion from the exercise library.";
    render();
  }));
  document.querySelector("#globalClientSelect")?.addEventListener("change", (event) => {
    changeSelectedClient(event.target.value);
  });
  document.querySelector("#logoutButton")?.addEventListener("click", () => {
    state.currentUser = null;
    state.view = "home";
    render();
  });
  document.querySelector("#clientSelect")?.addEventListener("change", (event) => {
    changeSelectedClient(event.target.value);
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
    const workoutSnapshot = decision === "Edited Suggested Change" || decision === "Replaced Workout"
      ? { ...alert.suggestedWorkoutSnapshot, title: decision === "Replaced Workout" ? "Coach replacement recovery session" : `${alert.suggestedWorkoutSnapshot.title} (Coach edited)` }
      : undefined;
    resolveCoachAlert(store, alertId, decision, { workoutSnapshot, coachNotes: "Coach reviewed in dashboard." });
    render();
  }));
  document.querySelector("#chatDraft")?.addEventListener("input", (event) => {
    state.chatDraft = event.target.value;
  });
  document.querySelector("#sendChatButton")?.addEventListener("click", () => {
    const partner = chatPartnerFor(selectedClient());
    if (!partner) return;
    sendChatMessage(store, {
      fromUserId: state.currentUser.id,
      toUserId: partner.id,
      clientId: state.clientId,
      body: state.chatDraft
    });
    state.chatDraft = "";
    render();
  });
  document.querySelector("#markReadButton")?.addEventListener("click", () => {
    markNotificationsRead(store, state.currentUser.id, state.clientId);
    render();
  });
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
  document.querySelector("#uploadProfileImageButton")?.addEventListener("click", () => {
    const file = document.querySelector("#profileImageInput")?.files?.[0];
    const targetUser = userForProfile(selectedClient());
    if (!file || !targetUser) return window.alert("Choose an image first.");
    try {
      uploadProfileImage(store, state.currentUser, targetUser.id, file);
      render();
    } catch (error) {
      window.alert(error.message);
    }
  });
  document.querySelector("#removeProfileImageButton")?.addEventListener("click", () => {
    const targetUser = userForProfile(selectedClient());
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
  document.querySelectorAll("[data-admin-panel]").forEach((button) => button.addEventListener("click", () => {
    state.adminPanel = button.dataset.adminPanel;
    render();
  }));
  document.querySelectorAll("[data-open-exercise-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "exercise", id: button.dataset.openExerciseEditor };
    render();
  }));
  document.querySelectorAll("[data-open-workout-editor]").forEach((button) => button.addEventListener("click", () => {
    state.editModal = { type: "workout", id: button.dataset.openWorkoutEditor };
    render();
  }));
  document.querySelectorAll("#closeEditModal, #closeEditModalSecondary").forEach((button) => button.addEventListener("click", () => {
    state.editModal = null;
    render();
  }));
  document.querySelector("#saveExerciseModal")?.addEventListener("click", (event) => {
    const exerciseId = event.currentTarget.dataset.exerciseId;
    const patch = collectEditFields("exercise");
    patch.name = patch.exerciseName;
    patch.planLevel = patch.trainingLevel;
    patch.youtubeUrl = patch.videoUrl;
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
    state.editModal = null;
    render();
  });
  document.querySelector("#saveWorkoutModal")?.addEventListener("click", (event) => {
    const workoutId = event.currentTarget.dataset.workoutId;
    const patch = collectEditFields("workout");
    patch.planLevel = patch.trainingLevel;
    adminUpdateWorkoutTemplate(store, state.currentUser, workoutId, patch);
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
  document.querySelectorAll("[data-save-client]").forEach((button) => button.addEventListener("click", () => {
    const name = document.querySelector(`[data-client-name="${button.dataset.saveClient}"]`).value;
    adminUpdateClient(store, state.currentUser, button.dataset.saveClient, { name, fullName: name });
    render();
  }));
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
  document.querySelectorAll("[data-client-invite]").forEach((button) => button.addEventListener("click", () => {
    const client = store.clients.find((item) => item.id === button.dataset.clientInvite);
    createInviteCode(store, state.currentUser, { roleAllowed: "CLIENT", email: client.email, phone: client.phone, clientId: client.id });
    render();
  }));
  document.querySelectorAll("[data-reset-client-pin]").forEach((button) => button.addEventListener("click", () => {
    const user = store.users.find((item) => item.linkedId === button.dataset.resetClientPin);
    if (user) window.alert(`Temporary PIN for ${user.name}: ${adminResetUserPin(store, state.currentUser, user.id).temporaryPin}`);
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
  document.querySelectorAll("[data-save-offering]").forEach((button) => button.addEventListener("click", () => {
    const planName = document.querySelector(`[data-offering-name="${button.dataset.saveOffering}"]`).value;
    adminUpdatePlanOffering(store, state.currentUser, button.dataset.saveOffering, { planName });
    render();
  }));
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
    adminAssignPlanOfferingToPackage(store, state.currentUser, button.dataset.packageOffering, state.adminDrafts.package.planOfferingId);
    render();
  }));
  document.querySelectorAll("[data-delete-package]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this package?")) return;
    adminDeletePackage(store, state.currentUser, button.dataset.deletePackage);
    render();
  }));
  document.querySelector("#adminAssignPackage")?.addEventListener("click", () => {
    const pkg = store.packages.at(-1);
    if (pkg) adminAssignPackageToClient(store, state.currentUser, state.clientId, pkg.id);
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
  document.querySelectorAll("[data-template-test]").forEach((button) => button.addEventListener("click", () => {
    toggleArrayNoRender(state.adminDrafts.assessmentTemplate.movementTestIds, button.dataset.templateTest);
    render();
  }));
  document.querySelector("#adminCreateAssessmentTemplate")?.addEventListener("click", () => {
    adminCreateAssessmentTemplate(store, state.currentUser, state.adminDrafts.assessmentTemplate);
    render();
  });
  document.querySelectorAll("[data-save-assessment-template]").forEach((button) => button.addEventListener("click", () => {
    const templateName = document.querySelector(`[data-assessment-template-name="${button.dataset.saveAssessmentTemplate}"]`).value;
    adminUpdateAssessmentTemplate(store, state.currentUser, button.dataset.saveAssessmentTemplate, { templateName });
    render();
  }));
  document.querySelectorAll("[data-delete-assessment-template]").forEach((button) => button.addEventListener("click", () => {
    if (!window.confirm("Delete this assessment template?")) return;
    adminDeleteAssessmentTemplate(store, state.currentUser, button.dataset.deleteAssessmentTemplate);
    if (state.selectedAssessmentTemplateId === button.dataset.deleteAssessmentTemplate) state.selectedAssessmentTemplateId = store.assessmentTemplates[0]?.id || "";
    render();
  }));
  document.querySelector("#createInviteButton")?.addEventListener("click", () => {
    createInviteCode(store, state.currentUser, {
      roleAllowed: document.querySelector("#inviteRole").value,
      email: document.querySelector("#inviteEmail").value,
      phone: document.querySelector("#invitePhone").value,
      clientId: state.clientId,
      coachId: "coach_1"
    });
    render();
  });
  document.querySelectorAll("[data-resend-invite]").forEach((button) => button.addEventListener("click", () => {
    resendInviteCode(store, state.currentUser, button.dataset.resendInvite);
    render();
  }));
  document.querySelectorAll("[data-expire-invite]").forEach((button) => button.addEventListener("click", () => {
    expireInviteCode(store, state.currentUser, button.dataset.expireInvite);
    render();
  }));
  document.querySelectorAll("[data-delete-invite]").forEach((button) => button.addEventListener("click", () => {
    deleteInviteCode(store, state.currentUser, button.dataset.deleteInvite);
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
    adminInterveneInChat(store, state.currentUser, state.clientId, body);
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

function quickLinksPanel() {
  const isClient = state.currentUser.role === "Client";
  const actions = isClient
    ? [
        ["profile", "My Profile"],
        ["weekly", "Weekly Check-In"],
        ["plan", "Monthly Plan"],
        ["client", "Today"],
        ["chat", "Chat"]
      ]
    : [
        ["profile", "Profile"],
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
        ${actions.map(([view, label]) => `<button data-view="${view}">${label}</button>`).join("")}
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
  if (item.time) parts.push(`${item.time}s`);
  if (item.rest) parts.push(`${item.rest}s rest`);
  return parts.join(" / ");
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

