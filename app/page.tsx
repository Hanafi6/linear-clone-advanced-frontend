import PrefetchBoundary from "@/Hooks/PrefetchWrapper"
import {getAll} from "@/api/ServerFunctions"
import RequireAuth from "@/auth/RequireAuth";
import ManubalitaionBar from "@/Components/ManubalitaionBar";
import RecentProjects from "@/Components/RecentProjects";


export default function Home() {
  return (
    <RequireAuth>
      <PrefetchBoundary queries={{ 
          queryKey: ["users"], 
          queryFn: () => getAll("users") 
        }}>
        <ManubalitaionBar/>
          <RecentProjects/>
      </PrefetchBoundary>
    </RequireAuth>
  );
}