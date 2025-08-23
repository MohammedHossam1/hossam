"use client";
import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    // Listen to changes
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Set initial state
    updateOnlineStatus();

    // Cleanup
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-red-600 text-white text-center py-2 z-50 shadow-md flex items-center gap-2 justify-center">
      <WifiOff />
      {"No internet connection"}
    </div>
  );
}
