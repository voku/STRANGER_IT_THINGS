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
    allScenariosCompleted: "Alle Szenarien in {location} wurden abgeschlossen.",
    systemFailure: "SYSTEM FAILURE: Kritische Grenzwerte unterschritten.",
    slaFailure: "SLA FAILURE: Zeit ist abgelaufen.",
    moraleCollapse: "MORAL COLLAPSE: Team-Moral ist zusammengebrochen.",
    qualityFailure: "QUALITY FAILURE: Ticket-Qualität ist auf Null gesunken."
  },

  // Stats panel
  stats: {
    violated: "VERLETZT",
    critical: "KRITISCH",
    warning: "WARNUNG",
    safe: "SICHER",
    sla: "SLA",
    morale: "MORAL",
    quality: "QUALITÄT"
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
    badItems: "Riskante Items",
    missionBriefs: {
      act1: "STARTE AKT 1: INCIDENT RESPONSE. Wähle dein Werkzeug für die erste Triage.",
      act2: "STARTE AKT 2: PERSPEKTIVENWECHSEL. Die Verwirrung breitet sich aus. Rüste dich für die Tiefenanalyse.",
      act3: "STARTE AKT 3: URSACHENFORSCHUNG. Die letzte Konfrontation. Wähle ein Werkzeug, um das System zu dekonstruieren."
    }
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

  // Mini-game classify component
  miniGame: {
    dataCorruption: "Datenkorruptionsfehler.",
    back: "ZURÜCK",
    confirm: "BESTÄTIGEN >>",
    submitRequest: "ANFRAGE SENDEN >>",
    chooseWisely: "Wähle weise. Deine Entscheidung beeinflusst die Team-Moral und die SLA.",
    recommended: "EMPFOHLEN",
    useItem: "NUTZE {item}",
    empty: "LEER"
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
    contributeLink: "Auf GitHub beitragen",
    reportNumber: "VORFALLSBERICHT",
    statusResolved: "GELÖST",
    statusCritical: "KRITISCH",
    agent: "AGENT",
    role: "ROLLE",
    equipment: "AUSRÜSTUNG",
    sector: "SEKTOR",
    sectorLab: "HAWKINS LAB",
    unknown: "UNBEKANNT",
    standardEquipment: "Standard-Ausrüstung",
    quality: "QUALITÄT",
    morale: "MORAL",
    sla: "SLA",
    errorAnalysis: "FEHLERANALYSE",
    errors: "Fehler",
    yourChoice: "Deine Wahl:",
    correctWas: "Richtig wäre:",
    // Narrative messages by role
    narrative: {
      serviceDesk: {
        victory: "Der Service Desk hat das Signal erfolgreich vom Rauschen getrennt. Der User-Nebel hat sich aufgelöst.",
        defeat: "Der Service Desk wurde von Hysterie überrannt. Unfähig, Störungen von Anfragen zu unterscheiden, kollabierte die Warteschlange."
      },
      iam: {
        victory: "Identitätsgrenzen durchgesetzt. Das Prinzip der geringsten Rechte hat das Königreich gerettet.",
        defeat: "Zugriffskontrollfehler. Berechtigungen wurden ohne Prüfung vergeben, die Tore stehen weit offen."
      },
      infrastructure: {
        victory: "Infrastruktur-Integrität gehalten. Du hast die Uptime erfolgreich gegen Fehlalarme verteidigt.",
        defeat: "Kritische Systeme ignoriert, während Phantomen nachgejagt wurde. Die physikalische Ebene ist kompromittiert."
      },
      developer: {
        victory: "Produktions-Code bewahrt. Du hast echte Bugs von gefährlichem Feature-Creep unterschieden.",
        defeat: "Technische Schulden explodiert. Die Codebasis ist nun mit Hotfixes für nicht existente Fehler verschmutzt."
      },
      licensing: {
        victory: "Compliance erreicht. Das Audit ergab null Abweichungen.",
        defeat: "Schatten-IT entdeckt. Unlizenzierte Software wuchert im Netzwerk."
      },
      erp: {
        victory: "Prozesslogik wiederhergestellt. Die Bücher sind ausgeglichen und die Workflows sauber.",
        defeat: "Datenkorruption in den Kernmodulen. Die Geschäftslogik ist zerbrochen."
      },
      purchasing: {
        victory: "Lieferkette gesichert. Kritische Assets kamen gerade noch rechtzeitig an.",
        defeat: "Logistik-Stau. Das Lager ist voll mit Anfragen, aber leer an Lösungen."
      },
      default: {
        victory: "System stabilisiert.",
        defeat: "Systemkollaps."
      }
    },
    // Skill impact messages
    skillImpact: {
      itilBook: {
        victory: "Der ITIL-Kodex lieferte die nötige Struktur.",
        defeat: "Selbst die heiligen Texte konnten dieses Chaos nicht verhindern."
      },
      coffee: {
        victory: "Koffeinpegel hielt die kognitive Leistung aufrecht.",
        defeat: "Der Koffein-Absturz kam im denkbar schlechtesten Moment."
      },
      debugger: {
        victory: "Die Ursachenanalyse war chirurgisch präzise.",
        defeat: "Der Debugger enthüllte nur noch mehr Fehler."
      },
      rubberDuck: {
        victory: "Die Gummiente hörte geduldig zu und führte dich zur Lösung.",
        defeat: "Du sprachst zur Ente, aber die Ente hörte nicht zu."
      }
    },
    // Warning messages
    warnings: {
      lowQuality: "WARNUNG: Klassifizierungsgenauigkeit war kritisch niedrig. Nachschulung empfohlen.",
      lowMorale: "ALARM: Team leidet unter schwerem Burnout.",
      lowSla: "HINWEIS: Mehrere SLA-Verletzungen verzeichnet.",
      defeatSla: "Grund für Niederlage: SLA-Puffer aufgebraucht – Incident-Handling zu langsam.",
      defeatMorale: "Grund für Niederlage: Team-Moral kollabiert – zu viel Ping-Pong oder Druck.",
      defeatQuality: "Grund für Niederlage: Ticket-Qualität bei 0 – falsche Klassifikation dominierte.",
      highScore: "BELOBIGUNG: Hervorragende Leistung in allen Metriken.",
      missedLearning: "Lernpfad verpasst: ITIL-Tempel/Change-Rätsel wurden übersprungen. Klassifizierungsmodell blieb unsauber.",
      wrongDecisions: "FEHLERANALYSE: {count} falsche Entscheidung(en) getroffen."
    }
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
      },
      successMessage: "Du hast wie Joyce mit den Lichterketten gearbeitet: erst verstehen, dann schreien.",
      failureMessage: "Du hast Hawkins in Bereitschaft versetzt, weil ein einzelner Fernseher flackerte."
    },

    // Act 2 - Role-specific perspectives
    act2_role_1: {
      title: "War Room unter der Mall – Die Incident-Lawine",
      environment: "Provisorischer Kontrollraum im Keller unter der Starcourt Mall",
      hint: "Du bist die erste Verteidigungslinie. Wie Hopper: Du entscheidest, ob die Stadt geweckt wird.",
      description: "War Room unter der Mall. Röhrenmonitore zeigen eingehende Tickets.\n\n" +
        "Eine Wand zeigt die letzten Wochen:\n" +
        "• 'Shop kaputt' → Berechtigungsproblem\n" +
        "• 'Mail-Server down' → Passwort abgelaufen\n" +
        "• 'Lizenzsystem tot' → User hatte nie Lizenz\n\n" +
        "Müllers Trading-Case blinkt wieder auf.\n" +
        "Für ihn Störung. Für die Organisation entscheidet deine Klassifikation.\n\n" +
        "Nicht alle Geräusche sind ein Demogorgon. Manchmal nur eine lockere Tür.",
      options: {
        incident: {
          label: "Alles, was nach Panik klingt, direkt als Incident markieren – sicher ist sicher",
          outcome: "DU LÄSST DIE SIRENEN HEULEN.\n\n" +
            "Die Incident-Wand färbt sich rot. Infra und Dev sehen 'Shop-Incident Trading'.\n" +
            "Später: System war stabil, fehlte nur eine Rolle.\n\n" +
            "Wieder ein 'Demogorgon' gerufen, wo nur eine verschlossene Tür war."
        },
        request: {
          label: "Du übersetzt Müllers Schrei in: 'Service Request – braucht Trading-Rolle, Impact: kann nicht bestellen'",
          outcome: "DU SCHREIBST:\n" +
            "'User kann nicht bestellen (für ihn Produktionsstillstand), andere OK, Fehlermeldung 'Access denied'. Trading-Rolle prüfen.'\n\n" +
            "Ein sauber beschriebener Request mit hohem Impact.\n" +
            "Müller bleibt subjektiv im Horror – aber du schickst es durch den richtigen Tunnel."
        }
      },
      successMessage: "Du bist Hopper im War Room: Du hörst den Schrei, aber du entscheidest, wie viele Streifenwagen fahren.",
      failureMessage: "Du hast erneut die SWAT-Einheit gerufen, um eine kaputte Kellertür zu begutachten."
    },

    act2_role_2: {
      title: "Tor zum Lab – Die Keycard-Rituale",
      environment: "Sicherheitsschleuse am Hawkins Lab",
      hint: "Für den vor der Tür fühlt sich alles gleich an: 'Ich komme nicht rein'. Für dich: Tür tot oder Keycard falsch.",
      description: "Haupteingang des Hawkins Lab. Stahltor, rote Anzeige: ACCESS CONTROL ONLINE.\n\n" +
        "Müllers Trading-Fall als Access-Problem bei dir.\n" +
        "Keycard-Konsole:\n" +
        "• System 'TRADING' → ONLINE\n" +
        "• Rolle 'TRADING_BUYER' → existiert\n" +
        "• Andere User mit Rolle → können bestellen\n" +
        "• Müller → hat nur 'SUPPLIER_SELLER'\n\n" +
        "Funktionierende Tür mit Schlüssel für den falschen Flur.\n" +
        "Von außen fühlt sich das an wie 'Tor zum Upside Down blockiert'.",
      options: {
        incident: {
          label: "Du meldest: 'Tor defekt' – Incident auf Tür und Schloss",
          outcome: "DU TRÄGST EIN: 'Haupttor defekt, berechtigte Person kommt nicht hinein'.\n\n" +
            "Später: Infra prüft Tor – alles okay. Dev checkt Türlogik – arbeitet exakt nach Rollenmodell.\n\n" +
            "Incident auf ein System, das genau das tut, was ihr ihm beigebracht habt."
        },
        request: {
          label: "Du meldest: 'Keycard-Erweiterung' – Request auf neue Rolle",
          outcome: "DU SCHREIBST:\n" +
            "'User Müller hat nur Lieferanten-Rolle. Für Trading benötigt er Käufer-Rolle. System verweigert zu Recht. Bitte Rolle ergänzen.'\n\n" +
            "Müllers Horror-Szene fachlich korrekt: kein Portal-Defekt, sondern fehlendes Ritual (Rolle)."
        }
      },
      successMessage: "Du bist der echte Gatekeeper: Du unterscheidest Dimensionentore von schlecht codierten Badges.",
      failureMessage: "Du hast dem Lab vorgeworfen, kaputt zu sein, obwohl es nur deinen Anweisungen zu Rollen gefolgt ist."
    },

    act2_role_3: {
      title: "Nerve Center – Die ruhigen Monitore",
      environment: "Monitoringraum unter Hawkins",
      hint: "In deiner Welt sind Demogorgons: CPU bei 100 %, Cluster down, Latency-Explosion. Ein einzelner panischer Schrei ist kein globaler Ausfall.",
      description: "Du sitzt im 'Nerve Center' unter Hawkins. Wand voller Monitore:\n" +
        "• Cluster-Status\n" +
        "• Latenzen\n" +
        "• Error-Rates\n" +
        "• Uptime-Grafen\n\n" +
        "Ein Alert vom Service Desk blinkt: 'TRADING KAPUTT – PRODUKTION STEHT'.\n\n" +
        "Du checkst:\n" +
        "• Trading-Cluster: grün\n" +
        "• Datenbank: stabil\n" +
        "• Error-Rates: normale Spitze, wenn alle gleichzeitig klicken\n" +
        "• Testbestellung mit System-Account: läuft sauber durch\n\n" +
        "Auf deinen Bildschirmen sieht die Welt verdächtig unspektakulär aus – kein Mind Flayer, nur etwas Rauschen.",
      options: {
        incident: {
          label: "Incident: 'Trading-Infrastruktur instabil' – man weiß ja nie",
          outcome: "DU SCHREIBST EINEN INFRA-INCIDENT:\n" +
            "'Trading-Instanzen verdächtig, User meldet Totalausfall.'\n\n" +
            "Die halbe Nacht lang werden Cluster gedreht, Pods gerestartet, Logs gewälzt – und alles ist gesund.\n" +
            "Deine Welt ist wie eine geglättete EKG-Linie ohne Alarm.\n\n" +
            "Du hast versucht, einen Schatten im Mall-Fernsehen mit einem Stromausfall im ganzen Land zu erklären."
        },
        request: {
          label: "Du antwortest: 'Aus Infra-Sicht kein Incident – Cluster ok, Problem wohl user-/rollenbezogen'",
          outcome: "DU FUNKST ZURÜCK:\n" +
            "'Infra-Checks grün, andere Trading-Bestellungen laufen. Kein Hinweis auf Infra-Incident. Vermutlich Berechtigung/Lizenz/Business-Logik. Bitte bei IAM/Dev prüfen.'\n\n" +
            "Damit bleibt der Nerve Center für echte Monster reserviert: CPU-Stürme, Netzspikes, Storage-Kollaps."
        }
      },
      successMessage: "Du hast den Mind Flayer im Blick, nicht jede Taschenlampe, die kurz klemmt.",
      failureMessage: "In deiner Incident-Liste stehen nur noch Geister – und wenn etwas wirklich brennt, findet es keiner."
    },

    act2_role_4: {
      title: "Palace Arcade – Der Phantom-Bug",
      environment: "Arcade + Dev-Terminal in Hawkins",
      hint: "Bug = das Spiel tut nicht, was die Spielregeln sagen. Kein Bug = das Spiel folgt den Regeln, die jemand schlecht definiert hat.",
      description: "Du sitzt zwischen Arcade-Automaten, dein Laptop ist an einen alten Automaten angeschlossen.\n" +
        "Neben 'Dragon's Lair' läuft jetzt: 'Trading Test Environment'.\n\n" +
        "Das Ticket 'Bug in Trading – Lieferant kann nicht bestellen' ist auf deinem Board.\n" +
        "Du spielst die Szene nach:\n" +
        "• Test-User mit Käufer-Rolle → Bestellung läuft wie durch Butter\n" +
        "• Test-User mit reiner Lieferanten-Rolle → 'Access denied' exakt an der Stelle, an der es im Code steht\n\n" +
        "Du liest das Domain-Modell: 'Lieferant darf verkaufen, Käufer darf kaufen'.\n" +
        "Trading (Lieferant kauft bei Lieferant) war im ursprünglichen Design nie sauber als Doppelrolle beschrieben.\n" +
        "Das Spiel läuft nach seinen (begrenzten) Regeln.",
      options: {
        incident: {
          label: "Als Incident weiterführen: 'Bug in Trading – Lieferant muss kaufen können'",
          outcome: "DU NENNST ES BUG.\n\n" +
            "Im Lab wird der Fall als Regression behandelt. Ihr sucht nach kaputten Commits, defekten Queries, Race Conditions.\n" +
            "Ihr findet nur eins: Der Code macht genau das, was im Modell steht.\n\n" +
            "Das Monster sitzt nicht im Code, sondern in der Idee, wie Rollen definiert wurden."
        },
        request: {
          label: "Kein Bug – System arbeitet nach Modell. Rollenproblem oder neue Anforderung",
          outcome: "DU SCHREIBST IN DEN TICKET-KOMMENTAR:\n\n" +
            "'Kein technischer Bug: System verhält sich gemäß Modell (Lieferant ≠ Käufer). Für 'Lieferant kauft bei Lieferant' brauchen wir entweder zusätzliche Rolle oder ein erweitertes Modell (Change). Bitte als Request/Change behandeln, nicht als Incident.'\n\n" +
            "Damit hörst du auf, Phantom-Demogorgons im Code zu jagen, und zeigst auf den Dungeon-Master: die Domänenmodellierung."
        }
      },
      successMessage: "Du spielst nicht nur D&D, du erkennst auch, wenn das Regelbuch selbst Schrott ist.",
      failureMessage: "Dein Backlog wird zur Schattenwelt: lauter 'Bugs', die eigentlich nur schlechte Regeln sind."
    },

    act2_role_5: {
      title: "Verbotene Bibliothek – Die stummen Lizenzen",
      environment: "Lizenzarchiv unter dem Rathaus von Hawkins",
      hint: "Brennender Lizenzserver = Incident. User ohne Lizenz = Request. Von außen sehen beide Szenen aus wie 'ich komme nicht an meine Bücher'.",
      description: "Tief unter dem Rathaus von Hawkins liegt die 'Verbotene Bibliothek'.\n" +
        "In einem Raum stehen alte Serverracks neben staubigen Regalen voller Lizenzverträge.\n\n" +
        "Ein Pergament flattert vom Luftzug der Klimaanlage:\n" +
        "'Müller – kein Zugriff auf Trading – prüfen!'\n\n" +
        "Du checkst das Lizenz-Orakel:\n" +
        "• Lizenzdienst: ONLINE\n" +
        "• Trading-Lizenz-Pool: nicht ausgeschöpft\n" +
        "• Müller: keine Trading-Lizenz zugewiesen\n\n" +
        "Für Müller ist es 'Bibliothek zu, alles brennt'.\n" +
        "In deiner Welt ist die Tür offen – er hat nur keinen Ausweis.",
      options: {
        incident: {
          label: "Lizenz-Incident: 'Lizenzsystem defekt, Nutzer bekommt nichts'",
          outcome: "DU SCHREIBST: 'Lizenzsystem Trading defekt – Nutzer bekommt keinen Zugriff.'\n\n" +
            "Admins untersuchen den Lizenzserver, Logs, Verbindungen – alles gesund.\n" +
            "Deine Incident-Liste wächst, aber kein Systemfehler ist in Sicht.\n\n" +
            "Der Schatten wurde wieder zum Monster erklärt, nur weil jemand im Dunkeln stand."
        },
        request: {
          label: "Service Request: 'Trading-Lizenz für Müller zuweisen (Impact: kann nicht bestellen)'",
          outcome: "DU LÖST EIN RITUAL AUS:\n" +
            "'User kann aktuell nicht arbeiten (kein Trading), Lizenzsystem stabil. Bitte Trading-Lizenz zuweisen.'\n\n" +
            "Das ist genau die Art von Magie, die hier hingehört: provisioning, nicht firefighting."
        }
      },
      successMessage: "Du unterscheidest verbrannte Bücher von fehlenden Ausweisen.",
      failureMessage: "In deiner Chronik steht 'Lizenzsystem ständig kaputt', obwohl es nur auf klare Requests gewartet hat."
    },

    act2_role_6: {
      title: "Hawkins Factory – Das Fließband ohne Aufträge",
      environment: "Virtuelle Produktionshalle mit ERP-Jobs als Maschinen",
      hint: "Ein gestopptes Band mit Fehlern im Log = Incident. Ein leeres Band, weil keiner etwas anliefert = Folgeproblem, kein ERP-Incident.",
      description: "Du stehst auf einer Plattform über der 'Hawkins Factory'.\n" +
        "Alle ERP-Jobs sind als Maschinen dargestellt, jede mit einem eigenen Takt.\n\n" +
        "Du schaust auf den Bereich 'Trading-Aufträge':\n" +
        "• alle Jobs grün\n" +
        "• keine Fehlermeldungen\n" +
        "• Maschine wartet, aber es liegen einfach keine neuen Auftragskisten auf dem Band\n\n" +
        "Müllers Meldung 'Produktion steht' hängt wie ein roter Fetzen an der Anzeigetafel.\n" +
        "Aus seiner Sicht: 'Die Fabrik macht nichts'.\n" +
        "Aus deiner Sicht: 'Die Fabrik wartet auf Material aus dem Shop.'",
      options: {
        incident: {
          label: "ERP-Incident: 'Jobfehler, Trading-Aufträge kommen nicht durch'",
          outcome: "DU ERÖFFNEST EINEN ERP-INCIDENT.\n\n" +
            "Ihr checkt Logs, Tabellen, Schnittstellen – alles bereit, alles wartet.\n" +
            "Kein Fehler, nur Leere.\n\n" +
            "Der Fehler sitzt nicht in der Fabrik, sondern in der Stadt, die nichts anliefert."
        },
        request: {
          label: "Du meldest: 'ERP bereit – keine Trading-Aufträge angeliefert, Ursache Upstream'",
          outcome: "DU SCHREIBST IN DAS TICKET:\n" +
            "'ERP-Jobs laufen einwandfrei, Schnittstelle vorbereitet. Es werden jedoch keine Trading-Aufträge angeliefert. Ursache liegt im vorgelagerten Prozess (Shop/Berechtigung). Kein ERP-Incident.'\n\n" +
            "Die Factory ist damit offiziell aus der direkten Schusslinie, auch wenn sie die Folgen spürt."
        }
      },
      successMessage: "Du weißt: Eine wartende Maschine ist nicht kaputt, nur hungrig.",
      failureMessage: "In deinen KPI sieht es so aus, als würde die Fabrik ständig versagen – tatsächlich hungert sie nur."
    },

    act2_role_7: {
      title: "Route 66 – Der leere Konvoi",
      environment: "Digitale Karte der Lieferwege rund um Hawkins",
      hint: "Lieferweg zerstört = Incident. Keine Bestellung ausgelöst = nicht dein Incident, nur Folge-Impact.",
      description: "Auf einem großen Tisch liegt eine Karte von Hawkins und Umgebung.\n" +
        "Leuchtpunkte markieren Lager, Fabriken und Lieferwege.\n\n" +
        "Beim Werk, in dem Müllers Material landen sollte, blinkt ein rotes Icon: 'Material fehlt'.\n" +
        "Du checkst die Route:\n" +
        "• Straße frei\n" +
        "• Spediteur verfügbar\n" +
        "• Lager hat Bestand\n" +
        "• Einzige Besonderheit: Keine Bestellung ins System eingelaufen\n\n" +
        "Müller erlebt: 'Die Welt liefert nicht'.\n" +
        "Du siehst: Niemand hat den Konvoi überhaupt losgeschickt.",
      options: {
        incident: {
          label: "Incident: 'Lieferkette gestört, Route blockiert'",
          outcome: "DU MELDEST EINEN SUPPLY-CHAIN-INCIDENT.\n\n" +
            "Logistik überprüft Straßen, Sperrungen, Lager – alles offen und bereit.\n" +
            "Die Route funktioniert, sie wurde nur nicht benutzt.\n\n" +
            "Die Monsterkarte zeigt einen Angriff, der nie stattgefunden hat."
        },
        request: {
          label: "Du meldest: 'Keine Bestellung ausgelöst – Lieferweg intakt, Ursache Upstream (Shop/Trading)'",
          outcome: "DU PROTOKOLLIERST:\n" +
            "'Lieferfähigkeit vorhanden, Route frei, Bestand verfügbar. Es liegt keine Bestellung vor. Ursache liegt im vorgelagerten System (Shop/Trading). Kein Lieferketten-Incident, nur Folge-Impact.'\n\n" +
            "Damit bleibt klar: Die Route ist nicht der Demogorgon, sie kriegt nur keinen Auftrag."
        }
      },
      successMessage: "Du unterscheidest zwischen zerstörter Straße und nicht losgefahrenem LKW.",
      failureMessage: "Offiziell ist bei dir ständig alles 'gestört', obwohl die LKW-Fahrer seit Tagen auf Start warten."
    },

    // Act 2 - Core scenarios
    act2_1: {
      title: "Klassenraum von Hawkins High – Drei Türen",
      environment: "Leerer Klassenraum mit drei leuchtenden Türen",
      hint: "Drei Türen, ein Problem: User erlebt Störung, du entscheidest die Tür.",
      description: "Du bist allein in einem Klassenraum von Hawkins High.\n" +
        "An der Tafel steht nur ein Satz:\n" +
        "'Es geht nicht.'\n\n" +
        "Vor dir schweben drei leuchtende Türen:\n" +
        "• Tür 1: INCIDENT – dahinter Blaulicht, Sirenen, Hopper brüllt Befehle\n" +
        "• Tür 2: SERVICE REQUEST – dahinter ordentliche Regale, Formulare, Kataloge\n" +
        "• Tür 3: CHANGE – dahinter Whiteboards, Roadmaps, Release-Planung\n\n" +
        "Über allem steht eine Projektion von Müllers Fall: 'Kann nicht bestellen. Für mich: alles kaputt.'\n" +
        "Welche Logik schreibst du an die Tafel?",
      options: {
        incident: {
          label: "'User entscheidet. Wenn er Incident schreit, ist es Incident.'",
          outcome: "DU SCHREIBST:\n" +
            "'User-Auswahl = Wahrheit.'\n\n" +
            "Alle drei Türen beginnen zu flackern.\n" +
            "In Tür 1 staut sich alles: echte Ausfälle neben 'ich hätte gern noch einen Button'.\n" +
            "Tür 2 wird kaum genutzt, Tür 3 verstaubt.\n\n" +
            "Das ist Hawkins, wenn man die Kinder den Sicherheitsplan schreiben lässt."
        },
        request: {
          label: "'User beschreibt Impact. IT entscheidet intern: Incident = kaputt, Request = bereitstellen, Change = verändern.'",
          outcome: "DU SCHREIBST:\n" +
            "'User = Impact, IT = Kategorie.'\n\n" +
            "Die Türen stabilisieren sich.\n" +
            "• Incident-Tür: alles, was vom definierten Sollzustand abweicht\n" +
            "• Request-Tür: alles, wo der Dienst da ist, der Anschluss aber fehlt\n" +
            "• Change-Tür: alles, was der Dienst noch nie konnte\n\n" +
            "Müllers Fall wird in deiner Projektion aufgeteilt:\n" +
            "Er erlebt Störung, du erkennst: wahrscheinlich Request oder Change, nicht zwingend Incident."
        }
      },
      successMessage: "Du hast verstanden: Die Kinder dürfen panisch sein, der Erwachsene sortiert die Antworten.",
      failureMessage: "Du hast Hawkins die Steuerung überlassen. Die Stadt klassifiziert ihre Monster selbst."
    },

    act2_2: {
      title: "Das Void – Der Button aus einer anderen Dimension",
      environment: "Leerraum zwischen Hawkins und dem Upside Down",
      hint: "Wenn etwas weder kaputt noch je vorhanden war, versuchst du nicht zu reparieren, sondern zu erschaffen.",
      description: "Du schwebst in einem schwarzen Raum – dem Interface Void.\n\n" +
        "Vor dir hängt ein Hologramm des Shops.\n" +
        "Ein User brüllt aus dem Nichts:\n" +
        "'Wo ist der 'Mind-Flayer-Kill-Button'? Den hattet ihr doch mal! Repariert das!'\n\n" +
        "Du lässt Release-Notizen, Commits und Katalogeinträge wie Polaroids an dir vorbeifliegen:\n" +
        "• Kein Eintrag zu diesem Button\n" +
        "• Kein Commit, der ihn einführt oder entfernt\n" +
        "• Kein Service-Katalog-Eintrag\n\n" +
        "Der Button existiert nur in der Fantasie oder in irgendeinem anderen Universum.",
      options: {
        incident: {
          label: "Incident: 'Button weg, System kaputt'",
          outcome: "DU SCHREIBST EINEN INCIDENT: 'Feature verschwunden'.\n\n" +
            "Dev jagt nach einem Commit, den es nie gab.\n" +
            "Infra sucht nach Config-Drift, die nicht existiert.\n" +
            "Am Ende bleibt nur Frust – das Universum war nie so gebaut."
        },
        request: {
          label: "Service Request: 'Bitte Mind-Flayer-Kill-Button bereitstellen'",
          outcome: "DU WIRFST ES IN DIE REQUEST-KISTE.\n\n" +
            "Dort liegen sonst Dinge, die es schon gibt: Accounts, Lizenzen, Standard-Optionen.\n" +
            "Niemand fühlt sich verantwortlich, weil der 'Button' in keinem Katalog definiert ist.\n" +
            "Das Ticket wird zum Geist im System."
        },
        change: {
          label: "Change: 'Neue Anforderung – Mind-Flayer-Kill-Button spezifizieren, bauen, ausrollen'",
          outcome: "DU SCHREIBST SAUBER AUF:\n" +
            "'User wünscht neues Feature. System konnte das nie. Muss als Change geplant, spezifiziert, entwickelt, getestet und ausgerollt werden.'\n\n" +
            "Das Void leuchtet kurz auf. Aus der Idee wird eine definierte Änderung – kein Phantom-Bug."
        }
      },
      successMessage: "Du hörst die Schreie, aber du reparierst nicht, was nie da war – du designst es.",
      failureMessage: "Dein Backlog besteht aus 'defekten' Features, die nie über ein D&D-Brainstorming hinauskamen."
    },

    // Act 3 - Boss Fight
    act3_1: {
      title: "Hawkins Lab Core – Der Mind Router",
      environment: "Unterstes Untergeschoss des Hawkins Lab",
      hint: "Der eigentliche Endgegner ist nicht der Demogorgon, sondern das Ding, das entscheidet, welche Monster wohin geschickt werden.",
      description: "Ganz unten im Hawkins Lab, unter allen Ebenen, steht eine Maschine, die nicht in den offiziellen Plänen steht.\n" +
        "Auf dem Gehäuse steht nur: ROUTING ENGINE.\n\n" +
        "Über Monitore siehst du, wie Tickets eingesogen werden:\n" +
        "'TRADING GEHT NICHT'\n" +
        "'BRAUCHE NEUES FEATURE'\n" +
        "'KEIN ZUGRIFF'\n\n" +
        "Im Inneren läuft eine erbärmlich kurze Logik:\n\n" +
        "```text\n" +
        "if user_selects == 'Incident' then\n" +
        "    queue = INCIDENT\n" +
        "else\n" +
        "    queue = REQUEST\n" +
        "```\n\n" +
        "Hinten fallen Incidents, Requests und Changes wild gemischt in falsche Queues.\n" +
        "In der Schattenwelt darüber wächst ein schwarzes Gebilde: ein Mind Flayer aus Fehlklassifikationen, Ticket-Ping-Pong und falschen Erwartungen.\n\n" +
        "Du kennst inzwischen die Signale:\n" +
        "• kann_user_arbeiten (true/false)\n" +
        "• service_war_vorher_da (true/false)\n" +
        "• verhalten_weicht_vom_soll_ab (true/false)\n" +
        "• gewünschtes_feature_im_katalog (true/false)\n\n" +
        "Der Mind Router muss refactored werden.",
      successMessage: "Du schreibst das innere Gesetz neu.\n\n" +
        "Die neue Logik ähnelt eher einem D&D-Regelwerk als einer Teenager-Entscheidung:\n\n" +
        "• Wenn Service vorher da war UND Verhalten jetzt vom Soll abweicht → Incident (Bug)\n" +
        "• Wenn Service da ist UND Verhalten korrekt, aber User nicht angeschlossen ist → Service Request (Rolle, Lizenz, Zugang)\n" +
        "• Wenn Service das noch nie konnte UND es nicht im Katalog steht → Change (neue Anforderung)\n\n" +
        "User dürfen weiter 'Störung', 'Problem', 'Bug' rufen.\n" +
        "Der Mind Router übersetzt ihre Schreie in ein konsistentes Modell.\n" +
        "Der Schatten aus Fehlklassifikationen löst sich auf wie Staub im Licht von Elfi.",
      failureMessage: "Du lässt die Logik fast so, wie sie war.\n\n" +
        "User-Auswahl bleibt Master Key.\n" +
        "Incidents, Requests und Changes landen weiter bunt gemischt in den falschen Dungeons.\n" +
        "Der Mind Flayer aus Ticket-Chaos wächst weiter – genährt von guter Absicht und schlechtem Modell."
    }
  },

  // Mini-game messages
  miniGames: {
    classify: {
      useItem: "Item nutzen",
      submit: "Entscheidung abgeben",
      selectOption: "Wähle eine Option oben",
      noItemAvailable: "⚠️ Kein Item verfügbar!",
      systemHintDecrypted: ">> SYSTEM-HINWEIS ENTSCHLÜSSELT:",
      optimalActionMarked: "OPTIMALE HANDLUNG MARKIERT"
    },
    memory: {
      title: "Memory-Spiel",
      instructions: "Finde die Paare durch Klicken auf die Karten",
      matchFound: "Paar gefunden!",
      tryAgain: "Kein Paar, versuche es nochmal",
      error: "FEHLER: SEQUENZ-ABWEICHUNG",
      watchPattern: "Beobachte das Muster...",
      receivingData: "EMPFANGE DATEN...",
      repeatSequence: "SEQUENZ WIEDERHOLEN",
      patchUploaded: "PATCH HOCHGELADEN",
      goodExtending: "GUT. ERWEITERE...",
      sequenceLabel: "SEQUENZ"
    },
    logic: {
      title: "Logikrätsel",
      instructions: "Löse die logische Herausforderung",
      hint: "Denke sorgfältig nach...",
      accessGranted: "Zugriff gewährt.",
      accessDenied: "Zugriff verweigert.",
      debuggerButton: "DEBUGGER STARTEN (AUTO-FIX)",
      autoRefactoring: ">> AUTOMATISCHES REFACTORING LÄUFT... ALIGNMENT ERZWUNGEN.",
      task: "AUFGABE:",
      taskConnect: "Verbinde",
      taskUser: "User",
      taskAnd: "und",
      taskRole: "Rolle",
      taskAllNodes: "Alle Knoten müssen",
      taskGreen: "GRÜN",
      taskDomainModel: "sein, damit das Domain-Modell kompiliert.",
      loading: "Lade Logik-Kern...",
      compileTime: "KOMPILIERZEIT:",
      refactorings: "REFAKTORIERUNGEN:",
      domainModelLevel: "DOMAIN-MODELL EBENE",
      core: "KERN",
      node: "KNOTEN",
      aligned: "AUSGERICHTET",
      defective: "DEFEKT"
    },
    decipher: {
      title: "Code entschlüsseln",
      instructions: "Entschlüssle die Nachricht",
      guess: "Deine Vermutung",
      submit: "Absenden",
      time: "ZEIT:",
      length: "LÄNGE:",
      skillModuleEmpty: "SKILL-MODUL LEER",
      decryptPassword: "ENTSCHLÜSSELE DAS KENNWORT"
    },
    reflex: {
      title: "Reaktionstest",
      instructions: "Reagiere schnell, wenn das Signal erscheint!",
      ready: "Mach dich bereit...",
      go: "LOS!",
      tooSlow: "Zu langsam!",
      perfect: "Perfektes Timing!"
    }
  },

  // Lifecycle diagram labels
  lifecycleDiagram: {
    incident: {
      title: "FEHLER / BUG",
      subtitle: "(Kaputt)",
      action: "REPARATUR",
      actionSubtitle: "Admin Fix"
    },
    change: {
      title: "NEUER SCOPE",
      subtitle: "(Erweiterung)",
      action: "ENTWICKLUNG",
      actionSubtitle: "CAB / Dev"
    },
    request: {
      title: "FÄHIGKEIT",
      subtitle: "(Bestellung)",
      action: "STANDARD",
      actionSubtitle: "Genehmigung"
    }
  }
};
