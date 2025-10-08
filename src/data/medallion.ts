export const medallionArchitecture = `In Microsoft Fabric, the Medallion pattern enforces progressive refinement: Bronze (raw landing with lineage stamps and schema-on-read), Silver (cleaned, conformed entities; SCD handling; integrity checks), and Gold (analytics-ready star schemas powering governed Power BI semantic models). Partition by event time, keep writes idempotent, publish data contracts (owners, SLAs, lineage), and use incremental refresh with RLS in the model. Measure freshness, failure rate, and consumer adoption. This pattern underpinned the Autotask → Jira + Fabric migration and unlocked consistent executive KPIs.`;

export const medallionEasterEgg = {
  bronze: "raw stuff, yo.",
  silver: "clean, tight.",
  gold: "board-ready, science."
};
