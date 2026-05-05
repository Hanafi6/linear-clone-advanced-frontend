import type { StateCreator } from "zustand";
import type { Project } from "../../types";
import { createProject, deleteProject, fetchProjects, ProjectInput } from "../../lib/projectsApi";

export type ProjectsSlice = {
  projects: Project[];
  projectsStatus: "idle" | "loading" | "ready" | "error";
  projectsError: string | null;
  isDeleteProjectPopUpOpen:boolean,
  loadProjects: () => Promise<void>;
  addProject: (input: ProjectInput) => Promise<Project>;
  removeProject: (id: number) => Promise<void>;

  OpenDeleteModal:() => void,
  CloseDeleteModal:() => void,

};

export const createProjectsSlice: StateCreator<ProjectsSlice, [], [], ProjectsSlice> = (set, get) => ({
  projects: [],
  projectsStatus: "idle",
  projectsError: null,
  isDeleteProjectPopUpOpen:false,

  OpenDeleteModal:() => set({isDeleteProjectPopUpOpen:true}),
  CloseDeleteModal:() => set({isDeleteProjectPopUpOpen:false}),

  loadProjects: async () => {
    const { projectsStatus } = get();
    if (projectsStatus === "loading") return;

    set({ projectsStatus: "loading", projectsError: null });
    try {
      const data = await fetchProjects();
      set({ projects: data, projectsStatus: "ready" });
    } catch (e) {
      set({
        projectsStatus: "error",
        projectsError: e instanceof Error ? e.message : "Unknown error",
      });
    }
  },

  addProject: async (input) => {
    const optimisticId = -Date.now();
    const optimistic: Project = { id: optimisticId, ...input };
    set({ projects: [optimistic, ...get().projects] });

    try {
      const created = await createProject(input);
      set({
        projects: get().projects.map((p) => (p.id === optimisticId ? created : p)),
      });
      return created;
    } catch (e) {
      set({ projects: get().projects.filter((p) => p.id !== optimisticId) });
      throw e;
    }
  },

  removeProject: async (id) => {
    const prev = get().projects;
    set({ projects: prev.filter((p) => p.id !== id) });
    try {
      await deleteProject(id);
    } catch (e) {
      set({ projects: prev });
      throw e;
    }
  },
});

