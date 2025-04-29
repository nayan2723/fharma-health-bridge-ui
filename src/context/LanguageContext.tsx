
import React, { createContext, useState, useContext, ReactNode } from "react";

type Language = "english" | "hindi";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  english: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.features": "Features",
    "nav.contact": "Contact Us",
    "nav.signin": "Sign In",
    "nav.welcome": "Welcome",
    
    // Home page
    "home.title": "Healthcare Reimagined",
    "home.subtitle": "Connecting Rural India to Urban Healthcare through AI-powered technologies.",
    "home.explore": "Explore Features",
    "home.try": "Try Medicine Recommender",
    "home.features": "Our Key Features",
    "home.features.subtitle": "Bridging the gap between rural and urban healthcare with innovative technology solutions.",
    "home.cta.title": "Ready to Experience Better Healthcare?",
    "home.cta.subtitle": "Join thousands of users who are bridging the healthcare gap with Fharma's innovative platform.",
    "home.cta.button": "Get Started Now",
    
    // Feature cards
    "feature.medicine.title": "Medicine Recommender",
    "feature.medicine.desc": "AI-powered medicine recommendations based on symptoms and history.",
    "feature.chat.title": "Doc Chat",
    "feature.chat.desc": "Connect with AI doctors for quick consultations and health advice.",
    "feature.scheduler.title": "Medicine Scheduler",
    "feature.scheduler.desc": "Never miss a dose with our smart medication scheduling system.",
    "feature.disease.title": "Rare Disease Info",
    "feature.disease.desc": "Comprehensive information on rare diseases for better understanding.",
    "feature.learn": "Learn more",
    
    // DocChat
    "docchat.title": "Doc Chat",
    "docchat.welcome": "Welcome to Doc Chat",
    "docchat.prompt": "Ask any health-related questions to get started.",
    "docchat.thinking": "Thinking...",
    "docchat.copy": "Copy",
    "docchat.placeholder": "Type your message...",
    "docchat.poweredby": "Powered by Google Gemini AI",
  },
  hindi: {
    // Navigation
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.features": "विशेषताएं",
    "nav.contact": "संपर्क करें",
    "nav.signin": "साइन इन करें",
    "nav.welcome": "स्वागत है",
    
    // Home page
    "home.title": "स्वास्थ्य सेवा का पुनर्कल्पना",
    "home.subtitle": "AI-संचालित तकनीकों के माध्यम से ग्रामीण भारत को शहरी स्वास्थ्य सेवा से जोड़ना।",
    "home.explore": "विशेषताएं देखें",
    "home.try": "दवा अनुशंसक आज़माएं",
    "home.features": "हमारी प्रमुख विशेषताएं",
    "home.features.subtitle": "नवीन तकनीकी समाधानों के साथ ग्रामीण और शहरी स्वास्थ्य सेवा के बीच की खाई को पाटना।",
    "home.cta.title": "बेहतर स्वास्थ्य सेवा का अनुभव करने के लिए तैयार हैं?",
    "home.cta.subtitle": "हजारों उपयोगकर्ताओं के साथ जुड़ें जो फार्मा के नवीन प्लेटफॉर्म के साथ स्वास्थ्य सेवा अंतर को पाट रहे हैं।",
    "home.cta.button": "अभी शुरू करें",
    
    // Feature cards
    "feature.medicine.title": "दवा अनुशंसक",
    "feature.medicine.desc": "लक्षणों और इतिहास के आधार पर AI-संचालित दवा सिफारिशें।",
    "feature.chat.title": "डॉक्टर चैट",
    "feature.chat.desc": "त्वरित परामर्श और स्वास्थ्य सलाह के लिए AI डॉक्टरों से जुड़ें।",
    "feature.scheduler.title": "दवा शेड्यूलर",
    "feature.scheduler.desc": "हमारे स्मार्ट दवा शेड्यूलिंग सिस्टम के साथ कभी भी दवा न भूलें।",
    "feature.disease.title": "दुर्लभ रोग जानकारी",
    "feature.disease.desc": "बेहतर समझ के लिए दुर्लभ रोगों पर व्यापक जानकारी।",
    "feature.learn": "अधिक जानें",
    
    // DocChat
    "docchat.title": "डॉक्टर चैट",
    "docchat.welcome": "डॉक्टर चैट में आपका स्वागत है",
    "docchat.prompt": "शुरू करने के लिए कोई भी स्वास्थ्य संबंधित प्रश्न पूछें।",
    "docchat.thinking": "सोच रहा हूँ...",
    "docchat.copy": "कॉपी करें",
    "docchat.placeholder": "अपना संदेश टाइप करें...",
    "docchat.poweredby": "Google Gemini AI द्वारा संचालित",
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("english");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
