// src/components/About/About.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "../../lib/utils";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const slideFromLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const slideFromRight = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const values = [
    "We believe in building software that stands the test of time",
    "Speed matters, but not at the expense of quality",
    "We're technical partners invested in your success",
    "We integrate cutting-edge tech for competitive advantage",
  ];

  const stats = [
    {
      number: "8+",
      label: "Years Building",
      description: "Deep expertise in production systems",
    },
    {
      number: "100+",
      label: "Projects Shipped",
      description: "From MVP to enterprise scale",
    },
    {
      number: "99%",
      label: "Client Satisfaction",
      description: "Long-term partnership success",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="overflow-hidden relative py-24 bg-black md:py-40"
    >
      {/* Subtle background elements */}
      <div className="overflow-hidden absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent to-transparent transform -rotate-12 via-gray-600/20" />
        <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-transparent to-transparent transform rotate-45 via-gray-600/20" />
        <div className="absolute bottom-1/4 left-1/2 w-px h-40 bg-gradient-to-b from-transparent to-transparent transform rotate-12 via-gray-600/20" />
      </div>

      <div className="container relative z-10 px-4 mx-auto md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Hero Statement */}
          <motion.div
            className="mx-auto mb-32 max-w-4xl text-center"
            variants={itemVariants}
          >
            <div className="mb-8">
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl font-light text-white md:text-5xl">
                  About Veloria Labs
                </h2>
              </motion.div>
              <motion.div
                className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>
            <motion.p
              className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-gray-400 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              A product engineering lab that partners with technical founders to
              build scalable, production-ready platforms that drive startup
              success.
            </motion.p>
          </motion.div>

          {/* Story Flow */}
          <div className="mx-auto mb-32 max-w-6xl">
            {/* Mission Block */}
            <motion.div
              className="flex flex-col gap-16 items-start mb-24 lg:flex-row"
              variants={itemVariants}
            >
              <motion.div
                className="flex-shrink-0 lg:w-1/3"
                variants={slideFromLeft}
              >
                <div className="sticky top-32">
                  <div className="mb-6 w-12 h-px bg-gradient-to-r from-gray-500 to-transparent" />
                  <h3 className="mb-4 text-2xl font-light text-white md:text-3xl">
                    Our Mission
                  </h3>
                  <div className="mb-6 w-6 h-px bg-gray-600" />
                </div>
              </motion.div>

              <motion.div
                className="space-y-8 lg:w-2/3"
                variants={slideFromRight}
              >
                <p className="text-lg font-light leading-relaxed text-gray-300">
                  Veloria Labs emerged from a critical need in the startup
                  ecosystem: technical founders need engineering partners who
                  understand both rapid MVP development and enterprise-scale
                  architecture.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-400">
                  We bridge the gap between "ship fast" and "build
                  right"—combining startup velocity with enterprise engineering
                  practices to help technical founders validate ideas in weeks,
                  not months.
                </p>
              </motion.div>
            </motion.div>

            {/* Approach Block */}
            <motion.div
              className="flex flex-col gap-16 items-start mb-24 lg:flex-row"
              variants={itemVariants}
            >
              <motion.div
                className="order-2 space-y-8 lg:w-2/3 lg:order-1"
                variants={slideFromLeft}
              >
                <p className="text-lg font-light leading-relaxed text-gray-300">
                  Today, we're the technical co-founder that startup teams wish
                  they had—bringing years of production experience,
                  architectural expertise, and deep understanding of the startup
                  journey.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-400">
                  We build platforms that scale to millions of users without
                  technical debt, ensuring your success isn't limited by your
                  technology choices.
                </p>
              </motion.div>

              <motion.div
                className="flex-shrink-0 order-1 lg:w-1/3 lg:order-2"
                variants={slideFromRight}
              >
                <div className="sticky top-32 text-right">
                  <div className="mb-6 ml-auto w-12 h-px bg-gradient-to-l from-gray-500 to-transparent" />
                  <h3 className="mb-4 text-2xl font-light text-white md:text-3xl">
                    Our Approach
                  </h3>
                  <div className="mb-6 ml-auto w-6 h-px bg-gray-600" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Values List */}
          <motion.div
            className="mx-auto mb-32 max-w-4xl"
            variants={itemVariants}
          >
            <div className="mb-16 text-center">
              <h3 className="mb-4 text-2xl font-light text-white md:text-3xl">
                What We Believe
              </h3>
              <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            </div>

            <div className="space-y-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "flex items-center gap-8 group",
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  )}
                  variants={itemVariants}
                  whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {index % 2 === 0 ? (
                    <>
                      <div className="flex gap-4 items-center">
                        <div className="w-2 h-2 bg-gray-500 rounded-full transition-colors duration-300 group-hover:bg-gray-400" />
                        <div className="w-8 h-px bg-gray-600 transition-colors duration-300 group-hover:bg-gray-500" />
                      </div>
                      <p className="max-w-lg text-lg font-light text-gray-300 transition-colors duration-300 group-hover:text-white">
                        {value}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="max-w-lg text-lg font-light text-right text-gray-300 transition-colors duration-300 group-hover:text-white">
                        {value}
                      </p>
                      <div className="flex gap-4 items-center">
                        <div className="w-8 h-px bg-gray-600 transition-colors duration-300 group-hover:bg-gray-500" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full transition-colors duration-300 group-hover:bg-gray-400" />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Integrated */}
          <motion.div className="mx-auto max-w-4xl" variants={itemVariants}>
            <div className="mb-20 text-center">
              <h3 className="mb-4 text-2xl font-light text-white md:text-3xl">
                By the Numbers
              </h3>
              <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            </div>

            <div className="space-y-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "flex flex-col gap-8 items-center group md:flex-row",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                  variants={itemVariants}
                  whileHover={{
                    x: index % 2 === 0 ? 8 : -8,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-lg blur-2xl transition-all duration-500 bg-gray-900/20 group-hover:bg-gray-800/30" />
                      <div className="relative p-6 rounded-lg border backdrop-blur-sm transition-all duration-500 bg-black/40 border-gray-700/20 group-hover:border-gray-600/30">
                        <div className="mb-1 text-4xl font-extralight text-white md:text-5xl">
                          {stat.number}
                        </div>
                        <div className="text-sm font-light text-gray-400 whitespace-nowrap">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div
                      className={cn(
                        "flex gap-4 items-center mb-3",
                        index % 2 === 0
                          ? "justify-center md:justify-start"
                          : "justify-center md:justify-end"
                      )}
                    >
                      <div className="w-8 h-px bg-gradient-to-r from-gray-600 to-gray-700 transition-all duration-300 group-hover:from-gray-500 group-hover:to-gray-600" />
                      <div className="w-2 h-2 bg-gray-600 rounded-full transition-colors duration-300 group-hover:bg-gray-500" />
                    </div>
                    <p
                      className={cn(
                        "text-lg font-light text-gray-300 transition-colors duration-300 group-hover:text-white",
                        index % 2 === 0
                          ? "text-center md:text-left"
                          : "text-center md:text-right"
                      )}
                    >
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
