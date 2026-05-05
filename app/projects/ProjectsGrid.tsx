"use client";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/Components/ProjectCard";
import { Project, Task } from "@/types";
import { getAll } from "@/api/ServerFunctions";
import { useAppStore } from "@/store/useAppStore";
import { getAuthToken } from "@/auth/authStorage";
import CommentSkeleton from "./Loder";




export default function ProjectsGrid() {
  const mode = useAppStore(state => state.projectMode);
  const token = getAuthToken();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects", mode],
    queryFn: () => getAll("projects"),
    select: (data) => (mode === 'mind' ? data.filter((e) => e.ownerId === token) : data)
  });

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => getAll("tasks"),
  });

  if (isLoading) return <CommentSkeleton />;

  return (
    <div 
      className="
        grid grid-cols-1 gap-6 
        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        max-h-[calc(100vh-300px)] md:max-h-[500px] lg:max-h-[600px] 
        overflow-y-auto scrollbar-hide
        p-1
      "
    >
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          tasks={tasks.filter((t) => t.projectId === project.id)} 
        />
      ))}
    </div>
  );
}
