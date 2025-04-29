
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Pill, MessageCircle, Calendar, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

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

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Fharma</span>
                <br />
                <span className="text-foreground">{t("home.title")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                {t("home.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/features">{t("home.explore")} <ArrowRight className="ml-2" size={18} /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/doc-chat">{t("home.try")}</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-80 md:h-96 w-full max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-fharma-teal/20 to-fharma-blue/20 backdrop-blur-sm border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Healthcare Technology" 
                    className="h-full w-full object-cover rounded-3xl opacity-80"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.features")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard 
              icon={<Pill size={32} />}
              title={t("feature.medicine.title")}
              description={t("feature.medicine.desc")}
              link="/features#medicine-recommender"
            />
            
            <FeatureCard 
              icon={<MessageCircle size={32} />}
              title={t("feature.chat.title")}
              description={t("feature.chat.desc")}
              link="/features#doc-chat"
            />
            
            <FeatureCard 
              icon={<Calendar size={32} />}
              title={t("feature.scheduler.title")}
              description={t("feature.scheduler.desc")}
              link="/features#medicine-scheduler"
            />
            
            <FeatureCard 
              icon={<FileSearch size={32} />}
              title={t("feature.disease.title")}
              description={t("feature.disease.desc")}
              link="/features#rare-diseases"
            />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("home.cta.title")}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/features">{t("home.cta.button")} <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard = ({ icon, title, description, link }: FeatureCardProps) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card rounded-2xl p-6 card-hover"
    >
      <div className="bg-primary/10 dark:bg-primary/5 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link to={link} className="inline-flex items-center text-primary">
        {t("feature.learn")} <ArrowRight className="ml-1" size={16} />
      </Link>
    </motion.div>
  );
};

export default Home;
