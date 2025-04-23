
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { Check, X, Bell, BellOff } from 'lucide-react';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      console.log("Current notification permission:", Notification.permission);
    } else {
      console.log("Notifications not supported in this browser");
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log("Notifications not supported");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      console.log("Permission requested, result:", permission);
      setPermission(permission);
      return permission === 'granted';
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    console.log("Attempting to send notification:", title);
    
    if (permission === 'granted') {
      try {
        const notification = new Notification(title, options);
        console.log("Browser notification sent:", notification);
        return true;
      } catch (error) {
        console.error("Error sending browser notification:", error);
      }
    } else {
      console.log("Notification permission not granted, current status:", permission);
    }
    
    return permission === 'granted';
  };

  const showPromptNotification = (
    title: string,
    message: string,
    onTaken: () => void,
    onMissed: () => void
  ) => {
    console.log("Showing prompt notification:", title, message);
    
    // Use Sonner toast with highest priority to ensure it shows
    toast.custom(
      (id) => (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[100] bg-black/50" 
          onClick={(e) => {
            // Prevent clicks on the overlay from dismissing the toast
            e.stopPropagation();
          }}
        >
          <div 
            className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4 border border-border animate-in fade-in zoom-in-95 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-primary-foreground flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {title}
                </h3>
                {permission !== 'granted' && (
                  <div className="flex items-center gap-1 text-xs bg-background/10 text-primary-foreground px-2 py-1 rounded-full">
                    <BellOff className="w-3 h-3" />
                    <span>Notifications blocked</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground text-base mb-6">{message}</p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    console.log("Medication marked as taken");
                    onTaken();
                    toast.dismiss(id);
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  I took it
                </button>
                <button 
                  onClick={() => {
                    console.log("Medication marked as missed");
                    onMissed();
                    toast.dismiss(id);
                  }}
                  className="flex-1 bg-destructive/10 hover:bg-destructive/20 text-destructive py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  I missed it
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        important: true,
        className: "p-0 bg-transparent border-none shadow-none max-w-none w-full",
        position: "fixed", // Change to fixed to ensure full-screen positioning
        style: { 
          width: "100%", 
          maxWidth: "100%",
          top: "0",
          left: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }
      }
    );
  };

  return {
    permission,
    requestPermission,
    sendNotification,
    showPromptNotification
  };
};
