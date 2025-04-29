
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-muted/50 dark:bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Fharma</h3>
            <p className="text-muted-foreground max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quicklinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.features")}
                </Link>
              </li>
              <li>
                <Link to="/doc-chat" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("docchat.title")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">{t("footer.address")}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">{t("footer.phone")}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">{t("footer.email")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Fharma. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
