
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">{t("notfound.title")}</h1>
        <div className="w-16 h-1 bg-primary/30 mx-auto mb-6"></div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("notfound.heading")}</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {t("notfound.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft size={18} />
              {t("notfound.back")}
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link to="/">
              <Home size={18} />
              {t("notfound.home")}
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
