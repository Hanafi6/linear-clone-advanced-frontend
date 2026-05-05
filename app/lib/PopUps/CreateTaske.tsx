'use client'
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeClosed } from 'lucide-react';
import { useCreateTask } from '../Selecteds';
import {useState} from 'react'
import { useAuth } from '@/auth/useAuth';
import { useParams } from 'next/navigation';
import { Task } from '@/types';
import toast from 'react-hot-toast';

// افترضت إن عندك State هنا أو بتجيبها من Store (زي Zustand)
// لو الـ State موجودة في مكان تاني، استقبلها كـ Props
export default function CreateTaske() {
    const isOpen = useAppStore(state => state.IsPopUpOpen);
    const CloseModal = useAppStore(state => state.ClosePopUp);
    const { mutate, isPending } = useCreateTask();
    const { user } = useAuth();
    const { id: projectId } = useParams();

    const [task, setTask] = useState<Omit<Task, 'id' | 'createdAt'>>({
        title: '',
        status: 'pending',
        assignedTo: user?.id || '',
        done: false,
        priority: "high",
        projectId: projectId as string,
    });

    const submit = () => {
        if (!task?.title.trim()) toast.error("اسم المهمة مطلوب!");
        mutate(task, {
            onSuccess: () => {
                CloseModal();
                setTask({ ...task, title: '' }); 
            }
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ background: 'rgba(0,0,0,0.6)' }} // يفضل خلفية شفافة عشان تشوف اللي وراها
                        className="fixed inset-0 z-[1000] backdrop-blur-md"
                        onClick={CloseModal}
                    />

                    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl shadow-2xl pointer-events-auto"
                        >
                            <div className='flex flex-row justify-between items-center mb-6'>
                                <h2 className="text-xl font-bold">Create Task</h2>
                                <EyeClosed onClick={CloseModal} className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity' />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-[var(--color-muted)] mb-1 block">Task Name</label>
                                    <input
                                        type="text"
                                        placeholder="What needs to be done?"
                                        className="w-full p-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl outline-none focus:border-[var(--color-primary)] transition-colors"
                                        value={task.title ||''}
                                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-2">
                                    {['low', 'medium', 'high'].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setTask({ ...task, priority: p as any })}
                                            className={`flex-1 py-1 text-xs rounded-md border transition-all ${task.priority === p ? 'bg-white text-black border-white' : 'border-[var(--color-border)] text-[var(--color-muted)]'}`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={submit}
                                    disabled={isPending || !task.title}
                                    className="w-full py-3 bg-white text-black rounded-xl font-bold active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                                >
                                    {isPending ? "Saving..." : "Save Task"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}