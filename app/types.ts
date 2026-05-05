type Id = string | number;

interface Project {
    id: Id;
    /**
     * Legacy fields (used by some older UI/state code in this repo)
     */
    title?: string;
    price?: number;
    category?: string;

    isOptimistic?:boolean
    /**
     * Current JSON shape (db.json)
     */
    name?: string;
    description: string;
    status?: string;
    priority?: "low" | "medium" | "high" | "urgent" | string;
    ownerId?: Id;
    createdAt?: string;
}

type AuthUser = {
    id: string;
    name: string;
    role?: string;
    avatar?: string;
  };

  type Task = {
    id: Id;
    title: string;
    status?: "todo" | "in_progress" | "in-progress" | "done" | string;
    done?: boolean;
    projectId?: Id;
    createdAt?: string;
    priority?: "low" | "medium" | "high" | "urgent" | string;
    assignedTo?: Id;
  };
  
  interface LucideProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    [key: string]: any; // Any other SVG attributes
  }


export type ProjectMode = 'all' | 'mind' | 'active' | 'archived';

export interface ProjectState {
  projectMode: ProjectMode;
  setProjectMode: (mode: ProjectMode) => void;
  
}

export interface PopUp {
  IsPopUpOpen: boolean;
  OpenPopUp:() =>void
  ClosePopUp:() =>void
}
  
  

export type { Project ,AuthUser ,Task,LucideProps};