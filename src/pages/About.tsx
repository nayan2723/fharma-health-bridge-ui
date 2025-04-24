
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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

const About = () => {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Fharma</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Bridging the gap between rural healthcare needs and urban medical expertise through technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Fharma, we're on a mission to revolutionize healthcare accessibility in rural India. We believe that everyone deserves access to quality healthcare, regardless of their geographical location.
              </p>
              <p className="text-muted-foreground mb-4">
                By leveraging artificial intelligence and telemedicine, we're creating a bridge between rural communities and urban medical expertise, making healthcare more accessible, affordable, and efficient for all.
              </p>
              <p className="text-muted-foreground">
                Our platform offers AI-powered medicine recommendations, virtual doctor consultations, medication scheduling, and rare disease information – all designed to empower rural communities with the healthcare tools they need.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src="injection-at-community-clinic.jpg" 
                  alt="Rural Healthcare" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Goal */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Reducing the Healthcare Gap</h2>
              <p className="text-muted-foreground mb-4">
                India faces a significant disparity in healthcare accessibility between urban and rural areas. While urban centers have advanced medical facilities, rural regions often lack basic healthcare infrastructure.
              </p>
              <p className="text-muted-foreground mb-4">
                Fharma aims to bridge this gap by using AI and digital technologies to bring medical expertise to remote areas. Our platform helps rural residents access medical advice, medicine recommendations, and health information without needing to travel long distances.
              </p>
              <p className="text-muted-foreground">
                By combining artificial intelligence with healthcare knowledge, we're creating an ecosystem that makes quality healthcare accessible to everyone, regardless of their location or economic status.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
                  alt="Healthcare Technology" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Users size={40} className="mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate individuals behind Fharma who are dedicated to revolutionizing healthcare accessibility.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <TeamMember 
              name="Nayan Kshitij"
              role="Frontend & API Integration"
              image="https://i.ibb.co/DDPZgdmM/1745451423981.jpg"
            />
            <TeamMember 
              name="Aditya Kumar"
              role="Backend & Deployment"
              image="https://i.ibb.co/Rpfdqcch/adiya.jpg"
            />
            <TeamMember 
              name="Utkarsh Singh"
              role="AI & Research Lead"
              image="https://i.ibb.co/8nQxwdrd/utk.jpg"
            />
          </motion.div>
        </div>
      </section>

      {/* Acknowledgments */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Special Thanks</h2>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
              We extend our heartfelt gratitude to our mentors, the Dean, and the School of Computer Science Engineering and Technology (SCSET) at Bennett University for their unwavering support and guidance in bringing the Fharma project to life.
            </p>
            <div className="bg-card rounded-3xl p-8 max-w-3xl mx-auto shadow-md">
              <p className="italic text-muted-foreground">
                "This project is a testament to the power of technology in improving healthcare accessibility. We're proud to support innovations that can make a real difference in people's lives."
              </p>
              <p className="mt-4 font-medium">— Dean, SCSET, Bennett University</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card rounded-2xl overflow-hidden card-hover"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </motion.div>
  );
};

export default About;
