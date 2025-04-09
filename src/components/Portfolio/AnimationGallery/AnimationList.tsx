'use client';
import { AnimationsObj, cardClick } from '@/lib/types';
import AnimationCard from './AnimationCard';

function AnimationList({
  animations,
  onAnimationClick,
  selectedAnimationId,
}: {
  animations: AnimationsObj[];
  onAnimationClick: cardClick;
  selectedAnimationId: string | undefined;
}) {
  if (!animations || animations.length === 0) {
    return (
      <p className='text-center text-gray-500 text-lg mt-10'>
        No animations found.
      </p>
    );
  }

  return (
    <div className='w-full max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {animations.map((animation) => (
        <AnimationCard
          key={animation.id}
          animation={animation} // Pass the whole animation object
          isSelected={selectedAnimationId === animation.id} // Pass boolean if selected
          onCardClick={onAnimationClick} // Renamed prop for clarity
        />
      ))}
    </div>
  );
}

export default AnimationList;
