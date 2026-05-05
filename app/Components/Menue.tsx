import { useAppStore } from '@/store/useAppStore';
import { ProjectMode } from '@/types';
import {motion} from 'framer-motion'
import { Brain, Layers, Settings, Trash2 } from 'lucide-react';

const Menue = ({ onClose }: { onClose: () => void }) => {
    const setMode = useAppStore(state => state.setProjectMode);

    const handelClick = (type:ProjectMode) => {
        setMode(type);
        onClose();
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className='absolute top-full right-0 mt-3 p-1.5 rounded-xl border z-50 shadow-2xl min-w-[180px] overflow-hidden'
            style={{
                background: "var(--color-bg)", // خلفية شفافة داكنة
                borderColor: "var(--color-border)",
                backdropFilter: "blur(12px) saturate(180%)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
            }}
        >
            <div className="flex flex-col gap-0.5">
                {/* خيار Mind */}
                <MenuButton icon={Brain} label="Mind Mode" onClick={()=> handelClick('mind')}  />
                
                {/* خيار All */}
                <MenuButton icon={Layers} label="All Projects" onClick={()=> handelClick('all')} />
                
                <div className="h-[1px] my-1.5 opacity-50" style={{ background: "var(--color-border)" }} />
                
                {/* خيارات إضافية لشكل المنيو */}
                <MenuButton icon={Settings} label="Settings" onClick={onClose} />
                <MenuButton icon={Trash2} label="Archive" color="text-red-400" onClick={onClose} />
            </div>
        </motion.div>
    );
};

// كمبوننت صغير للأزرار داخل المنيو
const MenuButton = ({ icon: Icon, label, onClick, color }: any) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] group`}
    >
        <Icon size={16} className={`${color || 'text-[var(--color-muted)]'} group-hover:text-[var(--color-text)]`} />
        <span className={color || 'text-[var(--color-text)]'}>{label}</span>
    </button>
);

export default Menue