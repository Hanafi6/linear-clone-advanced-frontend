'use client'
import Button from '@/Components/Button';
import { BadgePlus, ListRestart} from 'lucide-react'
import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion'
import Menue from '@/Components/Menue';
import { useCreateProject } from '@/lib/Selecteds';
import { useRouter } from 'next/navigation';

export default function ProjectsHeader() {
    const [openMenue, setOpenMenue] = useState(false);
    const navigate = useRouter();
    const OpenModal =  () => setOpenMenue(prev => !prev);
    
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6 px-4 md:px-0" 
             style={{ borderColor: "var(--color-border)" }}>
            
            <div className="min-w-[200px]">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
                    Projects
                </h1>
                <p className="mt-1 text-xs md:text-sm" style={{ color: "var(--color-muted)" }}>
                    إدارة ومتابعة كافة المشاريع النشطة والمخطط لها.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <Button 
                    icon={BadgePlus}
                    onClick={() => navigate.push("/create_project")}
                    variant="primary"
                    className='px-4 py-2 rounded-lg text-sm font-medium'
                >
                    Add Project
                </Button>

                <div className='relative'>
                    <Button 
                        icon={ListRestart} 
                        onClick={OpenModal}
                        variant="outline"
                        
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${openMenue ? 'ring-2 ring-[var(--color-info)]' : ''}`}
                    >
                        Set Details
                    </Button>

                    <AnimatePresence>
                        {openMenue && <Menue onClose={() => setOpenMenue(false)} />}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}