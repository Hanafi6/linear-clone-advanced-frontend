'use client';

import { getAll } from "@/api/ServerFunctions";
import type { Project } from "@/types";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@/types";

import { motion } from "framer-motion";

function ManubalitaionBar() {
  const [tasksView, setTasksView] = useState<"all" | "open" | "done">("open");

  const colors = {
    all:'blue',
    open:"yellow",
    done:'green'
  }


  const {data:projects,isLoading:LodingProject,isError:ProjectsIsError} = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => getAll<Project>("projects"),
  });

  const {data:tasks,isLoading:LodingTasks,isError:TasksIsError} = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => getAll<Task>("tasks"),
  });

  const stats = useMemo(() => {
    if (!projects) return 
    if (!tasks) return 
    
    const activeProjects = projects.filter((p) => (p.status ?? "").toLowerCase() === "active").length;

    const isDone = (t: Task) => t.done === true || (t.status ?? "").toLowerCase() === "done";
    const doneTasks = tasks.filter(isDone).length;
    const openTasks = tasks.length - doneTasks;
    const progressPct = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

    const visibleTasksCount =
      tasksView === "all" ? tasks.length : tasksView === "done" ? tasks.filter(isDone).length : tasks.filter((t) => !isDone(t)).length;

    return {
      projectsTotal: projects.length,
      activeProjects,
      tasksTotal: tasks.length,
      doneTasks,
      openTasks,
      progressPct,
      visibleTasksCount,
    };
  }, [projects, tasks, tasksView]);


  return (
    <section className="container mt-6" aria-labelledby="dashboard-summary-title">
      <header className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="dashboard-summary-title" className="text-base font-semibold" style={{ color: "var(--color-text)" }}>
          Dashboard summary
        </h2>
        <p className="text-xs sm:text-sm" style={{ color: "var(--color-muted)" }}>
          Quick overview of projects & tasks
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article
          className="rounded-xl border p-4 sm:p-5"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          aria-label="Projects statistics"
        >
          <h3 className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
            Projects
          </h3>

          <dl className="mt-2 flex items-end justify-between gap-3">
            <div>
              <dt className="sr-only">Total projects</dt>
              <dd className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-text)" }}>
                {LodingProject ? "…" : stats?.projectsTotal}
              </dd>
              <div className="text-sm" style={{ color: "var(--color-muted)" }}>
                Total projects
              </div>
            </div>
            <div
              className="rounded-lg px-2 py-1 text-xs"
              style={{ color: "var(--color-text)", background: "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)" }}
            >
              <dt className="sr-only">Active projects</dt>
              <dd>Active: {LodingTasks ? "…" : stats?.activeProjects}</dd>
            </div>
          </dl>
        </article>

        <article
          className="rounded-xl border p-4 sm:p-5"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          aria-label="Tasks statistics"
        >
          <h3 className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
            Tasks
          </h3>

          <dl className="mt-2">
            <dt className="sr-only">Total tasks</dt>
            <dd className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-text)" }}>
              {LodingTasks ? "…" : stats?.tasksTotal}
            </dd>
            <div className="mt-1  text-sm" style={{ color: "var(--color-muted)" }}>
              <dt className="sr-only">Open tasks</dt>
              <dd className="inline">Open: {LodingTasks ? "…" : stats?.openTasks}</dd>
              <span aria-hidden="true"> • </span>
              <dt className="sr-only">Done tasks</dt>
              <dd className="inline">Done: {LodingTasks ? "…" : stats?.doneTasks}</dd>
            </div>
          </dl>
        </article>

        <article
          className="rounded-xl border p-4 sm:p-5"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)",borderTopColor:colors[tasksView] }}
          aria-label="Task filter controls"
        >
          <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xs uppercase   tracking-wide" style={{ color: "var(--color-muted)" }}>
              Quick filter
            </h3>

            <nav className="" aria-label="Tasks filter">
              <div
            
                className="flex w-full items-center gap-1 rounded-lg p-1 sm:w-auto"
                style={{ background: "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)" }}
              >
                {(["open", "done", "all"] as const).map((v) => {
                  const isActive = tasksView === v;

                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setTasksView(v)}
                      aria-pressed={isActive}
                      className="relative flex-1 cursor-pointer overflow-hidden rounded-md px-2 py-1 text-xs sm:flex-none"
                      style={{ color: isActive ? "var(--color-text)" : "var(--color-muted)" }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="tasksViewPill"
                        //   colors
                          className={`absolute inset-0 rounded-md`}
                          style={{ background: colors[tasksView]}}
                          transition={{ type: "spring", stiffness: 10000, damping: 40, mass: 0.8 }}
                          animate={{scale:1}}
                          exit={{scale:0}}
                        />
                      )}
                      <span className="relative z-10">{v.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
            Showing <span style={{ color: "var(--color-text)" }}>{LodingTasks ? "…" : stats?.visibleTasksCount}</span> tasks
          </p>
        </article>

        <article
          className="rounded-xl border p-4 sm:p-5"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          aria-label="Completion progress"
        >
          <h3 className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>
            Progress
          </h3>

          <dl className="mt-2">
            <div className="flex items-end justify-between gap-3">
              <dt className="sr-only">Completion percentage</dt>
              <dd className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--color-text)" }}>
                {LodingTasks ? "…" : `${stats?.progressPct}%`}
              </dd>
              <div className="text-xs" style={{ color: "var(--color-muted)" }}>
                completed
              </div>
            </div>
          </dl>

          <div
            className="mt-3 h-2 w-full overflow-hidden rounded-full"
            style={{ background: "color-mix(in oklab, var(--color-surface-2) 70%, transparent 30%)" }}
            role="progressbar"
            aria-label="Tasks completion progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={LodingTasks ? 0 : stats?.progressPct}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${LodingTasks ? 0 : stats?.progressPct}%`,
                background: "var(--color-text)",
                transition: "width 200ms ease",
              }}
            />
          </div>
        </article>
      </div>

      {(ProjectsIsError || TasksIsError) && (
        <div className="mt-3 rounded-xl border p-3 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }}>
          Failed to load dashboard data. تأكد إن الـ API شغال على `http://localhost:3001` وفيه endpoints: `projects` و `tasks`.
        </div>
      )}
    </section>
  );
}

export default ManubalitaionBar;