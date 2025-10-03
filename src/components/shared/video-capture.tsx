"use client";

import React, { useRef, useState } from 'react';
import { Camera, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoCaptureProps {
  videoElement: HTMLVideoElement | null;
  onCapture?: (imageDataUrl: string) => void;
  className?: string;
}

const VideoCapture: React.FC<VideoCaptureProps> = ({ 
  videoElement, 
  onCapture, 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const captureFrame = async () => {
    if (!videoElement || !canvasRef.current) return;

    setIsCapturing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Set canvas dimensions to match video
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // Draw the current video frame to canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const imageDataUrl = canvas.toDataURL('image/png', 0.9);
      
      setCapturedImage(imageDataUrl);
      setShowPreview(true);
      
      // Call the callback if provided
      if (onCapture) {
        onCapture(imageDataUrl);
      }
    } catch (error) {
      console.error('Error capturing video frame:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadImage = () => {
    if (!capturedImage) return;

    const link = document.createElement('a');
    link.download = `video-capture-${Date.now()}.png`;
    link.href = capturedImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closePreview = () => {
    setShowPreview(false);
    setCapturedImage(null);
  };

  return (
    <>
      {/* Hidden canvas for capturing */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }} 
      />

      {/* Capture Button */}
      <motion.button
        onClick={captureFrame}
        disabled={isCapturing || !videoElement}
        className={`relative overflow-hidden rounded-full p-2 bg-black/50 hover:bg-black/70 transition-all duration-300 disabled:opacity-50 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Camera 
          className={`w-4 h-4 text-white ${isCapturing ? 'animate-pulse' : ''}`} 
        />
        {isCapturing && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && capturedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              onClick={closePreview}
            />

            {/* Preview Content */}
            <motion.div
              className="relative bg-white rounded-2xl p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={closePreview}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Captured Image */}
              <div className="mb-4">
                <img
                  src={capturedImage}
                  alt="Captured frame"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={downloadImage}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
                
                <motion.button
                  onClick={closePreview}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCapture;
