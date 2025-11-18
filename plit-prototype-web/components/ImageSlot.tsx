'use client';

interface ImageSlotProps {
  show: boolean;
  src?: string;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
  className?: string;
}

export const ImageSlot = ({
  show,
  src,
  animation = 'fade',
  className = ''
}: ImageSlotProps) => {
  const animations = {
    fade: show ? 'opacity-100' : 'opacity-0',
    'slide-up': show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
    'slide-down': show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
    scale: show ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
  };

  return (
    <div
      className={`w-full h-64 bg-gray-200 rounded-2xl transition-all duration-500 overflow-hidden ${animations[animation]} ${className}`}
    >
      {src && (
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
