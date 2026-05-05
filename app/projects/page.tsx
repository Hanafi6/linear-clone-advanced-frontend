// src/app/(dashboard)/projects/page.tsx
import { getAll } from "@/api/ServerFunctions";
import PrefetchBoundary from "@/Hooks/PrefetchWrapper";
import ProjectsHeader from "@/projects/ProjectsHeader";
import ProjectsGrid from "@/projects/ProjectsGrid";

export default async function ProjectsPage() {
  return (
  
    <PrefetchBoundary 
    queries={[
      { queryKey:["projects"] ,queryFn: async () => getAll("projects")},
      { queryKey:["tasks"] ,queryFn: async () => getAll("tasks")}
    ]} 
    >
      <div className="space-y-8">
        <ProjectsHeader />
        
        <ProjectsGrid />
      </div>
    </PrefetchBoundary>
  );
}