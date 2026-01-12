import { Act, Character, CharacterRole, MapLocation, Scenario, Skill } from "./types";

export const INITIAL_SLA = 100;
export const INITIAL_MORALE = 100;
export const INITIAL_QUALITY = 50;

// SLA decay configuration
export const SLA_DECAY_RATE = 2; // Percentage points reduced per interval
export const SLA_DECAY_INTERVAL = 30000; // 30 seconds in milliseconds

// Kern-Szenarien in Akt 2, die vor dem Boss erledigt sein sollen
export const ACT_2_CORE_SCENARIOS = ['act2_1', 'act2_2'];

// Detour location penalties
export const DETOUR_PENALTIES = {
  ARCADE_SLA_PENALTY: 5,
  FOREST_SLA_PENALTY: 10,
  UPSIDEDOWN_MORALE_PENALTY: 5
};

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
    description: 'Gaming Paradies - Hier kannst du dich entspannen.',
    coords: { x: 30, y: 75 },
    type: 'SAFE',
    requiredAct: Act.ACT_1_TICKET
  },
  {
    id: 'FOREST',
    name: 'Mirkwood Forest',
    description: 'Ein dunkler Wald - Könnte gefährlich sein...',
    coords: { x: 65, y: 50 },
    type: 'DANGER',
    requiredAct: Act.ACT_1_TICKET
  },
  {
    id: 'UPSIDEDOWN',
    name: 'The Upside Down',
    description: 'Legacy Systems - Nur für Experten zugänglich.',
    coords: { x: 70, y: 80 },
    type: 'DANGER',
    requiredAct: Act.ACT_3_BOSS
  }
];

export const CHARACTERS: Character[] = [
  {
    id: '1',
    role: CharacterRole.SERVICE_DESK,
    name: "Chief Hopper",
    description: "Sheriff von Hawkins. Der erste Ansprechpartner. Weiß: User schreien 'Demogorgon', oft ist es nur eine kaputte Glühbirne.",
    specialAbility: "Tief Nachfragen (wie Joyce mit den Lichterketten)",
    stats: { sla: 60, quality: 90, morale: 80 },
    portraitEmoji: "👮",
    themeColor: "text-pink-400 border-pink-500"
  },
  {
    id: '2',
    role: CharacterRole.IAM,
    name: "Dr. Brenner",
    description: "Torwächter des Hawkins Lab. Verwaltet Zugänge und Keycards. Weiß: Keine Keycard ≠ Tor kaputt.",
    specialAbility: "Keycard-Rituale & Clearance-Level",
    stats: { sla: 80, quality: 70, morale: 90 },
    portraitEmoji: "🔬",
    themeColor: "text-yellow-400 border-yellow-500"
  },
  {
    id: '3',
    role: CharacterRole.INFRASTRUCTURE,
    name: "Bob Newby (Superheld)",
    description: "RadioShack-Manager und Tech-Experte. Hüter der Systeme. Incident = Stromausfall. Request = Neue Verkabelung.",
    specialAbility: "Uptime Shield & Nerve Center Überwachung",
    stats: { sla: 90, quality: 60, morale: 70 },
    portraitEmoji: "⚡",
    themeColor: "text-blue-400 border-blue-500"
  },
  {
    id: '4',
    role: CharacterRole.DEVELOPER,
    name: "Dustin Henderson",
    description: "Der kluge Stratege der Gang. Code-Architekt. Unterscheidet Bug (Demogorgon) von Feature (neue D&D-Regel).",
    specialAbility: "Cerebro-Refactoring & D&D-Logik",
    stats: { sla: 50, quality: 100, morale: 60 },
    portraitEmoji: "🎲",
    themeColor: "text-green-400 border-green-500"
  },
  {
    id: '5',
    role: CharacterRole.LICENSING,
    name: "Murray Bauman",
    description: "Verschwörungstheoretiker und Detektiv. Lizenz-Wächter. Incident = Überwachungssystem down. Request = Neue Abhörlizenz.",
    specialAbility: "Kleingedrucktes-Vision & Paranoia-Protokoll",
    stats: { sla: 40, quality: 80, morale: 50 },
    portraitEmoji: "🕵️",
    themeColor: "text-purple-400 border-purple-500"
  },
  {
    id: '6',
    role: CharacterRole.ERP,
    name: "Joyce Byers",
    description: "Organisatorin und Problemlöserin. Prozess-Eignerin. Datenfehler = Incident. Neuer Workflow = Request.",
    specialAbility: "Lichterketten-Kommunikation & Mutter-Instinkt",
    stats: { sla: 70, quality: 80, morale: 70 },
    portraitEmoji: "💡",
    themeColor: "text-cyan-400 border-cyan-500"
  },
  {
    id: '7',
    role: CharacterRole.PURCHASING,
    name: "Steve Harrington",
    description: "Scoops Ahoy Manager. Logistik-Chef. Lieferstopp = Incident. Bestellanforderung = Request.",
    specialAbility: "Ice Cream Supply Chain & Kundendienst",
    stats: { sla: 75, quality: 60, morale: 100 },
    portraitEmoji: "🍦",
    themeColor: "text-emerald-400 border-emerald-500"
  }
];

export const SKILLS: Skill[] = [
    // Good Items
    {
        id: 'RUBBER_DUCK',
        name: "Dart (Baby Demogorgon)",
        description: "Dustins Haustier. Der stille Begleiter. Hilft beim Nachdenken. (Einmalig)",
        icon: "🦎",
        color: "bg-yellow-600 border-yellow-400",
        targetAct: Act.ACT_1_TICKET,
        slaPenalty: 5, // Small penalty if used in wrong Act
        isBadItem: false
    },
    {
        id: 'ITIL_BOOK',
        name: "D&D Regelwerk",
        description: "Dungeons & Dragons Handbuch. Enthüllt Hinweise in Act 1 & 2. (Einmalig)",
        icon: "🎲",
        color: "bg-blue-800 border-blue-600",
        targetAct: Act.ACT_1_TICKET,
        slaPenalty: 5,
        isBadItem: false
    },
    {
        id: 'COFFEE',
        name: "Scoops Ahoy Eiskaffee",
        description: "Steves Spezialität. Universeller Fokus. Gibt kleine Hinweise überall. (Einmalig)",
        icon: "🍨",
        color: "bg-orange-900 border-orange-700",
        targetAct: Act.ACT_2_PERSPECTIVE,
        slaPenalty: 3, // Lower penalty - more universal
        isBadItem: false
    },
    {
        id: 'DEBUGGER',
        name: "Cerebro",
        description: "Dustins Hochleistungs-Radio. Enthüllt Logik-Fehler im Boss-Kampf. (Einmalig)",
        icon: "📡",
        color: "bg-green-800 border-green-600",
        targetAct: Act.ACT_3_BOSS,
        slaPenalty: 10, // Higher penalty if used outside boss fight
        isBadItem: false
    },
    // Bad Items (negative effects)
    {
        id: 'EXPIRED_ENERGY_DRINK',
        name: "Verseuchtes Wasser",
        description: "Aus dem Hawkins Pool. Macht wach, aber schadet der Moral. -10 Moral beim Nutzen. (Einmalig)",
        icon: "☣️",
        color: "bg-red-900 border-red-700",
        targetAct: Act.ACT_1_TICKET,
        slaPenalty: 3,
        isBadItem: true,
        moraleEffect: -10
    },
    {
        id: 'OUTDATED_DOCUMENTATION',
        name: "Brenners alte Notizen",
        description: "Veraltete Lab-Protokolle. Führen in die Irre. -5 Qualität beim Nutzen. (Einmalig)",
        icon: "📋",
        color: "bg-gray-800 border-gray-600",
        targetAct: Act.ACT_2_PERSPECTIVE,
        slaPenalty: 8,
        isBadItem: true,
        qualityEffect: -5
    },
    {
        id: 'BUGGY_SCRIPT',
        name: "Mind Flayer Fragment",
        description: "Dunkle Macht aus dem Upside Down. Automatisierung mit Nebenwirkungen. -5 Qualität, -5 Moral. (Einmalig)",
        icon: "🕷️",
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
        "Scanne Upside Down Portal...",
        "Prüfe Demogorgon-Signatur...",
        "Validiere Mind Flayer Muster...",
        "Analysiere Lichterketten-Code...",
        "Lade Lab-Protokolle...",
        "Berechne Hawkins-Timeline..."
    ],
    SUCCESS: [
        "Portal geschlossen.",
        "Hawkins gesichert.",
        "Kommunikation wiederhergestellt.",
        "Monster identifiziert.",
        "Timeline stabil: 100%."
    ],
    FAILURE: [
        "DIMENSIONSRISS ERKANNT.",
        "HAWKINS IN GEFAHR.",
        "FALSCHE DIMENSION.",
        "UNBEKANNTES WESEN.",
        "ENERGIEVERLUST KRITISCH."
    ]
};

// The Linear Narrative Structure
export const STORY_SCENARIOS: Scenario[] = [
  // ACT 1: Erstes Ticket – User-Perspektive, Impact vs Ursache
  {
    id: 'act1_1',
    act: Act.ACT_1_TICKET,
    type: 'TRIAGE',
    title: "Flackernde Lichter in der Starcourt Mall",
    environment: "Service-Desk-Ecke in der Starcourt Mall",
    hint: "Die Lichter flackern zuerst in der Mall. User beschreiben nur das Flackern – du musst herausfinden, ob wirklich etwas durchgebrannt ist.",
    description:
      "Später Abend in der Starcourt Mall. Die Neon-Schrift des Trading-Shops flackert.\n\n" +
      "Dein Pager explodiert:\n\n" +
      "TICKET:\n" +
      "Von: mueller.trading@hawkins-corp.example\n" +
      "Betreff: 'TRADING TOT!!! PRODUKTION STEHT!!!'\n\n" +
      "'Im neuen Trading-Bereich kann ich NICHTS bestellen! Sofort fixen!!!'\n\n" +
      "Andere Bildschirme leuchten ruhig. Müller spürt eine Störung.\n" +
      "Für ihn ist das 'der Demogorgon'. Für dich erstmal nur ein Signal.\n\n" +
      "Du musst entscheiden, wie du reagierst.",
    options: [
      {
        label: "Den roten Alarmknopf drücken: P1-INCIDENT, alle wecken",
        type: 'INCIDENT',
        outcome:
          "DU ZIEHST DEN HEBEL.\n\n" +
          "Infra und Dev springen auf, im Lab gehen Notlichter an.\n" +
          "Monitoring zeigt: Shop grün, andere Nutzer bestellen fröhlich.\n\n" +
          "Stunden später: Nur Müller ist blockiert.\n" +
          "Der 'Demogorgon' war nur seine persönliche Blockade.\n\n" +
          "Du hast die Stadt geweckt für eine einzelne Glühbirne.",
        qualityChange: -20,
        moraleChange: -20,
        isCorrect: false
      },
      {
        label: "Einfach als Service Request eintragen: 'Müller braucht Trading'",
        type: 'REQUEST',
        outcome:
          "DU TIPPST: 'Service Request – Trading-Zugang für Müller'.\n\n" +
          "Ein blaues Lämpchen in der Kategorie 'Requests'.\n" +
          "Problem: Ist es ein Bug, fehlende Rolle oder nie gebautes Feature?\n\n" +
          "Deine Klassifikation ist geraten.",
        qualityChange: +5,
        moraleChange: 0,
        isCorrect: false
      },
      {
        label: "Wie Joyce bei den Lichterketten: erst alles genau fragen, bevor du schreiend losrennst",
        type: 'INQUIRY',
        outcome:
          "DU ATMEST DURCH.\n\n" +
          "Du fragst zurück:\n" +
          "'Welchen Button? Welche Meldung? Seit wann? Können andere im Trading bestellen?'\n\n" +
          "Antwort: 'Access denied'. Kollegen können bestellen.\n\n" +
          "Jetzt hast du:\n" +
          "• Impact: Für Müller steht die Welt\n" +
          "• Systembild: andere okay, Trading nicht tot\n" +
          "• Verdacht: Rollen/Berechtigungen, nicht System-Incident\n\n" +
          "Du trennst zum ersten Mal: User-Störung ≠ System-Incident.",
        qualityChange: +30,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du hast wie Joyce mit den Lichterketten gearbeitet: erst verstehen, dann schreien.",
    failureMessage: "Du hast Hawkins in Bereitschaft versetzt, weil ein einzelner Fernseher flackerte."
  },

  // --- ACT 2: Rollen-spezifische Perspektiven im Stranger-Things-Setting ---

  // 1. Service Desk
  {
    id: 'act2_role_1',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "War Room unter der Mall – Die Incident-Lawine",
    environment: "Provisorischer Kontrollraum im Keller unter der Starcourt Mall",
    hint: "Du bist die erste Verteidigungslinie. Wie Hopper: Du entscheidest, ob die Stadt geweckt wird.",
    description:
      "War Room unter der Mall. Röhrenmonitore zeigen eingehende Tickets.\n\n" +
      "Eine Wand zeigt die letzten Wochen:\n" +
      "• 'Shop kaputt' → Berechtigungsproblem\n" +
      "• 'Mail-Server down' → Passwort abgelaufen\n" +
      "• 'Lizenzsystem tot' → User hatte nie Lizenz\n\n" +
      "Müllers Trading-Case blinkt wieder auf.\n" +
      "Für ihn Störung. Für die Organisation entscheidet deine Klassifikation.\n\n" +
      "Nicht alle Geräusche sind ein Demogorgon. Manchmal nur eine lockere Tür.",
    options: [
      {
        label: "Alles, was nach Panik klingt, direkt als Incident markieren – sicher ist sicher",
        type: 'INCIDENT',
        outcome:
          "DU LÄSST DIE SIRENEN HEULEN.\n\n" +
          "Die Incident-Wand färbt sich rot. Infra und Dev sehen 'Shop-Incident Trading'.\n" +
          "Später: System war stabil, fehlte nur eine Rolle.\n\n" +
          "Wieder ein 'Demogorgon' gerufen, wo nur eine verschlossene Tür war.",
        qualityChange: -15,
        moraleChange: -10,
        isCorrect: false
      },
      {
        label: "Du übersetzt Müllers Schrei in: 'Service Request – braucht Trading-Rolle, Impact: kann nicht bestellen'",
        type: 'REQUEST',
        outcome:
          "DU SCHREIBST:\n" +
          "'User kann nicht bestellen (für ihn Produktionsstillstand), andere OK, Fehlermeldung \'Access denied\'. Trading-Rolle prüfen.'\n\n" +
          "Ein sauber beschriebener Request mit hohem Impact.\n" +
          "Müller bleibt subjektiv im Horror – aber du schickst es durch den richtigen Tunnel.",
        qualityChange: +25,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du bist Hopper im War Room: Du hörst den Schrei, aber du entscheidest, wie viele Streifenwagen fahren.",
    failureMessage: "Du hast erneut die SWAT-Einheit gerufen, um eine kaputte Kellertür zu begutachten."
  },

  // 2. IAM
  {
    id: 'act2_role_2',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Tor zum Lab – Die Keycard-Rituale",
    environment: "Sicherheitsschleuse am Hawkins Lab",
    hint: "Für den vor der Tür fühlt sich alles gleich an: 'Ich komme nicht rein'. Für dich: Tür tot oder Keycard falsch.",
    description:
      "Haupteingang des Hawkins Lab. Stahltor, rote Anzeige: ACCESS CONTROL ONLINE.\n\n" +
      "Müllers Trading-Fall als Access-Problem bei dir.\n" +
      "Keycard-Konsole:\n" +
      "• System 'TRADING' → ONLINE\n" +
      "• Rolle 'TRADING_BUYER' → existiert\n" +
      "• Andere User mit Rolle → können bestellen\n" +
      "• Müller → hat nur 'SUPPLIER_SELLER'\n\n" +
      "Funktionierende Tür mit Schlüssel für den falschen Flur.\n" +
      "Von außen fühlt sich das an wie 'Tor zum Upside Down blockiert'.",
    options: [
      {
        label: "Du meldest: 'Tor defekt' – Incident auf Tür und Schloss",
        type: 'INCIDENT',
        outcome:
          "DU TRÄGST EIN: 'Haupttor defekt, berechtigte Person kommt nicht hinein'.\n\n" +
          "Später: Infra prüft Tor – alles okay. Dev checkt Türlogik – arbeitet exakt nach Rollenmodell.\n\n" +
          "Incident auf ein System, das genau das tut, was ihr ihm beigebracht habt.",
        qualityChange: -15,
        moraleChange: -10,
        isCorrect: false
      },
      {
        label: "Du meldest: 'Keycard-Erweiterung' – Request auf neue Rolle",
        type: 'REQUEST',
        outcome:
          "DU SCHREIBST:\n" +
          "'User Müller hat nur Lieferanten-Rolle. Für Trading benötigt er Käufer-Rolle. System verweigert zu Recht. Bitte Rolle ergänzen.'\n\n" +
          "Müllers Horror-Szene fachlich korrekt: kein Portal-Defekt, sondern fehlendes Ritual (Rolle).",
        qualityChange: +25,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du bist der echte Gatekeeper: Du unterscheidest Dimensionentore von schlecht codierten Badges.",
    failureMessage: "Du hast dem Lab vorgeworfen, kaputt zu sein, obwohl es nur deinen Anweisungen zu Rollen gefolgt ist."
  },

  // 3. Infrastructure
  {
    id: 'act2_role_3',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Nerve Center – Die ruhigen Monitore",
    environment: "Monitoringraum unter Hawkins",
    hint: "In deiner Welt sind Demogorgons: CPU bei 100 %, Cluster down, Latency-Explosion. Ein einzelner panischer Schrei ist kein globaler Ausfall.",
    description:
      "Du sitzt im 'Nerve Center' unter Hawkins. Wand voller Monitore:\n" +
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
    options: [
      {
        label: "Incident: 'Trading-Infrastruktur instabil' – man weiß ja nie",
        type: 'INCIDENT',
        outcome:
          "DU SCHREIBST EINEN INFRA-INCIDENT:\n" +
          "'Trading-Instanzen verdächtig, User meldet Totalausfall.'\n\n" +
          "Die halbe Nacht lang werden Cluster gedreht, Pods gerestartet, Logs gewälzt – und alles ist gesund.\n" +
          "Deine Welt ist wie eine geglättete EKG-Linie ohne Alarm.\n\n" +
          "Du hast versucht, einen Schatten im Mall-Fernsehen mit einem Stromausfall im ganzen Land zu erklären.",
        qualityChange: -20,
        moraleChange: -15,
        isCorrect: false
      },
      {
        label: "Du antwortest: 'Aus Infra-Sicht kein Incident – Cluster ok, Problem wohl user-/rollenbezogen'",
        type: 'REQUEST',
        outcome:
          "DU FUNKST ZURÜCK:\n" +
          "'Infra-Checks grün, andere Trading-Bestellungen laufen. Kein Hinweis auf Infra-Incident. Vermutlich Berechtigung/Lizenz/Business-Logik. Bitte bei IAM/Dev prüfen.'\n\n" +
          "Damit bleibt der Nerve Center für echte Monster reserviert: CPU-Stürme, Netzspikes, Storage-Kollaps.",
        qualityChange: +20,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du hast den Mind Flayer im Blick, nicht jede Taschenlampe, die kurz klemmt.",
    failureMessage: "In deiner Incident-Liste stehen nur noch Geister – und wenn etwas wirklich brennt, findet es keiner."
  },

  // 4. Developer
  {
    id: 'act2_role_4',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Palace Arcade – Der Phantom-Bug",
    environment: "Arcade + Dev-Terminal in Hawkins",
    hint: "Bug = das Spiel tut nicht, was die Spielregeln sagen. Kein Bug = das Spiel folgt den Regeln, die jemand schlecht definiert hat.",
    description:
      "Du sitzt zwischen Arcade-Automaten, dein Laptop ist an einen alten Automaten angeschlossen.\n" +
      "Neben 'Dragon\\'s Lair' läuft jetzt: 'Trading Test Environment'.\n\n" +
      "Das Ticket 'Bug in Trading – Lieferant kann nicht bestellen' ist auf deinem Board.\n" +
      "Du spielst die Szene nach:\n" +
      "• Test-User mit Käufer-Rolle → Bestellung läuft wie durch Butter\n" +
      "• Test-User mit reiner Lieferanten-Rolle → 'Access denied' exakt an der Stelle, an der es im Code steht\n\n" +
      "Du liest das Domain-Modell: 'Lieferant darf verkaufen, Käufer darf kaufen'.\n" +
      "Trading (Lieferant kauft bei Lieferant) war im ursprünglichen Design nie sauber als Doppelrolle beschrieben.\n" +
      "Das Spiel läuft nach seinen (begrenzten) Regeln.",
    options: [
      {
        label: "Als Incident weiterführen: 'Bug in Trading – Lieferant muss kaufen können'",
        type: 'INCIDENT',
        outcome:
          "DU NENNST ES BUG.\n\n" +
          "Im Lab wird der Fall als Regression behandelt. Ihr sucht nach kaputten Commits, defekten Queries, Race Conditions.\n" +
          "Ihr findet nur eins: Der Code macht genau das, was im Modell steht.\n\n" +
          "Das Monster sitzt nicht im Code, sondern in der Idee, wie Rollen definiert wurden.",
        qualityChange: -20,
        moraleChange: -15,
        isCorrect: false
      },
      {
        label: "Kein Bug – System arbeitet nach Modell. Rollenproblem oder neue Anforderung",
        type: 'REQUEST',
        outcome:
          "DU SCHREIBST IN DEN TICKET-KOMMENTAR:\n\n" +
          "'Kein technischer Bug: System verhält sich gemäß Modell (Lieferant ≠ Käufer). Für 'Lieferant kauft bei Lieferant' brauchen wir entweder zusätzliche Rolle oder ein erweitertes Modell (Change). Bitte als Request/Change behandeln, nicht als Incident.'\n\n" +
          "Damit hörst du auf, Phantom-Demogorgons im Code zu jagen, und zeigst auf den Dungeon-Master: die Domänenmodellierung.",
        qualityChange: +25,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du spielst nicht nur D&D, du erkennst auch, wenn das Regelbuch selbst Schrott ist.",
    failureMessage: "Dein Backlog wird zur Schattenwelt: lauter 'Bugs', die eigentlich nur schlechte Regeln sind."
  },

  // 5. Licensing
  {
    id: 'act2_role_5',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Verbotene Bibliothek – Die stummen Lizenzen",
    environment: "Lizenzarchiv unter dem Rathaus von Hawkins",
    hint: "Brennender Lizenzserver = Incident. User ohne Lizenz = Request. Von außen sehen beide Szenen aus wie 'ich komme nicht an meine Bücher'.",
    description:
      "Tief unter dem Rathaus von Hawkins liegt die 'Verbotene Bibliothek'.\n" +
      "In einem Raum stehen alte Serverracks neben staubigen Regalen voller Lizenzverträge.\n\n" +
      "Ein Pergament flattert vom Luftzug der Klimaanlage:\n" +
      "'Müller – kein Zugriff auf Trading – prüfen!'\n\n" +
      "Du checkst das Lizenz-Orakel:\n" +
      "• Lizenzdienst: ONLINE\n" +
      "• Trading-Lizenz-Pool: nicht ausgeschöpft\n" +
      "• Müller: keine Trading-Lizenz zugewiesen\n\n" +
      "Für Müller ist es 'Bibliothek zu, alles brennt'.\n" +
      "In deiner Welt ist die Tür offen – er hat nur keinen Ausweis.",
    options: [
      {
        label: "Lizenz-Incident: 'Lizenzsystem defekt, Nutzer bekommt nichts'",
        type: 'INCIDENT',
        outcome:
          "DU SCHREIBST: 'Lizenzsystem Trading defekt – Nutzer bekommt keinen Zugriff.'\n\n" +
          "Admins untersuchen den Lizenzserver, Logs, Verbindungen – alles gesund.\n" +
          "Deine Incident-Liste wächst, aber kein Systemfehler ist in Sicht.\n\n" +
          "Der Schatten wurde wieder zum Monster erklärt, nur weil jemand im Dunkeln stand.",
        qualityChange: -20,
        moraleChange: -15,
        isCorrect: false
      },
      {
        label: "Service Request: 'Trading-Lizenz für Müller zuweisen (Impact: kann nicht bestellen)'",
        type: 'REQUEST',
        outcome:
          "DU LÖST EIN RITUAL AUS:\n" +
          "'User kann aktuell nicht arbeiten (kein Trading), Lizenzsystem stabil. Bitte Trading-Lizenz zuweisen.'\n\n" +
          "Das ist genau die Art von Magie, die hier hingehört: provisioning, nicht firefighting.",
        qualityChange: +25,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du unterscheidest verbrannte Bücher von fehlenden Ausweisen.",
    failureMessage: "In deiner Chronik steht 'Lizenzsystem ständig kaputt', obwohl es nur auf klare Requests gewartet hat."
  },

  // 6. ERP
  {
    id: 'act2_role_6',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Hawkins Factory – Das Fließband ohne Aufträge",
    environment: "Virtuelle Produktionshalle mit ERP-Jobs als Maschinen",
    hint: "Ein gestopptes Band mit Fehlern im Log = Incident. Ein leeres Band, weil keiner etwas anliefert = Folgeproblem, kein ERP-Incident.",
    description:
      "Du stehst auf einer Plattform über der 'Hawkins Factory'.\n" +
      "Alle ERP-Jobs sind als Maschinen dargestellt, jede mit einem eigenen Takt.\n\n" +
      "Du schaust auf den Bereich 'Trading-Aufträge':\n" +
      "• alle Jobs grün\n" +
      "• keine Fehlermeldungen\n" +
      "• Maschine wartet, aber es liegen einfach keine neuen Auftragskisten auf dem Band\n\n" +
      "Müllers Meldung 'Produktion steht' hängt wie ein roter Fetzen an der Anzeigetafel.\n" +
      "Aus seiner Sicht: 'Die Fabrik macht nichts'.\n" +
      "Aus deiner Sicht: 'Die Fabrik wartet auf Material aus dem Shop.'",
    options: [
      {
        label: "ERP-Incident: 'Jobfehler, Trading-Aufträge kommen nicht durch'",
        type: 'INCIDENT',
        outcome:
          "DU ERÖFFNEST EINEN ERP-INCIDENT.\n\n" +
          "Ihr checkt Logs, Tabellen, Schnittstellen – alles bereit, alles wartet.\n" +
          "Kein Fehler, nur Leere.\n\n" +
          "Der Fehler sitzt nicht in der Fabrik, sondern in der Stadt, die nichts anliefert.",
        qualityChange: -15,
        moraleChange: -10,
        isCorrect: false
      },
      {
        label: "Du meldest: 'ERP bereit – keine Trading-Aufträge angeliefert, Ursache Upstream'",
        type: 'REQUEST',
        outcome:
          "DU SCHREIBST IN DAS TICKET:\n" +
          "'ERP-Jobs laufen einwandfrei, Schnittstelle vorbereitet. Es werden jedoch keine Trading-Aufträge angeliefert. Ursache liegt im vorgelagerten Prozess (Shop/Berechtigung). Kein ERP-Incident.'\n\n" +
          "Die Factory ist damit offiziell aus der direkten Schusslinie, auch wenn sie die Folgen spürt.",
        qualityChange: +20,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du weißt: Eine wartende Maschine ist nicht kaputt, nur hungrig.",
    failureMessage: "In deinen KPI sieht es so aus, als würde die Fabrik ständig versagen – tatsächlich hungert sie nur."
  },

  // 7. Purchasing
  {
    id: 'act2_role_7',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Route 66 – Der leere Konvoi",
    environment: "Digitale Karte der Lieferwege rund um Hawkins",
    hint: "Lieferweg zerstört = Incident. Keine Bestellung ausgelöst = nicht dein Incident, nur Folge-Impact.",
    description:
      "Auf einem großen Tisch liegt eine Karte von Hawkins und Umgebung.\n" +
      "Leuchtpunkte markieren Lager, Fabriken und Lieferwege.\n\n" +
      "Beim Werk, in dem Müllers Material landen sollte, blinkt ein rotes Icon: 'Material fehlt'.\n" +
      "Du checkst die Route:\n" +
      "• Straße frei\n" +
      "• Spediteur verfügbar\n" +
      "• Lager hat Bestand\n" +
      "• Einzige Besonderheit: Keine Bestellung ins System eingelaufen\n\n" +
      "Müller erlebt: 'Die Welt liefert nicht'.\n" +
      "Du siehst: Niemand hat den Konvoi überhaupt losgeschickt.",
    options: [
      {
        label: "Incident: 'Lieferkette gestört, Route blockiert'",
        type: 'INCIDENT',
        outcome:
          "DU MELDEST EINEN SUPPLY-CHAIN-INCIDENT.\n\n" +
          "Logistik überprüft Straßen, Sperrungen, Lager – alles offen und bereit.\n" +
          "Die Route funktioniert, sie wurde nur nicht benutzt.\n\n" +
          "Die Monsterkarte zeigt einen Angriff, der nie stattgefunden hat.",
        qualityChange: -15,
        moraleChange: -10,
        isCorrect: false
      },
      {
        label: "Du meldest: 'Keine Bestellung ausgelöst – Lieferweg intakt, Ursache Upstream (Shop/Trading)'",
        type: 'REQUEST',
        outcome:
          "DU PROTOKOLLIERST:\n" +
          "'Lieferfähigkeit vorhanden, Route frei, Bestand verfügbar. Es liegt keine Bestellung vor. Ursache liegt im vorgelagerten System (Shop/Trading). Kein Lieferketten-Incident, nur Folge-Impact.'\n\n" +
          "Damit bleibt klar: Die Route ist nicht der Demogorgon, sie kriegt nur keinen Auftrag.",
        qualityChange: +20,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du unterscheidest zwischen zerstörter Straße und nicht losgefahrenem LKW.",
    failureMessage: "Offiziell ist bei dir ständig alles 'gestört', obwohl die LKW-Fahrer seit Tagen auf Start warten."
  },

  // ACT 2.1 – ITIL-Grundidee in Stranger-Things-Form
  {
    id: 'act2_1',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Klassenraum von Hawkins High – Drei Türen",
    environment: "Leerer Klassenraum mit drei leuchtenden Türen",
    hint: "Drei Türen, ein Problem: User erlebt Störung, du entscheidest die Tür.",
    description:
      "Du bist allein in einem Klassenraum von Hawkins High.\n" +
      "An der Tafel steht nur ein Satz:\n" +
      "'Es geht nicht.'\n\n" +
      "Vor dir schweben drei leuchtende Türen:\n" +
      "• Tür 1: INCIDENT – dahinter Blaulicht, Sirenen, Hopper brüllt Befehle\n" +
      "• Tür 2: SERVICE REQUEST – dahinter ordentliche Regale, Formulare, Kataloge\n" +
      "• Tür 3: CHANGE – dahinter Whiteboards, Roadmaps, Release-Planung\n\n" +
      "Über allem steht eine Projektion von Müllers Fall: 'Kann nicht bestellen. Für mich: alles kaputt.'\n" +
      "Welche Logik schreibst du an die Tafel?",
    options: [
      {
        label: "'User entscheidet. Wenn er Incident schreit, ist es Incident.'",
        type: 'INCIDENT',
        outcome:
          "DU SCHREIBST:\n" +
          "'User-Auswahl = Wahrheit.'\n\n" +
          "Alle drei Türen beginnen zu flackern.\n" +
          "In Tür 1 staut sich alles: echte Ausfälle neben 'ich hätte gern noch einen Button'.\n" +
          "Tür 2 wird kaum genutzt, Tür 3 verstaubt.\n\n" +
          "Das ist Hawkins, wenn man die Kinder den Sicherheitsplan schreiben lässt.",
        qualityChange: -15,
        moraleChange: -10,
        isCorrect: false
      },
      {
        label: "'User beschreibt Impact. IT entscheidet intern: Incident = kaputt, Request = bereitstellen, Change = verändern.'",
        type: 'REQUEST',
        outcome:
          "DU SCHREIBST:\n" +
          "'User = Impact, IT = Kategorie.'\n\n" +
          "Die Türen stabilisieren sich.\n" +
          "• Incident-Tür: alles, was vom definierten Sollzustand abweicht\n" +
          "• Request-Tür: alles, wo der Dienst da ist, der Anschluss aber fehlt\n" +
          "• Change-Tür: alles, was der Dienst noch nie konnte\n\n" +
          "Müllers Fall wird in deiner Projektion aufgeteilt:\n" +
          "Er erlebt Störung, du erkennst: wahrscheinlich Request oder Change, nicht zwingend Incident.",
        qualityChange: +25,
        moraleChange: +10,
        isCorrect: true
      }
    ],
    successMessage: "Du hast verstanden: Die Kinder dürfen panisch sein, der Erwachsene sortiert die Antworten.",
    failureMessage: "Du hast Hawkins die Steuerung überlassen. Die Stadt klassifiziert ihre Monster selbst."
  },

  // ACT 2.2 – Change
  {
    id: 'act2_2',
    act: Act.ACT_2_PERSPECTIVE,
    type: 'TRIAGE',
    title: "Das Void – Der Button aus einer anderen Dimension",
    environment: "Leerraum zwischen Hawkins und dem Upside Down",
    hint: "Wenn etwas weder kaputt noch je vorhanden war, versuchst du nicht zu reparieren, sondern zu erschaffen.",
    description:
      "Du schwebst in einem schwarzen Raum – dem Interface Void.\n\n" +
      "Vor dir hängt ein Hologramm des Shops.\n" +
      "Ein User brüllt aus dem Nichts:\n" +
      "'Wo ist der \\'Mind-Flayer-Kill-Button\\'? Den hattet ihr doch mal! Repariert das!'\n\n" +
      "Du lässt Release-Notizen, Commits und Katalogeinträge wie Polaroids an dir vorbeifliegen:\n" +
      "• Kein Eintrag zu diesem Button\n" +
      "• Kein Commit, der ihn einführt oder entfernt\n" +
      "• Kein Service-Katalog-Eintrag\n\n" +
      "Der Button existiert nur in der Fantasie oder in irgendeinem anderen Universum.",
    options: [
      {
        label: "Incident: 'Button weg, System kaputt'",
        type: 'INCIDENT',
        outcome:
          "DU SCHREIBST EINEN INCIDENT: 'Feature verschwunden'.\n\n" +
          "Dev jagt nach einem Commit, den es nie gab.\n" +
          "Infra sucht nach Config-Drift, die nicht existiert.\n" +
          "Am Ende bleibt nur Frust – das Universum war nie so gebaut.",
        qualityChange: -15,
        moraleChange: -10,
        isCorrect: false
      },
      {
        label: "Service Request: 'Bitte Mind-Flayer-Kill-Button bereitstellen'",
        type: 'REQUEST',
        outcome:
          "DU WIRFST ES IN DIE REQUEST-KISTE.\n\n" +
          "Dort liegen sonst Dinge, die es schon gibt: Accounts, Lizenzen, Standard-Optionen.\n" +
          "Niemand fühlt sich verantwortlich, weil der 'Button' in keinem Katalog definiert ist.\n" +
          "Das Ticket wird zum Geist im System.",
        qualityChange: -5,
        moraleChange: 0,
        isCorrect: false
      },
      {
        label: "Change: 'Neue Anforderung – Mind-Flayer-Kill-Button spezifizieren, bauen, ausrollen'",
        type: 'CHANGE',
        outcome:
          "DU SCHREIBST SAUBER AUF:\n" +
          "'User wünscht neues Feature. System konnte das nie. Muss als Change geplant, spezifiziert, entwickelt, getestet und ausgerollt werden.'\n\n" +
          "Das Void leuchtet kurz auf. Aus der Idee wird eine definierte Änderung – kein Phantom-Bug.",
        qualityChange: +35,
        moraleChange: +15,
        isCorrect: true
      }
    ],
    successMessage: "Du hörst die Schreie, aber du reparierst nicht, was nie da war – du designst es.",
    failureMessage: "Dein Backlog besteht aus 'defekten' Features, die nie über ein D&D-Brainstorming hinauskamen."
  },

  // ACT 3 – Bossfight: Modell & Router
  {
    id: 'act3_1',
    act: Act.ACT_3_BOSS,
    type: 'MODEL_FIX',
    title: "Hawkins Lab Core – Der Mind Router",
    environment: "Unterstes Untergeschoss des Hawkins Lab",
    hint: "Der eigentliche Endgegner ist nicht der Demogorgon, sondern das Ding, das entscheidet, welche Monster wohin geschickt werden.",
    description:
      "Ganz unten im Hawkins Lab, unter allen Ebenen, steht eine Maschine, die nicht in den offiziellen Plänen steht.\n" +
      "Auf dem Gehäuse steht nur: ROUTING ENGINE.\n\n" +
      "Über Monitore siehst du, wie Tickets eingesogen werden:\n" +
      "'TRADING GEHT NICHT'\n" +
      "'BRAUCHE NEUES FEATURE'\n" +
      "'KEIN ZUGRIFF'\n\n" +
      "Im Inneren läuft eine erbärmlich kurze Logik:\n\n" +
      "```text\n" +
      "if user_selects == \\'Incident\\' then\n" +
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
    difficultyLevel: 2,
    successMessage:
      "Du schreibst das innere Gesetz neu.\n\n" +
      "Die neue Logik ähnelt eher einem D&D-Regelwerk als einer Teenager-Entscheidung:\n\n" +
      "• Wenn Service vorher da war UND Verhalten jetzt vom Soll abweicht → Incident (Bug)\n" +
      "• Wenn Service da ist UND Verhalten korrekt, aber User nicht angeschlossen ist → Service Request (Rolle, Lizenz, Zugang)\n" +
      "• Wenn Service das noch nie konnte UND es nicht im Katalog steht → Change (neue Anforderung)\n\n" +
      "User dürfen weiter 'Störung', 'Problem', 'Bug' rufen.\n" +
      "Der Mind Router übersetzt ihre Schreie in ein konsistentes Modell.\n" +
      "Der Schatten aus Fehlklassifikationen löst sich auf wie Staub im Licht von Elfi.",
    failureMessage:
      "Du lässt die Logik fast so, wie sie war.\n\n" +
      "User-Auswahl bleibt Master Key.\n" +
      "Incidents, Requests und Changes landen weiter bunt gemischt in den falschen Dungeons.\n" +
      "Der Mind Flayer aus Ticket-Chaos wächst weiter – genährt von guter Absicht und schlechtem Modell."
  }
];
