/**
 * English translations for Stranger IT Things
 */

export const en = {
  // Language selection
  language: {
    select: "Select Language",
    english: "English",
    german: "Deutsch"
  },

  // Intro screen
  intro: {
    title: "STRANGER IT THINGS",
    subtitle: "HAWKINS INCIDENT CENTER",
    description: "A disturbance from the Upside Down threatens the infrastructure. Is it an Incident or a Request?",
    callToAction: "Choose your role. Save the service.",
    startButton: "INSERT COIN (START)"
  },

  // Character selection
  characterSelect: {
    title: "CHOOSE YOUR CHARACTER",
    roles: {
      SERVICE_DESK: "Service Desk (The Frontline Guardians)",
      IAM: "AD / IAM (The Role Masters)",
      INFRASTRUCTURE: "Server / Infra (The Network Warriors)",
      DEVELOPER: "Software Development (The Code Wizards)",
      LICENSING: "License / Procurement (The License Diplomats)",
      ERP: "ERP / Business (The Process Summoners)",
      PURCHASING: "Purchasing / Logistics (The Logistics Rangers)"
    }
  },

  // Characters
  characters: {
    hopper: {
      name: "Chief Hopper",
      description: "Sheriff of Hawkins. The first point of contact. Knows: Users scream 'Demogorgon', often it's just a broken lightbulb.",
      specialAbility: "Deep Inquiry (like Joyce with the Christmas lights)"
    },
    brenner: {
      name: "Dr. Brenner",
      description: "Gatekeeper of Hawkins Lab. Manages access and keycards. Knows: No keycard ≠ Gate broken.",
      specialAbility: "Keycard Rituals & Clearance Levels"
    },
    bob: {
      name: "Bob Newby (Superhero)",
      description: "RadioShack Manager and Tech Expert. Guardian of systems. Incident = Power outage. Request = New wiring.",
      specialAbility: "Uptime Shield & Nerve Center Monitoring"
    },
    dustin: {
      name: "Dustin Henderson",
      description: "The clever strategist of the gang. Code architect. Distinguishes Bug (Demogorgon) from Feature (new D&D rule).",
      specialAbility: "Cerebro Refactoring & D&D Logic"
    },
    murray: {
      name: "Murray Bauman",
      description: "Conspiracy theorist and detective. License guardian. Incident = Surveillance system down. Request = New wiretap license.",
      specialAbility: "Fine Print Vision & Paranoia Protocol"
    },
    joyce: {
      name: "Joyce Byers",
      description: "Organizer and problem solver. Process owner. Data error = Incident. New workflow = Request.",
      specialAbility: "Christmas Lights Communication & Mother Instinct"
    },
    steve: {
      name: "Steve Harrington",
      description: "Scoops Ahoy Manager. Logistics chief. Delivery stop = Incident. Order request = Request.",
      specialAbility: "Ice Cream Supply Chain & Customer Service"
    }
  },

  // Acts
  acts: {
    ACT_1: "ACT 1: The Distorted Ticket",
    ACT_2: "ACT 2: The Perspective Labyrinth",
    ACT_3: "ACT 3: The Model Boss Fight",
    ACT_4: "ACT 4: The New World",
    transitions: {
      act1: {
        title: "ACT 1",
        subtitle: "The Distorted Ticket"
      },
      act2: {
        title: "ACT 2",
        subtitle: "The Perspective Labyrinth"
      },
      act3: {
        title: "ACT 3",
        subtitle: "The Model Boss Fight"
      },
      act4: {
        title: "ACT 4",
        subtitle: "The New World"
      },
      selection: {
        title: "THE CHOICE",
        subtitle: "Choose your role"
      },
      equipment: {
        title: "THE TOOL",
        subtitle: "Equip yourself"
      }
    }
  },

  // Skills/Items
  skills: {
    rubberDuck: {
      name: "Dart (Baby Demogorgon)",
      description: "Dustin's pet. The silent companion. Helps with thinking. (Single-use)"
    },
    itilBook: {
      name: "D&D Rulebook",
      description: "Dungeons & Dragons handbook. Reveals hints in Act 1 & 2. (Single-use)"
    },
    coffee: {
      name: "Scoops Ahoy Iced Coffee",
      description: "Steve's specialty. Universal focus. Gives small hints everywhere. (Single-use)"
    },
    debugger: {
      name: "Cerebro",
      description: "Dustin's high-performance radio. Reveals logic errors in the boss fight. (Single-use)"
    },
    expiredDrink: {
      name: "Contaminated Water",
      description: "From the Hawkins pool. Wakes you up, but harms morale. -10 Morale when used. (Single-use)"
    },
    outdatedDocs: {
      name: "Brenner's Old Notes",
      description: "Outdated lab protocols. Lead you astray. -5 Quality when used. (Single-use)"
    },
    buggyScript: {
      name: "Mind Flayer Fragment",
      description: "Dark power from the Upside Down. Automation with side effects. -5 Quality, -5 Morale. (Single-use)"
    }
  },

  // System messages
  system: {
    loading: [
      "Scanning Upside Down Portal...",
      "Checking Demogorgon Signature...",
      "Validating Mind Flayer Pattern...",
      "Analyzing Christmas Lights Code...",
      "Loading Lab Protocols...",
      "Calculating Hawkins Timeline..."
    ],
    success: [
      "Portal closed.",
      "Hawkins secured.",
      "Communication restored.",
      "Monster identified.",
      "Timeline stable: 100%."
    ],
    failure: [
      "DIMENSIONAL RIFT DETECTED.",
      "HAWKINS IN DANGER.",
      "WRONG DIMENSION.",
      "UNKNOWN CREATURE.",
      "CRITICAL ENERGY LOSS."
    ],
    restart: "SYSTEM RESTART...",
    welcome: "Welcome, {name}. The Demogorgon (User) is restless.",
    scenarioCompleted: "This scenario has already been successfully completed.",
    locationQuiet: "This place seems quiet for now. Too quiet.",
    actMismatch: "Act mismatch: Completion doesn't count towards progression.",
    itemConsumed: "{icon} {name} was consumed. Remaining: {count}",
    itemWarning: "WARNING: {name} has side effects!",
    wrongItemWarning: "WARNING: {name} is not optimal for this act. -{penalty}% SLA.",
    wrongDecision: "NOTE: Wrong decision made. You can continue playing, but note the impact on your stats.",
    slaExpired: "SLA TIME EXPIRED: Time has run out.",
    victory: "VICTORY! The Model Boss has been defeated. The system is stable.",
    levelUp: "Level Up! Location unlocked: HAWKINS HIGH",
    labWarning: "WARNING: High energy signature at HAWKINS LAB.",
    allScenariosCompleted: "All scenarios in {location} have been completed.",
    systemFailure: "SYSTEM FAILURE: Critical thresholds breached.",
    slaFailure: "SLA FAILURE: Time has expired.",
    moraleCollapse: "MORAL COLLAPSE: Team morale has collapsed.",
    qualityFailure: "QUALITY FAILURE: Ticket quality has dropped to zero."
  },

  // Stats panel
  stats: {
    violated: "VIOLATED",
    critical: "CRITICAL",
    warning: "WARNING",
    safe: "SAFE",
    sla: "SLA",
    morale: "MORALE",
    quality: "QUALITY"
  },

  // Map locations
  locations: {
    mall: {
      name: "Starcourt Mall",
      description: "The colorful frontend. Starting point of the disturbance."
    },
    school: {
      name: "Hawkins High",
      description: "Knowledge Center. Here you learn your role."
    },
    lab: {
      name: "Hawkins Lab",
      description: "Core Backend. The source of evil."
    },
    arcade: {
      name: "Palace Arcade",
      description: "Gaming paradise - Here you can relax."
    },
    forest: {
      name: "Mirkwood Forest",
      description: "A dark forest - Could be dangerous..."
    },
    upsidedown: {
      name: "The Upside Down",
      description: "Legacy Systems - Only accessible to experts."
    }
  },

  // Detour messages
  detours: {
    arcade: {
      enter: "You enter the Palace Arcade...",
      description: "The flashing arcade machines are tempting, but this is not the right way. The mission waits elsewhere.",
      penalty: "-{penalty} SLA (Time wasted)"
    },
    forest: {
      enter: "You get lost in Mirkwood Forest...",
      description: "The dark paths lead nowhere. You lose valuable time. Return to the mission!",
      penalty: "-{penalty} SLA (Lost)"
    },
    upsidedown: {
      enter: "You try to enter the Upside Down...",
      description: "The energy is too strong. You're not ready for this place yet. Access denied.",
      penalty: "-{penalty} Morale (Overwhelmed)"
    }
  },

  // Game UI
  ui: {
    progress: "Progress: {completed}/{total}",
    priority: "PRIORITY: HIGH",
    travelTo: "Travel to {location}...",
    stats: {
      speed: "SPD",
      accuracy: "ACC",
      hp: "HP",
      sla: "SLA",
      morale: "MORALE",
      quality: "QUALITY"
    }
  },

  // Skill selection screen
  skillSelect: {
    title: "CHOOSE YOUR EQUIPMENT",
    subtitle: "Select an item for this act",
    selectButton: "SELECT",
    inventory: "Inventory",
    hint: "Choose wisely - Items are consumable!",
    goodItems: "Available Items",
    badItems: "Risky Items",
    missionBriefs: {
      act1: "START ACT 1: INCIDENT RESPONSE. Choose your tool for the first triage.",
      act2: "START ACT 2: PERSPECTIVE SHIFT. Confusion spreads. Equip yourself for deep analysis.",
      act3: "START ACT 3: ROOT CAUSE ANALYSIS. The final confrontation. Choose a tool to deconstruct the system."
    }
  },

  // Map screen
  mapScreen: {
    title: "HAWKINS MAP",
    selectLocation: "Select your destination",
    locked: "LOCKED",
    completed: "COMPLETED",
    unknown: "UNKNOWN",
    completedProgress: "completed",
    actHints: {
      act1: "TARGET: TRIAGE AT STARCOURT MALL",
      act2: "TARGET: TRAINING AT HAWKINS HIGH",
      act3: "TARGET: CONFRONTATION AT HAWKINS LAB"
    }
  },

  // Mini-game classify component
  miniGame: {
    dataCorruption: "Data corruption error.",
    back: "BACK",
    confirm: "CONFIRM >>",
    submitRequest: "SUBMIT REQUEST >>",
    chooseWisely: "Choose wisely. Your decision affects Team Morale and SLA.",
    recommended: "RECOMMENDED",
    useItem: "USE {item}",
    empty: "EMPTY"
  },

  // End screen
  endScreen: {
    victory: {
      title: "MISSION ACCOMPLISHED",
      subtitle: "You saved Hawkins!",
      message: "The system is stable. The Upside Down has been sealed. You are a true IT hero!"
    },
    defeat: {
      title: "GAME OVER",
      subtitle: "The darkness wins",
      slaExpired: "Time ran out. The SLA was breached.",
      moraleZero: "Team morale collapsed. The team gave up.",
      qualityZero: "Quality fell to zero. The system is unstable."
    },
    stats: {
      title: "Final Statistics",
      finalSla: "Final SLA",
      finalMorale: "Final Morale",
      finalQuality: "Final Quality",
      scenariosCompleted: "Scenarios Completed",
      wrongAnswers: "Incorrect Decisions"
    },
    wrongAnswersTitle: "Learning Opportunities",
    wrongAnswerDetails: "Scenario: {title}",
    wrongAnswerSelected: "You chose: {option}",
    wrongAnswerCorrect: "Correct was: {option}",
    replayButton: "REPLAY",
    contributeTitle: "Want to contribute?",
    contributeText: "This game is open source! Help us improve it:",
    contributeLink: "Contribute on GitHub",
    reportNumber: "INCIDENT REPORT",
    statusResolved: "RESOLVED",
    statusCritical: "CRITICAL",
    agent: "AGENT",
    role: "ROLE",
    equipment: "EQUIPMENT",
    sector: "SECTOR",
    sectorLab: "HAWKINS LAB",
    unknown: "UNKNOWN",
    standardEquipment: "Standard Equipment",
    quality: "QUALITY",
    morale: "MORALE",
    sla: "SLA",
    errorAnalysis: "ERROR ANALYSIS",
    errors: "errors",
    yourChoice: "Your choice:",
    correctWas: "Correct was:",
    // Narrative messages by role
    narrative: {
      serviceDesk: {
        victory: "The Service Desk successfully separated signal from noise. The user fog has lifted.",
        defeat: "The Service Desk was overrun by hysteria. Unable to distinguish disruptions from requests, the queue collapsed."
      },
      iam: {
        victory: "Identity boundaries enforced. The principle of least privilege saved the kingdom.",
        defeat: "Access control failure. Permissions were granted without verification, the gates stand wide open."
      },
      infrastructure: {
        victory: "Infrastructure integrity maintained. You successfully defended uptime against false alarms.",
        defeat: "Critical systems ignored while chasing phantoms. The physical layer is compromised."
      },
      developer: {
        victory: "Production code preserved. You distinguished real bugs from dangerous feature creep.",
        defeat: "Technical debt exploded. The codebase is now polluted with hotfixes for non-existent errors."
      },
      licensing: {
        victory: "Compliance achieved. The audit found zero deviations.",
        defeat: "Shadow IT discovered. Unlicensed software proliferates in the network."
      },
      erp: {
        victory: "Process logic restored. The books are balanced and workflows clean.",
        defeat: "Data corruption in core modules. Business logic is broken."
      },
      purchasing: {
        victory: "Supply chain secured. Critical assets arrived just in time.",
        defeat: "Logistics jam. The warehouse is full of requests but empty of solutions."
      },
      default: {
        victory: "System stabilized.",
        defeat: "System collapse."
      }
    },
    // Skill impact messages
    skillImpact: {
      itilBook: {
        victory: "The ITIL codex provided the necessary structure.",
        defeat: "Even the sacred texts couldn't prevent this chaos."
      },
      coffee: {
        victory: "Caffeine levels maintained cognitive performance.",
        defeat: "The caffeine crash came at the worst possible moment."
      },
      debugger: {
        victory: "Root cause analysis was surgically precise.",
        defeat: "The debugger only revealed more errors."
      },
      rubberDuck: {
        victory: "The rubber duck listened patiently and led you to the solution.",
        defeat: "You spoke to the duck, but the duck didn't listen."
      }
    },
    // Warning messages
    warnings: {
      lowQuality: "WARNING: Classification accuracy was critically low. Retraining recommended.",
      lowMorale: "ALERT: Team suffering from severe burnout.",
      lowSla: "NOTE: Multiple SLA violations recorded.",
      defeatSla: "Reason for defeat: SLA buffer exhausted – incident handling too slow.",
      defeatMorale: "Reason for defeat: Team morale collapsed – too much ping-pong or pressure.",
      defeatQuality: "Reason for defeat: Ticket quality at 0 – wrong classification dominated.",
      highScore: "COMMENDATION: Excellent performance in all metrics.",
      missedLearning: "Learning path missed: ITIL temple/Change puzzle were skipped. Classification model remained unclear.",
      wrongDecisions: "ERROR ANALYSIS: {count} wrong decision(s) made."
    }
  },

  // Scenarios - Act 1
  scenarios: {
    act1_1: {
      title: "Flickering Lights in Starcourt Mall",
      environment: "Service Desk corner in Starcourt Mall",
      hint: "The lights flicker first in the mall. Users only describe the flickering – you need to find out if something really burned out.",
      description: "Late evening at Starcourt Mall. The neon sign of the Trading Shop is flickering.\n\n" +
        "Your pager explodes:\n\n" +
        "TICKET:\n" +
        "From: mueller.trading@hawkins-corp.example\n" +
        "Subject: 'TRADING DEAD!!! PRODUCTION DOWN!!!'\n\n" +
        "'In the new trading area I can't order ANYTHING! Fix it immediately!!!'\n\n" +
        "Other screens are glowing calmly. Mueller senses a disturbance.\n" +
        "For him it's 'the Demogorgon'. For you, it's just a signal at first.\n\n" +
        "You need to decide how to respond.",
      options: {
        incident: {
          label: "Press the red alarm button: P1-INCIDENT, wake everyone",
          outcome: "YOU PULL THE LEVER.\n\n" +
            "Infra and Dev jump up, emergency lights come on in the lab.\n" +
            "Monitoring shows: Shop green, other users are ordering happily.\n\n" +
            "Hours later: Only Mueller is blocked.\n" +
            "The 'Demogorgon' was just his personal blockage.\n\n" +
            "You woke the town for a single lightbulb."
        },
        request: {
          label: "Simply log as Service Request: 'Mueller needs Trading'",
          outcome: "YOU TYPE: 'Service Request – Trading access for Mueller'.\n\n" +
            "A blue light in the 'Requests' category.\n" +
            "Problem: Is it a bug, missing role or never-built feature?\n\n" +
            "Your classification is a guess."
        },
        inquiry: {
          label: "Like Joyce with the Christmas lights: first ask everything carefully before running around screaming",
          outcome: "YOU BREATHE.\n\n" +
            "QUESTION 1: 'Can you access other systems?'\n" +
            "Mueller: 'Yes, everything else works.'\n\n" +
            "QUESTION 2: 'Did Trading work before?'\n" +
            "Mueller: 'I never used it. It's new.'\n\n" +
            "QUESTION 3: 'Do colleagues have access?'\n" +
            "Mueller (checks): 'Yes, Anna can order.'\n\n" +
            "AH-HA: It's not a system failure (Incident), not a general feature request (Change Request), but: USER NEEDS TRADING ROLE.\n\n" +
            "Service Request: Assign trading role.\n\n" +
            "20 minutes. Problem solved. No alarm. No panic.\n" +
            "Mueller is happy. Team can sleep. You're like Joyce: CALM, but THOROUGH."
        }
      },
      successMessage: "You worked like Joyce with the Christmas lights: first understand, then scream.",
      failureMessage: "You put Hawkins on alert because a single TV was flickering."
    },

    // Act 2 - Role-specific perspectives
    act2_role_1: {
      title: "War Room beneath the Mall – The Incident Avalanche",
      environment: "Provisional control room in the basement under Starcourt Mall",
      hint: "You are the first line of defense. Like Hopper: You decide whether the town gets woken up.",
      description: "War Room beneath the Mall. Tube monitors show incoming tickets.\n\n" +
        "A wall displays recent weeks:\n" +
        "• 'Shop broken' → Permission problem\n" +
        "• 'Mail server down' → Password expired\n" +
        "• 'License system dead' → User never had license\n\n" +
        "Mueller's Trading case blinks up again.\n" +
        "For him: disruption. For the organization: your classification decides.\n\n" +
        "Not every noise is a Demogorgon. Sometimes just a loose door.",
      options: {
        incident: {
          label: "Everything that sounds like panic, mark directly as Incident – better safe than sorry",
          outcome: "YOU LET THE SIRENS WAIL.\n\n" +
            "The Incident wall turns red. Infra and Dev see 'Shop Incident Trading'.\n" +
            "Later: System was stable, just missing a role.\n\n" +
            "Again called a 'Demogorgon' where there was just a locked door."
        },
        request: {
          label: "You translate Mueller's scream into: 'Service Request – needs Trading role, Impact: can't order'",
          outcome: "YOU WRITE:\n" +
            "'User can't order (for him production standstill), others OK, error message 'Access denied'. Check Trading role.'\n\n" +
            "A cleanly described Request with high impact.\n" +
            "Mueller stays subjectively in horror – but you send it through the right tunnel."
        }
      },
      successMessage: "You're Hopper in the War Room: You hear the scream, but you decide how many patrol cars drive out.",
      failureMessage: "You called the SWAT team again to inspect a broken basement door."
    },

    act2_role_2: {
      title: "Gate to the Lab – The Keycard Rituals",
      environment: "Security lock at Hawkins Lab",
      hint: "For someone at the door everything feels the same: 'I can't get in'. For you: Door dead or keycard wrong.",
      description: "Main entrance of Hawkins Lab. Steel gate, red display: ACCESS CONTROL ONLINE.\n\n" +
        "Mueller's Trading case as access problem at your desk.\n" +
        "Keycard console:\n" +
        "• System 'TRADING' → ONLINE\n" +
        "• Role 'TRADING_BUYER' → exists\n" +
        "• Other users with role → can order\n" +
        "• Mueller → only has 'SUPPLIER_SELLER'\n\n" +
        "Functioning door with key for the wrong hallway.\n" +
        "From outside this feels like 'Gate to Upside Down blocked'.",
      options: {
        incident: {
          label: "You report: 'Gate defective' – Incident on door and lock",
          outcome: "YOU LOG: 'Main gate defective, authorized person can't get in'.\n\n" +
            "Later: Infra checks gate – all okay. Dev checks door logic – working exactly per role model.\n\n" +
            "Incident on a system that does exactly what you taught it."
        },
        request: {
          label: "You report: 'Keycard extension' – Request for new role",
          outcome: "YOU WRITE:\n" +
            "'User Mueller only has supplier role. For Trading he needs buyer role. System rightfully denies. Please add role.'\n\n" +
            "Mueller's horror scene technically correct: not a portal defect, but missing ritual (role)."
        }
      },
      successMessage: "You're the real Gatekeeper: You distinguish dimension gates from poorly coded badges.",
      failureMessage: "You accused the lab of being broken, when it only followed your role instructions."
    },

    act2_role_3: {
      title: "Nerve Center – The Calm Monitors",
      environment: "Monitoring room under Hawkins",
      hint: "In your world, Demogorgons are: CPU at 100%, cluster down, latency explosion. A single panicked scream is not a global outage.",
      description: "You sit in the 'Nerve Center' under Hawkins. Wall full of monitors:\n" +
        "• Cluster status\n" +
        "• Latencies\n" +
        "• Error rates\n" +
        "• Uptime graphs\n\n" +
        "An alert from Service Desk blinks: 'TRADING BROKEN – PRODUCTION DOWN'.\n\n" +
        "You check:\n" +
        "• Trading cluster: green\n" +
        "• Database: stable\n" +
        "• Error rates: normal spike when everyone clicks at once\n" +
        "• Test order with system account: runs cleanly through\n\n" +
        "On your screens the world looks suspiciously unspectacular – no Mind Flayer, just some noise.",
      options: {
        incident: {
          label: "Incident: 'Trading infrastructure unstable' – you never know",
          outcome: "YOU WRITE AN INFRA INCIDENT:\n" +
            "'Trading instances suspicious, user reports total outage.'\n\n" +
            "Half the night clusters are rotated, pods restarted, logs combed – and everything is healthy.\n" +
            "Your world is like a flattened EKG line with no alarm.\n\n" +
            "You tried to explain a shadow in the mall TV with a nationwide power outage."
        },
        request: {
          label: "You respond: 'From Infra perspective no Incident – cluster OK, problem likely user/role related'",
          outcome: "YOU RADIO BACK:\n" +
            "'Infra checks green, other Trading orders running. No indication of Infra incident. Likely permission/license/business logic. Please check with IAM/Dev.'\n\n" +
            "Thus the Nerve Center stays reserved for real monsters: CPU storms, network spikes, storage collapse."
        }
      },
      successMessage: "You keep your eye on the Mind Flayer, not every flashlight that briefly jams.",
      failureMessage: "Your incident list only contains ghosts now – and when something really burns, no one finds it."
    },

    act2_role_4: {
      title: "Palace Arcade – The Phantom Bug",
      environment: "Arcade + Dev Terminal in Hawkins",
      hint: "Bug = the game doesn't do what the rules say. Not a bug = the game follows rules that someone defined poorly.",
      description: "You sit between arcade machines, your laptop connected to an old machine.\n" +
        "Next to 'Dragon's Lair' now runs: 'Trading Test Environment'.\n\n" +
        "The ticket 'Bug in Trading – Supplier can't order' is on your board.\n" +
        "You replay the scene:\n" +
        "• Test user with buyer role → order runs smooth as butter\n" +
        "• Test user with pure supplier role → 'Access denied' exactly where it stands in code\n\n" +
        "You read the domain model: 'Supplier may sell, Buyer may buy'.\n" +
        "Trading (supplier buys from supplier) was never cleanly described as dual role in original design.\n" +
        "The game runs by its (limited) rules.",
      options: {
        incident: {
          label: "Continue as Incident: 'Bug in Trading – Supplier must be able to buy'",
          outcome: "YOU CALL IT A BUG.\n\n" +
            "In the lab the case is treated as regression. You search for broken commits, defective queries, race conditions.\n" +
            "You find only one thing: The code does exactly what stands in the model.\n\n" +
            "The monster sits not in the code, but in the idea of how roles were defined."
        },
        request: {
          label: "Not a bug – system works per model. Role problem or new requirement",
          outcome: "YOU WRITE IN THE TICKET COMMENT:\n\n" +
            "'No technical bug: System behaves according to model (Supplier ≠ Buyer). For 'Supplier buys from Supplier' we need either additional role or extended model (Change). Please treat as Request/Change, not as Incident.'\n\n" +
            "Thus you stop hunting phantom Demogorgons in code, and point to the Dungeon Master: the domain modeling."
        }
      },
      successMessage: "You don't just play D&D, you also recognize when the rulebook itself is garbage.",
      failureMessage: "Your backlog becomes the shadow world: all 'bugs' that are actually just bad rules."
    },

    act2_role_5: {
      title: "Forbidden Library – The Silent Licenses",
      environment: "License archive under Hawkins Town Hall",
      hint: "Burning license server = Incident. User without license = Request. From outside both scenes look like 'I can't access my books'.",
      description: "Deep beneath Hawkins Town Hall lies the 'Forbidden Library'.\n" +
        "In one room stand old server racks next to dusty shelves full of license contracts.\n\n" +
        "A parchment flutters from the AC draft:\n" +
        "'Mueller – no access to Trading – check!'\n\n" +
        "You check the License Oracle:\n" +
        "• License service: ONLINE\n" +
        "• Trading license pool: not exhausted\n" +
        "• Mueller: no Trading license assigned\n\n" +
        "For Mueller it's 'library closed, everything's burning'.\n" +
        "In your world the door is open – he just has no ID card.",
      options: {
        incident: {
          label: "License Incident: 'License system defective, user gets nothing'",
          outcome: "YOU WRITE: 'License system Trading defective – user gets no access.'\n\n" +
            "Admins investigate license server, logs, connections – all healthy.\n" +
            "Your incident list grows, but no system error in sight.\n\n" +
            "The shadow was declared a monster again, just because someone stood in the dark."
        },
        request: {
          label: "Service Request: 'Assign Trading license to Mueller (Impact: can't order)'",
          outcome: "YOU TRIGGER A RITUAL:\n" +
            "'User currently can't work (no Trading), license system stable. Please assign Trading license.'\n\n" +
            "That's exactly the kind of magic that belongs here: provisioning, not firefighting."
        }
      },
      successMessage: "You distinguish burned books from missing ID cards.",
      failureMessage: "Your chronicle says 'license system constantly broken', when it only waited for clear requests."
    },

    act2_role_6: {
      title: "Hawkins Factory – The Conveyor Without Orders",
      environment: "Virtual production hall with ERP jobs as machines",
      hint: "A stopped belt with errors in log = Incident. An empty belt because no one delivers anything = follow-up problem, not ERP incident.",
      description: "You stand on a platform above 'Hawkins Factory'.\n" +
        "All ERP jobs are displayed as machines, each with its own rhythm.\n\n" +
        "You look at the 'Trading Orders' area:\n" +
        "• all jobs green\n" +
        "• no error messages\n" +
        "• machine waiting, but simply no new order boxes on the belt\n\n" +
        "Mueller's report 'production stopped' hangs like a red rag on the display board.\n" +
        "From his perspective: 'The factory does nothing'.\n" +
        "From your perspective: 'The factory waits for material from the shop.'",
      options: {
        incident: {
          label: "ERP Incident: 'Job error, Trading orders not coming through'",
          outcome: "YOU OPEN AN ERP INCIDENT.\n\n" +
            "You check logs, tables, interfaces – all ready, all waiting.\n" +
            "No error, just emptiness.\n\n" +
            "The error sits not in the factory, but in the town that delivers nothing."
        },
        request: {
          label: "You report: 'ERP ready – no Trading orders delivered, cause Upstream'",
          outcome: "YOU WRITE IN THE TICKET:\n" +
            "'ERP jobs running flawlessly, interface prepared. However, no Trading orders delivered. Cause lies in upstream process (Shop/Permission). No ERP incident.'\n\n" +
            "The factory is thus officially out of direct firing line, even though it feels the consequences."
        }
      },
      successMessage: "You know: A waiting machine is not broken, just hungry.",
      failureMessage: "In your KPI it looks like the factory constantly fails – in reality it's just starving."
    },

    act2_role_7: {
      title: "Route 66 – The Empty Convoy",
      environment: "Digital map of delivery routes around Hawkins",
      hint: "Delivery route destroyed = Incident. No order triggered = not your incident, just follow-up impact.",
      description: "On a large table lies a map of Hawkins and surroundings.\n" +
        "Glowing dots mark warehouses, factories and delivery routes.\n\n" +
        "At the plant where Mueller's material should arrive, a red icon blinks: 'Material missing'.\n" +
        "You check the route:\n" +
        "• Road clear\n" +
        "• Carrier available\n" +
        "• Warehouse has stock\n" +
        "• Only peculiarity: No order entered into system\n\n" +
        "Mueller experiences: 'The world doesn't deliver'.\n" +
        "You see: Nobody even sent out the convoy.",
      options: {
        incident: {
          label: "Incident: 'Supply chain disrupted, route blocked'",
          outcome: "YOU REPORT A SUPPLY CHAIN INCIDENT.\n\n" +
            "Logistics checks roads, blockades, warehouses – all open and ready.\n" +
            "The route works, it just wasn't used.\n\n" +
            "The monster map shows an attack that never happened."
        },
        request: {
          label: "You report: 'No order triggered – delivery route intact, cause Upstream (Shop/Trading)'",
          outcome: "YOU LOG:\n" +
            "'Delivery capability available, route clear, stock available. No order present. Cause lies in upstream system (Shop/Trading). No supply chain incident, just follow-up impact.'\n\n" +
            "Thus it remains clear: The route is not the Demogorgon, it just gets no order."
        }
      },
      successMessage: "You distinguish between destroyed road and truck that never left.",
      failureMessage: "Officially everything is constantly 'disrupted' at your end, when truck drivers have been waiting for start for days."
    },

    // Act 2 - Core scenarios
    act2_1: {
      title: "Hawkins High Classroom – Three Doors",
      environment: "Empty classroom with three glowing doors",
      hint: "Three doors, one problem: User experiences disruption, you decide the door.",
      description: "You are alone in a classroom at Hawkins High.\n" +
        "On the blackboard stands only one sentence:\n" +
        "'It doesn't work.'\n\n" +
        "Before you hover three glowing doors:\n" +
        "• Door 1: INCIDENT – behind it blue lights, sirens, Hopper yelling orders\n" +
        "• Door 2: SERVICE REQUEST – behind it orderly shelves, forms, catalogs\n" +
        "• Door 3: CHANGE – behind it whiteboards, roadmaps, release planning\n\n" +
        "Above all hangs a projection of Mueller's case: 'Can't order. For me: everything broken.'\n" +
        "Which logic do you write on the board?",
      options: {
        incident: {
          label: "'User decides. If he screams Incident, it's an Incident.'",
          outcome: "YOU WRITE:\n" +
            "'User selection = truth.'\n\n" +
            "All three doors begin to flicker.\n" +
            "In Door 1 everything jams up: real outages next to 'I would like another button'.\n" +
            "Door 2 is barely used, Door 3 gathers dust.\n\n" +
            "That's Hawkins when you let the kids write the security plan."
        },
        request: {
          label: "'User describes Impact. IT decides internally: Incident = broken, Request = provision, Change = modify.'",
          outcome: "YOU WRITE:\n" +
            "'User = Impact, IT = Category.'\n\n" +
            "The doors stabilize.\n" +
            "• Incident door: everything that deviates from defined target state\n" +
            "• Request door: everything where service exists but connection missing\n" +
            "• Change door: everything the service never could do\n\n" +
            "Mueller's case is split in your projection:\n" +
            "He experiences disruption, you recognize: probably Request or Change, not necessarily Incident."
        }
      },
      successMessage: "You understood: The kids may panic, the adult sorts the responses.",
      failureMessage: "You let Hawkins take control. The town classifies its monsters itself."
    },

    act2_2: {
      title: "The Void – The Button from Another Dimension",
      environment: "Empty space between Hawkins and the Upside Down",
      hint: "When something is neither broken nor ever existed, you don't try to repair, but to create.",
      description: "You float in a black room – the Interface Void.\n\n" +
        "Before you hangs a hologram of the shop.\n" +
        "A user screams from the void:\n" +
        "'Where is the 'Mind-Flayer-Kill-Button'? You had it before! Fix it!'\n\n" +
        "You let release notes, commits and catalog entries fly past you like Polaroids:\n" +
        "• No entry for this button\n" +
        "• No commit that introduces or removes it\n" +
        "• No service catalog entry\n\n" +
        "The button exists only in fantasy or in some other universe.",
      options: {
        incident: {
          label: "Incident: 'Button gone, system broken'",
          outcome: "YOU WRITE AN INCIDENT: 'Feature disappeared'.\n\n" +
            "Dev hunts for a commit that never existed.\n" +
            "Infra searches for config drift that doesn't exist.\n" +
            "In the end only frustration remains – the universe was never built that way."
        },
        request: {
          label: "Service Request: 'Please provide Mind-Flayer-Kill-Button'",
          outcome: "YOU THROW IT IN THE REQUEST BOX.\n\n" +
            "There normally lie things that already exist: accounts, licenses, standard options.\n" +
            "Nobody feels responsible, because the 'button' is defined in no catalog.\n" +
            "The ticket becomes a ghost in the system."
        },
        change: {
          label: "Change: 'New requirement – specify, build, roll out Mind-Flayer-Kill-Button'",
          outcome: "YOU WRITE CLEANLY:\n" +
            "'User wants new feature. System never could do that. Must be planned, specified, developed, tested and rolled out as Change.'\n\n" +
            "The Void lights up briefly. From the idea becomes a defined change – not a phantom bug."
        }
      },
      successMessage: "You hear the screams, but you don't repair what never existed – you design it.",
      failureMessage: "Your backlog consists of 'defective' features that never went beyond a D&D brainstorming."
    },

    // Act 3 - Boss Fight
    act3_1: {
      title: "Hawkins Lab Core – The Mind Router",
      environment: "Lowest sublevel of Hawkins Lab",
      hint: "The real final boss is not the Demogorgon, but the thing that decides which monsters are sent where.",
      description: "All the way down in Hawkins Lab, below all levels, stands a machine not in the official plans.\n" +
        "On the casing stands only: ROUTING ENGINE.\n\n" +
        "Via monitors you see how tickets are sucked in:\n" +
        "'TRADING DOESN'T WORK'\n" +
        "'NEED NEW FEATURE'\n" +
        "'NO ACCESS'\n\n" +
        "Inside runs a pathetically short logic:\n\n" +
        "```text\n" +
        "if user_selects == 'Incident' then\n" +
        "    queue = INCIDENT\n" +
        "else\n" +
        "    queue = REQUEST\n" +
        "```\n\n" +
        "Behind, Incidents, Requests and Changes fall wildly mixed into wrong queues.\n" +
        "In the shadow world above grows a black structure: a Mind Flayer made of misclassifications, ticket ping-pong and false expectations.\n\n" +
        "You now know the signals:\n" +
        "• can_user_work (true/false)\n" +
        "• service_was_there_before (true/false)\n" +
        "• behavior_deviates_from_target (true/false)\n" +
        "• desired_feature_in_catalog (true/false)\n\n" +
        "The Mind Router must be refactored.",
      successMessage: "You rewrite the inner law.\n\n" +
        "The new logic resembles a D&D rulebook more than a teenage decision:\n\n" +
        "• If service was there before AND behavior now deviates from target → Incident (Bug)\n" +
        "• If service is there AND behavior correct, but user not connected → Service Request (Role, License, Access)\n" +
        "• If service never could do that AND it's not in catalog → Change (new requirement)\n\n" +
        "Users may continue to scream 'disruption', 'problem', 'bug'.\n" +
        "The Mind Router translates their screams into a consistent model.\n" +
        "The shadow of misclassifications dissolves like dust in El's light.",
      failureMessage: "You leave the logic almost as it was.\n\n" +
        "User selection remains master key.\n" +
        "Incidents, Requests and Changes continue landing colorfully mixed in wrong dungeons.\n" +
        "The Mind Flayer of ticket chaos continues growing – nourished by good intention and bad model."
    }
  },

  // Mini-game messages
  miniGames: {
    classify: {
      useItem: "Use Item",
      submit: "Submit Decision",
      selectOption: "Select an option above"
    },
    memory: {
      title: "Memory Match",
      instructions: "Match the pairs by clicking on cards",
      matchFound: "Match found!",
      tryAgain: "Not a match, try again"
    },
    logic: {
      title: "Logic Puzzle",
      instructions: "Solve the logical challenge",
      hint: "Think carefully...",
      accessGranted: "Access granted.",
      accessDenied: "Access denied."
    },
    decipher: {
      title: "Decipher Code",
      instructions: "Decode the message",
      guess: "Your guess",
      submit: "Submit"
    },
    reflex: {
      title: "Reflex Test",
      instructions: "React quickly when the signal appears!",
      ready: "Get ready...",
      go: "GO!",
      tooSlow: "Too slow!",
      perfect: "Perfect timing!"
    }
  }
};

export type TranslationKey = typeof en;
