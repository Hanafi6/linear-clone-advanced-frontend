// helpers/statusHelpers.ts
export const getTaskBadge = (done: boolean, status: string) => {
    if (done) return {
      label: "DONE",
      bg: "color-mix(in oklab, var(--color-success) 18%, transparent 82%)",
      fg: "var(--color-success)",
    };
    
    if (status === "in_progress" || status === "in-progress") return {
      label: "IN PROGRESS",
      bg: "color-mix(in oklab, var(--color-info) 18%, transparent 82%)",
      fg: "var(--color-info)",
    };
  
    return { 
      label: "TODO", 
      bg: "color-mix(in oklab, var(--color-surface-2) 75%, transparent 25%)", 
      fg: "var(--color-text)" 
    };
  };