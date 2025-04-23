import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

interface Medication {
  id: string;
  name: string;
  dosage: string;
  startDate: Date;
  duration: number;
  timeOfDay: string;
  daysCompleted: number;
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
  const { toast } = useToast();
  const { permission, requestPermission, sendNotification } = useNotifications();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dosage: "",
      timeOfDay: "",
      duration: 7,
    },
  });

  useEffect(() => {
    const checkMedications = () => {
      const now = new Date();
      medications.forEach((med) => {
        const [hours, minutes] = med.timeOfDay.split(':');
        const medicationTime = new Date();
        medicationTime.setHours(parseInt(hours, 10));
        medicationTime.setMinutes(parseInt(minutes, 10));
        medicationTime.setSeconds(0);

        const timeDiff = Math.abs(now.getTime() - medicationTime.getTime());
        if (timeDiff <= 60000) {
          sendNotification(`Time to take ${med.name}`, {
            body: `Dosage: ${med.dosage}`,
            icon: '/favicon.ico'
          });
          
          toast({
            title: "Medicine Reminder",
            description: `It's time to take ${med.name} (${med.dosage})`,
          });
        }
      });
    };

    const interval = setInterval(checkMedications, 60000);
    return () => clearInterval(interval);
  }, [medications, sendNotification, toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (permission !== 'granted') {
      const permissionGranted = await requestPermission();
      if (!permissionGranted) {
        toast({
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
    };
    
    setMedications(prev => [...prev, newMedication]);
    toast({
      title: "Medicine scheduled",
      description: `${values.name} has been added to your schedule.`,
    });
    form.reset();
  };

  const calculateProgress = (medication: Medication) => {
    return (medication.daysCompleted / medication.duration) * 100;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus size={16} className="mr-2" />
            Add New Medication
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
            <p className="text-sm text-muted-foreground">
              You will receive notifications when it's time to take your medicine.
            </p>
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

      <div className="space-y-4 mt-6">
        {medications.map((med) => (
          <div key={med.id} className="bg-muted/50 rounded-xl p-4 border border-border">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{med.name}</h4>
                <p className="text-sm text-muted-foreground">{med.dosage}</p>
              </div>
              <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {med.timeOfDay}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${calculateProgress(med)}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {med.daysCompleted}/{med.duration} days
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineScheduler;
