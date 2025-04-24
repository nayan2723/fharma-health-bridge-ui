
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Bell, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";
import { toast } from "@/components/ui/sonner";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  startDate: Date;
  duration: number;
  timeOfDay: string;
  daysCompleted: number;
  status?: 'taken' | 'not_taken';
  lastUpdated?: Date;
}

const formSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  duration: z.coerce.number().min(1, "Duration must be at least 1 day"),
  timeOfDay: z.string().min(1, "Time of day is required"),
});

const MedicineScheduler = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const { toast: shadcnToast } = useToast();
  const { permission, requestPermission, sendNotification, showPromptNotification } = useNotifications();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dosage: "",
      timeOfDay: "",
      duration: 7,
    },
  });

  const updateMedicationStatus = (id: string, status: 'taken' | 'not_taken') => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, status, lastUpdated: new Date() } : med
      )
    );
  };

  useEffect(() => {
    // Debug to verify medications state
    console.log('Current medications:', medications);

    const checkMedications = () => {
      const now = new Date();
      console.log('Checking medications at:', now.toLocaleTimeString());
      
      medications.forEach((med) => {
        const [hours, minutes] = med.timeOfDay.split(':');
        const medicationTime = new Date();
        medicationTime.setHours(parseInt(hours, 10));
        medicationTime.setMinutes(parseInt(minutes, 10));
        medicationTime.setSeconds(0);
        
        // For debugging
        console.log(`Medication ${med.name} time: ${medicationTime.toLocaleTimeString()}`);
        
        const timeDiff = Math.abs(now.getTime() - medicationTime.getTime());
        const timeDiffMinutes = timeDiff / 60000;
        
        console.log(`Time difference for ${med.name}: ${timeDiffMinutes.toFixed(2)} minutes`);
        
        // Check if it's within 2 minutes of medication time and not already notified today
        if (timeDiffMinutes <= 2 && (!med.lastUpdated || med.lastUpdated.getDate() !== now.getDate())) {
          console.log(`Showing notification for ${med.name}`);
          
          // Send browser notification
          sendNotification(`Time to take ${med.name}`, {
            body: `Dosage: ${med.dosage}`,
            icon: '/favicon.ico'
          });
          
          // Show prompt notification (modal)
          showPromptNotification(
            "Medicine Reminder",
            `It's time to take ${med.name} (${med.dosage})`,
            () => updateMedicationStatus(med.id, 'taken'),
            () => updateMedicationStatus(med.id, 'not_taken')
          );
        }
      });
    };

    // Check immediately when component mounts or medications change
    checkMedications();
    
    // Then set interval to check every 30 seconds
    const interval = setInterval(checkMedications, 30000);
    return () => clearInterval(interval);
  }, [medications, sendNotification, showPromptNotification]);

  // For testing - add a function to simulate a notification
  const testNotification = () => {
    if (medications.length > 0) {
      const testMed = medications[0];
      showPromptNotification(
        "Test Medicine Reminder",
        `It's time to take ${testMed.name} (${testMed.dosage})`,
        () => updateMedicationStatus(testMed.id, 'taken'),
        () => updateMedicationStatus(testMed.id, 'not_taken')
      );
    } else {
      toast.info("Please add a medication first to test notifications");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (permission !== 'granted') {
      const permissionGranted = await requestPermission();
      if (!permissionGranted) {
        shadcnToast({
          title: "Notification Permission Required",
          description: "Please enable notifications to receive medicine reminders.",
        });
      }
    }

    const newMedication: Medication = {
      id: Math.random().toString(36).substring(7),
      name: values.name,
      dosage: values.dosage,
      startDate: values.startDate,
      duration: values.duration,
      timeOfDay: values.timeOfDay,
      daysCompleted: 0,
      status: 'not_taken',
      lastUpdated: new Date(),
    };
    
    setMedications(prev => [...prev, newMedication]);
    shadcnToast({
      title: "Medicine scheduled",
      description: `${values.name} has been added to your schedule.`,
    });
    form.reset();
  };

  const calculateProgress = (medication: Medication) => {
    return (medication.daysCompleted / medication.duration) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mb-4">
            <Plus size={16} className="mr-2" />
            Add New Medication
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
            <DialogDescription>
              You will receive notifications when it's time to take your medicine.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicine Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter medicine name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500mg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (days)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeOfDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Day</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Add Medication</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Button onClick={testNotification} variant="outline" className="w-full mb-4 bg-primary/5 border-primary/20">
        <Bell size={16} className="mr-2" />
        Test Notification
      </Button>

      <div className="space-y-4 mt-6">
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-primary" size={20} />
            <h3 className="font-medium">Medicine Schedule</h3>
          </div>
          <div className="space-y-4">
            {medications.map((med) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={med.id}
                className={cn(
                  "p-4 rounded-xl transition-all",
                  med.status === 'taken' 
                    ? "bg-primary/5 border border-primary/20" 
                    : "bg-muted/50 border border-border"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{med.name}</h4>
                    <p className="text-sm text-muted-foreground">{med.dosage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {med.status && (
                      <div className={cn(
                        "text-xs px-2 py-1 rounded-full flex items-center gap-1",
                        med.status === 'taken' 
                          ? "bg-primary/10 text-primary" 
                          : "bg-destructive/10 text-destructive"
                      )}>
                        {med.status === 'taken' ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Taken
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Not Taken
                          </>
                        )}
                      </div>
                    )}
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {med.timeOfDay}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateProgress(med)}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-primary h-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {med.daysCompleted}/{med.duration} days
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicineScheduler;
