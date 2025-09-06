'use client';
import * as React from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
} from 'motion/react';
import { createContext, useContext, useState, useId, useEffect } from 'react';
import { cn } from '@/lib/utils';

const DisclosureContext = createContext(undefined);

function DisclosureProvider({ children, open, onOpenChange, variants }) {
  const [internalOpenValue, setInternalOpenValue] = useState(open);

  useEffect(() => {
    setInternalOpenValue(open);
  }, [open]);

  const toggle = () => {
    const newOpen = !internalOpenValue;
    setInternalOpenValue(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <DisclosureContext.Provider
      value={{
        open: internalOpenValue,
        toggle,
        variants,
      }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}

function useDisclosure() {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('useDisclosure must be used within a DisclosureProvider');
  }
  return context;
}

function Disclosure({ open = false, onOpenChange, children, className, transition, variants }) {
  return (
    <MotionConfig transition={transition}>
      <div className={className}>
        <DisclosureProvider open={open} onOpenChange={onOpenChange} variants={variants}>
          {React.Children.toArray(children)[0]}
          {React.Children.toArray(children)[1]}
        </DisclosureProvider>
      </div>
    </MotionConfig>
  );
}

function DisclosureTrigger({ children, className }) {
  const { toggle, open } = useDisclosure();

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              onClick: toggle,
              role: 'button',
              'aria-expanded': open,
              tabIndex: 0,
              onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle();
                }
              },
              className: cn(className, child.props.className),
              ...child.props,
            })
          : child;
      })}
    </>
  );
}

function DisclosureContent({ children, className }) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

  const BASE_VARIANTS = {
    expanded: {
      height: 'auto',
      opacity: 1,
    },
    collapsed: {
      height: 0,
      opacity: 0,
    },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={uniqueId}
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            variants={combinedVariants}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default {
  Disclosure,
  DisclosureProvider,
  DisclosureTrigger,
  DisclosureContent,
};