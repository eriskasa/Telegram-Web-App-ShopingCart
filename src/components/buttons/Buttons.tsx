import './Buttons.css'
import { ReactNode } from 'react';

interface ButtonProps  {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button = ({ children, onClick, variant='primary', disabled = false, className, icon }: ButtonProps) => {

  return (
    <button
    onClick={onClick}
    disabled={disabled} 
    className={`button ${variant} ${className}`}
    aria-label={icon ? 'Icon Button' : undefined}
    >
     {icon && <span className='icon'>{icon}</span>} 
    {children}
      </button>
  )
}

export default Button;