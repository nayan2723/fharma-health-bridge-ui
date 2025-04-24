import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/features", label: "Features" },
    { path: "/contact", label: "Contact Us" },
    ...(user ? [] : [{ path: "/auth", label: "Sign In" }]),
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-gradient">Fharma</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <span className="text-sm font-medium text-primary">
                Welcome, {user.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-muted-foreground hover:text-primary"
              >
                <LogOut size={18} />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="mr-2 text-muted-foreground hover:text-primary"
            >
              <LogOut size={18} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 mt-3 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col py-4">
            {user && (
              <span className="px-6 py-3 text-sm font-medium text-primary">
                Welcome, {user.name}
              </span>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-3 text-sm font-medium hover:bg-muted transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-muted"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
