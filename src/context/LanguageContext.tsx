
import React, { createContext, useState, useContext, ReactNode } from "react";

type Language = "english" | "hindi" | "telugu";

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
    
    // Footer
    "footer.description": "Connecting Rural India to Urban Healthcare through AI-powered solutions.",
    "footer.quicklinks": "Quick Links",
    "footer.contact": "Contact Us",
    "footer.address": "Bennett University, Greater Noida, India",
    "footer.phone": "+91 1234567890",
    "footer.email": "info@fharma.in",
    "footer.rights": "All rights reserved.",
    
    // Not Found Page
    "notfound.title": "404",
    "notfound.heading": "Page Not Found",
    "notfound.description": "The page you are looking for doesn't exist or has been moved.",
    "notfound.back": "Go Back",
    "notfound.home": "Return Home",
    
    // Auth Page
    "auth.signin.title": "Welcome back",
    "auth.signin.description": "Enter your credentials to sign in",
    "auth.signup.title": "Create an account",
    "auth.signup.description": "Enter your information to create an account",
    "auth.switchToSignup": "Don't have an account? Sign up",
    "auth.switchToSignin": "Already have an account? Sign in",
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
    
    // Footer
    "footer.description": "AI-संचालित समाधानों के माध्यम से ग्रामीण भारत को शहरी स्वास्थ्य सेवा से जोड़ना।",
    "footer.quicklinks": "त्वरित लिंक",
    "footer.contact": "संपर्क करें",
    "footer.address": "बेनेट विश्वविद्यालय, ग्रेटर नोएडा, भारत",
    "footer.phone": "+91 1234567890",
    "footer.email": "info@fharma.in",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    
    // Not Found Page
    "notfound.title": "404",
    "notfound.heading": "पृष्ठ नहीं मिला",
    "notfound.description": "आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया है।",
    "notfound.back": "वापस जाएं",
    "notfound.home": "होम पर लौटें",
    
    // Auth Page
    "auth.signin.title": "वापसी पर स्वागत है",
    "auth.signin.description": "साइन इन करने के लिए अपने क्रेडेंशियल्स दर्ज करें",
    "auth.signup.title": "खाता बनाएं",
    "auth.signup.description": "खाता बनाने के लिए अपनी जानकारी दर्ज करें",
    "auth.switchToSignup": "खाता नहीं है? साइन अप करें",
    "auth.switchToSignin": "पहले से खाता है? साइन इन करें",
  },
  telugu: {
    // Navigation
    "nav.home": "హోమ్",
    "nav.about": "మా గురించి",
    "nav.features": "ఫీచర్లు",
    "nav.contact": "సంప్రదించండి",
    "nav.signin": "సైన్ ఇన్",
    "nav.welcome": "స్వాగతం",
    
    // Home page
    "home.title": "ఆరోగ్య సంరక్షణ పునఃకల్పన",
    "home.subtitle": "AI-ఆధారిత సాంకేతికతల ద్వారా గ్రామీణ భారతదేశాన్ని పట్టణ ఆరోగ్య సంరక్షణతో అనుసంధానించడం.",
    "home.explore": "ఫీచర్లను అన్వేషించండి",
    "home.try": "మందుల సిఫార్సు చేయడాన్ని ప్రయత్నించండి",
    "home.features": "మా ముఖ్య ఫీచర్లు",
    "home.features.subtitle": "వినూత్న సాంకేతిక పరిష్కారాలతో గ్రామీణ మరియు పట్టణ ఆరోగ్య సంరక్షణ మధ్య అంతరాన్ని పూడ్చడం.",
    "home.cta.title": "మెరుగైన ఆరోగ్య సంరక్షణను అనుభవించడానికి సిద్ధంగా ఉన్నారా?",
    "home.cta.subtitle": "ఫార్మా యొక్క వినూత్న ప్లాట్‌ఫారమ్‌తో ఆరోగ్య సంరక్షణ అంతరాన్ని అధిగమిస్తున్న వేలాది వినియోగదారులతో చేరండి.",
    "home.cta.button": "ఇప్పుడే ప్రారంభించండి",
    
    // Feature cards
    "feature.medicine.title": "మందుల సిఫార్సుదారు",
    "feature.medicine.desc": "లక్షణాలు మరియు చరిత్ర ఆధారంగా AI-ఆధారిత మందుల సిఫార్సులు.",
    "feature.chat.title": "డాక్ చాట్",
    "feature.chat.desc": "త్వరిత సంప్రదింపులు మరియు ఆరోగ్య సలహాల కోసం AI డాక్టర్లతో అనుసంధానించండి.",
    "feature.scheduler.title": "మందుల షెడ్యూలర్",
    "feature.scheduler.desc": "మా స్మార్ట్ మెడికేషన్ షెడ్యూలింగ్ సిస్టమ్‌తో మందు మోతాదును మిస్ కాకుండా ఉండండి.",
    "feature.disease.title": "అరుదైన వ్యాధి సమాచారం",
    "feature.disease.desc": "మెరుగైన అవగాహన కోసం అరుదైన వ్యాధుల గురించి సమగ్ర సమాచారం.",
    "feature.learn": "మరింత తెలుసుకోండి",
    
    // DocChat
    "docchat.title": "డాక్ చాట్",
    "docchat.welcome": "డాక్ చాట్‌కి స్వాగతం",
    "docchat.prompt": "ప్రారంభించడానికి ఏవైనా ఆరోగ్య-సంబంధిత ప్రశ్నలను అడగండి.",
    "docchat.thinking": "ఆలోచిస్తున్నాను...",
    "docchat.copy": "కాపీ చేయండి",
    "docchat.placeholder": "మీ సందేశాన్ని టైప్ చేయండి...",
    "docchat.poweredby": "Google Gemini AI ద్వారా ఆధారితం",
    
    // Footer
    "footer.description": "AI-ఆధారిత పరిష్కారాల ద్వారా గ్రామీణ భారతదేశాన్ని పట్టణ ఆరోగ్య సంరక్షణతో అనుసంధానించడం.",
    "footer.quicklinks": "త్వరిత లింకులు",
    "footer.contact": "సంప్రదించండి",
    "footer.address": "బెన్నెట్ విశ్వవిద్యాలయం, గ్రేటర్ నోయిడా, భారతదేశం",
    "footer.phone": "+91 1234567890",
    "footer.email": "info@fharma.in",
    "footer.rights": "సర్వహక్కులు రిజర్వ్ చేయబడ్డాయి.",
    
    // Not Found Page
    "notfound.title": "404",
    "notfound.heading": "పేజీ కనుగొనబడలేదు",
    "notfound.description": "మీరు వెతుకుతున్న పేజీ లేదా స్థానం మార్చబడింది.",
    "notfound.back": "వెనక్కి వెళ్ళండి",
    "notfound.home": "హోమ్‌కి తిరిగి వెళ్ళండి",
    
    // Auth Page
    "auth.signin.title": "తిరిగి స్వాగతం",
    "auth.signin.description": "సైన్ ఇన్ చేయడానికి మీ ఆధారాలను నమోదు చేయండి",
    "auth.signup.title": "ఖాతాను సృష్టించండి",
    "auth.signup.description": "ఖాతాను సృష్టించడానికి మీ సమాచారాన్ని నమోదు చేయండి",
    "auth.switchToSignup": "ఖాతా లేదా? సైన్ అప్ చేయండి",
    "auth.switchToSignin": "ఇప్పటికే ఖాతా ఉందా? సైన్ ఇన్ చేయండి",
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
