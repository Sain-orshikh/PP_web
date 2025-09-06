'use client';
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useMotionValue } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselContext = createContext(undefined);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within an CarouselProvider');
  }
  return context;
}

function CarouselProvider({ children, initialIndex = 0, onIndexChange, disableDrag = false }) {
  const [index, setIndex] = useState(initialIndex);
  const [itemsCount, setItemsCount] = useState(0);

  const handleSetIndex = (newIndex) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider value={{ index, setIndex: handleSetIndex, itemsCount, setItemsCount, disableDrag }}>
      {children}
    </CarouselContext.Provider>
  );
}

function Carousel({ children, className, initialIndex = 0, index: externalIndex, onIndexChange, disableDrag = false }) {
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = (newIndex) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  return (
    <CarouselProvider initialIndex={currentIndex} onIndexChange={handleIndexChange} disableDrag={disableDrag}>
      <div className={cn('group/hover relative', className)}>
        <div className='overflow-x-hidden overflow-y-visible'>{children}</div>
      </div>
    </CarouselProvider>
  );
}

function CarouselNavigation({ className, classNameButton, alwaysShow }) {
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div className={cn('pointer-events-none absolute left-[-12.5%] top-1/2 flex w-[125%] -translate-y-1/2 justify-between px-2', className)}>
      <button
        type='button'
        aria-label='Previous slide'
        className={cn('pointer-events-auto w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950',
          alwaysShow ? 'opacity-100' : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow ? 'disabled:opacity-40' : 'group-hover/hover:disabled:opacity-40',
          classNameButton
        )}
        disabled={index === 0}
        onClick={() => index > 0 && setIndex(index - 1)}
      >
        <ChevronLeft className='stroke-zinc-600 dark:stroke-zinc-50' size={16} />
      </button>
      <button
        type='button'
        aria-label='Next slide'
        className={cn('pointer-events-auto w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950',
          alwaysShow ? 'opacity-100' : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow ? 'disabled:opacity-40' : 'group-hover/hover:disabled:opacity-40',
          classNameButton
        )}
        disabled={index + 1 === itemsCount}
        onClick={() => index < itemsCount - 1 && setIndex(index + 1)}
      >
        <ChevronRight className='stroke-zinc-600 dark:stroke-zinc-50' size={16} />
      </button>
    </div>
  );
}

function CarouselContent({ children, className, transition }) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel();
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);
  const itemsLength = Children.count(children);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      setVisibleItemsCount(entries.filter((entry) => entry.isIntersecting).length);
    }, { root: containerRef.current, threshold: 0.5 });

    Array.from(containerRef.current.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [children, setItemsCount]);

  useEffect(() => {
    if (itemsLength) setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -10 && index < itemsLength - 1) setIndex(index + 1);
    else if (x >= 10 && index > 0) setIndex(index - 1);
  };

  return (
    <motion.div
      drag={!disableDrag && 'x'}
      dragConstraints={!disableDrag ? { left: 0, right: 0 } : undefined}
      dragMomentum={!disableDrag && false}
      style={!disableDrag ? { x: dragX } : {}}
      animate={{ translateX: `-${index * (100 / visibleItemsCount)}%` }}
      onDragEnd={!disableDrag ? onDragEnd : undefined}
      transition={transition || { damping: 18, stiffness: 90, type: 'spring', duration: 0.2 }}
      className={cn('flex items-center', !disableDrag && 'cursor-grab active:cursor-grabbing', className)}
      ref={containerRef}
    >
      {children}
    </motion.div>
  );
}

function CarouselItem({ children, className }) {
  return <motion.div className={cn('w-full min-w-0 shrink-0 grow-0 overflow-visible', className)}>{children}</motion.div>;
}

export {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
  useCarousel,
};