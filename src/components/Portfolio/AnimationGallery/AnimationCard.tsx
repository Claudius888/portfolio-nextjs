'use client';
import { useRef } from 'react';
import { VideoView } from './VideoView';
import { AnimationsObj, cardClick } from '@/lib/types';

function AnimationCard({
  animation,
  isSelected,
  onCardClick,
}: {
  animation: AnimationsObj;
  isSelected: Boolean;
  onCardClick: cardClick;
}) {
  const cardRef = useRef(null);

  const handleClick = () => {
    if (cardRef.current) {
      onCardClick(animation, cardRef.current);
    }
  };

  return (
    <div
      ref={cardRef}
      data-animation-id={animation.id}
      className={`rounded-xl shadow-md overflow-hidden p-4 pt-5 text-center flex flex-col items-center group transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${
        isSelected ? 'opacity-50' : ''
      }`}
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      aria-label={`View details for ${animation.title}`}
    >
      <VideoView animation={animation} isSelected={isSelected} />
      {/* Card Title */}
      <h3
        className={`text-base font-normal text-center bg-clip-text bg-white-gradient text-transparent group-hover:text-blue-600 transition-opacity duration-300 ${
          isSelected ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {animation.title}
      </h3>
    </div>
  );
}

export default AnimationCard;
