import { Act, Character, CharacterRole, MapLocation, Scenario, Skill } from "./types";

export const INITIAL_SLA = 100;
export const INITIAL_MORALE = 100;
export const INITIAL_QUALITY = 50;

// SLA decay configuration
export const SLA_DECAY_RATE = 2; // Percentage points reduced per interval
export const SLA_DECAY_INTERVAL = 30000; // 30 seconds in milliseconds

// Kern-Szenarien in Akt 2, die vor dem Boss erledigt sein sollen
export const ACT_2_CORE_SCENARIOS = ['act2_1', 'act2_2'];

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'MALL',
    name: 'Starcourt Mall',
    description: 'Das bunte Frontend. Startpunkt der Störung.',
    coords: { x: 50, y: 55 },
    type: 'NEUTRAL',
    requiredAct: Act.ACT_1_TICKET
  },
  {
    id: 'SCHOOL',
    name: 'Hawkins High',
    description: 'Knowledge Center. Hier lernst du deine Rolle.',
    coords: { x: 20, y: 35 },
    type: 'SAFE',
    requiredAct: Act.ACT_2_PERSPECTIVE
  },
  {
    id: 'LAB',
    name: 'Hawkins Lab',
    description: 'Core Backend. Die Quelle des Übels.',
    coords: { x: 80, y: 25 },
    type: 'DANGER',
    requiredAct: Act.ACT_3_BOSS
  },
  {
    id: 'ARCADE',
    name: 'Palace Arcade',
    description: 'Bonus Level (Gesperrt)',
    coords: { x: 30, y: 75 },
    type: 'SAFE'
  },
  {
    id: 'UPSIDEDOWN',
    name: 'The Upside Down',
    description: 'Legacy Systems (Gesperrt)',
    coords: { x: 70, y: 80 },
    type: 'DANGER'
  }
];

export const CHARACTERS: Character[] = [
  {
    id: '1',
    role: CharacterRole.SERVICE_DESK,
    name: "The Operator",
    description: "Der Filter. Weiß: User kennen keine SLAs oder Servicegrenzen.",
    specialAbility: "Deep Inquiry (Nachhaken)",
    stats: { sla: 60, quality: 90, morale: 80 },
    portraitEmoji: "🎧",
    themeColor: "text-pink-400 border-pink-500"
  },
  {
    id: '2',
    role: CharacterRole.IAM,
    name: "The Gatekeeper",
    description: "Verwaltet Zugänge. Weiß: Kein Zugriff ≠ System kaputt.",
    specialAbility: "Access Matrix Vision",
    stats: { sla: 80, quality: 70, morale: 90 },
    portraitEmoji: "🔐",
    themeColor: "text-yellow-400 border-yellow-500"
  },
  {
    id: '3',
    role: CharacterRole.INFRASTRUCTURE,
    name: "The Guardian",
    description: "Hüter der Stabilität. Incident = Ausfall. Request = Config.",
    specialAbility: "Uptime Shield",
    stats: { sla: 90, quality: 60, morale: 70 },
    portraitEmoji: "🛡️",
    themeColor: "text-blue-400 border-blue-500"
  },
  {
    id: '4',
    role: CharacterRole.DEVELOPER,
    name: "The Coder",
    description: "Code-Architekt. Unterscheidet Regression (Bug) von Requirement (Feature).",
    specialAbility: "Refactoring Beam",
    stats: { sla: 50, quality: 100, morale: 60 },
    portraitEmoji: "💻",
    themeColor: "text-green-400 border-green-500"
  },
  {
    id: '5',
    role: CharacterRole.LICENSING,
    name: "The Auditor",
    description: "Lizenz-Wächter. Incident = Server down. Request = Neues Abo.",
    specialAbility: "Fine Print Vision",
    stats: { sla: 40, quality: 80, morale: 50 },
    portraitEmoji: "📋",
    themeColor: "text-purple-400 border-purple-500"
  },
  {
    id: '6',
    role: CharacterRole.ERP,
    name: "The Architect",
    description: "Prozess-Eigner. Datenfehler = Incident. Neuer Report = Request.",
    specialAbility: "Workflow Bind",
    stats: { sla: 70, quality: 80, morale: 70 },
    portraitEmoji: "🏛️",
    themeColor: "text-cyan-400 border-cyan-500"
  },
  {
    id: '7',
    role: CharacterRole.PURCHASING,
    name: "The Ranger",
    description: "Logistik-Chef. Lieferstopp = Incident. Bestellanforderung = Request.",
    specialAbility: "Supply Chain Mastery",
    stats: { sla: 75, quality: 60, morale: 100 },
    portraitEmoji: "📦",
    themeColor: "text-emerald-400 border-emerald-500"
  }
];

export const SKILLS: Skill[] = [
    // Good Items
    {
        id: 'RUBBER_DUCK',
        name: "Rubber Duck",
        description: "Der stille Zuhörer. Hilft beim Nachdenken. (Einmalig)",
        icon: "🦆",
        color: "bg-yellow-600 border-yellow-400",
        targetAct: Act.ACT_1_TICKET,
        slaPenalty: 5, // Small penalty if used in wrong Act
        isBadItem: false
    },
    {
        id: 'ITIL_BOOK',
        name: "ITIL V4 Codex",
        description: "Enthüllt Hinweise in Act 1 & 2. (Einmalig)",
        icon: "📘",
        color: "bg-blue-800 border-blue-600",
        targetAct: Act.ACT_1_TICKET,
        slaPenalty: 5,
        isBadItem: false
    },
    {
        id: 'COFFEE',
        name: "Schwarzer Kaffee",
        description: "Universeller Fokus. Gibt kleine Hinweise überall. (Einmalig)",
        icon: "☕",
        color: "bg-orange-900 border-orange-700",
        targetAct: Act.ACT_2_PERSPECTIVE,
        slaPenalty: 3, // Lower penalty - more universal
        isBadItem: false
    },
    {
        id: 'DEBUGGER',
        name: "Root Cause Analyzer",
        description: "Enthüllt Logik-Fehler im Boss-Kampf. (Einmalig)",
        icon: "🐞",
        color: "bg-green-800 border-green-600",
        targetAct: Act.ACT_3_BOSS,
        slaPenalty: 10, // Higher penalty if used outside boss fight
        isBadItem: false
    },
    // Bad Items (negative effects)
    {
        id: 'EXPIRED_ENERGY_DRINK',
        name: "Abgelaufener Energy Drink",
        description: "Macht wach, aber schadet der Moral. -10 Moral beim Nutzen. (Einmalig)",
        icon: "🥤",
        color: "bg-red-900 border-red-700",
        targetAct: Act.ACT_1_TICKET,
        slaPenalty: 3,
        isBadItem: true,
        qualityEffect: 0,
        moraleEffect: -10
    },
    {
        id: 'OUTDATED_DOCUMENTATION',
        name: "Veraltete Doku",
        description: "Führt in die Irre. -5 Qualität beim Nutzen. (Einmalig)",
        icon: "📜",
        color: "bg-gray-800 border-gray-600",
        targetAct: Act.ACT_2_PERSPECTIVE,
        slaPenalty: 8,
        isBadItem: true,
        qualityEffect: -5,
        moraleEffect: 0
    },
    {
        id: 'BUGGY_SCRIPT',
        name: "Fehlerhaftes Script",
        description: "Automatisierung mit Nebenwirkungen. -5 Qualität, -5 Moral. (Einmalig)",
        icon: "⚠️",
        color: "bg-orange-900 border-orange-700",
        targetAct: Act.ACT_3_BOSS,
        slaPenalty: 15,
        isBadItem: true,
        qualityEffect: -5,
        moraleEffect: -5
    }
];

// Pre-defined System Messages for "AI" Flavor
export const SYSTEM_MESSAGES = {
    LOADING: [
        "Analysiere Soll-Zustand...",
        "Prüfe Legacy-Definitionen...",
        "Scanne nach Regressionen...",
        "Validiere User-Kontext...",
        "Lade Service-Katalog...",
        "Berechne SLA-Auswirkung..."
    ],
    SUCCESS: [
        "Klassifizierung: GÜLTIG.",
        "SLA Geschützt.",
        "Workflow Optimiert.",
        "Ursache Identifiziert.",
        "Prozess-Einhaltung: 100%."
    ],
    FAILURE: [
        "PROZESSVERLETZUNG.",
        "SLA VERLETZT.",
        "FALSCHE WARTESCHLANGE.",
        "UNDEFINIERTER ZUSTAND.",
        "RESSOURCEN VERSCHWENDET."
    ]
};

// The Linear Narrative Structure
export const STORY_SCENARIOS: Scenario[] = [
    // ACT 1: Das Ticket kommt rein
    {
        id: 'act1_1',
        act: Act.ACT_1_TICKET,
        type: 'TRIAGE',
        title: "Der User-Nebel",
        environment: "Service Desk Portal",
        hint: "ITIL Sagt: Prüfe immer zuerst den 'Soll-Zustand' vs 'Ist-Zustand'. Wenn das System technisch OK ist, aber der User nicht darf, ist es kein Incident.",
        description: "USER MÜLLER: 'HILFE!! Ich kann im neuen Trading-Bereich nichts bestellen! Der Shop ist kaputt! Produktion steht!!11' \n\nDu weißt: Der User kennt weder Servicegrenzen noch SLAs. Für ihn ist alles ein 'Problem'. Was tust du?",
        options: [
            {
                label: "Sofort INCIDENT! (Prio 1)",
                type: 'INCIDENT',
                outcome: "FEHLER. Du hast dem User blind geglaubt. Ein Incident bedeutet 'Abweichung vom Soll-Zustand' (Kaputt). Hier funktioniert das System technisch einwandfrei, der User darf nur nicht rein. Du hast Ressourcen für eine 'Reparatur' verschwendet, wo nichts zu reparieren ist.",
                qualityChange: -20,
                moraleChange: -30,
                isCorrect: false
            },
            {
                label: "REQUEST anlegen",
                type: 'REQUEST',
                outcome: "RISKANT. Statistisch wahrscheinlich, aber geraten. Ohne Prüfung weißt du nicht, ob es ein Bug (Incident) oder fehlende Rechte (Request) sind. Ein guter Agent prüft erst den 'Soll-Zustand'.",
                qualityChange: +10,
                moraleChange: 0,
                isCorrect: false
            },
            {
                label: "NACHFRAGEN: 'Was ist der Soll-Zustand?'",
                type: 'INQUIRY',
                outcome: "KORREKT. Diagnose: Der User bekommt 'Access Denied'. Das System verhält sich genau wie spezifiziert (Soll-Zustand). Es ist keine Störung, sondern eine Anforderung nach Erweiterung (Request). Der User wusste das nicht – woher auch?",
                qualityChange: +30,
                moraleChange: +10,
                isCorrect: true
            }
        ],
        successMessage: "Triage erfolgreich. User-Sicht von System-Sicht getrennt.",
        failureMessage: "Falsches Routing. Das Ping-Pong beginnt."
    },

    // --- ROLE SPECIFIC SCENARIOS (Act 2 Intro) ---

    // 1. Service Desk (Analogy: Emergency Room Triage)
    {
        id: 'act2_role_1',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Die Notaufnahme",
        environment: "Feldlazarett (Frontline)",
        hint: "Restoration (Blutung stoppen) hat Vorrang vor Enhancement (Schönheits-OP).",
        description: "DM: 'Du bist der Triage-Arzt. Ein Patient kommt mit einer arteriellen Blutung (System Down / Incident). Ein anderer Patient schreit, er hätte gerne eine schönere Nase (New Feature / Request). Wen behandelst du zuerst?'",
        options: [
            {
                label: "Die Blutung stoppen (INCIDENT)",
                type: 'INCIDENT',
                outcome: "KRITISCHER ERFOLG. Incident Management bedeutet 'Restoration of Service'. Leben gerettet. Die Nasen-OP (Request) kommt auf die Warteliste.",
                qualityChange: +25,
                moraleChange: +15,
                isCorrect: true
            },
            {
                label: "Die Nase operieren (REQUEST)",
                type: 'REQUEST',
                outcome: "KRITISCHER FEHLER. Während du die Nase verschönerst (Change/Request), verblutet der andere Patient (SLA Breach). Du hast Prioritäten missachtet.",
                qualityChange: -25,
                moraleChange: -30,
                isCorrect: false
            }
        ],
        successMessage: "Patient stabil. Triage korrekt.",
        failureMessage: "Patient verloren. Falsche Priorität."
    },

    // 2. IAM (Analogy: The Hotel Check-in)
    {
        id: 'act2_role_2',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Das Grand Hotel",
        environment: "Rezeption der Verdammten",
        hint: "Funktionierendes Schloss + falscher Schlüssel = Request (Neuer Schlüssel). Kaputtes Schloss = Incident.",
        description: "DM: 'Du bist der Concierge. Ein Gast schreit: 'Mein Schlüssel geht nicht für die Penthouse-Suite!' Du prüfst das System: Das Schloss ist online und intakt (Soll-Zustand). Der Gast hat aber nur eine Standard-Buchung.'",
        options: [
            {
                label: "Schloss austauschen (INCIDENT)",
                type: 'INCIDENT',
                outcome: "FEHLER. Du hast die Tür eingetreten und das Schloss getauscht. Das System (Tür) war aber nie kaputt. Es hat korrekt den Zutritt verweigert.",
                qualityChange: -15,
                moraleChange: -10,
                isCorrect: false
            },
            {
                label: "Upgrade buchen (REQUEST)",
                type: 'REQUEST',
                outcome: "ERFOLG. Du erkennst: Es ist ein 'Provisioning' Thema. Der Gast braucht ein Upgrade (Rechte), keine Reparatur.",
                qualityChange: +20,
                moraleChange: +10,
                isCorrect: true
            }
        ],
        successMessage: "Check-in erfolgreich. Sicherheit gewahrt.",
        failureMessage: "Zimmertür zerstört. Hotel-Manager wütend."
    },

    // 3. Infrastructure (Analogy: The Power Plant)
    {
        id: 'act2_role_3',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Das Kraftwerk",
        environment: "Reaktor-Kern",
        hint: "Turbine brennt = Incident. Neues Kabel verlegen = Request.",
        description: "DM: 'Du steuerst das Stromnetz. Warnung: Turbine 4 brennt (Incident/Ausfall). Gleichzeitig ruft der Bürgermeister an: Er will eine neue Stromleitung zum Rathaus gelegt haben (Request/Provisioning).'",
        options: [
            {
                label: "Turbine löschen (INCIDENT)",
                type: 'INCIDENT',
                outcome: "ERFOLG. Du hast den Blackout verhindert (Incident Management). Der Bürgermeister muss warten, bis das Netz stabil ist.",
                qualityChange: +25,
                moraleChange: +15,
                isCorrect: true
            },
            {
                label: "Kabel verlegen (REQUEST)",
                type: 'REQUEST',
                outcome: "FEHLER. Du verlegst neue Kabel, während das Kraftwerk explodiert. Was nützt der Anschluss, wenn kein Strom fließt?",
                qualityChange: -25,
                moraleChange: -25,
                isCorrect: false
            }
        ],
        successMessage: "Netz stabil. Blackout verhindert.",
        failureMessage: "Kernschmelze. Stadt im Dunkeln."
    },

    // 4. Developer (Analogy: The Restaurant Kitchen)
    {
        id: 'act2_role_4',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Die Höllen-Küche",
        environment: "Restaurant Pass",
        hint: "Ratte in der Suppe = Bug (Incident). Gast will vegane Option = Feature Request.",
        description: "DM: 'Du bist der Chefkoch. Ein Gast reklamiert: 'Da ist eine Ratte in meiner Suppe!' (Bug/Incident). Ein anderer Gast fragt: 'Können Sie das Steak auch vegan zubereiten?' (Feature Request).'",
        options: [
            {
                label: "Ratte entfernen (INCIDENT)",
                type: 'INCIDENT',
                outcome: "RICHTIG. Hygienemangel ist ein Abweichung vom Soll-Zustand (Bug). Das hat Prio 1 vor Sonderwünschen.",
                qualityChange: +20,
                moraleChange: +10,
                isCorrect: true
            },
            {
                label: "Veganes Steak erfinden (CHANGE)",
                type: 'CHANGE',
                outcome: "FEHLER. Du entwickelst neue Rezepte, während das Gesundheitsamt den Laden wegen Rattenbefall schließt.",
                qualityChange: -20,
                moraleChange: -20,
                isCorrect: false
            }
        ],
        successMessage: "Qualität gesichert. Essen serviert.",
        failureMessage: "Restaurant geschlossen. Gäste vergiftet."
    },

    // 5. Licensing (Analogy: The Library Archive)
    {
        id: 'act2_role_5',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Die Verbotene Bibliothek",
        environment: "Das Archiv",
        hint: "Buch brennt = Incident. Nutzer will Leseausweis = Request.",
        description: "DM: 'Du bist der Hüter der Bücher. Ein Regal steht in Flammen (Asset Damage / Incident). Ein Student steht am Tresen und möchte einen Bibliotheksausweis beantragen (Access Request).'",
        options: [
            {
                label: "Feuer löschen (INCIDENT)",
                type: 'INCIDENT',
                outcome: "ERFOLG. Assets geschützt. Ohne Bücher nützt auch der Ausweis nichts.",
                qualityChange: +20,
                moraleChange: +10,
                isCorrect: true
            },
            {
                label: "Ausweis ausstellen (REQUEST)",
                type: 'REQUEST',
                outcome: "FEHLER. Du füllst Formulare aus, während das Wissen der Welt verbrennt. Compliance hilft nicht gegen Asche.",
                qualityChange: -25,
                moraleChange: -15,
                isCorrect: false
            }
        ],
        successMessage: "Wissen bewahrt. Archiv intakt.",
        failureMessage: "Bibliothek niedergebrannt."
    },

    // 6. ERP (Analogy: The Alchemy Factory)
    {
        id: 'act2_role_6',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Die Alchemie-Fabrik",
        environment: "Produktionsstraße",
        hint: "Band steht still = Incident. Flaschenform ändern = Change/Request.",
        description: "DM: 'Die Trank-Abfüllanlage steht still, weil ein Zahnrad klemmt (Process Stop / Incident). Der Meister will außerdem ab morgen eckige statt runde Flaschen verwenden (Process Change).'",
        options: [
            {
                label: "Zahnrad lösen (INCIDENT)",
                type: 'INCIDENT',
                outcome: "ERFOLG. Der Fluss muss fließen. Incident Management stellt den Normalbetrieb wieder her.",
                qualityChange: +20,
                moraleChange: +10,
                isCorrect: true
            },
            {
                label: "Eckige Flaschen designen (CHANGE)",
                type: 'REQUEST',
                outcome: "FEHLER. Du designst neue Flaschen für eine Fabrik, die nichts produziert. Stillstand kostet Gold.",
                qualityChange: -20,
                moraleChange: -20,
                isCorrect: false
            }
        ],
        successMessage: "Produktion läuft. Quote erfüllt.",
        failureMessage: "Fabrik bankrott. Keine Tränke."
    },

    // 7. Purchasing (Analogy: The Supply Convoy)
    {
        id: 'act2_role_7',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Der Versorgungskonvoi",
        environment: "Supply Route 66",
        hint: "Brücke eingestürzt = Incident. Neue LKW bestellen = Request.",
        description: "DM: 'Du führst den Konvoi. Die Brücke vor euch ist eingestürzt (Supply Chain Break / Incident). Dein Funker fragt, ob wir für nächste Woche schnellere LKWs bestellen können (Procurement Request).'",
        options: [
            {
                label: "Brücke reparieren (INCIDENT)",
                type: 'INCIDENT',
                outcome: "ERFOLG. Die Route ist der kritische Pfad. Ohne Weg keine Lieferung, egal wie schnell die LKWs sind.",
                qualityChange: +25,
                moraleChange: +15,
                isCorrect: true
            },
            {
                label: "Schnellere LKWs kaufen (REQUEST)",
                type: 'REQUEST',
                outcome: "FEHLER. Du kaufst Sportwagen, die dann vor der kaputten Brücke im Stau stehen. Logistik versagt.",
                qualityChange: -25,
                moraleChange: -20,
                isCorrect: false
            }
        ],
        successMessage: "Lieferung angekommen. Versorgung gesichert.",
        failureMessage: "Konvoi gestrandet. Vorräte leer."
    },

    // ACT 2.1: ITIL Quiz
    {
        id: 'act2_1',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE', 
        title: "Der ITIL Tempel",
        environment: "Gedankenpalast",
        hint: "Restoration = Zurück zum alten Zustand. Provisioning = Etwas Neues geben.",
        description: "Was ist der fundamentale Unterschied für die interne Organisation?",
        options: [
            {
                label: "User entscheidet was es ist.",
                type: 'INCIDENT',
                outcome: "FALSCH. Der User kennt den 'Soll-Zustand' nicht. Er sieht nur ein Problem. Die IT muss entscheiden, ob repariert (Incident) oder geliefert (Request) wird.",
                qualityChange: -15,
                moraleChange: -10,
                isCorrect: false
            },
            {
                label: "Incident = Kaputt. Request = Neu.",
                type: 'REQUEST',
                outcome: "KORREKT. Incident = Wiederherstellung des definierten Services (Repair/Restoration). Request = Bereitstellung von etwas Neuem/Zusätzlichem (Provide/Provisioning).",
                qualityChange: +20,
                moraleChange: +10,
                isCorrect: true
            }
        ],
        successMessage: "Konzept verstanden: Restoration vs. Provisioning.",
        failureMessage: "Zurück auf Los. Du lässt den User die IT steuern."
    },
    // ACT 2.2: The Change Request
    {
        id: 'act2_2',
        act: Act.ACT_2_PERSPECTIVE,
        type: 'TRIAGE',
        title: "Die fehlende Magie",
        environment: "The Interface Void",
        hint: "Wenn es nicht kaputt ist (Incident) und nicht im Katalog steht (Request), muss der Katalog/Service geändert werden (Change).",
        description: "User: 'Ich finde den Eis-Wand-Button nicht! Repariert das!' (Soll-Zustand: Eis-Wand war nie Teil des Pakets). Was ist das?",
        options: [
            {
                label: "Incident (Reparieren)",
                type: 'INCIDENT',
                outcome: "FALSCH. Man kann nichts reparieren, was nie da war. Das System funktioniert wie spezifiziert (ohne Eis-Wand). Es ist kein Ausfall.",
                qualityChange: -15,
                moraleChange: -10,
                isCorrect: false
            },
            {
                label: "Request (Standard)",
                type: 'REQUEST',
                outcome: "FALSCH. Ein Service Request bedient sich aus dem Katalog (Standard). 'Eis-Wand' steht nicht im Katalog. Es ist also kein Standard-Prozess.",
                qualityChange: -5,
                moraleChange: 0,
                isCorrect: false
            },
            {
                label: "Change Request (Requirement)",
                type: 'CHANGE',
                outcome: "RICHTIG. Wir müssen den 'Soll-Zustand' ändern. Das ist ein neues Requirement (Feature). Das erfordert Entwicklung, Testing und Deployment -> Change Management.",
                qualityChange: +35,
                moraleChange: +15,
                isCorrect: true
            }
        ],
        successMessage: "Requirement erkannt. Nicht als Bug an Dev gegeben.",
        failureMessage: "Dev Team sucht Fehler im Code, der gar nicht existiert."
    },
    // ACT 3: Boss Fight
    {
        id: 'act3_1',
        act: Act.ACT_3_BOSS,
        type: 'MODEL_FIX',
        title: "Der Modell-Endgegner",
        environment: "Code Repository Core",
        hint: "Ein valides Modell muss 'Ist' mit 'Soll' abgleichen. Prüfe die Knoten, die 'Wunsch' statt 'Fakt' prüfen.",
        description: "Der Code prüft noch immer auf 'User sagt Incident'. Refactore das Modell auf 'Abgleich mit Soll-Zustand'!",
        difficultyLevel: 2,
        successMessage: "Refactoring erfolgreich! Automatische Triage aktiviert: Ist Soll == Ist? -> Request. Ist Soll != Ist? -> Incident.",
        failureMessage: "Spaghetti-Code. User fluten die Incident-Queue mit Wünschen."
    }
];
