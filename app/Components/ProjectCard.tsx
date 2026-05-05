"use client";

import React, { useMemo, useState } from "react";
import type { Project, Task } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
// استيراد الكومبوننت الجديد
import TaskItem from "@/task/[id]/TaskCard"; 
import Link from "next/link";
import { useAuth } from "@/auth/useAuth";
import { Dot } from "lucide-react";

type Props = {
  project: Project;
  tasks?: Task[];
};

// الـ Helper فضل هنا لأنه مرتبط بمنطق العرض داخل الكارد
function isDone(t: Task) {
  return t.done === true || (t.status ?? "").toLowerCase() === "done";
}

function ProjectCard({ project, tasks = [] }: Props) {
  const [showTasks, setShowTasks] = useState(false);

  const status = (project.status ?? "").toLowerCase();
  const priority = (project.priority ?? "").toLowerCase();

  const {user} = useAuth();

  // حساب الإحصائيات (Memoized لضمان الأداء)
  const stats = useMemo(() => {
    const done = tasks.filter(isDone).length;
    const open = tasks.length - done;
    return { done, open, total: tasks.length };
  }, [tasks]);

  // --- منطق الـ Badges (ممكن تفصله مستقبلاً لو احتجت) ---
  const statusBadge = status === "active" 
    ? { label: "ACTIVE", bg: "color-mix(in oklab, var(--color-success) 18%, transparent 82%)", fg: "var(--color-success)" }
    : status === "planned"
    ? { label: "PLANNED", bg: "color-mix(in oklab, var(--color-info) 18%, transparent 82%)", fg: "var(--color-info)" }
    : status ? { label: status.toUpperCase(), bg: "color-mix(in oklab, var(--color-surface-2) 75%, transparent 25%)", fg: "var(--color-text)" } : null;

  const priorityBadge = priority === "urgent"
    ? { label: "URGENT", bg: "color-mix(in oklab, var(--color-danger) 18%, transparent 82%)", fg: "var(--color-danger)" }
    : priority === "high"
    ? { label: "HIGH", bg: "color-mix(in oklab, var(--color-warning) 18%, transparent 82%)", fg: "var(--color-warning)" }
    : priority === "medium"
    ? { label: "MEDIUM", bg: "color-mix(in oklab, var(--color-info) 18%, transparent 82%)", fg: "var(--color-info)" }
    : priority === "low"
    ? { label: "LOW", bg: "color-mix(in oklab, var(--color-muted) 22%, transparent 78%)", fg: "var(--color-muted)" } : null;

  return (
    <article
      className="group col-span-3 rounded-xl border p-4 sm:p-5"
      style={{
        borderColor: project.isOptimistic ? "red" : "var(--color-border)",
        background: "linear-gradient(180deg, color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%), color-mix(in oklab, var(--color-surface) 92%, transparent 8%))",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-row justify-around items-center gap-2">
            <h3 className="truncate text-base font-semibold" style={{ color: "var(--color-text)" }}>
              <Link className='hover:underline cursor-pointer duration-600' href={`/project/${project.id}`}>
                {project.name ?? "Untitled Project"}
                {user?.id == project.ownerId && <span  style={{color:'var(--color-brand-2)'}} className='animate-ping'><Dot size={20}/></span>}
              </Link>
            </h3>
            {statusBadge && (
              <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide" style={{ background: statusBadge.bg, color: statusBadge.fg }}>
                {statusBadge.label}
              </span>
            )}
            {priorityBadge && (
              <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide" style={{ background: priorityBadge.bg, color: priorityBadge.fg }}>
                {priorityBadge.label}
              </span>
            )}
          </div>
          {project.description && (
            <p className="mt-1 line-clamp-2 text-sm" style={{ color: "var(--color-muted)" }}>
              {project.description}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <div className="text-xs" style={{ color: "var(--color-muted)" }}>Tasks</div>
          <div className="mt-0.5 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
            {stats.open} open <span style={{ color: "var(--color-muted)", fontWeight: 500 }}>•</span> {stats.done} done
          </div>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs" style={{ color: "var(--color-muted)" }}>
          {project.createdAt && <>Created: <span style={{ color: "var(--color-text)" }}>{project.createdAt}</span></>}
        </div>

        <button
          type="button"
          onClick={() => setShowTasks((v) => !v)}
          className="rounded-lg border px-3 py-2 text-xs font-semibold transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
            background: showTasks ? "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)" : "transparent",
          }}
        >
          {showTasks ? "إخفاء التاسكات" : "عرض التاسكات"}
          <span style={{ color: "var(--color-muted)", marginInlineStart: 6 }}>({stats.total})</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showTasks && (
          <motion.div
            key="tasks-section"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ overflow: "hidden", userSelect: "none" }}
          >
            {tasks.length === 0 ? (
              <div className="rounded-lg border p-3 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-muted)", background: "var(--color-surface)" }}>
                مفيش تاسكات لسه للمشروع ده.
              </div>
            ) : (
              <ul className="grid gap-2">
                {tasks.map((t) => (
                  // استهلاك الكومبوننت المفصول
                  <TaskItem 
                    key={t.id} 
                    task={t} 
                    isDone={isDone}
                    
                  />
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default React.memo(ProjectCard);