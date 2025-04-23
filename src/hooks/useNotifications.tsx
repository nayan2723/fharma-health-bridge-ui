
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

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
    // Send the browser notification if permission is granted
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
    
    // Return true if browser notification was sent
    return permission === 'granted';
  };

  // Method to show a prominent toast notification
  const showPromptNotification = (
    title: string,
    message: string,
    onTaken: () => void,
    onMissed: () => void
  ) => {
    console.log("Showing prompt notification:", title, message);
    
    toast.custom(
      (id) => (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/50">
          <div className="bg-background rounded-lg p-6 shadow-lg max-w-md w-full mx-4 border border-border animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-muted-foreground mb-6">{message}</p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  console.log("Medication marked as taken");
                  onTaken();
                  toast.dismiss(id);
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-lg font-medium flex items-center justify-center"
              >
                I took it
              </button>
              <button 
                onClick={() => {
                  console.log("Medication marked as missed");
                  onMissed();
                  toast.dismiss(id);
                }}
                className="flex-1 bg-destructive/10 hover:bg-destructive/20 text-destructive py-2 px-4 rounded-lg font-medium flex items-center justify-center"
              >
                Nah, I missed it
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        important: true,
        className: "p-0 bg-transparent border-none shadow-none"
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
