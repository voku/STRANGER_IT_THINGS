/**
 * German translations for Stranger IT Things
 */

import { TranslationKey } from './en';

export const de: TranslationKey = {
  // Language selection
  language: {
    select: "Sprache wählen",
    english: "English",
    german: "Deutsch"
  },

  // Intro screen
  intro: {
    title: "STRANGER IT THINGS",
    subtitle: "HAWKINS INCIDENT CENTER",
    description: "Eine Störung aus dem Upside Down bedroht die Infrastruktur. Ist es ein Incident oder ein Request?",
    callToAction: "Wähle deine Rolle. Rette den Service.",
    startButton: "INSERT COIN (START)"
  },

  // Character selection
  characterSelect: {
    title: "WÄHLE DEINEN CHARAKTER",
    roles: {
      SERVICE_DESK: "Service Desk (Die Frontline-Wächter)",
      IAM: "AD / IAM (Die Rollen-Meister)",
      INFRASTRUCTURE: "Server / Infra (Die Netzwerk-Krieger)",
      DEVELOPER: "Softwareentwicklung (Die Code-Zauberer)",
      LICENSING: "Lizenz / Beschaffung (Die Lizenz-Diplomaten)",
      ERP: "ERP / Business (Die Prozess-Beschwörer)",
      PURCHASING: "Einkauf / Logistik (Die Logistik-Ranger)"
    }
  },

  // Characters
  characters: {
    hopper: {
      name: "Chief Hopper",
      description: "Sheriff von Hawkins. Der erste Ansprechpartner. Weiß: User schreien 'Demogorgon', oft ist es nur eine kaputte Glühbirne.",
      specialAbility: "Tief Nachfragen (wie Joyce mit den Lichterketten)"
    },
    brenner: {
      name: "Dr. Brenner",
      description: "Torwächter des Hawkins Lab. Verwaltet Zugänge und Keycards. Weiß: Keine Keycard ≠ Tor kaputt.",
      specialAbility: "Keycard-Rituale & Clearance-Level"
    },
    bob: {
      name: "Bob Newby (Superheld)",
      description: "RadioShack-Manager und Tech-Experte. Hüter der Systeme. Incident = Stromausfall. Request = Neue Verkabelung.",
      specialAbility: "Uptime Shield & Nerve Center Überwachung"
    },
    dustin: {
      name: "Dustin Henderson",
      description: "Der kluge Stratege der Gang. Code-Architekt. Unterscheidet Bug (Demogorgon) von Feature (neue D&D-Regel).",
      specialAbility: "Cerebro-Refactoring & D&D-Logik"
    },
    murray: {
      name: "Murray Bauman",
      description: "Verschwörungstheoretiker und Detektiv. Lizenz-Wächter. Incident = Überwachungssystem down. Request = Neue Abhörlizenz.",
      specialAbility: "Kleingedrucktes-Vision & Paranoia-Protokoll"
    },
    joyce: {
      name: "Joyce Byers",
      description: "Organisatorin und Problemlöserin. Prozess-Eignerin. Datenfehler = Incident. Neuer Workflow = Request.",
      specialAbility: "Lichterketten-Kommunikation & Mutter-Instinkt"
    },
    steve: {
      name: "Steve Harrington",
      description: "Scoops Ahoy Manager. Logistik-Chef. Lieferstopp = Incident. Bestellanforderung = Request.",
      specialAbility: "Ice Cream Supply Chain & Kundendienst"
    }
  },

  // Acts
  acts: {
    ACT_1: "AKT 1: Das verzerrte Ticket",
    ACT_2: "AKT 2: Das Perspektiven-Labyrinth",
    ACT_3: "AKT 3: Der Modell-Endgegner",
    ACT_4: "AKT 4: Die neue Welt",
    transitions: {
      act1: {
        title: "AKT 1",
        subtitle: "Das verzerrte Ticket"
      },
      act2: {
        title: "AKT 2",
        subtitle: "Das Perspektiven-Labyrinth"
      },
      act3: {
        title: "AKT 3",
        subtitle: "Der Modell-Endgegner"
      },
      act4: {
        title: "AKT 4",
        subtitle: "Die neue Welt"
      },
      selection: {
        title: "DIE AUSWAHL",
        subtitle: "Wähle deine Rolle"
      },
      equipment: {
        title: "DAS WERKZEUG",
        subtitle: "Rüste dich aus"
      }
    }
  },

  // Skills/Items
  skills: {
    rubberDuck: {
      name: "Dart (Baby Demogorgon)",
      description: "Dustins Haustier. Der stille Begleiter. Hilft beim Nachdenken. (Einmalig)"
    },
    itilBook: {
      name: "D&D Regelwerk",
      description: "Dungeons & Dragons Handbuch. Enthüllt Hinweise in Act 1 & 2. (Einmalig)"
    },
    coffee: {
      name: "Scoops Ahoy Eiskaffee",
      description: "Steves Spezialität. Universeller Fokus. Gibt kleine Hinweise überall. (Einmalig)"
    },
    debugger: {
      name: "Cerebro",
      description: "Dustins Hochleistungs-Radio. Enthüllt Logik-Fehler im Boss-Kampf. (Einmalig)"
    },
    expiredDrink: {
      name: "Verseuchtes Wasser",
      description: "Aus dem Hawkins Pool. Macht wach, aber schadet der Moral. -10 Moral beim Nutzen. (Einmalig)"
    },
    outdatedDocs: {
      name: "Brenners alte Notizen",
      description: "Veraltete Lab-Protokolle. Führen in die Irre. -5 Qualität beim Nutzen. (Einmalig)"
    },
    buggyScript: {
      name: "Mind Flayer Fragment",
      description: "Dunkle Macht aus dem Upside Down. Automatisierung mit Nebenwirkungen. -5 Qualität, -5 Moral. (Einmalig)"
    }
  },

  // System messages
  system: {
    loading: [
      "Scanne Upside Down Portal...",
      "Prüfe Demogorgon-Signatur...",
      "Validiere Mind Flayer Muster...",
      "Analysiere Lichterketten-Code...",
      "Lade Lab-Protokolle...",
      "Berechne Hawkins-Timeline..."
    ],
    success: [
      "Portal geschlossen.",
      "Hawkins gesichert.",
      "Kommunikation wiederhergestellt.",
      "Monster identifiziert.",
      "Timeline stabil: 100%."
    ],
    failure: [
      "DIMENSIONSRISS ERKANNT.",
      "HAWKINS IN GEFAHR.",
      "FALSCHE DIMENSION.",
      "UNBEKANNTES WESEN.",
      "ENERGIEVERLUST KRITISCH."
    ],
    restart: "SYSTEM NEUSTART...",
    welcome: "Willkommen, {name}. Der Demogorgon (User) ist unruhig.",
    scenarioCompleted: "Dieses Szenario wurde bereits erfolgreich abgeschlossen.",
    locationQuiet: "Dieser Ort scheint momentan ruhig. Zu ruhig.",
    actMismatch: "Akt-Mismatch: Abschluss zählt nicht zur Progression.",
    itemConsumed: "{icon} {name} wurde verbraucht. Verbleibend: {count}",
    itemWarning: "WARNUNG: {name} hat Nebenwirkungen!",
    wrongItemWarning: "WARNUNG: {name} ist nicht optimal für diesen Akt. -{penalty}% SLA.",
    wrongDecision: "HINWEIS: Falsche Entscheidung getroffen. Du kannst weiterspielen, aber beachte die Auswirkungen auf deine Stats.",
    slaExpired: "SLA TIME EXPIRED: Zeit ist abgelaufen.",
    victory: "SIEG! Der Modell-Endgegner wurde besiegt. Das System ist stabil.",
    levelUp: "Level Up! Ort freigeschaltet: HAWKINS HIGH",
    labWarning: "WARNUNG: Hohe Energie-Signatur im HAWKINS LAB.",
    allScenariosCompleted: "Alle Szenarien in {location} wurden abgeschlossen."
  },

  // Map locations
  locations: {
    mall: {
      name: "Starcourt Mall",
      description: "Das bunte Frontend. Startpunkt der Störung."
    },
    school: {
      name: "Hawkins High",
      description: "Knowledge Center. Hier lernst du deine Rolle."
    },
    lab: {
      name: "Hawkins Lab",
      description: "Core Backend. Die Quelle des Übels."
    },
    arcade: {
      name: "Palace Arcade",
      description: "Gaming Paradies - Hier kannst du dich entspannen."
    },
    forest: {
      name: "Mirkwood Forest",
      description: "Ein dunkler Wald - Könnte gefährlich sein..."
    },
    upsidedown: {
      name: "The Upside Down",
      description: "Legacy Systems - Nur für Experten zugänglich."
    }
  },

  // Detour messages
  detours: {
    arcade: {
      enter: "Du betrittst das Palace Arcade...",
      description: "Die blinkenden Automaten locken, aber das ist nicht der richtige Weg. Die Mission wartet woanders.",
      penalty: "-{penalty} SLA (Zeitverschwendung)"
    },
    forest: {
      enter: "Du verirrst dich im Mirkwood Forest...",
      description: "Die dunklen Pfade führen nirgendwohin. Du verlierst wertvolle Zeit. Kehre zurück zur Mission!",
      penalty: "-{penalty} SLA (Verirrt)"
    },
    upsidedown: {
      enter: "Du versuchst, ins Upside Down vorzudringen...",
      description: "Die Energie ist zu stark. Du bist noch nicht bereit für diesen Ort. Zugriff verweigert.",
      penalty: "-{penalty} Moral (Überforderung)"
    }
  },

  // Game UI
  ui: {
    progress: "Fortschritt: {completed}/{total}",
    priority: "PRIORITY: HIGH",
    travelTo: "Reise nach {location}...",
    stats: {
      speed: "SPD",
      accuracy: "ACC",
      hp: "HP",
      sla: "SLA",
      morale: "MORAL",
      quality: "QUALITÄT"
    }
  },

  // Skill selection screen
  skillSelect: {
    title: "WÄHLE DEINE AUSRÜSTUNG",
    subtitle: "Wähle ein Item für diesen Akt",
    selectButton: "AUSWÄHLEN",
    inventory: "Inventar",
    hint: "Wähle weise - Items sind verbrauchbar!",
    goodItems: "Verfügbare Items",
    badItems: "Riskante Items"
  },

  // Map screen
  mapScreen: {
    title: "EINSATZKARTE",
    selectLocation: "Wähle dein Ziel",
    locked: "GESPERRT",
    completed: "ABGESCHLOSSEN",
    unknown: "UNBEKANNT",
    completedProgress: "abgeschlossen",
    actHints: {
      act1: "ZIEL: TRIAGE IN DER STARCOURT MALL",
      act2: "ZIEL: TRAINING AN DER HAWKINS HIGH",
      act3: "ZIEL: KONFRONTATION IM HAWKINS LAB"
    }
  },

  // End screen
  endScreen: {
    victory: {
      title: "MISSION ERFÜLLT",
      subtitle: "Du hast Hawkins gerettet!",
      message: "Das System ist stabil. Das Upside Down wurde versiegelt. Du bist ein wahrer IT-Held!"
    },
    defeat: {
      title: "GAME OVER",
      subtitle: "Die Dunkelheit siegt",
      slaExpired: "Die Zeit ist abgelaufen. Das SLA wurde verletzt.",
      moraleZero: "Team-Moral zusammengebrochen. Das Team hat aufgegeben.",
      qualityZero: "Qualität auf Null gefallen. Das System ist instabil."
    },
    stats: {
      title: "Endstatistik",
      finalSla: "Finale SLA",
      finalMorale: "Finale Moral",
      finalQuality: "Finale Qualität",
      scenariosCompleted: "Szenarien abgeschlossen",
      wrongAnswers: "Falsche Entscheidungen"
    },
    wrongAnswersTitle: "Lernmöglichkeiten",
    wrongAnswerDetails: "Szenario: {title}",
    wrongAnswerSelected: "Du hast gewählt: {option}",
    wrongAnswerCorrect: "Richtig war: {option}",
    replayButton: "NOCHMAL SPIELEN",
    contributeTitle: "Möchtest du beitragen?",
    contributeText: "Dieses Spiel ist Open Source! Hilf uns, es zu verbessern:",
    contributeLink: "Auf GitHub beitragen"
  },

  // Scenarios - Act 1
  scenarios: {
    act1_1: {
      title: "Flackernde Lichter in der Starcourt Mall",
      environment: "Service-Desk-Ecke in der Starcourt Mall",
      hint: "Die Lichter flackern zuerst in der Mall. User beschreiben nur das Flackern – du musst herausfinden, ob wirklich etwas durchgebrannt ist.",
      description: "Später Abend in der Starcourt Mall. Die Neon-Schrift des Trading-Shops flackert.\n\n" +
        "Dein Pager explodiert:\n\n" +
        "TICKET:\n" +
        "Von: mueller.trading@hawkins-corp.example\n" +
        "Betreff: 'TRADING TOT!!! PRODUKTION STEHT!!!'\n\n" +
        "'Im neuen Trading-Bereich kann ich NICHTS bestellen! Sofort fixen!!!'\n\n" +
        "Andere Bildschirme leuchten ruhig. Müller spürt eine Störung.\n" +
        "Für ihn ist das 'der Demogorgon'. Für dich erstmal nur ein Signal.\n\n" +
        "Du musst entscheiden, wie du reagierst.",
      options: {
        incident: {
          label: "Den roten Alarmknopf drücken: P1-INCIDENT, alle wecken",
          outcome: "DU ZIEHST DEN HEBEL.\n\n" +
            "Infra und Dev springen auf, im Lab gehen Notlichter an.\n" +
            "Monitoring zeigt: Shop grün, andere Nutzer bestellen fröhlich.\n\n" +
            "Stunden später: Nur Müller ist blockiert.\n" +
            "Der 'Demogorgon' war nur seine persönliche Blockade.\n\n" +
            "Du hast die Stadt geweckt für eine einzelne Glühbirne."
        },
        request: {
          label: "Einfach als Service Request eintragen: 'Müller braucht Trading'",
          outcome: "DU TIPPST: 'Service Request – Trading-Zugang für Müller'.\n\n" +
            "Ein blaues Lämpchen in der Kategorie 'Requests'.\n" +
            "Problem: Ist es ein Bug, fehlende Rolle oder nie gebautes Feature?\n\n" +
            "Deine Klassifikation ist geraten."
        },
        inquiry: {
          label: "Wie Joyce bei den Lichterketten: erst alles genau fragen, bevor du schreiend losrennst",
          outcome: "DU HÄLTST INNE.\n\n" +
            "FRAGE 1: 'Kannst du andere Systeme erreichen?'\n" +
            "Müller: 'Ja, alles andere funktioniert.'\n\n" +
            "FRAGE 2: 'Hat Trading früher funktioniert?'\n" +
            "Müller: 'Ich habe es nie benutzt. Es ist neu.'\n\n" +
            "FRAGE 3: 'Haben Kollegen Zugriff?'\n" +
            "Müller (prüft): 'Ja, Anna kann bestellen.'\n\n" +
            "AH-HA: Es ist kein Systemausfall (Incident), kein allgemeines Feature-Request (Change Request), sondern: USER BRAUCHT TRADING-ROLLE.\n\n" +
            "Service Request: Trading-Rolle zuweisen.\n\n" +
            "20 Minuten. Problem gelöst. Kein Alarm. Keine Panik.\n" +
            "Müller ist glücklich. Team kann schlafen. Du bist wie Joyce: RUHIG, aber GRÜNDLICH."
        }
      }
    }
  },

  // Mini-game messages
  miniGames: {
    classify: {
      useItem: "Item nutzen",
      submit: "Entscheidung abgeben",
      selectOption: "Wähle eine Option oben"
    },
    memory: {
      title: "Memory-Spiel",
      instructions: "Finde die Paare durch Klicken auf die Karten",
      matchFound: "Paar gefunden!",
      tryAgain: "Kein Paar, versuche es nochmal"
    },
    logic: {
      title: "Logikrätsel",
      instructions: "Löse die logische Herausforderung",
      hint: "Denke sorgfältig nach..."
    },
    decipher: {
      title: "Code entschlüsseln",
      instructions: "Entschlüssle die Nachricht",
      guess: "Deine Vermutung",
      submit: "Absenden"
    },
    reflex: {
      title: "Reaktionstest",
      instructions: "Reagiere schnell, wenn das Signal erscheint!",
      ready: "Mach dich bereit...",
      go: "LOS!",
      tooSlow: "Zu langsam!",
      perfect: "Perfektes Timing!"
    }
  }
};
