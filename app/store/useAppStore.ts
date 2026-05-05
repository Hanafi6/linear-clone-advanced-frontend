// src/store/useAppStore.ts
import { create } from 'zustand';
import { createProjectSlice } from '@/store//slices/KesSlice';
import { PopUp, ProjectState } from '@/types';
import  {AlertSlice} from "@/store/slices/Alertslicse"
import  {ProjectsSlice, createProjectsSlice} from "@/store/slices/projectsSlice"

type AppStore = ProjectState & PopUp  & ProjectsSlice

// لو عندك أكتر من Slice بتجمعهم هنا في الـ Interface والـ Store
export const useAppStore = create<AppStore>((...a) => ({
  ...createProjectSlice(...a),
  ...AlertSlice(...a),
  ...createProjectsSlice(...a), // مثال لو ضفت سلايس تانية
}));