// src/components/About/About.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TeamMember from "./TeamMember";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const teamMembers = [
    {
      name: "Anwar Khan",
      role: "Founder & Creative Director",
      image: "/team-placeholder1.jpg",
      bio: "With over 5 years of experience in design and branding, Anwar leads our creative vision with passion and precision.",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Pritam Das",
      role: "Lead Developer",
      image: "/team-placeholder2.jpg",
      bio: "Pritam brings technical expertise and innovative solutions to every project, ensuring flawless functionality.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Lisa Patel",
      role: "UX/UI Designer",
      image: "/team-placeholder3.jpg",
      bio: "Lisa crafts intuitive user experiences that delight customers and drive engagement for our clients.",
      social: {
        dribbble: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Sabia Khan",
      role: "Marketing Strategist",
      image: "/team-placeholder4.jpg",
      bio: "Sabia develops data-driven marketing strategies that connect brands with their ideal audiences.",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const valuesAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-accent/10 to-transparent rounded-full opacity-60 translate-y-1/4 translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.2 }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About Veloria
            </h2>
            <p className="text-gray-600 text-lg">
              We're a team of passionate designers and developers creating
              beautiful digital experiences for brands and individuals.
            </p>
          </motion.div>

          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">Our Story</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2018, Veloria was born from a passion for creating
                  beautiful, functional websites specifically for brands that
                  cater to individuals. We noticed that these brands often often
                  struggled to find design partners who truly understood their
                  unique needs and audience.
                </p>
                <p>
                  What started as a small studio has grown into a full-service
                  agency with a team of specialists dedicated to helping these
                  brands shine in the digital space.
                </p>
                <p>
                  Today, we're proud to have partnered with over 30 brands
                  across the globe, creating digital experiences that resonate
                  with their audiences and drive meaningful results.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative h-80 md:h-96"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 transform rotate-6"></div>
              <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-gradient-to-tr from-accent/20 to-light/20 rounded-2xl"></div>
              <div className="absolute inset-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">V</span>
                  </div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Veloria Studio
                  </h4>
                  <p className="text-gray-600 mt-2">Established 2018</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Our Values */}
          <motion.div className="mb-20" variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-center">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Creativity & Innovation",
                  description:
                    "We push boundaries and think outside the box to deliver unique solutions.",
                  color: "primary",
                },
                {
                  title: "Quality & Excellence",
                  description:
                    "We hold ourselves to the highest standards in everything we create.",
                  color: "secondary",
                },
                {
                  title: "Empathy & Understanding",
                  description:
                    "We listen deeply to understand your brand and your audience's needs.",
                  color: "accent",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  variants={valuesAnimation}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-${value.color}/20 flex items-center justify-center text-${value.color} mb-4`}
                  >
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Members */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-center">
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} member={member} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
