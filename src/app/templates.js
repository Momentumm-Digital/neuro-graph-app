

export const Templates = {

  reset: {
    id: "reset",
    label: "Reset",
    chartType: "bar-vertical",
    scale: { auto: true, min: null, max: null, step: null },
    items: [""],
    respondents: [""],
    drawings: [],
    text: {
      showLegend: true,
      showTitle: false,
      showX: true,
      showY: true,
      showValues: false,
    },
    colors: {
      enabled: false,
      scheme: "calm",
    },
    layout: {
      density: "standard",
    },
  },

  qi: {
    id: "qi",
    label: "Template 1 — QI",
    layout: {
    mode: "compact",
    },
    chartType: "bar-vertical",
    scale: { auto: false, min: 0, max: 100, step: 10 },
    items: [
      "Raisonnement Verbal (ICV)",
      "Raisonnement Visuospatial (IVS)",
      "Raisonnement Logique (IRF)",
      "Mémoire de Travail (IMT)",
      "Vitesse de Traitement (IVT)",
      "Potentiel Global (IAG)",
    ],
    // Respondents: laisse vide si tu veux garder ceux déjà présents
    respondents: [],
    drawings: [
      // Zone verte 25-50
      { type: "zone", zone: { min: 25, max: 50, color: "#22c55e" } },

      // Ligne gras 50
      { type: "line", line: { value: 50, style: "solid", color: "#0f172a" } },

      // Pointillées légères: 25 / 75 / 91 / 9
      { type: "line", line: { value: 25, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 75, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 91, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 9,  style: "dash", color: "#94a3b8" } },
    ],
  },

  qidi: {
    id: "qidi",
    label: "Template 2 — QI-DI",
    layout: {
    mode: "compact",
    },
    chartType: "bar-vertical",
    scale: { auto: false, min: 10, max: 115, step: 5 },
    items: [
      "Raisonnement Verbal (ICV)",
      "Raisonnement Visuospatial (IVS)",
      "Raisonnement Logique (IRF)",
      "Mémoire de Travail (IMT)",
      "Vitesse de Traitement (IVT)",
      "Potentiel Global (ÉGQI)",
    ],
    respondents: [],
    drawings: [
      // Zone verte 90-110
      { type: "zone", zone: { min: 90, max: 110, color: "#22c55e" } },

      // Ligne gras 100
      { type: "line", line: { value: 100, style: "solid", color: "#0f172a" } },

      // Pointillées: 70 / 55 / 40
      { type: "line", line: { value: 70, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 55, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 40, style: "dash", color: "#94a3b8" } },
    ],
  },

  attention: {
    id: "attention",
    label: "Template 3 — Attention",
    layout: {
    mode: "standard",
    },
    chartType: "bar-vertical",
    scale: { auto: false, min: 0, max: 100, step: 10 },
    items: [
      "Mémoire de Travail",
      "Vitesse de Traitement",
      "Att. Visuelle Sélective",
      "Att. Visuelle Soutenue",
      "Att. Auditive CT",
      "Att. Auditive Soutenue",
      "Att. Divisée",
      "Flexibilité Att.",
      "Inhibition Motrice 1",
      "Inhibition Motrice 2",
      "Inhibition Verbale",
      "Planification",
    ],
    respondents: [],
    drawings: [
      { type: "zone", zone: { min: 25, max: 75, color: "#22c55e" } },
      { type: "line", line: { value: 50, style: "solid", color: "#0f172a" } },
      { type: "line", line: { value: 25, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 75, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 91, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 9,  style: "dash", color: "#94a3b8" } },
    ],
  },

  basc3: {
    id: "basc3",
    label: "Template 4 — BASC-3",
    layout: {
    mode: "standard",
   },
    chartType: "bar-vertical",
    scale: { auto: false, min: 30, max: 90, step: 5 },
    items: [
      "Hyperactivité/Impulsivité",
      "Agressivité",
      "Pb. de conduite",
      "Pb. d'externalisation",
      "Anxiété",
      "Dépression",
      "Pb. d'internalisation",
      "Inattention",
      "Anomalie",
      "Retrait",
      "Sx. Comportementaux",
      "Adaptabilité",
      "Habiletés sociales",
      "Leadership",
      "Comm. fonctionnelle",
      "Activité vie quotidienne",
      "Habiletés adaptatives",
    ],
    respondents: ["Parent 1", "Parent 2", "Enseignant"],
    drawings: [
      // Zones (couleurs de base — on pourra faire un dégradé plus tard)
      { type: "zone", zone: { min: 30, max: 60, color: "#22c55e" } }, // vert
      { type: "zone", zone: { min: 60, max: 70, color: "#facc15" } }, // jaune
      { type: "zone", zone: { min: 70, max: 80, color: "#fb923c" } }, // orange
      { type: "zone", zone: { min: 80, max: 90, color: "#ef4444" } }, // rouge

      // Lignes pointillées
      { type: "line", line: { value: 60, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 70, style: "dash", color: "#94a3b8" } },
      { type: "line", line: { value: 80, style: "dash", color: "#94a3b8" } },
    ],
  },
};
//ajout