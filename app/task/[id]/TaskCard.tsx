// Components/TaskItem.tsx
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import type { Task } from "@/types";
import { getTaskBadge } from '@/lib/statusHelpers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/auth/useAuth';

type TaskItemProps = {
  task: Task;
  isDone: (t: Task) => boolean;
  Visit?:boolean
};


const TaskItem = ({ task, isDone,Visit = false }: TaskItemProps) => {
  const done = isDone(task);
  const tStatus = (task.status ?? "").toLowerCase();
  const badge = getTaskBadge(done, tStatus);
  const {user} = useAuth();
  const router = useRouter();

  console.log(task.assignedTo+ "task.assignedTo", user?.id+'user id')
  // console.log(task.title , user?.id);


  if(!task && user) return;
  return (
    <motion.li
      layout
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 10, opacity: 0 }}
      className="flex items-start justify-between gap-3 rounded-lg border px-3 py-2 transition-shadow hover:shadow-sm"
      style={{
        borderColor: badge.bg,
        background: badge.bg,
      }}
    >
      <div className="min-w-0">
        <div 
          className={`truncate text-sm font-medium transition-all ${done ? 'opacity-60 line-through' : ''}`} 
          style={{ color: "var(--color-text)" }}
        >
          <Link className='hover:underline duration-600' href={`/task/${task.id}`}>{task.title ?? "Untitled task"}</Link>
        </div>
        {task.createdAt && (
          <div className="mt-0.5 text-xs" style={{ color: "var(--color-muted)" }}>
            {task.createdAt}
          </div>
        )}
      </div>

      <span 
        className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide" 
        style={{ background: badge.bg, color: badge.fg }}
        >
        {task.assignedTo == user?.id && <div className='w-[7px] h-[7px] bg-green-500 rounded-full'></div>}
        {badge.label}
      </span>
    </motion.li>
  );
};

export default React.memo(TaskItem);