// src/store/slices/projectSlice.ts
import { StateCreator } from 'zustand';
import { PopUp } from '@/types';

export const AlertSlice: StateCreator<PopUp> = (set) => ({
    IsPopUpOpen:false,
    OpenPopUp:() => set({IsPopUpOpen:true}),
    ClosePopUp:() => set({IsPopUpOpen:false})
});