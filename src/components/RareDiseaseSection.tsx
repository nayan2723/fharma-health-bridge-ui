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
  { name: "Gaucher Disease", description: "A genetic disorder affecting organs and tissues.", tags: ["Genetic", "Rare"] },
  { name: "Pompe Disease", description: "Causes muscle weakness and breathing issues.", tags: ["Genetic", "Rare"] },
  { name: "Fabry Disease", description: "Progressive disorder affecting multiple organs.", tags: ["Genetic", "Rare"] },
  { name: "Alkaptonuria", description: "Leads to black urine and connective tissue issues.", tags: ["Genetic", "Rare"] },
  { name: "Progeria", description: "Accelerated aging in children.", tags: ["Genetic", "Rare"] },
  { name: "Marfan Syndrome", description: "Affects connective tissue and heart.", tags: ["Genetic", "Rare"] },
  { name: "Wilson's Disease", description: "Copper buildup in organs.", tags: ["Genetic", "Rare"] },
  { name: "Huntington's Disease", description: "Causes nerve cell breakdown in brain.", tags: ["Genetic", "Rare"] },
  { name: "Ehlers-Danlos Syndrome", description: "Affects connective tissues.", tags: ["Genetic", "Rare"] },
  { name: "Tay-Sachs Disease", description: "Destroys nerve cells in the brain/spinal cord.", tags: ["Genetic", "Rare"] },
  { name: "Rett Syndrome", description: "Causes severe cognitive and physical issues.", tags: ["Genetic", "Rare"] },
  { name: "Angelman Syndrome", description: "Affects nervous system and development.", tags: ["Genetic", "Rare"] },
  { name: "Prader-Willi Syndrome", description: "Leads to obesity, intellectual issues.", tags: ["Genetic", "Rare"] },
  { name: "Kearns-Sayre Syndrome", description: "Affects eyes and muscle coordination.", tags: ["Genetic", "Rare"] },
  { name: "Cystinosis", description: "Leads to kidney and eye damage.", tags: ["Genetic", "Rare"] },
  { name: "Metachromatic Leukodystrophy", description: "Affects nervous system functions.", tags: ["Genetic", "Rare"] },
  { name: "Primary Hyperoxaluria", description: "Causes kidney stones and failure.", tags: ["Genetic", "Rare"] },
  { name: "Niemann-Pick Disease", description: "Causes fat accumulation in cells.", tags: ["Genetic", "Rare"] },
  { name: "Menkes Disease", description: "Affects copper levels in body.", tags: ["Genetic", "Rare"] },
  { name: "Maple Syrup Urine Disease", description: "Causes sweet-smelling urine and brain damage.", tags: ["Genetic", "Rare"] },
  { name: "Zellweger Syndrome", description: "Affects brain and organ development.", tags: ["Genetic", "Rare"] },
  { name: "Bloom Syndrome", description: "Leads to small stature and cancer risk.", tags: ["Genetic", "Rare"] },
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
                      <div className="mt-2">
                        {disease.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-xs ${
                              tag === "Genetic"
                                ? "bg-primary/10 text-primary"
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