import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAll, getById } from '@/api/ServerFunctions';
import ProjectDetailsClient from '../projectClient';
import { Project } from '@/types';
import CreateTaske from '@/lib/PopUps/CreateTaske';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const { id } = await params;


  await queryClient.prefetchQuery({
    queryKey: ['project', id],
    queryFn: async () => await getById<Project>('projects', id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Container الأساسي */}
      <div className="relative min-h-screen">
        <ProjectDetailsClient projectId={id} />
        
        {/* الكومبوننت ده هو اللي جواه شرط الظهور */}
        <CreateTaske />
      </div>
    </HydrationBoundary>
  );
}