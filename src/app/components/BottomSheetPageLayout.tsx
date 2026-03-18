import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BottomSheetPageLayoutProps {
  imageSrc: string;
  imageAlt?: string;
  imageHeight?: string | number;
  headerContent?: ReactNode;
  children: ReactNode;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  contentClassName?: string;
  showGrabber?: boolean;
}

export function BottomSheetPageLayout({
  imageSrc,
  imageAlt = 'Header',
  imageHeight = '280px',
  headerContent,
  children,
  contentRef,
  className = '',
  contentClassName = '',
  showGrabber = false
}: BottomSheetPageLayoutProps) {
  return (
    <div className={`min-h-screen bg-white font-inter selection:bg-gray-900 selection:text-white pb-32 ${className}`}>
      {/* Header Image Area */}
      <div className="relative w-full overflow-hidden" style={{ height: imageHeight }}>
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Custom Header Content (Back Button, Navigation, etc) */}
        {headerContent}
      </div>

      {/* Bottom-Sheet Style Content Area */}
      <div 
        ref={contentRef as React.RefObject<HTMLDivElement>} 
        className={`px-6 -mt-10 relative z-10 bg-white rounded-t-[32px] pt-4 pb-4 shadow-sm ${contentClassName}`}
      >
        {/* Optional Grabber for bottom-sheet visual */}
        {showGrabber && (
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
        )}

        {children}
      </div>
    </div>
  );
}
