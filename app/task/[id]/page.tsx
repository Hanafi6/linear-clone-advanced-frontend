'use client'
import { useParams, useRouter } from "next/navigation";
import { GetTaskId } from "@/lib/Selecteds";
import { useUpdateTask } from "@/lib/Selecteds";
import { useAuth } from "@/auth/useAuth"; 
import { ArrowLeft, CheckCircle2, Clock, ShieldAlert, User } from "lucide-react";

import {motion,AnimatePresence} from 'framer-motion'

export default function TaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth(); 
  const { data: task, isLoading } = GetTaskId(id as string);
  const { mutate: updateTask, isPending,isPaused } = useUpdateTask();

  
  const isAssignedToMe = user?.id === task?.assignedTo;
  const isProjectAdmin = user?.id === "u1"; 

  
  if (isLoading) return <div className="p-10 md:p-20 text-center">Loading task...</div>;
  if (!task) return <div className="p-10 md:p-20 text-center">Task not found</div>;



  const handleStatusChange = (newStatus: string) => {
    updateTask({ id: task.id, status: newStatus });
  };

  return (
    <div className="min-h-screen flex flex-col w-full" style={{ background: "var(--color-surface)" }}>
      {/* Top Bar - Responsive Padding */}
      <nav className="border-b p-4 md:px-6 flex items-center justify-between sticky top-0 z-10 bg-inherit" style={{ borderColor: "var(--color-border)" }}>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity">
          <ArrowLeft size={16} /> <span className="hidden sm:inline">العودة</span>
        </button>
        <div className="flex items-center gap-2 px-2 py-1 rounded border text-[10px] md:text-xs" style={{ borderColor: "var(--color-border)" }}>
          <span style={{ color: "var(--color-muted)" }}>ID:</span>
          <span className="font-mono" style={{ color: "var(--color-text)" }}>{task.id}</span>
        </div>
      </nav>

      {/* Main Grid - Mobile: 1 Column | Tablet/Desktop: 12 Columns */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* Main Content Area */}
        <div className="order-1 lg:order-1 lg:col-span-8 p-5 md:p-8 lg:p-12 lg:border-e" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-start gap-3 md:gap-5 mb-6 md:mb-10">
            <div className="mt-1 flex-shrink-0 w-8 h-8 relative"> {/* ثبتنا المساحة عشان م يحصلش Jump */}
              <AnimatePresence mode="wait">
                {task.status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  >
                    <CheckCircle2 size={24} className="text-[var(--color-success)] md:w-8 md:h-8" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="clock"
                    initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  >
                    <Clock size={24} className="text-[var(--color-muted)] md:w-8 md:h-8" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight" style={{ color: "var(--color-text)" }}>
              {task.title}
            </h1>
          </div>

          <div className="space-y-6">
            <div className="p-4 md:p-6 rounded-xl border border-dashed" style={{ borderColor: "var(--color-border)" }}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {"لا يوجد وصف تفصيلي لهذه المهمة."}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Area - Responsive Layout */}
        <aside className="order-2 lg:order-2 lg:col-span-4 p-5 md:p-8 lg:p-10 bg-[rgba(255,255,255,0.01)] space-y-8">
          
          {/* Actions Section */}
          <section className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">Actions</h3>
            <div className="flex flex-col gap-3">
              {isAssignedToMe && task.status !== "done" && (
                <>
                <button 
                onClick={() => handleStatusChange("done")}
                disabled={isPending}
                className="w-full py-3 md:py-4 rounded-lg bg-[var(--color-success)] text-black font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 hover:brightness-110"
                >
                  {isPending ? "جاري التحديث..." : "إكمال المهمة ✓"}
                </button>
                </>
              )}

              { task.status == "done" && (
                <button 
                  onClick={() => handleStatusChange("in_progress")}
                  disabled={isPending}
                  className="w-full py-3 md:py-4 rounded-lg border-2 border-[var(--color-danger)] text-[var(--color-danger)] font-bold text-sm hover:bg-[var(--color-danger)] hover:text-white transition-all active:scale-[0.98]"
                >
                  إعادة فتح المهمة (Admin)
                </button>
              )}

              {!isAssignedToMe && task.status !== "done" && (
                <div className="flex items-start gap-2 p-3 rounded bg-[var(--color-surface-2)] text-[10px] md:text-[11px]" style={{ color: "var(--color-muted)" }}>
                  <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />
                  <span>أنت لا تملك صلاحية تعديل حالة هذه المهمة</span>
                </div>
              )}
              
            </div>
          </section>

          {/* Details Section - Horizontal on mobile, vertical on desktop */}
          <section className="space-y-4 pt-6 md:pt-8 border-t lg:border-t-0" style={{ borderColor: "var(--color-border)" }}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex justify-between items-center text-xs md:text-sm p-2 lg:p-0 rounded-md bg-[var(--color-surface-2)] lg:bg-transparent">
                <span className="flex items-center gap-2" style={{ color: "var(--color-muted)" }}><User size={14}/> Assigned</span>
                <span className="font-medium" style={{ color: "var(--color-text)" }}>{isAssignedToMe ? "أنت" : task.assignedTo}</span>
              </div>

              <div className="flex justify-between items-center text-xs md:text-sm p-2 lg:p-0 rounded-md bg-[var(--color-surface-2)] lg:bg-transparent">
                <span className="flex items-center gap-2" style={{ color: "var(--color-muted)" }}><Clock size={14}/> Priority</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase" 
                  style={{ 
                    background: "color-mix(in oklab, var(--color-warning) 20%, transparent)", 
                    color: "var(--color-warning)" 
                  }}>
                  {task.priority}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}