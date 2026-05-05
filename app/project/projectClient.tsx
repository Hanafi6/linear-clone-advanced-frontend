'use client';

import { useQuery } from '@tanstack/react-query';
import { getById } from '@/api/ServerFunctions';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/task/[id]/TaskCard'; 
import { useRouter } from 'next/navigation';
import { Project, Task } from '@/types';
import { UseDeleteProject, useProjectTasks } from '@/lib/Selecteds';
import { useAppStore } from '@/store/useAppStore';
import DeleteProjectModal from './DeleteProject';
import { useAuth } from '@/auth/useAuth';
import toast from 'react-hot-toast';

export default function ProjectDetailsClient({ projectId }: { projectId: string }) {
  if (!projectId) return null;

  const router = useRouter();
  const OpenModal = useAppStore(state => state.OpenPopUp);
  const isOpenDeleteModal = useAppStore(state => state.isDeleteProjectPopUpOpen);
  const CloseModal = useAppStore(state => state.CloseDeleteModal);
  const OpenModalDelete = useAppStore(state => state.OpenDeleteModal);

  const { mutate, isPending } = UseDeleteProject();
  const { user } = useAuth();

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['project', projectId],
    queryFn: async () => await getById<Project>('projects', projectId),
  });

  const { data: Tasks, isLoading: TasksLoading } = useProjectTasks(projectId);

  const HandelDelete = () => {
    if (project) {
      mutate(project.id, {
        onSuccess: () => {
          CloseModal();
          toast.success(`Project ${project.name} deleted`);
          router.push('/projects');
        },
        onError:(err) => {
          console.log(err)
          toast.error('الحذف تم لوكال المشروع للقراءه')
          // toast.success(`Project ${project.name} deleted`);
          router.push('/projects');
        }
      });
    }
  };

  if (isLoading) return <div className="p-10 md:p-20 text-center animate-pulse opacity-50">Loading Project...</div>;
  if (!project) return <div className="p-10 md:p-20 text-center">Project not found!</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="min-h-screen px-4 py-6 md:p-8 lg:p-12"
      style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}
    >
      {/* Header Section */}
      <header className="max-w-5xl mx-auto mb-8 md:mb-12 flex flex-col gap-6">
        <div className="space-y-3">
          <button 
            onClick={() => router.back()}
            className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
          >
            ← <span className="hover:underline">Back to All Projects</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase break-words">
              {project.name}
            </h1>
            
            {user?.id === project.ownerId && (
              <button
                onClick={() => OpenModalDelete()}
                className="w-fit px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all active:scale-95"
                style={{ background: 'var(--color-danger)', color: 'white' }}
              >
                Delete Project
              </button>
            )}
          </div>

          <p className="max-w-2xl text-sm md:text-base lg:text-lg opacity-70 leading-relaxed">
            {project.description || "No description provided for this project."}
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex gap-6 border-t md:border-t-0 md:border-l-2 pt-6 md:pt-0 md:pl-6" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex-1 md:flex-none text-center md:text-left">
            <span className="block text-xl md:text-3xl font-bold">{Tasks?.length || 0}</span>
            <span className="text-[10px] md:text-xs uppercase opacity-50 tracking-widest font-semibold">Total Tasks</span>
          </div>
          <div className="flex-1 md:flex-none text-center md:text-left">
            <span className="block text-xl md:text-3xl font-bold uppercase">{project.priority || 'Low'}</span>
            <span className="text-[10px] md:text-xs uppercase opacity-50 tracking-widest font-semibold">Priority</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight">Project Tasks</h2>
          <button
            onClick={() => OpenModal()}
            className="bg-[var(--color-primary)] text-black px-4 py-2 rounded-full text-xs md:text-sm font-bold hover:scale-105 transition-transform shadow-lg active:scale-95"
          >
            + Add Task
          </button>
        </div>

        {/* Tasks List */}
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {Tasks && Tasks.length > 0 ? (
              Tasks.map((task: Task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  isDone={(t) => t.status === 'done'} 
                  Visit={false}
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="p-10 md:p-20 text-center border-2 border-dashed rounded-3xl opacity-30 text-sm md:text-base"
                style={{ borderColor: 'var(--color-border)' }}
              >
                No tasks assigned to this project yet.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Delete Modal */}
        {isOpenDeleteModal && (
          <DeleteProjectModal 
            Pinding={isPending} 
            onConfirm={HandelDelete} 
            projectName={project?.name || ''} 
            onClose={CloseModal} 
          />
        )}
      </main>
    </motion.div>
  );
}