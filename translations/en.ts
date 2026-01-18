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
    allScenariosCompleted: "All scenarios in {location} have been completed."
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
    badItems: "Risky Items"
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
    contributeLink: "Contribute on GitHub"
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
          outcome: "YOU PAUSE.\n\n" +
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
      }
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
      hint: "Think carefully..."
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
