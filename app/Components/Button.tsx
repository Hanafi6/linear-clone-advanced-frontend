import React, { forwardRef } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

// 1. تعديل الـ Interface ليكون أكثر مرونة
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right' ; // حددنا القيم بدل string
    isLoading?: boolean;
    variant?: 'outline' | 'primary' | 'ghost'; // خليناها optional عشان الـ default
}

// 2. التصحيح الجوهري هنا: (props, ref) وليس (props)
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // فك البروبس هنا جوه الفنكشن
  const { 
    children, 
    icon: Icon,
    iconPosition = 'left', 
    isLoading = false,
    variant = 'primary',
    className = '',
    onClick,
    ...rest // باقي الـ props زي disabled و type
  } = props;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    if (onClick) {
      await onClick(e); 
    }
  };

  const variants = {
    primary: "bg-[var(--color-primary)] text-white",
    outline: "border border-[var(--color-border)] bg-transparent",
    ghost: "bg-transparent hover:bg-[var(--color-surface-2)]"
  };

  return (
    <button
      ref={ref} // الـ ref دلوقتى بقى متعرف وهيركب صح
      onClick={handleClick}
      className={`btn-base ${variants[variant]} ${className} flex items-center justify-center gap-2`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      
      {!isLoading && Icon && iconPosition === 'left' && <Icon size={18} />}
      
      <span>{children}</span>
      
      {!isLoading && Icon && iconPosition === 'right' && <Icon size={18} />}

    </button>
  );
});

Button.displayName = 'Button';
export default Button;