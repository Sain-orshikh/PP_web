'use client';
import { AnimatePresence, motion, Variants } from 'motion/react';
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  variants: Variants;
  transition: Record<string, unknown>;
  onAnimationComplete: (definition: string) => void;
  handleTrigger: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

const defaultVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};

const defaultTransition = { ease: 'easeOut', duration: 0.2 };

interface DialogProps {
  children: React.ReactNode;
  variants?: Variants;
  transition?: typeof defaultTransition;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  variants = defaultVariants,
  transition = defaultTransition,
  defaultOpen,
  onOpenChange,
  open
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = open !== undefined ? open : uncontrolledOpen;

  const setIsOpen = useCallback((value: boolean) => {
    setUncontrolledOpen(value);
    if (onOpenChange) onOpenChange(value);
  }, [onOpenChange]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    document.body.classList.toggle('overflow-hidden', isOpen);
    
    const handleCancel = (e: Event) => {
      e.preventDefault();
      if (isOpen) setIsOpen(false);
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isOpen]);

  const handleTrigger = () => setIsOpen(true);

  const onAnimationComplete = (definition: string) => {
    if (definition === 'exit' && !isOpen) {
      dialogRef.current?.close();
    }
  };

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen, dialogRef, variants, transition, onAnimationComplete, handleTrigger }}>
      {children}
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, className }) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTrigger must be used within Dialog');

  return (
    <div onClick={context.handleTrigger} className={cn('cursor-pointer', className)}>
      {children}
    </div>
  );
};

interface DialogPortalProps {
  children: React.ReactNode;
  container?: Element | null;
}

const DialogPortal: React.FC<DialogPortalProps> = ({ children, container }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && container ? createPortal(children, container) : null;
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  container?: Element | null;
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className, container }) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogContent must be used within Dialog');

  const { isOpen, setIsOpen, dialogRef, variants, transition, onAnimationComplete } = context;

  return (
    <DialogPortal container={container}>
      <AnimatePresence mode='wait'>
        {isOpen && (
          <motion.dialog
            ref={dialogRef}
            aria-modal='true'
            role='dialog'
            onClick={(e: React.MouseEvent) => e.target === dialogRef.current && setIsOpen(false)}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={transition}
            onAnimationComplete={onAnimationComplete}
            className={cn('fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4', className)}
          >
            <div>{children}</div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className }) => {
  return <div className={cn('space-y-2', className)}>{children}</div>;
};

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => {
  return <h2 className={cn('text-xl font-semibold', className)}>{children}</h2>;
};

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className }) => {
  return <p className={cn('text-sm text-gray-600 dark:text-gray-400', className)}>{children}</p>;
};

const DialogClose: React.FC = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogClose must be used within Dialog');
  return <button onClick={() => context.setIsOpen(false)}>Close</button>;
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose };
