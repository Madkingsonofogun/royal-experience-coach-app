export const workbookAssessmentTemplates = [
  {
    "id": "assessment_template_general_fitness",
    "templateName": "General Fitness Assessment Template",
    "sportFocus": "General Fitness",
    "goal": "Overall fitness and safe movement",
    "movementTestIds": [
      "squat",
      "standing",
      "hinge",
      "hipMobility",
      "lunge",
      "balance",
      "push",
      "pull",
      "core",
      "conditioning",
      "shoulderMobility",
      "rom",
      "ankleMobility",
      "pain",
      "breathing"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Overall fitness and safe movement",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Movement",
        "testName": "Chair Sit-to-Stand / Squat Pattern",
        "purpose": "Lower-body strength, knee control, hip control, and squat readiness.",
        "setup": "Stable chair; feet flat, hip to shoulder width; sit tall.",
        "clientAction": "Stand up under control, reach tall posture, then slowly sit down. Use hands only if needed.",
        "coachLooksFor": "Feet stay flat, knees track toes, controlled lowering, no sharp pain, no loss of balance.",
        "redFlags": "Knee cave, heels lifting, sharp knee/hip/back pain, falling into chair.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Lower-body strength, chair squats, supported sit-to-stand, glute bridges, step-ups.",
        "systemTags": [
          "Squat"
        ],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Hip Hinge / Back-Safe Bend Pattern",
        "purpose": "Back-safe bending, hip control, glute/hamstring loading.",
        "setup": "Stand tall, soft knees, hands on thighs/shins.",
        "clientAction": "Push hips back like closing a car door, keep spine controlled, return tall.",
        "coachLooksFor": "Hips move first, spine neutral, soft knees, hamstrings/glutes engage, no sharp back pain.",
        "redFlags": "Low-back rounding, pain, balance loss, bending only from spine.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall hinge, dowel hinge, glute bridges, hamstring mobility, core bracing.",
        "systemTags": [
          "Hinge"
        ],
        "matchedMovementTestIds": [
          "hinge",
          "hipMobility"
        ]
      },
      {
        "area": "Movement",
        "testName": "Step-Back Lunge / Supported Split Stance",
        "purpose": "Single-leg strength, balance, knee/hip stability.",
        "setup": "Stand near wall/chair; start with small step-back or split stance.",
        "clientAction": "Step one foot back and lower only as far as pain-free; use support if needed.",
        "coachLooksFor": "Front knee tracks toes, torso tall, controlled return, no sharp pain.",
        "redFlags": "Knee cave, unsafe wobble, sharp knee/hip/ankle pain, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported split squats, shallow lunges, step-ups, glute stability.",
        "systemTags": [
          "Lunge"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Push Ability: Wall / Incline / Floor Push-Up",
        "purpose": "Upper-body pushing strength, shoulder control, wrist tolerance.",
        "setup": "Start wall, then incline, then floor only if appropriate.",
        "clientAction": "Perform 3-5 controlled push-ups at the safest level.",
        "coachLooksFor": "Body straight, elbows safe, shoulders controlled, no wrist/shoulder pain.",
        "redFlags": "Hips sagging, shoulder/wrist pain, excessive elbow flare, uncontrolled lowering.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall push-ups, incline push-ups, shoulder stability, core bracing.",
        "systemTags": [
          "Push"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Movement",
        "testName": "Pull Ability: Band Row / Cable Row / Table Row",
        "purpose": "Upper-back strength, posture, scapular control.",
        "setup": "Use band, cable, TRX/ring row, or safe table row.",
        "clientAction": "Pull elbows back while chest stays lifted and shoulders stay down.",
        "coachLooksFor": "Shoulder blades move back, neck relaxed, posture tall, no shoulder pain.",
        "redFlags": "Neck shrug, shoulder pain, ribs flare, jerky movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Band rows, seated rows, scapular control, posture work.",
        "systemTags": [
          "Pull"
        ],
        "matchedMovementTestIds": [
          "pull"
        ]
      },
      {
        "area": "Movement",
        "testName": "Core Brace: Dead Bug / Modified Plank",
        "purpose": "Trunk control, breathing under tension, spine stability.",
        "setup": "Choose dead bug, knee plank, elevated plank, or standing brace.",
        "clientAction": "Brace the core and breathe while holding position or doing slow reps.",
        "coachLooksFor": "Ribs down, breathing controlled, hips do not sag, no low-back pain.",
        "redFlags": "Back pain, breath-holding, sagging hips, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Dead bug, bird dog, modified plank, breathing brace, Pallof press.",
        "systemTags": [
          "Core"
        ],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Movement",
        "testName": "Single-Leg Balance / Supported Step-Up",
        "purpose": "Balance, ankle stability, hip control, fall-risk screen.",
        "setup": "Stand near support; use feet together, staggered, single-leg, or low step-up.",
        "clientAction": "Balance 10-20 seconds or perform controlled low step-ups.",
        "coachLooksFor": "Foot/ankle control, knee aligned, hip level, safe recovery from wobble.",
        "redFlags": "Grabbing support suddenly, dizziness, knee cave, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported balance, step taps, low step-ups, ankle and hip stability.",
        "systemTags": [
          "Balance"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "March Test / 3-Minute Low-Impact Cardio",
        "purpose": "Basic cardio tolerance, breathing, and recovery.",
        "setup": "March in place, walk, step touch, shadowbox, or use bike.",
        "clientAction": "Move at easy/moderate pace for up to 3 minutes.",
        "coachLooksFor": "Can keep moving, speak short sentences, no chest pain/dizziness, recovers after stopping.",
        "redFlags": "Chest pain, dizziness, severe breathlessness, cannot recover.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Low-impact intervals, short rounds, longer rest, gradual conditioning.",
        "systemTags": [
          "Conditioning"
        ],
        "matchedMovementTestIds": [
          "balance",
          "conditioning"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Shoulder Reach Overhead",
        "purpose": "Shoulder mobility, rib control, overhead tolerance.",
        "setup": "Stand or sit tall, thumbs up if comfortable.",
        "clientAction": "Raise both arms overhead slowly without forcing range.",
        "coachLooksFor": "Reach without pain, no excessive shrugging/back arching, side differences noted.",
        "redFlags": "Sharp shoulder pain, numbness/tingling, major shrugging, cannot lift arm.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall slides, band pull-aparts, scapular control, shoulder-friendly pushing.",
        "systemTags": [
          "Shoulder"
        ],
        "matchedMovementTestIds": [
          "push",
          "shoulderMobility",
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Hip Mobility: Seated Rotation / 90-90 Option",
        "purpose": "Hip range, rotation, and lower-body movement readiness.",
        "setup": "Seated hip rotation or 90/90 only if safe getting down/up.",
        "clientAction": "Rotate hips gently through pain-free range.",
        "coachLooksFor": "No pinching, no sharp pain, low-back compensation limited.",
        "redFlags": "Hip pinching, knee pain, cannot sit safely, major asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Seated hip drills, glute activation, 90/90 regression, low-impact lower body.",
        "systemTags": [
          "Hip"
        ],
        "matchedMovementTestIds": [
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Ankle Mobility / Calf Raise Ability",
        "purpose": "Ankle range, calf strength, foot control, step mechanics.",
        "setup": "Stand near support; calf raises or knee-over-toe range check.",
        "clientAction": "Lift/lower heels or move knee gently over toes in pain-free range.",
        "coachLooksFor": "Controlled heel lift/lower, ankle does not collapse, no Achilles/calf pain.",
        "redFlags": "Ankle pain, foot collapse, balance unsafe, cannot lift heel.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Calf raises, ankle rocks, supported balance, step mechanics.",
        "systemTags": [
          "Ankle"
        ],
        "matchedMovementTestIds": [
          "balance",
          "hipMobility",
          "ankleMobility",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Pain Level During Basic Movement",
        "purpose": "Pain response during easy movement.",
        "setup": "Use easiest safe movement: walk, march, chair squat, shoulder reach, or supported drill.",
        "clientAction": "Report pain during and after movement on 1-10 scale, then coach scores 0-5 for system.",
        "coachLooksFor": "Pain stays low, not sharp, not radiating, not increasing.",
        "redFlags": "Sharp pain, radiating pain, numbness/tingling, pain 7+, altered movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Recovery mode, pain-free range, low impact, longer rest, medical clearance if severe.",
        "systemTags": [
          "Pain"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Standing Tolerance",
        "purpose": "Ability to handle standing workouts or need chair/supported training.",
        "setup": "Stand or lightly march with support nearby.",
        "clientAction": "Stand/march 1-5 minutes depending on ability.",
        "coachLooksFor": "Posture, breathing, pain level, balance, fatigue.",
        "redFlags": "Dizziness, leg weakness, pain spike, unsafe fatigue, needs to sit immediately.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Chair workouts, seated strength, pool workouts, shorter standing blocks.",
        "systemTags": [
          "Standing"
        ],
        "matchedMovementTestIds": [
          "pain",
          "standing",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Breathing Tolerance During Light Movement",
        "purpose": "Breathing and recovery during easy training.",
        "setup": "Use walking, marching, step touches, or light shadowboxing.",
        "clientAction": "Move lightly while coach checks breathing and recovery.",
        "coachLooksFor": "Can talk in short sentences, no chest pain/dizziness, recovers normally.",
        "redFlags": "Chest pain, dizziness, faint feeling, severe breathlessness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short rounds, longer rest, low-impact intervals, breathing drills.",
        "systemTags": [
          "Breathing"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "pain",
          "standing",
          "breathing",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Range of Motion Limitation Check",
        "purpose": "Joint restrictions affecting exercise selection.",
        "setup": "Move shoulders, hips, knees, ankles, spine, and wrists through comfortable range.",
        "clientAction": "Move each area gently through pain-free range.",
        "coachLooksFor": "Major limitations, pain, asymmetries, painful positions.",
        "redFlags": "Sharp pain, numbness/tingling, cannot move joint, severe asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Mobility work, safer alternatives, modified range, avoid painful positions.",
        "systemTags": [
          "ROM"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  },
  {
    "id": "assessment_template_boxing",
    "templateName": "Boxing Assessment Template",
    "sportFocus": "Boxing",
    "goal": "Boxing skill readiness and conditioning",
    "movementTestIds": [
      "balance",
      "push",
      "shoulderMobility",
      "standing",
      "ankleMobility",
      "conditioning",
      "pull",
      "core",
      "lunge",
      "hipMobility",
      "rom",
      "pain",
      "breathing",
      "squat"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Boxing skill readiness and conditioning",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Sport Skill",
        "testName": "Boxing Stance Test",
        "purpose": "Checks stance, balance, guard, and readiness for boxing movement.",
        "setup": "Client stands in boxing stance with hands up and knees soft.",
        "clientAction": "Hold stance, shift weight, and reset stance without crossing feet.",
        "coachLooksFor": "Feet shoulder-width, knees soft, chin tucked, hands up, balance, no crossing feet.",
        "redFlags": "Crossing feet, locked knees, poor balance, chin exposed, pain.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Stance holds, mirror stance drills, step-and-reset, balance work.",
        "systemTags": [
          "Boxing Stance"
        ],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Guard Position Test",
        "purpose": "Checks defensive hand position, shoulder comfort, and posture.",
        "setup": "Client stands in stance with hands at guard.",
        "clientAction": "Hold guard for 30-60 seconds while breathing.",
        "coachLooksFor": "Hands protect face, elbows relaxed, shoulders not shrugged, chin protected.",
        "redFlags": "Shoulder pain, hands dropping, excessive shrugging, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Guard holds, shoulder endurance, posture drills.",
        "systemTags": [
          "Guard"
        ],
        "matchedMovementTestIds": [
          "push",
          "shoulderMobility",
          "standing"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Footwork Baseline",
        "purpose": "Tests forward/back/side steps while keeping stance.",
        "setup": "Use open space or line on floor.",
        "clientAction": "Step forward, back, left, right, then reset stance.",
        "coachLooksFor": "No crossing feet, controlled steps, stance width, balance, reset ability.",
        "redFlags": "Crossing feet, stumbling, unsafe balance, knee/ankle pain.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Step-and-reset drills, line drills, slow footwork.",
        "systemTags": [
          "Footwork"
        ],
        "matchedMovementTestIds": [
          "balance",
          "ankleMobility"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Jab Mechanics",
        "purpose": "Tests lead-hand punch control, shoulder safety, and balance.",
        "setup": "Boxing stance, light shadowboxing pace.",
        "clientAction": "Throw controlled jabs and return hand to guard.",
        "coachLooksFor": "Extension, shoulder protects chin, hand return, balance, wrist alignment.",
        "redFlags": "Wrist collapse, shoulder pain, overreaching, hand drops.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Slow jab drill, mirror jab, wall jab, band jab if ready.",
        "systemTags": [
          "Jab"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Cross Mechanics",
        "purpose": "Tests rear-hand punch mechanics, rotation, and core control.",
        "setup": "Boxing stance; no full power during assessment.",
        "clientAction": "Throw controlled cross with safe rotation, then return to guard.",
        "coachLooksFor": "Rear side rotation, guard recovery, controlled pivot if ready, no back/shoulder pain.",
        "redFlags": "Back pain, over-rotation, losing stance, wrist/shoulder pain.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Slow cross mechanics, hip rotation drill, no-power cross.",
        "systemTags": [
          "Cross"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Jab-Cross Combination",
        "purpose": "Tests coordination and ability to connect basic punches.",
        "setup": "Boxing stance, mirror or shadowboxing.",
        "clientAction": "Throw jab-cross slowly, breathe, reset guard.",
        "coachLooksFor": "Balance after combo, breathing, hand return, no rushing.",
        "redFlags": "Falling forward, hands dropping, breath-holding, pain.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Single punches, slow-count combos, stance reset.",
        "systemTags": [
          "Combo"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Boxing Conditioning Round",
        "purpose": "Tests ability to keep form while tired.",
        "setup": "Shadowboxing or bag work if equipment available.",
        "clientAction": "Perform 1-3 minutes light boxing movement.",
        "coachLooksFor": "Breathing, form breakdown, footwork, recovery after round.",
        "redFlags": "Chest pain, dizziness, severe breathlessness, unsafe fatigue.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Shorter rounds, longer rest, low-impact boxing drills.",
        "systemTags": [
          "Boxing Conditioning"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Movement",
        "testName": "Push Ability: Wall / Incline / Floor Push-Up",
        "purpose": "Upper-body pushing strength, shoulder control, wrist tolerance.",
        "setup": "Start wall, then incline, then floor only if appropriate.",
        "clientAction": "Perform 3-5 controlled push-ups at the safest level.",
        "coachLooksFor": "Body straight, elbows safe, shoulders controlled, no wrist/shoulder pain.",
        "redFlags": "Hips sagging, shoulder/wrist pain, excessive elbow flare, uncontrolled lowering.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall push-ups, incline push-ups, shoulder stability, core bracing.",
        "systemTags": [
          "Push"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Movement",
        "testName": "Pull Ability: Band Row / Cable Row / Table Row",
        "purpose": "Upper-back strength, posture, scapular control.",
        "setup": "Use band, cable, TRX/ring row, or safe table row.",
        "clientAction": "Pull elbows back while chest stays lifted and shoulders stay down.",
        "coachLooksFor": "Shoulder blades move back, neck relaxed, posture tall, no shoulder pain.",
        "redFlags": "Neck shrug, shoulder pain, ribs flare, jerky movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Band rows, seated rows, scapular control, posture work.",
        "systemTags": [
          "Pull"
        ],
        "matchedMovementTestIds": [
          "pull"
        ]
      },
      {
        "area": "Movement",
        "testName": "Core Brace: Dead Bug / Modified Plank",
        "purpose": "Trunk control, breathing under tension, spine stability.",
        "setup": "Choose dead bug, knee plank, elevated plank, or standing brace.",
        "clientAction": "Brace the core and breathe while holding position or doing slow reps.",
        "coachLooksFor": "Ribs down, breathing controlled, hips do not sag, no low-back pain.",
        "redFlags": "Back pain, breath-holding, sagging hips, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Dead bug, bird dog, modified plank, breathing brace, Pallof press.",
        "systemTags": [
          "Core"
        ],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Movement",
        "testName": "Single-Leg Balance / Supported Step-Up",
        "purpose": "Balance, ankle stability, hip control, fall-risk screen.",
        "setup": "Stand near support; use feet together, staggered, single-leg, or low step-up.",
        "clientAction": "Balance 10-20 seconds or perform controlled low step-ups.",
        "coachLooksFor": "Foot/ankle control, knee aligned, hip level, safe recovery from wobble.",
        "redFlags": "Grabbing support suddenly, dizziness, knee cave, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported balance, step taps, low step-ups, ankle and hip stability.",
        "systemTags": [
          "Balance"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Shoulder Reach Overhead",
        "purpose": "Shoulder mobility, rib control, overhead tolerance.",
        "setup": "Stand or sit tall, thumbs up if comfortable.",
        "clientAction": "Raise both arms overhead slowly without forcing range.",
        "coachLooksFor": "Reach without pain, no excessive shrugging/back arching, side differences noted.",
        "redFlags": "Sharp shoulder pain, numbness/tingling, major shrugging, cannot lift arm.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall slides, band pull-aparts, scapular control, shoulder-friendly pushing.",
        "systemTags": [
          "Shoulder"
        ],
        "matchedMovementTestIds": [
          "push",
          "shoulderMobility",
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Pain Level During Basic Movement",
        "purpose": "Pain response during easy movement.",
        "setup": "Use easiest safe movement: walk, march, chair squat, shoulder reach, or supported drill.",
        "clientAction": "Report pain during and after movement on 1-10 scale, then coach scores 0-5 for system.",
        "coachLooksFor": "Pain stays low, not sharp, not radiating, not increasing.",
        "redFlags": "Sharp pain, radiating pain, numbness/tingling, pain 7+, altered movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Recovery mode, pain-free range, low impact, longer rest, medical clearance if severe.",
        "systemTags": [
          "Pain"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Breathing Tolerance During Light Movement",
        "purpose": "Breathing and recovery during easy training.",
        "setup": "Use walking, marching, step touches, or light shadowboxing.",
        "clientAction": "Move lightly while coach checks breathing and recovery.",
        "coachLooksFor": "Can talk in short sentences, no chest pain/dizziness, recovers normally.",
        "redFlags": "Chest pain, dizziness, faint feeling, severe breathlessness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short rounds, longer rest, low-impact intervals, breathing drills.",
        "systemTags": [
          "Breathing"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "pain",
          "standing",
          "breathing",
          "rom"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  },
  {
    "id": "assessment_template_kickboxing",
    "templateName": "Kickboxing Assessment Template",
    "sportFocus": "Kickboxing",
    "goal": "Kickboxing skill, hip mobility, balance, and conditioning",
    "movementTestIds": [
      "balance",
      "hipMobility",
      "conditioning",
      "push",
      "core",
      "lunge",
      "standing",
      "rom",
      "ankleMobility",
      "pain",
      "breathing",
      "squat"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Kickboxing skill, hip mobility, balance, and conditioning",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Sport Skill",
        "testName": "Kickboxing Stance Test",
        "purpose": "Checks stance, balance, guard, and weight shifting.",
        "setup": "Client stands in kickboxing stance near support if needed.",
        "clientAction": "Hold stance and shift weight front/back without losing balance.",
        "coachLooksFor": "Balanced stance, hands up, knees soft, safe weight shift.",
        "redFlags": "Wobbling, crossing feet, knee/ankle pain, guard drops.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Stance holds, slow step drills, supported balance.",
        "systemTags": [
          "Kickboxing Stance"
        ],
        "matchedMovementTestIds": [
          "balance",
          "hipMobility"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Front Kick Readiness",
        "purpose": "Tests hip flexion, balance, knee control, and safe kicking mechanics.",
        "setup": "Stand near wall/chair; use knee lift if kick is not safe.",
        "clientAction": "Perform controlled knee lift or slow front kick and return foot safely.",
        "coachLooksFor": "Balance, chamber, controlled extension, safe return, no hip/knee pain.",
        "redFlags": "Unsafe wobble, hip/knee pain, snapping uncontrolled, falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Knee lifts, supported front kick, hip mobility, balance drills.",
        "systemTags": [
          "Front Kick"
        ],
        "matchedMovementTestIds": [
          "balance",
          "hipMobility"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Round Kick Readiness",
        "purpose": "Tests hip rotation, pivot ability, and lower-body control.",
        "setup": "Slow chamber/turnover drill, not full power for beginners.",
        "clientAction": "Practice round-kick chamber/turnover or low kick prep slowly.",
        "coachLooksFor": "Hip mobility, pivot control, knee/ankle safety, balance.",
        "redFlags": "Knee pain, hip pinching, ankle pain, unsafe pivot, falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Hip openers, chamber drills, low kick prep, pivot progressions.",
        "systemTags": [
          "Round Kick"
        ],
        "matchedMovementTestIds": [
          "balance",
          "conditioning",
          "hipMobility"
        ]
      },
      {
        "area": "Sport Skill",
        "testName": "Knee Strike Readiness",
        "purpose": "Tests hip drive, core control, and balance.",
        "setup": "Stand in kickboxing stance near support if needed.",
        "clientAction": "Perform slow knee lift or controlled knee strike.",
        "coachLooksFor": "Posture, hip drive, core control, balance, safe foot return.",
        "redFlags": "Back pain, hip pain, balance loss, uncontrolled movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported knee lifts, core control, hip flexor strength.",
        "systemTags": [
          "Knee Strike"
        ],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Kickboxing Conditioning Round",
        "purpose": "Tests punch-kick coordination and conditioning.",
        "setup": "Shadowboxing or bag/pad work depending on equipment.",
        "clientAction": "Perform 1-3 minutes light kickboxing with punches/knees/kicks.",
        "coachLooksFor": "Breathing, technique, balance, safe recovery, no pain spikes.",
        "redFlags": "Dizziness, chest pain, high knee/hip/ankle pain, severe fatigue.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short rounds, low kicks, no jumping, longer rest.",
        "systemTags": [
          "Kickboxing Conditioning"
        ],
        "matchedMovementTestIds": [
          "balance",
          "conditioning",
          "hipMobility"
        ]
      },
      {
        "area": "Movement",
        "testName": "Push Ability: Wall / Incline / Floor Push-Up",
        "purpose": "Upper-body pushing strength, shoulder control, wrist tolerance.",
        "setup": "Start wall, then incline, then floor only if appropriate.",
        "clientAction": "Perform 3-5 controlled push-ups at the safest level.",
        "coachLooksFor": "Body straight, elbows safe, shoulders controlled, no wrist/shoulder pain.",
        "redFlags": "Hips sagging, shoulder/wrist pain, excessive elbow flare, uncontrolled lowering.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall push-ups, incline push-ups, shoulder stability, core bracing.",
        "systemTags": [
          "Push"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Movement",
        "testName": "Core Brace: Dead Bug / Modified Plank",
        "purpose": "Trunk control, breathing under tension, spine stability.",
        "setup": "Choose dead bug, knee plank, elevated plank, or standing brace.",
        "clientAction": "Brace the core and breathe while holding position or doing slow reps.",
        "coachLooksFor": "Ribs down, breathing controlled, hips do not sag, no low-back pain.",
        "redFlags": "Back pain, breath-holding, sagging hips, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Dead bug, bird dog, modified plank, breathing brace, Pallof press.",
        "systemTags": [
          "Core"
        ],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Movement",
        "testName": "Single-Leg Balance / Supported Step-Up",
        "purpose": "Balance, ankle stability, hip control, fall-risk screen.",
        "setup": "Stand near support; use feet together, staggered, single-leg, or low step-up.",
        "clientAction": "Balance 10-20 seconds or perform controlled low step-ups.",
        "coachLooksFor": "Foot/ankle control, knee aligned, hip level, safe recovery from wobble.",
        "redFlags": "Grabbing support suddenly, dizziness, knee cave, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported balance, step taps, low step-ups, ankle and hip stability.",
        "systemTags": [
          "Balance"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Hip Mobility: Seated Rotation / 90-90 Option",
        "purpose": "Hip range, rotation, and lower-body movement readiness.",
        "setup": "Seated hip rotation or 90/90 only if safe getting down/up.",
        "clientAction": "Rotate hips gently through pain-free range.",
        "coachLooksFor": "No pinching, no sharp pain, low-back compensation limited.",
        "redFlags": "Hip pinching, knee pain, cannot sit safely, major asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Seated hip drills, glute activation, 90/90 regression, low-impact lower body.",
        "systemTags": [
          "Hip"
        ],
        "matchedMovementTestIds": [
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Ankle Mobility / Calf Raise Ability",
        "purpose": "Ankle range, calf strength, foot control, step mechanics.",
        "setup": "Stand near support; calf raises or knee-over-toe range check.",
        "clientAction": "Lift/lower heels or move knee gently over toes in pain-free range.",
        "coachLooksFor": "Controlled heel lift/lower, ankle does not collapse, no Achilles/calf pain.",
        "redFlags": "Ankle pain, foot collapse, balance unsafe, cannot lift heel.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Calf raises, ankle rocks, supported balance, step mechanics.",
        "systemTags": [
          "Ankle"
        ],
        "matchedMovementTestIds": [
          "balance",
          "hipMobility",
          "ankleMobility",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Pain Level During Basic Movement",
        "purpose": "Pain response during easy movement.",
        "setup": "Use easiest safe movement: walk, march, chair squat, shoulder reach, or supported drill.",
        "clientAction": "Report pain during and after movement on 1-10 scale, then coach scores 0-5 for system.",
        "coachLooksFor": "Pain stays low, not sharp, not radiating, not increasing.",
        "redFlags": "Sharp pain, radiating pain, numbness/tingling, pain 7+, altered movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Recovery mode, pain-free range, low impact, longer rest, medical clearance if severe.",
        "systemTags": [
          "Pain"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Breathing Tolerance During Light Movement",
        "purpose": "Breathing and recovery during easy training.",
        "setup": "Use walking, marching, step touches, or light shadowboxing.",
        "clientAction": "Move lightly while coach checks breathing and recovery.",
        "coachLooksFor": "Can talk in short sentences, no chest pain/dizziness, recovers normally.",
        "redFlags": "Chest pain, dizziness, faint feeling, severe breathlessness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short rounds, longer rest, low-impact intervals, breathing drills.",
        "systemTags": [
          "Breathing"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "pain",
          "standing",
          "breathing",
          "rom"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  },
  {
    "id": "assessment_template_fight_conditioning",
    "templateName": "Fight Conditioning Assessment Template",
    "sportFocus": "Fight Conditioning",
    "goal": "Fight-conditioning work capacity and circuit readiness",
    "movementTestIds": [
      "squat",
      "standing",
      "hinge",
      "hipMobility",
      "lunge",
      "balance",
      "push",
      "pull",
      "core",
      "conditioning",
      "breathing",
      "pain",
      "rom",
      "ankleMobility"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Fight-conditioning work capacity and circuit readiness",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Movement",
        "testName": "Chair Sit-to-Stand / Squat Pattern",
        "purpose": "Lower-body strength, knee control, hip control, and squat readiness.",
        "setup": "Stable chair; feet flat, hip to shoulder width; sit tall.",
        "clientAction": "Stand up under control, reach tall posture, then slowly sit down. Use hands only if needed.",
        "coachLooksFor": "Feet stay flat, knees track toes, controlled lowering, no sharp pain, no loss of balance.",
        "redFlags": "Knee cave, heels lifting, sharp knee/hip/back pain, falling into chair.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Lower-body strength, chair squats, supported sit-to-stand, glute bridges, step-ups.",
        "systemTags": [
          "Squat"
        ],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Hip Hinge / Back-Safe Bend Pattern",
        "purpose": "Back-safe bending, hip control, glute/hamstring loading.",
        "setup": "Stand tall, soft knees, hands on thighs/shins.",
        "clientAction": "Push hips back like closing a car door, keep spine controlled, return tall.",
        "coachLooksFor": "Hips move first, spine neutral, soft knees, hamstrings/glutes engage, no sharp back pain.",
        "redFlags": "Low-back rounding, pain, balance loss, bending only from spine.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall hinge, dowel hinge, glute bridges, hamstring mobility, core bracing.",
        "systemTags": [
          "Hinge"
        ],
        "matchedMovementTestIds": [
          "hinge",
          "hipMobility"
        ]
      },
      {
        "area": "Movement",
        "testName": "Step-Back Lunge / Supported Split Stance",
        "purpose": "Single-leg strength, balance, knee/hip stability.",
        "setup": "Stand near wall/chair; start with small step-back or split stance.",
        "clientAction": "Step one foot back and lower only as far as pain-free; use support if needed.",
        "coachLooksFor": "Front knee tracks toes, torso tall, controlled return, no sharp pain.",
        "redFlags": "Knee cave, unsafe wobble, sharp knee/hip/ankle pain, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported split squats, shallow lunges, step-ups, glute stability.",
        "systemTags": [
          "Lunge"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Push Ability: Wall / Incline / Floor Push-Up",
        "purpose": "Upper-body pushing strength, shoulder control, wrist tolerance.",
        "setup": "Start wall, then incline, then floor only if appropriate.",
        "clientAction": "Perform 3-5 controlled push-ups at the safest level.",
        "coachLooksFor": "Body straight, elbows safe, shoulders controlled, no wrist/shoulder pain.",
        "redFlags": "Hips sagging, shoulder/wrist pain, excessive elbow flare, uncontrolled lowering.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall push-ups, incline push-ups, shoulder stability, core bracing.",
        "systemTags": [
          "Push"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Movement",
        "testName": "Pull Ability: Band Row / Cable Row / Table Row",
        "purpose": "Upper-back strength, posture, scapular control.",
        "setup": "Use band, cable, TRX/ring row, or safe table row.",
        "clientAction": "Pull elbows back while chest stays lifted and shoulders stay down.",
        "coachLooksFor": "Shoulder blades move back, neck relaxed, posture tall, no shoulder pain.",
        "redFlags": "Neck shrug, shoulder pain, ribs flare, jerky movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Band rows, seated rows, scapular control, posture work.",
        "systemTags": [
          "Pull"
        ],
        "matchedMovementTestIds": [
          "pull"
        ]
      },
      {
        "area": "Movement",
        "testName": "Core Brace: Dead Bug / Modified Plank",
        "purpose": "Trunk control, breathing under tension, spine stability.",
        "setup": "Choose dead bug, knee plank, elevated plank, or standing brace.",
        "clientAction": "Brace the core and breathe while holding position or doing slow reps.",
        "coachLooksFor": "Ribs down, breathing controlled, hips do not sag, no low-back pain.",
        "redFlags": "Back pain, breath-holding, sagging hips, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Dead bug, bird dog, modified plank, breathing brace, Pallof press.",
        "systemTags": [
          "Core"
        ],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Movement",
        "testName": "Single-Leg Balance / Supported Step-Up",
        "purpose": "Balance, ankle stability, hip control, fall-risk screen.",
        "setup": "Stand near support; use feet together, staggered, single-leg, or low step-up.",
        "clientAction": "Balance 10-20 seconds or perform controlled low step-ups.",
        "coachLooksFor": "Foot/ankle control, knee aligned, hip level, safe recovery from wobble.",
        "redFlags": "Grabbing support suddenly, dizziness, knee cave, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported balance, step taps, low step-ups, ankle and hip stability.",
        "systemTags": [
          "Balance"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Round-Based Conditioning Test",
        "purpose": "Tests work capacity, pace, and recovery in a round format.",
        "setup": "Choose safe station: shadowboxing, step-ups, bike, ropes, or bag.",
        "clientAction": "Perform 1-3 minutes of light/moderate conditioning.",
        "coachLooksFor": "Breathing, pace, fatigue, form breakdown, recovery after round.",
        "redFlags": "Chest pain, dizziness, severe breathlessness, form collapse.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Shorter rounds, longer rest, low-impact conditioning.",
        "systemTags": [
          "Round Conditioning"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Circuit Readiness Test",
        "purpose": "Tests movement quality under light fatigue.",
        "setup": "Build short circuit with safe movements.",
        "clientAction": "Perform short circuit: step/march, push variation, core, shadowbox.",
        "coachLooksFor": "Can transition safely, maintain form, breathe, and recover.",
        "redFlags": "Unsafe transitions, pain, dizziness, fatigue causes poor form.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Simple circuits, fewer stations, longer rest.",
        "systemTags": [
          "Circuit"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Impact Readiness Screen",
        "purpose": "Checks readiness for jumping, fast footwork, or need for low impact.",
        "setup": "Use tiny hops or fast step drill only if safe.",
        "clientAction": "Perform low-impact steps or small hops if appropriate.",
        "coachLooksFor": "Knee/ankle control, balance, safe landing, pain-free movement.",
        "redFlags": "Knee/ankle pain, unsafe landing, balance loss, fear.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Low-impact conditioning, step touches, bike, no jumping.",
        "systemTags": [
          "Impact"
        ],
        "matchedMovementTestIds": [
          "balance",
          "conditioning"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Recovery Between Rounds",
        "purpose": "Checks how quickly breathing/control return after effort.",
        "setup": "After a short round, rest and observe recovery.",
        "clientAction": "Recover while breathing normally and standing/sitting safely.",
        "coachLooksFor": "Breathing slows, posture returns, client can talk, no dizziness.",
        "redFlags": "Cannot recover, chest pain, dizziness, panic breathing.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Longer rest intervals, breathwork, lower intensity.",
        "systemTags": [
          "Recovery"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "breathing"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Pain Level During Basic Movement",
        "purpose": "Pain response during easy movement.",
        "setup": "Use easiest safe movement: walk, march, chair squat, shoulder reach, or supported drill.",
        "clientAction": "Report pain during and after movement on 1-10 scale, then coach scores 0-5 for system.",
        "coachLooksFor": "Pain stays low, not sharp, not radiating, not increasing.",
        "redFlags": "Sharp pain, radiating pain, numbness/tingling, pain 7+, altered movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Recovery mode, pain-free range, low impact, longer rest, medical clearance if severe.",
        "systemTags": [
          "Pain"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Breathing Tolerance During Light Movement",
        "purpose": "Breathing and recovery during easy training.",
        "setup": "Use walking, marching, step touches, or light shadowboxing.",
        "clientAction": "Move lightly while coach checks breathing and recovery.",
        "coachLooksFor": "Can talk in short sentences, no chest pain/dizziness, recovers normally.",
        "redFlags": "Chest pain, dizziness, faint feeling, severe breathlessness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short rounds, longer rest, low-impact intervals, breathing drills.",
        "systemTags": [
          "Breathing"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "pain",
          "standing",
          "breathing",
          "rom"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  },
  {
    "id": "assessment_template_strength",
    "templateName": "Strength Assessment Template",
    "sportFocus": "Strength",
    "goal": "Strength readiness, bracing, and progressive resistance",
    "movementTestIds": [
      "squat",
      "standing",
      "hinge",
      "hipMobility",
      "push",
      "pull",
      "core",
      "lunge",
      "balance",
      "shoulderMobility",
      "rom",
      "ankleMobility",
      "pain",
      "conditioning",
      "breathing"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Strength readiness, bracing, and progressive resistance",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Movement",
        "testName": "Chair Sit-to-Stand / Squat Pattern",
        "purpose": "Lower-body strength, knee control, hip control, and squat readiness.",
        "setup": "Stable chair; feet flat, hip to shoulder width; sit tall.",
        "clientAction": "Stand up under control, reach tall posture, then slowly sit down. Use hands only if needed.",
        "coachLooksFor": "Feet stay flat, knees track toes, controlled lowering, no sharp pain, no loss of balance.",
        "redFlags": "Knee cave, heels lifting, sharp knee/hip/back pain, falling into chair.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Lower-body strength, chair squats, supported sit-to-stand, glute bridges, step-ups.",
        "systemTags": [
          "Squat"
        ],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Hip Hinge / Back-Safe Bend Pattern",
        "purpose": "Back-safe bending, hip control, glute/hamstring loading.",
        "setup": "Stand tall, soft knees, hands on thighs/shins.",
        "clientAction": "Push hips back like closing a car door, keep spine controlled, return tall.",
        "coachLooksFor": "Hips move first, spine neutral, soft knees, hamstrings/glutes engage, no sharp back pain.",
        "redFlags": "Low-back rounding, pain, balance loss, bending only from spine.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall hinge, dowel hinge, glute bridges, hamstring mobility, core bracing.",
        "systemTags": [
          "Hinge"
        ],
        "matchedMovementTestIds": [
          "hinge",
          "hipMobility"
        ]
      },
      {
        "area": "Movement",
        "testName": "Push Ability: Wall / Incline / Floor Push-Up",
        "purpose": "Upper-body pushing strength, shoulder control, wrist tolerance.",
        "setup": "Start wall, then incline, then floor only if appropriate.",
        "clientAction": "Perform 3-5 controlled push-ups at the safest level.",
        "coachLooksFor": "Body straight, elbows safe, shoulders controlled, no wrist/shoulder pain.",
        "redFlags": "Hips sagging, shoulder/wrist pain, excessive elbow flare, uncontrolled lowering.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall push-ups, incline push-ups, shoulder stability, core bracing.",
        "systemTags": [
          "Push"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Movement",
        "testName": "Pull Ability: Band Row / Cable Row / Table Row",
        "purpose": "Upper-back strength, posture, scapular control.",
        "setup": "Use band, cable, TRX/ring row, or safe table row.",
        "clientAction": "Pull elbows back while chest stays lifted and shoulders stay down.",
        "coachLooksFor": "Shoulder blades move back, neck relaxed, posture tall, no shoulder pain.",
        "redFlags": "Neck shrug, shoulder pain, ribs flare, jerky movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Band rows, seated rows, scapular control, posture work.",
        "systemTags": [
          "Pull"
        ],
        "matchedMovementTestIds": [
          "pull"
        ]
      },
      {
        "area": "Movement",
        "testName": "Core Brace: Dead Bug / Modified Plank",
        "purpose": "Trunk control, breathing under tension, spine stability.",
        "setup": "Choose dead bug, knee plank, elevated plank, or standing brace.",
        "clientAction": "Brace the core and breathe while holding position or doing slow reps.",
        "coachLooksFor": "Ribs down, breathing controlled, hips do not sag, no low-back pain.",
        "redFlags": "Back pain, breath-holding, sagging hips, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Dead bug, bird dog, modified plank, breathing brace, Pallof press.",
        "systemTags": [
          "Core"
        ],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Movement",
        "testName": "Step-Back Lunge / Supported Split Stance",
        "purpose": "Single-leg strength, balance, knee/hip stability.",
        "setup": "Stand near wall/chair; start with small step-back or split stance.",
        "clientAction": "Step one foot back and lower only as far as pain-free; use support if needed.",
        "coachLooksFor": "Front knee tracks toes, torso tall, controlled return, no sharp pain.",
        "redFlags": "Knee cave, unsafe wobble, sharp knee/hip/ankle pain, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported split squats, shallow lunges, step-ups, glute stability.",
        "systemTags": [
          "Lunge"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Shoulder Reach Overhead",
        "purpose": "Shoulder mobility, rib control, overhead tolerance.",
        "setup": "Stand or sit tall, thumbs up if comfortable.",
        "clientAction": "Raise both arms overhead slowly without forcing range.",
        "coachLooksFor": "Reach without pain, no excessive shrugging/back arching, side differences noted.",
        "redFlags": "Sharp shoulder pain, numbness/tingling, major shrugging, cannot lift arm.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall slides, band pull-aparts, scapular control, shoulder-friendly pushing.",
        "systemTags": [
          "Shoulder"
        ],
        "matchedMovementTestIds": [
          "push",
          "shoulderMobility",
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Hip Mobility: Seated Rotation / 90-90 Option",
        "purpose": "Hip range, rotation, and lower-body movement readiness.",
        "setup": "Seated hip rotation or 90/90 only if safe getting down/up.",
        "clientAction": "Rotate hips gently through pain-free range.",
        "coachLooksFor": "No pinching, no sharp pain, low-back compensation limited.",
        "redFlags": "Hip pinching, knee pain, cannot sit safely, major asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Seated hip drills, glute activation, 90/90 regression, low-impact lower body.",
        "systemTags": [
          "Hip"
        ],
        "matchedMovementTestIds": [
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Ankle Mobility / Calf Raise Ability",
        "purpose": "Ankle range, calf strength, foot control, step mechanics.",
        "setup": "Stand near support; calf raises or knee-over-toe range check.",
        "clientAction": "Lift/lower heels or move knee gently over toes in pain-free range.",
        "coachLooksFor": "Controlled heel lift/lower, ankle does not collapse, no Achilles/calf pain.",
        "redFlags": "Ankle pain, foot collapse, balance unsafe, cannot lift heel.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Calf raises, ankle rocks, supported balance, step mechanics.",
        "systemTags": [
          "Ankle"
        ],
        "matchedMovementTestIds": [
          "balance",
          "hipMobility",
          "ankleMobility",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Pain Level During Basic Movement",
        "purpose": "Pain response during easy movement.",
        "setup": "Use easiest safe movement: walk, march, chair squat, shoulder reach, or supported drill.",
        "clientAction": "Report pain during and after movement on 1-10 scale, then coach scores 0-5 for system.",
        "coachLooksFor": "Pain stays low, not sharp, not radiating, not increasing.",
        "redFlags": "Sharp pain, radiating pain, numbness/tingling, pain 7+, altered movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Recovery mode, pain-free range, low impact, longer rest, medical clearance if severe.",
        "systemTags": [
          "Pain"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Range of Motion Limitation Check",
        "purpose": "Joint restrictions affecting exercise selection.",
        "setup": "Move shoulders, hips, knees, ankles, spine, and wrists through comfortable range.",
        "clientAction": "Move each area gently through pain-free range.",
        "coachLooksFor": "Major limitations, pain, asymmetries, painful positions.",
        "redFlags": "Sharp pain, numbness/tingling, cannot move joint, severe asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Mobility work, safer alternatives, modified range, avoid painful positions.",
        "systemTags": [
          "ROM"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Strength",
        "testName": "Load Readiness Test",
        "purpose": "Checks ability to maintain form with light external resistance.",
        "setup": "Use light dumbbell, kettlebell, machine, or band if available.",
        "clientAction": "Perform a safe loaded movement only after bodyweight pattern looks good.",
        "coachLooksFor": "Form stays stable, bracing/breathing, no pain, controlled tempo.",
        "redFlags": "Pain with load, unsafe bracing, form breaks down, breath-holding.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Bodyweight work, supported movements, light resistance only.",
        "systemTags": [
          "Load Readiness"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Strength",
        "testName": "Grip / Posture Check",
        "purpose": "Tests grip strength and posture under simple loading.",
        "setup": "Use light dumbbells, band, or farmer hold if safe.",
        "clientAction": "Hold light load or perform light row while keeping posture.",
        "coachLooksFor": "Shoulders down/back, neck relaxed, grip stable, spine controlled.",
        "redFlags": "Neck shrug, wrist pain, grip failure, posture collapse.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Light carries, band rows, grip endurance, scapular control.",
        "systemTags": [
          "Grip",
          "Posture"
        ],
        "matchedMovementTestIds": [
          "pull"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  },
  {
    "id": "assessment_template_weight_loss_conditioning",
    "templateName": "Weight Loss Conditioning Assessment Template",
    "sportFocus": "Weight Loss Conditioning",
    "goal": "Weight loss conditioning and low-impact consistency",
    "movementTestIds": [
      "pain",
      "standing",
      "rom",
      "balance",
      "conditioning",
      "squat",
      "push",
      "core",
      "lunge",
      "shoulderMobility",
      "hipMobility",
      "ankleMobility",
      "breathing"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Weight loss conditioning and low-impact consistency",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Restriction",
        "testName": "Standing Tolerance",
        "purpose": "Ability to handle standing workouts or need chair/supported training.",
        "setup": "Stand or lightly march with support nearby.",
        "clientAction": "Stand/march 1-5 minutes depending on ability.",
        "coachLooksFor": "Posture, breathing, pain level, balance, fatigue.",
        "redFlags": "Dizziness, leg weakness, pain spike, unsafe fatigue, needs to sit immediately.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Chair workouts, seated strength, pool workouts, shorter standing blocks.",
        "systemTags": [
          "Standing"
        ],
        "matchedMovementTestIds": [
          "pain",
          "standing",
          "rom"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "March Test / 3-Minute Low-Impact Cardio",
        "purpose": "Basic cardio tolerance, breathing, and recovery.",
        "setup": "March in place, walk, step touch, shadowbox, or use bike.",
        "clientAction": "Move at easy/moderate pace for up to 3 minutes.",
        "coachLooksFor": "Can keep moving, speak short sentences, no chest pain/dizziness, recovers after stopping.",
        "redFlags": "Chest pain, dizziness, severe breathlessness, cannot recover.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Low-impact intervals, short rounds, longer rest, gradual conditioning.",
        "systemTags": [
          "Conditioning"
        ],
        "matchedMovementTestIds": [
          "balance",
          "conditioning"
        ]
      },
      {
        "area": "Movement",
        "testName": "Chair Sit-to-Stand / Squat Pattern",
        "purpose": "Lower-body strength, knee control, hip control, and squat readiness.",
        "setup": "Stable chair; feet flat, hip to shoulder width; sit tall.",
        "clientAction": "Stand up under control, reach tall posture, then slowly sit down. Use hands only if needed.",
        "coachLooksFor": "Feet stay flat, knees track toes, controlled lowering, no sharp pain, no loss of balance.",
        "redFlags": "Knee cave, heels lifting, sharp knee/hip/back pain, falling into chair.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Lower-body strength, chair squats, supported sit-to-stand, glute bridges, step-ups.",
        "systemTags": [
          "Squat"
        ],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Push Ability: Wall / Incline / Floor Push-Up",
        "purpose": "Upper-body pushing strength, shoulder control, wrist tolerance.",
        "setup": "Start wall, then incline, then floor only if appropriate.",
        "clientAction": "Perform 3-5 controlled push-ups at the safest level.",
        "coachLooksFor": "Body straight, elbows safe, shoulders controlled, no wrist/shoulder pain.",
        "redFlags": "Hips sagging, shoulder/wrist pain, excessive elbow flare, uncontrolled lowering.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall push-ups, incline push-ups, shoulder stability, core bracing.",
        "systemTags": [
          "Push"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Movement",
        "testName": "Core Brace: Dead Bug / Modified Plank",
        "purpose": "Trunk control, breathing under tension, spine stability.",
        "setup": "Choose dead bug, knee plank, elevated plank, or standing brace.",
        "clientAction": "Brace the core and breathe while holding position or doing slow reps.",
        "coachLooksFor": "Ribs down, breathing controlled, hips do not sag, no low-back pain.",
        "redFlags": "Back pain, breath-holding, sagging hips, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Dead bug, bird dog, modified plank, breathing brace, Pallof press.",
        "systemTags": [
          "Core"
        ],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Movement",
        "testName": "Single-Leg Balance / Supported Step-Up",
        "purpose": "Balance, ankle stability, hip control, fall-risk screen.",
        "setup": "Stand near support; use feet together, staggered, single-leg, or low step-up.",
        "clientAction": "Balance 10-20 seconds or perform controlled low step-ups.",
        "coachLooksFor": "Foot/ankle control, knee aligned, hip level, safe recovery from wobble.",
        "redFlags": "Grabbing support suddenly, dizziness, knee cave, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported balance, step taps, low step-ups, ankle and hip stability.",
        "systemTags": [
          "Balance"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Shoulder Reach Overhead",
        "purpose": "Shoulder mobility, rib control, overhead tolerance.",
        "setup": "Stand or sit tall, thumbs up if comfortable.",
        "clientAction": "Raise both arms overhead slowly without forcing range.",
        "coachLooksFor": "Reach without pain, no excessive shrugging/back arching, side differences noted.",
        "redFlags": "Sharp shoulder pain, numbness/tingling, major shrugging, cannot lift arm.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall slides, band pull-aparts, scapular control, shoulder-friendly pushing.",
        "systemTags": [
          "Shoulder"
        ],
        "matchedMovementTestIds": [
          "push",
          "shoulderMobility",
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Hip Mobility: Seated Rotation / 90-90 Option",
        "purpose": "Hip range, rotation, and lower-body movement readiness.",
        "setup": "Seated hip rotation or 90/90 only if safe getting down/up.",
        "clientAction": "Rotate hips gently through pain-free range.",
        "coachLooksFor": "No pinching, no sharp pain, low-back compensation limited.",
        "redFlags": "Hip pinching, knee pain, cannot sit safely, major asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Seated hip drills, glute activation, 90/90 regression, low-impact lower body.",
        "systemTags": [
          "Hip"
        ],
        "matchedMovementTestIds": [
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Ankle Mobility / Calf Raise Ability",
        "purpose": "Ankle range, calf strength, foot control, step mechanics.",
        "setup": "Stand near support; calf raises or knee-over-toe range check.",
        "clientAction": "Lift/lower heels or move knee gently over toes in pain-free range.",
        "coachLooksFor": "Controlled heel lift/lower, ankle does not collapse, no Achilles/calf pain.",
        "redFlags": "Ankle pain, foot collapse, balance unsafe, cannot lift heel.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Calf raises, ankle rocks, supported balance, step mechanics.",
        "systemTags": [
          "Ankle"
        ],
        "matchedMovementTestIds": [
          "balance",
          "hipMobility",
          "ankleMobility",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Pain Level During Basic Movement",
        "purpose": "Pain response during easy movement.",
        "setup": "Use easiest safe movement: walk, march, chair squat, shoulder reach, or supported drill.",
        "clientAction": "Report pain during and after movement on 1-10 scale, then coach scores 0-5 for system.",
        "coachLooksFor": "Pain stays low, not sharp, not radiating, not increasing.",
        "redFlags": "Sharp pain, radiating pain, numbness/tingling, pain 7+, altered movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Recovery mode, pain-free range, low impact, longer rest, medical clearance if severe.",
        "systemTags": [
          "Pain"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Breathing Tolerance During Light Movement",
        "purpose": "Breathing and recovery during easy training.",
        "setup": "Use walking, marching, step touches, or light shadowboxing.",
        "clientAction": "Move lightly while coach checks breathing and recovery.",
        "coachLooksFor": "Can talk in short sentences, no chest pain/dizziness, recovers normally.",
        "redFlags": "Chest pain, dizziness, faint feeling, severe breathlessness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short rounds, longer rest, low-impact intervals, breathing drills.",
        "systemTags": [
          "Breathing"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "pain",
          "standing",
          "breathing",
          "rom"
        ]
      },
      {
        "area": "Readiness",
        "testName": "Consistency Readiness Check",
        "purpose": "Captures barriers, schedule, confidence, and preferred workout style.",
        "setup": "Coach asks about schedule, energy patterns, support, and barriers.",
        "clientAction": "Client answers honestly and identifies what may stop consistency.",
        "coachLooksFor": "Realistic schedule, confidence, barriers, recovery habits, preferred training style.",
        "redFlags": "No plan for schedule, high stress, very low confidence, poor recovery.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short sessions, simple plan, habit-building, low-impact consistency.",
        "systemTags": [
          "Consistency"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Strength Endurance Mini-Circuit",
        "purpose": "Tests sustainable effort with simple low-impact movements.",
        "setup": "Use chair squat, wall push-up, core brace, step touch/march.",
        "clientAction": "Perform one short low-impact circuit at comfortable pace.",
        "coachLooksFor": "Breathing, movement control, ability to continue, no pain spikes.",
        "redFlags": "Pain, breathlessness, unsafe fatigue, poor form under mild fatigue.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short circuits, fewer stations, longer rest, simple movements.",
        "systemTags": [
          "Strength Endurance"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  },
  {
    "id": "assessment_template_recovery_mobility",
    "templateName": "Recovery Mobility Assessment Template",
    "sportFocus": "Recovery Mobility",
    "goal": "Pain-safe movement, mobility, and supported training readiness",
    "movementTestIds": [
      "pain",
      "standing",
      "rom",
      "conditioning",
      "breathing",
      "hipMobility",
      "lunge",
      "balance",
      "squat",
      "hinge",
      "push",
      "shoulderMobility",
      "ankleMobility",
      "core"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Pain-safe movement, mobility, and supported training readiness",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Safety",
        "testName": "Pain Mapping",
        "purpose": "Identifies pain location, type, and severity before movement.",
        "setup": "Client selects pain areas and reports pain level 1-10 and pain type.",
        "clientAction": "Describe pain: sore/tight/sharp/burning/throbbing/numb/tingling/swollen.",
        "coachLooksFor": "Pain level, type, movement triggers, safety concerns, red-flag symptoms.",
        "redFlags": "Chest pain, numbness/tingling, swelling, dizziness, severe pain 9-10.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Coach review, pain-free movement, low impact, medical referral if red flags.",
        "systemTags": [
          "Pain Map"
        ],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Standing Tolerance",
        "purpose": "Ability to handle standing workouts or need chair/supported training.",
        "setup": "Stand or lightly march with support nearby.",
        "clientAction": "Stand/march 1-5 minutes depending on ability.",
        "coachLooksFor": "Posture, breathing, pain level, balance, fatigue.",
        "redFlags": "Dizziness, leg weakness, pain spike, unsafe fatigue, needs to sit immediately.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Chair workouts, seated strength, pool workouts, shorter standing blocks.",
        "systemTags": [
          "Standing"
        ],
        "matchedMovementTestIds": [
          "pain",
          "standing",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Breathing Tolerance During Light Movement",
        "purpose": "Breathing and recovery during easy training.",
        "setup": "Use walking, marching, step touches, or light shadowboxing.",
        "clientAction": "Move lightly while coach checks breathing and recovery.",
        "coachLooksFor": "Can talk in short sentences, no chest pain/dizziness, recovers normally.",
        "redFlags": "Chest pain, dizziness, faint feeling, severe breathlessness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Short rounds, longer rest, low-impact intervals, breathing drills.",
        "systemTags": [
          "Breathing"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "pain",
          "standing",
          "breathing",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Gentle Mobility Screen",
        "purpose": "Checks pain-free movement only.",
        "setup": "Coach chooses shoulder, hip, ankle, spine movements that are safe.",
        "clientAction": "Move each area gently and stop before pain increases.",
        "coachLooksFor": "Comfortable range, fear/guarding, asymmetry, pain response.",
        "redFlags": "Sharp pain, dizziness, numbness/tingling, swelling, pain increase.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Gentle mobility, shorter range, supported movement.",
        "systemTags": [
          "Gentle Mobility"
        ],
        "matchedMovementTestIds": [
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Movement",
        "testName": "Single-Leg Balance / Supported Step-Up",
        "purpose": "Balance, ankle stability, hip control, fall-risk screen.",
        "setup": "Stand near support; use feet together, staggered, single-leg, or low step-up.",
        "clientAction": "Balance 10-20 seconds or perform controlled low step-ups.",
        "coachLooksFor": "Foot/ankle control, knee aligned, hip level, safe recovery from wobble.",
        "redFlags": "Grabbing support suddenly, dizziness, knee cave, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported balance, step taps, low step-ups, ankle and hip stability.",
        "systemTags": [
          "Balance"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Chair Sit-to-Stand / Squat Pattern",
        "purpose": "Lower-body strength, knee control, hip control, and squat readiness.",
        "setup": "Stable chair; feet flat, hip to shoulder width; sit tall.",
        "clientAction": "Stand up under control, reach tall posture, then slowly sit down. Use hands only if needed.",
        "coachLooksFor": "Feet stay flat, knees track toes, controlled lowering, no sharp pain, no loss of balance.",
        "redFlags": "Knee cave, heels lifting, sharp knee/hip/back pain, falling into chair.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Lower-body strength, chair squats, supported sit-to-stand, glute bridges, step-ups.",
        "systemTags": [
          "Squat"
        ],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Hip Hinge / Back-Safe Bend Pattern",
        "purpose": "Back-safe bending, hip control, glute/hamstring loading.",
        "setup": "Stand tall, soft knees, hands on thighs/shins.",
        "clientAction": "Push hips back like closing a car door, keep spine controlled, return tall.",
        "coachLooksFor": "Hips move first, spine neutral, soft knees, hamstrings/glutes engage, no sharp back pain.",
        "redFlags": "Low-back rounding, pain, balance loss, bending only from spine.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall hinge, dowel hinge, glute bridges, hamstring mobility, core bracing.",
        "systemTags": [
          "Hinge"
        ],
        "matchedMovementTestIds": [
          "hinge",
          "hipMobility"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Shoulder Reach Overhead",
        "purpose": "Shoulder mobility, rib control, overhead tolerance.",
        "setup": "Stand or sit tall, thumbs up if comfortable.",
        "clientAction": "Raise both arms overhead slowly without forcing range.",
        "coachLooksFor": "Reach without pain, no excessive shrugging/back arching, side differences noted.",
        "redFlags": "Sharp shoulder pain, numbness/tingling, major shrugging, cannot lift arm.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall slides, band pull-aparts, scapular control, shoulder-friendly pushing.",
        "systemTags": [
          "Shoulder"
        ],
        "matchedMovementTestIds": [
          "push",
          "shoulderMobility",
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Hip Mobility: Seated Rotation / 90-90 Option",
        "purpose": "Hip range, rotation, and lower-body movement readiness.",
        "setup": "Seated hip rotation or 90/90 only if safe getting down/up.",
        "clientAction": "Rotate hips gently through pain-free range.",
        "coachLooksFor": "No pinching, no sharp pain, low-back compensation limited.",
        "redFlags": "Hip pinching, knee pain, cannot sit safely, major asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Seated hip drills, glute activation, 90/90 regression, low-impact lower body.",
        "systemTags": [
          "Hip"
        ],
        "matchedMovementTestIds": [
          "hipMobility",
          "rom"
        ]
      },
      {
        "area": "Mobility",
        "testName": "Ankle Mobility / Calf Raise Ability",
        "purpose": "Ankle range, calf strength, foot control, step mechanics.",
        "setup": "Stand near support; calf raises or knee-over-toe range check.",
        "clientAction": "Lift/lower heels or move knee gently over toes in pain-free range.",
        "coachLooksFor": "Controlled heel lift/lower, ankle does not collapse, no Achilles/calf pain.",
        "redFlags": "Ankle pain, foot collapse, balance unsafe, cannot lift heel.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Calf raises, ankle rocks, supported balance, step mechanics.",
        "systemTags": [
          "Ankle"
        ],
        "matchedMovementTestIds": [
          "balance",
          "hipMobility",
          "ankleMobility",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Pain Level During Basic Movement",
        "purpose": "Pain response during easy movement.",
        "setup": "Use easiest safe movement: walk, march, chair squat, shoulder reach, or supported drill.",
        "clientAction": "Report pain during and after movement on 1-10 scale, then coach scores 0-5 for system.",
        "coachLooksFor": "Pain stays low, not sharp, not radiating, not increasing.",
        "redFlags": "Sharp pain, radiating pain, numbness/tingling, pain 7+, altered movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Recovery mode, pain-free range, low impact, longer rest, medical clearance if severe.",
        "systemTags": [
          "Pain"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Restriction",
        "testName": "Range of Motion Limitation Check",
        "purpose": "Joint restrictions affecting exercise selection.",
        "setup": "Move shoulders, hips, knees, ankles, spine, and wrists through comfortable range.",
        "clientAction": "Move each area gently through pain-free range.",
        "coachLooksFor": "Major limitations, pain, asymmetries, painful positions.",
        "redFlags": "Sharp pain, numbness/tingling, cannot move joint, severe asymmetry.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Mobility work, safer alternatives, modified range, avoid painful positions.",
        "systemTags": [
          "ROM"
        ],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  },
  {
    "id": "assessment_template_athlete_pro",
    "templateName": "Athlete Pro Assessment Template",
    "sportFocus": "Athlete Pro",
    "goal": "Advanced athlete readiness and high-performance conditioning",
    "movementTestIds": [
      "pain",
      "squat",
      "standing",
      "hinge",
      "hipMobility",
      "lunge",
      "balance",
      "push",
      "pull",
      "core",
      "conditioning",
      "breathing",
      "ankleMobility",
      "rom"
    ],
    "sourceWorkbook": "focus_based_assessment_templates_no_bjj_youth.xlsx",
    "templatePurpose": "Advanced athlete readiness and high-performance conditioning",
    "adminReviewStatus": "Workbook imported - Needs Review",
    "customTests": [
      {
        "area": "Safety",
        "testName": "Advanced Injury Review",
        "purpose": "Reviews current and past injuries, fight/sport schedule, and recovery concerns.",
        "setup": "Coach interviews client about injuries, training load, sport season/fight camp, and recovery.",
        "clientAction": "Client reports current pain, old injuries, workload, and goals.",
        "coachLooksFor": "Current pain, overtraining risk, recovery, old injuries, schedule demands.",
        "redFlags": "Concussion symptoms, severe pain, acute injury, unsafe training load.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Adjust volume, add recovery, refer out if needed.",
        "systemTags": [
          "Injury Review"
        ],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Movement",
        "testName": "Chair Sit-to-Stand / Squat Pattern",
        "purpose": "Lower-body strength, knee control, hip control, and squat readiness.",
        "setup": "Stable chair; feet flat, hip to shoulder width; sit tall.",
        "clientAction": "Stand up under control, reach tall posture, then slowly sit down. Use hands only if needed.",
        "coachLooksFor": "Feet stay flat, knees track toes, controlled lowering, no sharp pain, no loss of balance.",
        "redFlags": "Knee cave, heels lifting, sharp knee/hip/back pain, falling into chair.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Lower-body strength, chair squats, supported sit-to-stand, glute bridges, step-ups.",
        "systemTags": [
          "Squat"
        ],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Hip Hinge / Back-Safe Bend Pattern",
        "purpose": "Back-safe bending, hip control, glute/hamstring loading.",
        "setup": "Stand tall, soft knees, hands on thighs/shins.",
        "clientAction": "Push hips back like closing a car door, keep spine controlled, return tall.",
        "coachLooksFor": "Hips move first, spine neutral, soft knees, hamstrings/glutes engage, no sharp back pain.",
        "redFlags": "Low-back rounding, pain, balance loss, bending only from spine.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall hinge, dowel hinge, glute bridges, hamstring mobility, core bracing.",
        "systemTags": [
          "Hinge"
        ],
        "matchedMovementTestIds": [
          "hinge",
          "hipMobility"
        ]
      },
      {
        "area": "Movement",
        "testName": "Step-Back Lunge / Supported Split Stance",
        "purpose": "Single-leg strength, balance, knee/hip stability.",
        "setup": "Stand near wall/chair; start with small step-back or split stance.",
        "clientAction": "Step one foot back and lower only as far as pain-free; use support if needed.",
        "coachLooksFor": "Front knee tracks toes, torso tall, controlled return, no sharp pain.",
        "redFlags": "Knee cave, unsafe wobble, sharp knee/hip/ankle pain, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported split squats, shallow lunges, step-ups, glute stability.",
        "systemTags": [
          "Lunge"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Movement",
        "testName": "Push Ability: Wall / Incline / Floor Push-Up",
        "purpose": "Upper-body pushing strength, shoulder control, wrist tolerance.",
        "setup": "Start wall, then incline, then floor only if appropriate.",
        "clientAction": "Perform 3-5 controlled push-ups at the safest level.",
        "coachLooksFor": "Body straight, elbows safe, shoulders controlled, no wrist/shoulder pain.",
        "redFlags": "Hips sagging, shoulder/wrist pain, excessive elbow flare, uncontrolled lowering.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Wall push-ups, incline push-ups, shoulder stability, core bracing.",
        "systemTags": [
          "Push"
        ],
        "matchedMovementTestIds": [
          "push"
        ]
      },
      {
        "area": "Movement",
        "testName": "Pull Ability: Band Row / Cable Row / Table Row",
        "purpose": "Upper-back strength, posture, scapular control.",
        "setup": "Use band, cable, TRX/ring row, or safe table row.",
        "clientAction": "Pull elbows back while chest stays lifted and shoulders stay down.",
        "coachLooksFor": "Shoulder blades move back, neck relaxed, posture tall, no shoulder pain.",
        "redFlags": "Neck shrug, shoulder pain, ribs flare, jerky movement.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Band rows, seated rows, scapular control, posture work.",
        "systemTags": [
          "Pull"
        ],
        "matchedMovementTestIds": [
          "pull"
        ]
      },
      {
        "area": "Movement",
        "testName": "Core Brace: Dead Bug / Modified Plank",
        "purpose": "Trunk control, breathing under tension, spine stability.",
        "setup": "Choose dead bug, knee plank, elevated plank, or standing brace.",
        "clientAction": "Brace the core and breathe while holding position or doing slow reps.",
        "coachLooksFor": "Ribs down, breathing controlled, hips do not sag, no low-back pain.",
        "redFlags": "Back pain, breath-holding, sagging hips, neck tension.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Dead bug, bird dog, modified plank, breathing brace, Pallof press.",
        "systemTags": [
          "Core"
        ],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Movement",
        "testName": "Single-Leg Balance / Supported Step-Up",
        "purpose": "Balance, ankle stability, hip control, fall-risk screen.",
        "setup": "Stand near support; use feet together, staggered, single-leg, or low step-up.",
        "clientAction": "Balance 10-20 seconds or perform controlled low step-ups.",
        "coachLooksFor": "Foot/ankle control, knee aligned, hip level, safe recovery from wobble.",
        "redFlags": "Grabbing support suddenly, dizziness, knee cave, fear of falling.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Supported balance, step taps, low step-ups, ankle and hip stability.",
        "systemTags": [
          "Balance"
        ],
        "matchedMovementTestIds": [
          "lunge",
          "balance",
          "standing"
        ]
      },
      {
        "area": "Performance",
        "testName": "Sport-Specific Skill Test",
        "purpose": "Assesses sport skill quality for selected focus.",
        "setup": "Use boxing, kickboxing, BJJ, or fight conditioning drill based on sport.",
        "clientAction": "Perform controlled sport-specific rounds or skill drills.",
        "coachLooksFor": "Technique, speed control, accuracy, balance, recovery, no pain.",
        "redFlags": "Form collapses, pain, unsafe intensity, poor control under fatigue.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Skill refinement, sport-specific progressions, technique under fatigue.",
        "systemTags": [
          "Sport Skill"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Conditioning",
        "testName": "Advanced Conditioning Test",
        "purpose": "Tests high-level work capacity if safe.",
        "setup": "Use multiple controlled rounds or intervals at coach-selected intensity.",
        "clientAction": "Complete sport-specific intervals while maintaining form.",
        "coachLooksFor": "Pace, output consistency, recovery, form under fatigue.",
        "redFlags": "Dizziness, chest pain, unsafe fatigue, form collapse, pain spike.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Advanced intervals, fight-style rounds, conditioning progression.",
        "systemTags": [
          "Advanced Conditioning"
        ],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Power",
        "testName": "Power / Impact Readiness",
        "purpose": "Checks if client can tolerate impact, power, or plyometric work.",
        "setup": "Use jump rope, medicine ball, short sprint, or bag power only if safe.",
        "clientAction": "Perform low-volume power/impact drill with full control.",
        "coachLooksFor": "Landing, joint control, power mechanics, recovery, no pain.",
        "redFlags": "Knee/ankle/back pain, poor landing, unsafe speed, dizziness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Power prep, landing mechanics, lower impact alternatives.",
        "systemTags": [
          "Power",
          "Impact"
        ],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Performance",
        "testName": "Recovery Between Rounds",
        "purpose": "Measures how well client recovers after high output.",
        "setup": "Observe after round/interval.",
        "clientAction": "Recover breathing and posture while coach records notes.",
        "coachLooksFor": "Breathing returns, posture resets, ability to communicate, no symptoms.",
        "redFlags": "Cannot recover, chest pain, dizziness, excessive breathlessness.",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "Conditioning base, rest strategy, breath control.",
        "systemTags": [
          "Recovery"
        ],
        "matchedMovementTestIds": [
          "conditioning",
          "breathing"
        ]
      },
      {
        "area": "Equipment Option",
        "testName": "Checked? Yes/No",
        "purpose": "Credit",
        "setup": "Why It Matters",
        "clientAction": "Workout Filter / Use",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Bodyweight / open floor space",
        "testName": "No",
        "purpose": "0",
        "setup": "Can train without tools",
        "clientAction": "Bodyweight, mobility, conditioning",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Stable chair / bench",
        "testName": "No",
        "purpose": "0",
        "setup": "Adaptive, seated, supported work",
        "clientAction": "Chair, sit-to-stand, supported balance",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "squat",
          "standing"
        ]
      },
      {
        "area": "Resistance bands",
        "testName": "No",
        "purpose": "0",
        "setup": "Beginner pulling, rehab, low-impact strength",
        "clientAction": "Rows, pull-aparts, Pallof press",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "balance"
        ]
      },
      {
        "area": "Dumbbells",
        "testName": "No",
        "purpose": "0",
        "setup": "Progressive strength without full gym",
        "clientAction": "DB strength, carries, accessories",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Kettlebell",
        "testName": "No",
        "purpose": "0",
        "setup": "Hinge, carries, conditioning",
        "clientAction": "Goblet squat, carries",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Barbell / rack",
        "testName": "No",
        "purpose": "0",
        "setup": "Heavier strength progression",
        "clientAction": "Squat, deadlift, press variations",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Gym machines / cable station",
        "testName": "No",
        "purpose": "0",
        "setup": "Controlled strength and modifications",
        "clientAction": "Machine strength, cable rows",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Cardio machine",
        "testName": "No",
        "purpose": "0",
        "setup": "Conditioning without impact",
        "clientAction": "Bike, treadmill, rower, elliptical",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Pool access",
        "testName": "No",
        "purpose": "0",
        "setup": "Pain-friendly conditioning",
        "clientAction": "Pool walking, aquatic cardio",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Jump rope / agility space",
        "testName": "No",
        "purpose": "0",
        "setup": "Boxing, conditioning, footwork",
        "clientAction": "Jump rope, cones, footwork drills",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "ankleMobility"
        ]
      },
      {
        "area": "Boxing bag / pads / mitts",
        "testName": "No",
        "purpose": "0",
        "setup": "Combat sport skill work",
        "clientAction": "Bag, pads, mitt rounds",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Mats / grappling space",
        "testName": "No",
        "purpose": "0",
        "setup": "BJJ or floor training",
        "clientAction": "Mat transitions, grappling movement",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Equipment Score",
        "testName": "0",
        "purpose": "out of 5",
        "setup": "Counts every Yes and caps at 5",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Equipment Level",
        "testName": "Minimal Equipment",
        "purpose": "",
        "setup": "0-1 Minimal | 2-3 Basic | 4-5 Full",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Safety Gate Result",
        "testName": "Clear",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain"
        ]
      },
      {
        "area": "Recommended Training Level",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Recovery Mode Recommended",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core",
          "breathing"
        ]
      },
      {
        "area": "Workout Permission",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Main Focus Areas",
        "testName": "Use lowest-scoring system tags and the If Low column.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Exercise Tags to Avoid",
        "testName": "Use restrictions and red flags to filter exercises.",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "pain",
          "rom"
        ]
      },
      {
        "area": "Recommended Plan Type",
        "testName": "Not Scored",
        "purpose": "",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "core"
        ]
      },
      {
        "area": "Coach Approved?",
        "testName": "No",
        "purpose": "Coach Name",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Approved?",
        "testName": "No",
        "purpose": "Client Notes",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      },
      {
        "area": "Client Requested Changes?",
        "testName": "No",
        "purpose": "Reason",
        "setup": "",
        "clientAction": "",
        "coachLooksFor": "",
        "redFlags": "",
        "scoringScale": "",
        "scoreMeaning": "",
        "ifLowFocusOn": "",
        "systemTags": [],
        "matchedMovementTestIds": [
          "conditioning"
        ]
      }
    ],
    "active": true,
    "archived": false,
    "createdByAdminId": "admin_1",
    "createdAt": "2026-06-02T14:45:00.000Z",
    "updatedAt": "2026-06-02T14:45:00.000Z"
  }
];
