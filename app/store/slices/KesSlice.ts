// src/store/slices/projectSlice.ts
import { StateCreator } from 'zustand';
import { ProjectState, ProjectMode } from '@/types';

export const createProjectSlice: StateCreator<ProjectState> = (set) => ({
  projectMode: 'all', // الحالة الافتراضية
  setProjectMode: (mode) => set({ projectMode: mode }),
});