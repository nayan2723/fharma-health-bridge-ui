import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Pill, 
  MessageCircle, 
  Calendar, 
  FileSearch, 
  Brain, 
  Clock, 
  Video, 
  Smartphone 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Features = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Features</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the innovative features of Fharma that are bridging the gap between rural and urban healthcare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Medicine Recommender */}
      <section id="medicine-recommender" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
                <Pill size={20} className="mr-2" />
                <span className="font-medium">Medicine Recommender</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">AI-Powered Medicine Recommendations</h2>
              <p className="text-muted-foreground mb-4">
                Our advanced AI system analyzes your symptoms and medical history to recommend appropriate medications and treatments.
              </p>
              <ul className="space-y-3 mb-6">
                <FeaturePoint icon={<Brain size={18} />} text="Smart symptom analysis using machine learning" />
                <FeaturePoint icon={<Pill size={18} />} text="Personalized medicine recommendations" />
                <FeaturePoint icon={<FileSearch size={18} />} text="Consideration of medical history and allergies" />
              </ul>
              <Button size="lg" className="rounded-full">Try the Recommender</Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-lg p-6 border border-muted">
                <div className="bg-muted/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Pill size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Medicine Recommendation</h3>
                      <p className="text-sm text-muted-foreground">Based on your symptoms: Fever, Headache, Fatigue</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-background rounded-xl p-4 border border-border">
                      <h4 className="font-medium">Paracetamol (Acetaminophen)</h4>
                      <p className="text-sm text-muted-foreground">For fever and headache relief</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Recommended</span>
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-4 border border-border">
                      <h4 className="font-medium">Rest and Hydration</h4>
                      <p className="text-sm text-muted-foreground">To combat fatigue and support recovery</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-4 border border-border">
                      <p className="text-sm text-muted-foreground">Consider consulting a doctor if symptoms persist for more than 3 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doc Chat */}
      <section id="doc-chat" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
                <MessageCircle size={20} className="mr-2" />
                <span className="font-medium">Doc Chat</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Virtual Doctor Consultations</h2>
              <p className="text-muted-foreground mb-4">
                Connect with our AI-powered virtual doctors for immediate medical advice and consultations, no matter where you are.
              </p>
              <ul className="space-y-3 mb-6">
                <FeaturePoint icon={<Clock size={18} />} text="24/7 availability for medical advice" />
                <FeaturePoint icon={<Video size={18} />} text="Text-based consultations with medical AI" />
                <FeaturePoint icon={<Smartphone size={18} />} text="Accessible via any device with internet" />
              </ul>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/doc-chat">Start a Consultation</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-lg border border-muted">
                <div className="bg-primary/5 p-4 border-b border-border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <MessageCircle size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Doc Chat</h3>
                      <p className="text-xs text-muted-foreground">Online now</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                        <p className="text-sm">I've been having a persistent cough for the last 3 days. What should I do?</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                        <p className="text-sm">Based on your description, a persistent cough for 3 days could be due to several causes including a common cold, allergies, or mild respiratory infection. Are you experiencing any other symptoms like fever, shortness of breath, or chest pain?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                        <p className="text-sm">No fever, just the cough and some fatigue.</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                        <p className="text-sm">Without fever, it might be an upper respiratory infection or allergies. I recommend: 
                          <br />- Stay hydrated
                          <br />- Rest adequately
                          <br />- Try honey and warm water for cough relief
                          <br />
                          <br />If symptoms persist beyond a week or worsen, please consult a healthcare professional for in-person evaluation.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Type your message..." className="flex-1 bg-muted/50 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                    <Button size="icon" className="rounded-full">
                      <MessageCircle size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Medicine Scheduler */}
      <section id="medicine-scheduler" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
                <Calendar size={20} className="mr-2" />
                <span className="font-medium">Medicine Scheduler</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Smart Medication Reminders</h2>
              <p className="text-muted-foreground mb-4">
                Never miss a dose with our intelligent medicine scheduling system. Set up reminders and track your medication adherence.
              </p>
              <ul className="space-y-3 mb-6">
                <FeaturePoint icon={<Calendar size={18} />} text="Schedule multiple medications" />
                <FeaturePoint icon={<Clock size={18} />} text="Timely reminders for each dose" />
                <FeaturePoint icon={<FileSearch size={18} />} text="Medication adherence tracking" />
              </ul>
              <Button size="lg" className="rounded-full">Set Up Scheduler</Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-lg border border-muted">
                <div className="bg-primary/5 p-4 border-b border-border">
                  <h3 className="font-medium flex items-center">
                    <Calendar size={18} className="mr-2 text-primary" />
                    Medicine Schedule
                  </h3>
                </div>
                <div className="p-6">
                  <MedicineScheduler />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rare Disease Info */}
      <section id="rare-diseases" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
                <FileSearch size={20} className="mr-2" />
                <span className="font-medium">Rare Disease Information</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Comprehensive Disease Database</h2>
              <p className="text-muted-foreground mb-4">
                Access detailed information about rare and common diseases, their symptoms, treatments, and prevention methods.
              </p>
              <ul className="space-y-3 mb-6">
                <FeaturePoint icon={<FileSearch size={18} />} text="Extensive database of rare conditions" />
                <FeaturePoint icon={<Brain size={18} />} text="AI-assisted symptom matching" />
                <FeaturePoint icon={<MessageCircle size={18} />} text="Community forums for patient experiences" />
              </ul>
              <Button size="lg" className="rounded-full">Explore Disease Database</Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-lg border border-muted">
                <div className="bg-primary/5 p-4 border-b border-border">
                  <h3 className="font-medium flex items-center">
                    <FileSearch size={18} className="mr-2 text-primary" />
                    Rare Disease Information
                  </h3>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <input type="text" placeholder="Search diseases..." className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                      <h4 className="font-medium">Gaucher Disease</h4>
                      <p className="text-sm text-muted-foreground mt-1">A genetic disorder that affects many organs and tissues, particularly causing enlargement of the liver and spleen.</p>
                      <div className="mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-2">Genetic</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">Rare</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                      <h4 className="font-medium">Pompe Disease</h4>
                      <p className="text-sm text-muted-foreground mt-1">A rare genetic disorder causing progressive muscle weakness and breathing difficulties.</p>
                      <div className="mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-2">Genetic</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">Rare</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                      <h4 className="font-medium">Fabry Disease</h4>
                      <p className="text-sm text-muted-foreground mt-1">A progressive genetic disorder that affects multiple organ systems.</p>
                      <div className="mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-2">Genetic</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">Rare</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeaturePointProps {
  icon: React.ReactNode;
  text: string;
}

const FeaturePoint = ({ icon, text }: FeaturePointProps) => {
  return (
    <li className="flex items-start">
      <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
        <div className="text-primary">{icon}</div>
      </div>
      <span className="text-foreground">{text}</span>
    </li>
  );
};

export default Features;
