'use client';
import { AnimatePresence, motion } from 'motion/react';
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const DialogContext = createContext(null);

const defaultVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};

const defaultTransition = { ease: 'easeOut', duration: 0.2 };

function Dialog({ children, variants = defaultVariants, transition = defaultTransition, defaultOpen, onOpenChange, open }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
  const dialogRef = useRef(null);
  const isOpen = open !== undefined ? open : uncontrolledOpen;

  const setIsOpen = useCallback((value) => {
    setUncontrolledOpen(value);
    if (onOpenChange) onOpenChange(value);
  }, [onOpenChange]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    document.body.classList.toggle('overflow-hidden', isOpen);
    
    const handleCancel = (e) => {
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

  const onAnimationComplete = (definition) => {
    if (definition === 'exit' && !isOpen) {
      dialogRef.current?.close();
    }
  };

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen, dialogRef, variants, transition, onAnimationComplete, handleTrigger }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, className }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogTrigger must be used within Dialog');

  return (
    <button onClick={context.handleTrigger} className={cn('button-class', className)}>
      {children}
    </button>
  );
}

function DialogPortal({ children, container = typeof window !== 'undefined' ? document.body : null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && container ? createPortal(children, container) : null;
}

function DialogContent({ children, className, container }) {
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
            onClick={(e) => e.target === dialogRef.current && setIsOpen(false)}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={transition}
            onAnimationComplete={onAnimationComplete}
            className={cn('dialog-class', className)}
          >
            <div>{children}</div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
}

function DialogHeader({ children, className }) {
  return <div className={cn('header-class', className)}>{children}</div>;
}

function DialogTitle({ children, className }) {
  return <h2 className={cn('title-class', className)}>{children}</h2>;
}

function DialogDescription({ children, className }) {
  return <p className={cn('description-class', className)}>{children}</p>;
}

function DialogClose({ className, children, disabled }) {
  const context = useContext(DialogContext);
  if (!context) throw new Error('DialogClose must be used within Dialog');

  return (
    <button onClick={() => context.setIsOpen(false)} type='button' disabled={disabled} className={cn('close-button-class', className)}>
      {children || <X className='icon-class' />}
      <span className='sr-only'>Close</span>
    </button>
  );
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose };
