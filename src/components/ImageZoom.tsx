
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageZoom = ({ src, alt, className }: ImageZoomProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative group">
        <img 
          src={src} 
          alt={alt} 
          className={`${className} cursor-zoom-in`}
          onClick={() => setIsOpen(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <ZoomIn className="text-primary/0 group-hover:text-primary/80 transition-colors" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 bg-background rounded-full p-1 shadow-lg hover:bg-muted transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-auto object-contain rounded-lg" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageZoom;
