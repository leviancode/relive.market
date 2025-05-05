import { type Button as ButtonType } from '@telegram-apps/telegram-ui';
import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import './Button.css';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  type = 'button',
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames('button', `button--${variant}`, `button--${size}`, className)}
    >
      {children}
    </button>
  );
}; 