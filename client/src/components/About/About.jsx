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
      className="py-20 md:py-28 bg-white dark:bg-dark-300 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-accent/10 to-transparent rounded-full opacity-60 translate-y-1/4 translate-x-1/4 dark:from-accent/5"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              About Veloria
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              We're a team of passionate designers and developers creating
              beautiful digital experiences for brands and individuals.
            </p>
          </motion.div>

          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Our Story
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
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
              className="bg-white dark:bg-dark-100 rounded-xl p-6 shadow-md"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Animated SVG logo/graphic similar to the hero section */}
              <motion.div className="w-full h-full">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 600 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="gradient1About"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(37, 80%, 60%)"
                        stopOpacity="0.3"
                        className="dark:stop-opacity-20"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(340, 45%, 65%)"
                        stopOpacity="0.3"
                        className="dark:stop-opacity-20"
                      />
                    </linearGradient>
                    <linearGradient
                      id="gradient2About"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(245, 35%, 62%)"
                        stopOpacity="0.3"
                        className="dark:stop-opacity-20"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(200, 30%, 63%)"
                        stopOpacity="0.3"
                        className="dark:stop-opacity-20"
                      />
                    </linearGradient>
                  </defs>

                  {/* Brand mark */}
                  <motion.path
                    d="M300,80 C380,80 450,150 450,230 C450,310 380,380 300,380 C220,380 150,310 150,230 C150,150 220,80 300,80 Z"
                    fill="none"
                    stroke="hsl(37, 80%, 60%)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 2.5,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                    className="dark:stroke-primary-400"
                  />

                  <motion.path
                    d="M300,120 C360,120 420,170 420,230 C420,290 360,340 300,340 C240,340 180,290 180,230 C180,170 240,120 300,120 Z"
                    fill="none"
                    stroke="hsl(340, 45%, 65%)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{
                      duration: 2.2,
                      ease: "easeInOut",
                      delay: 0.7,
                    }}
                    className="dark:stroke-secondary-400"
                  />

                  {/* V letter stylized */}
                  <motion.path
                    d="M250,160 L300,300 L350,160"
                    fill="none"
                    stroke="hsl(245, 35%, 62%)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                    className="dark:stroke-accent-400"
                  />

                  {/* Floating elements */}
                  <motion.circle
                    cx="200"
                    cy="150"
                    r="15"
                    fill="url(#gradient1About)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />

                  <motion.circle
                    cx="400"
                    cy="150"
                    r="15"
                    fill="url(#gradient2About)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  />

                  <motion.circle
                    cx="300"
                    cy="100"
                    r="10"
                    fill="hsl(37, 80%, 60%)"
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="dark:fill-primary-400"
                  />

                  <motion.circle
                    cx="380"
                    cy="280"
                    r="8"
                    fill="hsl(245, 35%, 62%)"
                    initial={{ y: 0 }}
                    animate={{ y: [-8, 8, -8] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="dark:fill-accent-400"
                  />

                  <motion.circle
                    cx="220"
                    cy="280"
                    r="8"
                    fill="hsl(340, 45%, 65%)"
                    initial={{ y: 0 }}
                    animate={{ y: [-8, 8, -8] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="dark:fill-secondary-400"
                  />
                </svg>
              </motion.div>

              <div className="text-center mt-6">
                <h4 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  Our Mission
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  To transform brands with beautiful, functional digital
                  experiences that connect with their audience and drive
                  meaningful results.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Values section */}
          <motion.div className="mb-20" variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
              Our Values
            </h3>
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
                  className="bg-white dark:bg-dark-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  variants={valuesAnimation}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-${value.color}/20 flex items-center justify-center text-${value.color}-600 dark:text-${value.color}-400 mb-4`}
                  >
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Members */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
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
