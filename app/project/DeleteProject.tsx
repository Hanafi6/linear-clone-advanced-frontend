// components/modals/DeleteProjectModal.tsx
"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteProjectModal({ 
  projectName, 
  onConfirm, 
  onClose,
  Pinding
}: { 
  projectName: string, 
  onConfirm: () => void, 
  onClose: () => void,
  Pinding:boolean 
}) {
  const [inputValue, setInputValue] = useState("");


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-danger)] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-[var(--color-danger)]">
            <AlertTriangle size={24} />
            <h3 className="text-xl font-bold">حذف المشروع نهائياً</h3>
          </div>
          
          <p className="text-sm opacity-70 leading-relaxed">
            هذا الإجراء لا يمكن التراجع عنه. سيتم حذف مشروع <span className="font-bold text-[var(--color-text)]">"{projectName}"</span> وكل المهام المتعلقة به.
          </p>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider opacity-50">اكتب اسم المشروع للتأكيد:</label>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={projectName}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-danger)]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border font-medium text-sm hover:bg-[var(--color-surface-2)] transition-colors"
            >
              إلغاء
            </button>
            <button 

              disabled={inputValue !== projectName && Pinding}
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--color-danger)] text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all"
            >
              تأكيد الحذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}