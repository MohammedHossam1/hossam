"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoThumbnailProps {
  videoSrc: string;
  className?: string;
  fallbackSrc?: string;
  onThumbnailGenerated?: (thumbnailDataUrl: string) => void;
}

// Thumbnail cache to avoid regenerating thumbnails
const thumbnailCache = new Map<string, string>();

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ 
  videoSrc, 
  className = "",
  fallbackSrc,
  onThumbnailGenerated 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check cache first
    const cachedThumbnail = thumbnailCache.get(videoSrc);
    if (cachedThumbnail) {
      setThumbnailSrc(cachedThumbnail);
      return;
    }

    generateThumbnail();
  }, [videoSrc]);

  const generateThumbnail = async () => {
    console.log('Starting thumbnail generation for:', videoSrc);
    
    if (!videoRef.current || !canvasRef.current) {
      console.log('Video or canvas ref not available');
      return;
    }

    setIsGenerating(true);
    setError(false);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      console.log('Setting video source:', videoSrc);
      // Set video source
      video.src = videoSrc;

      // Wait for video to load metadata
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = () => {
          console.log('Video metadata loaded, duration:', video.duration);
          // Seek to 1 second or 10% of duration (whichever is smaller)
          const seekTime = Math.min(1, video.duration * 0.1);
          console.log('Seeking to:', seekTime);
          video.currentTime = seekTime;
        };

        video.onseeked = () => {
          console.log('Video seeked, drawing to canvas');
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw the current frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert canvas to data URL
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          console.log('Thumbnail generated successfully');
          
          // Cache the thumbnail
          thumbnailCache.set(videoSrc, thumbnailDataUrl);
          setThumbnailSrc(thumbnailDataUrl);
          
          // Call callback if provided
          if (onThumbnailGenerated) {
            onThumbnailGenerated(thumbnailDataUrl);
          }

          resolve(thumbnailDataUrl);
        };

        video.onerror = (e) => {
          console.error('Video load error:', e);
          reject(new Error('Video failed to load'));
        };

        // Timeout after 5 seconds
        setTimeout(() => {
          console.log('Video load timeout');
          reject(new Error('Video load timeout'));
        }, 5000);
      });
    } catch (err) {
      console.error('Error generating thumbnail:', err);
      setError(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // Show loading state
  if (isGenerating) {
    return (
      <div className={`bg-gray-200 animate-pulse rounded-xl ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Hidden video and canvas elements for thumbnail generation */}
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          crossOrigin="anonymous"
          preload="metadata"
        />
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </div>
    );
  }

  // Show error state with fallback
  if (error && fallbackSrc) {
    return (
      <>
        <img
          src={fallbackSrc}
          alt="Video thumbnail"
          className={`object-cover rounded-xl ${className}`}
        />
        
        {/* Hidden video and canvas elements for thumbnail generation */}
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          crossOrigin="anonymous"
          preload="metadata"
        />
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </>
    );
  }

  // Show generated thumbnail
  if (thumbnailSrc) {
    return (
      <>
        <motion.img
          src={thumbnailSrc}
          alt="Video thumbnail"
          className={`object-cover rounded-xl ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Hidden video and canvas elements for thumbnail generation */}
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          crossOrigin="anonymous"
          preload="metadata"
        />
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </>
    );
  }

  // Show placeholder while loading
  return (
    <div className={`bg-gray-200 rounded-xl ${className}`}>
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <span className="text-sm">Loading...</span>
      </div>
      
      {/* Hidden video and canvas elements for thumbnail generation */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        crossOrigin="anonymous"
        preload="metadata"
      />
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default VideoThumbnail;