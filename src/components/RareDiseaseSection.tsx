  import { useState } from "react";
  import { motion } from "framer-motion";
  import { FileSearch, Brain, MessageCircle } from "lucide-react";
  import { Button } from "@/components/ui/button";


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


    const rareDiseasesList = [
      {
        name: "Gaucher Disease",
        description: "A genetic disorder affecting organs and tissues.",
        symptoms: "Enlarged spleen & liver, bone pain, anemia, bruising",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Pompe Disease",
        description: "Causes muscle weakness and breathing issues.",
        symptoms: "Progressive muscle weakness, breathing difficulty, enlarged heart (infants)",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Fabry Disease",
        description: "Progressive disorder affecting multiple organs.",
        symptoms: "Burning pain in hands/feet, angiokeratoma skin spots, kidney dysfunction",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Alkaptonuria",
        description: "Leads to black urine and connective tissue issues.",
        symptoms: "Dark urine, joint pain, spine stiffness, heart‑valve problems",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Progeria",
        description: "Accelerated aging in children.",
        symptoms: "Growth failure, hair loss, aged skin, early heart disease",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Marfan Syndrome",
        description: "Affects connective tissue and heart.",
        symptoms: "Tall stature, long limbs, lens dislocation, aortic enlargement",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Wilson's Disease",
        description: "Copper buildup in organs.",
        symptoms: "Liver disease, tremors, psychiatric changes, Kayser‑Fleischer rings",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Huntington's Disease",
        description: "Causes nerve cell breakdown in brain.",
        symptoms: "Chorea (involuntary movements), mood swings, memory decline",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Ehlers-Danlos Syndrome",
        description: "Affects connective tissues.",
        symptoms: "Hyperflexible joints, fragile skin, easy bruising, chronic pain",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Tay-Sachs Disease",
        description: "Destroys nerve cells in the brain/spinal cord.",
        symptoms: "Developmental regression, seizures, vision/hearing loss",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Rett Syndrome",
        description: "Causes severe cognitive and physical issues.",
        symptoms: "Loss of hand skills, speech regression, repetitive hand‑wringing",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Angelman Syndrome",
        description: "Affects nervous system and development.",
        symptoms: "Happy demeanor, ataxia, severe speech impairment, seizures",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Prader-Willi Syndrome",
        description: "Leads to obesity, intellectual issues.",
        symptoms: "Insatiable appetite, obesity, short stature, low muscle tone",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Kearns-Sayre Syndrome",
        description: "Affects eyes and muscle coordination.",
        symptoms: "Progressive eye‑muscle weakness, ptosis, heart block, ataxia",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Cystinosis",
        description: "Leads to kidney and eye damage.",
        symptoms: "Fanconi syndrome, photophobia, growth retardation, renal failure",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Metachromatic Leukodystrophy",
        description: "Affects nervous system functions.",
        symptoms: "Loss of motor skills, seizures, behavioral changes",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Primary Hyperoxaluria",
        description: "Causes kidney stones and failure.",
        symptoms: "Recurrent kidney stones, flank pain, renal failure in childhood",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Niemann-Pick Disease",
        description: "Causes fat accumulation in cells.",
        symptoms: "Ataxia, vertical gaze palsy, enlarged liver & spleen",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Menkes Disease",
        description: "Affects copper levels in body.",
        symptoms: "Sparse kinky hair, seizures, developmental delay, failure to thrive",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Maple Syrup Urine Disease",
        description: "Causes sweet-smelling urine and brain damage.",
        symptoms: "Sweet‑odor urine, poor feeding, lethargy, seizures",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Zellweger Syndrome",
        description: "Affects brain and organ development.",
        symptoms: "Poor muscle tone, seizures, vision/hearing loss, craniofacial anomalies",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Bloom Syndrome",
        description: "Leads to small stature and cancer risk.",
        symptoms: "Short stature, sun‑sensitive rash, recurrent infections, early cancers",
        tags: ["Genetic", "Rare"],
      },
    
      // Additional diseases (29-50)
      {
        name: "Alzheimer's Disease",
        description: "A progressive neurodegenerative disease.",
        symptoms: "Memory loss, confusion, difficulty speaking, mood changes",
        tags: ["Neurodegenerative", "Rare"],
      },
      {
        name: "HIV/AIDS",
        description: "A viral infection attacking the immune system.",
        symptoms: "Fatigue, fever, weight loss, swollen lymph nodes",
        tags: ["Viral", "Rare"],
      },
      {
        name: "Cystic Fibrosis",
        description: "A genetic disorder affecting the lungs and digestive system.",
        symptoms: "Chronic cough, lung infections, difficulty breathing",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Duchenne Muscular Dystrophy",
        description: "A genetic disorder that causes muscle weakness.",
        symptoms: "Muscle weakness, difficulty walking, difficulty breathing",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Multiple Sclerosis",
        description: "A disease of the central nervous system.",
        symptoms: "Numbness, vision problems, muscle weakness, fatigue",
        tags: ["Autoimmune", "Rare"],
      },
      {
        name: "Amyotrophic Lateral Sclerosis (ALS)",
        description: "A neurodegenerative disease affecting nerve cells.",
        symptoms: "Muscle weakness, difficulty swallowing, speech problems",
        tags: ["Neurodegenerative", "Rare"],
      },
      {
        name: "Sickle Cell Disease",
        description: "A blood disorder causing abnormal red blood cells.",
        symptoms: "Pain episodes, anemia, fatigue, swelling",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Osteogenesis Imperfecta",
        description: "A genetic disorder causing fragile bones.",
        symptoms: "Frequent fractures, joint problems, hearing loss",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Hemophilia",
        description: "A genetic disorder that impairs blood clotting.",
        symptoms: "Excessive bleeding, joint pain, easy bruising",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Turner Syndrome",
        description: "A chromosomal disorder affecting females.",
        symptoms: "Short stature, heart defects, infertility",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Klinefelter Syndrome",
        description: "A genetic condition affecting males.",
        symptoms: "Infertility, low testosterone, developmental delays",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Ehlers-Danlos Syndrome (Hypermobility Type)",
        description: "A connective tissue disorder causing joint hypermobility.",
        symptoms: "Frequent dislocations, easy bruising, joint pain",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Prune Belly Syndrome",
        description: "A disorder affecting the urinary and digestive systems.",
        symptoms: "Abdominal distension, kidney problems, poor muscle tone",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Patau Syndrome",
        description: "A genetic disorder caused by an extra chromosome.",
        symptoms: "Cleft lip, heart defects, developmental delays",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Edward Syndrome",
        description: "A genetic condition caused by an extra chromosome.",
        symptoms: "Low birth weight, heart defects, developmental delays",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Prader-Willi Syndrome",
        description: "A genetic disorder causing obesity and developmental delays.",
        symptoms: "Constant hunger, short stature, learning disabilities",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Angelman Syndrome",
        description: "A genetic disorder affecting the nervous system.",
        symptoms: "Severe developmental delays, speech impairment, seizures",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Usher Syndrome",
        description: "A condition causing deafness and blindness.",
        symptoms: "Hearing loss, vision loss, balance problems",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Retinopathy of Prematurity",
        description: "A condition affecting premature babies and the eyes.",
        symptoms: "Vision problems, blindness, retinal detachment",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Polycystic Kidney Disease",
        description: "A genetic disorder causing fluid-filled cysts in kidneys.",
        symptoms: "High blood pressure, kidney pain, frequent urination",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Marfan Syndrome",
        description: "A connective tissue disorder affecting the heart and blood vessels.",
        symptoms: "Tall stature, long limbs, heart issues, scoliosis",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Lesch-Nyhan Syndrome",
        description: "A genetic disorder affecting the nervous system.",
        symptoms: "Self-mutilating behavior, movement problems, intellectual disability",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Hyper IgM Syndrome",
        description: "A rare immune disorder that impairs immune response.",
        symptoms: "Frequent infections, diarrhea, enlarged lymph nodes",
        tags: ["Genetic", "Rare"],
      },
      {
        name: "Dandy-Walker Syndrome",
        description: "A disorder affecting brain development.",
        symptoms: "Hydrocephalus, delayed motor skills, developmental delay",
        tags: ["Genetic", "Rare"],
      },
    ];
    


  export default function RareDiseasesSection() {
    const [search, setSearch] = useState("");

    const filteredDiseases = rareDiseasesList.filter(disease =>
      disease.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <section id="rare-diseases" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <motion.div
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
                    <input
                      type="text"
                      placeholder="Search diseases..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {filteredDiseases.map((disease, index) => (
                      <div key={index} className="bg-muted/50 rounded-xl p-4 border border-border">
                        <h4 className="font-medium">{disease.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{disease.description}</p>
                        <p className="text-xs mt-1">
                          <strong>Symptoms:</strong> {disease.symptoms}
                          </p>
                        <div className="mt-2">
                          {disease.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`text-xs ${
                                tag === "Genetic"
                                  ? "bg-primary/10 text-primary"
                                  : tag === "Viral"
                                  ? "bg-blue-500 text-white" // You can customize this color
                                  : tag === "Neurodegenerative"
                                  ? "bg-orange-500 text-white" // You can customize this color
                                  : tag === "Autoimmune"
                                  ? "bg-red-500 text-white" // Red background for Autoimmune
                                  : "bg-muted"
                              } px-2 py-1 rounded-full mr-2`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
