'use client'
import { HandHeart, Heart, Laugh, Lightbulb, PartyPopper, ThumbsUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
interface Reaction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
}

interface PostReactionProps {
  initialCount?: number;
  initialReaction?: string | null;
  onReactionChange?: (reaction: Reaction | null, count: number) => void;
}


const reactions: Reaction[] = [
  {
    id: 'like',
    icon: <ThumbsUp size={20} />,
    label: 'Like',
    color: 'text-blue-600',
    hoverColor: 'hover:bg-blue-50'
  },
  {
    id: 'love',
    icon: <Heart size={20} />,
    label: 'Love',
    color: 'text-red-500',
    hoverColor: 'hover:bg-red-50'
  },
  {
    id: 'insightful',
    icon: <Lightbulb size={20} />,
    label: 'Insightful',
    color: 'text-yellow-500',
    hoverColor: 'hover:bg-yellow-50'
  },
  {
    id: 'support',
    icon: <HandHeart size={20} />,
    label: 'Support',
    color: 'text-purple-600',
    hoverColor: 'hover:bg-purple-50'
  },
  {
    id: 'funny',
    icon: <Laugh size={20} />,
    label: 'Funny',
    color: 'text-green-600',
    hoverColor: 'hover:bg-green-50'
  },
  {
    id: 'celebrate',
    icon: <PartyPopper size={20} />,
    label: 'Celebrate',
    color: 'text-orange-500',
    hoverColor: 'hover:bg-orange-50'
  }
];

export default function PostReaction({ initialCount = 0, onReactionChange, initialReaction }: PostReactionProps) {
  const longPressDuration = 500;
  const playReactionSound = () => {
    if (typeof window !== "undefined") {
      const audio = new Audio('/like.mp3');
      audio.play().catch(() => { });
    }
  };

  const [reactionCount, setReactionCount] = useState(initialCount);
  const [showReactions, setShowReactions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const longPressRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null);
  useEffect(() => {
    setReactionCount(initialCount);
  }, [initialCount]);

  const handleTouchStart = () => {
    longPressRef.current = setTimeout(() => {
      setShowReactions(true);
    }, longPressDuration);
  };

  const handleTouchEnd = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
    }
  };
  useEffect(() => {
    if (initialReaction) {
      setSelectedReaction(reactions.find(r => r.id === initialReaction) ?? null);
    } else {
      setSelectedReaction(null);
    }
  }, [initialReaction]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowReactions(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowReactions(false);
    }, 200);
  };

  const handleReactionClick = (reaction: Reaction) => {
    setIsAnimating(true);
    playReactionSound(); 

    if (selectedReaction?.id === reaction.id) {
      // Remove reaction if clicking the same one
      setSelectedReaction(null);
      setReactionCount(prev => Math.max(0, prev - 1));
      onReactionChange?.(null, Math.max(0, reactionCount - 1));
    } else {
      // Add new reaction or change existing one
      const newCount = selectedReaction ? reactionCount : reactionCount + 1;
      setSelectedReaction(reaction);
      setReactionCount(newCount);
      onReactionChange?.(reaction, newCount);
    }

    setShowReactions(false);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleMainButtonClick = () => {
    if (!selectedReaction) {
      // If no reaction selected, default to "Like"
      handleReactionClick(reactions[0]);
    } else {
      // If reaction already selected, remove it
      setSelectedReaction(null);
      setReactionCount(prev => Math.max(0, prev - 1));
      onReactionChange?.(null, Math.max(0, reactionCount - 1));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Reaction Options Popup */}
      <div
        className={`
          absolute bottom-full right-0 mb-2 z-20 transition-all duration-300 transform
          ${showReactions
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
          }
        `}
      >
        <div className="bg-white rounded-full shadow-2xl border border-gray-200 px-2 py-2 flex items-center space-x-1">
          <div className="w-0 h-0 absolute  border-l-8 border-l-transparent   border-r-8 border-r-transparent   border-t-8 border-t-white -bottom-1 end-4">
          </div>
          {reactions.map((reaction, index) => (
            <button
              key={reaction.id}
              onClick={() => handleReactionClick(reaction)}
              className={`
                flex items-center justify-center p-2 rounded-full transition-all duration-200
                transform hover:scale-125 hover:-translate-y-1 active:scale-110
                ${reaction.hoverColor}
                ${selectedReaction?.id === reaction.id ? 'bg-gray-100' : ''}
              `}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <span className={`${reaction.color} transition-colors duration-200`}>
                {reaction.icon}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Reaction Button */}
      <button
        onClick={handleMainButtonClick}
        className={`
          flex items-center gap-2 cursor-pointer   rounded-lg transition-all duration-300
          ${selectedReaction
            ? `${selectedReaction.color}  hovers:bg-gray-100`
            : 'text-gray-600 hover:text-blue-600 '
          }
          ${isAnimating ? 'scale-110' : 'scale-100'}
          group
        `}
      >
        <span className={`transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
          {selectedReaction ? selectedReaction.icon : <ThumbsUp size={18} />}
        </span>
        {/* <span className="font-medium text-sm">
          {selectedReaction ? selectedReaction.label : 'Like'}
        </span> */}
        {reactionCount > 0 && (
          <span className={`
            text-xs font-semibold  py-1 rounded-full  text-center
            transition-all duration-300
            ${selectedReaction ? ' shadow-sm' : ' text-main/60'}
            ${isAnimating ? 'scale-125' : 'scale-100'}
          `}>
            {reactionCount}
          </span>
        )}
      </button>

      {/* Floating reaction indicator */}
      {isAnimating && selectedReaction && (
        <div className="absolute -top-8 left-1/2 transform z-202222222222 -translate-x-1/2 pointer-events-none">
          <span className={`
            inline-block animate-bounce ${selectedReaction.color} text-2xl
          `}>
            {selectedReaction.icon}
          </span>
        </div>
      )}
    </div>
  );
}