export const scoreGuide = [
  { score: 0, label: "Cannot perform", meaning: "Cannot safely perform the movement.", coachUse: "Do not use this movement yet. Use adaptive, chair, pool, or refer out if needed." },
  { score: 1, label: "Major difficulty", meaning: "Major difficulty, pain, poor control, or heavy support needed.", coachUse: "Start below beginner with supported movements." },
  { score: 2, label: "Safe but limited", meaning: "Safe with limited range, control, strength, or endurance.", coachUse: "Use beginner plan with modifications." },
  { score: 3, label: "Solid baseline", meaning: "Acceptable control with no major pain.", coachUse: "Standard beginner or intermediate work." },
  { score: 4, label: "Good control", meaning: "Moves well and can handle progressive overload.", coachUse: "Progress carefully." },
  { score: 5, label: "Excellent", meaning: "Strong control, balance, mobility, and work capacity.", coachUse: "Advanced or sport progression allowed." }
];

export const safetyQuestions = [
  { id: "cardioSymptoms", text: "Chest pain, dizziness, fainting, or breathing issue during activity?", severity: "High Risk", permission: "Stop / Refer Out", action: "Do not continue full assessment. Recommend medical clearance.", restriction: "Safety concern" },
  { id: "recentMedical", text: "Recent surgery, major injury, or medical restriction?", severity: "Caution", permission: "Modified Assessment Only", action: "Use only pain-free low-impact tests.", restriction: "Medical restriction" },
  { id: "dailyPain", text: "Pain with normal walking, sitting, standing, or daily tasks?", severity: "Caution", permission: "Modified Training", action: "Recovery plan, low-impact plan, and avoid painful movement patterns.", restriction: "Pain high" },
  { id: "standingLimit", text: "Cannot stand longer than 5 minutes?", severity: "Caution", permission: "Seated / Supported Training", action: "Use chair, pool, or supported exercises.", restriction: "Low standing tolerance" },
  { id: "fallRisk", text: "Fall risk, severe balance issue, or needs assistance moving?", severity: "High Risk", permission: "Supported Training Only", action: "No jumping, no fast direction changes, no unsupervised balance drills.", restriction: "Fall risk" },
  { id: "jointLimit", text: "Current back, knee, shoulder, hip, ankle, or wrist limitation?", severity: "Caution", permission: "Train with Modifications", action: "Filter exercises that stress the limited joint.", restriction: "Joint limitation" }
];

export const movementTests = [
  {
    id: "squat",
    name: "Chair Sit-to-Stand / Squat Pattern",
    section: "Movement Capability",
    purpose: "Test lower-body strength, knee control, hip control, balance, and basic squat ability.",
    setup: "Use a stable chair or bench. Client sits tall with feet flat, hip to shoulder width apart. Arms can cross, reach forward, or lightly use support.",
    clientDoes: "Stand from the chair under control, reach full standing posture, then slowly sit back down for 3-5 reps.",
    lookFor: ["Feet stay flat", "Knees track with toes", "No collapse forward", "Controlled lowering", "No sharp knee, hip, or back pain", "No loss of balance"],
    redFlags: ["Hard knee cave", "Heels lift every rep", "Sharp knee, hip, or back pain", "Cannot stand without major help", "Falls back into chair", "Dizziness or severe breathlessness"],
    scoring: ["Cannot stand from chair safely", "Major difficulty or heavy support needed", "Can stand but limited control, depth, or balance", "Solid baseline with acceptable control", "Good smooth control", "Excellent control and ready for harder squat patterns"],
    ifLow: "Chair squats, supported sit-to-stand, glute bridges, step-ups, lower-body strength, and mobility.",
    tag: "Squat"
  },
  {
    id: "hinge",
    name: "Hip Hinge / Back-Safe Bend Pattern",
    section: "Movement Capability",
    purpose: "Test the ability to bend using the hips instead of rounding the low back.",
    setup: "Client stands tall with feet under hips, soft knees, hands on thighs. Cue: push hips back like closing a car door with the hips.",
    clientDoes: "Push hips back, keep spine controlled, reach hands toward thighs or shins, then return tall.",
    lookFor: ["Hips move back first", "Spine stays controlled", "Soft knees without squatting", "Hamstrings and glutes load", "Neutral neck", "No sharp back pain"],
    redFlags: ["Heavy low-back rounding", "Bends only from spine", "Back or hip pain", "Loses balance", "Cannot understand hinge pattern"],
    scoring: ["Cannot hinge safely", "Major difficulty or pain", "Safe but limited range or needs cues", "Solid baseline hinge", "Good controlled hinge", "Excellent hinge, ready for loaded progressions"],
    ifLow: "Wall hinge, dowel hinge, glute bridges, core bracing, hamstring mobility, and back-safe deadlift preparation.",
    tag: "Hinge"
  },
  {
    id: "lunge",
    name: "Step-Back Lunge / Supported Split Stance",
    section: "Movement Capability",
    purpose: "Test single-leg strength, knee control, hip stability, and balance.",
    setup: "Client stands near a wall, chair, or rail. Start with split stance or small step-back lunge.",
    clientDoes: "Step one foot back, lower only as far as pain-free, then return to standing with control.",
    lookFor: ["Front knee tracks with toes", "Tall torso", "Controlled balance", "No sharp knee, hip, or ankle pain", "Controlled return to start"],
    redFlags: ["Knee caves inward", "Sharp pain", "Unsafe wobbling", "Cannot return to standing", "Hip drops hard", "Afraid of falling"],
    scoring: ["Cannot lunge or split stance safely", "Major difficulty or pain", "Safe but shallow or supported", "Solid baseline", "Good control both sides", "Excellent control, ready for advanced single-leg work"],
    ifLow: "Supported split squats, shallow lunges, step-ups, hip stability, glute work, and balance.",
    tag: "Lunge"
  },
  {
    id: "push",
    name: "Push Ability: Wall / Incline / Floor Push-Up",
    section: "Strength Readiness",
    purpose: "Test upper-body pushing strength, shoulder control, core control, and wrist tolerance.",
    setup: "Start with wall push-up for recovery, incline for baseline, or floor for advanced.",
    clientDoes: "Perform 3-5 controlled push-ups at the safest level available.",
    lookFor: ["Body stays straight", "Elbows bend safely", "Shoulders stay controlled", "No wrist or shoulder pain", "Controls down and up", "Core does not sag"],
    redFlags: ["Shoulder pain", "Wrist pain", "Hips sag", "Elbows flare excessively", "Cannot control lowering", "Neck tension or shrugging"],
    scoring: ["Cannot push safely", "Major difficulty or pain", "Can push with wall/incline but limited", "Solid modified push-up ability", "Good controlled push-up", "Excellent control and ready for harder pushing"],
    ifLow: "Wall push-ups, incline push-ups, shoulder stability, core bracing, and pain-free range.",
    tag: "Push"
  },
  {
    id: "pull",
    name: "Pull Ability: Band Row / Cable Row / Table Row",
    section: "Strength Readiness",
    purpose: "Test upper-back strength, posture, shoulder blade control, and pulling ability.",
    setup: "Use a resistance band, cable, TRX/ring row, or safe table row depending on equipment.",
    clientDoes: "Pull elbows back while keeping chest lifted and shoulders down for 5-8 controlled reps.",
    lookFor: ["Shoulder blades move back", "Neck relaxed", "Elbows track back", "Tall posture", "No shoulder pain", "No low-back arching"],
    redFlags: ["Neck shrugging", "Shoulder pain", "Ribs flare", "Hard back arch", "Cannot feel upper back", "Jerky movement"],
    scoring: ["Cannot pull safely", "Major difficulty or pain", "Can pull with light resistance and cues", "Solid baseline row", "Good control and posture", "Excellent pulling strength/control"],
    ifLow: "Band rows, seated rows, scapular control, posture work, and light resistance.",
    tag: "Pull"
  },
  {
    id: "core",
    name: "Core Brace: Dead Bug / Modified Plank",
    section: "Strength Readiness",
    purpose: "Test trunk control, breathing under tension, and ability to stabilize the spine.",
    setup: "Use dead bug, knee plank, elevated plank, or standing brace.",
    clientDoes: "Brace, breathe, and hold position or perform slow controlled reps.",
    lookFor: ["Ribs stay down", "Braces without breath-holding", "Hips do not sag", "Low back does not arch excessively", "No sharp back pain", "Controlled breathing"],
    redFlags: ["Low-back pain", "Cannot brace without holding breath", "Hips sag immediately", "Shaking with pain", "Neck/shoulder tension", "Cannot maintain position"],
    scoring: ["Cannot brace safely", "Major difficulty or pain", "Safe but limited", "Solid baseline core control", "Good control with breathing", "Excellent brace and ready for harder core work"],
    ifLow: "Dead bugs, bird dogs, breathing with brace, modified planks, and anti-rotation work.",
    tag: "Core"
  },
  {
    id: "balance",
    name: "Single-Leg Balance / Supported Step-Up",
    section: "Movement Capability",
    purpose: "Test balance, ankle stability, hip control, knee tracking, and fall risk.",
    setup: "Client stands near support. Use feet together, staggered stance, single-leg stance, or low step-up.",
    clientDoes: "Balance for 10-20 seconds or perform controlled low step-ups.",
    lookFor: ["Foot and ankle control", "Knee stays aligned", "Hip stays level", "Can recover balance", "No dizziness", "No unsafe wobbling"],
    redFlags: ["Grabbing support suddenly", "Dizziness", "Fear of falling", "Knee caves", "Hip drops", "Cannot step down safely"],
    scoring: ["Cannot balance safely", "Major difficulty or unsafe wobble", "Can balance briefly with support", "Solid baseline balance", "Good control", "Excellent balance and ready for dynamic footwork"],
    ifLow: "Supported balance, step-ups, ankle control, hip stability, and no jumping or fast direction changes yet.",
    tag: "Balance"
  },
  {
    id: "conditioning",
    name: "March Test / 3-Minute Low-Impact Cardio",
    section: "Conditioning Readiness",
    purpose: "Test basic conditioning, breathing tolerance, and ability to recover.",
    setup: "Use marching, walking, step touches, shadowboxing, bike, or another low-impact option.",
    clientDoes: "Move at an easy to moderate pace for up to 3 minutes.",
    lookFor: ["Can keep moving", "Breathes normally", "Can talk in short sentences", "No chest pain", "No dizziness", "Recovers after stopping"],
    redFlags: ["Chest pain", "Dizziness", "Severe breathlessness", "Cannot recover", "Pain spikes", "Feels faint"],
    scoring: ["Cannot tolerate basic cardio safely", "Major difficulty", "Completes with breaks or very low pace", "Solid baseline conditioning", "Good work capacity", "Excellent conditioning and recovery"],
    ifLow: "Low-impact intervals, short rounds, longer rest, breathing control, and gradual conditioning.",
    tag: "Conditioning / Cardio"
  },
  {
    id: "shoulderMobility",
    name: "Shoulder Reach Overhead",
    section: "Mobility and Restrictions",
    purpose: "Test shoulder mobility, rib control, overhead tolerance, and upper-body range.",
    setup: "Client stands or sits tall with thumbs up if comfortable.",
    clientDoes: "Slowly raise both arms overhead without forcing range.",
    lookFor: ["Reach without pain", "No hard low-back arch", "No excessive shrugging", "Ribs controlled", "Side-to-side differences"],
    redFlags: ["Sharp shoulder pain", "Numbness or tingling", "Major shrugging", "Cannot lift arm above shoulder height", "Back arches to fake range"],
    scoring: ["Cannot reach safely", "Major pain or limitation", "Safe but limited", "Solid usable range", "Good overhead control", "Excellent shoulder mobility"],
    ifLow: "Wall slides, band pull-aparts, shoulder mobility, scapular control, and avoid painful overhead work.",
    tag: "Shoulder / Mobility"
  },
  {
    id: "hipMobility",
    name: "Hip Mobility: Seated Rotation / 90-90 Option",
    section: "Mobility and Restrictions",
    purpose: "Test hip range, rotation, and ability to move without pinching or compensation.",
    setup: "Use seated hip rotation or 90/90 if the client can get down and up safely.",
    clientDoes: "Rotate hips gently through pain-free range.",
    lookFor: ["Rotates without pinching", "Does not force range", "Low back does not overcompensate", "Compare both sides", "No sharp hip/knee pain"],
    redFlags: ["Hip pinching", "Knee pain", "Cannot sit safely", "Major side-to-side restriction", "Sharp pain"],
    scoring: ["Cannot perform safely", "Major limitation or pain", "Safe but limited", "Solid usable mobility", "Good control/range", "Excellent mobility"],
    ifLow: "Seated hip drills, glute activation, hip mobility, lower-body modifications, and low-impact work.",
    tag: "Hip / Mobility"
  },
  {
    id: "ankleMobility",
    name: "Ankle Mobility / Calf Raise Ability",
    section: "Mobility and Restrictions",
    purpose: "Test ankle range, calf strength, foot control, and step mechanics.",
    setup: "Client stands near support.",
    clientDoes: "Perform supported calf raises or a gentle knee-over-toe ankle range check.",
    lookFor: ["Can lift and lower heels", "Ankle does not collapse", "Good control", "Pain-free range", "Side-to-side difference"],
    redFlags: ["Ankle pain", "Foot collapses", "Cannot lift heel", "Unsafe balance", "Achilles/calf pain"],
    scoring: ["Cannot perform safely", "Major difficulty or pain", "Safe but limited", "Solid baseline", "Good control", "Excellent ankle/calf control"],
    ifLow: "Calf raises, ankle mobility, supported balance, step mechanics, and avoid high-impact jumping.",
    tag: "Ankle / Mobility"
  },
  {
    id: "pain",
    name: "Pain Level During Basic Movement",
    section: "Mobility and Restrictions",
    purpose: "Capture pain during easy movement.",
    setup: "Use the easiest safe movement: walking, marching, chair squat, shoulder reach, or supported movement.",
    clientDoes: "Report pain during and after movement on a 0-10 pain scale.",
    lookFor: ["Pain stays low", "Pain does not sharpen", "Pain does not radiate", "Pain does not increase"],
    redFlags: ["Sharp pain", "Radiating pain", "Numbness/tingling", "Pain 7 or higher", "Pain changes movement quality"],
    scoring: ["Severe pain / cannot move", "Major pain", "Pain present but manageable with modification", "Mild pain", "Very low pain", "No pain"],
    ifLow: "Recovery plan, pain-free range, easier alternatives, longer rest, and clearance if severe.",
    tag: "Pain / Restriction"
  },
  {
    id: "standing",
    name: "Standing Tolerance",
    section: "Mobility and Restrictions",
    purpose: "Check if the client can handle standing workouts or needs seated/supported training.",
    setup: "Client stands or lightly marches while coach watches posture, breathing, and fatigue.",
    clientDoes: "Stand or march for 1-5 minutes depending on ability.",
    lookFor: ["Can stand without excessive pain", "Maintains posture", "Can breathe", "No unsafe support", "No dizziness"],
    redFlags: ["Dizziness", "Leg weakness", "Pain spike", "Needs to sit immediately", "Unsafe fatigue"],
    scoring: ["Cannot stand safely", "Major difficulty", "Can stand briefly with limits", "Solid baseline standing tolerance", "Good tolerance", "Excellent tolerance"],
    ifLow: "Chair workouts, pool workouts, shorter standing blocks, seated strength, and low-impact movements.",
    tag: "Standing / Restriction"
  },
  {
    id: "breathing",
    name: "Breathing Tolerance During Light Movement",
    section: "Conditioning Readiness",
    purpose: "Check if the client can breathe and recover during easy training.",
    setup: "Use light marching, walking, shadowboxing, or step touches.",
    clientDoes: "Move lightly while coach checks breathing and recovery.",
    lookFor: ["Can talk in short sentences", "No chest pain", "No dizziness", "Recovers after stopping", "No panic or over-breathing"],
    redFlags: ["Chest pain", "Dizziness", "Faint feeling", "Severe breathlessness", "Cannot recover"],
    scoring: ["Unsafe breathing response", "Major difficulty", "Limited but trainable", "Solid baseline", "Good tolerance", "Excellent tolerance"],
    ifLow: "Low-impact conditioning, longer rest, shorter rounds, breathing drills, and refer out for red flags.",
    tag: "Breathing / Conditioning"
  },
  {
    id: "rom",
    name: "Range of Motion Limitation Check",
    section: "Mobility and Restrictions",
    purpose: "Identify joints or movement ranges that should change exercise selection.",
    setup: "Check comfortable movement of shoulders, hips, knees, ankles, spine, and wrists.",
    clientDoes: "Move each area gently through pain-free range.",
    lookFor: ["Major limitations", "Painful positions", "Side-to-side differences", "Restriction affecting exercise selection"],
    redFlags: ["Sharp pain", "Numbness/tingling", "Cannot move a joint", "Severe asymmetry", "Pain worsens with movement"],
    scoring: ["Major limitation blocks training", "Serious restriction", "Limited but modifiable", "Usable range", "Good range", "Excellent range"],
    ifLow: "Mobility work, safer alternatives, modified range, and avoid painful positions.",
    tag: "ROM / Mobility"
  }
];

export const equipmentOptions = [
  ["bodyweight", "Bodyweight / open floor space", "bodyweight"],
  ["chair", "Stable chair / bench", "chair"],
  ["bands", "Resistance bands", "bands"],
  ["dumbbells", "Dumbbells", "dumbbells"],
  ["kettlebell", "Kettlebell", "kettlebell"],
  ["barbell", "Barbell / rack", "barbell"],
  ["machines", "Gym machines / cable station", "machines"],
  ["cardioMachine", "Cardio machine", "cardio-machine"],
  ["pool", "Pool access", "pool"],
  ["jumpRope", "Jump rope / agility space", "jump-rope"],
  ["bag", "Boxing bag", "boxing-bag"],
  ["pads", "Pads / mitts", "pads"],
  ["pullup", "Pull-up bar", "pull-up"],
  ["medicineBall", "Medicine ball", "medicine-ball"],
  ["ropes", "Battle ropes", "battle-ropes"]
].map(([id, name, tag]) => ({ id, name, tag, credit: 1 }));

export const trainingLevels = ["Beginner", "Intermediate", "Advanced", "Pro"];
export const adjustmentModes = ["Normal", "Lower Intensity", "Recovery", "Mobility Only", "Coach Review Needed", "Optional Progression"];

export function scoreColor(score) {
  if (score <= 1) return "red";
  if (score <= 3) return "orange";
  return "green";
}

export function evaluateSafety(answers = {}) {
  const flagged = safetyQuestions.filter((q) => answers[q.id]?.answer === true);
  const high = flagged.find((q) => q.severity === "High Risk");
  if (high) {
    return {
      safetyGateResult: "High Risk",
      workoutPermission: high.permission,
      coachAction: high.action,
      flags: flagged,
      restrictions: flagged.map((f) => f.restriction)
    };
  }
  if (flagged.length) {
    return {
      safetyGateResult: "Caution",
      workoutPermission: flagged[0].permission,
      coachAction: flagged.map((f) => f.action).join(" "),
      flags: flagged,
      restrictions: flagged.map((f) => f.restriction)
    };
  }
  return {
    safetyGateResult: "Clear",
    workoutPermission: "Train",
    coachAction: "Proceed with assessment.",
    flags: [],
    restrictions: []
  };
}

export function summarizeAssessment(input) {
  const activeTests = input.movementTestIds?.length
    ? movementTests.filter((test) => input.movementTestIds.includes(test.id))
    : movementTests;
  const scores = activeTests.map((test) => Number(input.movementScores?.[test.id] ?? 0));
  const averageCapabilityScore = round1(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  const lowestCapabilityScore = Math.min(...scores);
  const painScore = Number(input.movementScores?.pain ?? 0);
  const safety = evaluateSafety(input.safetyAnswers);
  const equipmentScore = Math.min(5, Object.values(input.equipment || {}).filter(Boolean).length);
  const equipmentLevel = equipmentScore <= 1 ? "Minimal Equipment" : equipmentScore <= 3 ? "Basic Equipment" : "Full Equipment";
  const restrictions = buildRestrictions(input, safety, equipmentLevel);
  const majorSafety = safety.safetyGateResult === "High Risk";
  const riskLevel = majorSafety || painScore <= 1 || averageCapabilityScore < 2 ? "High" : averageCapabilityScore < 3.5 ? "Medium" : "Clear/Low";
  const recoveryRecommended = majorSafety || painScore <= 1 || averageCapabilityScore < 2;
  const recommendedTrainingLevel = recommendTrainingLevel(averageCapabilityScore, painScore, majorSafety);
  const trainingLevel = recommendedTrainingLevel;
  const planLevel = trainingLevel;
  const adjustmentMode = recoveryRecommended ? "Recovery" : "Normal";
  const suggestedStartLevel = recoveryRecommended ? `${trainingLevel} with Recovery recommended` : trainingLevel;
  const workoutPermission = chooseAssessmentPermission(safety, painScore, averageCapabilityScore);
  const focus = mainFocus(input.movementScores);
  const avoid = buildAvoidList(restrictions);
  const recommendedNextStep = recoveryRecommended ? `Generate ${trainingLevel} monthly plan with Recovery alternatives` : `Generate ${trainingLevel} monthly plan`;

  return {
    assessmentId: input.assessmentId || makeId("assessment"),
    clientId: input.clientId,
    assessmentDate: input.assessmentDate,
    assessmentType: input.assessmentType,
    safetyAnswers: input.safetyAnswers,
    movementScores: input.movementScores,
    movementTestIds: activeTests.map((test) => test.id),
    equipment: input.equipment,
    equipmentScore,
    equipmentLevel,
    averageCapabilityScore,
    lowestCapabilityScore,
    riskLevel,
    planLevel,
    trainingLevel,
    recommendedTrainingLevel,
    recoveryRecommended,
    adjustmentMode,
    suggestedStartLevel,
    workoutPermission,
    restrictions,
    coachAction: safety.coachAction,
    coachNotes: input.coachNotes || "",
    mainFocus: focus,
    avoid,
    recommendedNextStep,
    summaryText: `Client is cleared for ${workoutPermission.toLowerCase()}. Average score: ${averageCapabilityScore}. Lowest score: ${lowestCapabilityScore}. Risk level: ${riskLevel}. Training level: ${trainingLevel}. Adjustment mode: ${adjustmentMode}. Main focus: ${focus.join(", ")}. Avoid: ${avoid.join(", ")}. Recommended next step: ${recommendedNextStep}.`
  };
}

export function recommendTrainingLevel(averageCapabilityScore, painScore = 5, majorSafety = false) {
  if (majorSafety || painScore <= 1) return "Beginner";
  if (averageCapabilityScore < 3) return "Beginner";
  if (averageCapabilityScore < 3.7) return "Intermediate";
  if (averageCapabilityScore < 4.5) return "Advanced";
  return "Pro";
}

function chooseAssessmentPermission(safety, painScore, avg) {
  if (safety.safetyGateResult === "High Risk") return safety.workoutPermission === "Stop / Refer Out" ? "Stop / Refer Out" : "Train with Modifications";
  if (painScore <= 1 || avg < 2.5) return "Recovery Training";
  if (avg < 3.8 || safety.safetyGateResult === "Caution") return "Train with Modifications";
  return "Progress";
}

function buildRestrictions(input, safety, equipmentLevel) {
  const scores = input.movementScores || {};
  const restrictions = new Set(safety.restrictions);
  const safetyText = JSON.stringify(input.safetyAnswers || {}).toLowerCase();
  if (scores.squat <= 2 || scores.lunge <= 2 || safetyText.includes("knee")) restrictions.add("Knee limitation");
  if (scores.hinge <= 2 || scores.core <= 2 || safetyText.includes("back")) restrictions.add("Back limitation");
  if (scores.push <= 2 || scores.shoulderMobility <= 2 || safetyText.includes("shoulder")) restrictions.add("Shoulder limitation");
  if (scores.hipMobility <= 2 || safetyText.includes("hip")) restrictions.add("Hip limitation");
  if (scores.ankleMobility <= 2 || safetyText.includes("ankle")) restrictions.add("Ankle limitation");
  if (safetyText.includes("wrist")) restrictions.add("Wrist limitation");
  if (scores.balance <= 2) restrictions.add("Fall risk");
  if (scores.standing <= 2) restrictions.add("Low standing tolerance");
  if (scores.conditioning <= 2 || scores.breathing <= 2) restrictions.add("Low cardio tolerance");
  if (scores.pain <= 2) restrictions.add("Pain high");
  if (equipmentLevel === "Minimal Equipment") restrictions.add("Minimal equipment");
  return [...restrictions];
}

function mainFocus(scores = {}) {
  const map = {
    squat: "lower-body control",
    hinge: "back-safe hinge",
    lunge: "single-leg stability",
    push: "pain-free pushing",
    pull: "upper-back strength",
    core: "core stability",
    balance: "supported balance",
    conditioning: "low-impact conditioning",
    shoulderMobility: "shoulder mobility",
    hipMobility: "hip mobility",
    ankleMobility: "ankle control",
    pain: "pain-free range",
    standing: "standing tolerance",
    breathing: "breathing control",
    rom: "range of motion"
  };
  const focus = Object.entries(scores).filter(([, score]) => score <= 2).map(([key]) => map[key]).filter(Boolean);
  return focus.length ? focus.slice(0, 5) : ["progressive strength", "fight-conditioning", "skill quality"];
}

function buildAvoidList(restrictions) {
  const avoid = new Set();
  if (restrictions.includes("Fall risk") || restrictions.includes("Ankle limitation") || restrictions.includes("Knee limitation")) avoid.add("jumping");
  if (restrictions.includes("Low cardio tolerance")) avoid.add("high-impact conditioning");
  if (restrictions.includes("Pain high")) avoid.add("painful range");
  if (restrictions.includes("Back limitation")) avoid.add("heavy hinge and twisting");
  if (restrictions.includes("Shoulder limitation") || restrictions.includes("Wrist limitation")) avoid.add("heavy pushing or power punching");
  if (!avoid.size) avoid.add("rapid intensity jumps");
  return [...avoid];
}

export function filterExercisesForAssessment(exercises, assessment) {
  return exercises.filter((exercise) => {
    const equipment = toArray(exercise.equipment).map((item) => item.toLowerCase());
    const contraindications = toArray(exercise.contraindications);
    if (assessment.equipmentLevel === "Minimal Equipment" && !["bodyweight", "chair", "mobility", "low-impact"].some((tag) => equipment.includes(tag))) return false;
    return !assessment.restrictions.some((restriction) => contraindications.includes(restriction));
  });
}

export function searchExerciseLibrary(exercises, query) {
  const q = String(query || "").trim().toLowerCase();
  return exercises.filter((exercise) => {
    if (exercise.active === false || exercise.archived) return false;
    if (!q) return true;
    return [
      exercise.exerciseName,
      exercise.name,
      exercise.category,
      exercise.sportFocus,
      exercise.goal,
      exercise.sessionPart,
      toArray(exercise.equipment).join(" "),
      toArray(exercise.bodyArea).join(" "),
      exercise.coachingCues
    ].join(" ").toLowerCase().includes(q);
  });
}

export function filterExerciseLibrary(exercises, filters = {}) {
  return exercises.filter((exercise) => {
    if (exercise.active === false || exercise.archived) return false;
    if (filters.category && !sameText(exercise.category, filters.category)) return false;
    if (filters.sportFocus && !String(exercise.sportFocus || "").toLowerCase().includes(String(filters.sportFocus).toLowerCase())) return false;
    if (filters.trainingLevel && exercise.trainingLevel !== filters.trainingLevel) return false;
    if (filters.difficulty && exercise.difficulty !== filters.difficulty) return false;
    if (filters.sessionPart && exercise.sessionPart !== filters.sessionPart) return false;
    if (filters.equipment && !toArray(exercise.equipment).some((item) => sameText(item, filters.equipment))) return false;
    if (filters.bodyArea && !toArray(exercise.bodyArea).some((item) => sameText(item, filters.bodyArea))) return false;
    if (filters.stressArea && !toArray(exercise.stressArea).some((item) => sameText(item, filters.stressArea))) return false;
    if (filters.lowImpact != null && Boolean(exercise.lowImpact) !== Boolean(filters.lowImpact)) return false;
    if (filters.recoveryAlternative != null && Boolean(exercise.recoveryAlternative) !== Boolean(filters.recoveryAlternative)) return false;
    if (filters.goal && !String(exercise.goal || "").toLowerCase().includes(String(filters.goal).toLowerCase())) return false;
    return true;
  });
}

export function saveAssessment(store, input) {
  const summary = summarizeAssessment(input);
  store.assessments.push(summary);
  const client = store.clients.find((item) => item.id === summary.clientId);
  if (client) {
    client.currentTrainingLevel = summary.trainingLevel;
    client.currentRestrictions = summary.restrictions;
    client.currentAdjustmentMode = summary.adjustmentMode;
    client.currentPlanLevel = summary.trainingLevel;
    client.lastAssessmentDate = summary.assessmentDate;
  }
  return summary;
}

export function summarizeWeeklyCheckIn(input) {
  let planAdjustment = "Maintain Plan";
  if (input.painScore >= 4) planAdjustment = "Lower Volume";
  else if (input.energyScore <= 2) planAdjustment = "Lower Intensity";
  else if (input.sleepScore <= 2) planAdjustment = "Lower Intensity";
  else if (input.stressScore >= 4) planAdjustment = "Recovery Focus";
  else if (input.sorenessScore >= 4) planAdjustment = "Recovery Focus";
  else if (input.workoutCompletionPercent < 50) planAdjustment = "Simplify Plan";
  else if (input.workoutDifficulty === "Too Hard") planAdjustment = "Make Easier";
  else if (input.energyScore >= 4 && input.painScore <= 2 && input.sleepScore >= 4 && input.workoutCompletionPercent >= 80) planAdjustment = "Progress Next Week";

  const poor = input.painScore >= 4 || input.energyScore <= 2 || input.sleepScore <= 2 || input.sorenessScore >= 4 || input.stressScore >= 4;
  const needs = input.workoutCompletionPercent < 50 || input.workoutDifficulty === "Too Hard" || input.performanceScore <= 2;
  const strong = input.energyScore >= 4 && input.painScore <= 2 && input.sleepScore >= 4 && input.workoutCompletionPercent >= 80 && input.performanceScore >= 4;
  const checkInResult = poor ? "Poor Recovery" : needs ? "Needs Modification" : strong ? "Strong Week" : "Normal";
  const nextWorkoutDirection = checkInResult === "Strong Week" ? "Harder" : checkInResult === "Normal" ? "Same" : "Easier";
  const recommendation = {
    "Poor Recovery": "Make next workout easier, reduce volume and impact, use mobility and recovery, and avoid heavy progression.",
    "Needs Modification": "Keep the same plan level but simplify exercises, reduce complexity, use easier alternatives, and increase rest.",
    "Normal": "Keep plan the same, repeat or slightly rotate exercises, and monitor next check-in.",
    "Strong Week": "Progress next week with a small increase in reps, rounds, time, or difficulty if the trend continues."
  }[checkInResult];

  return {
    id: input.id || makeId("weekly"),
    ...input,
    planAdjustment,
    checkInResult,
    nextWorkoutDirection,
    recommendation
  };
}

export function saveWeeklyCheckIn(store, input) {
  const result = summarizeWeeklyCheckIn(input);
  store.weeklyCheckIns.push(result);
  return result;
}

export function suggestMonthlyPlanLevel(currentPlanLevel, lastFourCheckIns) {
  return suggestMonthlyTrainingLevel(currentPlanLevel, lastFourCheckIns);
}

export function suggestMonthlyTrainingLevel(currentTrainingLevel, lastFourCheckIns) {
  const recent = lastFourCheckIns.slice(-4);
  const current = normalizeTrainingLevel(currentTrainingLevel || "Intermediate");
  if (recent.length < 4) return current;
  const strong = recent.every((item) => item.checkInResult === "Strong Week");
  const poor = recent.every((item) => item.checkInResult === "Poor Recovery");
  if (strong) return nextTrainingLevel(current);
  if (poor) return previousTrainingLevel(current);
  return current;
}

export function getClientVisiblePlan(store, clientId) {
  return store.monthlyPlans.find((plan) => plan.clientId === clientId && plan.status === "Active" && plan.approved === true) || null;
}

export function getTodayWorkoutForClient(store, clientId, date) {
  const plan = getClientVisiblePlan(store, clientId);
  if (!plan) return null;
  return store.monthlyPlanItems.find((item) => item.clientId === clientId && item.monthlyPlanId === plan.id && item.workoutDate === date) || null;
}

export function getWorkoutDetailForUser(store, user, clientId, workoutId, date = todayIso()) {
  if (!canUserAccessClient(store, user, clientId)) return null;
  const dashboard = getClientDashboard(store, clientId, date);
  const plannedWorkout = store.monthlyPlanItems.find((item) => item.id === workoutId && item.clientId === clientId);
  const isToday = plannedWorkout?.workoutDate === date;
  const sourceWorkout = isToday ? dashboard.workout : plannedWorkout;
  if (!sourceWorkout) return null;
  if (user.role === "Client" && sourceWorkout.clientId !== user.linkedId) return null;
  return buildWorkoutDetail(store, sourceWorkout, user.role, {
    adjusted: isToday && Boolean(dashboard.adjustment?.coachApprovedWorkoutSnapshot || dashboard.adjustment?.adjustedWorkoutSnapshot),
    locked: isToday && dashboard.locked,
    originalWorkout: isToday ? dashboard.originalWorkout : null
  });
}

export function getExerciseDetailForUser(store, user, exerciseId, context = {}) {
  const exercise = store.exercises.find((item) => item.id === exerciseId);
  if (!exercise) return null;
  if (user.role === "Client") {
    const clientId = context.clientId || user.linkedId;
    const workoutId = context.workoutId;
    if (clientId !== user.linkedId) return null;
    if (workoutId) {
      const workout = getWorkoutDetailForUser(store, user, clientId, workoutId, context.date || todayIso());
      const hasExercise = workout?.sections.some((section) => section.items.some((item) => item.exerciseId === exerciseId));
      if (!hasExercise) return null;
    }
  }
  if (user.role === "Coach" && context.clientId && !coachCanSeeClient(store, user.linkedId, context.clientId)) return null;
  return formatExerciseDetail(store, exercise, user.role);
}

function buildWorkoutDetail(store, workout, role, meta = {}) {
  const items = (workout.items || []).map((item) => {
    const exercise = store.exercises.find((entry) => entry.id === item.exerciseId);
    const detail = exercise ? formatExerciseDetail(store, exercise, role) : null;
    return {
      ...item,
      exerciseId: item.exerciseId || exercise?.id || null,
      exerciseName: item.name || item.exerciseName || exercise?.exerciseName || "Exercise",
      sessionPart: normalizeSessionPart(item.sessionPart || exercise?.sessionPart || "Strength"),
      difficulty: item.difficulty || exercise?.difficulty || "Medium",
      equipment: item.equipment || exercise?.equipment || [],
      hasVideo: Boolean(detail?.videoUrl || detail?.youtubeEmbedUrl),
      detail
    };
  });
  const sectionOrder = ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Finisher", "Cooldown", "Recovery / Mobility"];
  const sections = sectionOrder.map((section) => ({
    name: section,
    items: items.filter((item) => sectionMatches(item.sessionPart, section))
  })).filter((section) => section.items.length);
  return {
    ...workout,
    adjustedForToday: meta.adjusted,
    locked: meta.locked,
    originalWorkout: role === "Client" ? null : meta.originalWorkout,
    sections,
    canEdit: role === "Admin" || role === "Coach",
    canManageLibrary: role === "Admin"
  };
}

function formatExerciseDetail(store, exercise, role) {
  const safe = exercise.safeAlternativeExerciseId ? store.exercises.find((item) => item.id === exercise.safeAlternativeExerciseId) : null;
  const regression = exercise.regressionExerciseId ? store.exercises.find((item) => item.id === exercise.regressionExerciseId) : null;
  const progression = exercise.progressionExerciseId ? store.exercises.find((item) => item.id === exercise.progressionExerciseId) : null;
  const video = exercise.videoUrl || "";
  return {
    id: exercise.id,
    exerciseName: exercise.exerciseName || exercise.name,
    description: exercise.description || `${exercise.exerciseName || exercise.name} supports ${exercise.replacementCategory || exercise.category || "training"} with coach-selected intensity.`,
    purpose: exercise.purpose || purposeForExercise(exercise),
    bodyAreasWorked: exercise.bodyArea || [],
    equipment: exercise.equipment || [],
    difficulty: exercise.difficulty || "Medium",
    trainingLevel: normalizeTrainingLevel(exercise.trainingLevel || exercise.planLevel),
    recoveryAlternative: Boolean(exercise.recoveryAlternative),
    sets: exercise.sets ?? null,
    reps: exercise.reps ?? null,
    time: exercise.time ?? null,
    rest: exercise.rest ?? null,
    rounds: exercise.rounds ?? null,
    setupInstructions: exercise.setupInstructions || "Set up with enough space, stable footing, and any listed equipment ready before starting.",
    stepByStepInstructions: exercise.howToPerform || exercise.stepByStepInstructions || `Move through ${exercise.exerciseName || exercise.name} with control, clean posture, and the pain-free range your coach recommends.`,
    breathingInstructions: exercise.breathingInstructions || "Breathe steadily. Exhale during the effort and avoid holding your breath.",
    tempoOrPace: exercise.tempoOrPace || (exercise.difficulty === "Hard" ? "Strong but controlled pace." : "Controlled pace with clean form."),
    coachingCues: exercise.coachingCues || "Stay relaxed, keep good posture, and stop if form breaks down.",
    commonMistakes: exercise.commonMistakes || "Rushing reps, losing posture, or pushing through pain.",
    safetyWarnings: exercise.safetyWarnings || safetyWarningForExercise(exercise),
    painWarnings: exercise.painWarnings || painWarningForExercise(exercise),
    easierVersion: exercise.easierAlternative || regression?.exerciseName || regression?.name || (exercise.recoveryAlternative ? "Use shorter range, fewer reps, and longer rest." : "Use the listed regression or reduce range and speed."),
    harderVersion: exercise.harderProgression || progression?.exerciseName || progression?.name || "Add difficulty only when the coach allows it.",
    lowImpactOption: exercise.lowImpact ? exercise.exerciseName || exercise.name : safe?.exerciseName || safe?.name || "Switch to a low-impact alternative.",
    safeAlternative: safe?.exerciseName || safe?.name || exercise.safeAlternative || "",
    videoUrl: video,
    youtubeEmbedUrl: youtubeEmbedUrl(video),
    clientNotes: exercise.clientNotes || "",
    coachOnlyNotes: role === "Client" && !exercise.coachNotesVisibleToClient ? "" : exercise.coachNotes || exercise.coachingCues || "",
    replacementOptions: role === "Client" ? [] : [regression, safe, progression].filter(Boolean).map((item) => ({ id: item.id, name: item.exerciseName || item.name })),
    canEdit: role === "Admin",
    canAdjustInWorkout: role === "Admin" || role === "Coach"
  };
}

function sectionMatches(itemPart, section) {
  const normalized = normalizeSessionPart(itemPart);
  if (section === "Recovery / Mobility") return ["Recovery", "Mobility"].includes(normalized);
  return normalized === section;
}

function normalizeSessionPart(part) {
  const value = String(part || "").toLowerCase();
  if (value.includes("warm")) return "Warm-Up";
  if (value.includes("skill") || value.includes("technique")) return "Skill / Technique";
  if (value.includes("strength")) return "Strength";
  if (value.includes("condition")) return "Conditioning";
  if (value.includes("core")) return "Core";
  if (value.includes("finish")) return "Finisher";
  if (value.includes("cool")) return "Cooldown";
  if (value.includes("recover") || value.includes("mobility")) return "Recovery / Mobility";
  return part || "Strength";
}

export function getClientDashboard(store, clientId, date) {
  const client = store.clients.find((item) => item.id === clientId);
  const plan = getClientVisiblePlan(store, clientId);
  const workout = getTodayWorkoutForClient(store, clientId, date);
  const checkIn = store.dailyCheckIns.find((item) => item.clientId === clientId && item.workoutDate === date);
  const adjustment = store.todayWorkoutAdjustments.filter((item) => item.clientId === clientId && item.workoutDate === date).at(-1);
  const locked = store.coachAlerts.some((alert) => alert.clientId === clientId && alert.dailyCheckInId === checkIn?.id && alert.alertSeverity === "Serious" && alert.status === "New");
  const visibleWorkout = locked ? null : adjustment?.coachApprovedWorkoutSnapshot || adjustment?.adjustedWorkoutSnapshot || workout;
  const message = locked
    ? lockedPainMessage(checkIn)
    : adjustment?.coachDecision === "No Workout Today"
      ? "No workout today. Follow your coach's recovery instructions."
      : adjustment?.coachApprovedWorkoutSnapshot
        ? dashboardDecisionMessage(adjustment.coachDecision, checkIn)
        : checkIn?.dailyAdjustment && checkIn.dailyAdjustment !== "Keep Same"
          ? painCheckInMessage(checkIn) || "Today's workout has been adjusted based on your check-in."
          : checkIn
            ? painCheckInMessage(checkIn) || "You're good to follow today's plan."
            : "Check in before workout.";
  return { client, plan, workout: visibleWorkout, originalWorkout: workout, checkIn, adjustment, locked, message };
}

function dashboardDecisionMessage(decision, checkIn) {
  const painBased = checkIn?.painCheckIn?.hasPain;
  return {
    "Approved Suggested Change": painBased ? "Your coach adjusted today's workout based on your pain check-in." : "Your coach adjusted today's workout based on your check-in.",
    "Edited Suggested Change": "Your coach updated today's workout for you.",
    "Kept Original Workout": "Your coach reviewed your check-in and kept today's workout the same.",
    "Replaced Workout": "Your coach replaced today's workout.",
    "Coach Review Needed": "Please message your coach before training.",
    "No Workout Today": "No workout today. Follow your coach's recovery instructions."
  }[decision] || "Your coach reviewed today's workout.";
}

function lockedPainMessage(checkIn) {
  const pain = checkIn?.painCheckIn;
  if (pain?.hasPain && pain.painLocations?.includes("Chest")) {
    return "Chest pain can be serious. Do not train. Seek medical attention if needed.";
  }
  if (pain?.hasPain && pain.painLevel1to10 >= 9) {
    return "Your pain level is severe. Do not complete today's workout until your coach reviews this.";
  }
  if (pain?.hasPain && pain.painLevel1to10 >= 7) {
    return "Your pain level is high. Your coach has been alerted. Please wait for coach review before doing today's workout.";
  }
  return "Your check-in has been sent to your coach for review. Please wait for coach approval before completing today's workout.";
}

function painCheckInMessage(checkIn) {
  const pain = checkIn?.painCheckIn;
  if (!pain?.hasPain) return "";
  if (pain.painLevel1to10 <= 2) return "Your workout is ready. Stay in a pain-free range.";
  if (pain.painLevel1to10 <= 6 && checkIn.alertSeverity !== "None") return "Your workout may need adjustment. Your coach has been alerted.";
  return "";
}

export function evaluateDailyCheckIn(input, originalWorkout, exercises = []) {
  const pain = input.painCheckIn || {};
  const danger = hasDangerousPain(pain, input);
  let dailyAdjustment = "Keep Same";
  let severity = "None";
  let reason = "Scores are normal.";
  let locked = false;

  if (danger || input.feelsSafeToTrain === false || pain.feelsSafeToTrain === false) {
    dailyAdjustment = "Coach Review Needed";
    severity = "Serious";
    reason = "Safety concern or dangerous symptom reported.";
    locked = true;
  } else if (pain.hasPain && pain.painLevel1to10 >= 9) {
    dailyAdjustment = "Coach Review Needed";
    severity = "Serious";
    reason = "Severe pain reported.";
    locked = true;
  } else if (pain.hasPain && pain.painLevel1to10 >= 7) {
    dailyAdjustment = "Recovery Version";
    severity = "Serious";
    reason = "High pain reported.";
    locked = true;
  } else if (input.painScore >= 4 || (pain.hasPain && pain.painLevel1to10 >= 5)) {
    dailyAdjustment = "Recovery Version";
    severity = "Moderate";
    reason = "Pain level needs easier work today.";
  } else if (input.energyScore <= 2 || input.sleepScore <= 2) {
    dailyAdjustment = "Lower Intensity";
    severity = input.energyScore <= 1 ? "Moderate" : "Mild";
    reason = "Low energy or poor sleep.";
  } else if (input.sorenessScore >= 4) {
    dailyAdjustment = "Recovery Version";
    severity = "Moderate";
    reason = "High soreness.";
  } else if (input.stressScore >= 4) {
    dailyAdjustment = "Recovery Focus";
    severity = "Mild";
    reason = "High stress.";
  } else if (pain.hasPain && pain.painLevel1to10 >= 3) {
    dailyAdjustment = "Lower Intensity";
    severity = "Mild";
    reason = "Mild to moderate pain.";
  } else if (input.energyScore >= 4 && input.painScore <= 2 && input.sleepScore >= 4 && input.sorenessScore <= 2 && input.readinessScore >= 4) {
    dailyAdjustment = originalWorkout?.coachAllowsBonus ? "Optional Progression" : "Keep Same";
    severity = "None";
    reason = "Strong readiness scores.";
  }

  const adjustedWorkout = dailyAdjustment === "Keep Same" || dailyAdjustment === "Optional Progression"
    ? withPainFreeNote(originalWorkout, pain)
    : buildAdjustedWorkout(originalWorkout, exercises, pain, dailyAdjustment);
  const dailyAdjustmentMode = toAdjustmentMode(dailyAdjustment);

  return {
    id: input.id || makeId("daily"),
    ...input,
    dailyAdjustment,
    dailyAdjustmentMode,
    adjustmentMode: dailyAdjustmentMode,
    painLevel1to10: Number(pain.painLevel1to10 || 0),
    painLocation: [...(pain.painLocations || [])],
    coachAlertRequired: severity !== "None",
    adjustmentReason: reason,
    alertSeverity: severity,
    locked,
    adjustedWorkout
  };
}

export function saveDailyCheckIn(store, input) {
  const existing = store.dailyCheckIns.find((item) => item.clientId === input.clientId && item.workoutDate === input.workoutDate);
  if (existing) throw new Error("You already checked in for today.");
  const originalWorkout = getTodayWorkoutForClient(store, input.clientId, input.workoutDate);
  const painCheckIn = createPainCheckIn(input);
  const evaluated = evaluateDailyCheckIn({ ...input, painCheckIn, painCheckInId: painCheckIn?.id || null }, originalWorkout, store.exercises);
  if (painCheckIn) store.painCheckIns.push(painCheckIn);
  store.dailyCheckIns.push(evaluated);
  const alert = maybeCreateCoachAlert(store, evaluated, originalWorkout);
  if (evaluated.dailyAdjustment !== "Keep Same" && evaluated.dailyAdjustment !== "Optional Progression" && !evaluated.locked && evaluated.alertSeverity === "Mild" && store.settings.allowMildAutoAdjustments) {
    store.todayWorkoutAdjustments.push({
      id: makeId("today-adjustment"),
      clientId: input.clientId,
      coachId: store.clients.find((c) => c.id === input.clientId)?.coachId,
      dailyCheckInId: evaluated.id,
      monthlyPlanId: input.monthlyPlanId,
      workoutDate: input.workoutDate,
      alertId: alert?.id || null,
      originalWorkoutSnapshot: clone(originalWorkout),
      appSuggestedWorkoutSnapshot: clone(evaluated.adjustedWorkout),
      coachApprovedWorkoutSnapshot: clone(evaluated.adjustedWorkout),
      adjustedWorkoutSnapshot: clone(evaluated.adjustedWorkout),
      adjustmentType: evaluated.dailyAdjustment,
      adjustmentReason: evaluated.adjustmentReason,
      coachDecision: "Approved Suggested Change",
      coachNotes: "Auto-adjusted under coach settings.",
      approvedAt: nowIso(),
      createdAt: nowIso()
    });
  }
  return { dailyCheckIn: evaluated, alert };
}

function createPainCheckIn(input) {
  const pain = input.painCheckIn;
  if (!pain) return null;
  return {
    id: makeId("pain-checkin"),
    clientId: input.clientId,
    monthlyPlanId: input.monthlyPlanId,
    workoutDate: input.workoutDate,
    hasPain: Boolean(pain.hasPain),
    painLocations: [...(pain.painLocations || [])],
    painType: [...(pain.painType || [])],
    painLevel1to10: Number(pain.painLevel1to10 || 1),
    painStartedToday: Boolean(pain.painStartedToday),
    painWorseWithMovement: Boolean(pain.painWorseWithMovement),
    feelsSafeToTrain: pain.feelsSafeToTrain !== false,
    painNotes: pain.painNotes || "",
    createdAt: nowIso()
  };
}

export function maybeCreateCoachAlert(store, dailyCheckIn, originalWorkout) {
  const pain = dailyCheckIn.painCheckIn || {};
  const severeText = [pain.painNotes, dailyCheckIn.painNotes, dailyCheckIn.changeNotes].join(" ").toLowerCase();
  const redWords = ["injury", "sharp", "dizziness", "numbness", "tingling", "chest", "breathing", "faint", "swelling"];
  const hasRedText = redWords.some((word) => severeText.includes(word));
  const multiplePoor = poorDailyTrend(store, dailyCheckIn.clientId) >= 2 && dailyCheckIn.alertSeverity !== "None";
  const missed = missedWorkoutTrend(store, dailyCheckIn.clientId) >= 2;
  const tooHard = dailyCheckIn.workoutDifficulty === "Too Hard";
  if (dailyCheckIn.alertSeverity === "None" && !hasRedText && !multiplePoor && !missed && !tooHard) return null;
  const client = store.clients.find((item) => item.id === dailyCheckIn.clientId);
  const alertType = dailyCheckIn.locked || hasRedText ? "Safety Concern" : pain.hasPain ? "High Pain" : dailyCheckIn.energyScore <= 2 ? "Low Energy" : dailyCheckIn.sleepScore <= 2 ? "Poor Sleep" : dailyCheckIn.sorenessScore >= 4 ? "High Soreness" : dailyCheckIn.stressScore >= 4 ? "High Stress" : multiplePoor ? "Poor Check-In Trend" : tooHard ? "Workout Too Hard" : "Missed Workouts";
  const alertSeverity = dailyCheckIn.locked || hasRedText || pain.painLevel1to10 >= 7 ? "Serious" : dailyCheckIn.alertSeverity === "Moderate" ? "Moderate" : "Mild";
  const alert = {
    id: makeId("alert"),
    clientId: dailyCheckIn.clientId,
    coachId: client?.coachId,
    dailyCheckInId: dailyCheckIn.id,
    alertType,
    alertSeverity,
    alertReason: dailyCheckIn.adjustmentReason + (multiplePoor ? " Multiple poor check-ins suggest reassessment." : ""),
    painSummary: pain.hasPain ? {
      locations: pain.painLocations || [],
      types: pain.painType || [],
      level: pain.painLevel1to10,
      startedToday: pain.painStartedToday,
      worseWithMovement: pain.painWorseWithMovement,
      feelsSafeToTrain: pain.feelsSafeToTrain !== false,
      notes: pain.painNotes || ""
    } : null,
    appRecommendation: recommendationFor(dailyCheckIn),
    suggestedAdjustmentType: dailyCheckIn.dailyAdjustment,
    suggestedWorkoutSnapshot: clone(dailyCheckIn.adjustedWorkout),
    originalWorkoutSnapshot: clone(originalWorkout),
    status: "New",
    coachDecision: null,
    coachNotes: "",
    createdAt: nowIso(),
    resolvedAt: null
  };
  store.coachAlerts.push(alert);
  return alert;
}

export function resolveCoachAlert(store, alertId, decision, options = {}) {
  const alert = store.coachAlerts.find((item) => item.id === alertId);
  if (!alert) throw new Error("Alert not found");
  const daily = store.dailyCheckIns.find((item) => item.id === alert.dailyCheckInId);
  const approvedWorkout = decision === "Kept Original Workout"
    ? alert.originalWorkoutSnapshot
    : decision === "No Workout Today" || decision === "Coach Review Needed"
      ? null
      : options.workoutSnapshot || alert.suggestedWorkoutSnapshot;
  alert.status = "Resolved";
  alert.coachDecision = decision;
  alert.coachNotes = options.coachNotes || "";
  alert.resolvedAt = nowIso();
  const adjustment = {
    id: makeId("today-adjustment"),
    clientId: alert.clientId,
    coachId: alert.coachId,
    dailyCheckInId: alert.dailyCheckInId,
    monthlyPlanId: daily.monthlyPlanId,
    workoutDate: daily.workoutDate,
    alertId: alert.id,
    originalWorkoutSnapshot: clone(alert.originalWorkoutSnapshot),
    appSuggestedWorkoutSnapshot: clone(alert.suggestedWorkoutSnapshot),
    coachApprovedWorkoutSnapshot: clone(approvedWorkout),
    adjustedWorkoutSnapshot: clone(approvedWorkout),
    adjustmentType: daily.dailyAdjustment,
    adjustmentReason: alert.alertReason,
    coachDecision: decision,
    coachNotes: options.coachNotes || "",
    approvedAt: nowIso(),
    createdAt: nowIso()
  };
  store.todayWorkoutAdjustments.push(adjustment);
  return adjustment;
}

export function getCoachAlerts(store, coachId) {
  return store.coachAlerts
    .filter((alert) => alert.coachId === coachId)
    .sort((a, b) => severityRank(b.alertSeverity) - severityRank(a.alertSeverity));
}

export function getAdminAlerts(store) {
  return store.coachAlerts.sort((a, b) => severityRank(b.alertSeverity) - severityRank(a.alertSeverity));
}

export function coachCanSeeClient(store, coachId, clientId) {
  return store.clients.some((client) => client.id === clientId && client.coachId === coachId);
}

export function clientOwnsRecord(record, clientId) {
  return record?.clientId === clientId;
}

export function createReassessmentDraftIfNeeded(store, assessment, currentPlan, coachAgrees) {
  const assessmentLevel = assessment.trainingLevel || assessment.recommendedTrainingLevel || normalizeTrainingLevel(assessment.planLevel);
  const currentLevel = currentPlan?.trainingLevel || normalizeTrainingLevel(currentPlan?.planLevel);
  const changed = !currentPlan
    || currentLevel !== assessmentLevel
    || JSON.stringify(currentPlan.restrictions || []) !== JSON.stringify(assessment.restrictions || [])
    || currentPlan.workoutPermission !== assessment.workoutPermission;
  if (!coachAgrees) return { shouldPrompt: changed, draftPlan: null };
  const draftPlan = {
    id: makeId("plan"),
    clientId: assessment.clientId,
    coachId: store.clients.find((c) => c.id === assessment.clientId)?.coachId,
    month: nextMonthLabel(),
    status: "Draft",
    planStatus: "Draft",
    approved: false,
    coachApproved: false,
    planLevel: assessmentLevel,
    trainingLevel: assessmentLevel,
    restrictions: assessment.restrictions,
    workoutPermission: assessment.workoutPermission,
    createdFromAssessmentId: assessment.assessmentId,
    generatedFromAssessmentId: assessment.assessmentId,
    generatedFrom: changed ? "Assessment recommendation" : "Coach accepted suggested workouts",
    coachEditable: true,
    coachCanAddExercises: true,
    coachCanReplaceWorkouts: true,
    createdAt: nowIso()
  };
  store.monthlyPlans.push(draftPlan);
  ensureMonthlyPlanHasWorkouts(store, draftPlan.id, assessment);
  return { shouldPrompt: true, draftPlan };
}

export function ensureMonthlyPlanHasWorkouts(store, planId, assessment = null) {
  const plan = findById(store.monthlyPlans, planId, "Monthly plan");
  const existing = store.monthlyPlanItems.filter((item) => item.monthlyPlanId === plan.id);
  const client = findById(store.clients, plan.clientId, "Client");
  const targetCount = Math.max(1, Math.min(5, Number(client.trainingDaysPerWeek || 3))) * 4;
  if (existing.length >= targetCount) return existing;
  const sourceAssessment = assessment || store.assessments.filter((item) => item.clientId === plan.clientId).at(-1) || {
    assessmentId: plan.generatedFromAssessmentId,
    clientId: plan.clientId,
    trainingLevel: plan.trainingLevel,
    restrictions: plan.restrictions || [],
    recoveryRecommended: false,
    adjustmentMode: "Normal"
  };
  return [...existing, ...createAssessmentDrivenMonthlyPlanItems(store, plan, sourceAssessment, existing.length)];
}

function createAssessmentDrivenMonthlyPlanItems(store, plan, assessment, startAtIndex = 0) {
  const client = findById(store.clients, plan.clientId, "Client");
  const trainingDays = Math.max(1, Math.min(5, Number(client.trainingDaysPerWeek || 3)));
  const recoveryMode = assessment.recoveryRecommended || assessment.adjustmentMode === "Recovery" || toArray(assessment.restrictions).includes("Pain high");
  const sections = recoveryMode
    ? ["Warm-Up", "Recovery", "Skill / Technique", "Core", "Cooldown"]
    : ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Cooldown"];
  const startDate = nextPlanStartDate();
  const created = [];
  for (let week = 1; week <= 4; week += 1) {
    for (let day = 1; day <= trainingDays; day += 1) {
      const absoluteIndex = ((week - 1) * trainingDays) + day - 1;
      if (absoluteIndex < startAtIndex) continue;
      const workoutDate = addDaysIso(startDate, ((week - 1) * 7) + ((day - 1) * Math.max(1, Math.floor(7 / trainingDays))));
      const items = sections.map((section, index) => {
        const exercise = chooseAssessmentExercise(store.exercises, {
          section,
          trainingLevel: plan.trainingLevel,
          sportFocus: client.sportFocus,
          goal: client.goal,
          equipment: client.equipmentAvailable || [],
          restrictions: assessment.restrictions || [],
          recoveryMode,
          index
        });
        return exerciseToPlanItem(exercise, section, recoveryMode);
      }).filter(Boolean);
      const monthlyItem = {
        id: makeId("item"),
        clientId: client.id,
        monthlyPlanId: plan.id,
        workoutDate,
        trainingDayNumber: ((week - 1) * trainingDays) + day,
        weekNumber: week,
        trainingLevel: plan.trainingLevel,
        adjustmentMode: recoveryMode ? "Recovery" : "Normal",
        sessionLength: client.sessionLength,
        coachAllowsMarkComplete: true,
        coachAllowsBonus: !recoveryMode && ["Advanced", "Pro"].includes(plan.trainingLevel),
        title: `${plan.trainingLevel} ${client.sportFocus || "Training"} - Week ${week} Day ${day}`,
        generatedFromAssessmentId: assessment.assessmentId,
        coachEditable: true,
        source: "Suggested workout from exercise library",
        items
      };
      store.monthlyPlanItems.push(monthlyItem);
      created.push(monthlyItem);
    }
  }
  return created;
}

function chooseAssessmentExercise(exercises, context) {
  const levelOrder = ["Beginner", "Intermediate", "Advanced", "Pro"];
  const targetIndex = Math.max(0, levelOrder.indexOf(normalizeTrainingLevel(context.trainingLevel)));
  const equipmentText = toArray(context.equipment).join(" ").toLowerCase();
  const sectionKey = String(context.section || "").toLowerCase();
  const sportText = String(context.sportFocus || "").toLowerCase();
  const goalText = String(context.goal || "").toLowerCase();
  const candidates = exercises.filter((exercise) => {
    if (exercise.active === false || exercise.archived) return false;
    if (levelOrder.indexOf(normalizeTrainingLevel(exercise.trainingLevel || exercise.planLevel)) > targetIndex) return false;
    if (context.recoveryMode && !exercise.lowImpact && !exercise.recoveryAlternative) return false;
    if (context.restrictions.some((restriction) => toArray(exercise.contraindications).includes(restriction))) return false;
    const exerciseSection = String(exercise.sessionPart || exercise.category || exercise.replacementCategory || "").toLowerCase();
    const exercisePattern = String(exercise.replacementCategory || "").toLowerCase();
    if (!exerciseSection.includes(sectionKey) && !exercisePattern.includes(sectionKey.split(" ")[0])) return false;
    const equipment = toArray(exercise.equipment).join(" ").toLowerCase();
    if (equipment && !equipment.includes("bodyweight") && !equipment.includes("mobility") && !equipment.includes("low-impact") && !equipmentText.includes(equipment.split(" ")[0])) return false;
    return true;
  });
  return candidates.find((exercise) => String(exercise.sportFocus || "").toLowerCase().includes(sportText.split(" ")[0]))
    || candidates.find((exercise) => String(exercise.goal || "").toLowerCase().includes(goalText.split(" ")[0]))
    || candidates[context.index % Math.max(1, candidates.length)]
    || exercises.find((exercise) => exercise.active !== false && !exercise.archived && (exercise.lowImpact || exercise.recoveryAlternative))
    || exercises.find((exercise) => exercise.active !== false && !exercise.archived);
}

function exerciseToPlanItem(exercise, section, recoveryMode) {
  if (!exercise) return null;
  return {
    exerciseId: exercise.id,
    name: exercise.exerciseName || exercise.name,
    sessionPart: section,
    sets: recoveryMode ? Math.min(2, Number(exercise.sets || 2)) : exercise.sets || (section === "Strength" ? 3 : null),
    reps: recoveryMode ? exercise.reps || null : exercise.reps || null,
    time: parseDoseNumber(exercise.time) || (section === "Warm-Up" || section === "Cooldown" || section === "Recovery" ? 5 : null),
    rest: parseDoseNumber(exercise.rest) || (recoveryMode ? 90 : 60),
    rounds: recoveryMode ? Math.min(2, Number(exercise.rounds || 2)) : exercise.rounds || null,
    difficulty: exercise.difficulty,
    equipment: toArray(exercise.equipment).join(", "),
    replacementReason: recoveryMode ? "Recovery alternative from reassessment" : ""
  };
}

function nextPlanStartDate() {
  const date = new Date(`${todayIso()}T12:00:00`);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

function addDaysIso(startIso, days) {
  const date = new Date(`${startIso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function approveMonthlyPlan(store, planId) {
  const plan = store.monthlyPlans.find((item) => item.id === planId);
  if (!plan) throw new Error("Plan not found");
  ensureMonthlyPlanHasWorkouts(store, plan.id);
  store.monthlyPlans.forEach((item) => {
    if (item.clientId === plan.clientId && item.status === "Active") item.status = "Archived";
  });
  plan.status = "Active";
  plan.planStatus = "Active";
  plan.approved = true;
  plan.coachApproved = true;
  plan.approvedAt = nowIso();
  return plan;
}

export function hashPin(pin, salt = "smart-coach") {
  let hash = 2166136261;
  for (const char of `${salt}:${pin}`) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `pin_${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function validateNumericPin(pin, confirmPin = pin) {
  const value = String(pin || "");
  if (!/^\d+$/.test(value)) {
    throw new Error("PIN must use numbers only.");
  }
  if (value.length !== 4) {
    throw new Error("PIN must be exactly 4 digits.");
  }
  if (value !== String(confirmPin || "")) {
    throw new Error("PIN and Confirm PIN must match.");
  }
  return true;
}

export function authenticateUser(store, identifierOrRole, pin, optionalPin = null) {
  const legacyRoles = ["Admin", "Coach", "Client"];
  const role = optionalPin == null && legacyRoles.includes(identifierOrRole) ? identifierOrRole : null;
  const identifier = role ? null : String(identifierOrRole || "").toLowerCase();
  const pinValue = String(role ? pin : pin || "");
  const candidates = store.users.filter((user) => {
    if (user.disabled) return false;
    if (role) return user.role === role;
    return [user.email, user.phone].filter(Boolean).map((value) => String(value).toLowerCase()).includes(identifier);
  });
  const matched = candidates.find((user) => user.pinHash === hashPin(pinValue, user.pinSalt));
  if (!matched) return null;
  if (matched.accountLocked || ["Pending", "Rejected", "Suspended", "Archived"].includes(matched.accountStatus)) return null;
  return matched;
}

export function loginBlockedMessage(store, identifierOrRole, pin, optionalPin = null) {
  const legacyRoles = ["Admin", "Coach", "Client"];
  const role = optionalPin == null && legacyRoles.includes(identifierOrRole) ? identifierOrRole : null;
  const identifier = role ? null : String(identifierOrRole || "").toLowerCase();
  const pinValue = String(role ? pin : pin || "");
  const user = store.users.find((item) => {
    if (role && item.role !== role) return false;
    if (!role && ![item.email, item.phone].filter(Boolean).map((value) => String(value).toLowerCase()).includes(identifier)) return false;
    return item.pinHash === hashPin(pinValue, item.pinSalt);
  });
  if (!user) return "PIN or account type did not match.";
  if (user.accountStatus === "Pending") return "Your account is waiting for Admin approval. Please check back later or contact Admin.";
  if (user.accountStatus === "Rejected") return "Your account request was not approved. Please contact Admin.";
  if (user.accountStatus === "Suspended") return "Your account is suspended. Please contact Admin.";
  if (user.accountStatus === "Archived") return "This account is archived. Please contact Admin.";
  if (user.accountLocked) return "Your account is waiting for Admin approval. Please check back later or contact Admin.";
  if (user.disabled) return "This login is disabled. Please contact Admin.";
  return "PIN or account type did not match.";
}

export function requestLockedAccount(store, input) {
  const requested = normalizeRole(input.accountType || input.requestedRole);
  if (requested === "ADMIN") throw new Error("Admin accounts cannot be created from the public signup page.");
  if (!["CLIENT", "COACH"].includes(requested)) throw new Error("Choose Client or Coach account request.");
  validateNumericPin(input.pin, input.confirmPin);
  const email = String(input.email || "").toLowerCase();
  const phone = String(input.phone || "");
  if (store.users.some((user) => [user.email, user.phone].filter(Boolean).some((value) => String(value).toLowerCase() === email || String(value) === phone))) {
    throw new Error("An account already exists for this email or phone.");
  }
  const fullName = input.fullName || `${input.firstName || ""} ${input.lastName || ""}`.trim();
  const pinSalt = makeId("salt");
  const user = {
    id: makeId(requested === "CLIENT" ? "client_user" : "coach_user"),
    role: requested === "CLIENT" ? "Client" : "Coach",
    name: fullName,
    firstName: input.firstName || fullName.split(" ")[0] || "",
    lastName: input.lastName || fullName.split(" ").slice(1).join(" "),
    email,
    phone,
    pinSalt,
    pinHash: hashPin(input.pin, pinSalt),
    linkedId: null,
    accountLocked: true,
    accountStatus: "Pending",
    profileLocked: true,
    requestedRole: requested === "CLIENT" ? "Client" : "Coach",
    requestNote: input.requestNote || "",
    requestDetails: {
      goal: input.goal || "",
      sportFocus: input.sportFocus || "",
      alreadyTrainsWithCoach: Boolean(input.alreadyTrainsWithCoach),
      coachNameIfKnown: input.coachNameIfKnown || "",
      coachTitle: input.coachTitle || "",
      experience: input.experience || "",
      coachRequestReason: input.coachRequestReason || "",
      emergencyContact: input.emergencyContact || ""
    },
    emailVerified: false,
    forcePinChange: false,
    temporaryPinExpiresAt: null,
    disabled: false,
    profileImageUrl: "",
    profileImageStorageKey: "",
    profileImageUploadedAt: null,
    createdAt: nowIso()
  };
  store.users.push(user);
  logAdminAction(store, { id: "public", role: "Public", name: fullName }, `User submitted ${user.requestedRole} account request for ${fullName}`);
  return user;
}

export function getAccountRequests(store, adminUser, filter = "Pending") {
  requireAdmin(adminUser);
  return store.users.filter((user) => {
    if (!["Client", "Coach"].includes(user.requestedRole || user.role)) return false;
    if (filter === "All") return true;
    if (filter === "Locked") return user.accountLocked;
    if (filter === "Client" || filter === "Coach") return (user.requestedRole || user.role) === filter;
    return (user.accountStatus || "Active") === filter;
  });
}

export function adminReviewAccountRequest(store, adminUser, targetUserId, action, options = {}) {
  requireAdmin(adminUser);
  const user = findById(store.users, targetUserId, "User");
  const requestedRole = options.requestedRole || user.requestedRole || user.role;
  if (requestedRole === "Admin") throw new Error("Admin accounts cannot be approved from public requests.");
  if (options.requestedRole && options.requestedRole !== user.requestedRole) {
    user.requestedRole = options.requestedRole;
    user.role = options.requestedRole;
    logAdminAction(store, adminUser, `Changed requested role for ${user.name} to ${options.requestedRole}`);
  }
  if (action === "Reject") {
    Object.assign(user, { accountStatus: "Rejected", accountLocked: true, accountLockReason: options.reason || "Rejected by Admin" });
  } else if (action === "Archive") {
    Object.assign(user, { accountStatus: "Archived", accountLocked: true, accountLockReason: options.reason || "Archived by Admin" });
  } else if (action === "Lock") {
    Object.assign(user, { accountLocked: true, accountStatus: options.status || "Suspended", accountLockReason: options.reason || "Locked by Admin" });
  } else {
    approveRequestedUserProfile(store, adminUser, user, options);
    user.accountLocked = false;
    user.accountStatus = "Active";
    user.accountUnlockedByAdminId = adminUser.id;
    user.accountUnlockedAt = nowIso();
    user.accountLockReason = "";
    user.profileLocked = options.unlockProfile ? false : true;
  }
  logAdminAction(store, adminUser, `${action} account request for ${user.name}`);
  return user;
}

function approveRequestedUserProfile(store, adminUser, user, options) {
  if ((user.requestedRole || user.role) === "Client") {
    let client = user.linkedId ? store.clients.find((item) => item.id === user.linkedId) : null;
    if (!client) {
      client = {
        id: makeId("client"),
        coachId: options.coachId || "coach_1",
        name: user.name,
        email: user.email,
        phone: user.phone,
        goal: user.requestDetails?.goal || "",
        sportFocus: user.requestDetails?.sportFocus || "",
        trainingDaysPerWeek: Number(options.trainingDaysPerWeek || 3),
        sessionLength: Number(options.sessionLength || 45),
        packageType: "",
        sessionsRemaining: 0,
        startDate: todayIso(),
        status: "Active",
        injuryNotes: "",
        equipmentAvailable: [],
        progressNotes: "",
        currentTrainingLevel: "Beginner",
        currentRestrictions: [],
        currentAdjustmentMode: "Normal",
        profileLocked: !options.unlockProfile,
        profileUnlockedByAdminId: options.unlockProfile ? adminUser.id : null,
        profileUnlockedAt: options.unlockProfile ? nowIso() : null,
        profileLockReason: options.unlockProfile ? "" : "Locked until Admin unlocks profile editing.",
        createdByAdminId: adminUser.id,
        createdAt: nowIso(),
        updatedAt: nowIso()
      };
      store.clients.push(client);
    }
    user.linkedId = client.id;
    client.profileLocked = !options.unlockProfile;
  } else if ((user.requestedRole || user.role) === "Coach") {
    let coach = user.linkedId ? store.coaches.find((item) => item.id === user.linkedId) : null;
    if (!coach) {
      coach = {
        id: makeId("coach"),
        name: user.name,
        role: "Coach",
        email: user.email,
        phone: user.phone,
        specialty: user.requestDetails?.coachTitle || "",
        experience: user.requestDetails?.experience || "",
        emergencyContact: user.requestDetails?.emergencyContact || "",
        permissions: options.permissions || {},
        profileLocked: !options.unlockProfile,
        profileUnlockedByAdminId: options.unlockProfile ? adminUser.id : null,
        profileUnlockedAt: options.unlockProfile ? nowIso() : null,
        profileLockReason: options.unlockProfile ? "" : "Locked until Admin unlocks profile editing.",
        createdByAdminId: adminUser.id,
        createdAt: nowIso()
      };
      store.coaches.push(coach);
    }
    user.linkedId = coach.id;
    user.coachPermissions = options.permissions || {};
    coach.profileLocked = !options.unlockProfile;
  }
}

export function visibleClientsForUser(store, user) {
  if (!user) return [];
  if (user.role === "Admin") return store.clients;
  if (user.role === "Coach") return store.clients.filter((client) => client.coachId === user.linkedId);
  return store.clients.filter((client) => client.id === user.linkedId);
}

export function canUserAccessClient(store, user, clientId) {
  return visibleClientsForUser(store, user).some((client) => client.id === clientId);
}

export function getChatMessages(store, user, clientId) {
  if (!canUserAccessClient(store, user, clientId)) return [];
  if (user.role === "Admin") return store.chatMessages.filter((message) => message.clientId === clientId);
  return store.chatMessages.filter((message) => message.clientId === clientId && (message.fromUserId === user.id || message.toUserId === user.id));
}

export function sendChatMessage(store, { fromUserId, toUserId, clientId, body }) {
  const from = store.users.find((user) => user.id === fromUserId);
  const to = store.users.find((user) => user.id === toUserId);
  if (!from || !to) throw new Error("Message sender or receiver not found");
  if (!body?.trim()) throw new Error("Message cannot be empty");
  const message = {
    id: makeId("msg"),
    clientId,
    fromUserId,
    toUserId,
    body: body.trim(),
    createdAt: nowIso(),
    readBy: [fromUserId]
  };
  store.chatMessages.push(message);
  store.notifications.push({
    id: makeId("notification"),
    userId: toUserId,
    clientId,
    type: "Chat Message",
    title: `New message from ${from.name}`,
    body: message.body,
    read: false,
    createdAt: message.createdAt
  });
  return message;
}

export function unreadNotificationCount(store, userId) {
  return store.notifications.filter((notification) => notification.userId === userId && !notification.read).length;
}

export function markNotificationsRead(store, userId, clientId = null) {
  store.notifications = store.notifications.filter((notification) => {
    const matchesUser = notification.userId === userId;
    const matchesClient = !clientId || notification.clientId === clientId;
    return !(matchesUser && matchesClient);
  });
  store.chatMessages.forEach((message) => {
    const matchesClient = !clientId || message.clientId === clientId;
    if (matchesClient && (message.toUserId === userId || message.fromUserId === userId) && !message.readBy.includes(userId)) {
      message.readBy.push(userId);
    }
  });
}

export function adminSetUserPin(store, adminUser, targetUserId, newPin) {
  if (adminUser?.role !== "Admin") throw new Error("Only admins can change passwords");
  validateNumericPin(newPin);
  const user = store.users.find((item) => item.id === targetUserId);
  if (!user) throw new Error("User not found");
  user.pinSalt = makeId("salt");
  user.pinHash = hashPin(newPin, user.pinSalt);
  user.forcePinChange = true;
  user.temporaryPinExpiresAt = futureIsoHours(24);
  logAdminAction(store, adminUser, `Changed PIN for ${user.name}`);
  return user;
}

export function adminResetUserPin(store, adminUser, targetUserId) {
  const tempPin = String(Math.floor(1000 + Math.random() * 9000));
  const user = adminSetUserPin(store, adminUser, targetUserId, tempPin);
  logAdminAction(store, adminUser, `Reset temporary PIN for ${user.name}`);
  return { user, temporaryPin: tempPin };
}

export function submitPinResetRequest(store, input) {
  const nameOrEmail = String(input.nameOrEmail || input.name || input.email || "").trim();
  const phone = String(input.phone || "").trim();
  const note = String(input.note || "").trim();
  if (!nameOrEmail && !phone) throw new Error("Enter your name, email, or phone number so Admin can find your account.");
  const normalized = nameOrEmail.toLowerCase();
  const matchedUser = store.users.find((user) => {
    return [user.name, user.email, user.phone].filter(Boolean).some((value) => String(value).toLowerCase() === normalized)
      || (phone && String(user.phone) === phone);
  });
  const request = {
    id: makeId("pin_reset"),
    userId: matchedUser?.id || null,
    nameOrEmail,
    phone,
    note,
    status: "New",
    adminMessage: "",
    temporaryPinSent: false,
    createdAt: nowIso(),
    resolvedAt: null
  };
  store.pinResetRequests = store.pinResetRequests || [];
  store.pinResetRequests.push(request);
  store.notifications.push({
    id: makeId("notification"),
    userId: "admin_1",
    clientId: matchedUser?.linkedId || null,
    type: "PIN Reset Request",
    title: "New forgot PIN request",
    body: `${nameOrEmail || phone} requested a PIN reset.`,
    read: false,
    createdAt: request.createdAt
  });
  logAdminAction(store, { id: "public", role: "Public", name: nameOrEmail || phone }, `Submitted PIN reset request for ${nameOrEmail || phone}`);
  return request;
}

export function adminResolvePinResetRequest(store, adminUser, requestId, deliveryMethod = "Email") {
  requireAdmin(adminUser);
  const request = findById(store.pinResetRequests || [], requestId, "PIN reset request");
  const user = request.userId ? store.users.find((item) => item.id === request.userId) : null;
  if (!user) throw new Error("No matching user was found. Admin must contact the person manually.");
  const reset = adminResetUserPin(store, adminUser, user.id);
  const contact = deliveryMethod === "Text" ? user.phone : user.email;
  request.status = "Resolved";
  request.resolvedAt = nowIso();
  request.temporaryPinSent = true;
  request.deliveryMethod = deliveryMethod;
  request.adminMessage = `${deliveryMethod} to ${contact}: Your temporary Mad King Conditioning PIN is ${reset.temporaryPin}. Please log in and change it.`;
  logAdminAction(store, adminUser, `Resolved PIN reset request for ${user.name} by ${deliveryMethod}`);
  return { ...reset, request };
}

export function adminSetLoginDisabled(store, adminUser, targetUserId, disabled) {
  if (adminUser?.role !== "Admin") throw new Error("Only admins can disable or reactivate logins");
  const user = store.users.find((item) => item.id === targetUserId);
  if (!user) throw new Error("User not found");
  user.disabled = Boolean(disabled);
  logAdminAction(store, adminUser, `${disabled ? "Disabled" : "Reactivated"} login for ${user.name}`);
  return user;
}

export function createInviteCode(store, actorUser, input) {
  const roleAllowed = normalizeRole(input.roleAllowed || input.role);
  if (!["CLIENT", "COACH"].includes(roleAllowed)) throw new Error("Invite role must be CLIENT or COACH");
  if (roleAllowed === "COACH" && actorUser?.role !== "Admin") throw new Error("Only Admin can create coach invite codes");
  if (roleAllowed === "CLIENT" && !["Admin", "Coach"].includes(actorUser?.role)) throw new Error("Only Admin or Coach can create client invites");
  if (actorUser?.role === "Coach" && input.clientId && !coachCanSeeClient(store, actorUser.linkedId, input.clientId)) throw new Error("Coach can only invite assigned clients");
  const invite = {
    id: makeId("invite"),
    code: input.code || makeCode(),
    email: input.email || "",
    phone: input.phone || "",
    roleAllowed,
    clientId: input.clientId || null,
    coachId: input.coachId || null,
    createdByUserId: actorUser.id,
    createdByAdminId: actorUser.role === "Admin" ? actorUser.id : null,
    expiresAt: input.expiresAt || futureIsoHours(24 * 14),
    used: false,
    usedAt: null,
    createdAt: nowIso()
  };
  store.inviteCodes.push(invite);
  logAdminAction(store, actorUser, `Created ${roleAllowed.toLowerCase()} invite ${invite.code}`);
  return invite;
}

export function expireInviteCode(store, actorUser, inviteId) {
  const invite = store.inviteCodes.find((item) => item.id === inviteId);
  if (!invite) throw new Error("Invite not found");
  if (actorUser?.role !== "Admin" && actorUser?.role !== "Coach") throw new Error("Not authorized to expire invite");
  invite.expiresAt = nowIso();
  logAdminAction(store, actorUser, `Expired invite ${invite.code}`);
  return invite;
}

export function deleteInviteCode(store, actorUser, inviteId) {
  if (actorUser?.role !== "Admin") throw new Error("Only Admin can delete invites");
  const index = store.inviteCodes.findIndex((item) => item.id === inviteId);
  if (index < 0) throw new Error("Invite not found");
  const [invite] = store.inviteCodes.splice(index, 1);
  logAdminAction(store, actorUser, `Deleted invite ${invite.code}`);
  return invite;
}

export function resendInviteCode(store, actorUser, inviteId) {
  const invite = store.inviteCodes.find((item) => item.id === inviteId);
  if (!invite) throw new Error("Invite not found");
  if (actorUser?.role !== "Admin" && actorUser?.role !== "Coach") throw new Error("Not authorized to resend invite");
  store.notifications.push({
    id: makeId("notification"),
    userId: actorUser.id,
    clientId: invite.clientId,
    type: "Invite Resent",
    title: `Invite resent: ${invite.code}`,
    body: `${invite.roleAllowed} invite for ${invite.email || invite.phone || "new user"}`,
    read: false,
    createdAt: nowIso()
  });
  return invite;
}

export function signUpWithInvite(store, input) {
  const requested = normalizeRole(input.accountType || input.role);
  if (requested === "ADMIN") throw new Error("Admin accounts cannot be created from the public signup page.");
  if (!["CLIENT", "COACH"].includes(requested)) throw new Error("Choose Client Signup or Coach Invite Signup.");
  validateNumericPin(input.pin, input.confirmPin);

  const invite = input.inviteCode ? store.inviteCodes.find((item) => item.code === input.inviteCode) : null;
  const email = String(input.email || "").toLowerCase();
  const phone = String(input.phone || "");
  if (input.inviteCode && !invite) throw new Error(inviteErrorFor(requested));
  if (invite) validateInviteForSignup(invite, requested, email, phone);

  if (requested === "COACH") {
    if (!invite || invite.roleAllowed !== "COACH" || !invite.createdByAdminId) {
      throw new Error("You are not authorized to create a coach account. Please contact Admin.");
    }
  }

  const clientProfile = requested === "CLIENT"
    ? findMatchingClientProfile(store, { email, phone, invite })
    : null;
  if (requested === "CLIENT" && !clientProfile) {
    throw new Error("Your client account could not be matched. Please contact your coach or admin.");
  }

  if (store.users.some((user) => [user.email, user.phone].filter(Boolean).some((value) => String(value).toLowerCase() === email || String(value) === phone))) {
    throw new Error("An account already exists for this email or phone.");
  }

  const pinSalt = makeId("salt");
  const user = {
    id: makeId(requested.toLowerCase() === "client" ? "client_user" : "coach_user"),
    role: requested === "CLIENT" ? "Client" : "Coach",
    name: input.fullName,
    email,
    phone,
    pinSalt,
    pinHash: hashPin(input.pin, pinSalt),
    linkedId: requested === "CLIENT" ? clientProfile.id : invite.coachId,
    emailVerified: false,
    forcePinChange: false,
    temporaryPinExpiresAt: null,
    disabled: false,
    createdAt: nowIso()
  };
  store.users.push(user);
  if (invite) {
    invite.used = true;
    invite.usedAt = nowIso();
  }
  return user;
}

export function canAccessAdminRoute(user, route, store = null) {
  if (user?.role === "Admin") return true;
  if (user?.role === "Coach" && store?.adminPermissions?.coachCanCreateWorkouts && route?.includes("/admin/workouts")) return true;
  if (user?.role === "Coach" && store?.adminPermissions?.coachCanCreateExercises && route?.includes("/admin/exercise-library")) return true;
  return false;
}

export function adminCreateClient(store, adminUser, input) {
  requireAdmin(adminUser);
  const firstName = input.firstName || input.fullName?.split(" ")[0] || "";
  const lastName = input.lastName || input.fullName?.split(" ").slice(1).join(" ") || "";
  const client = {
    id: input.id || makeId("client"),
    firstName,
    lastName,
    name: input.fullName || `${firstName} ${lastName}`.trim(),
    email: input.email || "",
    phone: input.phone || "",
    dateOfBirth: input.dateOfBirth || null,
    age: input.age || null,
    goal: input.goal || "",
    sportFocus: input.sportFocus || "",
    trainingDaysPerWeek: Number(input.trainingDaysPerWeek || 3),
    sessionLength: Number(input.sessionLength || 45),
    packageType: input.package || input.packageType || "",
    packageId: input.packageId || null,
    assignedCoach: input.assignedCoach || input.coachId || "coach_1",
    coachId: input.assignedCoach || input.coachId || "coach_1",
    startDate: input.startDate || todayIso(),
    status: input.status || "Active",
    notes: input.notes || "",
    injuryNotes: input.injuryRestrictionNotes || input.injuryNotes || "",
    emergencyContact: input.emergencyContact || "",
    equipmentAvailable: input.equipmentAvailable || [],
    sessionsRemaining: Number(input.sessionsRemaining || 0),
    progressNotes: input.progressNotes || "",
    currentPlanLevel: input.currentPlanLevel || null,
    lastAssessmentDate: null,
    lastWeeklyCheckInResult: null,
    packageHistory: input.packageId ? [{ packageId: input.packageId, assignedAt: nowIso() }] : [],
    createdByAdminId: adminUser.id,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.clients.push(client);
  logAdminAction(store, adminUser, `Created client ${client.name}`);
  return client;
}

export function adminUpdateClient(store, adminUser, clientId, patch) {
  requireAdmin(adminUser);
  const client = findById(store.clients, clientId, "Client");
  if (patch.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(patch.email))) throw new Error("Enter a valid email address.");
  if (patch.trainingDaysPerWeek !== undefined && ![2, 3, 4, 5].includes(Number(patch.trainingDaysPerWeek))) throw new Error("Training days must be 2, 3, 4, or 5.");
  if (patch.sessionLength !== undefined && ![30, 45, 60, 120].includes(Number(patch.sessionLength))) throw new Error("Session length must be 30, 45, 60, or 120.");
  if (patch.currentTrainingLevel !== undefined && !["Beginner", "Intermediate", "Advanced", "Pro"].includes(patch.currentTrainingLevel)) throw new Error("Choose a valid training level.");
  if (patch.planOfferingId) findById(store.planOfferings, patch.planOfferingId, "Plan offering");
  if (patch.packageId) findById(store.packages, patch.packageId, "Package");
  Object.assign(client, patch, { updatedAt: nowIso() });
  if (patch.assignedCoach || patch.coachId) client.coachId = patch.assignedCoach || patch.coachId;
  if (patch.package || patch.packageType) client.packageType = patch.package || patch.packageType;
  if (patch.trainingDaysPerWeek !== undefined) client.trainingDaysPerWeek = Number(patch.trainingDaysPerWeek);
  if (patch.sessionLength !== undefined) client.sessionLength = Number(patch.sessionLength);
  if (patch.sessionsPurchased !== undefined) client.sessionsPurchased = Number(patch.sessionsPurchased || 0);
  if (patch.sessionsUsed !== undefined) client.sessionsUsed = Number(patch.sessionsUsed || 0);
  if (patch.sessionsRemaining !== undefined) client.sessionsRemaining = Number(patch.sessionsRemaining || 0);
  const user = store.users.find((item) => item.role === "Client" && item.linkedId === clientId);
  if (user) {
    if (patch.name || patch.fullName) user.name = patch.name || patch.fullName;
    if (patch.firstName !== undefined) user.firstName = patch.firstName;
    if (patch.lastName !== undefined) user.lastName = patch.lastName;
    if (patch.email !== undefined) user.email = String(patch.email || "").toLowerCase();
    if (patch.phone !== undefined) user.phone = String(patch.phone || "");
    if (patch.accountLocked !== undefined) user.accountLocked = Boolean(patch.accountLocked);
    if (patch.profileLocked !== undefined) {
      user.profileLocked = Boolean(patch.profileLocked);
      client.profileLocked = Boolean(patch.profileLocked);
    }
    if (patch.status) {
      user.accountStatus = patch.status === "Locked" ? "Active" : patch.status;
      user.disabled = ["Suspended", "Archived"].includes(patch.status);
      if (patch.status === "Locked") user.accountLocked = true;
      if (patch.status === "Active") user.accountLocked = false;
    }
  }
  logAdminAction(store, adminUser, `Updated client ${client.name}`);
  return client;
}

export function updateClientSelfProfile(store, clientUser, patch) {
  if (!clientUser || clientUser.role !== "Client") throw new Error("Only clients can update their own profile details.");
  const client = findById(store.clients, clientUser.linkedId, "Client");
  if (patch.injuryNotes !== undefined) {
    client.injuryNotes = String(patch.injuryNotes || "");
    client.injuryRestrictionNotes = client.injuryNotes;
  }
  if (patch.emergencyContact !== undefined) client.emergencyContact = String(patch.emergencyContact || "");
  client.updatedAt = nowIso();
  logAdminAction(store, clientUser, `Client updated injury notes or emergency contact for ${client.name}`);
  return client;
}

export function adminArchiveMonthlyPlan(store, adminUser, planId) {
  requireAdmin(adminUser);
  const plan = findById(store.monthlyPlans, planId, "Monthly plan");
  plan.status = "Archived";
  plan.planStatus = "Archived";
  plan.archived = true;
  plan.updatedAt = nowIso();
  logAdminAction(store, adminUser, `Archived monthly plan ${plan.id}`);
  return plan;
}

export function adminArchiveClient(store, adminUser, clientId) {
  return adminUpdateClient(store, adminUser, clientId, { status: "Archived", archived: true });
}

export function adminDeleteClient(store, adminUser, clientId) {
  requireAdmin(adminUser);
  store.users = store.users.filter((user) => !(user.role === "Client" && user.linkedId === clientId));
  store.assessments = store.assessments.filter((item) => item.clientId !== clientId);
  store.weeklyCheckIns = store.weeklyCheckIns.filter((item) => item.clientId !== clientId);
  store.dailyCheckIns = store.dailyCheckIns.filter((item) => item.clientId !== clientId);
  store.painCheckIns = store.painCheckIns.filter((item) => item.clientId !== clientId);
  store.progressImages = store.progressImages.filter((item) => item.clientId !== clientId);
  store.coachAlerts = store.coachAlerts.filter((item) => item.clientId !== clientId);
  store.todayWorkoutAdjustments = store.todayWorkoutAdjustments.filter((item) => item.clientId !== clientId);
  store.workoutCompletions = store.workoutCompletions.filter((item) => item.clientId !== clientId);
  store.chatMessages = store.chatMessages.filter((item) => item.clientId !== clientId);
  store.notifications = store.notifications.filter((item) => item.clientId !== clientId);
  store.monthlyPlans = store.monthlyPlans.filter((item) => item.clientId !== clientId);
  store.monthlyPlanItems = store.monthlyPlanItems.filter((item) => item.clientId !== clientId);
  store.inviteCodes = store.inviteCodes.filter((item) => item.clientId !== clientId);
  const removed = removeById(store.clients, clientId, "Client");
  logAdminAction(store, adminUser, `Deleted client ${removed.name}`);
  return removed;
}

export function adminDeleteCoach(store, adminUser, coachId) {
  requireAdmin(adminUser);
  const removed = removeById(store.coaches, coachId, "Coach");
  store.users = store.users.filter((user) => !(user.role === "Coach" && user.linkedId === coachId));
  const fallbackCoach = store.coaches.find((coach) => coach.role === "Coach") || store.coaches[0] || null;
  store.clients.forEach((client) => {
    if (client.coachId === coachId) {
      client.coachId = fallbackCoach?.id || null;
      client.assignedCoach = fallbackCoach?.id || null;
    }
  });
  store.coachAlerts = store.coachAlerts.filter((alert) => alert.coachId !== coachId);
  store.inviteCodes = store.inviteCodes.filter((invite) => invite.coachId !== coachId);
  logAdminAction(store, adminUser, `Deleted coach ${removed.name}`);
  return removed;
}

export function adminCreateCoach(store, adminUser, input) {
  requireAdmin(adminUser);
  validateNumericPin(input.pin || "1234", input.confirmPin || input.pin || "1234");
  const fullName = input.fullName || `${input.firstName || ""} ${input.lastName || ""}`.trim();
  if (!fullName) throw new Error("Coach name is required.");
  const coach = {
    id: makeId("coach"),
    role: "Coach",
    name: fullName,
    firstName: input.firstName || fullName.split(" ")[0] || "",
    lastName: input.lastName || fullName.split(" ").slice(1).join(" "),
    email: String(input.email || "").toLowerCase(),
    phone: String(input.phone || ""),
    specialty: input.specialty || input.coachTitle || "",
    bio: input.bio || "",
    emergencyContact: input.emergencyContact || "",
    status: input.status || "Active",
    profileLocked: Boolean(input.profileLocked),
    profileUnlockedByAdminId: adminUser.id,
    profileUnlockedAt: nowIso(),
    profileLockReason: "",
    profileImageUrl: "",
    profileImageStorageKey: "",
    profileImageUploadedAt: null,
    createdByAdminId: adminUser.id,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  const pinSalt = makeId("salt");
  const user = {
    id: makeId("coach_user"),
    role: "Coach",
    name: coach.name,
    firstName: coach.firstName,
    lastName: coach.lastName,
    email: coach.email,
    phone: coach.phone,
    pinSalt,
    pinHash: hashPin(input.pin || "1234", pinSalt),
    linkedId: coach.id,
    accountLocked: false,
    accountUnlockedByAdminId: adminUser.id,
    accountUnlockedAt: nowIso(),
    accountLockReason: "",
    accountStatus: "Active",
    requestedRole: "Coach",
    requestNote: "",
    profileLocked: Boolean(input.profileLocked),
    emailVerified: false,
    forcePinChange: Boolean(input.forcePinChange),
    temporaryPinExpiresAt: null,
    disabled: false,
    coachPermissions: input.permissions || {},
    profileImageUrl: "",
    profileImageStorageKey: "",
    profileImageUploadedAt: null,
    createdAt: nowIso()
  };
  store.coaches.push(coach);
  store.users.push(user);
  logAdminAction(store, adminUser, `Created coach ${coach.name}`);
  return { coach, user };
}

export function adminUpdateCoach(store, adminUser, coachId, patch) {
  requireAdmin(adminUser);
  const coach = findById(store.coaches, coachId, "Coach");
  Object.assign(coach, patch, { updatedAt: nowIso() });
  const user = store.users.find((item) => item.role === "Coach" && item.linkedId === coachId);
  if (user) {
    if (patch.name || patch.fullName) user.name = patch.name || patch.fullName;
    if (patch.firstName !== undefined) user.firstName = patch.firstName;
    if (patch.lastName !== undefined) user.lastName = patch.lastName;
    if (patch.email !== undefined) user.email = String(patch.email || "").toLowerCase();
    if (patch.phone !== undefined) user.phone = String(patch.phone || "");
    if (patch.status) {
      user.accountStatus = patch.status === "Inactive" ? "Suspended" : patch.status;
      user.disabled = ["Inactive", "Suspended", "Archived"].includes(patch.status);
    }
  }
  logAdminAction(store, adminUser, `Updated coach ${coach.name}`);
  return coach;
}

export function adminCreateExercise(store, actorUser, input) {
  requireAdminOrPermission(store, actorUser, "coachCanCreateExercises", "Only Admin can create exercises");
  const exercise = normalizeExerciseInput(input, actorUser.id);
  store.exercises.push(exercise);
  logAdminAction(store, actorUser, `Created exercise ${exercise.exerciseName}`);
  return exercise;
}

export function adminUpdateExercise(store, adminUser, exerciseId, patch) {
  requireAdmin(adminUser);
  const exercise = findById(store.exercises, exerciseId, "Exercise");
  Object.assign(exercise, normalizeExerciseInput({ ...exercise, ...patch }, exercise.createdByAdminId || adminUser.id, exercise.id), { updatedAt: nowIso() });
  logAdminAction(store, adminUser, `Updated exercise ${exercise.exerciseName || exercise.name}`);
  return exercise;
}

export function adminArchiveExercise(store, adminUser, exerciseId) {
  return adminUpdateExercise(store, adminUser, exerciseId, { active: false, archived: true });
}

export function adminDeleteExercise(store, adminUser, exerciseId) {
  requireAdmin(adminUser);
  store.workoutTemplateItems = store.workoutTemplateItems.filter((item) => item.exerciseId !== exerciseId);
  const removed = removeById(store.exercises, exerciseId, "Exercise");
  logAdminAction(store, adminUser, `Deleted exercise ${removed.exerciseName || removed.name}`);
  return removed;
}

export function adminDuplicateExercise(store, adminUser, exerciseId) {
  requireAdmin(adminUser);
  const source = clone(findById(store.exercises, exerciseId, "Exercise"));
  const duplicate = { ...source, id: makeId("exercise"), exerciseName: `${source.exerciseName || source.name} Copy`, name: `${source.name || source.exerciseName} Copy`, createdAt: nowIso(), updatedAt: nowIso() };
  store.exercises.push(duplicate);
  return duplicate;
}

export function adminImportExercisesFromRows(store, adminUser, rows) {
  requireAdmin(adminUser);
  const imported = [];
  for (const row of rows || []) {
    const name = row["Exercise Name"] || row.exerciseName || row.name || row.Exercise;
    if (!name || store.exercises.some((exercise) => String(exercise.exerciseName || exercise.name).toLowerCase() === String(name).toLowerCase())) continue;
    imported.push(adminCreateExercise(store, adminUser, normalizeWorkbookExerciseRow(row)));
  }
  logAdminAction(store, adminUser, `Imported ${imported.length} exercises from workbook rows`);
  return imported;
}

export function adminCreateWorkoutTemplate(store, actorUser, input) {
  requireAdminOrPermission(store, actorUser, "coachCanCreateWorkouts", "Only Admin can create workouts");
  const workout = {
    id: input.id || makeId("template"),
    workoutName: input.workoutName || input.name || "New Workout",
    description: input.description || "",
    sportFocus: input.sportFocus || "General Fitness",
    goal: input.goal || "Conditioning",
    trainingLevel: input.trainingLevel || normalizeTrainingLevel(input.planLevel || "Intermediate"),
    planLevel: input.trainingLevel || normalizeTrainingLevel(input.planLevel || "Intermediate"),
    difficulty: input.difficulty || "Medium",
    sessionLength: Number(input.sessionLength || 45),
    trainingDayType: input.trainingDayType || "Day 1",
    workoutCategory: input.workoutCategory || input.category || "General Fitness",
    visible: input.visible !== false,
    active: input.active !== false,
    archived: Boolean(input.archived),
    connectedPlanOfferingIds: input.connectedPlanOfferingIds || [],
    connectedPlanTemplateIds: input.connectedPlanTemplateIds || [],
    coachNotes: input.coachNotes || "",
    clientNotes: input.clientNotes || "",
    createdByAdminId: actorUser.role === "Admin" ? actorUser.id : null,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.workoutTemplates.push(workout);
  logAdminAction(store, actorUser, `Created workout ${workout.workoutName}`);
  return workout;
}

export function adminUpdateWorkoutTemplate(store, adminUser, workoutTemplateId, patch) {
  requireAdmin(adminUser);
  const workout = findById(store.workoutTemplates, workoutTemplateId, "Workout");
  Object.assign(workout, patch, { updatedAt: nowIso() });
  return workout;
}

export function adminArchiveWorkoutTemplate(store, adminUser, workoutTemplateId) {
  return adminUpdateWorkoutTemplate(store, adminUser, workoutTemplateId, { active: false, archived: true });
}

export function adminDeleteWorkoutTemplate(store, adminUser, workoutTemplateId) {
  requireAdmin(adminUser);
  store.planOfferings.forEach((offering) => {
    offering.workoutTemplateIds = (offering.workoutTemplateIds || []).filter((id) => id !== workoutTemplateId);
  });
  store.workoutTemplateItems = store.workoutTemplateItems.filter((item) => item.workoutTemplateId !== workoutTemplateId);
  const removed = removeById(store.workoutTemplates, workoutTemplateId, "Workout");
  logAdminAction(store, adminUser, `Deleted workout template ${removed.workoutName}`);
  return removed;
}

export function adminAddExerciseToWorkoutTemplate(store, adminUser, workoutTemplateId, input) {
  requireAdmin(adminUser);
  const workout = findById(store.workoutTemplates, workoutTemplateId, "Workout");
  const exercise = input.exerciseId ? findById(store.exercises, input.exerciseId, "Exercise") : null;
  const item = {
    id: makeId("wti"),
    workoutTemplateId: workout.id,
    sessionPart: input.sessionPart || exercise?.sessionPart || "Strength",
    exerciseId: input.exerciseId || null,
    exerciseName: input.exerciseName || exercise?.exerciseName || exercise?.name || "Custom exercise",
    sets: input.sets ?? exercise?.sets ?? null,
    reps: input.reps ?? exercise?.reps ?? null,
    time: input.time ?? exercise?.time ?? null,
    rest: input.rest ?? exercise?.rest ?? null,
    rounds: input.rounds ?? exercise?.rounds ?? null,
    coachingNotes: input.coachingNotes || exercise?.coachingCues || "",
    clientNotes: input.clientNotes || "",
    displayOrder: Number(input.displayOrder || store.workoutTemplateItems.filter((existing) => existing.workoutTemplateId === workout.id).length + 1),
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.workoutTemplateItems.push(item);
  return item;
}

export function adminRemoveWorkoutTemplateItem(store, adminUser, itemId) {
  requireAdmin(adminUser);
  return removeById(store.workoutTemplateItems, itemId, "Workout item");
}

export function adminUpdateWorkoutTemplateItem(store, adminUser, itemId, patch) {
  requireAdmin(adminUser);
  const item = findById(store.workoutTemplateItems, itemId, "Workout item");
  Object.assign(item, patch, { updatedAt: nowIso() });
  return item;
}

export function adminReorderWorkoutTemplateItems(store, adminUser, workoutTemplateId, orderedItemIds) {
  requireAdmin(adminUser);
  orderedItemIds.forEach((id, index) => {
    const item = store.workoutTemplateItems.find((existing) => existing.id === id && existing.workoutTemplateId === workoutTemplateId);
    if (item) item.displayOrder = index + 1;
  });
  return store.workoutTemplateItems.filter((item) => item.workoutTemplateId === workoutTemplateId).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function adminImportWorkoutTemplatesFromRows(store, adminUser, rows) {
  requireAdmin(adminUser);
  const template = adminCreateWorkoutTemplate(store, adminUser, {
    workoutName: "Imported Workbook Boxing Template",
    sportFocus: rows?.[0]?.["Program Type"] || "Boxing",
    goal: rows?.[0]?.Focus || "Conditioning",
    trainingLevel: "Intermediate",
    workoutCategory: rows?.[0]?.["Program Type"] || "Boxing"
  });
  (rows || []).forEach((row, index) => adminAddExerciseToWorkoutTemplate(store, adminUser, template.id, {
    sessionPart: row.Focus || "Skill / Technique",
    exerciseName: row.Exercise,
    sets: row.Sets,
    time: row["Reps/Time"],
    rest: row.Rest || "60 sec",
    rounds: null,
    coachingNotes: row["Coach Notes"] || "",
    clientNotes: row["Easier Alternative"] ? `Easier: ${row["Easier Alternative"]}` : "",
    displayOrder: index + 1
  }));
  return template;
}

export function adminDuplicateWorkoutTemplate(store, adminUser, workoutTemplateId) {
  requireAdmin(adminUser);
  const source = clone(findById(store.workoutTemplates, workoutTemplateId, "Workout"));
  const duplicate = { ...source, id: makeId("template"), workoutName: `${source.workoutName} Copy`, createdAt: nowIso(), updatedAt: nowIso() };
  store.workoutTemplates.push(duplicate);
  store.workoutTemplateItems.filter((item) => item.workoutTemplateId === workoutTemplateId).forEach((item) => {
    store.workoutTemplateItems.push({ ...clone(item), id: makeId("wti"), workoutTemplateId: duplicate.id, createdAt: nowIso(), updatedAt: nowIso() });
  });
  return duplicate;
}

export function adminCreatePlanOffering(store, adminUser, input) {
  requireAdmin(adminUser);
  const offering = {
    id: input.id || makeId("offering"),
    planName: input.planName || "New Plan Offering",
    description: input.description || "",
    sportFocus: input.sportFocus || "General Fitness",
    goal: input.goal || "Conditioning",
    trainingLevel: input.trainingLevel || normalizeTrainingLevel(input.planLevel || "Intermediate"),
    planLevel: input.trainingLevel || normalizeTrainingLevel(input.planLevel || "Intermediate"),
    trainingDaysPerWeek: Number(input.trainingDaysPerWeek || 3),
    sessionLength: Number(input.sessionLength || 45),
    price: Number(input.price || 0),
    sessionsIncluded: Number(input.sessionsIncluded || 0),
    packageType: input.packageType || input.planName || "Coaching package",
    workoutTemplateIds: input.workoutTemplateIds || [],
    planTemplateIds: input.planTemplateIds || [],
    active: input.active !== false,
    archived: Boolean(input.archived),
    createdByAdminId: adminUser.id,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.planOfferings.push(offering);
  return offering;
}

export function adminUpdatePlanOffering(store, adminUser, offeringId, patch) {
  requireAdmin(adminUser);
  const offering = findById(store.planOfferings, offeringId, "Plan offering");
  Object.assign(offering, patch, { updatedAt: nowIso() });
  return offering;
}

export function adminArchivePlanOffering(store, adminUser, offeringId) {
  return adminUpdatePlanOffering(store, adminUser, offeringId, { active: false, archived: true });
}

export function adminDeletePlanOffering(store, adminUser, offeringId) {
  requireAdmin(adminUser);
  store.packages.forEach((pkg) => {
    if (pkg.planOfferingId === offeringId) pkg.planOfferingId = null;
  });
  store.clients.forEach((client) => {
    if (client.planOfferingId === offeringId) client.planOfferingId = null;
  });
  const removed = removeById(store.planOfferings, offeringId, "Plan offering");
  logAdminAction(store, adminUser, `Deleted plan offering ${removed.planName}`);
  return removed;
}

export function adminCreatePackage(store, adminUser, input) {
  requireAdmin(adminUser);
  const pkg = {
    id: input.id || makeId("package"),
    packageName: input.packageName || input.name || "New Package",
    planOfferingId: input.planOfferingId || null,
    price: Number(input.price || 0),
    sessionsIncluded: Number(input.sessionsIncluded || 0),
    active: input.active !== false,
    archived: Boolean(input.archived),
    createdByAdminId: adminUser.id,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.packages.push(pkg);
  return pkg;
}

export function adminDeletePackage(store, adminUser, packageId) {
  requireAdmin(adminUser);
  store.clients.forEach((client) => {
    if (client.packageId === packageId) {
      client.packageId = null;
      client.packageType = "";
    }
  });
  const removed = removeById(store.packages, packageId, "Package");
  logAdminAction(store, adminUser, `Deleted package ${removed.packageName}`);
  return removed;
}

export function adminCreateAssessmentTemplate(store, adminUser, input) {
  requireAdmin(adminUser);
  const template = {
    id: input.id || makeId("assessment_template"),
    templateName: input.templateName || "New Assessment Template",
    sportFocus: input.sportFocus || "General Fitness",
    goal: input.goal || "General",
    movementTestIds: input.movementTestIds?.length ? [...input.movementTestIds] : movementTests.map((test) => test.id),
    active: input.active !== false,
    archived: Boolean(input.archived),
    createdByAdminId: adminUser.id,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.assessmentTemplates.push(template);
  logAdminAction(store, adminUser, `Created assessment template ${template.templateName}`);
  return template;
}

export function adminUpdateAssessmentTemplate(store, adminUser, templateId, patch) {
  requireAdmin(adminUser);
  const template = findById(store.assessmentTemplates, templateId, "Assessment template");
  Object.assign(template, patch, { updatedAt: nowIso() });
  logAdminAction(store, adminUser, `Updated assessment template ${template.templateName}`);
  return template;
}

export function adminDeleteAssessmentTemplate(store, adminUser, templateId) {
  requireAdmin(adminUser);
  const removed = removeById(store.assessmentTemplates, templateId, "Assessment template");
  logAdminAction(store, adminUser, `Deleted assessment template ${removed.templateName}`);
  return removed;
}

export function adminAssignPlanOfferingToPackage(store, adminUser, packageId, planOfferingId) {
  requireAdmin(adminUser);
  const pkg = findById(store.packages, packageId, "Package");
  const offering = findById(store.planOfferings, planOfferingId, "Plan offering");
  pkg.planOfferingId = offering.id;
  pkg.price = offering.price;
  pkg.sessionsIncluded = offering.sessionsIncluded;
  pkg.updatedAt = nowIso();
  return pkg;
}

export function adminAssignPackageToClient(store, adminUser, clientId, packageId) {
  requireAdmin(adminUser);
  const client = findById(store.clients, clientId, "Client");
  const pkg = findById(store.packages, packageId, "Package");
  const offering = store.planOfferings.find((item) => item.id === pkg.planOfferingId);
  client.packageId = pkg.id;
  client.packageType = pkg.packageName;
  client.planOfferingId = offering?.id || null;
  client.trainingDaysPerWeek = offering?.trainingDaysPerWeek || client.trainingDaysPerWeek;
  client.sessionLength = offering?.sessionLength || client.sessionLength;
  client.packageHistory = [...(client.packageHistory || []), { packageId: pkg.id, planOfferingId: offering?.id || null, assignedAt: nowIso() }];
  return client;
}

export function generateMonthlyPlanFromPlanOffering(store, adminUser, clientId, planOfferingId, options = {}) {
  requireAdmin(adminUser);
  const client = findById(store.clients, clientId, "Client");
  const offering = findById(store.planOfferings, planOfferingId, "Plan offering");
  const plan = {
    id: makeId("plan"),
    clientId,
    coachId: client.coachId,
    month: options.month || nextMonthLabel(),
    status: "Draft",
    planStatus: "Draft",
    approved: false,
    coachApproved: false,
    planLevel: offering.trainingLevel || normalizeTrainingLevel(offering.planLevel),
    trainingLevel: offering.trainingLevel || normalizeTrainingLevel(offering.planLevel),
    restrictions: latestRestrictions(store, clientId),
    workoutPermission: "Train with Modifications",
    sourcePlanOfferingId: offering.id,
    createdAt: nowIso()
  };
  store.monthlyPlans.push(plan);
  const templates = store.workoutTemplates.filter((template) => offering.workoutTemplateIds?.includes(template.id) && !template.archived);
  let day = 1;
  templates.forEach((template) => {
    const templateItems = store.workoutTemplateItems
      .filter((item) => item.workoutTemplateId === template.id)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    const sourceItems = templateItems.length ? templateItems : exerciseLibraryItemsForTemplate(store, client, offering, template);
    store.monthlyPlanItems.push({
      id: makeId("item"),
      clientId,
      monthlyPlanId: plan.id,
      workoutDate: options.startDate || todayIso(),
      trainingDayNumber: day,
      weekNumber: 1,
      trainingLevel: template.trainingLevel || normalizeTrainingLevel(template.planLevel),
      adjustmentMode: "Normal",
      sessionLength: template.sessionLength,
      coachAllowsMarkComplete: true,
      coachAllowsBonus: false,
      title: template.workoutName,
      items: sourceItems.map((item) => ({
        exerciseId: item.exerciseId,
        name: item.exerciseName,
        sessionPart: item.sessionPart,
        sets: item.sets,
        reps: item.reps,
        time: parseDoseNumber(item.time),
        rest: parseDoseNumber(item.rest),
        rounds: item.rounds
      }))
    });
    day += 1;
  });
  return plan;
}

function exerciseLibraryItemsForTemplate(store, client, offering, template) {
  const sections = ["Warm-Up", "Skill / Technique", "Strength", "Conditioning", "Core", "Cooldown"];
  const restrictions = latestRestrictions(store, client.id);
  return sections.map((section, index) => {
    const exercise = chooseExerciseForSection(store.exercises, {
      section,
      trainingLevel: template.trainingLevel || offering.trainingLevel || client.currentTrainingLevel,
      sportFocus: offering.sportFocus || client.sportFocus,
      goal: offering.goal || client.goal,
      equipment: client.equipmentAvailable || [],
      restrictions
    });
    return {
      exerciseId: exercise?.id || null,
      exerciseName: exercise?.exerciseName || `${section} exercise`,
      sessionPart: section,
      sets: exercise?.sets || (section === "Warm-Up" || section === "Cooldown" ? 1 : 3),
      reps: exercise?.reps || null,
      time: exercise?.time || (section === "Warm-Up" || section === "Cooldown" ? "5 min" : null),
      rest: exercise?.rest || "60 sec",
      rounds: exercise?.rounds || null,
      displayOrder: index + 1
    };
  }).filter((item) => item.exerciseId);
}

function chooseExerciseForSection(exercises, context) {
  const levelOrder = ["Beginner", "Intermediate", "Advanced", "Pro"];
  const targetIndex = Math.max(0, levelOrder.indexOf(normalizeTrainingLevel(context.trainingLevel)));
  const equipmentText = context.equipment.join(" ").toLowerCase();
  const candidates = exercises.filter((exercise) => {
    if (exercise.active === false || exercise.archived) return false;
    if (exercise.sessionPart !== context.section) return false;
    if (levelOrder.indexOf(normalizeTrainingLevel(exercise.trainingLevel || exercise.planLevel)) > targetIndex) return false;
    if (context.restrictions.some((restriction) => toArray(exercise.contraindications).includes(restriction))) return false;
    const equipment = toArray(exercise.equipment).join(" ").toLowerCase();
    if (equipment && !equipment.includes("bodyweight") && !equipmentText.includes(equipment.split(" ")[0])) return false;
    return true;
  });
  return candidates.find((exercise) => String(exercise.sportFocus || "").toLowerCase().includes(String(context.sportFocus || "").toLowerCase()))
    || candidates.find((exercise) => String(exercise.goal || "").toLowerCase().includes(String(context.goal || "").toLowerCase().split(" ")[0]))
    || candidates[0]
    || exercises.find((exercise) => exercise.active !== false && !exercise.archived && exercise.sessionPart === context.section);
}

export function adminUpdateWorkout(store, adminUser, workoutId, patch) {
  if (adminUser?.role !== "Admin") throw new Error("Only admins can edit all workouts");
  const workout = store.monthlyPlanItems.find((item) => item.id === workoutId);
  if (!workout) throw new Error("Workout not found");
  Object.assign(workout, patch);
  logAdminAction(store, adminUser, `Updated workout ${workoutId}`);
  return workout;
}

export function adminInterveneInChat(store, adminUser, clientId, body) {
  if (adminUser?.role !== "Admin") throw new Error("Only admins can intervene in chats");
  const coachUser = store.users.find((user) => user.role === "Coach");
  const message = sendChatMessage(store, {
    fromUserId: adminUser.id,
    toUserId: coachUser.id,
    clientId,
    body
  });
  logAdminAction(store, adminUser, `Intervened in chat for ${clientId}`);
  return message;
}

export function validateImageUpload(file, settings = {}) {
  if (!file) throw new Error("Image file is required.");
  const maxBytes = settings.maxImageUploadBytes || 5 * 1024 * 1024;
  const name = String(file.name || "");
  const type = String(file.type || "").toLowerCase();
  const size = Number(file.size || 0);
  const extension = name.split(".").pop()?.toLowerCase();
  const allowed = ["jpg", "jpeg", "png", "webp"];
  const validType = type.startsWith("image/") || allowed.includes(extension);
  if (!validType || !allowed.includes(extension)) throw new Error("Invalid image type. Use jpg, jpeg, png, or webp.");
  if (size > maxBytes) throw new Error("Image is too large.");
  return true;
}

export function uploadProfileImage(store, actorUser, targetUserId, file) {
  const targetUser = findById(store.users, targetUserId, "User");
  if (!canManageProfileImage(store, actorUser, targetUser)) throw new Error("You do not have permission to edit this profile image.");
  validateImageUpload(file, store.settings);
  const storageKey = imageStorageKey("profile", targetUser.id, file.name);
  const imageUrl = `/uploads/${storageKey}`;
  Object.assign(targetUser, { profileImageUrl: imageUrl, profileImageStorageKey: storageKey, profileImageUploadedAt: nowIso() });
  syncLinkedProfileImage(store, targetUser);
  auditImageAction(store, actorUser, `${actorUser.role} uploaded profile image for ${targetUser.name}`);
  return { imageUrl, imageStorageKey: storageKey, user: targetUser };
}

export function removeProfileImage(store, actorUser, targetUserId) {
  const targetUser = findById(store.users, targetUserId, "User");
  if (!canManageProfileImage(store, actorUser, targetUser)) throw new Error("You do not have permission to remove this profile image.");
  Object.assign(targetUser, { profileImageUrl: "", profileImageStorageKey: "", profileImageUploadedAt: null });
  syncLinkedProfileImage(store, targetUser);
  auditImageAction(store, actorUser, `${actorUser.role} removed profile image for ${targetUser.name}`);
  return targetUser;
}

export function uploadProgressImage(store, actorUser, clientId, input) {
  if (!canUserAccessClient(store, actorUser, clientId)) throw new Error("You do not have permission to upload progress images for this client.");
  validateImageUpload(input.file, store.settings);
  const storageKey = imageStorageKey("progress", clientId, input.file.name);
  const image = {
    id: input.id || makeId("progress-image"),
    clientId,
    uploadedByUserId: actorUser.id,
    imageUrl: `/uploads/${storageKey}`,
    imageStorageKey: storageKey,
    imageCategory: input.imageCategory || "Other",
    imageDate: input.imageDate || todayIso(),
    clientNotes: input.clientNotes || "",
    coachNotes: input.coachNotes || "",
    coachNotesVisibleToClient: Boolean(input.coachNotesVisibleToClient),
    reviewed: false,
    visibleToClient: input.visibleToClient !== false,
    archived: false,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  store.progressImages.push(image);
  auditImageAction(store, actorUser, `${actorUser.role} uploaded progress image for ${clientId}`);
  if (actorUser.role === "Client") notifyAssignedCoachOfProgressImage(store, actorUser, clientId);
  return image;
}

export function getProgressImagesForUser(store, actorUser, clientId = null) {
  const images = store.progressImages.filter((image) => !image.archived && (!clientId || image.clientId === clientId));
  if (actorUser.role === "Admin") return images;
  if (actorUser.role === "Client") return images.filter((image) => image.clientId === actorUser.linkedId && image.visibleToClient);
  if (actorUser.role === "Coach") return images.filter((image) => coachCanSeeClient(store, actorUser.linkedId, image.clientId));
  return [];
}

export function addProgressImageCoachNote(store, actorUser, imageId, coachNotes, visibleToClient = false) {
  const image = findById(store.progressImages, imageId, "Progress image");
  if (actorUser.role !== "Admin" && !(actorUser.role === "Coach" && coachCanSeeClient(store, actorUser.linkedId, image.clientId))) {
    throw new Error("You do not have permission to add notes to this image.");
  }
  image.coachNotes = coachNotes;
  image.coachNotesVisibleToClient = Boolean(visibleToClient);
  image.reviewed = true;
  image.updatedAt = nowIso();
  auditImageAction(store, actorUser, `${actorUser.role} added progress image note for ${image.clientId}`);
  return image;
}

export function archiveProgressImage(store, actorUser, imageId) {
  const image = findById(store.progressImages, imageId, "Progress image");
  const owns = actorUser.role === "Client" && actorUser.linkedId === image.clientId && image.uploadedByUserId === actorUser.id;
  const canClientDelete = owns && store.settings.allowClientProgressImageDelete;
  if (actorUser.role !== "Admin" && !canClientDelete) throw new Error("Only Admin can archive this progress image.");
  image.archived = true;
  image.updatedAt = nowIso();
  auditImageAction(store, actorUser, `${actorUser.role} archived progress image for ${image.clientId}`);
  return image;
}

function canManageProfileImage(store, actorUser, targetUser) {
  if (!actorUser || !targetUser) return false;
  if (actorUser.id === targetUser.id) return true;
  if (actorUser.role === "Admin") return true;
  if (targetUser.role === "Admin") return false;
  if (actorUser.role === "Coach" && targetUser.role === "Coach") return Boolean(store.settings.coachCanEditOtherCoachImages);
  return false;
}

function syncLinkedProfileImage(store, user) {
  const linkedList = user.role === "Client" ? store.clients : user.role === "Coach" ? store.coaches : null;
  const profile = linkedList?.find((item) => item.id === user.linkedId);
  if (!profile) return;
  profile.profileImageUrl = user.profileImageUrl;
  profile.profileImageStorageKey = user.profileImageStorageKey;
  profile.profileImageUploadedAt = user.profileImageUploadedAt;
}

function notifyAssignedCoachOfProgressImage(store, actorUser, clientId) {
  const client = store.clients.find((item) => item.id === clientId);
  const coachUser = store.users.find((user) => user.role === "Coach" && user.linkedId === client?.coachId);
  if (!coachUser) return;
  store.notifications.push({
    id: makeId("notification"),
    userId: coachUser.id,
    clientId,
    type: "Progress Image Uploaded",
    title: "New progress photo uploaded",
    body: `${actorUser.name} uploaded a new progress photo.`,
    read: false,
    createdAt: nowIso()
  });
}

function imageStorageKey(kind, ownerId, fileName) {
  const extension = String(fileName || "image.jpg").split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  return `${kind}/${ownerId}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;
}

function auditImageAction(store, actorUser, action) {
  store.adminAuditLog.push({
    id: makeId("audit"),
    adminUserId: actorUser.id,
    action,
    createdAt: nowIso()
  });
}

function logAdminAction(store, adminUser, action) {
  store.adminAuditLog.push({
    id: makeId("audit"),
    adminUserId: adminUser.id,
    action,
    createdAt: nowIso()
  });
}

function requireAdmin(user) {
  if (user?.role !== "Admin") throw new Error("Only Admin has permission for this action.");
}

function requireAdminOrPermission(store, user, permissionKey, message) {
  if (user?.role === "Admin") return;
  if (user?.role === "Coach" && store.adminPermissions?.[permissionKey]) return;
  throw new Error(message);
}

function findById(list, id, label) {
  const item = list.find((entry) => entry.id === id);
  if (!item) throw new Error(`${label} not found`);
  return item;
}

function removeById(list, id, label) {
  const index = list.findIndex((entry) => entry.id === id);
  if (index < 0) throw new Error(`${label} not found`);
  const [removed] = list.splice(index, 1);
  return removed;
}

function normalizeExerciseInput(input, createdByAdminId, existingId = null) {
  const exerciseName = input.exerciseName || input.name || "New Exercise";
  const legacyPlanLevel = input.planLevel || input.Level || input.level;
  const trainingLevel = normalizeTrainingLevel(input.trainingLevel || legacyPlanLevel);
  const legacyLevelText = String(legacyPlanLevel || "").toLowerCase();
  const recoveryAlternative = Boolean(input.recoveryAlternative ?? (legacyLevelText.includes("recovery") || legacyLevelText.includes("below")));
  const planLevel = trainingLevel;
  const stressArea = toArray(input.stressArea || input["Restriction Avoid"] || input.bodyArea);
  const replacementCategory = input.replacementCategory || input["Movement Pattern"] || input.movementPattern || input.category || "general";
  return {
    id: existingId || input.id || input["Exercise ID"] || makeId("exercise"),
    exerciseName,
    name: exerciseName,
    description: input.description || "",
    category: input.category || input.Category || "General",
    sportFocus: input.sportFocus || input["Mode Tag"] || "General Fitness",
    goal: input.goal || input["Goal Tag"] || "Conditioning",
    difficulty: normalizeDifficulty(input.difficulty || input.Level || input.level),
    trainingLevel,
    planLevel,
    sessionPart: input.sessionPart || categoryToSessionPart(input.category || input.Category || replacementCategory),
    equipment: toArray(input.equipment || input.Equipment),
    bodyArea: toArray(input.bodyArea || input["Movement Pattern"] || input.category),
    stressArea,
    recoveryAlternative,
    lowImpact: Boolean(input.lowImpact ?? (recoveryAlternative || trainingLevel === "Beginner")),
    highImpact: Boolean(input.highImpact),
    heavy: Boolean(input.heavy),
    progression: ["Advanced", "Pro"].includes(trainingLevel),
    regression: recoveryAlternative || trainingLevel === "Beginner",
    sets: input.sets ?? input["Default Sets"] ?? null,
    reps: input.reps ?? null,
    time: input.time ?? input["Default Reps/Time"] ?? null,
    rest: input.rest ?? input["Default Rest"] ?? null,
    rounds: input.rounds ?? null,
    setupInstructions: input.setupInstructions || "",
    howToPerform: input.howToPerform || "",
    coachingCues: input.coachingCues || input["Coaching Cue"] || "",
    commonMistakes: input.commonMistakes || "",
    regressionExerciseId: input.regressionExerciseId || null,
    progressionExerciseId: input.progressionExerciseId || null,
    safeAlternativeExerciseId: input.safeAlternativeExerciseId || null,
    easierAlternative: input.easierAlternative || input["Easier Alternative"] || "",
    harderProgression: input.harderProgression || input["Harder Progression"] || "",
    contraindications: toArray(input.contraindications || input["Restriction Avoid"]),
    replacementCategory: String(replacementCategory).toLowerCase(),
    videoUrl: input.videoUrl || input["Video Link / Notes"] || "",
    imageUrl: input.imageUrl || "",
    active: input.active !== false,
    archived: Boolean(input.archived),
    createdByAdminId,
    createdAt: input.createdAt || nowIso(),
    updatedAt: nowIso()
  };
}

function normalizeWorkbookExerciseRow(row) {
  return {
    id: row["Exercise ID"],
    exerciseName: row["Exercise Name"] || row.Exercise,
    category: row.Category,
    sportFocus: row["Mode Tag"],
    goal: row["Goal Tag"],
    difficulty: row.Level,
    trainingLevel: row.Level,
    planLevel: row.Level,
    recoveryAlternative: String(row.Level || "").toLowerCase().includes("below") || String(row["Mode Tag"] || "").toLowerCase().includes("injury"),
    sessionPart: categoryToSessionPart(row.Category),
    equipment: row.Equipment,
    bodyArea: row["Movement Pattern"],
    stressArea: row["Restriction Avoid"],
    lowImpact: !/advanced|jump|sprint|plyo/i.test(`${row.Level} ${row["Exercise Name"]}`),
    sets: row["Default Sets"],
    time: row["Default Reps/Time"],
    rest: row["Default Rest"],
    coachingCues: row["Coaching Cue"],
    regressionExerciseId: null,
    progressionExerciseId: null,
    safeAlternativeExerciseId: null,
    contraindications: row["Restriction Avoid"],
    replacementCategory: row["Movement Pattern"],
    videoUrl: row["Video Link / Notes"]
  };
}

function normalizePlanLevel(value) {
  return normalizeTrainingLevel(value);
}

function normalizeTrainingLevel(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("pro") || text.includes("fighter") || text.includes("athlete")) return "Pro";
  if (text.includes("advanced") || text.includes("progression")) return "Advanced";
  if (text.includes("intermediate") || text.includes("baseline") || text.includes("medium")) return "Intermediate";
  return "Beginner";
}

function nextTrainingLevel(level) {
  const current = normalizeTrainingLevel(level);
  return { Beginner: "Intermediate", Intermediate: "Advanced", Advanced: "Pro", Pro: "Pro" }[current];
}

function previousTrainingLevel(level) {
  const current = normalizeTrainingLevel(level);
  return { Pro: "Advanced", Advanced: "Intermediate", Intermediate: "Beginner", Beginner: "Beginner" }[current];
}

function toAdjustmentMode(dailyAdjustment) {
  if (dailyAdjustment === "Keep Same") return "Normal";
  if (dailyAdjustment === "Recovery Version" || dailyAdjustment === "Recovery Focus") return "Recovery";
  return dailyAdjustment;
}

function normalizeDifficulty(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("advanced") || text.includes("hard")) return "Hard";
  if (text.includes("below") || text.includes("beginner") || text.includes("easy")) return "Easy";
  return "Medium";
}

function categoryToSessionPart(category) {
  const text = String(category || "").toLowerCase();
  if (text.includes("cardio") || text.includes("conditioning")) return "Conditioning";
  if (text.includes("mobility") || text.includes("recovery")) return "Recovery";
  if (text.includes("core")) return "Core";
  if (text.includes("boxing") || text.includes("skill")) return "Skill / Technique";
  if (text.includes("upper") || text.includes("lower") || text.includes("strength")) return "Strength";
  return "Skill / Technique";
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null || value === "") return [];
  return String(value).split(/,|;/).map((item) => item.trim()).filter(Boolean);
}

function sameText(a, b) {
  return String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
}

function latestRestrictions(store, clientId) {
  return store.assessments.filter((assessment) => assessment.clientId === clientId).at(-1)?.restrictions || [];
}

function parseDoseNumber(value) {
  if (typeof value === "number") return value;
  const match = String(value || "").match(/\d+/);
  return match ? Number(match[0]) : value || null;
}

function normalizeRole(role) {
  return String(role || "").trim().toUpperCase();
}

function makeCode() {
  return `MK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function futureIsoHours(hours) {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

function isExpired(expiresAt) {
  return new Date(expiresAt).getTime() <= Date.now();
}

function validateInviteForSignup(invite, requestedRole, email, phone) {
  if (invite.used) throw new Error("This invite code has already been used.");
  if (isExpired(invite.expiresAt)) throw new Error("This invite code has expired.");
  if (invite.roleAllowed !== requestedRole) throw new Error("Invite code role does not match requested signup type.");
  if (invite.email && invite.email.toLowerCase() !== email) throw new Error("Invite email does not match this signup.");
  if (invite.phone && invite.phone !== phone) throw new Error("Invite phone does not match this signup.");
}

function inviteErrorFor(requestedRole) {
  return requestedRole === "COACH"
    ? "You are not authorized to create a coach account. Please contact Admin."
    : "Your client account could not be matched. Please contact your coach or admin.";
}

function findMatchingClientProfile(store, { email, phone, invite }) {
  if (invite?.clientId) return store.clients.find((client) => client.id === invite.clientId) || null;
  return store.clients.find((client) => {
    const clientEmail = String(client.email || "").toLowerCase();
    const clientPhone = String(client.phone || "");
    return (email && clientEmail === email) || (phone && clientPhone === phone);
  }) || null;
}

function purposeForExercise(exercise) {
  const category = String(exercise.replacementCategory || exercise.category || "").toLowerCase();
  if (category.includes("boxing")) return "Build clean striking mechanics, timing, rhythm, and conditioning without losing form.";
  if (category.includes("conditioning")) return "Improve work capacity while matching impact and intensity to today's readiness.";
  if (category.includes("core")) return "Train trunk control, bracing, and breathing so the client can move safely under fatigue.";
  if (category.includes("mobility")) return "Restore comfortable range of motion and prepare the body for pain-free movement.";
  if (category.includes("squat") || category.includes("lunge")) return "Build lower-body strength, balance, and joint control.";
  if (category.includes("hinge")) return "Teach back-safe hip movement and posterior-chain control.";
  return "Develop movement quality, strength, and conditioning at the right training level.";
}

function safetyWarningForExercise(exercise) {
  const warnings = exercise.contraindications?.length ? exercise.contraindications.join(", ") : "Stop if sharp pain, dizziness, numbness, tingling, chest pain, or breathing trouble appears.";
  return exercise.highImpact || exercise.heavy
    ? `Higher demand movement. Avoid or regress when flagged for ${warnings}.`
    : `Use controlled range and stop if ${warnings}.`;
}

function painWarningForExercise(exercise) {
  const areas = exercise.stressArea?.length ? exercise.stressArea.join(", ") : "the working area";
  return `If pain increases in ${areas}, switch to the easier version or contact your coach.`;
}

function youtubeEmbedUrl(url) {
  if (!url) return "";
  const text = String(url);
  const match = text.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

function buildAdjustedWorkout(originalWorkout, exercises, pain, adjustmentType) {
  if (!originalWorkout) return null;
  const volumeFactor = pain.hasPain && pain.painLevel1to10 >= 5 ? 0.6 : adjustmentType === "Lower Intensity" ? 0.75 : 0.5;
  const items = originalWorkout.items.map((item) => {
    const current = exercises.find((exercise) => exercise.id === item.exerciseId) || inferExerciseFromWorkoutItem(item);
    const stressesPain = pain.hasPain && pain.painLocations?.some((location) => current.stressArea?.includes(location));
    const tooHard = adjustmentType !== "Keep Same" && (current.difficulty === "Advanced" || current.highImpact || current.heavy);
    if (!stressesPain && !tooHard) return reduceItem(item, volumeFactor);
    const replacement = findReplacement(exercises, current, pain);
    return {
      ...reduceItem(item, volumeFactor),
      exerciseId: replacement?.id || current.safeAlternativeExerciseId || item.exerciseId,
      name: replacement?.name || item.name,
      replacementReason: replacementReason(current, pain, adjustmentType)
    };
  });
  return { ...clone(originalWorkout), items, adjusted: true, adjustmentType };
}

function findReplacement(exercises, current, pain) {
  const preferred = exercises.find((exercise) => exercise.id === current.safeAlternativeExerciseId) || exercises.find((exercise) => exercise.id === current.regressionExerciseId);
  if (preferred && current.replacementCategory !== "boxing") return preferred;
  const candidates = exercises.filter((exercise) => {
    const avoidsPain = !pain.painLocations?.some((location) => toArray(exercise.stressArea).includes(location));
    return avoidsPain && exercise.lowImpact && (exercise.recoveryAlternative || ["Beginner", "Intermediate"].includes(normalizeTrainingLevel(exercise.trainingLevel || exercise.planLevel))) && exercise.replacementCategory === current.replacementCategory;
  }).sort((a, b) => Number(Boolean(a.importedFromWorkbook)) - Number(Boolean(b.importedFromWorkbook)));
  return candidates[0] || preferred;
}

function inferExerciseFromWorkoutItem(item) {
  const name = item.name || item.exerciseName || "";
  const text = name.toLowerCase();
  const stressArea = [];
  if (/deadlift|hinge|twist|sit-up|burpee/.test(text)) stressArea.push("Lower back");
  if (/jump|sprint|lunge|squat|rope/.test(text)) stressArea.push("Knee", "Ankle");
  if (/bag|punch|press|push|rope|overhead/.test(text)) stressArea.push("Shoulder", "Wrist");
  return {
    ...item,
    name,
    stressArea,
    replacementCategory: replacementCategoryFromText(text),
    safeAlternativeExerciseId: /deadlift|hinge/.test(text) ? "glute_bridge" : null,
    highImpact: /jump|sprint|burpee|rope/.test(text),
    heavy: /deadlift|heavy|barbell/.test(text),
    difficulty: /heavy|advanced|power/.test(text) ? "Advanced" : "Intermediate"
  };
}

function replacementCategoryFromText(text) {
  if (/deadlift|hinge|bridge/.test(text)) return "hinge";
  if (/lunge|step/.test(text)) return "lunge";
  if (/squat|sit-to-stand/.test(text)) return "squat";
  if (/push|press/.test(text)) return "push";
  if (/row|pull/.test(text)) return "pull";
  if (/core|plank|bug|sit-up/.test(text)) return "core";
  if (/bag|shadow|boxing|punch/.test(text)) return "boxing";
  if (/jump|sprint|rope|march|bike|walk/.test(text)) return "conditioning";
  return "general";
}

function reduceItem(item, factor) {
  return {
    ...item,
    sets: item.sets ? Math.max(1, Math.round(item.sets * factor)) : item.sets,
    reps: item.reps ? Math.max(1, Math.round(item.reps * factor)) : item.reps,
    time: item.time ? Math.max(1, Math.round(item.time * factor)) : item.time,
    rounds: item.rounds ? Math.max(1, Math.round(item.rounds * factor)) : item.rounds,
    rest: item.rest ? Math.round(item.rest * 1.4) : item.rest
  };
}

function replacementReason(exercise, pain, adjustmentType) {
  if (pain.hasPain) return `${exercise.name} stresses ${pain.painLocations.join(", ")} during a ${pain.painLevel1to10}/10 pain check-in.`;
  return `${exercise.name} was regressed for ${adjustmentType}.`;
}

function withPainFreeNote(workout, pain) {
  if (!workout) return null;
  if (!pain.hasPain || pain.painLevel1to10 > 2) return clone(workout);
  return { ...clone(workout), coachNote: "Use pain-free range and clean form today." };
}

function hasDangerousPain(pain, input) {
  if (!pain.hasPain) return false;
  const types = new Set(pain.painType || []);
  const locations = new Set(pain.painLocations || []);
  const dangerousTypes = ["Numbness", "Tingling", "Dizziness", "Faint feeling", "Breathing issue"];
  if (locations.has("Chest")) return true;
  if (dangerousTypes.some((type) => types.has(type))) return true;
  if (types.has("Sharp") && types.has("Swollen")) return true;
  if (locations.has("Head") && types.has("Dizziness")) return true;
  return input.feelsSafeToTrain === false || pain.feelsSafeToTrain === false;
}

function recommendationFor(dailyCheckIn) {
  const map = {
    "Recovery Version": "Use low-impact mobility, light technique, pain-free movement, longer rest, and reduced sets/reps/time.",
    "Lower Intensity": "Keep the theme, lower total volume, use easier variations, and add longer rest.",
    "Recovery Focus": "Use simple controlled movement, breathing work, easy cardio, and mobility.",
    "Coach Review Needed": "Lock the workout and message the coach before training."
  };
  return map[dailyCheckIn.dailyAdjustment] || "Review check-in and decide whether to keep today's workout.";
}

function poorDailyTrend(store, clientId) {
  return store.dailyCheckIns.filter((item) => item.clientId === clientId).slice(-3).filter((item) => ["Recovery Version", "Coach Review Needed", "Lower Intensity"].includes(item.dailyAdjustment)).length;
}

function missedWorkoutTrend(store, clientId) {
  return store.workoutCompletions.filter((item) => item.clientId === clientId && item.completed === false).slice(-3).length;
}

function severityRank(severity) {
  return { None: 0, Mild: 1, Moderate: 2, Serious: 3 }[severity] || 0;
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function makeId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function nextMonthLabel() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().slice(0, 7);
}

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}
